const getSpecInfo = (data = {}) => {
  let concurrencyPrice = 0;// 并发数单价
  let concurrencyMin = 0;// 并发数最小值
  let concurrencyMax = 0;// 并发数最大值
  let taskPrice = 0;// 并发任务数单价
  let taskMin = 0;// 并发任务数最小值
  let taskMax = 0;// 并发任务数最大值
  let nodePrice = 0;// 节点配额单价
  let nodeMin = 0;// 节点配额最小值
  let nodeMax = 0;// 节点配额最大值

  let num = 0;
  data.specInfos.every((item) => {
    item.resources.every((ele) => {
      if (/^AngusTesterConcurrency/.test(ele.code)) { // 并发数单价
        concurrencyPrice = +ele.unitPrice;
        concurrencyMin = +ele.min;
        concurrencyMax = +ele.max;
        num++;
      }

      if (/^AngusTesterConcurrentTask/.test(ele.code)) { // 并发任务数单价
        taskPrice = +ele.unitPrice;
        taskMin = +ele.min;
        taskMax = +ele.max;
        num++;
      }

      if (/^AngusTesterNode/.test(ele.code)) { // 节点配额单价
        nodePrice = +ele.unitPrice;
        nodeMin = +ele.min;
        nodeMax = +ele.max;
        num++;
      }

      return true;
    });

    if (num >= 4) {
      return false;
    }

    return true;
  });

  // 按时长打折
  let discountByTime = null;
  let discountByPrice = null;
  if (data.discounts) {
    discountByTime = data.discounts.REDUCTION_BY_DURATION;
    discountByPrice = data.discounts.REDUCTION_BY_TOTAL_PRICE;
  }

  return {
    concurrencyPrice,
    concurrencyMin,
    concurrencyMax,
    taskPrice,
    taskMin,
    taskMax,
    nodePrice,
    nodeMin,
    nodeMax,
    discountByTime, // 按时长打折
    discountByPrice // 按总价打折
  };
};

const has = (code, options) => {
  return !!options.find((item) => {
    const rex = new RegExp('^' + item);
    return rex.test(code);
  });
};

const getOptions = (data = {}, options = []) => {
  const specInfos = data.specInfos;
  let systemDiskUnitPrice = 0;// 系统盘单价
  let bandwidthUnitPrice = 0;// 带宽单价
  specInfos.every((item) => {
    if (/^SystemDiskSpec/.test(item.code)) { // 系统盘单价
      systemDiskUnitPrice = +item.resources[0].unitPrice;
    }

    if (/^Bandwidth/.test(item.code)) { // 带宽单价
      bandwidthUnitPrice = +item.resources[0].unitPrice;
    }

    return true;
  });

  return options.reduce((prev, cur) => {
    const temp = specInfos.find((item) => {
      const rex = new RegExp('^' + cur.specCode);
      return rex.test(item.code);
    });
    const resourcesPrice = temp.resources.reduce((_prev, _cur) => {
      if (_cur.unitPrice && _cur.min) {
        _prev += (+_cur.unitPrice * +_cur.min);
      }

      return _prev;
    }, 0);

    prev.push({
      label: cur.label,
      value: cur.specCode,
      unitPrice: resourcesPrice + (+cur.systemDisk * systemDiskUnitPrice) + (+cur.bandwidth * bandwidthUnitPrice), // 系统盘+带宽+资源费用的单价
      min: +(temp.min || 1) || 1,
      max: +(temp.max || 1) || 1
    });

    return prev;
  }, []);
};

export { getOptions, getSpecInfo };
