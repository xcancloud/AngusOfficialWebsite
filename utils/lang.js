/* eslint-disable no-underscore-dangle */
import cookies from 'js-cookie';
import { GM } from '@xcan-angus/tools';
import http from './http';

const ZH = 'zh_CN';

const _getLang = (language = ZH) => {
  if (['en', 'zh_CN'].includes(language)) {
    return language;
  }

  return ZH;
};

/**
 * 1 优先获取存储在cookie的语言偏好
 * 2 cookie没有存储语言偏好
 * 2.1 已经登录、获取用户的语言偏好设置
 * 2.2 没有登录，获取浏览器语言类型
 * @returns string
 */
const getLang = async () => {
  let language = '';
  if (typeof navigator !== 'undefined') {
    language = navigator.language;
  }
  if (cookies.get('localeCookie')) {
    language = cookies.get('localeCookie');
  } else if (cookies.get('access_token')) {
    const [, res] = await http.get(`${GM}/user/preference/current`);
    if (res?.data?.language) {
      language = res.data.language;
    }
  }
  return _getLang(language);
};

/**
 * 当前设置的语言保存到cookie
 * @param {*} language
 * @returns void
 */
const setLang = (language = ZH) => {
  const _language = _getLang(language);
  cookies.set('localeCookie', _language);
  document.getElementsByTagName('html')[0].lang = _language.split('_')[0];
  // if (cookies.get('access_token')) {
  //   await http.patch('/uc/api/v1/user/preference/current', { _language });
  // }
};

/**
 * 根据语言环境设置document.title
 */
const setTitle = (language = ZH) => {
  const _language = _getLang(language);
  const titleMap = {
    en: 'XCan Cloud',
    zh_CN: '晓蚕云'
  };

  if (titleMap[_language]) {
    document.title = titleMap[_language];
  }
};

export { getLang, setLang, setTitle };
