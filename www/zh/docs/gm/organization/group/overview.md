---
title: AngusGM用户组管理
outline: deep
---

# 用户组管理

::: tip 重要提示
> **用户组管理** 是组织实现敏捷团队运作的核心模块，支持按职能、项目或跨部门需求灵活创建虚拟团队，赋能企业快速响应业务变化。
:::

## 核心能力体系

```mermaid  
graph LR
    A[团队构建] --> B[资源调度]  
    B --> C[目标执行]  
    C --> D[效能评估]  
    style A fill:#4CAF50,stroke:#388E3C  
    style D fill:#FF9800,stroke:#F57C00  
```  

### 1. 团队编排
- **三维度建组机制**
  ```mermaid  
  graph LR  
      F[职能型] --> |开发/测试/运维| G[专业深耕]  
      P[项目型] --> |需求迭代/专项攻坚| Q[目标驱动]  
      M[矩阵型] --> |跨部门协作| R[资源整合]  
  ```  

- **成员能力图谱**  
  | 评估维度     | 分析指标               |  
  |--------------|------------------------|  
  | 专业技能     | 认证资格/项目履历      |  
  | 协作能力     | 跨组合作评分           |  
  | 负荷状态     | 当前任务饱和度         |

### 2. 精准目标管理
- **OKR动态追踪**
  ```mermaid
  graph TD
    A[目标完成监测] -- 25% ---> B(超前完成)
    A -- 60% ---> C(正常进度)
    A -- 15% ---> D(进度滞后)
   ```
  > **里程碑预警机制**
  > - 关键节点前72小时提醒
  > - 进度偏差＞15%自动升级
  > - 资源缺口触发智能调配

### 3. 资源最优配置
- **四维资源分析模型**
  ```mermaid  
  graph BT  
      H[人力资源] --> A  
      T[时间资源] --> A[效能最优解]  
      B[预算资源] --> A  
      D[设备资源] --> A  
  ```  
  > - 人力资源：技能匹配度≥90%
  > - 时间资源：关键路径优化率35%↑
  > - 设备资源：共享率提升至70%

### 4. 协作效能优化
- **跨组沟通热力图**  
  | 协作维度       | 健康指标                |  
  |----------------|-------------------------|  
  | 沟通频率       | 5-7次/周/关键成员       |  
  | 响应时效       | ≤2小时（非紧急事项）    |  
  | 信息衰减率     | ≤15%（三层传递内）     |


## 组信息

| 参数                | 类型         | 必填 | 长度限制 | 说明                                                                     |
|---------------------|--------------|------|----------|------------------------------------------------------------------------|
| **ID**                   | `bigint`     | **条件** | /        | 唯一标识符；<br/>系统自动生成；<br/>修改时必须    |
| **名称**            | `string`     | **是** | ≤100     | 组显示名称，<br/>如：AngusTester 开发 1 组                                             |
| **编码**            | `string`     | **是** | ≤80      | 组唯一编码，<br/>如：AngusTester-Dev1                                               |
| **是否启用**         | `boolean`    | **是** | /        | 组状态开关；默认`true`                                                         |
| **来源**            | `enum`       | **是** | ≤20      | **组来源**：<br/>- `BACKGROUND_ADDED-后台添加`<br/>- `LDAP_SYNCHRONIZE-同步导入` |
| 用户目录ID           | `bigint`     | 只读 | /        | 关联的用户目录ID                                                              |
| 用户目录组成员ID     | `string`     | 只读 | /        | 用户目录中的组标识                                                              |
| 描述                | `string`     | 否   | ≤200     | 组功能描述，<br/>如：负责AngusTester主应用开发                                             |
| 租户ID              | `bigint`     | 只读 | /        | 关联租户：<br/>- `-1`表示未关联租户                                            |
| 创建人              | `bigint`     | 只读 | /        | 组创建人ID）                                                                |
| 创建时间             | `datetime`   | 只读 | /        | 组创建时间                                                                  |
| 最后修改人           | `bigint`     | 只读 | /        | 最后修改人ID                                                                |
| 最后修改时间         | `datetime`   | 只读 | /        | 最后修改时间                                                                 |

