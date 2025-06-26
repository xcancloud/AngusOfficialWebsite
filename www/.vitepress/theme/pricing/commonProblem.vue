
<script lang="ts" setup>
import { ref } from 'vue';
type Props = {
  list: any[];
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  list: ()=> ([]),
  title: ''
});

const expandActive = ref(-1);
const changeExpand = (index) => {
  expandActive.value = index === expandActive.value ? -1 : index;
};
</script>

<template>
  <div class="w-300 mx-auto">
    <p class="mb-10 text-2xl font-semibold text-black-color text-center">
      {{ title }}
    </p>

    <div  v-for="(item, index) in list" class="w-full border px-10 cursor-pointer transform transition-all duration-300 rounded-2.5 overflow-hidden mb-2" :style="{ height: (index === expandActive ? 'auto' : '100px')}" @click="changeExpand(index)">
      <div ref="title" class="pt-10 text-4 leading-5 font-semibold text-black-color flex items-center justify-between transform transition-colors duration-300" :class="index === expandActive && 'text-blue-main'">
        <span>{{ item.question }}</span>
        <Icon icon="icon-xiasanjiao" class="transform transition-transform duration-300" :class="index === expandActive && 'rotate-180'" />
      </div>

      <div ref="message" class="pt-4 pb-10 text-4 text-black-header-color font-medium transform transition-opacity duration-300" :class="index !== expandActive && 'opacity-0'">
        {{ item.answer }}
      </div>
    </div>
  </div>
</template>
