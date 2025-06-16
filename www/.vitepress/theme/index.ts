// https://vitepress.dev/guide/custom-theme
import type {Theme} from 'vitepress'
import {useRoute} from 'vitepress';
import DefaultTheme from 'vitepress/theme'
import './style.css'

// import ConfirmModal from './components/confirmModel.vue';
// const confirmVisible = ref(false); // confirm modal visible

// ElementIcons
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementIcons from '@element-plus/icons-vue'

// plugin image-viewer
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';

// plugin group-icons
import 'virtual:group-icons.css';

// plugin openapi client
import { theme } from 'vitepress-openapi/client';
import 'vitepress-openapi/dist/style.css';

// plugin lumen
import { DocVideoLink } from '@theojs/lumen'

export default {
    extends: DefaultTheme,

    enhanceApp({app, router, siteData}) {
        // ...
        // app.provide('confirm', confirmVisible);

        // Register Element Plus
        app.use(ElementPlus)
        for (const [name, comp] of Object.entries(ElementIcons)) {
            app.component(name, comp)
        }

        // Register vImageViewer components
        app.component('vImageViewer', vImageViewer);

        // Register DocVideoLink components
        app.component('Vid', DocVideoLink)

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
