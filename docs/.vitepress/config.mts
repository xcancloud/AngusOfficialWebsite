import {defineConfig} from 'vitepress';
import type {DefaultTheme} from 'vitepress';
import server from './dev-server';

const nav: DefaultTheme.NavItem[] = [

    {text: '帮助中心', link: '/help'},
    {
        text: '功能演示', // 合并场景演示和AI驱动
        items: [
            {
                text: '业务场景',
                link: '/business'
            },
            {
                text: 'AI 应用',
                link: '/ai'
            }
        ],
    },
    {text: '专题博客', link: '/blog'},
    {text: '视频教学', link: '/video'},
    {text: '定价', link: '/pricing'},
    {text: '技术支持', link: '/support'},
    {text: '私有化部署', link: '/deployment'},
    // { text: '价值观', link: '/values'}, -- 不要了
    // { text: 'Examples', link: '/example/markdown-examples' }
]

export default defineConfig({
    title: "XCan Cloud",
    description: "XCan Cloud Official WebSite (Https://www.xcan.cloud)",
    head: [
        ['script', {src: '/assets/iconfont/iconfont.js'}],
    ],
    themeConfig: {
        search: {
            provider: 'local',
        },
        nav: nav,
        sidebar: {
            '/example/': [
                {
                    text: 'Examples',
                    items: [
                        {text: 'Markdown Examples', link: '/example/markdown-examples'},
                        {text: 'Runtime API Examples', link: '/example/api-examples'},
                    ]
                }
            ],
            '/help/tester/': [
                {
                    text: 'AngusTester',
                    items: [
                        {text: '产品介绍', link: '/help/tester/introduce'},
                    ]
                }
            ],
            '/help/gm/': [
                {
                    text: 'AngusGM',
                    items: [
                        {text: '产品介绍', link: '/help/gm/introduce'},
                    ]
                }
            ]
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
