---
title: AngusGM添加子部门
outline: deep
---

# 添加子部门

> **添加子部门** 用于在现有部门下创建层级化子单元，构建树形组织结构。

## 操作步骤

### 1. 定位父部门
1. 登录系统控制台
2. 导航至 `AngusGM → 组织人员 → 部门`
3. 在左侧部门树中找到目标**父部门**

### 2. 创建子部门
- **方式一：右键菜单创建**
    1. 右键点击父部门名称
    2. 选择 **「添加部门」** 选项

- **方式二：工具栏创建**
    1. 选中父部门
    2. 点击顶部工具栏 **「+ 添加部门」** 图标

### 3. 配置子部门信息
在创建弹窗中配置以下信息：
- **必填项**：名称、编码
- **可选项**：部门标签

> ⚠️ **命名规范**：
> - 同层级下名称必须唯一

> 💡 **最佳实践：**
> - 建议包含父部门缩写（如：`研发中心-前端组`）
> - 使用「父部门编码_序列」规则设置子部门编码（如：DEV001_FE01）

### 4. 完成创建
1. 点击 **「确定」** 提交
2. 系统提示：**"创建成功"**
3. 点击展开父部门显示新子部门


## 配额说明
不同版本的子部门和层级数量限制如下：

| 版本类型   | 默认配额           | 扩展方式                                              |
|------------|----------------|---------------------------------------------------|
| 云服务版   | `200个子部门`、`5级` | 提交[工单申请](https://wo.xcan.cloud/workorders/create) |
| 私有部署版 | `200个子部门`、`5级` | 联系系统管理员调整可证                                 |

> 提示：实时配额可在[资源配额页面](../../introduction/quotas)查看`部门数`和`部门层级深度`。