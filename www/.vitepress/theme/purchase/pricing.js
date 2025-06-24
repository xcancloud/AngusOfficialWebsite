const nodeCodeList = [
  'Node4C8GSpec',
  'Node8C16GSpec',
  'Node16C32GSpec',
  'Node32C64GSpec',
  'Node64C128GSpec'
];

const get = (code) => {
  return nodeCodeList.find((item) => {
    const rex = new RegExp('^' + item);
    return rex.test(code);
  });
};

const getSpecInfo = (data = {}) => {
  if (!data.specInfos?.length) {
    return {};
  }

  const specInfo = {};
  data.specInfos.every((item) => {
    const method = item.method.value;
    if (item.resources?.length) {
      const codeKey = get(item.code);
      if (codeKey) {
        specInfo[codeKey] = {
          method,
          unitPrice: 0,
          specId: item.id,
          min: +item.min || 1,
          max: +item.max,
          durationMin: +(item.duration?.durationMin || 0),
          durationMax: +(item.duration?.durationMax || 0),
          resourceQuotas: {}
        };

        item.resources.every((ele) => {
          specInfo[codeKey].unitPrice += (+ele.unitPrice * +ele.min);
          if (specInfo[codeKey].resourceQuotas) {
            specInfo[codeKey].resourceQuotas[ele.id] = +ele.min;
          } else {
            specInfo[codeKey].resourceQuotas = {
              [ele.id]: +ele.min
            };
          }

          return true;
        });
      } else {
        item.resources.every((ele) => {
          if (/^Service/.test(ele.code)) { // 服务费单价
            specInfo.service = {
              method,
              unitPrice: +ele.unitPrice,
              id: ele.id,
              specId: item.id,
              min: +ele.min,
              max: +ele.max,
              durationMin: +(item.duration?.durationMin || 0),
              durationMax: +(item.duration?.durationMax || 0)
            };
          }

          if (/^AngusTesterConcurrency/.test(ele.code)) { // 并发数单价
            specInfo.concurrency = {
              method,
              specId: item.id,
              id: ele.id,
              unitPrice: +ele.unitPrice,
              min: +ele.min,
              max: +ele.max,
              durationMin: +(item.duration?.durationMin || 0),
              durationMax: +(item.duration?.durationMax || 0)
            };
          }

          if (/^AngusTesterConcurrentTask/.test(ele.code)) { // 并发任务数单价
            specInfo.task = {
              method,
              specId: item.id,
              id: ele.id,
              unitPrice: +ele.unitPrice,
              min: +ele.min,
              max: +ele.max,
              durationMin: +(item.duration?.durationMin || 0),
              durationMax: +(item.duration?.durationMax || 0)
            };
          }

          if (/^User/.test(ele.code)) { // 用户数单价
            specInfo.user = {
              method,
              specId: item.id,
              id: ele.id,
              unitPrice: +ele.unitPrice,
              min: +ele.min,
              max: +ele.max,
              durationMin: +(item.duration?.durationMin || 0),
              durationMax: +(item.duration?.durationMax || 0)
            };
          }

          if (/^AngusTesterNode/.test(ele.code)) { // 节点配额单价
            specInfo.node = {
              method,
              specId: item.id,
              id: ele.id,
              unitPrice: +ele.unitPrice,
              min: +ele.min,
              max: +ele.max,
              durationMin: +(item.duration?.durationMin || 0),
              durationMax: +(item.duration?.durationMax || 0)
            };
          }

          if (/^Bandwidth/.test(ele.code)) { // 带宽单价
            specInfo.bandwidth = {
              method,
              specId: item.id,
              id: ele.id,
              unitPrice: +ele.unitPrice,
              min: +ele.min,
              max: +ele.max,
              durationMin: +(item.duration?.durationMin || 0),
              durationMax: +(item.duration?.durationMax || 0)
            };
          }

          if (/^SystemDisk/.test(ele.code)) { // 系统盘单价
            specInfo.systemDisk = {
              method,
              specId: item.id,
              id: ele.id,
              unitPrice: +ele.unitPrice,
              min: +ele.min,
              max: +ele.max,
              durationMin: +(item.duration?.durationMin || 0),
              durationMax: +(item.duration?.durationMax || 0)
            };
          }

          if (/^FileStore/.test(ele.code)) { // 云空间单价
            specInfo.cloudSpace = {
              method,
              specId: item.id,
              id: ele.id,
              unitPrice: +ele.unitPrice,
              min: +ele.min,
              max: +ele.max,
              durationMin: +(item.duration?.durationMin || 0),
              durationMax: +(item.duration?.durationMax || 0)
            };
          }

          return true;
        });
      }
    } else {
      // 按时长购买，只有一种规格
      const method = item.method.value;
      if (['BY_DURATION', 'NONE'].includes(method) && item.duration) {
        specInfo.BY_DURATION = {
          method,
          unitPrice: +(item.duration.durationUnitPrice || 0),
          specId: item.id,
          min: 0,
          max: 0,
          durationMin: +(item.duration?.durationMin || 0),
          durationMax: +(item.duration?.durationMax || 0)
        };
      }
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

  const _method = data.specInfos?.[0].method.value;
  return {
    ...specInfo,
    method: _method,
    id: data.id,
    discountByTime, // 按时长打折
    discountByPrice // 按总价打折
  };
};

export { getSpecInfo };
