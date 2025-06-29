const compareVersion = (v1, v2) => {
    const _v1 = v1.split('.');
    const _v2 = v2.split('.');
    const len = Math.max(_v1.length, _v2.length);
  
    while (v1.length < len) {
      _v1.push('0');
    }
    while (v2.length < len) {
      _v2.push('0');
    }
  
    let num1;
    let num2;
    for (let i = 0; i < len; i++) {
      num1 = parseInt(_v1[i]);
      num2 = parseInt(_v2[i]);
      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }
  
    return 0;
  };
  
  const maxVersion = (versions) => {
    if (!versions?.length) {
      return '';
    }
  
    return versions.reduce((prev, cur) => {
      debugger;
      if (compareVersion(prev, cur) === -1) {
        prev = cur;
      }
      return prev;
    });
  };
  
  export {
    compareVersion,
    maxVersion
  };
  
  export default {
    compareVersion,
    maxVersion
  };
  