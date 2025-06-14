import type {DefaultTheme, LocaleSpecificConfig} from 'vitepress'

const title = 'XCan Cloud';
const description = 'AngusTester - Enable small and medium-sized enterprises to build their own R&D platform · Standardize processes · Improve efficiency';

export const enLocaleConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    lang: 'en-US',
    title: title,
    description: description,

    themeConfig: {
        nav: nav(),
        sidebar: {
            '/en/docs/gm/': {base: '/en/docs/gm/', items: gmDocsSidebar()},
            '/en/docs/tester/': {base: '/en/docs/tester/', items: testerDocsSidebar()}
        },
        footer: {
            message: 'Released under the GPL-3.0 License.',
            copyright: 'Copyright © 2021-2025 XCan Cloud'
        },

        outline: {
            label: 'Navigation',
            level: "deep"
        },
    }
};

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: 'Help',
            items: [
                {
                    text: 'Documentation',
                    items: [
                        {
                            text: 'AngusGM',
                            link: '/en/docs/gm/introduction/about',
                            activeMatch: '/en/docs/gm/'
                        },
                        {
                            text: 'AngusTester',
                            link: '/en/docs/tester/introduction/about',
                            activeMatch: '/en/docs/tester/'
                        }
                    ]
                },
                {
                    text: 'Getting Started',
                    link: '/en/gettingStarted'
                },
                {
                    text: 'Private Deployment',
                    link: '/en/deployment'
                },
                {
                    text: 'Technical Support',
                    link: '/en/support'
                },
                {
                    text: 'FAQ',
                    link: '/en/faq'
                }
            ]
        },
        {
            text: 'Scenario',
            items: [
                {
                    text: 'Business',
                    link: '/en/scenario/business'
                },
                {
                    text: 'AI',
                    link: '/en/scenario/ai'
                }
            ]
        },
        {text: 'Blog', link: '/en/blog'},
        {text: 'Video', link: '/en/video'},
        {text: 'Pricing', link: '/en/pricing'}
    ]
}

function gmDocsSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'AngusGM',
            collapsed: true,
            base: "/en/docs/gm/introduction",
            items: [
                {
                    text: 'About',
                    link: '/about',
                },
                {
                    text: 'Function',
                    link: '/Function',
                },
                {
                    text: 'Concepts',
                    link: '/concepts',
                },
                {
                    text: 'Edition',
                    link: '/edition',
                },
                {
                    text: 'Deployment',
                    link: '/deployment',
                },
                {
                    text: 'Scenarios',
                    link: '/scenarios',
                },
                {
                    text: 'Quotas',
                    link: '/quotas',
                }
            ]
        },
        {
            text: "Application Installation",
            collapsed: true,
            base: "/en/docs/gm/installation",
            items: [
                {
                    text: "Prerequisites",
                    link: "/prerequisites"
                },
                {
                    text: "Install AngusGM",
                    link: "/AngusGM"
                }
            ]
        },
        {
            text: "User Interface (UI)",
            collapsed: true,
            items: [
                {
                    text: 'Organization',
                    collapsed: true,
                    items: [
                        {
                            text: 'User',
                            link: '/overview',
                            collapsed: true,
                            base: '/en/docs/gm/organization/user',
                            items: [
                                {
                                    text: "Add User",
                                    link: "/add",
                                },
                                {
                                    text: "Edit User",
                                    link: "/edit",
                                },
                                {
                                    text: "Delete User",
                                    link: "/delete",
                                },
                                {
                                    text: "Disable User",
                                    link: "/disable",
                                },
                                {
                                    text: "Reset Password",
                                    link: "/resetPassword",
                                },
                                {
                                    text: "Lock User",
                                    link: "/lock",
                                },
                                {
                                    text: "Set Default Role",
                                    link: "/defaultRole",
                                },
                                {
                                    text: "View User Information",
                                    link: "/detail",
                                },
                                {
                                    text: "View User Statistics",
                                    link: "/statistics",
                                },
                                {
                                    text: "Grant User Policies",
                                    link: "/grantPolicy",
                                },
                                {
                                    text: "Associate User Department",
                                    link: "/assocDepartment",
                                },
                                {
                                    text: "Associate User Group",
                                    link: "/assocGroup",
                                },
                                {
                                    text: "Associate User Tags",
                                    link: "/assocTag",
                                }
                            ],
                        },
                        {
                            text: 'Department',
                            link: '/overview',
                            collapsed: true,
                            base: '/en/docs/gm/organization/department',
                            items: [
                                {
                                    text: "Add Department",
                                    link: "/add"
                                },
                                {
                                    text: "Add Sub-department",
                                    link: "/addSub"
                                },
                                {
                                    text: "Edit Department",
                                    link: "/edit"
                                },
                                {
                                    text: "Delete Department",
                                    link: "/delete"
                                },
                                {
                                    text: "Move Department",
                                    link: "/move"
                                },
                                {
                                    text: "View Department Information",
                                    link: "/detail"
                                },
                                {
                                    text: "View Department Statistics",
                                    link: "/statistics"
                                },
                                {
                                    text: "Grant Department Policies",
                                    link: "/grantPolicy"
                                },
                                {
                                    text: "Associate Department Users",
                                    link: "/assocUser"
                                },
                                {
                                    text: "Associate Department Tags",
                                    link: "/assocTag"
                                }
                            ],
                        },
                        {
                            text: 'Group',
                            link: '/overview',
                            collapsed: true,
                            base: '/en/docs/gm/organization/group',
                            items: [
                                {
                                    text: "Add Group",
                                    link: "/add"
                                },
                                {
                                    text: "Edit Group",
                                    link: "/edit"
                                },
                                {
                                    text: "Delete Group",
                                    link: "/delete"
                                },
                                {
                                    text: "Disable Group",
                                    link: "/disable"
                                },
                                {
                                    text: "View Group Information",
                                    link: "/detail"
                                },
                                {
                                    text: "View Group Statistics",
                                    link: "/statistics"
                                },
                                {
                                    text: "Grant Group Policies",
                                    link: "/grantPolicy"
                                },
                                {
                                    text: "Associate Group Users",
                                    link: "/assocUser"
                                },
                                {
                                    text: "Associate Group Tags",
                                    link: "/assocTag"
                                }
                            ],
                        },
                        {
                            text: 'Tag',
                            link: '/overview',
                            collapsed: true,
                            base: '/en/docs/gm/organization/tag',
                            items: [
                                {
                                    text: "Add Tag",
                                    link: "/add"
                                },
                                {
                                    text: "Edit Tag",
                                    link: "/edit"
                                },
                                {
                                    text: "Delete Tag",
                                    link: "/delete"
                                },
                                {
                                    text: "View Tag Statistics",
                                    link: "/statistics"
                                },
                                {
                                    text: "View Associated Objects",
                                    link: "/assocOrg"
                                }
                            ]
                        }
                    ],
                },
                {
                    text: 'Permissions',
                    collapsed: true,
                    items: [
                        {
                            text: 'Permission Policy',
                            link: '/overview',
                            collapsed: true,
                            base: '/en/docs/gm/permissions/policy',
                            items: [
                                {
                                    text: "Add Permission Policy",
                                    link: "/add"
                                },
                                {
                                    text: "Set Application Default Authorization",
                                    link: "/setAppDefault"
                                },
                                {
                                    text: "View Permission List",
                                    link: "/list"
                                },
                                {
                                    text: "View Permission Details",
                                    link: "/detail"
                                },
                                {
                                    text: "Disable Permission Policy",
                                    link: "/disable"
                                },
                                {
                                    text: "Delete Permission Policy",
                                    link: "/delete"
                                },
                                {
                                    text: "Edit Permission Policy",
                                    link: "/edit"
                                },
                                {
                                    text: "Grant Permission Policy",
                                    link: "/grant"
                                }
                            ]
                        },
                        {
                            text: 'View Permissions',
                            link: '/overview',
                            collapsed: true,
                            base: '/en/docs/gm/permissions/view',
                            items: [
                                {
                                    text: "View User Permissions",
                                    link: "/viewUserPermissions"
                                },
                                {
                                    text: "Revoke User Permissions",
                                    link: "/cancelUserPermissions"
                                },
                                {
                                    text: "View Department Permissions",
                                    link: "/viewDepartmentPermissions"
                                },
                                {
                                    text: "Revoke Department Permissions",
                                    link: "/cancelDepartmentPermissions"
                                },
                                {
                                    text: "View Group Permissions",
                                    link: "/viewGroupPermissions"
                                },
                                {
                                    text: "Revoke Group Permissions",
                                    link: "/cancelGroupPermissions"
                                }
                            ]
                        }
                    ],
                },
                {
                    text: 'Notice and Message',
                    collapsed: true,
                    items: [
                        {
                            text: 'Notice',
                            collapsed: true,
                            base: '/en/docs/gm/messages/notice',
                            link: '/overview',
                            items: [
                                {
                                    text: "Publish Notice",
                                    link: "/publish"
                                },
                                {
                                    text: "Delete Notice",
                                    link: "/delete"
                                },
                                {
                                    text: "View Notice Details",
                                    link: "/detail"
                                },
                                {
                                    text: "View Notice Statistics",
                                    link: "/statistics"
                                }
                            ]
                        },
                        {
                            text: 'Message',
                            collapsed: true,
                            base: '/en/docs/gm/messages/messages',
                            link: '/overview',
                            items: [
                                {
                                    text: "Send Message",
                                    link: "/send"
                                },
                                {
                                    text: "View Message Content",
                                    link: "/content"
                                },
                                {
                                    text: "View Message Statistics",
                                    link: "/statistics"
                                }
                            ]
                        },
                    ],
                },
                {
                    text: 'Store',
                    collapsed: true,
                    items: [
                        {
                            text: 'Cloud Store',
                            collapsed: true,
                            base: '/en/docs/gm/store/cloudStore',
                            link: '/overview',
                            items: [
                                {
                                    text: 'View Goods',
                                    link: '/view',
                                },
                                {
                                    text: 'Buy Goods',
                                    link: '/buy',
                                }
                            ]
                        },
                        {
                            text: 'My Goods',
                            collapsed: true,
                            base: '/en/docs/gm/store/myGoods',
                            link: '/overview',
                            items: [
                                {
                                    text: "View My Goods",
                                    link: "/view"
                                },
                                {
                                    text: "Download My Goods",
                                    link: "/download"
                                }
                            ]
                        },
                        {
                            text: 'My License',
                            collapsed: true,
                            base: '/en/docs/gm/store/myLicense',
                            link: '/overview',
                            items: [
                                {
                                    text: "View My License",
                                    link: "/view"
                                },
                                {
                                    text: "Download My Licenses",
                                    link: "/download"
                                }
                            ]
                        },
                    ],
                },
                {
                    text: 'System',
                    collapsed: true,
                    base: '/zh/docs/gm/system',
                    items: [
                        {
                            text: "System Version",
                            link: '/systemVersion/overview',
                        },
                        {
                            text: "Real-name Authentication",
                            collapsed: true,
                            base: "/en/docs/gm/system/realName",
                            link: "/overview",
                            items: [
                                {
                                    text: "Real-name Authentication",
                                    link: "/auth"
                                },
                                {
                                    text: "View Authentication",
                                    link: "/view"
                                }
                            ]
                        },
                        {
                            text: "Security Settings",
                            collapsed: true,
                            base: "/en/docs/gm/system/securitySetting",
                            link: "/overview",
                            items: [
                                {
                                    text: "Login Restrictions",
                                    link: "/signinLimit"
                                },
                                {
                                    text: "Allow Registration",
                                    link: "/signupAllow"
                                },
                                {
                                    text: "Modify Password Policy",
                                    link: "/editPasswordPolicy"
                                },
                                {
                                    text: "Register Account",
                                    link: "/cancelSign"
                                },
                                {
                                    text: "Security Alerts",
                                    link: "/securityAlert"
                                }
                            ]
                        },
                        {
                            text: "Email Configuration",
                            collapsed: true,
                            items: [
                                {
                                    text: "Mail Server",
                                    collapsed: true,
                                    base: "/en/docs/gm/system/email/server",
                                    link: "/overview",
                                    items: [
                                        {
                                            text: "Add Mail Server",
                                            link: "/add"
                                        },
                                        {
                                            text: "Edit Mail Server",
                                            link: "/edit"
                                        },
                                        {
                                            text: "Set Default Mail Server",
                                            link: "/setDefault"
                                        },
                                        {
                                            text: "Delete Mail Server",
                                            link: "/delete"
                                        },
                                        {
                                            text: "Test Mail Server",
                                            link: "/test"
                                        }
                                    ]
                                },
                                {
                                    text: "Sending Records",
                                    collapsed: true,
                                    base: "/en/docs/gm/system/email/record",
                                    link: "/overview",
                                    items: [
                                        {
                                            text: "View Sending Records",
                                            link: "/view"
                                        },
                                        {
                                            text: "View Sending Statistics",
                                            link: "/statistics"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: "SMS Configuration",
                            collapsed: true,
                            items: [
                                {
                                    text: "SMS Channel",
                                    collapsed: true,
                                    base: "/en/docs/gm/system/sms/channel",
                                    link: "/overview",
                                    items: [
                                        {
                                            text: "Configure SMS Channel",
                                            link: "/edit"
                                        },
                                        {
                                            text: "Test SMS Channel",
                                            link: "/test"
                                        },
                                        {
                                            text: "Enable or Disable SMS Channel",
                                            link: "/enableOrDisable"
                                        }
                                    ]
                                },
                                {
                                    text: "SMS Template",
                                    collapsed: true,
                                    base: "/en/docs/gm/system/sms/template",
                                    link: "/overview",
                                    items: [
                                        {
                                            text: "View SMS Template",
                                            link: "/view"
                                        },
                                        {
                                            text: "Edit SMS Template",
                                            link: "/edit"
                                        }
                                    ]
                                },
                                {
                                    text: "Sending Records",
                                    collapsed: true,
                                    base: "/en/docs/gm/system/sms/record",
                                    link: "/overview",
                                    items: [
                                        {
                                            text: "View Sending Records",
                                            link: "/view"
                                        },
                                        {
                                            text: "View Sending Statistics",
                                            link: "/statistics"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: "Event Configuration",
                            collapsed: true,
                            items: [
                                {
                                    text: "Receiving Channels",
                                    collapsed: true,
                                    base: "/en/docs/gm/system/event/channel",
                                    link: "/overview",
                                    items: [
                                        {
                                            text: "Configure WebHook",
                                            link: "/editWebHook"
                                        },
                                        {
                                            text: "Configure Email Group",
                                            link: "/editEmailGroup"
                                        },
                                        {
                                            text: "Configure DingTalk Robot",
                                            link: "/editDingRobot"
                                        },
                                        {
                                            text: "Configure Enterprise WeChat Robot",
                                            link: "/editWXRobot"
                                        }
                                    ]
                                },
                                {
                                    text: "Event Template",
                                    collapsed: true,
                                    base: "/en/docs/gm/system/event/template",
                                    link: "/overview",
                                    items: [
                                        {
                                            text: "View Event Template",
                                            link: "/view"
                                        },
                                        {
                                            text: "Edit Event Template",
                                            link: "/edit"
                                        }
                                    ]
                                },
                                {
                                    text: "Event Records",
                                    collapsed: true,
                                    base: "/en/docs/gm/system/event/record",
                                    link: "/overview",
                                    items: [
                                        {
                                            text: "View Event Records",
                                            link: "/view"
                                        },
                                        {
                                            text: "View Event Statistics",
                                            link: "/statistics"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: "Audit Logs",
                            collapsed: true,
                            items: [
                                {
                                    text: "Operation Logs",
                                    collapsed: true,
                                    base: "/en/docs/gm/system/log/operation",
                                    link: "/overview",
                                    items: [
                                        {
                                            text: "View Operation Logs",
                                            link: "/view"
                                        },
                                        {
                                            text: "View Operation Statistics",
                                            link: "/statistics"
                                        }
                                    ]
                                },
                                // TODO System Logs
                                {
                                    text: "Request Logs",
                                    collapsed: true,
                                    base: "/en/docs/gm/system/log/request",
                                    link: "/overview",
                                    items: [
                                        {
                                            text: "View Request Logs",
                                            link: "/view"
                                        },
                                        {
                                            text: "View Request Statistics",
                                            link: "/statistics"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: "LDAP",
                            collapsed: true,
                            base: "/en/docs/gm/system/ldap",
                            link: "/overview",
                            items: [
                                {
                                    text: "Add Directory",
                                    link: "/add"
                                },
                                {
                                    text: "Edit Directory",
                                    link: "/edit"
                                },
                                {
                                    text: "Test Directory",
                                    link: "/test"
                                },
                                {
                                    text: "Synchronize Directory",
                                    link: "/sync"
                                },
                                {
                                    text: "Move Directory",
                                    link: "/move"
                                },
                                {
                                    text: "Delete Directory",
                                    link: "/delete"
                                },
                                {
                                    text: "Delete Directory and Data",
                                    link: "/deleteAll"
                                },
                                {
                                    text: "Disable Directory",
                                    link: "/disable"
                                }
                            ]
                        },
                        {
                            text: "Resource Quota",
                            collapsed: true,
                            base: "/en/docs/gm/system/resourceQuota",
                            link: "/overview",
                            items: [
                                {
                                    text: "View Resource Quota",
                                    link: "/view"
                                },
                                {
                                    text: "Modify Resource Quota",
                                    link: "/edit"
                                },
                                {
                                    text: "Submit Work Order for Resource Quota",
                                    link: "/submitWorkOrder"
                                }
                            ]
                        },
                        {
                            text: "Application Storage",
                            collapsed: true,
                            base: "/en/docs/gm/system/appStorage",
                            link: "/overview",
                            items: [
                                {
                                    text: "View Application Data Storage",
                                    link: "/viewAppStorage"
                                },
                                {
                                    text: "View Business Data Storage",
                                    link: "/viewBusinessStorage"
                                },
                                {
                                    text: "Modify Business Storage Type",
                                    link: "/editBusinessStorage"
                                }
                            ]
                        },
                        {
                            text: "Online Users",
                            collapsed: true,
                            base: "/en/docs/gm/system/onlineUser",
                            link: "/overview",
                            items: [
                                {
                                    text: "View Online Users",
                                    link: "/view"
                                },
                                {
                                    text: "Force Logout User",
                                    link: "/quit"
                                }
                            ]
                        },
                        {
                            text: "Appearance",
                            collapsed: true,
                            base: "/en/docs/gm/system/appearance",
                            link: "/overview",
                            items: [
                                {
                                    text: "View Site Applications",
                                    link: "/viewSite"
                                },
                                {
                                    text: "Modify Site Applications",
                                    link: "/editSite"
                                }
                            ]
                        },
                        {
                            text: "System Tokens",
                            collapsed: true,
                            base: "/en/docs/gm/system/systemToken",
                            link: "/overview",
                            items: [
                                {
                                    text: "Add System Token",
                                    link: "/add"
                                },
                                {
                                    text: "View System Tokens",
                                    link: "/view"
                                },
                                {
                                    text: "Delete System Token",
                                    link: "/delete"
                                }
                            ]
                        }
                    ],
                },
            ]
        },
        {
            text: "Frequently Asked Questions (FAQ)",
            collapsed: true,
            base: "/en/docs/tester/faq",
            items: [
                {
                    text: "Backlog Related Questions",
                    link: "/backlog"
                },
                {
                    text: "Product Iteration Related Questions",
                    link: "/sprint"
                },
                {
                    text: "Installation and Deployment Related Questions",
                    link: "/deployment"
                },
                {
                    text: "Execution Related Questions",
                    link: "/execution"
                },
                {
                    text: "Report Related Questions",
                    link: "/report"
                }
            ]
        }
    ]
}

function testerDocsSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "AngusTester",
            collapsed: true,
            base: "/en/docs/tester/introduction",
            items: [
                {
                    text: "About the Application",
                    link: "/about"
                },
                {
                    text: "Product Features",
                    link: "/feature"
                },
                {
                    text: "Plugin-based Implementation",
                    link: "/plugin"
                },
                {
                    text: "Product Editions",
                    link: "/edition"
                },
                {
                    text: "Deployment Methods",
                    link: "/deployment"
                },
                {
                    text: "Application Scenarios",
                    link: "/scenarios"
                },
                {
                    text: "Resource Quotas",
                    link: "/quotas"
                }
            ]
        },
        {
            text: "Application Installation",
            collapsed: true,
            base: "/en/docs/tester/installation",
            items: [
                {
                    text: "Prerequisites",
                    link: "/prerequisites"
                },
                {
                    text: "Install AngusTester",
                    link: "/AngusTester"
                },
                {
                    text: "Install AngusAgent",
                    link: "/AngusAgent"
                },
                {
                    text: "Install AngusProxy",
                    link: "/AngusProxy"
                },
                {
                    text: "Install AngusMockService",
                    link: "/AngusMockService"
                },
                {
                    text: "Install AngusRunner",
                    link: "/AngusRunner"
                }
            ]
        },
        {
            text: "Quick Start",
            collapsed: true,
            base: "/en/docs/tester/quickStarted",
            items: [
                {
                    text: "How to Debug Interfaces",
                    link: "/debugApi"
                },
                {
                    text: "How to Quickly Create a Script",
                    link: "/creatScript"
                },
                {
                    text: "How to Run Test Scripts",
                    link: "/runScript"
                },
                {
                    text: "How to Generate API Test Scripts Quickly",
                    link: "/generateScriptByApi"
                },
                {
                    text: "How to Generate API Test Tasks Quickly",
                    link: "/generateTaskByApi"
                },
                {
                    text: "How to Import External APIs",
                    link: "/importOuterApis"
                },
                {
                    text: "How to Obtain Software License",
                    link: "/getSoftwareLicense"
                }
            ]
        },
        {
            text: "User Interface (UI)",
            collapsed: true,
            items: [
                {
                    text: "Project",
                    collapsed: true,
                    base: "/en/docs/tester/ui/project",
                    items: [
                        {
                            text: "Project Introduction",
                            link: "/introduction"
                        },
                        {
                            text: "Project Workflow",
                            link: "/flow"
                        },
                        {
                            text: "Project Management",
                            link: "/management"
                        },
                        {
                            text: "Module Management",
                            link: "/module"
                        },
                        {
                            text: "Tag Management",
                            link: "/tag"
                        }
                    ]
                },
                {
                    text: "Configuration",
                    collapsed: true,
                    base: "/en/docs/tester/ui/configuration",
                    items: [
                        {
                            text: "Application Configuration",
                            link: "/application"
                        },
                        {
                            text: "Metrics Configuration",
                            link: "/indicator"
                        },
                        {
                            text: "Event Configuration",
                            link: "/event"
                        },
                        {
                            text: "Node Configuration",
                            link: "/node"
                        },
                        {
                            text: "Agent Configuration",
                            link: "/agent"
                        }
                    ]
                },
                {
                    text: "Dashboards",
                    collapsed: true,
                    base: "/en/docs/tester/ui/kanban",
                    items: [
                        {
                            text: "CTO Dashboard",
                            link: "/cto"
                        },
                        {
                            text: "Data Assets Dashboard",
                            link: "/dataAsset"
                        },
                        {
                            text: "Efficiency Statistics Dashboard",
                            link: "/effectivenessStatistics"
                        }
                    ]
                },
                {
                    text: "Tasks",
                    collapsed: true,
                    base: "/en/docs/tester/ui/task",
                    items: [
                        {
                            text: "Agile Development Introduction",
                            link: "/agileIntroduction"
                        },
                        {
                            text: "Backlog Introduction",
                            link: "/backlogIntroduction"
                        },
                        {
                            text: "Backlog Management",
                            link: "/backlogManagement"
                        },
                        {
                            text: "Sprint Introduction",
                            link: "/sprintIntroduction"
                        },
                        {
                            text: "Sprint Management",
                            link: "/sprintManagement"
                        },
                        {
                            text: "Development Tasks Introduction",
                            link: "/taskIntroduction"
                        },
                        {
                            text: "Development Tasks Management",
                            link: "/taskManagement"
                        },
                        {
                            text: "Version Management",
                            link: "/versionManagement"
                        },
                        {
                            text: "Agile Meetings Introduction",
                            link: "/meetingIntroduction"
                        },
                        {
                            text: "Agile Meetings Management",
                            link: "/meetingManagement"
                        },
                        {
                            text: "Analysis Management",
                            link: "/analysisManagement"
                        }
                    ]
                },
                {
                    text: "Functionalities",
                    collapsed: true,
                    base: "/en/docs/tester/ui/function",
                    items: [
                        {
                            text: "Agile Testing Introduction",
                            link: "/agileIntroduction"
                        },
                        {
                            text: "Test Plans Introduction",
                            link: "/planIntroduction"
                        },
                        {
                            text: "Test Plans Management",
                            link: "/planManagement"
                        },
                        {
                            text: "Functional Test Cases Introduction",
                            link: "/caseIntroduction"
                        },
                        {
                            text: "Functional Test Cases Management",
                            link: "/caseManagement"
                        },
                        {
                            text: "Test Case Reviews Introduction",
                            link: "/reviewIntroduction"
                        },
                        {
                            text: "Test Case Reviews Management",
                            link: "/reviewManagement"
                        },
                        {
                            text: "Test Case Baselines Introduction",
                            link: "/baselineIntroduction"
                        },
                        {
                            text: "Test Case Baselines Management",
                            link: "/baselineManagement"
                        },
                        {
                            text: "Analysis Management",
                            link: "/analysisManagement"
                        }
                    ]
                },
                {
                    text: "APIs",
                    collapsed: true,
                    base: "/en/docs/tester/ui/apis",
                    items: [
                        {
                            text: "Services Introduction",
                            link: "/servicesIntroduction"
                        },
                        {
                            text: "Services Management",
                            link: "/servicesManagement"
                        },
                        {
                            text: "APIs Introduction",
                            link: "/apisIntroduction"
                        },
                        {
                            text: "APIs Management",
                            link: "/apisManagement"
                        },
                        {
                            text: "Design Introduction",
                            link: "/designIntroduction"
                        },
                        {
                            text: "Design Management",
                            link: "/designManagement"
                        },
                        {
                            text: "Sharing Introduction",
                            link: "/shareIntroduction"
                        },
                        {
                            text: "Sharing Management",
                            link: "/shareManagement"
                        },
                        {
                            text: "Servers Introduction",
                            link: "/serverIntroduction"
                        },
                        {
                            text: "Servers Management",
                            link: "/serverManagement"
                        }
                    ]
                },
                {
                    text: "Scenarios",
                    collapsed: true,
                    base: "/en/docs/tester/ui/scenarios",
                    items: [
                        {
                            text: "Scenarios Introduction",
                            link: "/introduction"
                        },
                        {
                            text: "Scenarios Management",
                            link: "/management"
                        },
                        {
                            text: "Scenario Monitoring Introduction",
                            link: "/monitorIntroduction"
                        },
                        {
                            text: "Scenario Monitoring Management",
                            link: "/monitorManagement"
                        }
                    ]
                },
                {
                    text: "Scripts",
                    collapsed: true,
                    base: "/en/docs/tester/ui/script",
                    items: [
                        {
                            text: "Scripts Introduction",
                            link: "/introduction"
                        },
                        {
                            text: "Scripts Management",
                            link: "/management"
                        }
                    ]
                },
                {
                    text: "Data",
                    collapsed: true,
                    base: "/en/docs/tester/ui/data",
                    items: [
                        {
                            text: "Data Introduction",
                            link: "/introduction"
                        },
                        {
                            text: "Variables Management",
                            link: "/variable"
                        },
                        {
                            text: "Datasets Management",
                            link: "/dataset"
                        },
                        {
                            text: "Files Management",
                            link: "/file"
                        },
                        {
                            text: "Data Sources Management",
                            link: "/datasource"
                        }
                    ]
                },
                {
                    text: "Execution",
                    collapsed: true,
                    base: "/en/docs/tester/ui/execution",
                    items: [
                        {
                            text: "Execution Introduction",
                            link: "/introduction"
                        },
                        {
                            text: "Execution Management",
                            link: "/management"
                        }
                    ]
                },
                {
                    text: "Mock",
                    collapsed: true,
                    base: "/en/docs/tester/ui/mock",
                    items: [
                        {
                            text: "Mock Services Introduction",
                            link: "/introduction"
                        },
                        {
                            text: "Mock Services Management",
                            link: "/management"
                        },
                        {
                            text: "Mock APIs Management",
                            link: "/apisManagement"
                        }
                    ]
                },
                {
                    text: "Reports",
                    collapsed: true,
                    base: "/en/docs/tester/ui/report",
                    items: [
                        {
                            text: "Reports Introduction",
                            link: "/introduction"
                        },
                        {
                            text: "Reports Management",
                            link: "/management"
                        }
                    ]
                }
            ]
        },
        {
            text: "Product Metrics",
            collapsed: true,
            base: "/en/docs/tester/indicator",
            items: [
                {
                    text: "R&D Management Metrics",
                    link: "/RD"
                },
                {
                    text: "Test Management Metrics",
                    link: "/testing"
                },
                {
                    text: "Performance Testing Metrics",
                    link: "/performance"
                },
                {
                    text: "Node Monitoring Metrics",
                    link: "/node"
                }
            ]
        },
        {
            text: "Test Definition",
            collapsed: true,
            base: "/en/docs/tester/testing",
            items: [
                {
                    text: "Test Definition",
                    link: "/definition"
                },
                {
                    text: "Test Examples",
                    link: "/demo"
                },
                {
                    text: "Test Services",
                    link: "/service"
                }
            ]
        },
        {
            text: "Test Specifications",
            collapsed: true,
            items: [
                {
                    text: "Specification Introduction",
                    link: "/en/docs/tester/specification/introduction"
                },
                {
                    text: "Specification Content",
                    collapsed: true,
                    base: "/en/docs/tester/specification/content",
                    items: [
                        {
                            text: "Specification",
                            link: "/specification"
                        },
                        {
                            text: "API Version",
                            link: "/apiVersion"
                        },
                        {
                            text: "Metadata",
                            link: "/info"
                        },
                        {
                            text: "Tags",
                            link: "/tag"
                        },
                        {
                            text: "Types",
                            link: "/type"
                        },
                        {
                            text: "Plugins",
                            link: "/plugin"
                        },
                        {
                            text: "Execution Configuration",
                            link: "/executionConfiguration"
                        },
                        {
                            text: "Tasks",
                            collapsed: true,
                            link: "/task",
                            base: "/en/docs/tester/specification/content",
                            items: [
                                {
                                    text: "Plugin Configuration Parameters",
                                    link: "/task/pluginConfiguration"
                                },
                                {
                                    text: "Test Task Orchestration",
                                    collapsed: true,
                                    base: "/en/docs/tester/specification/content/task/elements",
                                    items: [
                                        {
                                            text: "Controller Elements",
                                            link: "/controller"
                                        },
                                        {
                                            text: "HTTP Test Tasks",
                                            link: "/http"
                                        },
                                        {
                                            text: "WebSocket Test Tasks",
                                            link: "/websocket"
                                        },
                                        {
                                            text: "JDBC Test Tasks",
                                            link: "/jdbc"
                                        },
                                        {
                                            text: "FTP Test Tasks",
                                            link: "/ftp"
                                        },
                                        {
                                            text: "LDAP Test Tasks",
                                            link: "/ldap"
                                        },
                                        {
                                            text: "Mail Test Tasks",
                                            link: "/mail"
                                        },
                                        {
                                            text: "SMTP Test Tasks",
                                            link: "/smtp"
                                        },
                                        {
                                            text: "TCP Test Tasks",
                                            link: "/tcp"
                                        }
                                    ]
                                },
                                {
                                    text: "Mock Data Tasks",
                                    link: "/task/mockDataTask"
                                },
                                {
                                    text: "Mock API Tasks",
                                    link: "/task/mockApisTask"
                                },
                                {
                                    text: "Parameterization",
                                    link: "/task/parameterization"
                                }
                            ]
                        },
                        {
                            text: "Extension Fields",
                            link: "/extension"
                        }
                    ]
                }
            ]
        },
        {
            text: "Mock",
            collapsed: true,
            base: "/en/docs/tester/mock",
            items: [
                {
                    text: "Mock Services",
                    link: "/service"
                },
                {
                    text: "Mock APIs",
                    link: "/api"
                },
                {
                    text: "Mock Data",
                    link: "/data"
                },
                {
                    text: "Mock Functions",
                    link: "/function"
                }
            ]
        },
        {
            text: "Command Line (CLI)",
            link: "/command/AngusRunner"
        },
        {
            text: "Frequently Asked Questions (FAQ)",
            collapsed: true,
            base: "/en/docs/tester/faq",
            items: [
                {
                    text: "Backlog Related Questions",
                    link: "/backlog"
                },
                {
                    text: "Product Iteration Related Questions",
                    link: "/sprint"
                },
                {
                    text: "Installation and Deployment Related Questions",
                    link: "/deployment"
                },
                {
                    text: "Execution Related Questions",
                    link: "/execution"
                },
                {
                    text: "Report Related Questions",
                    link: "/report"
                }
            ]
        }
    ]
}
