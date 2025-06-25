<script setup lang="ts">
import { ref } from 'vue';
import cookies from 'js-cookie';
import { Upload } from 'ant-design-vue';
import { STORAGE } from '@xcan-angus/tools';

import ImageList from './ImageList.vue';
import http from '@/utils/http';

type Props = {
  vonchers: {name: string; url: string}[];
}
const props = withDefaults(defineProps<Props>(), {
  vonchers: () => ([])
});

const emits = defineEmits<{(e: 'update:vonchers', value: {name: string; url: string}[]):void}>();

const fileList = ref<{name: string; url: string}[]>([])

const uploadFile = async  (fileObj)=>  {
  const formData = new FormData();
  formData.append('files', fileObj.file);
  formData.append('bizKey', 'payVoucher');
  const [error, { data = [] }] = await http.post(`${STORAGE}/file/upload`, formData);
  if (error) {
    return;
  }
  const tokenURL = new URL(data[0].url);
  tokenURL.searchParams.append('access_token', cookies.get('access_token'));
  fileList.value.push({ ...data[0], uri: tokenURL.href });
  emits('update:vonchers', fileList.value.map(i => ({ name: i.name, url: i.url })));
};

const delImg = (index) => {
  fileList.value.splice(index, 1);
  emits('update:vonchers', fileList.value.map(i => ({ name: i.name, url: i.url })));
};

</script>
<template>
  <div class="py-5">
    <div class="text-3 flex">
      <label class="w-30">账户信息： </label>
      <div>
        <div class="text-orange-ip-link">
          尊敬的用户，您好！请您使用对公转账的方式
        </div>
        <div><label>银行户名： </label>晓蚕科技（北京）有限公司</div>
        <div><label>银行账户： </label>110945491310601</div>
        <div><label>开户银行： </label>招商银行股份有限公司北京分行上地支行</div>
      </div>
    </div>
    <div class="text-3 flex">
      <label class="w-30">上传转账凭证： </label>
      <div class="flex">
        <ImageList :files="fileList" class="flex-shrink-0" @del="delImg" />
        <Upload
          :file-list="fileList"
          :custom-request="uploadFile"
          list-type="picture-card"
          accept=".png,.jpg,.jpeg"
        >
          <div v-if="fileList.length < 5" class="ant-upload-text">
            <Icon type="icon-shangchuantupian" class="text-12" />
          </div>
        </Upload>
      </div>
    </div>
    <div class="text-3 pl-30">
      <Icon type="icon-shuoming" class="text-blue-icon4" /> <label>最多可上传5张。每张大小不超过2M。支持格式：'jpg','png','jpeg'</label>
    </div>
  </div>
</template>
<style scoped>
label {
  color: rgba(130, 136, 148, 1);
}
</style>
