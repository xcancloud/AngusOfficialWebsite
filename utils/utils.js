/* eslint-disable import/prefer-default-export */


/**
 * 返回数据类型
 * @param {*} data
 * @returns 'array'|'string'|'number'|'boolean'|'symbol'|'blob'
 */
function typeString (data) {
  return Object.prototype.toString.call(data).replace(/^\[object\s{1}(\S{1,})\]$/g, '$1').toLowerCase();
}

// 数字转为千分位
export function formatNumber (value = 0) {
  let temp = '0';
  if (value < 1000) {
    temp = value + '';
  } else if (value < 1000000) {
    temp = value / 1000 + 'K';
  } else if (value < 1000000000) {
    temp = value / 1000000 + 'M';
  } else {
    temp = value / 1000000000 + 'B';
  }
  return temp.replace(/(\d+.?\d*)([kmb])/gi, (_matched, capture1, capture2) => {
    return (capture1 + '').replace(/(\d+.)(\d{1,3})\d+/, '$1$2') + capture2;
  });
}
export { typeString };
