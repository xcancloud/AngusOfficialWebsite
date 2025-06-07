import type {DefaultTheme} from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
    {
        text: '帮助中心',
        items: [
            {
                text: '产品文档',
                items: [
                    {
                        text: 'AngusGM',
                        link: '/docs/gm/introduction/about'
                    },
                    {
                        text: 'AngusTester',
                        link: '/docs/tester/introduction/about'
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
        text: 'AngusGM',
        collapsed: true,
        items: [
            {
                text: '关于应用',
                link: '/docs/gm/introduction/about',
            },
            {
                text: '功能总览',
                link: '/docs/gm/introduction/feature',
            },
            {
                text: '基本概念',
                link: '/docs/gm/introduction/concepts',
            },
            {
                text: '资源配额',
                link: '/docs/gm/introduction/quotas',
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

export const testerDocsSidebar: DefaultTheme.SidebarItem[] = [
    {
        text: 'AngusTester',
        collapsed: true,
        base: '/docs/tester/introduction',
        items: [
            {
                text: '关于应用',
                link: '/about',
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
        text: '安装应用',
        collapsed: true,
        base: '/docs/tester/installation',
        items: [
            {
                text: '前置准备',
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
        base: '/docs/tester/quickStarted',
        items: [
            {
                text: '如何调试接口',
                link: '/debugApi',
            },
            {
                text: '如何快速创建一个脚本',
                link: '/creatScript',
            },
            {
                text: '如何运行测试脚本',
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
                text: '如何导入外部接口',
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
                base: '/docs/tester/ui/project',
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
                        text: '标签管理',
                        link: '/tag',
                    }
                ]
            },
            {
                text: '配置',
                collapsed: true,
                base: '/docs/tester/ui/configuration',
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
                base: '/docs/tester/ui/kanban',
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
                base: '/docs/tester/ui/task',
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
                        text: '版本管理',
                        link: '/versionManagement',
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
                base: '/docs/tester/ui/function',
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
                base: '/docs/tester/ui/apis',
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
                        text: '设计介绍',
                        link: '/designIntroduction',
                    },
                    {
                        text: '设计管理',
                        link: '/designManagement',
                    },
                    {
                        text: '分享介绍',
                        link: '/shareIntroduction',
                    },
                    {
                        text: '分享管理',
                        link: '/shareManagement',
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
                base: '/docs/tester/ui/scenarios',
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
                base: '/docs/tester/ui/script',
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
                base: '/docs/tester/ui/data',
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
                base: '/docs/tester/ui/execution',
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
                base: '/docs/tester/ui/mock',
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
                base: '/docs/tester/ui/report',
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
        base: '/docs/tester/indicator',
        items: [
            {
                text: '研发管理指标',
                link: '/RD',
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
        base: '/docs/tester/testing',
        items: [
            {
                text: '测试定义',
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
        text: '测试规范',
        collapsed: true,
        items: [
            {
                text: '规范介绍',
                link: '/docs/tester/specification/introduction',
            },
            {
                text: '规范内容',
                collapsed: true,
                base: '/docs/tester/specification/content',
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
                        link: '/executionConfiguration',
                    },
                    {
                        text: '任务',
                        collapsed: true,
                        link: '/task',
                        base: '/docs/tester/specification/content',
                        items: [
                            {
                                text: '插件配置参数',
                                link: '/task/pluginConfiguration',
                            },
                            {
                                text: '测试任务编排',
                                collapsed: true,
                                base: '/docs/tester/specification/content/task/elements',
                                items: [
                                    {
                                        text: '控制器元素',
                                        link: '/controller',
                                    },
                                    {
                                        text: 'Http测试任务',
                                        link: '/http',
                                    },
                                    {
                                        text: 'WebSocket测试任务',
                                        link: '/websocket',
                                    },
                                    {
                                        text: 'Jdbc测试任务',
                                        link: '/jdbc',
                                    },
                                    {
                                        text: 'Ftp测试任务',
                                        link: '/ftp',
                                    },
                                    {
                                        text: 'Ldap测试任务',
                                        link: '/ldap',
                                    },
                                    {
                                        text: 'Mail测试任务',
                                        link: '/mail',
                                    },
                                    {
                                        text: 'Smtp测试任务',
                                        link: '/smtp',
                                    },
                                    {
                                        text: 'Tcp测试任务',
                                        link: '/tcp',
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
                            },
                            {
                                text: '参数化',
                                link: '/task/parameterization',
                            },
                        ]
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
        base: '/docs/tester/mock',
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
        text: 'CLI',
        link: '/docs/tester/command/AngusRunner',
    },
    {
        text: 'FAQ',
        collapsed: true,
        base: '/docs/tester/faq',
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
    }
]
