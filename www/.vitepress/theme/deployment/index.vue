<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import http from '@/utils/http';
import { isSignin } from '@/utils/site/index';
import { PUB_ESS, GM, ESS, site } from '@xcan-angus/tools';
import { Button, Select } from 'ant-design-vue';
import { useRouter } from 'vitepress';

import License from './license.vue';
const router = useRouter();

const toAuthVisible = ref(false);
const toLoginVisible = ref(false);
const dowloadName = ref();
const banner = ref([]);
const deploymentMethod = ref({});
const privateDeployment = ref({});
const downloadAndInstall = ref({});
const button = ref({
  COMMUNITY: {
    name: '立即下载',
    urlType: 'downLoad',
    url: '',
    loading: false,
    editionType: '',
    editionName: '',
    goodsId: '',
    goodsName: '',
    goodsCode: '',
    goodsVersion: ''
  },
  ENTERPRISE: {
    name: '立即购买',
    urlType: 'jump',
    url: '/purchase/angustester/enterprise',
    loading: false,
    editionType: '',
    editionName: '',
    goodsId: '',
    goodsName: '',
    goodsCode: '',
    goodsVersion: ''
  },
  DATACENTER: {
    name: '立即购买',
    urlType: 'jump',
    url: '/purchase/angustester/datacenter',
    loading: false,
    editionType: '',
    editionName: '',
    goodsId: '',
    goodsName: '',
    goodsCode: '',
    goodsVersion: ''
  }
});
const signinFlag = ref(false);
const userInfo = ref({});

const loadData = async () => {
  const [error, res] = await http.get(`${PUB_ESS}/content/setting/privateDeployment`, {
    code: 'AngusTester'
  });

  const _data = res?.data || {};
  banner.value = _data.banners || [];
  deploymentMethod.value = _data.deploymentMethod || {};
  privateDeployment.value = _data.privateDeployment || {};
  downloadAndInstall.value = _data.downloadAndInstall || {};
  if (isSignin) {
    gerLoginUserInfo();
  }
};

const versionsListColor = [
  {
    backgroundColor: 'rgba(0, 187, 152, 0.1)',
    border: '!border-vp-green1'
  },
  {
    backgroundColor: 'rgba(40, 177, 255, 0.1)',
    border: '!border-vp-indigo1'
  },
  {
    backgroundColor: 'rgba(255, 200, 62, 0.1)',
    border: '!border-vp-yellow1'
  }
]

const getIconColor = (color, flag) => {
  return { color: flag ? `rgba(${color})` : 'rgba(130,136,148,60%)' };
};


const payButton = async (editionTypeValue) => {
      // 判断用户是否登录
      const signinFlag = await isSignin();
      if (!signinFlag) {
        toLoginVisible.value = true;
        return;
      }
      // 判断用户是否实名认证
      if (userInfo.value?.tenantRealNameStatus?.value !== 'AUDITED' && editionTypeValue !== 'COMMUNITY') {
        toAuthVisible.value = true
        return;
      }

      switch (editionTypeValue) {
        case 'COMMUNITY':
          // 社区版都是下载
          doloadApp(editionTypeValue);
          break;
        case 'ENTERPRISE':
          // 下载
          if (button.value[editionTypeValue].urlType === 'downLoad') {
            doloadApp(editionTypeValue);
          } else {
            // /zh/pricing
            const currentPath = router.route.path;
            const currentLanguage = currentPath.split('/')[1];
            // debugger;
            router.go(`/${currentLanguage}/pricing`);
            // router.go(button.value[editionTypeValue].url)
          }
          break;
        case 'DATACENTER':
          if (button.value[editionTypeValue].urlType === 'downLoad') {
            doloadApp(editionTypeValue);
          } else {
            // /zh/pricing
            const currentPath = router.route.path;
            const currentLanguage = currentPath.split('/')[1];
            // debugger;
            router.go(`/${currentLanguage}/pricing`);
          }
          break;
      }
};

const doloadApp = (code) => {
  if (!button.value[code].url) {
    return;
  }
  button.value[code].loading = true;

  axios({
    url: button.value[code].url,
    method: 'GET',
    responseType: 'blob' // 设置响应类型为blob
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'AngusTester-Community-Full-1.0.0.zip');
    document.body.appendChild(link);
    link.click();
  }).catch().finally(() => {
    button.value[code].loading = false;
  });
};

const gerLoginUserInfo = async  () => {
      const signinFlag = await isSignin(false);
      if (!signinFlag) {
        return;
      }
      const [error, { data }] = await http.get(`${GM}/user/current`);
      if (error) {
        return;
      }
      userInfo.value = data;
      setDefaultButtonName(downloadAndInstall.value?.installEditions);
};

const setDefaultButtonName = (installEditions) =>  {
      if (!installEditions?.length) {
        return;
      }
      // 社区版商品
      const communityEdition = installEditions.filter(item => item.code === 'COMMUNITY')[0];
      const communityEditionGoods = communityEdition.appAndVersion;
      if (communityEditionGoods?.length) {
        const defaultCommunity = communityEditionGoods[0];
        button.value.COMMUNITY.url = defaultCommunity.onlineInstallerDownloadUrl;
        setApplyLcsParmas(communityEdition.code, communityEdition.name, defaultCommunity);
      }

      // 企业版商品
      const corporateEdition = installEditions.filter(item => item.code === 'ENTERPRISE')[0];
      const corporateEditionGoods = corporateEdition.appAndVersion;
      if (corporateEditionGoods?.length) {
        const defalutGoods = corporateEditionGoods[0];
        isEnterprisePurchased(defalutGoods.goodsCode, defalutGoods.goodsVersion, 'ENTERPRISE', defalutGoods.onlineInstallerDownloadUrl);
        setApplyLcsParmas(corporateEdition.code, corporateEdition.name, defalutGoods);
      }

      // 数据中心版商品
      const dataCenter = installEditions.filter(item => item.code === 'DATACENTER')[0];
      const dataCenterGoods = dataCenter.appAndVersion;
      if (dataCenterGoods?.length) {
        const defalutGoods = dataCenterGoods[0];
        isEnterprisePurchased(defalutGoods.goodsCode, defalutGoods.goodsVersion, 'DATACENTER');
        setApplyLcsParmas(dataCenter.code, dataCenter.name, defalutGoods);
      }
};

// 获取已登录用户选择的商品是否已购买
const isEnterprisePurchased = async  (goodsCode, goodsVersion, editionType, dowloadUrl) =>{
      const [error, { data }] = await http.get(`${ESS}/order?goodsCode=${goodsCode}&goodsVersion=${goodsVersion}&editionType=${editionType}&expired=false&status=FINISHED`, {}, { headers: { 'XC-Opt-Tenant-Id': userInfo.value.tenantId } });
      if (error) {
        return;
      }

      if (!data?.list?.length) {
        button.value[editionType].name = '立即购买';
        button.value[editionType].urlType = 'jump';
        button.value[editionType].url = editionType === 'ENTERPRISE' ? '/purchase/angustester/enterprise' : '/purchase/angustester/datacenter';
        return;
      }

      button.value[editionType].name = '立即下载';
      button.value[editionType].urlType = 'downLoad';
      button.value[editionType].url = dowloadUrl;
}

const setApplyLcsParmas = (editionType, editionName, goods) => {
  button.value[editionType].editionName = editionName;
  button.value[editionType].editionType = editionType;
  button.value[editionType].goodsId = goods.goodsId;
  button.value[editionType].goodsName = goods.goodsName;
  button.value[editionType].goodsCode = goods.goodsCode;
  button.value[editionType].goodsVersion = goods.goodsVersion;
};

const selectChange = (goodsId, edtion) => {
  const checkGoods = edtion.appAndVersion.filter(item => item.goodsId === goodsId)[0];
  setApplyLcsParmas(edtion.code, edtion.name, checkGoods);
  if (edtion.code === 'COMMUNITY') {
    button.value.COMMUNITY.url = checkGoods.onlineInstallerDownloadUrl;
    const lastIndex = checkGoods.onlineInstallerDownloadUrl.lastIndexOf('/');
    const result = checkGoods.onlineInstallerDownloadUrl.substring(lastIndex + 1);
    dowloadName.value = result;
    return;
  }
  isEnterprisePurchased(checkGoods.goodsCode, checkGoods.goodsVersion, edtion.code);
};



const confirmContent = ref();
const licenseProps = ref({});
const showLicense = ref(false);
// 获取许可
const getGoodsLcs = async  (editionType) => {
  const signinFlag = await isSignin();
  if (!signinFlag) {
    toLoginVisible.value = true;
    confirmContent.value = '系统检测到您的账号还未登录，请您登录后再进行操作。';
    return;
  }

  licenseProps.value = {
    eCode: editionType,
    eName: button.value[editionType].editionName,
    gVersion: button.value[editionType].goodsVersion,
    gId: button.value[editionType].goodsId,
    gCode: button.value[editionType].goodsCode,
    gName: button.value[editionType].goodsName,
    orderNo: button.value[editionType].orderNo,
    tenantId: userInfo.value.tenantId
  };
  showLicense.value = true;
}

const cancelLicense = () => {
  showLicense.value = false;
}

onMounted(async () => {
  signinFlag.value = await isSignin(false);
  loadData()
});
</script>
<template>
  <div class="w-full overflow-hidden">
    <License 
      v-if="showLicense"
      v-bind="licenseProps"
      @cancel="cancelLicense"
      @ok="cancelLicense" />

    <template v-else>

      <!-- banner -->
      <div class="bg-img">
        <div v-if="banner.length" class="mx-auto banner-wrap" style="padding-top: 60px;">
          <div class="relative z-9 banner-info">
            <p class="mb-7.5 text-8 leading-10 font-semibold">
              {{ banner[0].title }}
            </p>
            <p class="text-5">
              {{ banner[0].secondTitle }}
            </p>
            <div class="flex items-center mt-10 mb-4 btns" style="z-index: 999;">
              <Button size="large" class="w-25 select-none mr-5 bg-vp-white text-vp-green1">
                {{ banner[0].buttons[0].name }}
              </Button>
              <a
                class="w-25 block border cursor-pointer text-3.5 border-blue-main rounded text-center font-medium text-blue-main select-none"
                href="/consult"
                style="padding: 8px 8px;">
                {{ banner[0].buttons[1].name }}
            </a>
            </div>
          </div>
          <div class="banner-img" :style="`background-image: url(${banner[0].imageContent.image});`">
            <!-- <img :src="banner[0].imageContent.image" class="w-full " alt=""> -->
          </div>
        </div>
      </div>
  
      <!-- 私有部署 -->
      <div class="mx-auto text-center py-15">
        
        <div class="text-2xl font-semibold section-title px-2">
          <Icon icon="icon-wenjianshuju" />
          {{ privateDeployment.name }}
        </div>
        <div class="text-4 mt-3 mb-10 ">
          {{ privateDeployment.description }}
        </div>
        <div class="editions-grid">
          <div
            v-for="(item, index) in privateDeployment.edition"
            :key="index"
            class="w-93.5 py-5 border !border-t-8 rounded-5 overflow-hidden box-border px-5 mx-auto"
            :class="versionsListColor[index].border"
          >
            <div class="flex items-center space-x-5">
              <div
                class="w-20 h-20 rounded-full inline-flex items-center justify-center"
                :style="{ background: versionsListColor[index].backgroundColor }"
              >
                <Icon :icon="item.iconContent.icon" class="text-4xl" />
              </div>
              <p class="text-4 font-semibold text-black-version">
                {{ item.name }}
              </p>
            </div>
            
            <div class="text-3.5 mt-4 text-left">
              {{ item.detail }}
            </div>
          </div>
        </div>
      </div>
  
      <!--部署方式-->
      <div class="w-full py-15 bg-blue-link-bg relative">
        <p class="text-2xl font-semibold section-title px-2">
          <Icon icon="icon-fuwuqi" />
          {{ deploymentMethod.name }}
        </p>
        <div class="flex mx-auto mt-20 deploy-methods items-center">
          <img
            :src="deploymentMethod?.imageContent?.image"
            alt=""
            style="width: 400px; margin-top: -60px;"
          >
          <div class="flex-1 flex items-center justify-center">
            <div class="deploy-support-edition">
              <div
                v-for="(item, index) in deploymentMethod.methods"
                :key="index"
                class="flex items-center leading-5 mb-6"
              >
                <div class="text-4 mr-2.5 method-item-icon">
                  <Icon
                    :icon="deploymentMethod?.iconContent.icon"
                    :class="{'text-vp-green2': item?.support, 'text-vp-gray1': !item?.support}"
                  />
                </div>
                <div class="text-4 leading-5 table-cell text-black-header-color font-medium">
                  {{ item?.name }}
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div id="downLoadAnchor" class="opacity-0 absolute" style="bottom: 140px;" />
      </div>
  
      <!--下载与安装-->
      <div ref="download" class="mx-auto py-15">
        <p class="text-2xl font-semibold section-title px-2">
          <Icon icon="icon-fuwuqi" />
          {{ downloadAndInstall.name }}
        </p>
        <!-- <div class="text-2xl font-semibold text-black-color text-center">
          {{ downloadAndInstall.name }}
        </div> -->
        <div class="text-4  text-black-header-color mt-3 mb-10 text-center">
          {{ downloadAndInstall.introduction }}
        </div>
        <div class="editions-grid">
          <div
            v-for="(item, index) in downloadAndInstall.installEditions"
            :key="index"
            class="w-93.5 p-10 bg-vp-gray_soft rounded-xl mx-auto"
          >
            <p class="text-5 font-semibold text-vp-green1 text-left mb-3">
              {{ item.name }}
            </p>
            <div class="text-3.5 text-gray-hot-code font-medium mt-6 flex items-center mb-5">
              <Icon icon="icon-duihaolv" class="text-green-success mr-1.25" />
              <span>{{ item.detail }}</span>
            </div>
            <Select
              :bordered="false"
              :default-value="item.appAndVersion[0].goodsId"
              :options="item.appAndVersion.map(i => ({ value: i.goodsId, label: i.goodsName + ' ' + i.goodsVersion }))"
              class="w-73.5"
              @change="(value)=>selectChange(value,item)" />
            <div class="text-3.5 text-gray-hot-code  mt-6">
              查看<a class="cursor-pointer" :href="`help/doc/205509853639082016?c=209786779925032562`">
                《 部署文档 》
              </a>
            </div>
            <div class="flex mt-10 items-end">
              <template v-if="!!item.onlineInstallerDownloadUrl">
                <Button type="primary" class="mr-2 bg-vp-green1" style="padding: 0;">
                  <a class="block h-full w-full leading-7.5" style="padding: 0 15px;" :download="dowloadName" :href="item.onlineInstallerDownloadUrl">
                    <span class="mr-2">{{ button[item.code].name }}</span>
                    <Icon icon="icon-hengjiantou" />
                  </a>
                </Button>
              </template>
              <template v-else>
                <Button type="primary" class="px-4 py-2 mr-3 bg-vp-green1" @click="payButton(item.code)">
                  <div class=" text-3 leading-3.5 flex items-center  ">
                    <span class="mr-2">{{ button[item.code].name }}</span>
                    <Icon icon="icon-hengjiantou" />
                  </div>
                </Button>
              </template>
  
              <div
                v-show="button[item.code].urlType === 'downLoad'"
                class="flex items-center text-3 font-medium cursor-pointer text-blue-main detail-btn-hover"
                @click="getGoodsLcs(item.code)"
              >
                <Icon icon="icon-huoquxuke" class="mr-1.25 -mt-0.5" />
                获取许可
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <LoginConfirmModal v-model:visible="toLoginVisible" />
    <AuthConfirmModal v-model:visible="toAuthVisible" />

  </div>
</template>
<style scoped>
.banner-wrap {
  @apply relative h-100 bg-vp-green1 rounded-xl text-vp-white;
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
}

.banner-info {
  @apply max-w-150 p-6;
}

.editions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.section-title {
  @apply text-vp-green1 border-b border-b-2 border-vp-green3 text-left text-6 font-medium pb-2;
}

.deploy-support-edition {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
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
  .deploy-methods {
    @apply flex-col;
  }
}

@media (max-width: 768px) {
    .deploy-support-edition {
        grid-template-columns: 1fr;
    }
}
</style>