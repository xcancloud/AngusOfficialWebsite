<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue';
import { PUB_ESS } from '@xcan-angus/tools';
import http from '@/utils/http';
import { Button, Select, InputNumber, SelectOption } from 'ant-design-vue';
import { maxVersion } from '@/utils/version';
import { round } from '@/utils/math';

import { getCurrentLanguage } from '@/utils/index';
import { getOptions, getSpecInfo } from './pricing';
import CommonProblem  from './commonProblem.vue';

const languagePath = getCurrentLanguage();
const activeIndex = ref('cloud');
const specInfo = ref({})
const banners = ref({});
const buyFAQ = ref({});
const cloudServiceEdition = ref<{[key: string]: any}>({});
const privateEdition = ref({});

const description = computed(() => {
  return activeIndex.value === 'cloud' ? cloudServiceEdition.value.description : privateEdition.value.description;
});

const subDescription = computed(() => {
  return activeIndex.value === 'cloud' ? cloudServiceEdition.value.tip : privateEdition.value.tip;
});

// 日包规格map
const dayOptionMap = computed(() => {
  if (!dayspecOptions.value && dayspecOptions.value.length) {
    return {};
  }

  return dayspecOptions.value.reduce((prev, cur) => {
    prev[cur.value] = cur;
    return prev;
  }, {});
});

// 月包规格map
const monthOptionMap = computed(() => {
  if (!monthspecOptions.value && monthspecOptions.value.length) {
    return {};
  }

  return monthspecOptions.value.reduce((prev, cur) => {
    prev[cur.value] = cur;
    return prev;
  }, {});
});

// 月包规格map
const yearOptionMap = computed(() => {
  if (!yearspecOptions.value && yearspecOptions.value.length) {
    return {};
  }

  return yearspecOptions.value.reduce((prev, cur) => {
    prev[cur.value] = cur;
    return prev;
  }, {});
});

const dayTotalPrice = computed(() => {
  let totalPrice = 0;
  const day = 1;
  // const specInfo = this.specInfo;
  const concurrencyNum = +(dayVar.value.maximum || 0);
  const specNum = +(daySpecNum.value || 0);
  const currentNodeSpecInfo = dayOptionMap.value[daySpec.value];
  const nodePrice = +(dayVar.value.node || 0) * specInfo.value.nodePrice;
  const taskPrice = +(dayVar.value.task || 0) * specInfo.value.taskPrice;

  totalPrice = (+concurrencyNum * specInfo.value.concurrencyPrice + nodePrice + taskPrice) * day;

  if (currentNodeSpecInfo) {
    totalPrice += (currentNodeSpecInfo.unitPrice) * specNum * day;
  }

  return round(totalPrice);
});

const dayFinalPrice = computed(() => {
  let finalPrice = +dayTotalPrice.value;
  if (!finalPrice) {
    return round(0);
  }


  if (specInfo.value.discountByTime) {
    const discountKey = Object.keys(specInfo.value.discountByTime).reduce((prev, cur) => {
      if (+cur <= 1) {
        prev = cur;
      }

      return prev;
    }, '');
    if (specInfo.value.discountByTime[discountKey]) {
      finalPrice = finalPrice - finalPrice * (+specInfo.value.discountByTime[discountKey]);
    }
  }

  if (specInfo.value.discountByPrice) {
    const discountKey = Object.keys(specInfo.value.discountByPrice).reduce((prev, cur) => {
      if (finalPrice >= +cur) {
        prev = cur;
      }

      return prev;
    }, '');
    if (specInfo.value.discountByPrice[discountKey]) {
      finalPrice = finalPrice - finalPrice * (+specInfo.value.discountByPrice[discountKey]);
    }
  }

  return round(finalPrice);
});

const monthTotalPrice = computed(() => {
  let totalPrice = 0;
  const day = 30;
  // const specInfo = this.specInfo;
  const concurrencyNum = +(monthVar.value.maximum || 0);
  const specNum = +(monthSpecNum.value || 0);
  const currentNodeSpecInfo = monthOptionMap.value[monthSpec.value];
  const nodePrice = +(monthVar.value.node || 0) * specInfo.value.nodePrice;
  const taskPrice = +(monthVar.value.task || 0) * specInfo.value.taskPrice;

  totalPrice = (+concurrencyNum * specInfo.value.concurrencyPrice + nodePrice + taskPrice) * day;

  if (currentNodeSpecInfo) {
    totalPrice += (currentNodeSpecInfo.unitPrice) * specNum * day;
  }

  return round(totalPrice);
});

const monthFinalPrice = computed(() => {
  let finalPrice = +monthTotalPrice.value;
  if (!finalPrice) {
    return round(0);
  }

  // const specInfo = this.specInfo;
  if (specInfo.value.discountByTime) {
    const discountKey = Object.keys(specInfo.value.discountByTime).reduce((prev, cur) => {
      if (+cur <= 30) {
        prev = cur;
      }

      return prev;
    }, '');
    if (specInfo.value.discountByTime[discountKey]) {
      finalPrice = finalPrice - finalPrice * (+specInfo.value.discountByTime[discountKey]);
    }
  }

  if (specInfo.value.discountByPrice) {
    const discountKey = Object.keys(specInfo.value.discountByPrice).reduce((prev, cur) => {
      if (finalPrice >= +cur) {
        prev = cur;
      }

      return prev;
    }, '');
    if (specInfo.value.discountByPrice[discountKey]) {
      finalPrice = finalPrice - finalPrice * (+specInfo.value.discountByPrice[discountKey]);
    }
  }

  return round(finalPrice);
});

const yearTotalPrice = computed(() =>  {
  let totalPrice = 0;
  const day = 365;
  // const specInfo = this.specInfo;
  const concurrencyNum = +(yearVar.value.maximum || 0);
  const specNum = +(yearSpecNum.value || 0);
  const currentNodeSpecInfo = yearOptionMap.value[yearSpec.value];
  const nodePrice = +(yearVar.value.node || 0) * specInfo.value.nodePrice;
  const taskPrice = +(yearVar.value.task || 0) * specInfo.value.taskPrice;

  totalPrice = (+concurrencyNum * specInfo.value.concurrencyPrice + nodePrice + taskPrice) * day;

  if (currentNodeSpecInfo) {
    totalPrice += (currentNodeSpecInfo.unitPrice) * specNum * day;
  }

  return round(totalPrice);
});

const yearFinalPrice = computed(() => {
  let finalPrice = +yearTotalPrice.value;
  if (!finalPrice) {
    return round(0);
  }

  // const specInfo = this.specInfo;
  if (specInfo.value.discountByTime) {
    const discountKey = Object.keys(specInfo.value.discountByTime).reduce((prev, cur) => {
      if (+cur <= 365) {
        prev = cur;
      }

      return prev;
    }, '');
    if (specInfo.value.discountByTime[discountKey]) {
      finalPrice = finalPrice - finalPrice * (+specInfo.value.discountByTime[discountKey]);
    }
  }

  if (specInfo.value.discountByPrice) {
    const discountKey = Object.keys(specInfo.value.discountByPrice).reduce((prev, cur) => {
      if (finalPrice >= +cur) {
        prev = cur;
      }

      return prev;
    }, '');
    if (specInfo.value.discountByPrice[discountKey]) {
      finalPrice = finalPrice - finalPrice * (+specInfo.value.discountByPrice[discountKey]);
    }
  }

  return round(finalPrice);
});

const communityEditionItemList = computed(() => {
  if (privateEdition.value && privateEdition.value.communityEdition && privateEdition.value.communityEdition.items) {
    return privateEdition.value.communityEdition.items;
  }
  return [];
});

const enterpriseEditionItemList = computed(() => {
  if (privateEdition.value && privateEdition.value.enterpriseEdition && privateEdition.value.enterpriseEdition.items) {
    return privateEdition.value.enterpriseEdition.items;
  }

  return [];
});
const dataCenterItemList = computed(() => {
  if (privateEdition.value && privateEdition.value.dataCenter && privateEdition.value.dataCenter.items) {
    return privateEdition.value.dataCenter.items;
  }

  return [];
});
const enterpriseAppPrice = computed(() => {
  if (latestEnterpriseApp.value && latestEnterpriseApp.value.price) {
    return latestEnterpriseApp.value.price.finalPrice;
  }
  return '--';
});

const dataCenterAppPrice = computed(() => {
  if (latestDataCenterApp.value && latestDataCenterApp.value.price) {
    return latestDataCenterApp.value.price.finalPrice;
  }

  return '--';
});

const daySpecPlaceholder = computed(() => {
  if ((!daySpecMin.value && daySpecMin.value !== 0) || (!daySpecMax.value && daySpecMax.value !== 0)) {
    return '';
  }

  return '输入' + daySpecMin.value + ' ~ ' + daySpecMax.value;
});

const monthSpecPlaceholder = computed(() => {
  if ((!monthSpecMin.value && monthSpecMin.value !== 0) || (!monthSpecMax.value && monthSpecMax.value !== 0)) {
    return '';
  }

  return '输入' + monthSpecMin.value + ' ~ ' + monthSpecMax.value;
});

const yearSpecPlaceholder = computed(() => {
  if ((!yearSpecMin.value && yearSpecMin.value !== 0) || (!yearSpecMax.value && yearSpecMax.value !== 0)) {
    return '';
  }

  return '输入' + yearSpecMin.value + ' ~ ' + yearSpecMax.value;
});

const nodePlaceholder = computed(() => {
  if (!specInfo.value) {
    return '';
  }

  return '输入' + specInfo.value.nodeMin + ' ~ ' + specInfo.value.nodeMax;
});

const taskPlaceholder = computed(() => {
  if (!specInfo.value) {
    return '';
  }

  return '输入' + specInfo.value.taskMin + ' ~ ' + specInfo.value.taskMax;
});

const showDayTip = computed(() => {
  return +dayVar.value.node < +daySpecNum.value;
});
const showMonthTip = computed(() => {
  return +monthVar.value.node < +monthSpecNum.value;
});
const showYearTip = computed(() => {
  return +yearVar.value.node < +yearSpecNum.value;
});




const loadData = async () => {
  const [error, resp] = await http.get(`${PUB_ESS}/content/setting/price`);
  if (error) {
    return;
  }
  const _data = JSON.parse(resp.data);
  banners.value = _data.banners || {};
  buyFAQ.value = _data.buyFAQ || {};
  cloudServiceEdition.value = _data.cloudServiceEdition || {};
  privateEdition.value = _data.privateEdition || {};
  if (cloudServiceEdition.value.billedDay) {
    cloudServiceEdition.value.billedDay.maximumConcurrency = (cloudServiceEdition.value.billedDay.maximumConcurrency || []).map((item) => {
      const val = toDigit(item);
      return { label: item, value: val };
    });
    dayVar.value.maximum = cloudServiceEdition.value.billedDay.maximumConcurrency[0].value;
  }
  if (cloudServiceEdition.value.billedMonthly) {
    cloudServiceEdition.value.billedMonthly.maximumConcurrency = (cloudServiceEdition.value.billedMonthly.maximumConcurrency || []).map((item) => {
      const val = toDigit(item);
      return { label: item, value: val };
    });
    monthVar.value.maximum = cloudServiceEdition.value.billedMonthly.maximumConcurrency[0].value;
  }
  if (cloudServiceEdition.value.billedAnnually) {
    cloudServiceEdition.value.billedAnnually.maximumConcurrency = (cloudServiceEdition.value.billedAnnually.maximumConcurrency || []).map((item) => {
      const val = toDigit(item);
      return { label: item, value: val };
    });
    yearVar.value.maximum = cloudServiceEdition.value.billedAnnually.maximumConcurrency[0].value
  }
};

const tabClick = (key) => {
  activeIndex.value = key;
}

const toDigit = (numstr) => {
  return numstr.replace(/,/g, '');
}

// 云服务版 相关数据
const daySpec = ref();
const daySpecNum = ref(0);
const daySpecMin = ref(0);
const daySpecMax = ref(0);
const dayVar = ref({
  maximum: undefined, // 日包并发数
  node: undefined, // 日包节点配额
  task: undefined // 日包任务数
});

const monthSpec = ref();
const monthSpecNum = ref(0);
const monthSpecMin = ref(0);
const monthSpecMax = ref(0);
const monthVar = ref({
  maximum: undefined, // 月包并发数
  node: undefined, // 月包节点配额
  task: undefined // 月包任务数
});


const yearSpec = ref();
const yearSpecNum = ref(0);
const yearSpecMin = ref(0);
const yearSpecMax = ref(0);
const yearVar = ref({
  maximum: undefined, // 年包并发数
  node: undefined, // 年包节点配额
  task: undefined // 年包任务数
});

const dayspecOptions = ref([]);
const monthspecOptions = ref([]);
const yearspecOptions = ref([]);

const latestEnterpriseApp = ref({}); // 最新版企业版应用
const latestDataCenterApp = ref({}); // 最新版数据中心版应用
const latestCloudApp = ref({}); // 最新版本云服务版应用



const setLatestApp = async () => {
  const [error, res] = await http.get(`${PUB_ESS}/store/goods/AngusTester/online`);
  if (error || !res.data) {
    return;
  }

  const list = res.data;

  const enterpriseAppList = list.filter(item => item.editionType.value === 'ENTERPRISE');
  const evs = enterpriseAppList.map(item => item.version);
  const maxev = maxVersion(evs);
  latestEnterpriseApp.value = enterpriseAppList.find(item => item.version === maxev);

  const dataCenterAppList = list.filter(item => item.editionType.value === 'DATACENTER');
  const dvs = dataCenterAppList.map(item => item.version);
  const maxdv = maxVersion(dvs);
  latestDataCenterApp.value = dataCenterAppList.find(item => item.version === maxdv);

  const cloudAppList = list.filter(item => item.editionType.value === 'CLOUD_SERVICE');
  const clvs = cloudAppList.map(item => item.version);
  const maxclv = maxVersion(clvs);
  latestCloudApp.value = cloudAppList.find(item => item.version === maxclv);
  getPricingTemplate();
};

const getPricingTemplate = async () => {
  const [error, res] = await http.get(`${PUB_ESS}/pricing/template/` + latestCloudApp.value.pricingTemplateId);
  if (error || !res.data) {
    return;
  }

  const info = cloudServiceEdition.value;
  if (!info) {
    return;
  }

  specInfo.value = getSpecInfo(res.data);

  let list = [];
  if (info.billedDay && info.billedDay.spec) {
    list = info.billedDay.spec;
  }
  dayspecOptions.value = getOptions(res.data, list);
  daySpec.value = dayspecOptions.value[0].value;

  let list2 = [];
  if (info.billedMonthly && info.billedMonthly.spec) {
    list2 = info.billedMonthly.spec;
  }
  monthspecOptions.value = getOptions(res.data, list2);
  monthSpec.value =monthspecOptions.value[0].value;

  let list3 = [];
  if (info.billedAnnually && info.billedAnnually.spec) {
    list3 = info.billedAnnually.spec;
  }
  yearspecOptions.value = getOptions(res.data, list3);
  yearSpec.value = yearspecOptions.value[0].value;
};





onMounted(async () => {
  await loadData();
  const info = cloudServiceEdition.value;
  if (info) {
    dayVar.value.maximum = info.billedDay.maximumConcurrency[0].value;
    monthVar.value.maximum = info.billedMonthly.maximumConcurrency[0].value;
    yearVar.value.maximum = info.billedAnnually.maximumConcurrency[0].value;
  }
  setLatestApp();

  watch(() => daySpec.value, (newValue) => {
    const data = dayOptionMap.value[newValue];
    if (!data) {
      daySpecNum.value = 0;
      daySpecMin.value = 0;
      daySpecMax.value = 0;
    } else {
      if (!daySpecNum.value || (+daySpecNum.value < data.min)) {
        daySpecNum.value = data.min;
      } else if (+daySpecNum.value > data.max) {
        daySpecNum.value = data.max;
      }
      daySpecMin.value = data.min;
      daySpecMax.value = data.max;
    }
  }, {
    immediate: true
  });

  watch(() =>  monthSpec.value, (newValue) => {
    const data = monthOptionMap.value[newValue];
    if (!data) {
      monthSpecNum.value = 0;
      monthSpecMin.value = 0;
      monthSpecMax.value = 0;
    } else {
      if (!monthSpecNum.value || (+monthSpecNum.value < data.min)) {
        monthSpecNum.value = data.min;
      } else if (+monthSpecNum.value > data.max) {
        monthSpecNum.value = data.max;
      }
      monthSpecMin.value = data.min;
      monthSpecMax.value = data.max;
    }
  }, {
    immediate: true
  });

  watch(() => yearSpec.value, (newValue) => {
    const data = yearOptionMap.value[newValue];
    if (!data) {
      yearSpecNum.value = 0;
      yearSpecMin.value = 0;
      yearSpecMax.value = 0;
    } else {
      if (!yearSpecNum.value || (+yearSpecNum.value < data.min)) {
        yearSpecNum.value = data.min;
      } else if (+yearSpecNum.value > data.max) {
        yearSpecNum.value = data.max;
      }
      yearSpecMin.value = data.min;
      yearSpecMax.value = data.max;
    }
  }, {
    immediate: true
  });

  watch(() => dayTotalPrice.value, () => {
    const data = {
      taskNum: dayVar.value.task,
      nodeNum: dayVar.value.node,
      maximum: dayVar.value.maximum,
      nodeSpecNum: daySpecNum.value,
      nodeSpec: daySpec.value
    };
    localStorage.setItem('__d__', JSON.stringify(data));
  });

  watch(() => monthTotalPrice.value, () => {
    const data = {
      taskNum: monthVar.value.task,
      nodeNum: monthVar.value.node,
      maximum: monthVar.value.maximum,
      nodeSpecNum: monthSpecNum.value,
      nodeSpec: monthSpec.value
    };
    localStorage.setItem('__m__', JSON.stringify(data));
  });

  watch(() => yearTotalPrice.value, () => {
    const data = {
      taskNum: yearVar.value.task,
      nodeNum: yearVar.value.node,
      maximum: yearVar.value.maximum,
      nodeSpecNum: yearSpecNum.value,
      nodeSpec: yearSpec.value
    };
    localStorage.setItem('__y__', JSON.stringify(data));
  });

});
</script>
<template>
  <div>
    <!--banner-->
    <div class="banner-wrap mx-auto mb-30 mt-10">

      <div class="relative z-9 banner-info">
        <div class="text-10 font-semibold mt-28 mb-6 leading-10">
          {{ banners.title }}
        </div>
        <div class="tracking-1.625 text-xl font-normal opacity-80 mb-6 leading-5">
          {{ banners.secondTitle }}
        </div>
        <div class="flex items-center mt-20 btns">
          <Button
            class="mr-4 cursor-pointer text-base rounded w-40 h-12.5 text-center font-medium select-none primary-btn"
            :href="`${languagePath}/purchase/angusCloud`"
          >
            {{ banners.button?.[0] }}
        </Button>
          <Button
            class="cursor-pointer text-base rounded w-40 h-12.5 text-center font-medium select-none default-btn"
            hred="/consult"
          >
            {{ banners.button?.[1] }}
          </Button>
        </div>
      </div>

      <div class="banner-img"></div>
      <!-- <img class="select-none mt-20" src="./assets/bg.png"> -->
    </div>


    <!-- 云服务版、私有化版 -->

    <div>
      <div class="horizon-tab">
        <div :class="{ active: activeIndex === 'private' }" class="tab-item" @click="tabClick('private')">
          <Icon icon="icon-siyou" />私有化版
        </div>
        <em class="col-divider" />
        <div :class="{ active: activeIndex === 'cloud' }" class="tab-item" @click="tabClick('cloud')">
          <Icon icon="icon-yun" /><span>云服务版</span>
        </div>
      </div>

      <div class="mt-7.5 mb-17.5 text-center">
        <div class="horizon-tab-desc mb-3">
          {{ description }}
        </div>
        <div v-if="subDescription" class="horizon-tab-tip">
          {{ subDescription }}
        </div>
      </div>

      <div v-show="activeIndex === 'private'" class="editions-grid">
        <div class="card-item">
          <div class="card-header">
            <Icon icon="icon-shequ" />
            <span>社区版</span>
          </div>
          <div class="card-content">
            <div v-for="(item, index) in communityEditionItemList" :key="index" class="row-container">
              <Icon v-if="item.support" icon="icon-duihaolv" />
              <Icon v-else icon="icon-buhan" />
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="card-footer">
            <div class="flex items-center mb-4" style="color: #27c5ff;">
              <Icon icon="icon-shuoming" style="margin-right: 6px; font-size: 15px;" />
              <span>实名账号比未实名账号配额多一倍</span>
            </div>
            <div class="free-text">
              免费
            </div>
            <a class="btn-link cyan" to="/deployment#downLoadAnchor">
              <span>立即下载</span>
              <Icon icon="icon-hengjiantou" />
            </a>
          </div>
        </div>
        <div class="card-item">
          <div style="background-color: rgba(238, 247, 255, 100%);" class="card-header">
            <Icon icon="icon-qiye" />
            <span>企业版</span>
          </div>
          <div class="card-content">
            <div v-for="(item, index) in enterpriseEditionItemList" :key="index" class="row-container">
              <Icon v-if="item.support" icon="icon-duihaolv" />
              <Icon v-else icon="icon-buhan" />
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="card-footer">
            <div class="money-group mb-2">
              <em class="money-normal">￥</em>
              <em class="money-bolder">{{ enterpriseAppPrice }}</em>
              <em class="money-normal">元<em class="not-italic mx-1">/</em>年</em>
            </div>
            <Button type="primary" size="large" class="!h-14 !leading-10 w-50 px-8" :href="`${languagePath}/purchase/angusPriv?type=enterprise`">
              <span class="text-white">立即购买</span>
              <Icon icon="icon-hengjiantou" />
            </Button>
          </div>
        </div>
        <div class="card-item">
          <div style="background-color: rgba(255, 246, 237, 100%);" class="card-header">
            <Icon icon="icon-shujuzhongxin" />
            <span>数据中心版</span>
          </div>
          <div class="card-content">
            <div v-for="(item, index) in dataCenterItemList" :key="index" class="row-container">
              <Icon v-if="item.support" icon="icon-duihaolv" />
              <Icon v-else icon="icon-buhan" />
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="card-footer">
            <div class="money-group mb-2">
              <em class="money-normal">￥</em>
              <em class="money-bolder">{{ dataCenterAppPrice }}</em>
              <em class="money-normal">元<em class="not-italic mx-1">/</em>年</em>
            </div>
            <Button size="large" class="!h-14 !leading-10 bg-vp-yellow_soft border-none flex justify-between items-center w-50 !px-8" :href="`${languagePath}/purchase/enterprise?type=datacenter`">
              <span>立即购买</span>
              <Icon icon="icon-hengjiantou" />
            </Button>
          </div>
        </div>
      </div>
      
      <div v-show="activeIndex === 'cloud'" class="editions-grid">

        <div style="height: 669px;" class="card-item fixed-box">
          <div class="card-header-short day">
            按天
          </div>
          <div v-if="cloudServiceEdition.billedDay" class="card-content">
            <div class="card-row">
              <div class="card-row-label">
                并发数
              </div>
              <div class="card-row-content">
                <Select
                  v-model:value="dayVar.maximum"
                  class="w-full"
                  :options="cloudServiceEdition.billedDay.maximumConcurrency" />
              </div>
            </div>

            <div class="card-row">
              <div class="card-row-label">
                任务并发数
              </div>
              <div class="card-row-content">
                <InputNumber
                  v-model:value="dayVar.task"
                  class="w-full"
                  :placeholder="taskPlaceholder"
                  :min="specInfo.taskMin"
                  :max="specInfo.taskMax"
                />
              </div>
            </div>

            <div class="card-row">
              <div class="card-row-label">
                节点配额
              </div>
              <div class="card-row-content">
                <InputNumber
                  v-model:value="dayVar.node"
                  class="w-full"
                  :placeholder="nodePlaceholder"
                  :min="specInfo.nodeMin"
                  :max="specInfo.nodeMax"
                />
                <div v-if="showDayTip" class="info-tip">
                  节点配额不能小于购买节点数
                </div>
              </div>
            </div>

            <div class="card-row">
              <div class="card-row-label">
                购买节点
              </div>
              <div class="card-row-content">
                <Select v-model:value="daySpec" allow-clear class="w-full">
                  <SelectOption v-for="item in dayspecOptions" :key="item.value" :value="item.value" :title="item.label">
                    {{ item.label }}
                  </SelectOption>
                </Select>
                <InputNumber
                  v-if="daySpec"
                  v-model:value="daySpecNum"
                  class="mt-2 block w-full"
                  :placeholder="daySpecPlaceholder"
                  :min="daySpecMin"
                  :max="daySpecMax"
                />
              </div>
            </div>

            <div class="card-row mb-5">
              <div style="transform: translateY(0);" class="card-row-label">
                基础功能
              </div>
              <div class="card-row-content">
                {{ cloudServiceEdition.billedDay.bsicFunction }}
              </div>
            </div>

            <div class="card-row">
              <div style="transform: translateY(0);" class="card-row-label">
                管理功能
              </div>
              <div class="card-row-content">
                {{ cloudServiceEdition.billedDay.managementFunction }}
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="money-group">
              <em class="money-normal">￥</em>
              <em class="money-bolder">{{ dayFinalPrice }}</em>
              <em class="money-normal">元<em class="not-italic mx-1">/</em>天</em>
            </div>
            <div class="discount-text">
              <span>官方价<em>:</em></span>
              <em>￥</em>
              <em>{{ dayTotalPrice }}</em>
              <em>元<em class="not-italic mx-1">/</em>天</em>
            </div>
            <a class="btn-link cyan" :href="`${languagePath}/purchase/angusCloud?t=d`">
              <span>立即购买</span>
              <Icon icon="icon-hengjiantou" />
            </a>
          </div>
        </div>

        <div style="height: 669px;" class="card-item fixed-box">
          <div class="card-header-short month">
            按月
          </div>
          <div v-if="cloudServiceEdition.billedMonthly" class="card-content">
            <div class="card-row">
              <div class="card-row-label">
                并发数
              </div>
              <div class="card-row-content">
                <Select
                  v-model:value="monthVar.maximum"
                  class="w-full"
                  :options="cloudServiceEdition.billedMonthly.maximumConcurrency"
                />
              </div>
            </div>

            <div class="card-row">
              <div class="card-row-label">
                任务并发数
              </div>
              <div class="card-row-content">
                <InputNumber
                  v-model:value="monthVar.task"
                  class="w-full"
                  :placeholder="taskPlaceholder"
                  :min="specInfo.taskMin"
                  :max="specInfo.taskMax"
                />
              </div>
            </div>

            <div class="card-row">
              <div class="card-row-label">
                节点配额
              </div>
              <div class="card-row-content">
                <InputNumber
                  v-model="monthVar.node"
                  class="w-full"
                  :placeholder="nodePlaceholder"
                  :min="specInfo.nodeMin"
                  :max="specInfo.nodeMax"
                />
                <div v-if="showMonthTip" class="info-tip">
                  节点配额不能小于购买节点数
                </div>
              </div>
            </div>

            <div class="card-row">
              <div class="card-row-label">
                购买节点
              </div>
              <div class="card-row-content">
                <Select v-model:value="monthSpec" allow-clear class="w-full">
                  <SelectOption
                    v-for="item in monthspecOptions"
                    :key="item.value"
                    :value="item.value"
                    :title="item.label"
                  >
                    {{ item.label }}
                  </SelectOption>
                </Select>
                <InputNumber
                  v-if="monthSpec"
                  v-model:value="monthSpecNum"
                  class="mt-2 block w-full"
                  :placeholder="monthSpecPlaceholder"
                  :min="monthSpecMin"
                  :max="monthSpecMax"
                />
              </div>
            </div>

            <div class="card-row mb-5">
              <div style="transform: translateY(0);" class="card-row-label">
                基础功能
              </div>
              <div class="card-row-content">
                {{ cloudServiceEdition.billedMonthly.bsicFunction }}
              </div>
            </div>

            <div class="card-row">
              <div style="transform: translateY(0);" class="card-row-label">
                管理功能
              </div>
              <div class="card-row-content">
                {{ cloudServiceEdition.billedMonthly.managementFunction }}
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="money-group">
              <em class="money-normal">￥</em>
              <em class="money-bolder">{{ monthFinalPrice }}</em>
              <em class="money-normal">元<em class="not-italic mx-1">/</em>月</em>
            </div>
            <div class="discount-text">
              <span>官方价<em>:</em></span>
              <em>￥</em>
              <em>{{ monthTotalPrice }}</em>
              <em>元<em class="not-italic mx-1">/</em>月</em>
            </div>
            <a class="btn-link blue" :href="`${languagePath}/purchase/angusCloud?t=m`">
              <span>立即购买</span>
              <Icon icon="icon-hengjiantou" />
            </a>
          </div>
        </div>

        <div style="height: 669px;" class="card-item fixed-box">
          <div class="card-header-short year">
            按年
          </div>
          <div v-if="cloudServiceEdition.billedAnnually" class="card-content">
            <div class="card-row">
              <div class="card-row-label">
                并发数
              </div>
              <div class="card-row-content">
                <Select
                  v-model:value="yearVar.maximum"
                  class="w-full"
                  :options="cloudServiceEdition.billedAnnually.maximumConcurrency" />
              </div>
            </div>

            <div class="card-row">
              <div class="card-row-label">
                任务并发数
              </div>
              <div class="card-row-content">
                <InputNumber
                  v-model:value="yearVar.task"
                  class="w-full"
                  :placeholder="taskPlaceholder"
                  :min="specInfo.taskMin"
                  :max="specInfo.taskMax"
                />
              </div>
            </div>

            <div class="card-row">
              <div class="card-row-label">
                节点配额
              </div>
              <div class="card-row-content">
                <InputNumber
                  v-model:value="yearVar.node"
                  class="w-full"
                  :placeholder="nodePlaceholder"
                  :min="specInfo.nodeMin"
                  :max="specInfo.nodeMax"
                />
                <div v-if="showYearTip" class="info-tip">
                  节点配额不能小于购买节点数
                </div>
              </div>
            </div>

            <div class="card-row">
              <div class="card-row-label">
                购买节点
              </div>
              <div class="card-row-content">
                <Select v-model:value="yearSpec" allow-clear class="w-full">
                  <SelectOption v-for="item in yearspecOptions" :key="item.value" :value="item.value" :title="item.label">
                    {{ item.label }}
                  </SelectOption>
                </Select>
                <InputNumber
                  v-if="yearSpec"
                  v-model:value="yearSpecNum"
                  class="mt-2 block w-full"
                  :placeholder="yearSpecPlaceholder"
                  :min="yearSpecMin"
                  :max="yearSpecMax"
                />
              </div>
            </div>

            <div class="card-row mb-5">
              <div style="transform: translateY(0);" class="card-row-label">
                基础功能
              </div>
              <div class="card-row-content">
                {{ cloudServiceEdition.billedAnnually.bsicFunction }}
              </div>
            </div>

            <div class="card-row">
              <div style="transform: translateY(0);" class="card-row-label">
                管理功能
              </div>
              <div class="card-row-content">
                {{ cloudServiceEdition.billedAnnually.managementFunction }}
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="money-group">
              <em class="money-normal">￥</em>
              <em class="money-bolder">{{ yearFinalPrice }}</em>
              <em class="money-normal">元<em class="not-italic mx-1">/</em>年</em>
            </div>
            <div class="discount-text">
              <span>官方价<em>:</em></span>
              <em>￥</em>
              <em>{{ yearTotalPrice }}</em>
              <em>元<em class="not-italic mx-1">/</em>年</em>
            </div>
            <a class="btn-link yellow" :href="`${languagePath}/purchase/angusCloud?t=y`">
              <span>立即购买</span>
              <Icon icon="icon-hengjiantou" />
            </a>
          </div>
        </div>

      </div>

    </div>
    <commonProblem  class="mb-15" :title="buyFAQ.name" :list="buyFAQ.items" />
  </div>
</template>
<style scoped>
.banner-wrap {
  @apply relative h-100  rounded-xl;
}

.banner-info {
  @apply max-w-150 p-6;
}

.editions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 2rem;
}

.banner-img {
  position: absolute;
  right:0;
  width: 50%;
  z-index: 0;
  height: 100%;
  top: 0;
  background-size: cover;
  background-position: center;
  background-image: url('./assets/bg.png');
}

.horizon-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(68, 76, 90, 100%);
  user-select: none;
}

.tab-item {
  display: inline-flex;
  align-items: center;
  font-size: 36px;
  line-height: 36px;
  cursor: pointer;
}

.tab-item .icon {
  margin-right: 30px;
}

.tab-item.active {
  color: rgba(0, 119, 255, 100%);
}
.col-divider {
  display: inline-block;
  width: 1px;
  height: 44px;
  margin: 0 2rem;
  transform: rotate(15deg);
  background-color: rgba(15, 23, 35, 100%);
  font-style: normal;
}

horizon-tab-desc {
  color: #828894;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-line;
  user-select: none;
}

.card-group {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  transition: all 300ms linear 0ms;
}

.card-item {
  display: flex;
  flex-direction: column;
  width: 374px;
  /* margin-right: 39px; */
  margin: 0 auto;
  overflow: hidden;
  transform: translateY(0);
  transition: all 300ms linear 100ms;
  border: 1px solid #f0f0f0;
  border-radius: 20px;
}

.card-item:hover {
  transform: translateY(-20px);
  box-shadow: 0 15px 20px 0 rgba(29, 42, 100, 10%);
}

.card-item.fixed-box {
  transform: translateY(0);
  box-shadow: 0 15px 20px 0 rgba(29, 42, 100, 10%);
}

.card-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: #edfaf7;
  color: #000b33;
  font-size: 28px;
  font-weight: 600;
}

.card-header .icon {
  margin-right: 30px;
  transform: translateY(-1px);
  font-size: 40px;
}

.btn-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 48px;
  margin-top: 16px;
  padding: 0 30px;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.cyan {
  background-color: #25caa0;
  box-shadow: 0 5px 10px 0 rgba(37, 202, 160, 20%);
}

.blue {
  background-color: #2098ff;
  box-shadow: 0 5px 10px 0 rgba(32, 152, 255, 20%);
}

.yellow {
  background-color: #ff9828;
  box-shadow: 0 5px 10px 0 rgba(255, 152, 40, 20%);
}

.card-content {
  flex: 1 1 100%;
  padding: 30px 40px;
}

.row-container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 14px;
  line-height: 24px;
}

.row-container .icon {
  flex-shrink: 0;
  margin-right: 20px;
  transform: translateY(4px);
  font-size: 14px;
}

.card-footer {
  display: flex;
  position: relative;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: flex-end;
  height: 185px;
  padding: 0 40px 40px;
}

.card-footer::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 40px;
  width: calc(100% - 80px);
  height: 0;
  border-top: 1px dashed rgba(229, 229, 229, 100%);
}

.card-footer .free-text {
  color: #27c5ff;
  font-size: 30px;
  font-weight: 600;
  line-height: 30px;
}

.money-group {
  display: flex;
  align-items: flex-end;
  white-space: nowrap;
}

.money-group em {
  font-style: normal;
}

.money-group .money-bolder {
  margin: 0 4px;
  color: #e6ae71;
  font-size: 32px;
  font-weight: 600;
  line-height: 32px;
}

.money-group .money-normal {
  color: #e6ae71;
  font-size: 16px;
  font-weight: 600;
}

.money-group .text-normal {
  margin-left: 20px;
  color: #444c5a;
  font-size: 16px;
}

.card-header-short {
  height: 70px;
  color: #fff;
  font-size: 28px;
  font-weight: 600;
  line-height: 70px;
  text-align: center;
}

.day {
  background-image: url("./assets/1.svg");
}

.month {
  background-image: url("./assets/2.svg");
}

.year {
  background-image: url("./assets/3.svg");
}

.discount-text {
  margin-top: 12px;
  color: #828894;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  text-decoration: line-through;
}

.discount-text em {
  font-style: normal;
}

.card-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  margin-bottom: 26px;
  /* color: #828894; */
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}

.card-row.mb-5 {
  margin-bottom: 20px;
}

.card-row-label {
  flex: 1 1 100%;
  transform: translateY(8px);
}

.card-row-content {
  position: relative;
  flex-shrink: 0;
  width: 180px;
}

.info-tip {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  color: #ffa39e;
  font-size: 12px;
  line-height: 14px;
}

.horizon-tab-tip {
  color: red;
  text-align: center;
}

@media (max-width: 960px) {
  .banner-wrap {
    height:fit-content;
    text-align: center;
  }

  .banner-img {
    width: 100%;
    height: 300px;
    left: 0;
    top:0;
    bottom:0;
    position:relative;
  }

  .banner-info {
    @apply max-w-full;
  }
  

  .banner-info .btns {
    justify-content: center;
  }
}
</style>