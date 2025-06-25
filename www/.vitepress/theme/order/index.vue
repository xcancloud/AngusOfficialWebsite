<script lang="ts" setup>
import {ref, onMounted, computed, onBeforeMount} from 'vue';
import { Divider, Button, notification } from 'ant-design-vue';
import { useRouter } from 'vitepress';
import { ESS } from '@xcan-angus/tools';
import { getCurrentLanguage } from '@/utils/index';
import { getUrl } from '@/utils/site';

import http from '@/utils/http';


const router = useRouter();
const dataColumns = [
  {
    title: '订单生成时间',
    dataIndex: 'createdDate'
  },
  {
    title: '订单号',
    dataIndex: 'no'
  },
  {
    title: '购买产品',
    dataIndex: 'goodsName'
  },
  {
    title: '购买产品版本',
    dataIndex: 'editionType'
  },
  {
    title: '版本号',
    dataIndex: 'goodsVersion'
  },
  {
    title: '支付方式',
    dataIndex: 'payType'
  },
  {
    title: '支付状态',
    dataIndex: 'payStatus'
  },
  {
    title: '支付金额',
    dataIndex: 'payAmount'
  }
];

const title = ref();
const dataSource = ref({});
const orderId = ref();
const angusUrl = ref();
const expenseUrl = ref();

const isPrivit = computed(() => {
  return ['DATACENTER', 'ENTERPRISE', 'COMMUNITY'].includes(dataSource.value?.editionType?.value);
});

const loadOrderInfo = async () => {
  if (!orderId.value) {
    return;
  }
  const [error, { data = {} }] = await http.get(`${ESS}/order/${orderId.value}`);
  debugger;
  if (error) {
    notification.error({
      message: error.message
    });
    // this.$message.error({ message: error.message });
    return;
  }
  dataSource.value = data;
  if (data.status.value === 'FINISHED') {
    title.value = '购买成功';
  } else if (data.status.value === 'AWAITING_PAY' && data.payStatus.value === 'PAY_CONFIRMING') {
    title.value = '下单成功';
  } else {
    history.back();
  }
};

    // 返回
const  back = () => {
  const languagePath = getCurrentLanguage();
  router.go(`${languagePath}/pricing`);
};

onMounted(async () => {
  const url = new URL(location.href);
  const { searchParams } = url;
  orderId.value = searchParams.get('orderId');
  if (orderId.value) {
    loadOrderInfo();
  }
  angusUrl.value = await getUrl('at');
  expenseUrl.value = await getUrl('expense');
  
});

</script>
<template>
  <div class="text-3 bg-gray-tooter-bg py-10 text-black-color" >
    <div v-if="orderId" class="w-300 bg-white-1 rounded px-20 py-6 content-wrapper">
      <div class="text-6 flex items-center justify-center mb-4">
        <Icon icon="icon-duihao" class="text-green-finished" />
        <span class="font-semibold ml-2">{{ title }}</span>
      </div>
      <!-- <Divider /> -->
      <div class="flex">
        <div class="text-3.5 data-wrapper">
          <div v-for="item in dataColumns" :key="item.dataIndex" class="flex items-center">
            <label class="w-35">{{ item.title }}: </label>
            <div class="font-semibold">
              <template v-if="['editionType', 'payStatus', 'payType'].includes(item.dataIndex)">
                {{ dataSource[item.dataIndex]?.message || '--' }}
              </template>
              <template v-else-if="item.dataIndex === 'payAmount' && dataSource.payAmount">
                <div class="text-orange-ip-link">
                  <span class="text-5">{{ dataSource.payAmount }}</span> RMB
                </div>
              </template>
              <template v-else>
                {{ dataSource[item.dataIndex] || '--' }}
              </template>
            </div>
          </div>
        </div>
        <div class="flex-1 relative pl-5 pt-4 pr-18 pb-7.5">
          <img src="./images/delta.png" class="absolute" style=" top: 80px; left: 0; width: 30px;">
          <img src="./images/star.png" class="absolute" style=" top: 0; right: 10px; width: 30px;">
          <img src="./images/done.png" class="absolute" style="right: 0; bottom: 0; width: 182px;">
          <div class="w-full h-full bg-gray-video-bg rounded-5 pl-10 pr-30 pt-20">
            <p class="font-semibold text-5">
              感谢对晓蚕云的信任
            </p>
            <p>
              如有任何疑问，请咨询晓蚕云客服电话：<span class="text-orange-ip-link">400-115-1230</span> ，同时也可以通过 <a to="/workorders">
                提交工单
              </a> 的方式在线咨询。
            </p>
          </div>
        </div>
      </div>
      <Divider style="margin-bottom: 8px;" />
      <div v-if="dataSource.status?.value === 'AWAITING_PAY' && dataSource.payStatus?.value==='PAY_CONFIRMING'">
        请您耐心等待，我们将尽快为您确认该笔支付订单，当确认支付成功后会以短信及邮件的形式通知您。您也可以进入订单查看具体详情。
      </div>
      <div v-if="dataSource.status?.value === 'FINISHED' && dataSource.goodsCode === 'AngusTester' && !isPrivit">
        您现在进入 <a :href="angusUrl" target="_blank">AngusTester</a> 即可开始您的云测试之旅。
      </div>
      <div v-if="dataSource.status?.value === 'FINISHED' && dataSource.goodsCode === 'AngusTester' && isPrivit">
        您已购买成功，请进入“<a to="/deployment">
          私有部署
        </a>”找到对应版本的应用申请授权许可和下载安装包。
      </div>
      <div class="text-center mt-4">
        <Button class="w-25 rounded-2" :href="`${expenseUrl}/orders/${orderId}`" target="_blank">
          <!-- <a :href="`${expenseUrl}/orders/${orderId}`" target="_blank">查看订单</a> -->
          查看订单
        </Button>
        <Button class="w-25 border-none ml-3" @click="back">
          返回
        </Button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.data-wrapper {
  width: 380px;
}

.data-wrapper > div {
  margin-bottom: 24px;
}

.data-wrapper > div:last-child {
  margin-bottom: 0;
}

.data-wrapper label {

}
</style>
