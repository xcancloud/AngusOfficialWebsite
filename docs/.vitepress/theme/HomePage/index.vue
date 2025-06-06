<script lang="ts" setup>
  import { onMounted, ref, onBeforeUnmount, inject, defineAsyncComponent } from 'vue';
  import { isSignin } from '../../../../utils/site/index';
  import http from '../../../../utils/http';
  import { getDeviceInfo, getSearchTerms, angusTools } from '../../../../utils';

  const { PUB_ESS } = angusTools;

  const confirmVisible = inject('confirm', ref());

  const clientWidth = ref(window.innerWidth);
  const signinFlag = ref(false);
  const pageContent = ref({});

  const getClientWidth = () => {
    clientWidth.value = window.innerWidth;
  }

  const loadHomeData = async () => {
    const [error, res] = await http.get(`${PUB_ESS}/content/setting/portal`);
    if (res?.code === 'S') {
      try {
        const p = JSON.parse(res.data);
        pageContent.value = p;
      } catch {}
    }
  }
  onMounted(async () => {
    window.addEventListener('resize', getClientWidth);
    signinFlag.value = await isSignin();
    if (!signinFlag.value) {
      confirmVisible.value = true;
    }
    const deviceInfos = getDeviceInfo();
    const searchTerms = getSearchTerms(['source', 'plan', 'unit', 'keyword']);
    if (!deviceInfos?.deviceId) {
      const fpPromise = import('@fingerprintjs/fingerprintjs')
        .then(FingerprintJS => FingerprintJS.load());
      fpPromise
        .then(fp => fp.get())
        .then((result) => {
          const visitorId = result.visitorId;
          sessionStorage.setItem('visitorId', visitorId);
          const params = {
            ...deviceInfos,
            ...searchTerms,
            type: 'home',
            // userId: this.userInfo?.id || undefined,
            // client: this.clientSource
          };
          http.post(`${PUB_ESS}/content/access`, params);
        });
    } else {
      const params = {
        ...deviceInfos,
        ...searchTerms,
        type: 'home',
        // userId: this.userInfo?.id || undefined,
        // client: this.clientSource
      };
      http.post(`${PUB_ESS}/content/access`, params);
    }

    loadHomeData();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', getClientWidth);
  });
</script>
<template>
  <div>{{ pageContent }}</div>
</template>