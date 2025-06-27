<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Button, Checkbox, Input, CheckboxGroup, Form, FormItem, Textarea, notification } from 'ant-design-vue';
import { ESS } from '@xcan-angus/tools';

import http from '@/utils/http';


const formRef = ref();
const model = ref({
  fullName: '',
  company: '',
  phone: '',
  content: '',
  serviceTypeIds: []
});

const submitLoading = ref(false);
const checkboxList = ref<{label: string; value: string}[]>([]);

// 获取支持类型
const getType = async () => {
  const [error, { data = [] }] = await http.get(`${ESS}/offlineService/type`);
  if (error) {
    return;
  }
  checkboxList.value = data.map(i => ({ label: i.name, value: i.id }));
};

const validatePhone = () => {
  if (!model.value.phone || /^(?:[0-9] ?){6,14}[0-9]$/.test(model.value.phone)) {
    return Promise.resolve();
  }
  return Promise.reject('请输入正确的手机号');
};

const submit = () => {
  formRef.value.validate()
  .then(async () => {
    // 线下服务申请

    submitLoading.value = true;
    const [error] = await http.post(`${ESS}/offlineService`, model.value);
    submitLoading.value = false;
    if (error) {
      notification.error({
        message: error.message
      });
      return;
    };
    notification.success({
      message: '已提交'
    });
  })
}

onMounted(() => {
  getType();
});

</script>
<template>
  <div>
    <div class="mt-3">
      <Form
        ref="formRef"
        layout="vertical"
        :model="model">
        <FormItem label="支持服务" name="serviceTypeIds" :rules="[{required: true, message: '请选择支持服务'}]">
          <div class="mt-2" style="margin-bottom: -12px;">
            <CheckboxGroup v-model:value="model.serviceTypeIds">
              <Checkbox
                v-for="item in checkboxList"
                :key="item.value"
                :value="item.value"
                :disabled="model.serviceTypeIds.length > 2 && !model.serviceTypeIds.includes(item.value)">
                {{ item?.label }}
              </Checkbox>
            </CheckboxGroup>
          </div>
          <div slot="hint" class="mb-3" />
        </FormItem>
        <FormItem label="咨询人" name="fullName" :rules="[{required: true, message: '请输入咨询人'}]">
          <Input
            v-model:value="model.fullName"
            placeholder="希望我们怎么称呼您"
            :maxlength="80" />
          <div slot="hint" class="mb-4" />
        </FormItem>
        <FormItem label="公司名称" name="company" :rules="[{required: true, message: '请输入公司名称'}]">
          <Input
            v-model:value="model.company"
            placeholder="公司全称"
            :maxlength="80" />
          <div slot="hint" class="mb-4" />
        </FormItem>
        <FormItem label="联系电话" name="phone" :rules="[{required: true, message: '请输入联系电话'},{validator: validatePhone}]">
          <Input
            v-model:value="model.phone"
            placeholder="11位手机号码"
            :maxlength="30"/>
          <div slot="hint" class="mb-4" />
        </FormItem>
        <FormItem label="咨询内容" name="content" :rules="[{required: true, message: '请输入咨询内容'}]">
          <Textarea
            v-model:value="model.content"
            placeholder="请输入您要咨询的问题"
            :maxlength="200"/>
          <div slot="hint" class="mb-4" />
        </FormItem>
        <FormItem class="mb-7">
          <Button type="primary" class="w-25" :loading="submitLoading" @click="submit">
            提交
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>