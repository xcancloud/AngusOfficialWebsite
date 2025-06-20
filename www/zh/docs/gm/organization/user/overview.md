# 用户管理

::: tip 重要提示
> **用户管理** 是企业对组织成员进行系统化管理的关键功能，支持管理员高效创建、维护和监控用户账户生命周期，保障系统安全性与合规性。
:::

## 账户全周期管理
```mermaid
graph LR
    A[账户创建] --> B[信息维护]
    B --> C[权限分配]
    C --> D[状态监控]
    D --> E[安全审计]
    style A fill:#4CAF50,stroke:#388E3C
    style E fill:#FF5252,stroke:#D32F2F
```

### 1. **统一用户档案**  
集中管理用户基础信息、联系方式及组织关系，支持：
  - 批量导入/导出用户数据
  - LDAP目录同步集成
  - 多因素身份认证配置

### 2. **动态权限体系**
```mermaid
graph TB
    A[权限分配机制] --> B{分配维度}
    B --> C[角色继承]
    B --> D[部门隶属]
    B --> E[组隶属]
    B --> F[动态授权]
    
    C --> G((权限继承<br>父->子))
    D --> H{{组织架构<br>隶属关系}}
    E --> I{{所属组<br>隶属关系}}
    F --> J[[实时授权<br>条件触发]]
    
    style A fill:#3F51B5,stroke:#1A237E
    style B fill:#9C27B0,stroke:#6A1B9A
```

### 3. **实时状态追踪**  
   | 监控维度       | 检测指标                  | 告警机制         |
   |----------------|---------------------------|------------------|
   | 登录安全       | 异常登录地点/次数         | 实时账户锁定     |
   | 权限变更       | 敏感权限分配记录           | 操作日志告警     |
   | 会话状态       | 在线时长/闲置超时         | 自动登出         |
   | 密码安全       | 弱密码/过期密码           | 强制重置提醒     |

## 关键功能介绍

### 1. 统一身份管理
- **自动化流程**：预设岗位模板实现一键创建账户
- **组织架构映射**：自动同步部门调整至用户职位
- **合规审计**：完整记录账户操作轨迹（创建/修改/删除）

### 2. 精细权限控制
- **权限热图**：可视化展示用户权限分布
- **权限继承矩阵**：部门→岗位→用户三级继承关系
- **敏感操作拦截**：关键权限变更需二次验证

### 3. 全景审计追踪
- 操作行为留存：记录关键操作（权限变更/数据导出）
- 风险操作标记：标记高敏感操作（密码重置/角色变更）
- 时间轴追溯：按时间序列展示用户行为轨迹

## 主要字段说明

| 参数             | 字段名                   | 类型     | 是否必须 | 长度限制 | 说明                               |
| ---------------- | ------------------------ | -------- | -------- | -------- |----------------------------------|
|ID               |ID                       | bigint   | 是       | /        | 用户ID，用户在系统中唯一标识                  |
| 名称             | firstName                | string   | 是       | 100      | 用户名字，如：云婷                        |
| 姓氏             | lastName                 | string   | 是       | 100      | 用户姓氏，如：王                         |
| 姓名             | fullName                 | string   | 是       | 100      | 用户的全名，由名字和姓氏组成，用于标识用户的真实身份，如：王云婷 |
| 用户名           | username                 | string   | 是       | 100      | 用户在系统中的唯一标识                      |
| 手机号           | mobile                   | string   | 是       | 16       | 用户手机号                            |
| 座机号           | landline                 | string   | 否       | 40       | 用户座机号                            |
| 邮箱             | email                    | string   | 是       | 100      | 用户电子邮箱地址                         |
| 性别             | gender                   | string   | 否       | 10       | 用户性别                             |
| 职务             | title                    | string   | 否       | 100      | 用户担任的职务                          |
| 地址             | address                  | string   | 否       | 200      | 用户联系地址                           |
| 系统身份         | sysAdmin                 | int      | 是       | /        | 用户系统身份(默认角色)                     |
| 来源             | source                   | string   | 是       | 40       | 用户来源                             |
| 锁定状态         | locked                   | boolean  | 是       | /        | 用户锁定状态                           |
| 在线状态         | online                   | boolean  | 是       | /        | 用户在线状态                           |
| 最近上线         | onlineDate               | datetime | 否       | /        | 用户最近上线时间                         |
| 下线时间         | offlineDate              | datetime | 否       | /        | 用户上次下线时间                         |
| 添加人           | createdBy                | bigint   | 是       | /        | 添加用户操作人                          |
| 加入时间         | createdDate              | datetime | 是       | /        | 用户加入或创建用户时间                      |
| 最后修改人       | lastModifiedBy           | bigint   | 是       | /        | 最后修改用户信息操作人                      |
| 最后修改时间     | lastModifiedDate         | datetime | 是       | /        | 最后修改用户信息时间                       |
| 国际电话区号     | itc                      | string   | 否       | 8        | 国际电话区号                           |
| 国家编码         | country                  | string   | 否       | 16       | 国家编码                             |
| 注册账号类型     | signupAccountType        | string   | 否       | 16       | 注册账号类型                           |
| 注册账号         | signupAccount            | string   | 否       | 100      | 租户注册账号                           |
| 注册设备ID      | signupDeviceId           | string   | 否       | 100      | 注册设备ID                           |
| 租户ID          | tenantId                 | bigint   | 是       | /        | 所属租户ID                           |
| 租户名称         | tenantName               | string   | 是       | 100      | 租户名称                             |
| 头像地址         | avatar                   | string   | 否       | 400      | 用户头像地址                           |
| 用户目录ID      | directoryId              | bigint   | 否       | /        | 用户目录ID                           |
| 主部门ID        | mainDeptId               | bigint   | 否       | /        | 主部门ID                            |
| 部门负责人       | deptHead                 | boolean  | 否       | /        | 是否部门负责人                          |
| 到期标记         | expired                  | boolean  | 是       | /        | 到期标记                             |
| 到期时间         | expiredDate              | datetime | 否       | /        | 到期时间                             |
| 启用状态         | enabled                  | boolean  | 是       | /        | 用户状态                             |
| 禁用原因         | disableReason            | string   | 否       | 200      | 禁用原因                             |
| 删除状态         | deleted                  | boolean  | 是       | /        | 删除状态                             |
| 最后锁定时间     | lastLockDate             | datetime | 否       | /        | 最后锁定时间                           |
| 锁定开始时间     | lockStartDate            | datetime | 否       | /        | 锁定开始时间                           |
| 锁定结束时间     | lockEndDate              | datetime | 否       | /        | 锁定结束时间                           |
| 最后密码修改时间 | lastModifiedPasswordDate | datetime | 否       | /        | 最后修改密码的时间                        |
