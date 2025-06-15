// https://vitepress.dev/guide/custom-theme
import type {Theme} from 'vitepress'
import {useRoute} from 'vitepress';
import DefaultTheme from 'vitepress/theme'
import './style.css'

// import ConfirmModal from './components/confirmModel.vue';
// const confirmVisible = ref(false); // confirm modal visible

// plugin image-viewer
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';

// plugin group-icons
import 'virtual:group-icons.css'

// plugin openapi client
import { theme } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'

export default {
    extends: DefaultTheme,

    enhanceApp({app, router, siteData}) {
        // ...
        // app.provide('confirm', confirmVisible);

        // Register vImageViewer components
        app.component('vImageViewer', vImageViewer);

        // Register openapi components
        theme.enhanceApp({app});
    },

    setup() {
        // Get route
        const route = useRoute();
        // Using image viewer plugin
        imageViewer(route);
    }
} satisfies Theme
