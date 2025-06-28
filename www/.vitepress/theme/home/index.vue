<script lang="ts" setup>
import {ref, computed, watch} from 'vue';

// Configuration data i18n support
import {t} from '../../utils/i18nData'
import {useSafeI18n} from '../../utils/i18nData'

const {safeGet} = useSafeI18n();

// Load features data
const features = computed(() => {
  return safeGet('feature.items', '')
});

// Load plugins data
const plugins = computed(() => {
  return safeGet('plugin', '')
});

const pluginsTabActive = ref(0);
const selectPlugins = (index) => {
  pluginsTabActive.value = index;
}

</script>
<template>
  <div class="home-page mt-10">
    <div class="adjust-content-padding text-center ">
      <div class="text-center font-semibold text-black-color text-8">
        {{ t('advantage.name') }}
      </div>
      <div class="text-center font-mono font-medium mt-2 text-slate-500 text-5">
        {{ t('advantage.description') }}
      </div>
      <div class="mt-2 adjust-content-padding py-10 version-editions-grid ">
        <div
            class="w-60 p-6 border-t-4 hover:bg-vp-gray_soft transition-all shadow-vp1 border-vp-indigo1 rounded text-center ">
          <div class="inline-block w-10 h-10 rounded-full bg-vp-gray_soft relative">
            <Icon icon="icon-feiji"
                  class="animate-rotate text-5 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-2/4"/>
          </div>
          <div class="font-semibold text-6">{{ t('advantage.items[0].title') }}</div>
          <div class="inline-block w-1/3 h-1 rounded bg-vp-indigo1"></div>
          <div class="text-left flex items-center leading-8 py-2 space-x-1 border-b border-dashed">
            <div class="inline-block mr-2">
              <Icon icon="icon-duihao" class="text-5 text-vp-indigo1"/>
            </div>
            <div class="text-4">{{ t('advantage.items[0].items[0]') }}</div>
          </div>
          <div class="text-left flex items-center leading-8 py-2 space-x-1">
            <div class="inline-block mr-2">
              <Icon icon="icon-duihao" class="text-5 text-vp-indigo1"/>
            </div>
            <div class="text-4">{{ t('advantage.items[0].items[1]') }}</div>
          </div>
        </div>

        <div
            class="w-60 p-6 border-t-4 hover:bg-vp-gray_soft transition-all shadow-vp1 border-vp-green1 rounded text-center ">
          <div class="inline-block w-10 h-10 rounded-full bg-vp-gray_soft relative">
            <Icon icon="icon-a-zidonghuazhinenghua"
                  class="animate-updown text-5 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-2/4"/>
          </div>
          <div class="font-semibold text-6">{{ t('advantage.items[1].title') }}</div>
          <div class="inline-block w-1/3 h-1 rounded bg-vp-green1"></div>
          <div class="text-left flex items-center leading-8 py-2 space-x-1 border-b border-dashed">
            <div class="inline-block mr-2">
              <Icon icon="icon-duihao" class="text-5 text-vp-green1"/>
            </div>
            <div class="text-4">{{ t('advantage.items[1].items[0]') }}</div>
          </div>
          <div class="text-left flex items-center leading-8 py-2 space-x-1">
            <div class="inline-block mr-2">
              <Icon icon="icon-duihao" class="text-5 text-vp-green1"/>
            </div>
            <div class="text-4">{{ t('advantage.items[1].items[1]') }}</div>
          </div>
        </div>

        <div
            class="w-60 p-6 border-t-4 hover:bg-vp-gray_soft transition-all shadow-vp1 border-vp-red3 rounded text-center">
          <div class="inline-block w-10 h-10 rounded-full bg-vp-gray_soft relative">
            <Icon icon="icon-gaoxingneng"
                  class="animate-rotate text-5 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-2/4"/>
          </div>
          <div class="font-semibold text-6">{{ t('advantage.items[2].title') }}</div>
          <div class="inline-block w-1/3 h-1 rounded bg-vp-red3"></div>
          <div class="text-left flex items-center leading-8 py-2 space-x-1 border-b border-dashed">
            <div class="inline-block mr-2">
              <Icon icon="icon-duihao" class="text-5 text-vp-red3"/>
            </div>
            <div class="text-4">{{ t('advantage.items[2].items[0]') }}</div>
          </div>
          <div class="text-left flex items-center leading-8 py-2 space-x-1">
            <div class="inline-block mr-2">
              <Icon icon="icon-duihao" class="text-5 text-vp-red3"/>
            </div>
            <div class="text-4">{{ t('advantage.items[2].items[1]') }}</div>
          </div>
        </div>

        <div
            class="w-60 p-6 border-t-4 hover:bg-vp-gray_soft transition-all shadow-vp1 border-vp-purple1 rounded text-center">
          <div class="inline-block w-10 h-10 rounded-full bg-vp-gray_soft relative">
            <Icon icon="icon-fuwugongxiang"
                  class="animate-updown text-5 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-2/4"/>
          </div>
          <div class="font-semibold text-6">{{ t('advantage.items[3].title') }}</div>
          <div class="inline-block w-1/3 h-1 rounded bg-vp-purple1"></div>
          <div class="text-left flex items-center leading-8 py-2 space-x-1 border-b border-dashed">
            <div class="inline-block mr-2">
              <Icon icon="icon-duihao" class="text-5 text-vp-purple1"/>
            </div>
            <div class="text-4">{{ t('advantage.items[3].items[0]') }}</div>
          </div>
          <div class="text-left flex items-center leading-8 py-2 space-x-1">
            <div class="inline-block mr-2">
              <Icon icon="icon-duihao" class="text-5 text-vp-purple1"/>
            </div>
            <div class="text-4">{{ t('advantage.items[3].items[1]') }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 adjust-content-padding py-10 text-center ">
      <div class="font-semibold text-black-color text-8">
        {{ t('workflow.name') }}
      </div>
      <div class="text-center font-mono font-medium mt-2 text-slate-500 text-5">
        {{ t('workflow.description') }}
      </div>
      <img src="/assets/image/home/tester-flow.png" class="mt-10">
    </div>

    <div class="mt-6 adjust-content-padding py-10 text-center ">
      <div class="font-semibold text-black-color text-8">
        {{ t('function.name') }}
      </div>
      <div class="text-center font-mono font-medium mt-2 text-slate-500 text-5">
        {{ t('function.description') }}
      </div>
      <img src="/assets/image/home/tester-function.png" class="mt-10">
    </div>

    <div class="adjust-content-padding bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800
              dark:to-gray-900 py-8 md:py-12 md:mt-12 rounded-xl shadow-lg " style="margin-top: 40px;">
      <div class="plugin-editions-grid">
        <div class="mb-8">
          <p class="text-2xl md:text-5xl font-bold text-center text-indigo-800 dark:text-indigo-300 mb-6">
            {{ t('plugin.name') }}
          </p>

          <div v-if="plugins" class="flex justify-center flex-wrap gap-4 md:gap-6 px-4 mt-16">
            <div v-for="(item, index) in [
              plugins.protocol, {}, plugins.mockdata, {}, plugins.function, {}, plugins.middleware,
              ]"
                 :key="index"
                 class="text-center cursor-pointer transition-all duration-300 hover:scale-105"
                 @click="selectPlugins(index)">
              <template v-if="![1,3,5].includes(index)">
                <div :class="[
                      'w-14 h-14 md:w-16 md:h-16 mx-auto flex justify-center items-center rounded-full transition-all',
                       pluginsTabActive === index
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg'
                          : 'bg-white dark:bg-gray-700 shadow-md' ]">
                  <Icon
                      class="text-xl md:text-2xl"
                      :icon="item.iconContent.icon"
                      :class="pluginsTabActive === index ? 'text-white' : 'text-indigo-600 dark:text-indigo-300'"
                  />
                </div>
                <p :class="[
                   'text-base md:text-2xl pt-3 md:pt-4 pb-1 md:pb-2 m-0 transition-colors',
                    pluginsTabActive === index
                      ? 'font-bold text-indigo-700 dark:text-indigo-200'
                      : 'text-gray-600 dark:text-gray-400 font-medium'  ]">
                  {{ item.name }}
                </p>
                <Icon
                    icon="icon-hengjiantou"
                    :class="[
                      'text-lg md:text-xl text-indigo-500 dark:text-indigo-400 transition-opacity',
                      pluginsTabActive !== index ? 'opacity-0' : 'opacity-100 animate-pulse'  ]"
                />
              </template>
              <div
                  v-else
                  class="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent transform rotate-12 -translate-y-2 mt-2"
                  style="pointer-events: none;"
              />
            </div>
          </div>
        </div>

        <div class="flex-1 min-w-0 flex items-center mr-8">
          <div v-show="pluginsTabActive === 0"
               class="w-full max-w-4xl flex items-center flex-wrap justify-center gap-3 md:gap-4 mx-auto">
            <div
                v-for="(item, index) in plugins?.protocol?.kind"
                :key="index"
                :class="[
            'font-semibold text-center text-1xl md:text-[18px] flex items-center rounded-lg px-3 py-1.5 md:px-4 md:py-2 shadow-sm transition-all hover:shadow-md',
            item.release === true || item.release === 'true'
              ? 'bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-800 dark:to-teal-800 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-200 hover:from-green-200 hover:to-teal-200 dark:hover:from-green-700 dark:hover:to-teal-700'
              : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
          ]"
            >
              {{ item.name }}
            </div>
          </div>

          <div v-show="pluginsTabActive === 2"
               class="w-full max-w-4xl flex items-center flex-wrap justify-center gap-3 md:gap-4 mx-auto">
            <div
                v-for="(item, index) in plugins?.mockdata?.kind"
                :key="index"
                :class="[
            'font-semibold text-center text-1xl md:text-[18px] flex items-center rounded-lg px-3 py-1.5 md:px-4 md:py-2 shadow-sm transition-all hover:shadow-md',
            item.release === true || item.release === 'true'
              ? 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-800 dark:to-indigo-800 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-200 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-700 dark:hover:to-indigo-700'
              : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
          ]"
            >
              {{ item.name }}
            </div>
          </div>

          <div v-show="pluginsTabActive === 4"
               class="w-full max-w-4xl flex items-center flex-wrap justify-center gap-3 md:gap-4 mx-auto">
            <div
                v-for="(item, index) in plugins?.function?.kind"
                :key="index"
                :class="[
            'font-semibold text-center text-1xl md:text-[18px] flex items-center rounded-lg px-3 py-1.5 md:px-4 md:py-2 shadow-sm transition-all hover:shadow-md',
            item.release === true || item.release === 'true'
              ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-800 dark:to-orange-800 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-200 hover:from-amber-200 hover:to-orange-200 dark:hover:from-amber-700 dark:hover:to-orange-700'
              : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
          ]"
            >
              {{ item.name }}
            </div>
          </div>

          <div v-show="pluginsTabActive === 6" class="w-full max-w-4xl box-border">
            <div class="space-y-4 md:space-y-6">
              <div
                  v-for="(item, index) in Object.values(plugins?.middleware?.kind || {})"
                  :key="index"
                  class="flex flex-col md:flex-row gap-3 p-3 md:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                    class="min-w-24 md:min-w-32 font-bold text-gray-700 dark:text-gray-300 text-sm md:text-base flex items-center">
                  {{ item.name }}：
                </div>
                <div class="flex-1 flex flex-wrap gap-2 md:gap-3">
                  <div
                      v-for="(btn, ind) in item.kind"
                      :key="ind"
                      :class="[
                  'font-semibold text-center text-1xl md:text-1xl flex items-center rounded-lg px-3 py-1 md:px-3 md:py-1.5 shadow-sm transition-all hover:shadow-md',
                  btn.release === true || btn.release === 'true'
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-200 hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-700 dark:hover:to-pink-700'
                    : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                ]"
                  >
                    {{ btn.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 adjust-content-padding py-10" style="padding-bottom: 0;">
      <p class="text-8 font-semibold text-center text-black-color">
        {{ t('feature.name') }}
      </p>
      <div class="text-center font-mono font-medium mt-2 text-slate-500 text-5">
        {{ t('feature.description') }}
      </div>
      <div class="mt-15 editions-grid">
        <div
            v-for="(item, index) in features"
            :key="index"
            class="product-features-item"
        >
          <div class=" max-w-75 mx-auto">
            <div class="flex items-center">
              <div class="w-12 h-12 flex justify-center items-center rounded-full"
                   :style="{  background: `rgba(${item.iconContent.color[0]},0.3)`, lineClamp: 3,  }"
                   style="min-width: 36px; margin-right: 18px;">
                <Icon class="text-7" :icon="item.iconContent.icon"/>
              </div>
              <div class="font-semibold text-5 text-black-color">
                {{ item.feature }}
              </div>
            </div>
            <div class="mt-4 text-black-header-color leading-6.5 font-mono " style="font-size: 14px;">
              {{ item.detail }}
            </div>
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
  place-items: center;
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
    transform: translate(-50%, -50%);
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
    transform: rotate(0deg) translate(-50%, -50%);
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