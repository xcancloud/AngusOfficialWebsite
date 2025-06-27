<script lang="ts" setup>
  import { onMounted, ref, onBeforeUnmount, inject, defineAsyncComponent } from 'vue';
  import { isSignin } from '@/utils/site/index';
  import http from '@/utils/http';
  import { getDeviceInfo, getSearchTerms, angusTools } from '@/utils';

  const { PUB_ESS } = angusTools;

  const confirmVisible = inject('confirm', ref());

  const clientWidth = ref(window.innerWidth);
  const signinFlag = ref(false);
  const pageContent = ref({});
  const pluginsTabActive = ref(0);

  const selectPlugins = (index) => {
    pluginsTabActive.value = index;
  }

  const getClientWidth = () => {
    clientWidth.value = window.innerWidth;
  }

  const loadHomeData = async () => {
    const [error, res] = await http.get(`${PUB_ESS}/content/setting/portal`);
    if (res?.code === 'S') {
      try {
        const p = JSON.parse(res.data);
        pageContent.value = p;
      } catch {}
    }
  }
  onMounted(async () => {
    window.addEventListener('resize', getClientWidth);
    signinFlag.value = await isSignin();
    // if (!signinFlag.value) {
    //   confirmVisible.value = true;
    // }
    const deviceInfos = getDeviceInfo();
    const searchTerms = getSearchTerms(['source', 'plan', 'unit', 'keyword']);
    if (!deviceInfos?.deviceId) {
      const fpPromise = import('@fingerprintjs/fingerprintjs')
        .then(FingerprintJS => FingerprintJS.load());
      fpPromise
        .then(fp => fp.get())
        .then((result) => {
          const visitorId = result.visitorId;
          sessionStorage.setItem('visitorId', visitorId);
          const params = {
            ...deviceInfos,
            ...searchTerms,
            type: 'home',
            // userId: this.userInfo?.id || undefined,
            // client: this.clientSource
          };
          http.post(`${PUB_ESS}/content/access`, params);
        });
    } else {
      const params = {
        ...deviceInfos,
        ...searchTerms,
        type: 'home',
        // userId: this.userInfo?.id || undefined,
        // client: this.clientSource
      };
      http.post(`${PUB_ESS}/content/access`, params);
    }

    loadHomeData();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', getClientWidth);
  });
</script>
<template>
  <div class="home-page">

    <!--核心优势-->
    <!-- <div class="mt-10 adjust-content-padding py-10">
      <div class="text-center font-semibold text-black-color text-8">
        {{ pageContent.productAdvantage?.name }}
      </div>
      <div class="editions-grid text-3.5 mt-10">
        <div v-for="(item, idx) in pageContent.productAdvantage?.advantages" class="text-center">
          <img :src="item.iconUrl" class="inline-block w-20">
          <div class="font-semibold text-5 mt-5">
            {{ item.title }}
          </div>
          <div v-for="desc in item.description">
            {{ desc }}
          </div>
        </div>
      </div>
    </div> -->
    <div class="mt-10 adjust-content-padding py-10 version-editions-grid">
      <!--敏捷驱动-->
      <div class="w-60 p-6 border-t-4 shadow-vp1 border-vp-indigo1 rounded text-center space-y-2">
        <div class="inline-block w-20 h-20 rounded-full bg-vp-gray_soft relative">
          <Icon icon="icon-feiji" class="animate-size text-10 absolute top-1/2 left-1/2" />
        </div>
        <div class="font-semibold text-6">敏捷驱动</div>
        <div class="inline-block w-1/3 h-1 rounded bg-vp-indigo1"></div>
        <div class="text-left flex items-center leading-8 py-2 space-x-1 border-b border-dashed">
          <div class="inline-block">
            <Icon icon="icon-duihao" class="text-5 text-vp-indigo1" />
          </div>
          <div class="text-4 font-semibold">快速响应客户需求</div>
        </div>
        <div class="text-left flex items-center leading-8 py-2 space-x-1">
          <div class="inline-block">
            <Icon icon="icon-duihao" class="text-5 text-vp-indigo1" />
          </div>
          <div class="text-4 font-semibold">帮助团队管理项目全生命周期</div>
        </div>
      </div>

      <!--智能化-->
      <div class="w-60 p-6 border-t-4 shadow-vp1 border-vp-green1 rounded text-center space-y-2">
        <div class="inline-block w-20 h-20 rounded-full bg-vp-gray_soft relative">
          <Icon icon="icon-a-zidonghuazhinenghua" class=" animate-updown text-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-2/4" />
        </div>
        <div class="font-semibold text-6">智能化</div>
        <div class="inline-block w-1/3 h-1 rounded bg-vp-green1"></div>
        <div class="text-left flex items-center leading-8 py-2 space-x-1 border-b border-dashed">
          <div class="inline-block">
            <Icon icon="icon-duihao" class="text-5 text-vp-green1" />
          </div>
          <div class="text-4 font-semibold">加速研发和测试活动</div>
        </div>
        <div class="text-left flex items-center leading-8 py-2 space-x-1">
          <div class="inline-block">
            <Icon icon="icon-duihao" class="text-5 text-vp-green1" />
          </div>
          <div class="text-4 font-semibold">测试用例和脚本效率提升150%</div>
        </div>
      </div>


      <!--高性能-->
      <div class="w-60 p-6 border-t-4 shadow-vp1 border-vp-red3 rounded text-center space-y-2">
        <div class="inline-block w-20 h-20 rounded-full bg-vp-gray_soft relative">
          <Icon icon="icon-gaoxingneng" class="animate-rotate text-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-2/4" />
        </div>
        <div class="font-semibold text-6">高性能</div>
        <div class="inline-block w-1/3 h-1 rounded bg-vp-red3"></div>
        <div class="text-left flex items-center leading-8 py-2 space-x-1 border-b border-dashed">
          <div class="inline-block">
            <Icon icon="icon-duihao" class="text-5 text-vp-red3" />
          </div>
          <div class="text-4 font-semibold">自主研发高性能测试引擎</div>
        </div>
        <div class="text-left flex items-center leading-8 py-2 space-x-1">
          <div class="inline-block">
            <Icon icon="icon-duihao" class="text-5 text-vp-red3" />
          </div>
          <div class="text-4 font-semibold">可满足百万并发和千万QPS场景</div>
        </div>
      </div>

      <!--开放源码-->
      <div class="w-60 p-6 border-t-4 shadow-vp1 border-vp-purple1 rounded text-center space-y-2">
        <div class="inline-block w-20 h-20 rounded-full bg-vp-gray_soft relative">
          <Icon icon="icon-fuwugongxiang" class="animate-rotate text-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-2/4" />
        </div>
        <div class="font-semibold text-6">开放源码</div>
        <div class="inline-block w-1/3 h-1 rounded bg-vp-purple1"></div>
        <div class="text-left flex items-center leading-8 py-2 space-x-1 border-b border-dashed">
          <div class="inline-block">
            <Icon icon="icon-duihao" class="text-5 text-vp-purple1" />
          </div>
          <div class="text-4 font-semibold">提高用户可见性和信任度</div>
        </div>
        <div class="text-left flex items-center leading-8 py-2 space-x-1">
          <div class="inline-block">
            <Icon icon="icon-duihao" class="text-5 text-vp-purple1" />
          </div>
          <div class="text-4 font-semibold">技术加速进化​，构建群体智慧引擎</div>
        </div>
      </div>

    </div>

    <!--全流程支持-->
    <div class="mt-10 adjust-content-padding py-10 text-center ">
      <div class="font-semibold text-black-color text-8">
        {{ pageContent.productFlow?.name }}
      </div>
      <div class=" mt-5">
        {{ pageContent.productFlow?.description }}
      </div>
      <img src="/assets/image/home/tester-flow.png" class="mt-10">
    </div>

    <!--产品功能-->
    <div class="mt-10 adjust-content-padding py-10 text-center ">
      <div class="font-semibold text-black-color text-8">
        {{ pageContent.productFunction?.name }}
      </div>
      <div class=" mt-5">
        {{ pageContent.productFunction?.description }}
      </div>
      <img src="/assets/image/home/tester-function.png" class="mt-10">
    </div>

    <!--产品特性-->
    <div class="adjust-content-padding py-10 mt-10" style="padding-bottom: 0;">
      <p class="text-8 font-semibold text-center text-black-color">
        {{ pageContent.productFeature?.name }}
      </p>
      <div class="mt-15 editions-grid">
        <div
          v-for="(item, index) in pageContent.productFeature?.features"
          :key="index"
          class="product-features-item"
        >
        <div class=" max-w-75 mx-auto">
          
          <div class="flex items-center">
            <div
              class="w-12 h-12 flex justify-center items-center rounded-full"
              :style="{
                background: `rgba(${item.iconContent.color[0]},0.3)`,
                lineClamp: 3,
              }"
              style="min-width: 36px; margin-right: 24px;"
            >
              <Icon class="text-7" :icon="item.iconContent.icon" />
            </div>
            <div class="font-semibold text-5 text-black-color">
              {{ item.feature }}
            </div>
          </div>
          <div
            class="mt-4 text-black-header-color leading-6.5 font-normal "
            style="font-size: 14px;"
          >
            {{ item.detail }}
          </div>
        </div>
        </div>
      </div>
    </div>
    
    <!--插件化实现-->
    <div class="adjust-content-padding bg-blue-link-bg py-10 mt-10">
      <div class="plugin-editions-grid">
        <div>
          <p class="text-8 font-semibold text-center">
            {{ pageContent.plugins?.name }}
          </p>
          <div
            v-if="pageContent.plugins"
            class="mt-10 flex justify-around box-border px-5"
          >
            <div
              v-for="(item, index) in [
                pageContent.plugins.protocol,
                {},
                pageContent.plugins.mockdata,
                {},
                pageContent.plugins.function,
                {},
                pageContent.plugins.middleware,
              ]"
              :key="index"
              class="text-center cursor-pointer"
              @click="selectPlugins(index)"
            >
              <template v-if="![1,3,5].includes(index)">
                <div
                  :class="[
                    'w-20 h-20 mx-auto flex justify-center items-center rounded-full',
                    pluginsTabActive === index
                      ? 'bg-vp-indigo_soft'
                      : 'bg-bg-soft',
                  ]"
                >
                  <Icon class="text-10" :icon="item.iconContent.icon" />
                </div>
                <p
                  :class="[
                    'text-5 pt-4 pb-2 m-0',
                    pluginsTabActive === index
                      ? 'font-semibold'
                      : 'text-text-1 font-normal',
                  ]"
                >
                  {{ item.name }}
                </p>
                <Icon
                  icon="icon-hengjiantou"
                  :class="['text-base', pluginsTabActive !== index && 'opacity-0']"
                />
              </template>
              <div
                v-else
                class="w-px h-15 opacity-30 bg-vp-black transform rotate-12 -translate-y-2 mt-2"
                style="pointer-events: none;"
              />
            </div>
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <div
            v-show="pluginsTabActive === 0"
            class="w-110 flex items-center flex-wrap mx-auto"
          >
            <div
              v-for="(item, index) in pageContent.plugins?.protocol?.kind"
              :key="index"
              :class="
                item.releaseFlag === true || item.releaseFlag === 'true'
                  ? 'tex-blue-1border-blue-main'
                  : 'text-gray-hot-code border-gray-hot-code'
              "
              class="font-semibold border bg-white-1 text-center text-3.5 flex items-center rounded mr-4 mb-4"
              style="padding: 3px 12px;"
            >
              {{ item.name }}
            </div>
          </div>
          <div
            v-show="pluginsTabActive === 2"
            class="w-110 flex items-center flex-wrap mx-auto"
          >
            <div
              v-for="(item, index) in pageContent?.plugins?.mockdata?.kind"
              :key="index"
              :class="
                item.releaseFlag === true || item.releaseFlag === 'true'
                  ? 'tex-blue-1border-blue-main'
                  : 'text-gray-hot-code border-gray-hot-code'
              "
              class="font-semibold border bg-white-1 text-center text-3.5 flex items-center rounded mr-4 mb-4"
              style="padding: 3px 12px;"
            >
              {{ item.name }}
            </div>
          </div>
          <div
            v-show="pluginsTabActive === 4"
            class="w-110 flex items-center flex-wrap mx-auto"
          >
            <div
              v-for="(item, index) in pageContent.plugins?.function?.kind"
              :key="index"
              :class="
                item.releaseFlag === true || item.releaseFlag === 'true'
                  ? 'tex-blue-1border-blue-main'
                  : 'text-gray-hot-code border-gray-hot-code'
              "
              class="font-semibold border bg-white-1 text-center text-3.5 flex items-center rounded mr-4 mb-4"
              style="padding: 3px 12px;"
            >
              {{ item.name }}
            </div>
          </div>
          <div v-show="pluginsTabActive === 6" class="box-border flex justify-center">
            <div class="mt-2">
              <div
                v-for="(item, index) in Object.values(pageContent.plugins?.middleware?.kind || {})"
                :key="index"
                class="flex">
                <div  class="min-w-20 whitespace-no-wrap font-medium text-3.5 mt-2">{{ item.name }}：</div>
                <div class="inline-flex flex-1 flex-wrap">
                  <div
                    v-for="(btn, ind) in item.kind"
                    :key="ind"
                    :class="btn.releaseFlag === true || btn.releaseFlag === 'true' ? 'text-vp-indigo1 !border-vp-indigo1':'text-vp-gray1 !border-vp-gray1'"
                    class="font-semibold border text-center flex items-center rounded text-3.5 mr-4 mb-4 mt-1"
                    style="padding: 3px 12px;" >
                    {{ btn.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--产品版本-->
    <div class="adjust-content-padding py-10 mt-10">
      <p class="text-8 font-semibold text-center">
        {{ pageContent.productEdition?.name }}
      </p>

      <div class="mt-15 flex version-editions-grid">
        <div
          v-for="(item, index) in pageContent.productEdition?.edition"
          :key="index"
          ref="card"
          class="mx-auto w-68 relative transform transition-all duration-300 ease-linear hover:-translate-y-5">
          <img style="height: 520px;" :src="item.backgroundImage.image" alt="">
          <div class="absolute top-0 left-0 w-full px-8 text-white-1">
            <div class="pb-5 border-b border-white-300 text-2xl font-semibold mt-10">
              {{ item.versionType }}
            </div>
            <div
              ref="cardDetail"
              style="height: 320px;"
            >
              <ul class="list-disc ml-4 mt-4">
                <li
                  v-for="(dtl,ind) in item.detail"
                  :key="ind"
                  class="text-white-1 mb-2"
                >
                  <div
                    class="text-white-1"
                    style="font-size: 14px; line-height: 18px;"
                  >
                    {{ dtl }}
                  </div>
                </li>
              </ul>
            </div>
            <RouterLink
              v-if="item.detailUrl.includes('cloud_service')"
              to="/pricing?v=c"
            >
              <div class="w-28 h-9 flex items-center justify-center border border-white-600 rounded text-3.5 cursor-pointer absolute bottom-0 text-white-1">
                <span class="font-medium leading-3.5">{{
                  item.buttonName
                }}</span>
                <Icon type="icon-hengjiantou" class="text-3.5 ml-2.5" />
              </div>
            </RouterLink>
            <RouterLink v-else to="/pricing">
              <div class="w-28 h-9 flex items-center justify-center border border-white-600 rounded text-3.5 cursor-pointer absolute bottom-0 text-white-1">
                <span class="font-medium leading-3.5">{{
                  item.buttonName
                }}</span>
                <Icon type="icon-hengjiantou" class="text-3.5 ml-2.5" />
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<style scoped>
.adaptive-padding {
  padding-right: 0;
  padding-left: 5rem;
}

@media (min-width: 1440px) {
  .adaptive-padding {
    padding-right: 5rem;
    padding-left: 7.5rem;
  }
}

@media (min-width: 1600px) {
  .adaptive-padding {
    padding-right: 6rem;
    padding-left: 10rem;
  }
}

@media (min-width: 1768px) {
  .adaptive-padding {
    padding-right: 8rem;
    padding-left: 18rem;
  }
}

@media (min-width: 1920px) {
  .adaptive-padding {
    padding-right: 10rem;
    padding-left: 22.5rem;
  }
}

.adaptive-padding .title {
  width: 120%;
}

.home-main-button {
  margin-top: 80px;
}

@media (min-width: 1440px) {
  .home-main-button {
    margin-top: 128px;
  }
}

.home-header-img {
  width: 36rem;
  margin-left: -20px;
}

.home-header-img-action {
  width: 8rem;
  height: 8rem;
}

@media (min-width: 1600px) {
  .home-header-img {
    width: 39rem;
  }

  .home-header-img-action {
    width: 9rem;
    height: 9rem;
  }
}

@media (min-width: 1768px) {
  .home-header-img {
    width: 42rem;
  }

  .home-header-img-action {
    width: 11rem;
    height: 11rem;
  }
}

@media (min-width: 1920px) {
  .home-header-img {
    width: 810px;
  }

  .home-header-img-action {
    width: 13rem;
    height: 13rem;
  }
}

.ball-yellow-1 {
  top: 6rem;
  left: 4rem;
}

@media (min-width: 1600px) {
  .ball-yellow-1 {
    top: 8rem;
    left: 4rem;
  }
}

@media (min-width: 1768px) {
  .ball-yellow-1 {
    top: 12.9375rem;
    left: 11.875rem;
  }
}

@media (min-width: 1920px) {
  .ball-yellow-1 {
    top: 51.75;
    left: 47.5;
  }
}

.ball-green-1 {
  top: 10rem;
  right: 0.25rem;
}

@media (min-width: 1600px) {
  .ball-green-1 {
    top: 12rem;
    right: 1rem;
  }
}

@media (min-width: 1768px) {
  .ball-green-1 {
    top: 12rem;
    right: 1.5rem;
  }
}

@media (min-width: 1920px) {
  .ball-green-1 {
    top: 15rem;
    right: 2rem;
  }
}

.buy-btn-hover {
  border-color: #f7f8fa;
  background-color: #f7f8fa;
  color: #07f;
  font-weight: 600;
}

.buy-btn-hover:hover {
  background-color: white;
  color: #0f9fff;
}

.detail-btn-hover {
  border: 2px solid #f7f8fa;
  color: white;
  font-weight: 600;
  line-height: 48px;
}

.detail-btn-hover:hover {
  background-color: white;
  color: #0f9fff;
}

.detail-btn-hover-quick {
  border: 2px solid rgb(255, 129, 0);
  background-color: rgb(255, 129, 0);
  color: #fff;
  font-weight: 600;
  line-height: 48px;
}

.editions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.plugin-editions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(410px, 1fr));
  gap: 2rem;
}

.version-editions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.adjust-content-padding {
  /* padding-right: 5rem; */
  /* padding-left: 5rem; */
}

@media (min-width: 1440px) {
  .adjust-content-padding {
    /* padding-right: 7.5rem;
    padding-left: 7.5rem; */
  }
}

@media (min-width: 1600px) {
  .adjust-content-padding {
    /* padding-right: 10rem;
    padding-left: 10rem; */
  }
}

@media (min-width: 1768px) {
  .adjust-content-padding {
    /* padding-right: 18rem;
    padding-left: 18rem; */
  }
}

@media (min-width: 1920px) {
  .adjust-content-padding {
    /* padding-right: 22.5rem;
    padding-left: 22.5rem; */
  }
}

.label-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  line-height: 28px;
}

.label-item .divider {
  width: 2px;
  height: 20px;
  margin-right: 24px;
  margin-left: 24px;
  background: #f0f0f0;
}

.product-features-item {
  /* width: calc((100% - 260px) / 3); */
  /* margin-bottom: 60px;
  flex: 0 1 33.33%; */
  
}

.home-page .quick-links .quick-links-content > div {
  align-items: center;
  justify-content: center;
  min-width: calc((100% - 100px) / 5);
  color: #07f;
  font-size: 14px;
  text-align: center;
}

.home-page .quick-links .quick-links-content > div:hover {
  color: rgba(40, 177, 255, 100%);
}

.home-page .quick-links .quick-links-content .icon {
  margin-left: 8px;
}

@keyframes size {
  0% {
    transform: scale(1) translate(-50%, -50%);
  }
  50% {
    transform: scale(1.1) translate(-45%, -45%);
  }
  100% {
    transform: scale(1) translate(-50%, -50%);
  } 
}

@keyframes updown {
  0% {
    transform:  translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -35%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}

@keyframes rotate {
  0% {
    transform:  rotate(0deg) translate(-50%, -50%);
  }
  100% {
    transform: rotate(360deg) translate(-50%, -50%);
  }
}

.animate-size {
  animation: size 2s infinite;
}

.animate-updown {
  animation: updown 2s infinite;
}

.animate-rotate {
  animation: rotate 4s linear infinite;
  transform-origin: left top;
}


</style>