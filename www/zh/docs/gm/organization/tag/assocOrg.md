---
title: AngusGM关联标签对象
outline: deep
---

# 关联标签对象

> **关联标签对象** 用于将标签与组织资源（用户/部门/组）建立关联，实现多维度分类管理。通过标签关联，可快速实现权限分配、资源检索和数据分析。

## 操作指南

### 1. 进入标签详情
1. 登录系统控制台
2. 导航至 `AngusGM → 组织人员 → 标签`
3. 在标签列表中点击目标 **标签名称**

### 2. 管理关联对象
在右侧关联对象面板中：

#### 2.1 查看关联对象
1. 在 **对象类型筛选器** 中选择：
    - 👤 用户
    - 🏢 部门
    - 👥 组
2. 查看对应类型的关联对象列表

#### 2.2 添加新关联
1. 点击当前对象列表右上角 **「关联对象」**
2. 根据所选对象类型：
    - **👤 用户**：搜索并选择用户
    - **🏢 部门**：从部门树选择
    - **👥 组**：从组列表选择
3. 点击 **「确认」** 完成关联

#### 2.3 移除关联
- 在对象列表中找到目标条目
- 点击右侧 **「取消关联」** 按钮
- 即时生效（无需确认）

## 关联效果验证
1. 在目标对象详情页：
    - 用户：查看「标签」区块
    - 部门：查看「基本信息」区域
    - 组：查看「属性」标签页
2. 确认标签显示在对应位置

## 配额规则

| 版本类型   | 默认配额  | 扩展方式                                              |
|------------|-------|---------------------------------------------------|
| 云服务版   | `10个` | 提交[工单申请](https://wo.xcan.cloud/workorders/create) |
| 私有部署版 | `10个` | 联系系统管理员调整可证                                 |

> 提示：实时配额可在[资源配额页面](../../introduction/quotas)查看`组织关联标签数`。

