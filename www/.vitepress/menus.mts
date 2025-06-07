import type {DefaultTheme} from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
    {
        text: '帮助中心',
        items: [
            {
                text: '产品文档',
                items: [
                    {
                        text: 'AngusTester',
                        link: '/docs/tester'
                    },
                    {
                        text: 'AngusGM',
                        link: '/docs/gm/introduction/about'
                    }
                ]
            },
            {
                text: '快速入门',
                link: '/gettingStarted'
            },
            {
                text: '快速部署',
                link: '/deployment'
            },
            {
                text: '技术支持',
                link: '/support'
            },
            {
                text: '常见问题',
                link: '/faq'
            }
        ]
    },
    {
        text: '场景介绍',
        items: [
            {
                text: '业务场景',
                link: '/business'
            },
            {
                text: 'AI 场景',
                link: '/ai'
            }
        ]
    },
    {text: '专题博客', link: '/blog'},
    {text: '视频教学', link: '/video'},
    {text: '购买&定价', link: '/pricing'}
]

export const gmDocsSidebar: DefaultTheme.SidebarItem[] = [
    {
        text: '产品介绍',
        items: [
            {
                text: '关于应用',
                link: '/docs/gm/introduction/about',
            },
            {
                text: '功能总览',
                link: '/docs/gm/introduction/featureOverview',
            },
            {
                text: '基本概念',
                link: '/docs/gm/introduction/basicConcepts',
            },
            {
                text: '资源配额',
                link: '/docs/gm/introduction/resourceQuotas',
            }
        ]
    },
    {
        text: '组织人员',
        items: [
            {
                text: '用户',
                link: '/overview',
                collapsed: true,
                base: '/docs/gm/organization/user',
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
                        text: '关联用户组',
                        link: '/assocTag',
                    }
                ],
            },
            {
                text: '部门',
                link: '/overview',
                collapsed: true,
                base: '/docs/gm/organization/department',
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
                base: '/docs/gm/organization/group',
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
                base: '/docs/gm/organization/tag',
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
        items: [
            {
                text: '权限策略',
                link: '/overview',
                collapsed: true,
                base: '/docs/gm/permissions/policy',
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
                base: '/docs/gm/permissions/view',
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
        items: [
            {
                text: '公告',
                collapsed: true,
                base: '/docs/gm/messages/notice',
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
                base: '/docs/gm/messages/messages',
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
        items: [
            {
                text: '云商店',
                collapsed: true,
                base: '/docs/gm/store/cloudStore',
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
                base: '/docs/gm/store/myGoods',
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
                base: '/docs/gm/store/myLicense',
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
        items: [
            {
                text: '系统版本',
                link: '/docs/gm/system/systemVersion/overview',
            },
            {
                text: '实名认证',
                collapsed: true,
                base: '/docs/gm/system/realName',
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
                base: '/docs/gm/system/securitySetting',
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
                        base: '/docs/gm/system/email/server',
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
                        base: '/docs/gm/system/email/record',
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
                        base: '/docs/gm/system/sms/channel',
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
                        base: '/docs/gm/system/sms/template',
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
                        base: '/docs/gm/system/sms/record',
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
                        base: '/docs/gm/system/event/channel',
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
                        base: '/docs/gm/system/event/template',
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
                        base: '/docs/gm/system/event/record',
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
                        base: '/docs/gm/system/log/operation',
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
                    // TODO 系统日志
                    {
                        text: '请求日志',
                        collapsed: true,
                        base: '/docs/gm/system/log/request',
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
                base: '/docs/gm/system/ldap',
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
                base: '/docs/gm/system/resourceQuota',
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
                        text: '提交修改资源配额工单',
                        link: '/submitWorkOrder',
                    }
                ]
            },
            {
                text: '应用存储',
                collapsed: true,
                base: '/docs/gm/system/appStorage',
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
                base: '/docs/gm/system/onlineUser',
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
                base: '/docs/gm/system/appearance',
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
                base: '/docs/gm/system/systemToken',
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

export const testerDocsSidebar: DefaultTheme.SidebarItem[] = []
