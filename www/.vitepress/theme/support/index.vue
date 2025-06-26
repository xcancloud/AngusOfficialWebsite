<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { PUB_ESS } from '@xcan-angus/tools';
import { Button } from 'ant-design-vue';

import http from '@/utils/http';


const pageData = ref<{[key: string]: any}>({});
const banner = ref({});
const services = ref([]);
const supportChannel = ref({
  channels: [],
  name: ''
});
const loadData = async () => {
  let url = `${PUB_ESS}/content/setting/technicalSupport`;
  const [error, {data}] = await http.get(url);
  if (error) {
    return;
  }
  pageData.value = JSON.parse(data);
  banner.value = pageData.value.banner || {};
  services.value = pageData.value.services;
  supportChannel.value.channels = pageData.value.supportChannel?.channels || [];
  supportChannel.value.name = pageData.value.supportChannel?.name;
};

onMounted(() => {
  loadData();
});
</script>
<template>
  <div class="w-full overflow-hidden">
    <!-- banner -->
    <div class="bg-img">
      <div v-if="banner" class="mx-auto banner-wrap" style="padding-top: 60px;">
        <div class="relative z-9 banner-info">
          <p class="mb-7.5 text-8 leading-10 font-semibold">
            {{ banner.title }}
          </p>
          <p class="text-5">
            {{ banner.description }}
          </p>
        </div>
        <div class="banner-img" :style="`background-image: url(${banner.imageContent?.image});`">
        </div>
      </div>
    </div>


    <!--支持服务类型-->
    <div class="mx-auto text-center py-15">
      <div class="text-2xl font-semibold section-title px-2">
        <Icon icon="icon-wenjianshuju" />
        支持服务类型
      </div>

      <div class="editions-grid mt-4">
        <div v-for="item in services" class="border rounded-xl py-5 space-y-3 px-2 text-center">
          <div class="inline-block p-4 rounded-full bg-vp-green_soft hover:bg-vp-green1">
            <Icon :icon="item.iconContent?.icon" class="text-10" />
          </div>
          <div class="text-6 font-semibold">{{ item.name }}</div>
        </div>
      </div>
    </div>

    <!--技术支持渠道-->
    <div class="mx-auto text-center py-15">
      <div class="text-2xl font-semibold section-title px-2">
        <Icon icon="icon-wenjianshuju" />
        {{supportChannel.name }}
      </div>

      <div
        v-for="(item, idx) in supportChannel.channels"
        class="flex mx-auto mt-10 p-5 deploy-methods items-center bg-vp-gray_soft">
        <template v-if="idx % 2 === 0">
          <img
            :src="item?.imageContent?.image"
            alt=""
            style="width: 400px;">
          <div class="flex-1 min-w-0 text-left">
            <div class="text-4 mb-3 font-semibold">{{ item.introduction }}</div>
            <div v-for="subItem in item.items" class="leading-15 text-4 border-b border-dashed">
              <a :href="subItem.url">{{ subItem.name }}</a>
            </div>
            <Button
              v-show="item.buttonName"
              type="primary"
              class="w-30 flex items-center"
              :href="item.buttonUrl">
              <div class="text-white-1 text-3.5 font-medium flex items-center">
                <span class="mr-2">{{ item.buttonName }}</span>
                <Icon icon="icon-hengjiantou" />
              </div>
            </Button>
          </div>
          
        </template>
        <template v-else>
          <div class="flex-1 min-w-0 text-left">
            <div class="text-4 mb-3 font-semibold">{{ item.introduction }}</div>
            <div v-for="subItem in item.items" class="leading-15 text-4 border-b border-dashed">
              <a :href="subItem.url">{{ subItem.name }}</a>
            </div>
            <Button
              v-show="item.buttonName"
              type="primary"
              class="w-30 flex items-center"
              :href="item.buttonUrl">
              <div class="text-white-1 text-3.5 font-medium flex items-center">
                <span class="mr-2">{{ item.buttonName }}</span>
                <Icon icon="icon-hengjiantou" />
              </div>
            </Button>
          </div>
          <img
            :src="item?.imageContent?.image"
            alt=""
            style="width: 400px;">
        </template>

      </div>
    </div>




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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}


.section-title {
  @apply text-vp-green1 border-b border-b-2 border-vp-green3 text-left text-6 font-medium pb-2;
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
</style>