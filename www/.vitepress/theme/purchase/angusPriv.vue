<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { Alert, Button, Checkbox, Select, Popover, InputNumber, SelectOption } from 'ant-design-vue';
import { ESS, PUB_ESS } from '@xcan-angus/tools';
import { useRoute, useRouter } from 'vitepress';

import { getSpecInfo } from './pricing';
import http from '@/utils/http';
import { round } from '@/utils/math';
import { maxVersion } from '@/utils/version';
import { getCurrentLanguage } from '@/utils/index';

const route = useRoute();
const router = useRouter();
const goodsCode = 'AngusTester';
const version = ref();
const nodeInputError = ref(false);
const editionType = ref();
const duration = ref(365);
const durationMap = ref({
  365: '1年',
  730: '2年',
  1095: '3年'
});
const concurrencyNum = ref(0); // 并发数
const taskNum = ref(0); // 并发任务数
const nodeNum = ref(0); // 节点配额
const userNum = ref(0); // 用户数
const enterpriseApp = ref({}); // 企业版应用信息
const dataCenterApp = ref({}); // 数据中心版应用信息
const enterpriseTemplateInfo = ref({}); // 企业版定价模板
const dataCenterTemplateInfo = ref({}); // 数据中心版定价模板
const enterpriseCouponList = ref([]); // 企业版优惠券列表
const dataCenterCouponList = ref([]); // 数据中心版优惠券列表
const couponId = ref(); // 选中的优惠券
const hadSetCouponId = ref(); // 是否已经自动选中最大优惠券
const oneYearDiscount = ref(); 
const twoYearDiscount = ref(); 
const threeYearDiscount = ref(); 
const selectVersionDisabled = ref(true); // 请求未返回之前禁止选择版本
const agreeFlag = ref(false); 
const confirmLoading = ref(false); 
const errorMessage = ref(); 
const purchasedMap = ref({
  ENTERPRISE: false,
  DATACENTER: false
});
const goodsName = computed(() => {
  if (editionType.value === 'enterprise') {
    return enterpriseApp.value?.name;
  }

  return dataCenterApp.value?.name;
});

const minNodeLimit = computed(() => {
  if (!concurrencyNum.value) {
    return 0;
  }

  return Math.ceil(concurrencyNum.value / 10000);
});
const discountByTime = computed(() => {
  const tempInfo = editionType.value=== 'enterprise' ? enterpriseTemplateInfo.value : dataCenterTemplateInfo.value;
  if (tempInfo) {
    return tempInfo.discountByTime;
  }
  return {};
});
const discountByPrice = computed(() => {
  const tempInfo = editionType.value=== 'enterprise' ? enterpriseTemplateInfo.value : dataCenterTemplateInfo.value;
  if (tempInfo) {
    return tempInfo.discountByPrice;
  }
  return {};
});
const concurrencyInfo = computed(() => {
  const tempInfo = editionType.value=== 'enterprise' ? enterpriseTemplateInfo.value : dataCenterTemplateInfo.value;
  if (tempInfo) {
    return tempInfo.concurrency;
  }

  return {
    specId: undefined,
    id: undefined,
    unitPrice: 0,
    min: 0,
    max: 0
  };
});
const taskInfo = computed(() => {
  const tempInfo = editionType.value=== 'enterprise' ? enterpriseTemplateInfo.value : dataCenterTemplateInfo.value;
  if (tempInfo) {
    return tempInfo.task;
  }

  return {
    specId: undefined,
    id: undefined,
    unitPrice: 0,
    min: 0,
    max: 0
  };
});

const userInfo = computed(() => {
  const tempInfo = editionType.value=== 'enterprise' ? enterpriseTemplateInfo.value : dataCenterTemplateInfo.value;
  if (tempInfo) {
    return tempInfo.user;
  }

  return {
    specId: undefined,
    id: undefined,
    unitPrice: 0,
    min: 0,
    max: 0
  };
});

const nodeInfo = computed(() => {
  const tempInfo = editionType.value=== 'enterprise' ? enterpriseTemplateInfo.value : dataCenterTemplateInfo.value;
  if (tempInfo) {
    return tempInfo.node;
  }

  return {
    specId: undefined,
    id: undefined,
    unitPrice: 0,
    min: 0,
    max: 0
  };
});
const serviceInfo = computed(() => {
  const tempInfo = editionType.value=== 'enterprise' ? enterpriseTemplateInfo.value : dataCenterTemplateInfo.value;
  if (tempInfo) {
    return tempInfo.service;
  }

  return {
    specId: undefined,
    id: undefined,
    unitPrice: 0,
    min: 0,
    max: 0
  };
});
const concurrencyPrice = computed(() => {
  const unitPrice = concurrencyInfo.value?.unitPrice || 0;
  return +(concurrencyNum.value || 0) * unitPrice * duration.value;
});
const taskPrice = computed(() => {
  const unitPrice = taskInfo.value?.unitPrice || 0;
  return +(taskNum.value || 0) * unitPrice * duration.value;
});
const userPrice = computed(() => {
  const unitPrice = userInfo.value?.unitPrice || 0;
  return +(userNum.value || 0) * unitPrice * duration.value;
});
const nodePrice = computed(() => {
  const unitPrice = nodeInfo.value?.unitPrice || 0;
  return +(nodeNum.value || 0) * unitPrice * duration.value;
});
const servicePrice = computed(() => {
  const unitPrice = serviceInfo.value?.unitPrice || 0;
  return unitPrice * duration.value;
});

const totalAmount = computed(() => {
  let sum = concurrencyPrice.value + taskPrice.value + userPrice.value + nodePrice.value;
  if (serviceInfo.value?.specId) {
    sum += servicePrice.value;
  }

  return round(sum);
});

const pureAmount = computed(() => {
  return +totalAmount.value - discountByTimeAmount.value - discountByPriceAmount.value;
});

const payAmount = computed(() => {
  return round(pureAmount.value - discountByCouponAmount.value);
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
const discountByCouponAmount = computed(() => {
  const temp = couponList.value?.find(item => item.value === couponId.value);
  if (temp) {
    return temp.discountAmount;
  }

  return 0;
});
const submitDisabled = computed(() => {
  const disabled = false;
  // if (editionType.value=== 'datacenter') {
  //   disabled = purchasedMap.value.DATACENTER;
  // } else {
  //   disabled = purchasedMap.value.ENTERPRISE;
  // }

  return !agreeFlag.value || disabled;
});
const successMessage = computed(() => {
  let purchased = false;
  let name = '';
  let _editionType = '';
  if (editionType.value=== 'datacenter') {
    purchased = purchasedMap.value.DATACENTER;
    name = dataCenterApp.value?.name;
    _editionType = dataCenterApp.value?.editionType?.message;
  } else {
    purchased = purchasedMap.value.ENTERPRISE;
    name = enterpriseApp.value?.name;
    _editionType = enterpriseApp.value?.editionType?.message;
  }

  if (purchased) {
    return '您购买的 “' + name + '” ' + _editionType + '还未过期，请确认是否继续。';
  }

  return '';
});
const couponPlaceholder = computed(() => {
  if (couponList.value?.length) {
    return '请选择优惠券';
  }

  return '无可用优惠券';
});

const couponList = computed(() => {
  if (!editionType.value) {
    return [];
  }

  let list = dataCenterCouponList.value;
  if (editionType.value === 'enterprise') {
    list = enterpriseCouponList.value;
  }

  const price = pureAmount.value;
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

const transformDiscount = (value) => {
  if (!value) {
    return undefined;
  }

  const sum = 100 - (+value * 100);
  return Math.round((sum / 10) * 100) / 100;
};

const changeVersion = (value) => {
  editionType.value = value;
};
const changeDuration = (value) => {
  duration.value = value;
};
const loadAppOrder = async () => {
  const params = {
    goodsCode: goodsCode,
    expired: false,
    filters: [
      { key: 'editionType', op: 'IN', value: ['ENTERPRISE', 'DATACENTER'] },
      { key: 'status', op: 'EQUAL', value: 'FINISHED' }
    ],
    pageSize: 2000
  };
  const [error, { data }] = await http.get(`${ESS}/order`, params);
  if (!error && data && data.list && data.list.length) {
    data.list.every((item) => {
      if (item.editionType.value === 'ENTERPRISE') {
        purchasedMap.value.ENTERPRISE = true;
      } else if (item.editionType.value === 'DATACENTER') {
        purchasedMap.value.DATACENTER = true;
      }
      return true;
    });
  }

  await getCoupon();
  await setLatestApp();
};
const getCoupon = async () => {
  const [error, res] = await http.get(`${ESS}/coupon/distribution/available`);
  if (error || !res.data) {
    return;
  }

  // 满减券不允许满减金额大于使用限制
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
      enterpriseCouponList.value.push(option);
      dataCenterCouponList.value.push(option);
    } else if (item.applyGoodsEditionTypesData) {
      const codes = item.applyGoodsEditionTypesData.map(item => item.value);
      if (!item.applyGoodsCode || item.applyGoodsCode === goodsCode) {
        if (codes.includes('ENTERPRISE')) {
          enterpriseCouponList.value.push(option);
        }
        if (codes.includes('DATACENTER')) {
          dataCenterCouponList.value.push(option);
        }
      }
    }

    return true;
  });
};
const setLatestApp = async() => {
  const [error, res] = await http.get(`${PUB_ESS}/store/goods/${goodsCode}/online`);
  if (error || !res.data) {
    return;
  }

  const list = res.data;
  const enterpriseAppList = list.filter(item => item.editionType.value === 'ENTERPRISE');
  if (!version.value) {
    const evs = enterpriseAppList.map(item => item.version);
    version.value = maxVersion(evs);
  }
  enterpriseApp.value = enterpriseAppList.find(item => item.version === version.value);

  const dataCenterAppList = list.filter(item => item.editionType.value === 'DATACENTER');
  if (!version.value) {
    const evs = dataCenterAppList.map(item => item.version);
    version.value = maxVersion(evs);
  }
  dataCenterApp.value = dataCenterAppList.find(item => item.version === version.value);

  if (!enterpriseApp.value || !dataCenterApp.value) {
    return;
  }

  const enterpriseTemplate = await getPricingTemplate(enterpriseApp.value.pricingTemplateId);
  enterpriseTemplateInfo.value = getSpecInfo(enterpriseTemplate);

  const dataCenterTemplate = await getPricingTemplate(dataCenterApp.value.pricingTemplateId);
  dataCenterTemplateInfo.value = getSpecInfo(dataCenterTemplate);

  selectVersionDisabled.value = false;
  const url = new URL(location.href);
  const { searchParams } = url;
  const type = searchParams.get('type')
  if (type === 'datacenter') {
    editionType.value = 'datacenter';
    const href = location.href.replace(/datacenter/, 'enterprise');
    history.pushState(null, '', href);
  } else {
    editionType.value = 'enterprise';
  }
};

const getPricingTemplate = async(id) => {
  const [error, res] = await http.get(`${PUB_ESS}/pricing/template/` + id);
  if (error || !res.data) {
    return {};
  }

  return res.data;
};
const createOrder = async() => {
  if (!enterpriseApp.value || !dataCenterApp.value) {
    return;
  }

  if (minNodeLimit.value > +nodeNum.value) {
    nodeInputError.value = true;
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
      specId: taskInfo.value.specId,
      specNum: 1,
      resourceQuotas: {
        [taskInfo.value.id]: taskNum.value
      }
    },
    {
      specId: userInfo.value.specId,
      specNum: 1,
      resourceQuotas: {
        [userInfo.value.id]: userNum.value
      }
    },
    {
      specId: nodeInfo.value.specId,
      specNum: 1,
      resourceQuotas: {
        [nodeInfo.value.id]: nodeNum.value
      }
    }
  ];

  if (editionType.value === 'datacenter') {
    tempSpecs.push({
      specId: serviceInfo.value.specId,
      specNum: 1,
      resourceQuotas: {
        [serviceInfo.value.id]: 1
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

  let goodsId = enterpriseApp.value.goodsId;
  let templateId = enterpriseApp.value.pricingTemplateId;
  if (editionType.value === 'datacenter') {
    goodsId = dataCenterApp.value.goodsId;
    templateId = dataCenterApp.value.pricingTemplateId;
  }

  const params = {
    discountAmount: round(discountByTimeAmount.value + discountByPriceAmount.value),
    goodsId,
    goodsPrice: totalAmount.value,
    goodsSpecQuotas: {
      specs,
      method: 'NONE',
      duration: duration.value,
      idOrCode: templateId
    },
    payAmount: payAmount.value
  };

  if (couponId.value) {
    params.couponDistId = couponId.value;
    params.couponUsedAmount = discountByCouponAmount.value;
  }

  confirmLoading.value = true;
  const [error, { data = {} }] = await http.post(`${ESS}/order`, params);
  confirmLoading.value = false;
  if (error) {
    errorMessage.value = error.message || '网络错误，请稍后再试。';
    return;
  }

  const languagePath = getCurrentLanguage();
  if (+params.payAmount === 0) {
    // this.$router.push(`/order-done/${data.id}`);
    router.go(`${languagePath}/order-done?orderId=${data.id}`);
    return;
  }

  router.go(`${languagePath}/pay?orderId=${data.id}`);
  // this.$router.push(`/pay/${data.id}`);
};
const closeAlert = async() => {
  if (editionType.value === 'datacenter') {
    purchasedMap.value.DATACENTER = false;
    return;
  }

  purchasedMap.value.ENTERPRISE = false;
};

const onClose = async() => {
  errorMessage.value = undefined;
};


onMounted(() => {
  loadAppOrder();

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
  }, {
    immediate: true
  });

  watch(() => editionType.value, () => {
    couponId.value = undefined;
    duration.value = 365;
  }, {
    immediate: true
  });

  watch(() => discountByTime.value, (newValue) => {
    if (!newValue) {
     oneYearDiscount.value = undefined;
      twoYearDiscount.value = undefined;
      threeYearDiscount.value = undefined;
      return;
    }

    const temp = {};
    for (const key in newValue) {
      temp[+key] = newValue[key];
    }
   oneYearDiscount.value = transformDiscount(temp[365]);
    twoYearDiscount.value = transformDiscount(temp[730]);
    threeYearDiscount.value = transformDiscount(temp[1095]);
  }, {
    immediate: true
  });

  watch(() => nodeNum.value, () => {
    nodeInputError.value = false;
  }, {
    immediate: true
  });

});
</script>
<template>
  <div class="purchase-outer-container">
    <div class="purchase-top-container">
      <div class="purchase-top-bg">
        私有版本购买
      </div>
    </div>
    <div class="purchase-form-container max-w-140 mx-auto">
      <div style="margin-bottom: 12px;" class="form-row">
        <div class="form-row-label">
          产品名称<em>:</em>
        </div>
        <div class="form-row-value">
          {{ goodsName }}
        </div>
      </div>

      <div style="margin-bottom: 12px;" class="form-row">
        <div class="form-row-label">
          版本号<em>:</em>
        </div>
        <div class="form-row-value">
          {{ version }}
        </div>
      </div>

      <div class="form-row">
        <div class="form-row-label">
          选择版本<em>:</em>
        </div>
        <div class="form-row-value">
          <Button
            :disabled="selectVersionDisabled"
            :type="editionType === 'enterprise' ? 'primary' : 'default'"
            @click="changeVersion('enterprise')"
          >
            企业版
          </Button>
          <Button
            :disabled="selectVersionDisabled"
            :type="editionType === 'datacenter' ? 'primary' : 'default'"
            @click="changeVersion('datacenter')"
          >
            数据中心版
          </Button>
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
            :step="10000"
            :min="concurrencyInfo && concurrencyInfo.min"
            :max="concurrencyInfo && concurrencyInfo.max"
            class="h-9 w-45"
          />
          <div class="tip">
            <span>输入范围</span>
            <em>:</em>
            <span>{{ concurrencyInfo && concurrencyInfo.min / 10000 }}万</span>
            <em>~</em>
            <span>{{ concurrencyInfo && concurrencyInfo.max / 10000 }}万</span>
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
            :step="10"
            :min="taskInfo && taskInfo.min"
            :max="taskInfo && taskInfo.max"
            class="h-9 w-45"
          />
          <div class="tip">
            <span>输入范围</span>
            <em>:</em>
            <span>{{ taskInfo && taskInfo.min }}</span>
            <em>~</em>
            <span>{{ taskInfo && taskInfo.max }}</span>
          </div>
        </div>
      </div>

      <div class="form-row items-start mb-4.5">
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
            :min="nodeInfo && nodeInfo.min"
            :max="nodeInfo && nodeInfo.max"
            class="h-9 w-45"
          />
          <div v-if="!nodeInputError" class="tip">
            <span>输入范围</span>
            <em>:</em>
            <span>{{ nodeInfo && nodeInfo.min }}</span>
            <em>~</em>
            <span>{{ nodeInfo && nodeInfo.max }}</span>
            <span style="margin-left: 4px;">每个节点可支持1万并发数。</span>
            <span v-if="minNodeLimit > +nodeNum" style="margin-left: 4px; color: #ff9828;">
              <span>当前并发数至少需要</span>
              <em style="font-weight: 600;">{{ minNodeLimit }}</em>
              <span>个以上的节点才可满足测试需求</span>
            </span>
          </div>
          <div v-else class="tip" style="color: rgba(245, 34, 45, 100%);">
            <span>当前并发数至少需要</span>
            <em style="font-weight: 600;">{{ minNodeLimit }}</em>
            <span>个以上的节点才可满足测试需求</span>
          </div>
        </div>
      </div>

      <div class="form-row items-start mb-4.5">
        <div class="form-row-label">
          <span>用户数</span>
          <em>:</em>
          <Popover>
            <template #content>
              <div style="width: 240px;" class="leading-5">
                系统最大可支持的访问用户数量，请根据公司实际使用所需用户合理选择。
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
            v-model:value="userNum"
            :step="10"
            :min="userInfo && userInfo.min"
            :max="userInfo && userInfo.max"
            class="h-9 w-45"
          />
          <div class="tip">
            <span>输入范围</span>
            <em>:</em>
            <span>{{ userInfo && userInfo.min }}</span>
            <em>~</em>
            <span>{{ userInfo && userInfo.max }}</span>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-row-label">
          <span>选择时长</span>
          <em>:</em>
        </div>
        <div class="form-row-value small-btn">
          <Button :type="duration === 365 ? 'primary' : 'default'" class="small-btn" @click="changeDuration(365)">
            <span>1年</span>
            <span v-if="oneYearDiscount" class="small-tip">{{ oneYearDiscount }}折</span>
          </Button>
          <Button :type="duration === 730 ? 'primary' : 'default'" class="small-btn" @click="changeDuration(730)">
            <span>2年</span>
            <span v-if="twoYearDiscount" class="small-tip">{{ twoYearDiscount }}折</span>
          </Button>
          <Button :type="duration === 1095 ? 'primary' : 'default'" class="small-btn" @click="changeDuration(1095)">
            <span>3年</span>
            <span v-if="threeYearDiscount" class="small-tip">{{ threeYearDiscount }}折</span>
          </Button>
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
            class="w-full max-w-75"
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
      <Alert
        v-if="successMessage"
        :description="successMessage"
        type="info"
        closable
        class="custom-alert"
        @close="closeAlert"
      />
      <div class="editions-grid mt-10">
        <div class="mx-auto">
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
              金额满减优惠<em>:</em>
            </div>
            <div class="col-value">
              <em class="small-money-symbol">￥</em><em>{{ round(discountByPriceAmount) }}</em><em
                class="small-money-unit"
              >元</em>
            </div>
          </div>
          
          
          
        </div>

        <div class="mx-auto">
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
              优惠券优惠<em>:</em>
            </div>
            <div class="col-value">
              <em class="small-money-symbol">￥</em><em>{{ round(discountByCouponAmount) }}</em><em
                class="small-money-unit"
              >元</em>
            </div>
          </div>
        </div>

        <div class="mx-auto" >
          <div class="inner-footer-col">
            <div class="col-label">
              支付金额<em>:</em>
            </div>
            <div class="money-bolder">
              <em class="money-symbol">￥</em><em>{{ payAmount }}</em><em class="money-unit">元</em>
            </div>
          </div>
          <div class="inner-footer-col">
            <Checkbox v-model:checked="agreeFlag" class="col-label">
              <span>我已同意</span>
              <span class="link">《晓蚕云产品服务协议》</span>
            </Checkbox>
          </div>
        </div>

        <div class="mx-auto w-85">
          
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
                  <div v-if="serviceInfo && serviceInfo.specId" class="content-row">
                    <div class="content-label">
                      服务费<em>:</em>
                    </div>
                    <div class="content-value w-28">
                      <em class="multi-symbol">*</em><em>1</em>
                    </div>
                    <div class="content-value">
                      <em class="small-money-symbol">￥</em><em>{{ round(servicePrice) }}</em>
                      <em class="small-money-unit">元</em>
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
                      用户数<em>:</em>
                    </div>
                    <div class="content-value w-28">
                      <em class="multi-symbol">*</em><em>{{ userNum }}</em>
                    </div>
                    <div class="content-value">
                      <em class="small-money-symbol">￥</em><em>{{ round(userPrice) }}</em>
                      <em class="small-money-unit">元</em>
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
         
          <div class="inner-footer-col w-30">
            <Button
              :loading="confirmLoading"
              :disabled="submitDisabled"
              class="w-28"
              type="primary"
              @click="createOrder">
              提交订单
            </Button>
          </div>
        </div>
      </div>
    </div>
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

/* :deep(.ant-select-selection-selected-value) {
  width: 100%;
} */

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

.purchase-outer-container {
  position: relative;
  font-size: 14px;
}

.purchase-top-container {
  display: flex;
  justify-content: center;
  width: 100%;
  user-select: none;
}

.purchase-top-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 440px;
  height: 170px;
  background-image: url("./assets/1.svg");
  color: #0f1723;
  font-size: 30px;
  font-weight: 600;
  line-height: 30px;
}

.purchase-form-container {
  min-height: calc(100% - 286px);
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
  flex: 1;
  min-width: 200px;
  /* width: 600px; */
  /* color: rgba(68, 76, 90, 100%); */
}

.form-row-value .ant-btn {
  max-width: 120px;
  margin-right: 20px;
  width: 40%;
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
  transform: translateX(-50%);
}

.box-shadow {
  height: 16px;
  opacity: 0.05;
  background: linear-gradient(360deg, #00163f 0%, rgba(0, 22, 63, 1%) 100%);
}

.editions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.inner-footer-container {
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  margin: 0 auto;
  padding: 0; */
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
  /* color: rgba(130, 136, 148, 100%); */
}
.inner-footer-col .ant-checkbox-wrapper {
  color: inherit;
}

.col-label .link {
  color: rgba(0, 119, 255, 100%);
}

.col-value {
  color: rgba(15, 23, 35, 100%);
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
  /* color: rgba(130, 136, 148, 100%); */
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