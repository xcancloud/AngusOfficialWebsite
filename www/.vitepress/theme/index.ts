// https://vitepress.dev/guide/custom-theme
import { h, watch, ref, useModel } from 'vue';
import type { Theme } from 'vitepress'
import { useData, useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme'
import './style.css'
import ConfirmModal from './components/confirmModel.vue';

import '/assets/styles/vant-reset.css';
import '/assets/styles/normalize.css';
import '/assets/styles/tailwind.css';
import '@xcan-angus/vue-ui/style.css';

// plugin image-viewer
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';

// plugin group-icons
import 'virtual:group-icons.css'

const confirmVisible = ref(false); // confirm modal visible

export default {
  extends: DefaultTheme,

  enhanceApp({ app, router, siteData }) {
    // ...
    app.provide('confirm', confirmVisible);

    // Register global components, if you don't want to use it, you don't need to add it
    app.component('vImageViewer', vImageViewer);
  },

  setup() {
    // Get route
    const route = useRoute();
    // Using image viewer plugin
    imageViewer(route);
  }
} satisfies Theme
