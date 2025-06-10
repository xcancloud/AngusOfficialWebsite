import {defineConfig} from 'vitepress';
import server from './dev-server';
import {gmDocsSidebar, nav, testerDocsSidebar} from './menus.mts';

export default defineConfig({
    title: "XCan Cloud",
    description: "XCan Cloud Official WebSite (Https://www.xcan.cloud)",
    outDir: '../dist',
    head: [
        ['script', {src: '/assets/iconfont/iconfont.js'}],
    ],
    themeConfig: {
        search: {
            provider: 'local',
        },
        nav: nav,
        sidebar: {
            '/docs/gm/': gmDocsSidebar,
            '/docs/tester/': testerDocsSidebar
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
