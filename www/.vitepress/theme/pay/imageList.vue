<script lang="ts" setup>
type Props = {
  files: {uri: string; src: string}[]
}

const props = withDefaults(defineProps<Props>(), {
  files: () => ([])
});
const emits = defineEmits<{(e: 'del', value: number):void}>();

const del = (index) => {
  emits('del', index);
};
</script>
<template>
  <div class="flex">
    <div v-for="(item, index) in props.files" :key="item.src" class="relative img-wrapper flex-shrink-0">
      <img :src="item.uri" class="w-25 h-25 mr-2">
      <div class="absolute w-full bottom-0 h-8 text-center icon-wrapper">
        <span @click="del(index)">
          <Icon type="icon-qingchu" class="cursor-pointer text-white-1" />
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>

.icon-wrapper {
  display: none;
  background-color: rgb(0, 0, 0, 0.6);
}

.img-wrapper:hover .icon-wrapper {
  display: block;
}
</style>