<script lang="ts" setup>
const props = withDefaults(defineProps<{
  icon: string
}>(), {
  icon: undefined
});

</script>
<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#' + props.icon" />
  </svg>
</template>

<style scoped>
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  outline: none;
  fill: currentColor;
}

.icon:focus {
  outline: none;
}
</style>
