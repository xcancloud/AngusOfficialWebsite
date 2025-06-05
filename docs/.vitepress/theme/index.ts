// https://vitepress.dev/guide/custom-theme
import { h, watch, ref, useModel } from 'vue';
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import ConfirmModal from './components/confirmModel.vue';

const confirmVisible = ref(false); // confirm modal visible

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": h(ConfirmModal, {
        content: 'TEST'
      })
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.provide('confirm', confirmVisible);
  }
} satisfies Theme
