import {defineConfig} from 'vitepress'
import server from './dev-server';
import {enLocaleConfig} from './config/en'
import {zhLocaleConfig} from './config/zh'

export default defineConfig({
    title: 'XCan Cloud',

    // rewrites: {
    //     'en/:rest*': ':rest*'
    // },

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

    ignoreDeadLinks: [
        /:\/\/bj-c1-prod-files.xcan.cloud/,
        /:\/\/dev-files.xcan.cloud/,
        /:\/\/localhost/,
    ],

    outDir: '../dist',

    sitemap: {
        hostname: 'https://www.xcan.cloud',
        lastmodDateOnly: false,
        transformItems(items) {
            return items.map(it => {
                it.lastmodrealtime = true
                it.changefreq = 'weekly'
                it.url = `/${it.url}`
                return it;
            })
        }
    },

    head: [
        // ['script', {src: '/assets/iconfont/iconfont.js'}],
        ['link', {rel: 'icon', type: 'image/png', href: '/favicon.png'}],
        ['meta', {name: 'author', content: 'XCan Teams'}],
        ['meta', {property: 'og:type', content: 'website'}],
        ['meta', {name: 'og:title', content: 'XCan Cloud - AngusTester'}],
        ['meta', {name: 'og:description', content: "Enable small and medium-sized enterprises to build their own R&D platform · Standardize processes · Improve efficiency"}],
        ['meta', {property: 'og:site_name', content: 'XCan Cloud'}],
        ['meta', {property: 'og:image', content: 'https://www.xcan.cloud/angustester-og.jpeg'}],
        ['meta', {property: 'og:url', content: 'https://www.xcan.cloud'}],
    ],

    themeConfig: {
        logo: {src: '/logo-mini.png', width: 28, height: 28},

        search: {
            provider: 'local',
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/xcancloud'}
        ]
    },

    locales: {
        root: {label: 'English', lang: 'en-US', link: '/en/', ...enLocaleConfig},      // 默认英语
        zh: {label: '简体中文', lang: 'zh-CN', link: '/zh/', ...zhLocaleConfig},      // 简体中文
        fr: {label: 'Français', lang: 'fr'},         // 法语
        de: {label: 'Deutsch', lang: 'de'},          // 德语
        ja: {label: '日本語', lang: 'ja'},            // 日语
        'zh-TW': {label: '繁體中文', lang: 'zh-TW'},   // 繁体中文
        pt: {label: 'Português', lang: 'pt'},        // 葡萄牙语
        ru: {label: 'Русский', lang: 'ru'},          // 俄语
        es: {label: 'Español', lang: 'es'},          // 西班牙语
        ko: {label: '한국어', lang: 'ko'},             // 韩语
        fa: {label: 'فارسی', lang: 'fa'}             // 波斯语
    },

    vite: {
        server: server
    }
})
