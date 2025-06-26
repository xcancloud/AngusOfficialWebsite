import type {DefaultTheme, LocaleSpecificConfig} from 'vitepress'
import { useSidebar } from 'vitepress-openapi'

const title = '晓蚕云';
const description = 'AngusTester - 让中小企业搭建自己的研发中台 · 规范流程 · 提升效率'
import gmZhSpec from '../../zh/docs/gm/apis/AngusGM-Api.json'
import testerZhSpec from '../../zh/docs/tester/apis/AngusTester-Api.json'

export const zhLocaleConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    lang: 'zh-CN',
    title: title,
    description: description,

    themeConfig: {
        nav: nav(),
        sidebar: {
            '/zh/docs/gm/': {base: '/zh/docs/gm/', items: gmDocsSidebar()},
            '/zh/docs/tester/': {base: '/zh/docs/tester/', items: testerDocsSidebar()}
        },
        footer: {
            message: '基于 GPL-3.0 许可发布',
            copyright: `版权所有 © 2021-2025 晓蚕云`
        },

        outline: {
            label: '导航',
            level: "deep"
        },

        search: {
            provider: 'local',
            options: searchOptions()
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        lastUpdated: {
            text: '最后更新于'
        },

        notFound: {
            title: '页面未找到',
            quote: '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
            linkLabel: '前往首页',
            linkText: '带我回首页'
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        skipToContentLabel: '跳转到内容'
    },
};

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: '帮助中心',
            items: [
                {
                    text: '产品文档',
                    items: [
                        {
                            text: 'AngusGM',
                            link: '/zh/docs/gm/introduction/about',
                        },
                        {
                            text: 'AngusTester',
                            link: '/zh/docs/tester/introduction/about',
                            activeMatch: '/zh/docs/tester/'
                        }
                    ]
                },
                {
                    text: '快速入门',
                    link: '/zh/gettingStarted'
                },
                {
                    text: '私有部署',
                    link: '/zh/deployment'
                },
                {
                    text: '技术支持',
                    link: '/zh/support'
                },
                {
                    text: '常见问题(FAQ)',
                    link: '/zh/faq'
                }
            ]
        },
        {
            text: '场景介绍',
            items: [
                {
                    text: '业务场景',
                    link: '/zh/scenario/business'
                },
                {
                    text: 'AI 场景',
                    link: '/zh/scenario/ai'
                }
            ]
        },
        {text: '专题博客', link: '/zh/blog/index'},
        {text: '视频教学', link: '/zh/video'},
        {text: '购买&定价', items: [
            {
                text: '定价',
                link: '/zh/pricing'
            },
            {
                text: 'AngusTester 云服务版',
                link: '/zh/purchase/angusCloud'
            },
            {
                text: 'AngusTester 私有化版',
                link: '/zh/purchase/angusPriv'
            },
            {
                text: '节点购买',
                link: '/zh/purchase/node'
            },
        ]}
    ]
}

function gmDocsSidebar(): DefaultTheme.SidebarItem[] {

    const spec = gmZhSpec;
    const apiSidebar = useSidebar({
        spec,
        linkPrefix: '/apis/'
    });

    return [
        {
            text: 'AngusGM',
            collapsed: true,
            base: '/zh/docs/gm/introduction',
            items: [
                {
                    text: '关于应用',
                    link: '/about',
                },
                {
                    text: '功能总览',
                    link: '/function',
                },
                {
                    text: '基本概念',
                    link: '/concepts',
                },
                {
                    text: '产品版本',
                    link: '/edition',
                },
                {
                    text: '部署方式',
                    link: '/deployment',
                },
                {
                    text: '资源配额',
                    link: '/quotas',
                }
            ]
        },
        {
            text: '部署应用',
            collapsed: true,
            base: '/zh/docs/gm/installation',
            items: [
                {
                    text: '安装须知',
                    link: '/prerequisites',
                },
                {
                    text: '安装AngusGM',
                    link: '/AngusGM',
                }
            ]
        },
        {
            text: "用户界面",
            collapsed: true,
            items: [
                {
                    text: '组织人员',
                    collapsed: true,
                    items: [
                        {
                            text: '用户',
                            link: '/overview',
                            collapsed: true,
                            base: '/zh/docs/gm/organization/user',
                            items: [
                                {
                                    text: '添加用户',
                                    link: '/add',
                                },
                                {
                                    text: '编辑用户',
                                    link: '/edit',
                                },
                                {
                                    text: '删除用户',
                                    link: '/delete',
                                },
                                {
                                    text: '禁用用户',
                                    link: '/disable',
                                },
                                {
                                    text: '重置密码',
                                    link: '/resetPassword',
                                },
                                {
                                    text: '锁定用户',
                                    link: '/lock',
                                },
                                {
                                    text: '设置默认身份(角色)',
                                    link: '/defaultRole',
                                },
                                {
                                    text: '查看用户信息',
                                    link: '/detail',
                                },
                                {
                                    text: '查看用户统计',
                                    link: '/statistics',
                                },
                                {
                                    text: '授权用户策略',
                                    link: '/grantPolicy',
                                },
                                {
                                    text: '关联用户部门',
                                    link: '/assocDepartment',
                                },
                                {
                                    text: '关联用户组',
                                    link: '/assocGroup',
                                },
                                {
                                    text: '关联用户标签',
                                    link: '/assocTag',
                                }
                            ],
                        },
                        {
                            text: '部门',
                            link: '/overview',
                            collapsed: true,
                            base: '/zh/docs/gm/organization/department',
                            items: [
                                {
                                    text: '添加部门',
                                    link: '/add',
                                },
                                {
                                    text: '添加子部门',
                                    link: '/addSub',
                                },
                                {
                                    text: '编辑部门',
                                    link: '/edit',
                                },
                                {
                                    text: '删除部门',
                                    link: '/delete',
                                },
                                {
                                    text: '移动部门',
                                    link: '/move',
                                },
                                {
                                    text: '查看部门信息',
                                    link: '/detail',
                                },
                                {
                                    text: '查看部门统计',
                                    link: '/statistics',
                                },
                                {
                                    text: '授权部门策略',
                                    link: '/grantPolicy',
                                },
                                {
                                    text: '关联部门用户',
                                    link: '/assocUser',
                                },
                                {
                                    text: '关联部门标签',
                                    link: '/assocTag',
                                }
                            ],
                        },
                        {
                            text: '组',
                            link: '/overview',
                            collapsed: true,
                            base: '/zh/docs/gm/organization/group',
                            items: [
                                {
                                    text: '添加组',
                                    link: '/add',
                                },
                                {
                                    text: '编辑组',
                                    link: '/edit',
                                },
                                {
                                    text: '删除组',
                                    link: '/delete',
                                },
                                {
                                    text: '禁用组',
                                    link: '/disable',
                                },
                                {
                                    text: '查看组信息',
                                    link: '/detail',
                                },
                                {
                                    text: '查看组统计',
                                    link: '/statistics',
                                },
                                {
                                    text: '授权组策略',
                                    link: '/grantPolicy',
                                },
                                {
                                    text: '关联组用户',
                                    link: '/assocUser',
                                },
                                {
                                    text: '关联组标签',
                                    link: '/assocTag',
                                }
                            ],
                        },
                        {
                            text: '标签',
                            link: '/overview',
                            collapsed: true,
                            base: '/zh/docs/gm/organization/tag',
                            items: [
                                {
                                    text: '添加标签',
                                    link: '/add',
                                },
                                {
                                    text: '编辑标签',
                                    link: '/edit',
                                },
                                {
                                    text: '删除标签',
                                    link: '/delete',
                                },
                                {
                                    text: '查看标签统计',
                                    link: '/statistics',
                                },
                                {
                                    text: '查看关联对象',
                                    link: '/assocOrg',
                                }
                            ]
                        }
                    ],
                },
                {
                    text: '全局权限',
                    collapsed: true,
                    items: [
                        {
                            text: '权限策略',
                            link: '/overview',
                            collapsed: true,
                            base: '/zh/docs/gm/permissions/policy',
                            items: [
                                {
                                    text: '添加权限策略',
                                    link: '/add',
                                },
                                {
                                    text: '设置应用默认授权',
                                    link: '/setAppDefault',
                                },
                                {
                                    text: '查看权限列表',
                                    link: '/list',
                                },
                                {
                                    text: '查看权限详细',
                                    link: '/detail',
                                },
                                {
                                    text: '禁用权限策略',
                                    link: '/disable',
                                },
                                {
                                    text: '删除权限策略',
                                    link: '/delete',
                                },
                                {
                                    text: '修改权限策略',
                                    link: '/edit',
                                },
                                {
                                    text: '授权权限策略',
                                    link: '/grant',
                                }
                            ]
                        },
                        {
                            text: '查看授权',
                            link: '/overview',
                            collapsed: true,
                            base: '/zh/docs/gm/permissions/view',
                            items: [
                                {
                                    text: '查看授权用户权限',
                                    link: '/viewUserPermissions',
                                },
                                {
                                    text: '取消授权用户权限',
                                    link: '/cancelUserPermissions',
                                },
                                {
                                    text: '查看授权部门权限',
                                    link: '/viewDepartmentPermissions',
                                },
                                {
                                    text: '取消授权部门权限',
                                    link: '/cancelDepartmentPermissions',
                                },
                                {
                                    text: '查看授权组权限',
                                    link: '/viewGroupPermissions',
                                },
                                {
                                    text: '取消授权组权限',
                                    link: '/cancelGroupPermissions',
                                }
                            ]
                        }
                    ],
                },
                {
                    text: '公告与消息',
                    collapsed: true,
                    items: [
                        {
                            text: '公告',
                            collapsed: true,
                            base: '/zh/docs/gm/messages/notice',
                            link: '/overview',
                            items: [
                                {
                                    text: '发布公告(通知)',
                                    link: '/publish',
                                },
                                {
                                    text: '删除公告',
                                    link: '/delete',
                                },
                                {
                                    text: '查看公告信息',
                                    link: '/detail',
                                },
                                {
                                    text: '查看公告统计',
                                    link: '/statistics',
                                }
                            ]
                        },
                        {
                            text: '消息',
                            collapsed: true,
                            base: '/zh/docs/gm/messages/messages',
                            link: '/overview',
                            items: [
                                {
                                    text: '发送消息',
                                    link: '/send',
                                },
                                {
                                    text: '查看消息内容',
                                    link: '/content',
                                },
                                {
                                    text: '查看消息统计',
                                    link: '/statistics',
                                }
                            ]
                        },
                    ],
                },
                {
                    text: '商店',
                    collapsed: true,
                    items: [
                        {
                            text: '云商店',
                            collapsed: true,
                            base: '/zh/docs/gm/store/cloudStore',
                            link: '/overview',
                            items: [
                                {
                                    text: '查看商品',
                                    link: '/view',
                                },
                                {
                                    text: '购买商品',
                                    link: '/buy',
                                }
                            ]
                        },
                        {
                            text: '我的商品',
                            collapsed: true,
                            base: '/zh/docs/gm/store/myGoods',
                            link: '/overview',
                            items: [
                                {
                                    text: '查看我的商品',
                                    link: '/view',
                                },
                                {
                                    text: '下载我的商品',
                                    link: '/download',
                                }
                            ]
                        },
                        {
                            text: '我的许可',
                            collapsed: true,
                            base: '/zh/docs/gm/store/myLicense',
                            link: '/overview',
                            items: [
                                {
                                    text: '查看我的许可',
                                    link: '/view',
                                },
                                {
                                    text: '下载我的许可',
                                    link: '/download',
                                }
                            ]
                        },
                    ],
                },
                {
                    text: '系统',
                    collapsed: true,
                    base: '/zh/docs/gm/system',
                    items: [
                        {
                            text: '系统版本',
                            link: '/systemVersion/overview',
                        },
                        {
                            text: '实名认证',
                            collapsed: true,
                            base: '/zh/docs/gm/system/realName',
                            link: '/overview',
                            items: [
                                {
                                    text: '实名认证',
                                    link: '/auth',
                                },
                                {
                                    text: '查看认证',
                                    link: '/view',
                                }
                            ]
                        },
                        {
                            text: '安全设置',
                            collapsed: true,
                            base: '/zh/docs/gm/system/securitySetting',
                            link: '/overview',
                            items: [
                                {
                                    text: '登录限制',
                                    link: '/signinLimit',
                                },
                                {
                                    text: '允许注册',
                                    link: '/signupAllow',
                                },
                                {
                                    text: '修改密码策略',
                                    link: '/editPasswordPolicy',
                                },
                                {
                                    text: '注册账号',
                                    link: '/cancelSign',
                                },
                                {
                                    text: '安全告警',
                                    link: '/securityAlert',
                                }
                            ]
                        },
                        {
                            text: '邮箱配置',
                            collapsed: true,
                            items: [
                                {
                                    text: '邮件服务器',
                                    collapsed: true,
                                    base: '/zh/docs/gm/system/email/server',
                                    link: '/overview',
                                    items: [
                                        {
                                            text: '添加邮件服务器',
                                            link: '/add',
                                        },
                                        {
                                            text: '编辑邮件服务器',
                                            link: '/edit',
                                        },
                                        {
                                            text: '设置默认邮件服务器',
                                            link: '/setDefault',
                                        },
                                        {
                                            text: '删除邮件服务器',
                                            link: '/delete',
                                        },
                                        {
                                            text: '测试邮件服务器',
                                            link: '/test',
                                        }
                                    ]
                                },
                                {
                                    text: '发送记录',
                                    collapsed: true,
                                    base: '/zh/docs/gm/system/email/record',
                                    link: '/overview',
                                    items: [
                                        {
                                            text: '查看发送记录',
                                            link: '/view',
                                        },
                                        {
                                            text: '查看发送记录统计',
                                            link: '/statistics',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: '短信配置',
                            collapsed: true,
                            items: [
                                {
                                    text: '短信通道',
                                    collapsed: true,
                                    base: '/zh/docs/gm/system/sms/channel',
                                    link: '/overview',
                                    items: [
                                        {
                                            text: '配置短信通道',
                                            link: '/edit',
                                        },
                                        {
                                            text: '测试短信通道',
                                            link: '/test',
                                        },
                                        {
                                            text: '启用或禁用短信通道',
                                            link: '/enableOrDisable',
                                        }
                                    ]
                                },
                                {
                                    text: '短信模版',
                                    collapsed: true,
                                    base: '/zh/docs/gm/system/sms/template',
                                    link: '/overview',
                                    items: [
                                        {
                                            text: '查看短信模版',
                                            link: '/view',
                                        },
                                        {
                                            text: '编辑短信模版',
                                            link: '/edit',
                                        }
                                    ]
                                },
                                {
                                    text: '发送记录',
                                    collapsed: true,
                                    base: '/zh/docs/gm/system/sms/record',
                                    link: '/overview',
                                    items: [
                                        {
                                            text: '查看发送记录',
                                            link: '/view',
                                        },
                                        {
                                            text: '查看发送记录统计',
                                            link: '/statistics',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: '事件配置',
                            collapsed: true,
                            items: [
                                {
                                    text: '接收通道',
                                    collapsed: true,
                                    base: '/zh/docs/gm/system/event/channel',
                                    link: '/overview',
                                    items: [
                                        {
                                            text: '配置WebHook',
                                            link: '/editWebHook',
                                        },
                                        {
                                            text: '配置邮件组',
                                            link: '/editEmailGroup',
                                        },
                                        {
                                            text: '配置钉钉机器人',
                                            link: '/editDingRobot',
                                        },
                                        {
                                            text: '配置企业微信机器人',
                                            link: '/editWXRobot',
                                        }
                                    ]
                                },
                                {
                                    text: '事件模版',
                                    collapsed: true,
                                    base: '/zh/docs/gm/system/event/template',
                                    link: '/overview',
                                    items: [
                                        {
                                            text: '查看事件模版',
                                            link: '/view',
                                        },
                                        {
                                            text: '编辑事件模版',
                                            link: '/edit',
                                        }
                                    ]
                                },
                                {
                                    text: '事件记录',
                                    collapsed: true,
                                    base: '/zh/docs/gm/system/event/record',
                                    link: '/overview',
                                    items: [
                                        {
                                            text: '查看事件记录',
                                            link: '/view',
                                        },
                                        {
                                            text: '查看事件记录统计',
                                            link: '/statistics',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: '审计日志',
                            collapsed: true,
                            items: [
                                {
                                    text: '操作日志',
                                    collapsed: true,
                                    base: '/zh/docs/gm/system/log/operation',
                                    link: '/overview',
                                    items: [
                                        {
                                            text: '查看操作日志',
                                            link: '/view',
                                        },
                                        {
                                            text: '查看操作日志统计',
                                            link: '/statistics',
                                        }
                                    ]
                                },
                                {
                                    text: '系统日志',
                                    collapsed: true,
                                    base: '/zh/docs/gm/system/log/system',
                                    link: '/overview',
                                    items: [
                                        {
                                            text: '查看系统日志',
                                            link: '/view',
                                        }
                                    ]
                                },
                                {
                                    text: '请求日志',
                                    collapsed: true,
                                    base: '/zh/docs/gm/system/log/request',
                                    link: '/overview',
                                    items: [
                                        {
                                            text: '查看请求日志',
                                            link: '/view',
                                        },
                                        {
                                            text: '查看请求日志统计',
                                            link: '/statistics',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: 'LDAP',
                            collapsed: true,
                            base: '/zh/docs/gm/system/ldap',
                            link: '/overview',
                            items: [
                                {
                                    text: '添加目录',
                                    link: '/add',
                                },
                                {
                                    text: '修改目录',
                                    link: '/edit',
                                },
                                {
                                    text: '测试目录',
                                    link: '/test',
                                },
                                {
                                    text: '同步目录',
                                    link: '/sync',
                                },
                                {
                                    text: '移动目录',
                                    link: '/move',
                                },
                                {
                                    text: '删除目录',
                                    link: '/delete',
                                },
                                {
                                    text: '删除目录和数据',
                                    link: '/deleteAll',
                                },
                                {
                                    text: '禁用目录',
                                    link: '/disable',
                                }
                            ]
                        },
                        {
                            text: '资源配额',
                            collapsed: true,
                            base: '/zh/docs/gm/system/resourceQuota',
                            link: '/overview',
                            items: [
                                {
                                    text: '查看资源配额',
                                    link: '/view',
                                },
                                {
                                    text: '修改资源配额',
                                    link: '/edit',
                                },
                                {
                                    text: '提交修改配额工单',
                                    link: '/submitWorkOrder',
                                }
                            ]
                        },
                        {
                            text: '应用存储',
                            collapsed: true,
                            base: '/zh/docs/gm/system/appStorage',
                            link: '/overview',
                            items: [
                                {
                                    text: '查看应用数据存储',
                                    link: '/viewAppStorage',
                                },
                                {
                                    text: '查看业务数据存储',
                                    link: '/viewBusinessStorage',
                                },
                                {
                                    text: '修改业务数据存储类型',
                                    link: '/editBusinessStorage',
                                }
                            ]
                        },
                        {
                            text: '在线用户',
                            collapsed: true,
                            base: '/zh/docs/gm/system/onlineUser',
                            link: '/overview',
                            items: [
                                {
                                    text: '查看在线用户',
                                    link: '/view',
                                },
                                {
                                    text: '强制退出用户',
                                    link: '/quit',
                                }
                            ]
                        },
                        {
                            text: '外观',
                            collapsed: true,
                            base: '/zh/docs/gm/system/appearance',
                            link: '/overview',
                            items: [
                                {
                                    text: '查看站点应用',
                                    link: '/viewSite',
                                },
                                {
                                    text: '修改站点应用',
                                    link: '/editSite',
                                }
                            ]
                        },
                        {
                            text: '系统令牌',
                            collapsed: true,
                            base: '/zh/docs/gm/system/systemToken',
                            link: '/overview',
                            items: [
                                {
                                    text: '添加系统令牌',
                                    link: '/add',
                                },
                                {
                                    text: '查看系统令牌',
                                    link: '/view',
                                },
                                {
                                    text: '删除系统令牌',
                                    link: '/delete',
                                }
                            ]
                        },
                    ],
                },
            ]
        },
        {
            text: '常见问题 (FAQ)',
            collapsed: true,
            base: '/zh/docs/gm/faq',
            items: [
                {
                    text: '配额相关问题',
                    link: '/quota',
                },
                {
                    text: '安装部署相关问题',
                    link: '/deployment',
                },
                {
                    text: '权限相关问题',
                    link: '/permission',
                }
            ]
        },
        {
            text: "接口参考",
            collapsed: true,
            items: [
                {
                    text: '接口说明',
                    link: '/apis/introduction',
                },
                {
                    text: '接口定义',
                    collapsed: true,
                    items: apiSidebar.itemsByTags({linkPrefix: "/apis/"})
                }
            ]
        }
    ]
}

function testerDocsSidebar(): DefaultTheme.SidebarItem[] {
    const spec = testerZhSpec;
    const apiSidebar = useSidebar({
        spec,
        linkPrefix: '/apis/'
    });

    return [
        {
            text: 'AngusTester',
            collapsed: true,
            base: '/zh/docs/tester/introduction',
            items: [
                {
                    text: '关于应用',
                    link: '/about',
                },
                {
                    text: '核心业务',
                    link: '/business',
                },
                {
                    text: '产品特性',
                    link: '/feature',
                },
                {
                    text: '插件化实现',
                    link: '/plugin',
                },
                {
                    text: '产品版本',
                    link: '/edition',
                },
                {
                    text: '部署方式',
                    link: '/deployment',
                },
                {
                    text: '应用场景',
                    link: '/scenarios',
                },
                {
                    text: '资源配额',
                    link: '/quotas',
                }
            ]
        },
        {
            text: '部署应用',
            collapsed: true,
            base: '/zh/docs/tester/installation',
            items: [
                {
                    text: '安装须知',
                    link: '/prerequisites',
                },
                {
                    text: '安装AngusTester',
                    link: '/AngusTester',
                },
                {
                    text: '安装AngusAgent',
                    link: '/AngusAgent',
                },
                {
                    text: '安装AngusProxy',
                    link: '/AngusProxy',
                },
                {
                    text: '安装AngusMockService',
                    link: '/AngusMockService',
                },
                {
                    text: '安装AngusRunner',
                    link: '/AngusRunner',
                }
            ]
        },
        {
            text: '快速开始',
            collapsed: true,
            base: '/zh/docs/tester/quickStarted',
            items: [
                {
                    text: '如何快速调试接口',
                    link: '/debugApi',
                },
                {
                    text: '如何快速创建一个脚本',
                    link: '/creatScript',
                },
                {
                    text: '如何快速运行测试脚本',
                    link: '/runScript',
                },
                {
                    text: '如何快速生成接口测试脚本',
                    link: '/generateScriptByApi',
                },
                {
                    text: '如何快速生成接口测试任务',
                    link: '/generateTaskByApi',
                },
                {
                    text: '如何快速导入外部接口',
                    link: '/importOuterApis',
                },
                {
                    text: '如何获取许可',
                    link: '/getSoftwareLicense',
                }
            ]
        },
        {
            text: '用户界面',
            collapsed: true,
            items: [
                {
                    text: '项目',
                    collapsed: true,
                    base: '/zh/docs/tester/ui/project',
                    items: [
                        {
                            text: '项目介绍',
                            link: '/introduction',
                        },
                        {
                            text: '项目流程',
                            link: '/flow',
                        },
                        {
                            text: '项目管理',
                            link: '/management',
                        },
                        {
                            text: '模块管理',
                            link: '/module',
                        },
                        {
                            text: '版本管理',
                            link: '/softwareVersion',
                        },
                        {
                            text: '标签管理',
                            link: '/tag',
                        }
                    ]
                },
                {
                    text: '配置',
                    collapsed: true,
                    base: '/zh/docs/tester/ui/configuration',
                    items: [
                        {
                            text: '应用配置',
                            link: '/application',
                        },
                        {
                            text: '指标配置',
                            link: '/indicator',
                        },
                        {
                            text: '事件配置',
                            link: '/event',
                        },
                        {
                            text: '节点配置',
                            link: '/node',
                        },
                        {
                            text: '代理配置',
                            link: '/agent',
                        },
                    ]
                },
                {
                    text: '看板',
                    collapsed: true,
                    base: '/zh/docs/tester/ui/kanban',
                    items: [
                        {
                            text: 'CTO看板',
                            link: '/cto',
                        },
                        {
                            text: '数据资产看板',
                            link: '/dataAsset',
                        },
                        {
                            text: '效能统计看板',
                            link: '/effectivenessStatistics',
                        },
                    ]
                },
                {
                    text: '任务',
                    collapsed: true,
                    base: '/zh/docs/tester/ui/task',
                    items: [
                        {
                            text: '敏捷开发介绍',
                            link: '/agileIntroduction',
                        },
                        {
                            text: 'Backlog介绍',
                            link: '/backlogIntroduction',
                        },
                        {
                            text: 'Backlog管理',
                            link: '/backlogManagement',
                        },
                        {
                            text: '迭代介绍',
                            link: '/sprintIntroduction',
                        },
                        {
                            text: '迭代管理',
                            link: '/sprintManagement',
                        },
                        {
                            text: '研发任务介绍',
                            link: '/taskIntroduction',
                        },
                        {
                            text: '研发任务管理',
                            link: '/taskManagement',
                        },
                        {
                            text: '敏捷会议介绍',
                            link: '/meetingIntroduction',
                        },
                        {
                            text: '敏捷会议管理',
                            link: '/meetingManagement',
                        },
                        {
                            text: '分析管理',
                            link: '/analysisManagement',
                        },
                    ]
                },
                {
                    text: '功能',
                    collapsed: true,
                    base: '/zh/docs/tester/ui/function',
                    items: [
                        {
                            text: '敏捷测试介绍',
                            link: '/agileIntroduction',
                        },
                        {
                            text: '测试计划介绍',
                            link: '/planIntroduction',
                        },
                        {
                            text: '测试计划管理',
                            link: '/planManagement',
                        },
                        {
                            text: '功能用例介绍',
                            link: '/caseIntroduction',
                        },
                        {
                            text: '功能用例管理',
                            link: '/caseManagement',
                        },
                        {
                            text: '用例评审介绍',
                            link: '/reviewIntroduction',
                        },
                        {
                            text: '用例评审管理',
                            link: '/reviewManagement',
                        },
                        {
                            text: '用例基线介绍',
                            link: '/baselineIntroduction',
                        },
                        {
                            text: '用例基线管理',
                            link: '/baselineManagement',
                        },
                        {
                            text: '分析管理',
                            link: '/analysisManagement',
                        },
                    ]
                },
                {
                    text: '接口',
                    collapsed: true,
                    base: '/zh/docs/tester/ui/apis',
                    items: [
                        {
                            text: '服务介绍',
                            link: '/servicesIntroduction',
                        },
                        {
                            text: '服务管理',
                            link: '/servicesManagement',
                        },
                        {
                            text: '接口介绍',
                            link: '/apisIntroduction',
                        },
                        {
                            text: '接口管理',
                            link: '/apisManagement',
                        },
                        {
                            text: '接口设计介绍',
                            link: '/apiDesignIntroduction',
                        },
                        {
                            text: '接口设计管理',
                            link: '/apiDesignManagement',
                        },
                        {
                            text: '接口分享介绍',
                            link: '/apiShareIntroduction',
                        },
                        {
                            text: '接口分享管理',
                            link: '/apiShareManagement',
                        },
                        {
                            text: '服务器介绍',
                            link: '/serverIntroduction',
                        },
                        {
                            text: '服务器管理',
                            link: '/serverManagement',
                        },
                    ]
                },
                {
                    text: '场景',
                    collapsed: true,
                    base: '/zh/docs/tester/ui/scenarios',
                    items: [
                        {
                            text: '场景介绍',
                            link: '/introduction',
                        },
                        {
                            text: '场景管理',
                            link: '/management',
                        },
                        {
                            text: '场景监控介绍',
                            link: '/monitorIntroduction',
                        },
                        {
                            text: '场景监控管理',
                            link: '/monitorManagement',
                        }
                    ]
                },
                {
                    text: '脚本',
                    collapsed: true,
                    base: '/zh/docs/tester/ui/script',
                    items: [
                        {
                            text: '脚本介绍',
                            link: '/introduction',
                        },
                        {
                            text: '脚本管理',
                            link: '/management',
                        },
                    ]
                },
                {
                    text: '数据',
                    collapsed: true,
                    base: '/zh/docs/tester/ui/data',
                    items: [
                        {
                            text: '数据介绍',
                            link: '/introduction',
                        },
                        {
                            text: '变量管理',
                            link: '/variable',
                        },
                        {
                            text: '数据集管理',
                            link: '/dataset',
                        },
                        {
                            text: '文件管理',
                            link: '/file',
                        },
                        {
                            text: '数据源管理',
                            link: '/datasource',
                        },
                    ]
                },
                {
                    text: '执行',
                    collapsed: true,
                    base: '/zh/docs/tester/ui/execution',
                    items: [
                        {
                            text: '执行介绍',
                            link: '/introduction',
                        },
                        {
                            text: '执行管理',
                            link: '/management',
                        },
                    ]
                },
                {
                    text: 'Mock',
                    collapsed: true,
                    base: '/zh/docs/tester/ui/mock',
                    items: [
                        {
                            text: 'Mock服务介绍',
                            link: '/introduction',
                        },
                        {
                            text: 'Mock服务管理',
                            link: '/management',
                        },
                        {
                            text: 'Mock接口管理',
                            link: '/apisManagement',
                        },
                    ]
                },
                {
                    text: '报告',
                    collapsed: true,
                    base: '/zh/docs/tester/ui/report',
                    items: [
                        {
                            text: '报告介绍',
                            link: '/introduction',
                        },
                        {
                            text: '报告管理',
                            link: '/management',
                        },
                    ]
                }
            ]
        },
        {
            text: '产品指标',
            collapsed: true,
            base: '/zh/docs/tester/indicator',
            items: [
                {
                    text: '研发管理指标',
                    link: '/development',
                },
                {
                    text: '测试管理指标',
                    link: '/testing',
                },
                {
                    text: '性能测试指标',
                    link: '/performance',
                },
                {
                    text: '节点监控指标',
                    link: '/node',
                }
            ]
        },
        {
            text: '测试定义',
            collapsed: true,
            base: '/zh/docs/tester/testing',
            items: [
                {
                    text: '测试类型',
                    link: '/definition',
                },
                {
                    text: '测试示例',
                    link: '/demo',
                },
                {
                    text: '测试服务',
                    link: '/service',
                }
            ]
        },
        {
            text: '脚本规范',
            collapsed: true,
            items: [
                {
                    text: '规范介绍',
                    link: '/specification/introduction',
                },
                {
                    text: '规范内容',
                    collapsed: true,
                    base: '/zh/docs/tester/specification/content',
                    items: [
                        {
                            text: '规范',
                            link: '/specification',
                        },
                        {
                            text: 'Api版本',
                            link: '/apiVersion',
                        },
                        {
                            text: '元信息',
                            link: '/info',
                        },
                        {
                            text: '标签',
                            link: '/tag',
                        },
                        {
                            text: '类型',
                            link: '/type',
                        },
                        {
                            text: '插件',
                            link: '/plugin',
                        },
                        {
                            text: '执行配置',
                            link: '/configuration',
                        },
                        {
                            text: '任务',
                            collapsed: true,
                            link: '/task',
                            base: '/zh/docs/tester/specification/content',
                            items: [
                                {
                                    text: '插件配置参数',
                                    link: '/task/pluginConfiguration',
                                },
                                {
                                    text: '测试任务编排',
                                    collapsed: true,
                                    link: "/pipeline",
                                    base: '/zh/docs/tester/specification/content/task',
                                    items: [
                                        {
                                            text: '控制器元素',
                                            link: '/elements/controller',
                                        },
                                        {
                                            text: 'Http测试任务',
                                            link: '/elements/http',
                                        },
                                        {
                                            text: 'WebSocket测试任务',
                                            link: '/elements/websocket',
                                        },
                                        {
                                            text: 'Jdbc测试任务',
                                            link: '/elements/jdbc',
                                        },
                                        {
                                            text: 'Ftp测试任务',
                                            link: '/elements/ftp',
                                        },
                                        {
                                            text: 'Ldap测试任务',
                                            link: '/elements/ldap',
                                        },
                                        {
                                            text: 'Mail测试任务',
                                            link: '/elements/mail',
                                        },
                                        {
                                            text: 'Smtp测试任务',
                                            link: '/elements/smtp',
                                        },
                                        {
                                            text: 'Tcp测试任务',
                                            link: '/elements/tcp',
                                        },
                                    ]
                                },
                                {
                                    text: '模拟数据任务',
                                    link: '/task/mockDataTask',
                                },
                                {
                                    text: '模拟接口任务',
                                    link: '/task/mockApisTask',
                                }
                            ]
                        },
                        {
                            text: '参数化',
                            link: '/parameterization',
                        },
                        {
                            text: '扩展字段',
                            link: '/extension',
                        }
                    ]
                }
            ]
        },
        {
            text: 'Mock',
            collapsed: true,
            base: '/zh/docs/tester/mock',
            items: [
                {
                    text: '模拟服务',
                    link: '/service',
                },
                {
                    text: '模拟接口',
                    link: '/api',
                },
                {
                    text: '模拟数据',
                    link: '/data',
                },
                {
                    text: '模拟函数',
                    link: '/function',
                }
            ]
        },
        {
            text: '命令行 (CLI)',
            collapsed: true,
            items: [
                {
                    text: 'AngusRunner CLI',
                    link: '/command/AngusRunner'
                }
            ]
        },
        {
            text: '常见问题 (FAQ)',
            collapsed: true,
            base: '/zh/docs/tester/faq',
            items: [
                {
                    text: 'Backlog相关问题',
                    link: '/backlog',
                },
                {
                    text: '产品迭代相关问题',
                    link: '/sprint',
                },
                {
                    text: '安装部署相关问题',
                    link: '/deployment',
                },
                {
                    text: '执行相关问题',
                    link: '/execution',
                },
                {
                    text: '报告相关问题',
                    link: '/report',
                },
            ]
        },
        {
            text: "接口参考",
            collapsed: true,
            items: [
                {
                    text: '接口说明',
                    link: '/apis/introduction',
                },
                {
                    text: '接口定义',
                    collapsed: true,
                    items: apiSidebar.itemsByTags({linkPrefix: "/apis/"})
                }
            ]
        }
    ]
}

function searchOptions(): Partial<DefaultTheme.AlgoliaSearchOptions> {
    return {
        placeholder: '搜索文档',
        translations: {
            button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
            },
            modal: {
                searchBox: {
                    resetButtonTitle: '清除查询条件',
                    resetButtonAriaLabel: '清除查询条件',
                    cancelButtonText: '取消',
                    cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                    recentSearchesTitle: '搜索历史',
                    noRecentSearchesText: '没有搜索历史',
                    saveRecentSearchButtonTitle: '保存至搜索历史',
                    removeRecentSearchButtonTitle: '从搜索历史中移除',
                    favoriteSearchesTitle: '收藏',
                    removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                    titleText: '无法获取结果',
                    helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                    selectText: '选择',
                    navigateText: '切换',
                    closeText: '关闭',
                    searchByText: '搜索提供者'
                },
                noResultsScreen: {
                    noResultsText: '无法找到相关结果',
                    suggestedQueryText: '你可以尝试查询',
                    reportMissingResultsText: '你认为该查询应该有结果？',
                    reportMissingResultsLinkText: '点击反馈'
                }
            }
        }
    }
}