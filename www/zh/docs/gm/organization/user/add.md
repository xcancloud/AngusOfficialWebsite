---
title: AngusGM添加用户
outline: deep
---

# 添加用户

> **添加用户** 允许管理员为组织创建新用户账户，使其能够访问系统资源和服务。新建用户时需设置基础信息并指定默认系统身份。

## 操作步骤

### 1. 进入用户管理界面
1. 登录系统控制台
2. 导航至 `AngusGM → 组织人员 → 用户`
3. 点击右上角 **「添加用户」** 按钮

### 2. 填写用户信息
在创建表单中配置以下信息：
- **必填项**：姓、名、姓名、用户名、密码、电子邮箱
- **可选项**：性别、职务、地址、头像、手机号、座机号等附加信息
- **权限分配**：为用户选择适当默认系统身份（如一般用户、系统管理员）

> ⚠️ 权限限制  
> 普通用户账号无法创建系统管理员角色

### 3. 完成创建
1. 点击 **「提交」** 保存信息
2. 新用户将立即出现在用户列表中
3. 系统自动向用户邮箱发送账户密码修改通知（未来支持）

## 配额说明
不同版本的用户数量限制如下：

| 版本类型   | 默认配额  | 扩展方式                                              |
|------------|-------|---------------------------------------------------|
| 云服务版   | `20个用户` | 提交[工单申请](https://wo.xcan.cloud/workorders/create) |
| 私有部署版 | `20个用户` | 联系客户经理升级许可证                                 |

> 提示：实时配额可在[资源配额页面](../../introduction/quotas)查看`用户数`。