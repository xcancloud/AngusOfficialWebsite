import dayjs from 'dayjs';
import cookies from 'js-cookie';
export * as angusTools from '@xcan-angus/tools';

/**
 * 文件大小格式化方法
 * @params size 表示要被转化的容量大小，以字节为单
 * @params decimal 表示如果转换时出小数，四舍五入保留多少位 默认为2位小数
 * @return fileSize 格式化后的文件大小
 */
export function filesize (size = 0, decimal = 2) {
  if (size === 0) { return '0 B'; }
  const c = 1024;
  const e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const f = Math.floor(Math.log(size) / Math.log(c));
  return parseFloat((size / Math.pow(c, f)).toFixed(decimal)) + ' ' + e[f];
}

/* 获取当前年月的总天数 */
export function getDayTotal () {
  // 当月天数
  const monthDay = dayjs().daysInMonth();
  // 当年的天数
  let yearDay = 0;
  for (let i = 0; i < 12; i++) {
    yearDay += dayjs().month(i).daysInMonth();
  }
  return {
    monthDay,
    yearDay
  };
}

/* 获取某一年的天数 */
export function getDayInMonth (year = dayjs().year()) {
  // 当年的天数
  let yearDay = 0;
  for (let i = 0; i < 12; i++) {
    yearDay += dayjs().year(year).month(i).daysInMonth();
  }
  return yearDay;
}

/* 秒转时分秒方法 */
export function formatTime (time) {
  const H = Math.floor(time / 60 / 60); // 小时
  const M = Math.floor((time / 60) % 60);
  const S = Math.floor((time % 60) % 60);
  return `${H <= 1 ? '00:' : (H < 10 ? '0' + H : H) + ':'}${M < 1 ? '00:' : (M < 10 ? '0' + M : M) + ':'}${(S < 10 ? '0' + S : S)}`;
}

/* 层级型数组扁平化方法 */
export function flatten (arr = [], key = 'children') {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
    if (Array.isArray(arr[i][key])) {
      result = result.concat(flatten(arr[i][key]).map(item => ({ ...item, parent: { ...arr[i], [key]: null } })));
      arr[i][key] = null;
    }
  }
  return result;
}

/* 深拷贝 */
export function deepCopy (data) {
  if (typeof data === 'object' && data !== null) {
    const result = Array.isArray(data) ? [] : {};
    for (const key in data) {
      result[key] = deepCopy(data[key]);
    }
    return result;
  }
  return data;
}

/**
 * 获取头像
 */

export function getAvatar (url, type) {
  const avatar = type === false ? '' : require('~/assets/image/avatar/default.png');
  if (url) {
    if (cookies.get('access_token')) {
      return url + `&access_token=${cookies.get('access_token')}`;
    } else if (type === false) {
      return url;
    } else {
      return avatar;
    }
  } else {
    return avatar;
  }
}

/**
 * 获取视频
 */

export function getVideo (url) {
  return url ? url + `&access_token=${cookies.get('access_token')}` : '';
}

/**
 * 获取 devices
 */
export function getDeviceInfo () {
  const { appCodeName, appName, appVersion, language, platform, userAgent } = window.navigator;
  const deviceInfo = JSON.stringify({
    appCodeName, appName, appVersion, language, platform, userAgent
  });
  const deviceId = sessionStorage.getItem('visitorId') || undefined;
  return {
    deviceInfo,
    deviceId
  };
}

/**
 * 获取当前页面 URL 中的指定参数及其值
 * @param {Array<string>} keys - 需要提取的参数名数组
 * @returns {Object} - 包含参数及其值的对象
 */
export function getSearchTerms (keys) {
  // 获取当前页面的 URL
  const url = new URL(window.location.href);

  // 创建一个对象来存储参数及其值
  const extractedParams = {};

  // 遍历参数数组
  keys.forEach((key) => {
    // 检查 URL 中是否存在该参数
    const value = url.searchParams.get(key);
    if (value !== null) {
      extractedParams[key] = value; // 存储参数及其值
    }
  });

  return extractedParams; // 返回提取的参数对象
}


export const getCurrentLanguage = () => {
  const path = location.pathname;

  const targetPath = path.split('/')[1];

  const allLanguage = ['zh', 'en', 'fr', 'de', 'ja', 'zh-TW', 'pt', 'ru', 'es', 'ko', 'fa'];
  if (allLanguage.includes(targetPath)) {
    return `/${targetPath}`
  }
  return '';
};
