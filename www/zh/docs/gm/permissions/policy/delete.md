---
title: AngusGM删除权限策略
outline: deep
---

# 删除权限策略

> **删除权限策略** 允许管理员移除不再使用的权限策略配置。执行此操作将：
> - 永久删除该权限策略配置
> - 撤销所有通过该策略分配的权限
> - 解除策略与所有授权对象的绑定关系

::: danger 重要影响
删除操作会导致关联用户/部门/用户组**立即失去**该策略授予的权限，可能影响业务操作连续性，请谨慎执行！
:::

## 删除前置检查

1. **策略关联对象**
    - 进入策略详情页查看"授权对象"列表
    - 确认无关键业务角色依赖此策略

2. **业务影响时段**
    - 避免在业务高峰期操作
    - 提前通知受影响用户

3. **替代方案准备**
    - 已为受影响对象配置新策略
    - 新策略已完成测试验证

## 操作步骤

### 第一步：进入权限策略列表
1. 登录**AngusGM**系统
2. 导航至`AngusGM` → `权限策略`
3. 进入权限策略管理页面

### 第二步：定位目标策略
在策略列表中找到需删除的策略：
- **搜索框**：输入策略名称关键词
- **排序**：点击表头按名称/时间排序

### 第三步：执行删除操作
1. 在目标策略所在行的最右侧，点击 **"删除"** 按钮（垃圾桶图标）
2. 在确认弹窗中点击 **"确认删除"** 完成操作

## 注意事项

1. **系统策略保护**
    - 系统预置策略**不可删除**（删除按钮置灰）
    - 仅支持删除自定义策略

2. **数据恢复**
    - 删除后策略**无法恢复**
    - 可通过"操作日志"模块查看历史策略内容


