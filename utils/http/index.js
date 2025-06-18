import axios from 'axios';
import cookie from 'js-cookie';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { angusTools } from '../index';

const { http, PUB_ESS } = angusTools;


import { toSign } from '../site';

let visitorId;
const getVisitorId = () => {
  if (visitorId) {
    return visitorId;
  }

  return FingerprintJS.load().then(fp => fp.get()).then((result) => {
    visitorId = result.visitorId;
    return visitorId;
  });
};

const httpClient = axios.create({
  responseType: 'json'
});

// 需要重新发送请求的请求集合
let requestList = [];
// 正在刷新token
let isRefreshing = false;

/**
 * 请求拦截器
 * 1. api接口自动加上token
 */
httpClient.interceptors.request.use(async (config) => {
  if (config.url) {
    if (config.url.includes('/api/') && config.headers) {
      config.headers.Authorization = `Bearer ${cookie.get('access_token')}`;
    }

    if (process.env.NODE_ENV === 'production') {
      if (config.url.includes('/filepxy/')) {
        config.url = process.env.VUE_APP_FILES + config.url;
      } else {
        config.url = process.env.VUE_APP_APIS + config.url;
      }
    }

    config.headers['XC-Auth-Device-Id'] = await getVisitorId();

    return config;
  }
  throw new Error('Invalid URL');
}, (err) => {
  throw err;
});

/**
 * 响应拦截器
 * 1. api接口自动加上token
 */
httpClient.interceptors.response.use((response) => {
  if (!response?.data) {
    return {
      code: 'S',
      data: null,
      _headers: response.headers
    };
  }

  if (!response.data?.code) {
    return {
      code: 'S',
      data: response.data,
      _headers: response.headers
    };
  }

  if (response.data.code === 'S') {
    return { ...response.data, _headers: response.headers };
  }

  throw response.data;
}, async (err) => {
  if (!err || !err.response) {
    throw new Error('Network error, please try again later!');
  }

  if ([401, 403].includes(err.response.status)) {
    const data = err.response.data;
    const eKey = data.ext.eKey;
    // 需要刷新token
    if (['invalid_token', 'expired_token'].includes(eKey)) {
      // 去刷新token
      if (!isRefreshing) {
        const refreshToken = cookie.get('refresh_token');
        // 没有刷新token直接跳转到登录页
        if (!refreshToken) {
          toSign(true);
          throw err.response.data;
        }
        const params = {
          refreshToken,
          clientId: process.env.VUE_APP_CLIENTID,
          clientSecret: process.env.VUE_APP_CLIENTSECRET,
          scope: 'sign'
        };
        isRefreshing = true;
        let renewurl = `${PUB_ESS}/auth/user/renew?` + getURLSearchParams(params, true);
        if (process.env.NODE_ENV === 'production') {
          renewurl = process.env.VUE_APP_APIS + renewurl;
        }
        const [error, res] = await to(axios.post(renewurl));
        isRefreshing = false;
        if (error) {
          toSign(true);
          // 重新发送请求
          // eslint-disable-next-line node/no-callback-literal
          requestList.forEach(cb => cb(true));
          requestList = [];
          // 本次请求重新发送
          return new Promise((_resolve, reject) => {
            reject(err.response?.data);
          });
        }
        const { data: _resData } = res.data;
        cookie.set('access_token', _resData.access_token);
        cookie.set('refresh_token', _resData.refresh_token);

        // 重新发送请求
        requestList.forEach(cb => cb());
        requestList = [];

        // 本次请求重新发送
        return new Promise((resolve, reject) => {
          httpClient.request(err.config).then((_res) => {
            resolve(_res.data);
          }).catch((_e) => {
            reject(_e);
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          // 把该请求装入requestList集合，等待刷新token后自动发送请求
          requestList.push((isError = false) => {
            if (isError) {
              reject(err.response?.data);
            } else {
              httpClient.request(err.config).then((_res) => {
                resolve(_res.data);
              }).catch((_e) => {
                reject(_e);
              });
            }
          });
        });
      }
    } else { // 跳转到登录页
      toSign(true);
      throw err.response.data;
    }
  }

  throw err.response.data;
});

function getURLSearchParams(params, stringify = false) {
  if (!params) {
    return '';
  }

  if (typeof params === 'string') {
    return params;
  }

  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return params.toString();
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) === '[object Array]') {
      value.forEach((item, index) => {
        if (Object.prototype.toString.call(item) === '[object Object]') {
          Object.entries(item).forEach(([_key, _value]) => {
            searchParams.append((`${key}[${index}].${_key}`), `${_value}`);
          });
        } else {
          searchParams.append(key, `${item}`);
        }
      });
    } else if (value !== undefined) {
      searchParams.append(key, value);
    }
  });
  return stringify ? searchParams.toString() : searchParams;
}

async function to(promise) {
  try {
    let res = await promise;
    if (!res) {
      res = {};
    }
    return [null, res];
  } catch (error) {
    // eslint-disable-next-line no-prototype-builtins
    if (error && Object.prototype.toString.call(error) === '[object Object]' && error.hasOwnProperty('msg')) {
      error.message = error.msg;
      delete error.msg;
    }
    return [error, {}];
  }
}

async function del(url, data, config) {
  if (config?.dataType) {
    return await to(httpClient.delete(url, { ...config, data }));
  }
  const params = getURLSearchParams(data);
  return await to(httpClient.delete(url, { ...config, params }));
}

async function get(url, params, config) {
  const searchParams = getURLSearchParams(params);
  return await to(httpClient.get(url, { ...config, params: searchParams }));
}

async function post(url, data, config) {
  if (config?.paramsType) {
    const searchParams = getURLSearchParams(data);
    return await to(httpClient.post(url, null, { ...config, params: searchParams }));
  }
  return await to(httpClient.post(url, data, config));
}

async function put(url, data, config) {
  if (config?.paramsType) {
    const params = getURLSearchParams(data);
    return await to(httpClient.put(url, null, { ...config, params }));
  }
  return await to(httpClient.put(url, data, { ...config }));
}

async function patch(url, data, config) {
  if (config?.paramsType) {
    const params = getURLSearchParams(data);
    return await to(httpClient.patch(url, null, { ...config, params }));
  }
  return await to(httpClient.patch(url, data, config));
}

http.create();

// export default http;

export default {
  del,
  get,
  post,
  put,
  patch
}
