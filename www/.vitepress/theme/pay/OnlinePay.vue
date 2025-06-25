<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import QRCode from 'qrcode';
import { notification } from 'ant-design-vue';

type Props = {
  visible: boolean;
  payInfo: {payType: string; url: string};
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  payInfo: () => ({ payType: '', url: '' })
});

const emits = defineEmits<{(e: 'startPolling')}>()

const qrcode = ref();
const formWrapper = ref();

const useqrcode = () => {
  qrcode.value = document.getElementById('qrcode');
  QRCode.toCanvas(qrcode.value, props.payInfo.url, (error) => {
    if (error) {
      notification.error({
        message: '获取二维码失败'
      })
      // this.$message.error('获取二维码失败');
    } else {
      emits('startPolling');
    }
  });
};

const aliPay = () => {
  formWrapper.value.getElementsByTagName('form')[0]?.submit();
}

onMounted(() => {
  watch(() => props.visible, (val) => {
    if (!val) {
      return;
    }
    if (props.payInfo.payType === 'WXPAY') {
      setTimeout(() => useqrcode());
      // return;
    }
  }, {
    immediate: true
  })
});



</script>
<template>
  <div v-if="visible">
    <div v-if="payInfo.payType === 'WXPAY'" class="w-full text-center">
      <div>
        <canvas id="qrcode" class="border inline-block" />
      </div>
      <p class="mt-4 text-black-header-color">
        打开微信扫一扫完成支付
      </p>
    </div>
    <div
      v-if="payInfo.payType === 'ALIPAY'"
      ref="formWrapper"
      v-html="payInfo.url"
    />
  </div>
</template>