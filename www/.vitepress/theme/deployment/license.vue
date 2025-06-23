<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Form, FormItem, Input, Select, Button, notification } from 'ant-design-vue';
import http from '@/utils/http';
import { ESS } from '@xcan-angus/tools';

type Props = {
  goodsId: string;
  eCode: string;
  gCode: string;
  gVersion: string;
  tenantId: string;
  gName: string;
  eName: string;
}

const props = withDefaults(defineProps<Props>(), {
  goodsId: '',
  eCode: ''
});

const emits = defineEmits<{(e: 'ok'):void, (e: 'cancel'):void}>();

const userInfo = ref({})
const orderNoList = ref([]);
const model = ref({
  app: '',
  versionType: '',
  version: '',
  machine: null,
  macAddress: '',
  contacts: '',
  phone: '',
  email: ''
});
const label = ref({
  app: '应用许可',
  machine: '机器码',
  macAddress: 'MAC地址',
  contacts: '联系人名称',
  phone: '手机号',
  email: '邮箱地址',
});
const error = ref({
  machine: '',
  macAddress: '',
  contacts: '',
  phone: '',
  email: ''
});
const buttonLoading = ref(false);
const checkedOrder = ref();
const goodsId = ref();

const inputChange = (key) => {
  if (key === 'email' && model.value[key] !== '' && !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(model.value[key])) {
    // 请输入正确的邮箱
    error.value[key] = '请输入正确的邮箱';
    return false;
  }
  if (key === 'phone' && !/^(?:[0-9] ?){6,14}[0-9]$/.test(model.value.phone)) {
    // 请输入正确格式的手机号
    error.value[key] = '请输入正确格式的手机号';
    return false;
  }

  if (key === 'machine') {
    if (model.value.macAddress) {
      error.value[key] = '';
      return true;
    }

    if (model.value[key]) {
      error.value[key] = '';
      error.value.macAddress = '';
      return true;
    }

    error.value[key] = '请输入机器码，机器码和MAC地址至少输入一项';
    return false;
  }

  if (key === 'macAddress') {
    if (model.value.machine) {
      error.value[key] = '';
      return true;
    }

    if (model.value[key]) {
      error.value[key] = '';
      error.value.machine = '';
      return true;
    }

    error.value[key] = '请输入机器码，MAC地址和机器码至少输入一项';
    return false;
  }

  error.value[key] = model.value[key] === '' ? `请输入${label.value[key]}` : '';
  return model.value[key] !== '';
}

const getGoodsList = async () => {
  const [error, { data }] = await http.get(`${ESS}/order?goodsCode=${props.gCode}&goodsVersion=${props.gVersion}&editionType=${props.eCode}&expired=false&status=FINISHED`, {}, { headers: { 'XC-Opt-Tenant-Id': props.tenantId } });
  if (error) {
    return;
  }

  model.value.app = data.list[0].goodsName;
  goodsId.value = data.list[0].goodsId;
  checkedOrder.value = data.list[0].no;
  orderNoList.value = data.list.map(item => ({ label: item.no, value: item.no }));
}

const submit = async () => {
  const _params = {
    email: model.value.email,
    fullName: model.value.contacts,
    goodsId: props.goodsId,
    machineCode: model.value.machine,
    mobile: model.value.phone,
    macAddress: model.value.macAddress,
    source: 'OFFICIAL_WEBSITE_APPLY'
  };

  const params = props.eCode === 'COMMUNITY' ? _params : { ..._params, orderNo: checkedOrder.value };
  buttonLoading.value = true;
  const [error] = await http.post(`${ESS}/lcs/apply/current`, params);
  buttonLoading.value = false;
  if (error) {
    notification.error({ message: error.message });
    return;
  }
  notification.success({ message: '获取许可成功，请进入“全局管理”->“商店”->”我的许可“下载。' });
  emits('ok');
}

const cancel = () => {
  emits('cancel');
}

onMounted(() => {
  getGoodsList();
  model.value = {
    ...model.value,
    app: props.gName,
    versionType: props.eName,
    version: props.gVersion
  }
})
  
</script>
<template>
  <div>
    <div class="w-150 relative overflow-hidden mt-20 mx-auto">
      <img class="w-150 -z-10 absolute top-0 left-0" src="/assets/image/consule/title-bg.png" alt="">
      <div class="mt-12.5 text-center text-black-color text-4xl leading-9 font-semibold">
        获取许可申请
      </div>
    </div>
    <div class="mx-auto mb-8">
      <div style=" margin-bottom: 6px; font-size: 14px; font-weight: 500;">
        重要提醒：
      </div>
      <div class="leading-5" style="font-size: 12px;">
        <p style=" margin-bottom: 4px;">
          (1) 免费(社区版)应用和插件授权许可有效期为50年；收费应用和插件授权许可有效期为订单购买时长。
        </p>
        <p style=" margin-bottom: 4px;">
          (2) 确保安装服务器或PC机的物理MAC地址(查看安装程序提示)输入正确，错误的MAC地址会导致应用安装失败。
        </p>
        <p style=" margin-bottom: 4px;">
          (3) 许可申请提交后系统会在5分钟内自动将应用、许可、及安装信息发送到您的邮箱，您也可以在云商店里下载应用安装包和许可文件。
        </p>
        <p>(4) 如果相同版本应用购买了多次，请确认本次申请应用许可对应订单，生成许可配额、有效期会和申请订单保持一致。</p>
      </div>
    </div>
  </div>
  <Form layout="vertical" class="mb-30" >
    <FormItem :required="true" :label="label.app">
      <div class="flex items-center justify-between">
        <Input
          :value="`${model.app} / ${model.versionType} / ${model.version}`"
          disabled
          class="input-parent"
        />
      </div>
      <div slot="hint" />
    </FormItem>
    <FormItem :required="true" :label="label.macAddress" :error="error.macAddress">
      <Input
        v-model="model.macAddress"
        :placeholder="'请输入MAC地址'"
        :trim="false"
        :maxlength="40"
        :error="error.macAddress !== ''"
        class="input-parent"
        @change="inputChange('macAddress')"
      />
      <div slot="hint" />
    </FormItem>
    <FormItem :required="true" :label="label.contacts" :error="error.contacts">
      <Input
        v-model="model.contacts"
        :placeholder="'输入联系人名称'"
        :trim="false"
        :maxlength="80"
        :error="error.contacts !== ''"
        class="input-parent"
        @change="inputChange('contacts')"
      />
      <div slot="hint" />
    </FormItem>
    <FormItem :required="true" :label="label.phone" :error="error.phone">
      <Input
        v-model="model.phone"
        placeholder="输入联系人手机号"
        :trim="false"
        :maxlength="30"
        rules="phone"
        :error="error.phone !== ''"
        class="input-parent"
        @change="inputChange('phone')"
      />
      <div slot="hint" />
    </FormItem>

    <FormItem :required="true" :label="label.email" :error="error.email">
      <Input
        v-model="model.email"
        placeholder="输入接收邮件地址"
        :trim="false"
        :maxlength="100"
        :error="error.email !== ''"
        class="input-parent"
        @change="inputChange('email')"
      />
      <div slot="hint" />
    </FormItem>
    <FormItem v-if="props.eCode !== 'COMMUNITY'" :required="true" label="订单编号">
      <Select v-model="checkedOrder" :options="orderNoList" class="w-full h-10 border-0 order-no-select" />
      <div slot="hint" />
    </FormItem>
    <FormItem class="mb-15">
      <div class="flex items-center justify-center" style="margin-top: 30px; margin-right: 130px;">
        <Button type="primary" class="w-25 mr-4" :loading="buttonLoading" @click="submit">
          提交
        </Button>
        <Button class="w-25" @click="cancel">
          取消
        </Button>
      </div>
    </FormItem>
  </Form>
</template>