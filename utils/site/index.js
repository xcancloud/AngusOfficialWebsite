import axios from 'axios';
import dayjs from 'dayjs';
import cookie from 'js-cookie';
import binary from '../binary';
import { site, PUB_GM } from '@xcan-angus/tools';

import { domainMap } from './data';

let _env;
const getEnv = () => {
  if (_env === undefined) {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (regex.test(hostname) || hostname === 'localhost') {
        _env = 'dev';
      } else {
        const regex = /(.+)-\w+.xcan.cloud/;
        const match = regex.exec(hostname);
        _env = match ? match[1].split('-')[0] : 'prod';
      }
    }
  }

  return _env;
};

const getUrl = (key) => {
  const env = getEnv();
  if (env && domainMap[getEnv()]) {
    return domainMap[getEnv()][key];
  }

  return ''
};

const stringify = (val) => {
  const searchParams = new URLSearchParams();
  Object.entries(val).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  return searchParams.toString();
};

const messageMap = {
  en: {
    unLogged: 'The system detects that your account has not been logged in, please log in before proceeding.',
    expire: 'User ID expired, please log in again.',
    title: 'Hint',
    cancel: 'Cancel',
    ok: 'Signin'
  },
  zh_CN: {
    unLogged: '系统检测到您的账号还未登录，请您登录后再进行操作。',
    expire: '用户身份过期，请重新登录。',
    title: '提示',
    cancel: '取消',
    ok: '去登录'
  }
};

// 设置超时时间
const setExpireDate = (exp, datetime) => {
  // 计算服务器与本地机器的时间差
  // const localDiff = dayjs().valueOf() - dayjs(datetime).valueOf();
  // 过期时间
  // const diff = exp * 1000 - dayjs(datetime).valueOf();
  const diff = exp * 1000 - dayjs().valueOf();
  // const localExpireDate = dayjs().add(diff + localDiff, 'millisecond').valueOf();
  const localExpireDate = dayjs().add(diff, 'millisecond').valueOf();
  localStorage.setItem('_expire_date', localExpireDate + '');
};

// 获取超时时间
const getExpireDate = () => {
  const expireDate = localStorage.getItem('_expire_date');
  if (!expireDate) {
    return 0;
  }
  return +expireDate;
};

const checkSigninStatus = () => {
  const accessToken = cookie.get('access_token');
  const localeCookie = cookie.get('localeCookie') || 'zh_CN';
  if (!accessToken) {
    localStorage.removeItem('_expire_date');
    return { status: '3', message: messageMap[localeCookie].unLogged };
  }

  const expireDate = getExpireDate();
  // 预留5秒
  if (expireDate && (dayjs().valueOf() - expireDate - 5000) < 0) {
    return { status: '1', message: '已登录' };
  }
  let checkurl = '/gm/api/v1/auth/user?access_token=' + accessToken;
  if (import.meta.env.NODE_ENV === 'production') {
    checkurl = import.meta.env.VITE_APP_APIS + checkurl;
  }
  return axios.get(checkurl).then((res) => {
    if (!res.data.name) {
      cookie.remove('access_token');
      return { status: '2', message: messageMap[localeCookie].expire };
    }
    setExpireDate(res.data.tokenAttributes.exp);
    return { status: '1', message: '已登录' };
  }).catch(async (e) => {
    if (e?.response?.status === 401) {
      const refreshToken = cookie.get('refresh_token');
      if (!refreshToken) {
        return { status: '2', message: messageMap[localeCookie].expire };
      }
      const params = {
        refreshToken,
        clientId: import.meta.env.VITE_APP_CLIENTID,
        clientSecret: import.meta.env.VITE_APP_CLIENTSECRET,
        scope: 'sign'
      };
      let renewurl = `${PUB_GM}/auth/user/renew?` + stringify(params);
      if (import.meta.env.NODE_ENV === 'production') {
        renewurl = import.meta.env.VITE_APP_APIS + renewurl;
      }
      await axios.post(renewurl, params).then((res) => {
        const { data } = res.data;
        cookie.set('access_token', data.access_token);
        cookie.set('refresh_token', data.refresh_token);
        // const exp = +dayjs(res.data.datetime).add(res.data.principal.expiresAt, 'millisecond');
        const exp = dayjs(res.data.principal.expiresAt);
        setExpireDate(exp);
        return { status: '1', message: '已登录' };
      }).catch((err) => {
        cookie.remove('access_token');
        return { status: '2', message: messageMap[localeCookie].expire };
      });
    }
    cookie.remove('access_token');
    return { status: '2', message: messageMap[localeCookie].expire };
  });
};

const getSigninUrl = async () => {

  const gmUrl = await site.getUrl('gm');
  return gmUrl;
  // const clientId = cookie.get('clientId');
  // if (clientId === 'xcan_op') {
  //   return import.meta.env.VITE_APP_OPSIGNIN;
  // }
  // return import.meta.env.VITE_APP_TPSIGNIN;
};

const toSign = async (rediectFlag = false) => {
  if (['/signin', '/register', '/signup'].includes(window.location.pathname)) {
    return;
  }
  let rediectUrl = '';
  if (rediectFlag) {
    rediectUrl = '/signin?t=' + binary.toBinary(location.href);
  }
  // 清空 cookie
  const value = cookie.get();
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return;
  }
  Object.keys(value).forEach((key) => {
    cookie.remove(key);
  });
  const signinUrl = await getSigninUrl();
  window.location.href = signinUrl + rediectUrl;
};

const isSignin = async (dialogFlag = true) => {
  const signinInfo = await checkSigninStatus();
  if (signinInfo.status === '1') {
    return true;
  }
  return false;
};

export function gotoPath(type = 0) {
  // 防止传入 event 时出现问题
  if (typeof type !== 'number') {
    type = 0;
  }
  let path = null;
  switch (type) {
    case 0:
      // 登录
      path = '';
      break;
    case 1:
      // 注册
      path = '/signup';
      break;
  }
  // 清空本地用户信息
  // import('../eventBus').then((vue) => {
  //   vue.default.$emit('clearUserInfo');
  // });
  const origin = getSigninUrl();
  location.href = `${origin}${path}?t=` + binary.toBinary(location.href);
}

export { isSignin, checkSigninStatus, getSigninUrl, toSign, getUrl };
