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

// plugin enhanced readabilities
import { h } from 'vue'
import {
    NolebaseEnhancedReadabilitiesMenu,
    NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

// plugin lumen
import { DocVideoLink } from '@theojs/lumen';

import AuthConfirmModal from './components/authConfirmModel.vue';
import LoginConfirmModal from './components/loginConfirmModel.vue';
import HomePage from './home/index.vue';
import Footer from './components/Footer/footer.vue';
import Icon from './components/Icon/index.vue';
import Business from './scenario/business.vue';
import Ai from './scenario/ai.vue';
import BlogHome from './blog/BlogHome.vue';
import VideoHome from './video/VideoHome.vue';
import Deployment from './deployment/index.vue';
import Pricing from './pricing/index.vue';
import AngusCloud from './purchase/angusCloud.vue';
import AngusPriv from './purchase/angusPriv.vue';
import Pay from './pay/index.vue';
import OrderDone from './order/index.vue';
import Support from './support/index.vue';
import ServiceSupport from './support/serviceSupport.vue';
import Node from './purchase/node.vue';

export default {
    extends: DefaultTheme,

    // plugin enhanced readabilities
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // Added a reading-enhanced menu to the navigation bar for wider screens
            'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
            // Added a reading enhancement menu for narrower screens (typically smaller than the iPad Mini)
            'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
        })
    },

    enhanceApp({app, router, siteData}) {
        // ...
        // app.provide('confirm', confirmVisible);

        // Register Element Plus
        app.use(ElementPlus);
        app.component('LoginConfirmModal', LoginConfirmModal);
        app.component('AuthConfirmModal', AuthConfirmModal);
        app.component('HomePage', HomePage);
        app.component('Icon', Icon);
        app.component('Business', Business);
        app.component('Ai', Ai);
        app.component('BlogHome', BlogHome);
        app.component('VideoHome', VideoHome);
        app.component('Deployment', Deployment);
        app.component('Support', Support);
        app.component('ServiceSupport', ServiceSupport);
        app.component('Pricing', Pricing);
        app.component('AngusCloud', AngusCloud);
        app.component('AngusPriv', AngusPriv);
        app.component('Node', Node);
        app.component('Pay', Pay);
        app.component('OrderDone', OrderDone);
        app.component('Footer', Footer);

        for (const [name, comp] of Object.entries(ElementIcons)) {
            app.component(name, comp)
        }

        // Register vImageViewer components
        app.component('vImageViewer', vImageViewer);

        // Register DocVideoLink components
        app.component('Vid', DocVideoLink);

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
