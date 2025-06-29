---
title: AngusGM LDAP 目录服务集成
outline: deep
---

# LDAP 目录服务集成

>  **LDAP 目录服务集成** 提供与企业级身份源的标准化对接能力，实现用户身份信息的集中管理和自动同步，构建统一、高效、安全的身份治理体系。

**版本限制**：此功能仅私有化部署版本支持，云服务版不可用。

## 核心价值

### 1. 统一身份管理
- **集中化管控**：
  ```mermaid
  graph LR
  A[企业AD/LDAP] -->|实时同步| B[AngusGM用户]
  A --> C[部门架构]
  A --> D[组成员关系]
  ```
- **自动化同步**：
    - 定时增量同步（默认30分钟）
    - 实时触发式同步（账号变更时）
    - 双向属性映射配置
- **生命周期联动**：员工离职AD禁用后，自动冻结所有关联系统权限

### 2. 安全认证增强
- **企业级认证**：
  | 认证方式 | 协议支持 | 安全等级 |
  |----------|----------|----------|
  | 简单绑定 | LDAP | ★★☆ |
  | SASL认证 | DIGEST-MD5 | ★★★ |
  | 加密通道 | STARTTLS/SSL | ★★★★ |
- **密码策略继承**：
    - 复杂度要求同步
    - 有效期强制同步

### 3. 高效运维体系
- **用户供给对比**：
  | 方式 | 新员工启用时效 | 错误率 |
  |------|----------------|--------|
  | 手动创建 | 1-2工作日 | >8% |
  | LDAP同步 | <5分钟 | <0.5% |
- **批量操作**：
    - 部门架构一键导入
    - 基于OU(组织单元)的权限分配
    - 组策略继承权限模板

## 应用场景

### 1. 新员工快速入职
> **流程**：
> 1. HR在AD创建账号
> 2. 自动同步至AngusGM
> 3. 预置权限模板生效  
     > **时效**：<10分钟完成系统准备

### 2. 组织架构变更
> **场景**：部门重组  
> **操作**：
> 1. AD调整部门结构
> 2. 触发实时同步
> 3. 权限自动继承新架构  
     > **优势**：千人规模调整1小时内完成

### 3. 统一安全策略
> **需求**：强化密码安全  
> **实现**：
> 1. AD启用12位复杂度策略
> 2. AngusGM自动继承策略
> 3. 全系统强制密码重置  
     > **效果**：统一防护等级，降低泄露风险

