---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "XCan Cloud"
  text: "A VitePress Site"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---


<script setup>
  import { onMounted, ref, onBeforeUnmount, inject } from 'vue';
  import { isSignin } from '../utils/site/index';
  import http from '../utils/http';
  import { getDeviceInfo, getSearchTerms, angusTools } from '../utils';

  const { PUB_GM } = angusTools;

  const confirmVisible = inject('confirm', ref());

  const clientWidth = ref(window.innerWidth);
  const signinFlag = ref(false);

  const getClientWidth = () => {
    clientWidth.value = window.innerWidth;
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
          http.post(`${PUB_GM}/content/access`, params);
        });
    } else {
      const params = {
        ...deviceInfos,
        ...searchTerms,
        type: 'home',
        // userId: this.userInfo?.id || undefined,
        // client: this.clientSource
      };
      http.post(`${PUB_GM}/content/access`, params);
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', getClientWidth);
  });

</script>
<div>{{signinFlag}}</div>



