import {defineConfig} from 'vitepress';
import server from './dev-server';
import {gmDocsSidebar, nav, testerDocsSidebar} from './menus.mts';

const title = '晓蚕云';

export default defineConfig({
    lang: 'zh',
    title: title,

    rewrites: {
        'zh/:rest*': ':rest*'
    },

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

    ignoreDeadLinks: [
        /:\/\/bj-c1-prod-files.xcan.cloud/,
        /:\/\/dev-files.xcan.cloud/,
        /:\/\/localhost/,
    ],

    outDir: '../dist',
    head: [
        ['script', {src: '/assets/iconfont/iconfont.js'}],
    ],
    themeConfig: {
        logo: { src: '/logo-mini.png', width: 28, height: 28 },

        search: {
            provider: 'local',
        },
        nav: nav,
        sidebar: {
            '/zh/docs/gm/': gmDocsSidebar,
            '/zh/docs/tester/': testerDocsSidebar
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/xcancloud'}
        ]
    },
    locales: {
        root: {label: '简体中文'},        // 默认语言
        en: {label: 'English'},          // 英语
        fr: {label: 'Français'},         // 法语
        de: {label: 'Deutsch'},          // 德语
        ja: {label: '日本語'},            // 日语
        'zh-TW': {label: '繁體中文'},     // 繁体中文
        pt: {label: 'Português'},        // 葡萄牙语
        ru: {label: 'Русский'},          // 俄语
        es: {label: 'Español'},          // 西班牙语
        ko: {label: '한국어'},             // 韩语
        fa: {label: 'فارسی'}             // 波斯语
    },
    vite: {
        server: server
    }
})
