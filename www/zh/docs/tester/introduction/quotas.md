---
title: AngusTester 资源配额管理
outline: deep
---

# AngusTester 资源配额管理

> AngusTester 的资源配额系统为租户提供了完善的资源管理机制，保障系统稳定运行。以下是各类资源配额的详细说明：

## 配额概览

| 资源类型             | 初始配额        | 最大允许值     | 私有化可调整 | 云端可调整 |
|----------------------|----------------|---------------|------------|----------|
| **项目管理**         |                |               |            |          |
| 项目数               | 2,000          | 1,000,000     | ✅          | ✅        |
| 模块数               | 5,000          | 1,000,000     | ✅          | ✅        |
| 标签数               | 5,000          | 1,000,000     | ✅          | ✅        |
| **接口管理**         |                |               |            |          |
| 接口数               | 20,000         | 1,000,000     | ✅          | ✅        |
| 服务数               | 2,000          | 1,000,000     | ✅          | ✅        |
| 服务关联接口数       | 1,000          | 2,000         | ✅          | ✅        |
| **场景管理**         |                |               |            |          |
| 场景数               | 20,000         | 1,000,000     | ✅          | ✅        |
| 场景关联接口数       | 100            | 2,000         | ✅          | ✅        |
| **Mock服务**         |                |               |            |          |
| 模拟服务数           | 100            | 1,000,000     | ✅          | ✅        |
| 模拟接口响应数       | 50             | 2,000         | ✅          | ✅        |
| 模拟数据迭代次数     | 5,000,000      | 5,000,000,000 | ✅          | ✅        |
| **变量管理**         |                |               |            |          |
| 变量数               | 20,000         | 1,000,000     | ✅          | ✅        |
| 关联变量数           | 200            | 2,000         | ✅          | ✅        |
| **执行管理**         |                |               |            |          |
| 脚本数               | 100,000        | 10,000,000    | ✅          | ✅        |
| 执行数               | 100,000        | 10,000,000    | ✅          | ✅        |
| 报告数               | 100,000        | 10,000,000    | ✅          | ✅        |
| **任务管理**         |                |               |            |          |
| 任务数               | 200,000        | 50,000,000    | ✅          | ✅        |
| 任务迭代数           | 2,000          | 1,000,000     | ✅          | ✅        |
| **性能资源**         |                |               |            |          |
| 节点数               | 1 (私有化)/0 (云端)| 1,000      | ❌          | ❌        |
| 并发数               | 1 (私有化)/0 (云端)| 2,000,000  | ❌          | ❌        |
| 并发任务数           | 1 (私有化)/0 (云端)| 1,000      | ❌          | ❌        |

## 资源详解

### 📂 项目管理
- **项目数**：最大可创建项目数量  
  `用途`：控制系统复杂度，避免资源过度分配

- **模块数**：项目下的功能模块数量  
  `用途`：控制单个项目的细分粒度

### 📡 接口管理
- **接口数**：系统可管理的API总数  
  `用途`：控制API资产规模

- **服务关联接口**：单个服务最多关联接口数  
  `用途`：限制服务拆分的合理性

### 🎭 场景管理
- **场景数**：复杂测试场景数量  
  `用途`：管理业务流测试资源

- **场景关联接口**：单个场景最多调用接口数  
  `用途`：防止过度复杂的场景设计

### 🎨 Mock服务
- **模拟服务数**：Mock服务实例数量  
  `用途`：控制模拟环境资源消耗

- **模拟数据迭代**：Mock数据最大使用次数  
  `用途`：防止无限循环消耗资源

### 🧩 变量管理
- **变量数**：系统全局变量总量  
  `用途`：统一管理参数化数据

- **关联变量数**：单接口/场景最多使用变量数  
  `用途`：避免过度复杂的数据依赖

### ⚙️ 执行管理
- **脚本数**：可存储的测试脚本总量  
  `用途`：管理脚本资产规模

- **执行数**：历史执行记录总数  
  `用途`：控制存储空间使用

- **报告数**：生成报告的总数量  
  `用途`：管理报告存储资源

### 📅 任务管理
- **任务数**：测试任务总数  
  `用途`：控制自动化任务规模

- **任务迭代数**：单个任务的运行次数  
  `用途`：限制循环任务执行

### 🚀 性能资源
- **节点数**：分布式测试节点数量  
  `用途`：控制集群规模  
  `私有化调整`：需商业授权

- **并发数**：最大并发用户数  
  `用途`：保障系统性能稳定  
  `云端调整`：按需自动扩展

- **并发任务数**：同时运行的测试任务数  
  `用途`：控制系统负载

## 配额调整指南

### 私有化版本调整
1. 登录 AngusGM
2. 进入：`系统管理 → 资源配额`
3. 选择需调整的资源
4. 输入新配额值（不超过授权许可范围）
5. 保存生效

### 云服务版本调整
1. 访问云服务管理控制台
2. 提交配额调整工单
3. 描述业务扩展需求
4. 等待平台审核调整
5. 变更将在下一个计费周期生效

::: warning **重要提示**：
> 节点数、并发数和并发任务数在私有化环境中不可直接修改，需重新授权更高规格的许可文件。
> 云端版本性能资源会根据业务需求自动弹性调整，无需人工干预。
:::