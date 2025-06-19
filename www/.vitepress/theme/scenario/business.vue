<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import http from '../../../../utils/http';
import { PUB_ESS } from '@xcan-angus/tools';
import { Button } from 'ant-design-vue';


const banner = ref();
const features = ref();

const loadData = async () => {
  const [error, res] = await http.get(`${PUB_ESS}/content/setting/sceneDemonstration`);
  const _data = JSON.parse(res?.data || '{}');
  banner.value = _data.banner || [];
  features.value = _data.features || [];
};

onMounted(() => {
  loadData()
});
</script>
<template>
  <div class="w-full overflow-hidden">
    <div class="mx-auto pt-15">
      <div v-for="(item, index) in features || []" :key="index" class="mb-25 ">
        <div class="text-7 font-semibold mb-8 flex">
          <template v-if="index % 2 === 0">
            <div class="flex-2/5" style="width: calc(100% - 60px);">
              {{ item.title }}
            </div>
            <div class="flex-3/5 ml-15" />
          </template>
          <template v-else>
            <div class="flex-3/5" />
            <div class="flex-2/5 ml-15" style="width: calc(100% - 60px);">
              {{ item.title }}
            </div>
          </template>
        </div>
        
        <template v-if="index % 2 === 0">
          <div class="text-3.5 leading-5 editions-grid-left">
          
            <div class="">
              <div
                v-for="(description, idx) in item.decription"
                :key="idx"
                class="max-w-full leading-7"
                style="white-space: pre-line;"
                :class="{'mb-2 font-semibold': idx === 0}"
              >
                {{ description }}
              </div>
              <Button :href="item?.learnMore?.url" class="mt-2 bg-bg-soft" style="border-style: none;">
                {{ item?.learnMore?.label }}
                <Icon icon="icon-hengjiantou" class="ml-1" />
              </Button>
            </div>
            <div class="">
              <video :src="item.video" class="w-full " controls="controls" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-3.5 leading-5 editions-grid-right">

            <div class="flex-3/5">
              <!-- <img :src="item.image" class="w-full" /> -->
              <video :src="item.video" class="w-full" controls="controls" />
            </div>
            <div class="flex-2/5 min-w-0">
              <div
                v-for="(description, idx) in item.decription"
                :key="idx"
                class="max-w-full"
                style="white-space: pre-line;"
                :class="{'mb-2 font-semibold': idx === 0}"
              >
                {{ description }}
              </div>
              <Button :href="item?.learnMore?.url" class="mt-2 bg-bg-soft" style="border-style: none;">
                {{ item?.learnMore?.label }}
                <Icon icon="icon-hengjiantou" class="ml-1" />
              </Button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped>
.editions-grid-left {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 2rem;
}

.editions-grid-right {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 2rem;
}
</style>