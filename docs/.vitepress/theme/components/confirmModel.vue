<script lang="ts" setup>
import { ref, watch, inject } from 'vue';
import { Modal, Button } from 'ant-design-vue';

const confirm = inject('confirm', ref());
const visible = ref(false);

const props = withDefaults(defineProps<{
  content: string|number,
  visible: boolean;
}>(), {
  content: undefined,
  visible: false
})

const emits = defineEmits<{(e: 'update:visible', value: boolean):void}>();


const cancel = () => {
  confirm.value = false;
}

const ok = () => {
  console.log(ok);
  cancel();
}

watch(() => confirm.value, (newValue) => {
  visible.value = newValue;
}, {
  immediate: true
})

</script>
<template>
  <Modal
    title="还未登录"
    :open="confirm"
    @cancel="cancel">
    {{ props.content }}
    <template #footer>
      <Button type="primary" class="w-25" :loading="loading" @click="ok">
        去登录
      </Button>
      <Button class="w-25 ml-4" @click="cancel">
        取消
      </Button>
    </template>
  </Modal>
</template>
