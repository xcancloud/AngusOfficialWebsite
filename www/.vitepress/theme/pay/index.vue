<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { Divider, Radio, Input, Button, notification } from 'ant-design-vue';
import { ESS } from '@xcan-angus/tools';
import dayjs from 'dayjs';
import md5 from 'md5';
import { useRouter, useRoute } from 'vitepress';

import { isSignin } from '@/utils/site/index';
import http from '@/utils/http';
import { round } from '@/utils/math';
import { maxVersion } from '@/utils/version';
import { getUrl } from '@/utils/site';
import { getCurrentLanguage } from '@/utils/index';

const router = useRouter();
const route = useRoute();
const orderInfo = ref<{[key: string]: any}>({});
const payTypeList = ref([]);
const payType = ref('');
const availableBalance = ref(0);
const setPassdFlag = ref(false);
const timeoutDate = ref();
const timeout = ref();
const orderId = ref();
const form = ref({
  password: undefined,
  vonchers: []
});
const payInfo = ref({
  visible: false,
  payType: undefined,
  url: undefined,
  payId: undefined
});
const dataIcon = ref({
  ALIPAY: {
    icon: 'icon-zhifubaozhifu',
    color: 'text-blue-icon2'
  },
  WXPAY: {
    icon: 'icon-weixinzhifu',
    color: 'text-green-success'
  },
  OFFLINE_TRANSFER: {
    icon: 'icon-xianxiazhuanzhang',
    color: 'text-blue-icon1'
  },
  PAYPAL: {
    icon: 'icon-Paypal',
    color: ''
  },
  BALANCE_PAY: {
    icon: 'icon-zhanghuyue',
    color: 'text-blue-icon3'
  }
});
const onlinePay = ref();
const loading = ref(false);
const cancelLoading = ref(false);

const payDisabled = computed(() => {
  if (!['OFFLINE_TRANSFER', 'BALANCE_PAY', 'ALIPAY'].includes(payType.value)) {
    return true;
  }
  if (!form.value.vonchers.length && payType.value === 'OFFLINE_TRANSFER') {
    return true;
  }
  if (!form.value.password && payType.value === 'BALANCE_PAY') {
    return true;
  }
  if (payType.value === 'ALIPAY' && !payInfo.value.visible) {
    return true;
  }
  return false;
})

const canPay = computed(() => {
  return ['AWAITING_PAY', 'CREATED'].includes(orderInfo.value?.status?.value) && orderInfo.value?.payStatus?.value !== 'PAY_CONFIRMING';
});

 // 支付方式 list
const loadPayTypeList = async () =>  {
  const [error, { data = [] }] = await http.get(`${ESS}/pay/setting/channel?enabled=true`);
  if (error) {
    return;
  }
  payTypeList.value = (data || []).filter(i => i.enabled && i.payType.value !== 'PAYPAL').map(i => i.payType);
}
 // 选择支付方式
 const changePayType = async  (value) => {
  form.value.password = undefined;
  payInfo.value.visible = false;
  if (payType.value === 'OFFLINE_TRANSFER' || payType.value === 'BALANCE_PAY') {
    return;
  }
  const [error, { data = {} }] = await http.patch(`${ESS}/order/pay/confirm`, {
    id: orderId.value,
    payType: payType.value,
    payReturnUrl: `${process.env.VUE_APP_PC}/order-done/${orderId.value}`
  });
  if (error) {
    return;
  }
  payInfo.value.payType = payType.value;
  payInfo.value.url = data.payQrCodeOrPage;
  payInfo.value.payId = data.payId;
  payInfo.value.visible = true;
};

// 账户余额
const loadAvailableBalance = async () => {
  const [error, { data = {} }] = await http.put(`${ESS}/account/current`);
  if (error) {
    return;
  }
  availableBalance.value = data.availableBalance || 0.00;
};

// 订单详情
const loadOrderInfo = async  () => {
  const [error, { data = {} }] = await http.get(`${ESS}/order/${orderId.value}`);
  if (error) {
    notification.error({
      message: error.message
    });
    // this.$message.error({ message: error.message });
    return;
  }
  orderInfo.value = data;
  // timeoutDate.value = dayjs().add(30, 'minute');
  timeoutDate.value = dayjs(data.createdDate).add(30, 'minute');
  if (canPay.value) {
    setTimeInter();
  }
};

// 去充值
const toRecharge = () => {
  window.location.href = getUrl('expense') + '/accounts/recharge';
};

//
const setTimeInter = () => {
  let timer;
  timer = setInterval(() => {
    const duration = timeoutDate.value.diff(dayjs(), 'second');
    const min = Math.floor(duration / 60);
    const second = duration % 60;
    timeout.value = (min ? min + '分' : '') + (second + '秒');
    if (second <= 0 && min <= 0) {
      clearInterval(timer);
      timer = null;
      window.location.href = getUrl('expense')+ '/orders';
    }
  }, 1000);
};

// 账户支付、线下转账
const toPay = async () => {
  if (payType.value === 'ALIPAY') {
    loading.value= true;
    onlinePay.value.aliPay();
    return;
  }
  if (payType.value === 'OFFLINE_TRANSFER' && !form.value.vonchers.length) {

    notification.warning({
      message: '请上传支付凭证'
    });
    return;
  }
  if (payType.value === 'BALANCE_PAY' && !form.value.password) {

    notification.warning({
      message: '输入支付密码'
    });
    return;
  }
  const params = {
    id: orderId.value,
    payType: payType.value,
    vouchers: payType.value === 'OFFLINE_TRANSFER' ? form.value.vonchers : undefined,
    payPassd: payType.value === 'BALANCE_PAY' ? md5(md5(form.value.password)) : undefined
  };

  loading.value= true;
  const [error] = await http.patch(`${ESS}/order/pay/confirm`, {
    ...params
  });
  loading.value= false;
  if (error) {
    notification.warning({
      message: error.message
    });

    return;
  }
  notification.success({
    message: '支付成功'
  });

  const languagePath = getCurrentLanguage();
  router.go(`${languagePath}/order-done?orderId=${orderId.value}`);
}

// 轮询微信支付结果
const getWxinPayResult = async () => {
  if (payType.value !== 'WXPAY') {
    return;
  }
  const [, res] = await http.get(`${ESS}/pay/biz/${orderId.value}`);
  if (res?.data?.payStatus?.value === 'SUCCESS') {
    notification.success({
      message: '支付成功'
    });
    // history.back();
    const languagePath = getCurrentLanguage();
    router.go(`${languagePath}/order-done?orderId=${orderId.value}`);
  } else {
    setTimeout(() => {
      getWxinPayResult();
    }, 1000);
  }
};
// 取消订单
const cancelPay = async () => {
  cancelLoading.value = true;
  const [error] = await http.patch(`${ESS}/order/${orderId.value}/unpaid/cancel`);
  cancelLoading.value = false;
  if (error) {
    notification.error({
      message: error.message
    });
    return;
  }
  notification.success({
    message: '取消订单成功'
  });
  cancelLoading.value = true;
  await loadOrderInfo();
  cancelLoading.value = false;
  history.back();
};


onMounted(() => {
  const url = new URL(location.href);
  const {searchParams} = url;
  orderId.value = searchParams.get('orderId');
  loadPayTypeList();
  loadAvailableBalance();
  if (orderId.value) {
    loadOrderInfo();
  }
})
</script>
<template>
  <div class="text-3 bg-gray-tooter-bg pt-31" style="height: 100vh; overflow: scroll;">
    <div class="mx-40 border border-gray-border bg-white-1 rounded px-20 py-6">
      <div class="pay-info-wrapper">
        <label>支付金额: </label>
        <span class="text-orange-ip-link font-medium"><span class="text-6">{{ orderInfo.payAmount }}</span> RMB</span>
        <label class="ml-10">订单号: </label>
        <span>{{ orderInfo.no }}</span>
        <template v-if="canPay">
          <label class="ml-10">订单超时剩余时间: </label>
          <span class="text-red-error text-3.5">{{ timeout }}</span>
        </template>
        <template v-if="orderInfo.status?.value === 'TIMEOUT'">
          <span class="text-red-error text-3.5 font-bold ml-4">订单已超时</span>
        </template>
        <template v-if="orderInfo.status?.value === 'FINISHED'">
          <span class="text-green-finished text-3.5 font-bold ml-4">订单已完成!</span>
        </template>
      </div>
      <div class="mt-4">
        感谢您购买晓蚕云产品。如有疑问，请咨询晓蚕云客服电话“15620922243”，也可以直接在线“<a :href="`${getUrl('www')}/workorders`" target="_blank"><span class="text-blue-1">提交工单</span></a>”向我们咨询反馈。
      </div>
      <Divider />
      <div class="text-4 font-medium my-3 text-black-1">
        选择支付方式
      </div>
      <RadioGroup
        v-model="payType"
        :disabled="!canPay"
        button-style="solid"
        class="w-full my-2"
        @change="changePayType"
      >
        <RadioButton v-for="item in payTypeList" :key="item.value" :value="item.value">
          <div class="text-theme-title font-medium py-5 flex item-center justify-between">
            <div>
              <Icon :type="dataIcon[item.value]?.icon" :class="['mr-5','text-7',dataIcon[item.value]?.color]" />{{ item.message }}
            </div>
            <Icon
              :type="payType==item.value?'icon-xuanzhongduihao':''"
              :class="['text-xl','absolute', 'bottom-0', 'right-0',payType==item.value?'text-blue-1':'']"
            />
            <div v-if="item.value ==='BALANCE_PAY'" v-show="payType === item.value" class="text-3 text-">
              账户余额：<span>{{ availableBalance }}RMB</span>
              <template v-if="+availableBalance < +orderInfo.payAmount">
                <span class="text-orange-ip-link ml-2">余额不足，</span>
                <span class="text-blue-1 cursor-pointer" @click.stop="toRecharge">去充值</span>
              </template>
            </div>
          </div>
          <div v-if="item.value === 'BALANCE_PAY'" v-show="payType === item.value" class="flex text-3 py-5 items-center">
            支付密码：<Input v-model="form.password" :disabled="+availableBalance < +orderInfo.payAmount" type="password" style="width: 280px;" />
          </div>
          <OfflineTrsnafer v-if="item.value === 'OFFLINE_TRANSFER'" v-show="payType === item.value" :vonchers.sync="form.vonchers" />
          <OnlinePay
            v-if="['WXPAY', 'ALIPAY'].includes(item.value)"
            :ref="dom=> item.value === 'ALIPAY' ? onlinePay = dom : ''"
            :visible="payInfo.visible && payType === item.value"
            :pay-info="payInfo"
            @startPolling="getWxinPayResult"
          />
        </RadioButton>
      </RadioGroup>
      <div class="mt-6 text-center">
        <Button type="primary" :disabled="payDisabled" :loading="loading" @click="toPay">
          立即支付
        </Button>
        <Button
          :loading="cancelLoading"
          :disabled="!canPay"
          class="ml-3"
          @click="cancelPay"
        >
          取消订单
        </Button>
      </div>
    </div>
  </div>
</template>