<script lang="ts" setup>
import { ref, watch, computed, onMounted } from 'vue';
import { Alert, Button, Checkbox, Select, SelectOption, Radio, Popover, InputNumber, RadioGroup } from 'ant-design-vue';
import { GM, ESS, PUB_ESS } from '@xcan-angus/tools';
import { useRoute, useRouter } from 'vitepress';

import { isSignin } from '@/utils/site/index';
import { getSpecInfo } from './pricing';
import http from '@/utils/http';
import { round } from '@/utils/math';
import { maxVersion } from '@/utils/version';
import { getUrl } from '@/utils/site';
import { getCurrentLanguage } from '@/utils/index';

const route = useRoute();
const router = useRouter();
const goodsCode = 'AngusTester';
const loginVisible = ref(false);
const authVisible = ref(false);

const taskInputError = ref(false);
const nodeInputError = ref(false);
const nodeErrorType = ref(1);
const goodsInfo = ref({});
const concurrencyNum = ref(0);
const taskNum = ref(0);
const nodeNum = ref(0);
const nodeSource = ref(1); // 1 - 在线购买节点，0 - 自有节点
const selectNode = ref('Node4C8GSpec');
const nodeSpecNum = ref(0); // 节点规格数量
const bandwidthNum = ref(0); // 带宽
const systemDiskNum = ref(0); // 系统盘
const concurrencyUsedNum = ref(0); // 已经使用的并发数
const taskUsedNum = ref(0); // 已经使用的并发任务数
const nodeUsedNum = ref(0); // 已经使用的节点配额
const couponId = ref(); // 选中的优惠券
const hadSetCouponId = ref(false);
const agreeFlag = ref(false);
const confirmLoading = ref(false);
const errorMessage = ref();
const method = ref();
const discountByTime = ref();
const discountByPrice = ref();
const concurrencyInfo = ref({
  specId: undefined,
  id: undefined,
  unitPrice: 0,
  min: 0,
  max: 0,
  realmin: undefined,
  realmax: undefined
});
const nodeInfo = ref({
  specId: undefined,
  id: undefined,
  unitPrice: 0,
  min: 0,
  max: 0
});
const taskInfo = ref({
  specId: undefined,
  id: undefined,
  unitPrice: 0,
  min: 0,
  max: 0
});
const bandwidthInfo = ref({
  specId: undefined,
  id: undefined,
  unitPrice: 0,
  min: 0,
  max: 0
});

const systemDiskInfo = ref({
  specId: undefined,
  id: undefined,
  unitPrice: 0,
  min: 0,
  max: 0
});
const cloudCouponList = ref([]);
const duration = ref(1);
const nodeOptions = [
  { label: '4C8G 3.5Ghz主频', value: 'Node4C8GSpec' },
  { label: '8C16G 3.5Ghz主频', value: 'Node8C16GSpec' },
  { label: '16C32G 3.5Ghz主频', value: 'Node16C32GSpec' },
  { label: '32C64G 3.5Ghz主频', value: 'Node32C64GSpec' },
  { label: '64C128G 3.5Ghz主频', value: 'Node64C128GSpec' }
];
const nodeSpecMap = ref({
  Node4C8GSpec: {
    specId: undefined,
    id: undefined,
    unitPrice: 0,
    min: 10,
    max: 100,
    resourceQuotas: {}
  },
  Node8C16GSpec: {
    specId: undefined,
    id: undefined,
    unitPrice: 0,
    min: 0,
    max: 0,
    resourceQuotas: {}
  },
  Node16C32GSpec: {
    specId: undefined,
    id: undefined,
    unitPrice: 0,
    min: 0,
    max: 0,
    resourceQuotas: {}
  },
  Node32C64GSpec: {
    specId: undefined,
    id: undefined,
    unitPrice: 0,
    min: 0,
    max: 0,
    resourceQuotas: {}
  },
  Node64C128GSpec: {
    specId: undefined,
    id: undefined,
    unitPrice: 0,
    min: 0,
    max: 0,
    resourceQuotas: {}
  }
});
const timeOptions = ref([
  { label: '1天', value: 1, discount: '' },
  { label: '2天', value: 2, discount: '' },
  { label: '3天', value: 3, discount: '' },
  { label: '7天', value: 7, discount: '' },
  { label: '15天', value: 15, discount: '' },
  { label: '1月', value: 30, discount: '' },
  { label: '2月', value: 60, discount: '' },
  { label: '3月', value: 90, discount: '' },
  { label: '6月', value: 180, discount: '' },
  { label: '1年', value: 365, discount: '' },
  { label: '2年', value: 730, discount: '' },
  { label: '3年', value: 1095, discount: '' }
]);

const durationMap = {
  1: '1天',
  2: '2天',
  3: '3天',
  7: '7天',
  15: '15天',
  30: '1月',
  60: '2月',
  90: '3月',
  180: '6月',
  365: '1年',
  730: '2年',
  1095: '3年'
};
const minNodeLimit = computed(() => {
  if (!concurrencyNum.value) {
    return 0;
  }

  return Math.ceil(concurrencyNum.value / 10000);
});

const concurrencyPrice = computed(() => {
  return concurrencyInfo.value.unitPrice * +(concurrencyNum.value || 0) * duration.value;
});

const taskPrice = computed(() => {
  return taskInfo.value.unitPrice * +(taskNum.value || 0) * duration.value;
});

const nodePrice = computed(() => {
  return nodeInfo.value.unitPrice * +(nodeNum.value || 0) * duration.value;
});

const systemDiskPrice = computed(() => {
  return systemDiskInfo.value.unitPrice * systemDiskNum.value * +(nodeSpecNum.value || 0) * duration.value;
});

const bandwidthPrice = computed(() => {
  return bandwidthInfo.value.unitPrice * bandwidthNum.value * +(nodeSpecNum.value || 0) * duration.value;
});
const nodeSpecPrice = computed(() => {
  if (nodeSource.value && nodeSpecMap.value[selectNode.value]) {
    return +(nodeSpecNum.value || 0) * nodeSpecMap.value[selectNode.value].unitPrice * duration.value;
  }

  return 0;
});
const totalAmount = computed(() => {
  let sum = concurrencyPrice.value + taskPrice.value + nodePrice.value;
  if (nodeSource.value) {
    sum += (systemDiskPrice.value + bandwidthPrice.value + nodeSpecPrice.value);
  }
  return round(sum);
});

const discountByTimeAmount = computed(() => {
  if (discountByTime.value) {
    const time = duration.value;
    const maxDiscount = Object.entries(discountByTime.value).reduce((prev, [key, value]) => {
      if (time >= +key) {
        if (prev < +value) {
          prev = +value;
        }
      }

      return prev;
    }, 0);

    return +totalAmount.value * maxDiscount;
  }
  return 0;
});


const discountByPriceAmount = computed(() => {
  if (discountByPrice.value) {
    const sum = +totalAmount.value - (+discountByTimeAmount.value);
    const maxDiscount = Object.entries(discountByPrice.value).reduce((prev, [key, value]) => {
      if (+totalAmount.value >= +key) {
        if (prev < +value) {
          prev = +value;
        }
      }

      return prev;
    }, 0);

    return sum * maxDiscount;
  }

  return 0;
});

const couponList = computed(() => {
  let list = cloudCouponList.value;
  const price = +pureAmount.value;
  if (price >= 0) {
    list = list.filter((item) => {
      return (+totalAmount.value >= item.minSpendLimit) && item.balance > 0;
    }).map((item) => {
      let discountAmount = item.balance;
      if (price < item.balance) {
        discountAmount = price;
      }
      return {
        ...item,
        discountAmount
      };
    });
  }

  return list;
});


const discountByCouponAmount = computed(() => {
  const temp = couponList.value?.find(item => item.value === couponId.value);
  if (temp) {
    return temp.discountAmount;
  }

  return 0;
});

const pureAmount = computed(() => {
  return +totalAmount.value - discountByTimeAmount.value - discountByPriceAmount.value;
});




const payAmount = computed(() => {
  return round(pureAmount.value - discountByCouponAmount.value);
});




const nodeSpecMin = computed(() => {
  const nodeMax = nodeInfo.value.realmax;
  const nodeMin = nodeInfo.value.realmin;
  if (nodeMax === nodeMin) {
    return nodeMin;
  }

  const nodeSpecMin = nodeSpecMap.value[selectNode.value].min;
  if (nodeSpecMin > nodeMax) {
    return nodeMax;
  }

  return nodeSpecMin;
});
const nodeSpecMax = computed(() => {
  const nodeMax = nodeInfo.value.realmax;
  const nodeMin = nodeInfo.value.realmin;
  if (nodeMax === nodeMin) {
    return nodeMin;
  }

  const nodeSpecMax = nodeSpecMap.value[selectNode.value].max;
  if (nodeSpecMax > nodeMax) {
    return nodeMax;
  }

  return nodeSpecMax;
});

const couponPlaceholder = computed(() => {
  if (couponList.value?.length) {
    return '请选择优惠券';
  }

  return '无可用优惠券';
})
const nodeHref = computed(() => {
  return getUrl('at') + '/node';
});

const transformDiscount = (value) => {
  if (!value) {
    return undefined;
  }

  const sum = 100 - (+value * 100);
  return Math.round((sum / 10) * 100) / 100;
};

const changeDuration = (value) => {
  duration.value = value;
}
const onClose = () => {
  errorMessage.value = undefined;
};

const initializeData = () => {
  const queryKey = route.data?.params?.t;
  if (queryKey) {
    const dayMap = { d: 1, m: 30, y: 365 };
    duration.value = dayMap[queryKey] || 1;
    const sessionKey = '__' + queryKey + '__';
    let tempInfo = localStorage.getItem(sessionKey);
    if (tempInfo) {
      // 初始化数据不能大于已经使用的配额
      const concurrencyMax = concurrencyInfo.value.max;
      const concurrencyMin = concurrencyInfo.value.min;
      const taskMax = taskInfo.value.max;
      const taskMin = taskInfo.value.min;
      const nodeMax = nodeInfo.value.max;
      const nodeMin = nodeInfo.value.min;
      // const nodeSpecMax = this.nodeSpecMax;
      // const nodeSpecMin = this.nodeSpecMin;

      tempInfo = JSON.parse(tempInfo);
      const maximum = tempInfo?.maximum;
      const taskNum = tempInfo?.taskNum;
      const nodeNum = tempInfo?.nodeNum;
      const nodeSpecNum = tempInfo?.nodeSpecNum;

      if (concurrencyMax === concurrencyMin) {
        concurrencyNum.value = concurrencyMin;
      } else if (maximum > concurrencyMax) {
        concurrencyNum.value = concurrencyMax;
      } else if (maximum < concurrencyMin) {
        concurrencyNum.value = concurrencyMin;
      } else {
        concurrencyNum.value = maximum;
      }

      if (taskMax === taskMin) {
        taskNum.value = taskMin;
      } else if (taskNum > taskMax) {
        taskNum.value = taskMax;
      } else if (taskNum < taskMin) {
        taskNum.value = taskMin;
      } else {
        taskNum.value = taskNum;
      }

      if (nodeMax === nodeMin) {
        nodeNum.value = nodeMin;
      } else if (nodeNum > nodeMax) {
        nodeNum.value = nodeMax;
      } else if (nodeNum < nodeMin) {
        nodeNum.value = nodeMin;
      } else {
        nodeNum.value = nodeNum;
      }

      if (tempInfo?.nodeSpec) {
        nodeSource.value = 1;
        selectNode.value = tempInfo.nodeSpec;

        if (nodeSpecMax.value === nodeSpecMin.value) {
          nodeSpecNum.value = nodeSpecMin.value;
        } else if (nodeSpecNum > nodeSpecMax.value) {
          nodeSpecNum.value = nodeSpecMax.value;
        } else if (nodeSpecNum < nodeSpecMin.value) {
          nodeSpecNum.value = nodeSpecMin.value;
        } else {
          nodeSpecNum.value = nodeSpecNum;
        }
      }
    }

    const url = new URL(location.href);
    url.searchParams.delete('t');
    history.pushState(null, '', url.href);

    localStorage.removeItem(sessionKey);
  }
}

const loadQuota = async () => {
  const params = {
    appCode: goodsCode,
    filters: [{
      key: 'name',
      op: 'IN',
      value: [
        'AngusTesterConcurrentTask',
        'AngusTesterConcurrency',
        'AngusTesterNode'
      ]
    }]
  };
  const [error, { data }] = await http.get(`${GM}/setting/tenant/quota/search`, params);
  if (error) {
    return;
  }

  if (data && data.list && data.list.length) {
    data.list.every((item) => {
      switch (item.name.value) {
        case 'AngusTesterConcurrentTask':
          taskUsedNum.value = isNaN(item.quota) ? 0 : +item.quota;
          break;
        case 'AngusTesterConcurrency':
          concurrencyUsedNum.value = isNaN(item.quota) ? 0 : +item.quota; ;
          break;
        case 'AngusTesterNode':
          nodeUsedNum.value = isNaN(item.quota) ? 0 : +item.quota; ;
          break;
      }

      return true;
    });
  }
};

const getPricingTemplate = async (id) => {
  const [error, res] = await http.get(`${PUB_ESS}/pricing/template/` + id);
  if (error || !res.data) {
    return {};
  }

  return res.data;
};

const setLatestApp = async () => {
  const [error, res] = await http.get(`${PUB_ESS}/store/goods/${goodsCode}/online`);
  if (error || !res.data) {
    return;
  }

  const list = res.data.filter(item => item.editionType.value === 'CLOUD_SERVICE');
  const evs = list.map(item => item.version);
  const maxev = maxVersion(evs);
  goodsInfo.value = list.find(item => item.version === maxev);
  if (!goodsInfo.value) {
    return;
  }

  const resInfo = await getPricingTemplate(goodsInfo.value.pricingTemplateId);
  const tempInfo = getSpecInfo(resInfo);

  method.value = tempInfo.method;

  duration.value = tempInfo.node.durationMin || 1;
  timeOptions.value = timeOptions.value.filter((item) => {
    return item.value >= tempInfo.node.durationMin && item.value <= tempInfo.node.durationMax;
  });

  const diffValue = tempInfo.concurrency.max - concurrencyUsedNum.value;
  let realmax = diffValue;
  let realmin = tempInfo.concurrency.min;
  if (diffValue < tempInfo.concurrency.min) {
    realmax = 0;
    realmin = 0;
  }
  concurrencyInfo.value = {
    ...tempInfo.concurrency,
    realmax,
    realmin,
    diffValue,
    usedNum: concurrencyUsedNum.value
  };

  const diffValue1 = tempInfo.node.max - nodeUsedNum.value;
  let realmax1 = diffValue1;
  let realmin1 = tempInfo.node.min;
  if (diffValue1 < tempInfo.node.min) {
    realmax1 = 0;
    realmin1 = 0;
  }
  nodeInfo.value = {
    ...tempInfo.node,
    realmax: realmax1,
    realmin: realmin1,
    diffValue: diffValue1,
    usedNum: nodeUsedNum.value
  };

  const diffValue2 = tempInfo.task.max - taskUsedNum.value;
  let realmax2 = diffValue2;
  let realmin2 = tempInfo.task.min;
  if (diffValue2 < tempInfo.task.min) {
    realmax2 = 0;
    realmin2 = 0;
  }
  taskInfo.value = {
    ...tempInfo.task,
    realmax: realmax2,
    realmin: realmin2,
    diffValue: diffValue2,
    usedNum: taskUsedNum.value
  };

  if (tempInfo.discountByPrice) {
    discountByPrice.value = {};
    Object.entries(tempInfo.discountByPrice).every(([key, value]) => {
      discountByPrice.value[+key] = value;
      return true;
    });
  }

  if (tempInfo.discountByTime) {
    discountByTime.value = {};
    Object.entries(tempInfo.discountByTime).every(([key, value]) => {
      discountByTime.value[+key] = value;
      return true;
    });

    timeOptions.value = timeOptions.value.reduce((prev, cur) => {
      if (discountByTime.value[cur.value]) {
        cur.discount = transformDiscount(discountByTime.value[cur.value]);
      }

      prev.push(cur);
      return prev;
    }, []);
  }

  nodeOptions.every((item) => {
    nodeSpecMap.value[item.value] = { ...tempInfo[item.value], name: item.label };
    return true;
  });

  systemDiskInfo.value = tempInfo.systemDisk;
  systemDiskNum.value = tempInfo.systemDisk.min;

  bandwidthInfo.value = tempInfo.bandwidth;
  bandwidthNum.value = tempInfo.bandwidth.min;
};

const getCoupon = async () => {
  const [error, res] = await http.get(`${ESS}/coupon/distribution/available`);
  if (error || !res.data) {
    return;
  }

  // const list = res.data.filter(item => {
  // if (item.couponType.value === 'FULL_DISCOUNT' && +item.balance > +item.minSpendLimit) {
  //   return false;
  // }
  //   return true;
  // });
  res.data.every((item) => {
    const option = {
      label: item.name,
      value: item.id,
      minSpendLimit: +(item.minSpendLimit || 0),
      balance: +(item.balance || 0)
    };
    if ((!item.applyGoodsCode && !item.applyGoodsEditionTypesData) ||
      (item.applyGoodsCode === goodsCode && !item.applyGoodsEditionTypesData)) {
      cloudCouponList.value.push(option);
    } else if (item.applyGoodsEditionTypesData) {
      const codes = item.applyGoodsEditionTypesData.map(item => item.value);
      if (codes.includes('CLOUD_SERVICE') && (item.applyGoodsCode === goodsCode || !item.applyGoodsCode)) {
        cloudCouponList.value.push(option);
      }
    }

    return true;
  });
};

const transformNumber = (num) => {
  if (!num && num !== 0) {
    return '';
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const createOrder = async () => {
  const signinFlag = await isSignin()
  if (!signinFlag) {
    loginVisible.value = true;
    return;
  }
  if (!audited) {
    authVisible.value = true;
    return;
  }
  if (!goodsInfo.value) {
    return;
  }

  const invalidList: string[] = [];
  // 校验可购买的并发数是否为0
  if (concurrencyInfo.value.max === 0) {
    invalidList.push('并发数');
  }

  // 校验可购买的并发任务数是否为0
  if (taskInfo.value.max === 0) {
    invalidList.push('并发任务数');
  }

  // 校验可购买的节点配额是否为0
  if (nodeInfo.value.max === 0) {
    invalidList.push('节点配额');
  }

  if (invalidList.length) {
    let names = invalidList.reduce((prev, cur) => {
      prev += ('“' + cur + '”、');
      return prev;
    }, '');

    names = names.replace(/、$/, '');
    errorMessage.value = names + '当前可购买的配额为0，无法下单。您可提交工单联系我们为您解决问题。';
    return;
  }

  if (minNodeLimit.value > +nodeNum.value) {
    nodeInputError.value = true;
    nodeErrorType.value = 1;
    return;
  }

  if (nodeSource.value) {
    if (+nodeSpecNum.value > +nodeNum.value) {
      nodeInputError.value = true;
      nodeErrorType.value = 2;
      return;
    }
  }

  if (+taskNum.value < +nodeNum.value) {
    taskInputError.value= true;
    return;
  }

  const tempSpecs = [
    {
      specId: concurrencyInfo.value.specId,
      specNum: 1,
      resourceQuotas: {
        [concurrencyInfo.value.id]: concurrencyNum.value
      }
    },
    {
      specId: nodeInfo.value.specId,
      specNum: 1,
      resourceQuotas: {
        [nodeInfo.value.id]: nodeNum.value
      }
    },
    {
      specId: taskInfo.value.specId,
      specNum: 1,
      resourceQuotas: {
        [taskInfo.value.id]: taskNum.value
      }
    }
  ];

  if (nodeSource.value) {
    // const nodeSpecNum = +nodeSpecNum.value;
    const selectNodeSpec = nodeSpecMap.value[selectNode.value];
    tempSpecs.push({
      specId: selectNodeSpec.specId,
      specNum: nodeSpecNum.value,
      resourceQuotas: selectNodeSpec.resourceQuotas
    });
    tempSpecs.push({
      specId: bandwidthInfo.value.specId,
      specNum: nodeSpecNum.value,
      resourceQuotas: {
        [bandwidthInfo.value.id]: bandwidthNum.value
      }
    });
    tempSpecs.push({
      specId: systemDiskInfo.value.specId,
      specNum: nodeSpecNum.value,
      resourceQuotas: {
        [systemDiskInfo.value.id]: systemDiskNum.value
      }
    });
  }

  // 资源按相同规格id分组
  const specMap = tempSpecs.reduce((prev, cur) => {
    if (prev[cur.specId]) {
      prev[cur.specId].resourceQuotas = {
        ...prev[cur.specId].resourceQuotas,
        ...cur.resourceQuotas
      };
    } else {
      prev[cur.specId] = cur;
    }

    return prev;
  }, {});

  const specs = Object.values(specMap).reduce((prev, cur) => {
    prev.push(cur);
    return prev;
  }, []);

  const goodsId = goodsInfo.value.goodsId;
  const params = {
    discountAmount: round(discountByTimeAmount.value + discountByPriceAmount.value),
    goodsId,
    goodsPrice: totalAmount.value,
    goodsSpecQuotas: {
      specs,
      method: method.value,
      duration: duration.value,
      idOrCode: goodsInfo.value.pricingTemplateId
    },
    payAmount: payAmount.value
  };

  if (couponId.value) {
    params.couponDistId = couponId.value;
    params.couponUsedAmount = discountByCouponAmount.value;
  }

  confirmLoading.value= true;
  const [error, { data = {} }] = await http.post(`${ESS}/order`, params);
  confirmLoading.value= false;
  if (error) {
    errorMessage.value = error.message || '网络错误，请稍后再试。';
    return;
  }

  const languagePath = getCurrentLanguage();
  if (+params.payAmount === 0) {
    router.go(`${languagePath}/order-done?orderId=${data.id}`);
    return;
  }
  router.go(`${languagePath}/pay?orderId=${data.id}`);
}


const userInfo = ref();
const audited = ref(false); // 是否实名认证
onMounted(async () => {
  await getCoupon();
  await loadQuota();
  await setLatestApp();
  initializeData();
  const signinFlag = await isSignin();
  if (!signinFlag) {
    loginVisible.value = true;
  } else {
    const [error, { data }] = await http.get(`${GM}/user/current`);
    if (error) {
      return;
    }
    userInfo.value = data;
    audited.value = data.tenantRealNameStatus?.value === 'AUDITED'
  }


  watch(() => pureAmount.value, () => {
    if (hadSetCouponId.value) {
      return;
    }
    let tempId;
    if (couponList.value) {
      let tempMax = 0;
      couponList.value.every((item) => {
        if (item.discountAmount > tempMax) {
          tempId = item.value;
          tempMax = item.discountAmount;
        }

        return true;
      });
    }
    couponId.value = tempId;
    hadSetCouponId.value = true;
  });

  watch(() => nodeNum.value, (newValue) => {
    if (nodeErrorType.value === 1) {
      if (+newValue >= minNodeLimit.value) {
        nodeInputError.value = false;
      }
    } else if (nodeErrorType.value === 2) {
      if (+newValue >= +nodeSpecNum.value) {
        nodeInputError.value = false;
      }
    }

    if (+newValue <= +taskNum.value) {
      taskInputError.value = false;
    }
  });

  watch(() => taskNum.value, (newValue) => {
    if (+newValue >= +nodeNum.value) {
      taskInputError.value = false;
    }
  });
  watch(() => nodeSource.value, () => {
    if (nodeErrorType.value === 2) {
      nodeInputError.value = false;
    }

    nodeSpecNum.value = 1;
    selectNode.value = nodeOptions[0]?.value;
  });
});

</script>
<template>
  <div class="purchase-outer-container">
    <div class="purchase-top-container">
      <div class="purchase-top-bg">
        云服务版购买
      </div>
    </div>
    <div class="purchase-form-container">
      <div style="margin-bottom: 0;" class="form-row">
        <div class="form-row-label">
          产品名称<em>:</em>
        </div>
        <div class="form-row-value">
          {{ goodsInfo && goodsInfo.name }}
        </div>
      </div>
      <div style="margin-bottom: 12px;" class="form-row">
        <div class="form-row-label">
          版本类型<em>:</em>
        </div>
        <div class="form-row-value">
          云服务版
        </div>
      </div>

      <div class="form-row items-start mb-4.5">
        <div class="form-row-label">
          <span>并发数</span>
          <em>:</em>
          <Popover>
            <template #content>
              <div style="width: 240px;" class="leading-5">
                单个测试任务最大虚拟用户数。
              </div>
            </template>
            <Icon
              style="margin-left: 2px; color: rgba(179, 215, 255, 100%);"
              icon="icon-shuoming"
              class="mr-1 cursor-pointer text-3"
            />
          </Popover>
        </div>
        <div class="form-row-value">
          <InputNumber
            v-model:value="concurrencyNum"
            :step="5000"
            :min="concurrencyInfo.realmin"
            :max="concurrencyInfo.realmax"
            class="h-9 w-45"
          />
          <div class="tip">
            <span v-if="concurrencyInfo.max > 0" style="margin-right: 4px;">
              <span>输入范围</span>
              <em>:</em>
              <span>{{ transformNumber(concurrencyInfo.min) }}</span>
              <em>~</em>
              <span>{{ transformNumber(concurrencyInfo.max) }}</span>
            </span>
            <span>
              <span>您已有</span>
              <em style="color: #ff9828; font-weight: 600;">{{ transformNumber(concurrencyInfo.usedNum) }}</em>
              <span>个并发数，还可以购买</span>
              <em style="color: #ff9828; font-weight: 600;">{{ transformNumber(concurrencyInfo.diffValue) }}</em>
              <span>个。</span>
            </span>
          </div>
        </div>
      </div>

      <div class="form-row items-start mb-4.5">
        <div class="form-row-label">
          <span>并发任务数</span>
          <em>:</em>
          <Popover>
            <template #content>
              <div style="width: 240px;" class="leading-5">
                可同时执行测试的任务数。
              </div>
            </template>
            <Icon
              style="margin-left: 2px; color: rgba(179, 215, 255, 100%);"
              icon="icon-shuoming"
              class="mr-1 cursor-pointer text-3"
            />
          </Popover>
        </div>
        <div class="form-row-value">
          <InputNumber
            v-model:value="taskNum"
            :error="taskInputError"
            :step="1"
            :min="taskInfo.realmin"
            :max="taskInfo.realmax"
            class="h-9 w-45"
          />
          <div v-if="!taskInputError" class="tip">
            <span v-if="taskInfo.max > 0" style="margin-right: 4px;">
              <span>输入范围</span>
              <em>:</em>
              <span>{{ transformNumber(taskInfo.min) }}</span>
              <em>~</em>
              <span>{{ transformNumber(taskInfo.max) }}</span>
            </span>
            <span style="margin-right: 4px;">并发任务数不能小于节点配额。</span>
            <span v-if="+nodeNum > +taskNum">
              <span>当前节点配额至少需要</span>
              <em style="color: #ff9828; font-weight: 600;">{{ nodeNum }}</em>
              <span>个并发任务数。</span>
            </span>
            <template v-else>
              <span>
                <span>您已有</span>
                <em style="color: #ff9828; font-weight: 600;">{{ transformNumber(taskInfo.usedNum) }}</em>
                <span>个并发任务数，还可以购买</span>
                <em style="color: #ff9828; font-weight: 600;">{{ transformNumber(taskInfo.diffValue) }}</em>
                <span>个。</span>
              </span>
            </template>
          </div>

          <div v-else class="tip" style="color: rgba(245, 34, 45, 100%);">
            <span>当前节点配额至少需要</span>
            <em style="font-weight: 600;">{{ nodeNum }}</em>
            <span>个并发任务数。</span>
          </div>
        </div>
      </div>

      <div class="form-row items-start mb-2">
        <div class="form-row-label">
          <span>节点配额</span>
          <em>:</em>
          <Popover>
            <template #content>
              <div style="width: 240px;" class="leading-5">
                节点数越多支持的测试并发数和并发任务数越多。
              </div>
            </template>
            <Icon
              style="margin-left: 2px; color: rgba(179, 215, 255, 100%);"
              icon="icon-shuoming"
              class="mr-1 cursor-pointer text-3"
            />
          </Popover>
        </div>
        <div class="form-row-value">
          <InputNumber
            v-model:value="nodeNum"
            :error="nodeInputError"
            :step="1"
            :min="nodeInfo.realmin"
            :max="nodeInfo.realmax"
            class="h-9 w-45"
          />
          <div v-if="!nodeInputError" class="tip">
            <span v-if="nodeInfo.max > 0" style="margin-right: 4px;">
              <span>输入范围</span>
              <em>:</em>
              <span>{{ transformNumber(nodeInfo.min) }}</span>
              <em>~</em>
              <span>{{ transformNumber(nodeInfo.max) }}</span>
            </span>
            <span style="margin-right: 4px;">每个节点可支持1万并发数。</span>
            <span v-if="minNodeLimit > +nodeNum">
              <span>当前并发数至少需要</span>
              <em style="color: #ff9828; font-weight: 600;">{{ minNodeLimit }}</em>
              <span>个节点才可满足测试需求。</span>
            </span>
            <template v-else>
              <span>
                <span>您已有</span>
                <em style="color: #ff9828; font-weight: 600;">{{ transformNumber(nodeInfo.usedNum) }}</em>
                <span>个节点配额，还可以购买</span>
                <em style="color: #ff9828; font-weight: 600;">{{ transformNumber(nodeInfo.diffValue) }}</em>
                <span>个。</span>
              </span>
            </template>
          </div>
          <div v-else class="tip" style="color: rgba(245, 34, 45, 100%);">
            <template v-if="nodeErrorType === 1">
              <span>当前并发数至少需要</span>
              <em style="font-weight: 600;">{{ minNodeLimit }}</em>
              <span>个节点才可满足测试需求。</span>
            </template>
            <template v-else-if="nodeErrorType === 2">
              <span>节点配额必须大于等于购买节点数，当前购买节点数为</span>
              <em style="font-weight: 600;">{{ nodeSpecNum }}</em>
              <span>个。</span>
            </template>
          </div>
        </div>
      </div>

      <div style="align-items: flex-start; margin-bottom: 26px;" class="form-row">
        <div class="form-row-label">
          <span>购买节点</span><em>:</em>
        </div>
        <div style="transform: translateY(8px);" class="form-row-value">
          <RadioGroup v-model:value="nodeSource" class="col-label">
            <Radio style="margin-right: 40px;" :value="1">
              在线购买节点
            </Radio>
            <Radio :value="0">
              自有节点
            </Radio>
          </RadioGroup>
          <div v-if="nodeSource" class="flex flex-col flex-wrap">
            <div class="row-value-label">
              <span>选择压测节点配置</span>
              <em>:</em>
            </div>
            <div class="table-header">
              <div class="table-col">
                节点规格
              </div>
              <div class="table-col">
                系统盘
              </div>
              <div class="table-col">
                带宽
              </div>
              <div class="table-col">
                数量
              </div>
            </div>
            <div class="table-body">
              <div class="table-col">
                <Select v-model:value="selectNode" :options="nodeOptions" :get-popup-container="getPopupContainer" />
              </div>
              <div class="table-col">
                {{ systemDiskNum }}G
              </div>
              <div class="table-col">
                {{ bandwidthNum }}Mbps
              </div>
              <div class="table-col">
                <InputNumber v-model:value="nodeSpecNum" :min="nodeSpecMin" :max="nodeSpecMax" :maxlength="5" size="small" />
              </div>
            </div>
          </div>
          <div class="tip-container">
            <div class="tip-row">
              <em>1.</em>
              <span>“自有节点”目前只支持CentOS7.x和CentOS8.x。</span>
            </div>
            <div class="tip-row">
              <em>2.</em>
              <span>“在线购买节点”只支持外网压测，“自有节点”既可以外网压测也可以内网压测（内网压测时自有节点必须和应用在同一局域网）。</span>
            </div>
            <div class="tip-row">
              <em>3.</em>
              <span>下单成功后，可以在应用</span>
              <a :href="nodeHref" target="_blank">“AngusTester”-“节点”</a>
              <span>中看到购买的节点，对于“自有节点”您可以将自己的闲置服务器直接添加到“节点”中。</span>
            </div>
            <div class="tip-row">
              <em>4.</em>
              <span>购买节点数不能大于节点配额。</span>
            </div>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-row-label">
          <span>选择时长</span>
          <em>:</em>
        </div>
        <div class="form-row-value">
          <Select v-model:value="duration" class="w-45" :get-popup-container="getPopupContainer">
            <SelectOption v-for="item in timeOptions" :key="item.value" :value="item.value">
              <div :title="item.label" class="flex items-center w-full">
                <span>{{ item.label }}</span>
                <span v-if="item.discount" style="margin-left: 10px; color: #ff9828;">{{ item.discount }}折</span>
              </div>
            </SelectOption>
          </Select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-row-label">
          <span>选择优惠</span>
          <em>:</em>
        </div>
        <div class="form-row-value">
          <Select
            v-model:value="couponId"
            allow-clear
            style="width: 318px;"
            :placeholder="couponPlaceholder">
            <template #notFoundContent>
              <div class="flex justify-center">
                无可用优惠券
              </div>
            </template>
            <SelectOption v-for="item in couponList" :key="item.value" :value="item.value">
              <div :title="item.label" class="flex items-center justify-between whitespace-no-wrap w-full">
                <span class="flex-1 truncate">{{ item.label }}</span>
                <span style="margin-left: 10px;" class="flex-shrink-0">
                  <span>减</span>
                  <em style="color: #ff9828;">{{ round(item.discountAmount) }}</em>
                  <span>元</span>
                </span>
              </div>
            </SelectOption>
          </Select>
        </div>
      </div>
    </div>

    <div class="purchase-footer-container">
      <Alert
        v-if="errorMessage"
        show-icon
        message="提交订单失败"
        :description="errorMessage"
        type="error"
        closable
        class="custom-alert"
        @close="onClose"
      />
      <div class="box-shadow" />
      <div class="inner-footer-container">
        <div class="inner-footer-row">
          <div class="inner-footer-col">
            <div class="col-label">
              原价<em>:</em>
            </div>
            <div class="col-value">
              <em class="small-money-symbol">￥</em><em>{{ totalAmount }}</em><em class="small-money-unit">元</em>
            </div>
          </div>
          <div class="inner-footer-col">
            <div class="col-label">
              时长满减优惠<em>:</em>
            </div>
            <div class="col-value">
              <em class="small-money-symbol">￥</em><em>{{ round(discountByTimeAmount) }}</em><em
                class="small-money-unit"
              >元</em>
            </div>
          </div>
          <div class="inner-footer-col">
            <div class="col-label">
              支付金额<em>:</em>
            </div>
            <div class="money-bolder">
              <em class="money-symbol">￥</em><em>{{ payAmount }}</em><em class="money-unit">元</em>
            </div>
          </div>
          <div class="inner-footer-col cursor-pointer w-30">
            <Popover :mouse-enter-delay="0.3">
              <template #content>
                <div class="popover-content">
                  <div class="content-row">
                    <div class="content-label">
                      时长<em>:</em>
                    </div>
                    <div class="content-value w-28">
                      {{ durationMap[duration] }}
                    </div>
                  </div>
                  <div class="content-row">
                    <div class="content-label">
                      并发数<em>:</em>
                    </div>
                    <div class="content-value w-28">
                      <em class="multi-symbol">*</em><em>{{ concurrencyNum }}</em>
                    </div>
                    <div class="content-value">
                      <em class="small-money-symbol">￥</em><em>{{ round(concurrencyPrice) }}</em>
                      <em class="small-money-unit">元</em>
                    </div>
                  </div>
                  <div class="content-row">
                    <div class="content-label">
                      并发任务数<em>:</em>
                    </div>
                    <div class="content-value w-28">
                      <em class="multi-symbol">*</em><em>{{ taskNum }}</em>
                    </div>
                    <div class="content-value">
                      <em class="small-money-symbol">￥</em><em>{{ round(taskPrice) }}</em>
                      <em class="small-money-unit">元</em>
                    </div>
                  </div>
                  <div class="content-row">
                    <div class="content-label">
                      节点配额<em>:</em>
                    </div>
                    <div class="content-value w-28">
                      <em class="multi-symbol">*</em><em>{{ nodeNum }}</em>
                    </div>
                    <div class="content-value">
                      <em class="small-money-symbol">￥</em><em>{{ round(nodePrice) }}</em>
                      <em class="small-money-unit">元</em>
                    </div>
                  </div>
                  <div v-if="nodeSource">
                    <div class="custom-row-label">
                      购买节点<em>:</em>
                    </div>
                    <div style="height: 31px; line-height: 30px;" class="table-header border-none">
                      <div style="width: 150px;" class="table-col">
                        节点规格
                      </div>
                      <div style="width: 80px;" class="table-col">
                        系统盘
                      </div>
                      <div style="width: 80px;" class="table-col">
                        带宽
                      </div>
                      <div style="width: 80px;" class="table-col">
                        数量
                      </div>
                      <div style="width: 150px;" class="table-col">
                        价格
                      </div>
                    </div>
                    <div style="height: 32px;" class="table-body border-none">
                      <div style="width: 150px;" class="table-col">
                        {{ nodeSpecMap[selectNode] &&
                          nodeSpecMap[selectNode].name
                        }}
                      </div>
                      <div style="width: 80px;" class="table-col">
                        {{ systemDiskNum }}G
                      </div>
                      <div style="width: 80px;" class="table-col">
                        {{ bandwidthNum }}Mbps
                      </div>
                      <div style="width: 80px;" class="table-col">
                        {{ nodeSpecNum }}
                      </div>
                      <div style="width: 150px;" class="table-col">
                        <em class="small-money-symbol">￥</em>
                        <span>{{ round(nodeSpecPrice + systemDiskPrice + bandwidthPrice) }}</span>
                        <em class="small-money-unit">元</em>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <span class="flex items-center">
                <Icon style="color: #ff7200;" icon="icon-shuoming" class="mr-1 text-3" />
                <span class="col-label">费用明细</span>
              </span>
            </Popover>
          </div>
        </div>

        <div class="inner-footer-row">
          <div class="inner-footer-col">
            <div class="col-label">
              金额满减优惠<em>:</em>
            </div>
            <div class="col-value">
              <em class="small-money-symbol">￥</em><em>{{ round(discountByPriceAmount) }}</em><em
                class="small-money-unit"
              >元</em>
            </div>
          </div>
          <div class="inner-footer-col">
            <div class="col-label">
              优惠券优惠<em>:</em>
            </div>
            <div class="col-value">
              <em class="small-money-symbol">￥</em><em>{{ round(discountByCouponAmount) }}</em><em
                class="small-money-unit"
              >元</em>
            </div>
          </div>
          <div class="inner-footer-col">
            <Checkbox v-model:checked="agreeFlag" class="col-label">
              <span>我已同意</span>
              <span class="link">《晓蚕云产品服务协议》</span>
            </Checkbox>
          </div>
          <div class="inner-footer-col w-30">
            <Button :loading="confirmLoading" :disabled="!agreeFlag" class="w-28" type="primary" @click="createOrder">
              提交订单
            </Button>
          </div>
        </div>
      </div>
    </div>

    <LoginConfirmModal v-model:visible="loginVisible" />
    <AuthConfirmModal v-model:visible="authVisible" />
  </div>
</template>
<style scoped>
.ant-select,
:deep(.ant-select-selection--single) {
  height: 36px;
}

:deep(.ant-select-selection__clear) {
  margin-top: -8px;
}

:deep(.ant-select-selection__rendered) {
  line-height: 34px;
}

em {
  font-style: normal;
}

.ant-btn {
  height: 36px;
  padding: 0;
  outline: none;
  line-height: 34px;
}

.row-value-label {
  height: 12px;
  margin-top: 15px;
  margin-bottom: 10px;
  /* color: #444c5a; */
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
}

.table-header,
.table-body {
  width: 560px;
}

.table-header {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: 36px;
  border-top-width: 1px;
  border-right-width: 1px;
  border-left-width: 1px;
  border-style: solid;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-color: #e9e9e9;
  background: #f7f8fb;
  line-height: 35px;
}

.table-col {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 100px;
  padding: 0 10px;
}

.table-col:first-child {
  width: 200px;
}

.table-col:last-child {
  width: 160px;
  border-right: none;
}

.table-body .table-col {
  height: 42px;
}

.table-header.border-none .table-col {
  border-right: none;
  /* color: rgba(130, 136, 148, 100%); */
  font-size: 12px;
  line-height: 30px;
}

.table-body.border-none .table-col {
  height: 32px;
  border-right: none;
  /* color: rgba(130, 136, 148, 100%); */
  font-size: 12px;
  line-height: 30px;
}

.table-body {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-color: #e9e9e9;
}

.table-body .ant-select,
.table-body :deep(.ant-select-selection--single) {
  width: 100%;
  height: 32px;
  box-shadow: none;
}

.table-body :deep(.ant-select-selection__rendered) {
  line-height: 30px;
}

.tip-container {
  margin-top: 12px;
  /* color: rgba(130, 136, 148, 100%); */
  font-size: 12px;
  line-height: 20px;
}

.tip-row {
  margin-bottom: 2px;
}

.tip-row:last-child {
  margin-bottom: 0;
}

.purchase-outer-container {
  position: relative;
  font-size: 14px;
}

.purchase-top-container {
  display: flex;
  /* position: absolute;
  z-index: -1; */
  justify-content: center;
  width: 100%;
  /* height: 500px; */
  /* background: linear-gradient(180deg, rgba(50, 154, 255, 4%) 0%, rgba(202, 241, 255, 0%) 100%); */
  user-select: none;
}

.purchase-top-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 440px;
  height: 170px;
  background-image: url("./assets/1.svg");
  /* color: #0f1723; */
  font-size: 30px;
  font-weight: 600;
  line-height: 30px;
}

.purchase-form-container {
  margin-bottom: 10px;
}

.form-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
}

.form-row:last-child {
  margin-bottom: 0;
}

.form-row.mb-2 {
  margin-bottom: 8px;
}

.form-row.mb-4\.5 {
  margin-bottom: 18px;
}

.form-row.items-start {
  align-items: flex-start;
}

.form-row-label {
  display: flex;
  align-items: center;
  width: 120px;
  /* color: rgba(130, 136, 148, 100%); */
  line-height: 36px;
  text-align: right;
}

.form-row-value {
  position: relative;
  width: 720px;
  /* color: rgba(68, 76, 90, 100%); */
}

.form-row-value .ant-btn {
  width: 120px;
  margin-right: 20px;
}

.form-row-value .ant-btn:last-child {
  margin-right: 0;
}

.form-row-value .ant-btn.small-btn {
  position: relative;
  width: 90px;
}

.small-btn .small-tip {
  display: block;
  position: absolute;
  top: 2px;
  right: 2px;
  color: #ff9828;
  font-size: 12px;
  font-weight: normal;
  line-height: 12px;
}

.form-row-value .tip {
  margin-top: 3px;
  /* color: rgba(130, 136, 148, 80%); */
  font-size: 12px;
  line-height: 18px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
}

.purchase-footer-container {
  position: relative;
  z-index: 99;
}

.custom-alert {
  position: absolute;
  z-index: 99;
  bottom: 100%;
  left: 50%;
  width: 1020px;
  transform: translateX(-50%);
}

.box-shadow {
  /* height: 16px;
  opacity: 0.05;
  background: linear-gradient(360deg, #00163f 0%, rgba(0, 22, 63, 1%) 100%); */
}

.inner-footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1020px;
  height: 100px;
  margin: 0 auto;
  padding: 0;
  /* background: #fff; */
}

.inner-footer-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.inner-footer-col {
  display: flex;
  align-items: center;
  width: 300px;
  line-height: 36px;
}

.inner-footer-col.w-30 {
  width: 120px;
  margin-right: 0;
}

.col-label {
  margin-right: 8px;
  color: inherit;
  /* color: rgba(130, 136, 148, 100%); */
}

.col-label .ant-radio-wrapper {
  color: inherit;
}

.col-label .link {
  /* color: rgba(0, 119, 255, 100%); */
}

.col-value {
  /* color: rgba(15, 23, 35, 100%); */
}

.money-bolder {
  color: #ff7200;
  font-size: 24px;
  font-weight: 600;
}

.popover-content {
  min-width: 320px;
  padding: 10px;
  font-size: 14px;
  line-height: 20px;
}

.custom-row-label {
  margin-bottom: 6px;
  color: rgba(130, 136, 148, 100%);
}

.content-row {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.content-row:last-child {
  margin-bottom: 0;
}

.content-label {
  width: 120px;
  color: rgba(130, 136, 148, 100%);
}

.small-money-symbol {
  font-size: 12px;
}

.small-money-unit {
  margin-left: 2px;
}

.money-symbol,
.money-unit {
  font-size: 14px;
}

.money-symbol {
  margin-right: 4px;
}

.money-unit {
  margin-left: 4px;
}

.multi-symbol {
  display: inline-block;
  height: 8px;
  margin: 0 2px;
  line-height: 14px;
}

.content-value {
  display: flex;
  align-items: center;
}
</style>