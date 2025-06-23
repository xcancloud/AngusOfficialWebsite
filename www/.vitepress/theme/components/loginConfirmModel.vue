<script lang="ts" setup>
import { ref, watch, inject } from 'vue';
import { Modal, Button } from 'ant-design-vue';
import { toSign } from '@/utils/site';

type Props = {
  visible: boolean;
  content: string;
}

const emits = defineEmits<{(e: 'update:visible', value: boolean):void; (e:'ok'):void}>();

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  content: ''
});

const cancel = () => {
  emits('update:visible', false);
}

const ok = async () => {
  await toSign();
  cancel();
}

</script>
<template>
  <Modal
    title="还未登录"
    :open="props.visible"
    @cancel="cancel">
    <div>
      系统检测到您的账号还未登录，请您登录后再进行操作。
    </div>
    <template #footer>
      <Button type="primary" class="w-25" @click="ok">
        去登录
      </Button>
      <Button class="w-25 ml-4" @click="cancel">
        取消
      </Button>
    </template>
  </Modal>
</template>
