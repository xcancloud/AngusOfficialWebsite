import { defineConfig } from 'vitepress';
import type { DefaultTheme } from 'vitepress';
import server from './dev-server';

const nav:DefaultTheme.NavItem[] = [
 
  { text: 'AngusTester',
    items: [
      {
        text: 'AngusTester',
        link: '/AngusTester'
      },
      {
        text: 'GM',
        link: '/gm'
      }
    ],
  },
  { text: '场景演示', link: '/demonstration' },
  { text: 'AI驱动', link: '/ai'},
  { text: '帮助中心', link: '/help' },
  { text: '专题博客', link: '/blog' },
  { text: '视频教学', link: '/video' },
  { text: '技术支持', link: '/support'},
  { text: '私有化部署', link: '/deployment' },
  { text: '价值观', link: '/values'},
  { text: 'Examples', link: '/example/markdown-examples' }
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "XCan Cloud",
  description: "A VitePress Site",
  head: [
    //<script src="src/iconfont/iconfont.js"></script>
    ['script', { src: '/assets/iconfont/iconfont.js' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,

    sidebar: {
      '/example/': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/example/markdown-examples' },
            { text: 'Runtime API Examples', link: '/example/api-examples' },
          ]
        }
      ],
      '/help/angusload/': [
        {
          text: 'AngusLoad',
          items: [
            { text: '产品介绍', link: '/help/angusload/introduce' },
          ]
        }
      ],
      '/help/gm/': [
        {
          text: 'GM',
          items: [
            { text: '产品介绍', link: '/help/gm/introduce' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  locales: {
    root: { label: '简体中文' },
    en: { label: 'English' },
    pt: { label: 'Português' },
    ru: { label: 'Русский' },
    es: { label: 'Español' },
    ko: { label: '한국어' },
    fa: { label: 'فارسی' }
  },
  vite: {
    server: server
  }
})
