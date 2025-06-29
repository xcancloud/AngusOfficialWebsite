# 功能用例介绍

AngusTester是一款专为敏捷测试团队设计的功能用例管理工具，旨在帮助团队高效地管理和跟踪项目用例。通过AngusTester用户可以创建和管理用例，以支持软件开发过程中的各个阶段。

## 主要作用

### 用例创建与定义

- 详细描述：用户可以为每个用例提供详细的描述，前置条件、测试步骤、要求和预期成果，确保所有团队成员对用例有清晰的理解。
- 标签与分类：用户可以为用例添加标签或选择分类，以便于后续筛选和搜索，帮助团队成员快速定位相关用例。
- 附件上传：支持上传相关文档、截图或其他附件，提供额外的信息支持，帮助团队更好地理解用例背景。

### 用例优先级和截止日期管理

- 优先级设置：用户可以根据用例的重要性和紧急程度设置优先级（如高、中、低），帮助团队合理安排工作。
- 截止日期与提醒：为用例设置截止日期，并自动生成提醒，确保团队成员在规定时间内完成用例，增强时间管理。

### 用例分配与责任管理

- 测试人指定：团队负责人可以将用例分配给特定成员，确保每个用例都有明确的测试人，提高责任感和用例完成率。
- 角色与权限管理：支持不同角色的权限设置，确保信息的安全性和私密性，同时满足团队协作的需求。

### 用例开发人

- 选择开发人：指定功能开发人，能够明确谁负责软件功能实现的正确性和缺陷的解决。
- 最终确认：在缺陷解决后，由测试人进行最终确认，确保用例达到预期标准并进行总结。

### 用例进度跟踪与更新

- 实时状态更新：团队成员可以随时更新用例状态（如“待测试”、“测试通过”、“测试未通过”等），确保所有人都能实时了解用例进展。
- 进度条与完成百分比：通过视觉化的进度条或百分比展示用例完成情况，帮助团队更直观地了解工作进展。

### 协作与沟通

- 评论与讨论区：团队成员可以在用例下进行评论和讨论，方便实时交流，快速解决问题，分享见解和建议。
- 补充备注：支持不通过成员对用例补充说明或进一步完善。

### 数据分析与报告生成

- 用例统计与分析：提供数据分析工具，用户可以生成用例完成情况、时间花费、团队绩效等统计报告，帮助管理层了解团队工作效率。
- 可视化报表：支持生成多种形式的可视化报表（如图表和仪表盘），便于团队和管理层快速识别问题和瓶颈，从而进行相应的调整。

### 绩效评估与激励

- 绩效追踪：基于用例完成情况自动生成个人和团队的绩效报告，为管理层提供评估依据。
- 激励措施：根据绩效评估结果，实施相应的激励措施，如奖励、荣誉称号等，增强团队的士气和凝聚力。

### 用例依赖关系管理

- 依赖关系设置：用户可以为用例设定依赖关系，明确某些用例在其他用例完成之后才能开始，有助于制定合理的项目计划。
- 可视化用例关系图：提供可视化的用例依赖关系图，帮助团队成员清晰了解用例之间的关系，优化工作顺序，减少资源冲突。

### 事件通知与提醒

- 个性化通知设置：用户可以根据业务要求，配置用户偏好设置通知选项，选择接收哪些类型的用例更新和提醒，以便专注于最重要的事项。
- 用例提醒：系统支持用例状态变更通知事件，自动发送提醒，确保重复性用例按时完成，降低遗漏的风险。

## 查看实时分析

通过AngusTester用例实时统计分析提供最新的用例进度和关键指标信息，使决策者能够迅速做出反应，调整策略和资源配置。
![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/case-real-summary.png?fid=251751417168003217&fpt=NmJnZnZdLAwA9tiC7H3s2b0AXdMgAOC1JbTq7xdU)

## 支持的视图

AngusTester提供多种视图模式，以适应不同用户的需求和偏好：

- 列表视图：以表格形式展示所有用例，用户可以快速浏览用例的基本信息，包括标题、状态、优先级和责任人。这种视图适合需要全面了解用例情况的用户。
  ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/case-view-list.png?fid=251751417168003221&fpt=fASulO050TVu4WEXCwulyvngdPSblwdFTFj5AylA)
- 平铺视图：以卡片形式展示用例，用户可以直观地看到每个用例的关键要素，并通过拖拽调整其优先级和状态。这种视图适合需要快速比较和编辑用例的用户。
  ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/case-view-plat.png?fid=251751417168003223&fpt=qUB7dVYL9gjEnukdgtrPYqCf84iQxvmrajg8T0Q2)
- 看板视图：采用看板形式，将用例按照不同状态（如“待处理”、“进行中”、“待确认”、“已完成”等）进行分类展示。此视图适合进行迭代开发的团队，能够清晰地看到用例的流动情况，便于团队协作和进度管理。
  ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/case-view-kanban.png?fid=251751417168003219&fpt=FcCUBadV4HWCJYdCy7YRrsURqVC7c4qAsAP1eaNn)

## 支持的流程

AngusTester的用例管理流程设计旨在提升工作效率，确保用例能够顺利推进。
![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/case-handle-flow.png?fid=251751417168003215&fpt=lX82ptXVMXdtz3OmhHeUeRDKlVBLkz9vdtAzfZ8l)

以下是AngusTester用例的处理流程各个状态的详细说明：

- 待评审：用例已经编写完成，等待相关人员进行评审。
- 评审通过：用例已经通过评审，被认为是合适且可执行的。
- 评审未通过：用例在评审过程中被发现存在问题，需要修改或重新设计。
- 待测试：用例已经开发完成，等待测试人员进行测试。
- 测试通过：用例已经通过测试，功能符合预期。
- 测试未通过：用例在测试过程中发现问题，需要开发人员修复后重新测试。
- 阻塞中：用例因为某些原因（如依赖其他功能、资源不足等）无法继续推进。
- 已取消：由于各种原因（如需求变更、优先级调整等），该用例被取消，不再进行。

## 字段信息

| 参数                 | 字段名                | 类型         | 必填     | 长度限制 | 说明                                                                 |
|----------------------|-----------------------|--------------|----------|----------|----------------------------------------------------------------------|
| **ID**               | id                   | `bigint`     | **条件** | /        | 用例唯一标识符；<br/>修改时必须                                           |
| **用例名称**         | name                 | `string`     | **是**   | ≤400     | 用例功能描述                                                         |
| **计划ID**           | planId               | `long`       | **是**   | /        | 关联测试计划唯一标识                                                 |
| 模块ID               | moduleId             | `long`       | 否       | /        | 所属功能模块ID                                                       |
| 软件版本             | softwareVersion      | `string`     | 否       | ≤40      | 目标软件版本                                                         |
| 优先级               | priority             | `enum`       | 否       | /        | 查看下面 [优先级](#)                                  |
| **截止日期**         | deadlineDate         | `datetime`   | **是**   | /        | 用例执行截止时间                                                     |
| 预估工作量           | evalWorkload         | `bigdecimal` | 否       | /        | 预估执行工作量                                                       |
| 前置条件             | precondition         | `string`     | 否       | ≤2000    | 执行前置条件                                                         |
| 步骤视图             | stepView             | `enum`       | 否       | /        | 查看下面 [步骤视图](#)                                 |
| **测试步骤**         | steps                | `list`       | 否       | /        | 测试步骤列表（最大100步）                                            |
| 描述                 | description          | `string`     | 否       | ≤2000    | 用例详细描述                                                         |
| **开发人员ID**       | developerId          | `long`       | **是**   | /        | 关联开发人员唯一标识                                                 |
| **测试人员ID**       | testerId             | `long`       | **是**   | /        | 关联测试人员唯一标识                                                 |
| 标签集               | tagIds               | `set`        | 否       | /        | 关联标签ID集合                                                       |
| 附件列表             | attachments          | `list`       | 否       | /        | 用例相关附件                                                         |
| 关联任务集           | refTaskIds           | `set`        | 否       | /        | 关联任务ID集合                                                       |
| 关联用例集           | refCaseIds           | `set`        | 否       | /        | 关联用例ID集合                                                       |
| 用例编号             | code                 | `string`     | 只读     | /        | 用例唯一编号（系统生成）                                             |
| 版本号               | version              | `int`        | 只读     | /        | 用例版本号                                                           |
| 项目ID               | projectId            | `long`       | 只读     | /        | 所属项目ID                                                           |
| 计划名称             | planName             | `string`     | 只读     | /        | 关联计划名称                                                         |
| 计划授权状态         | planAuth             | `boolean`    | 只读     | /        | 计划是否启用权限控制                                                 |
| 模块名称             | moduleName           | `string`     | 只读     | /        | 所属模块名称                                                         |
| 是否逾期             | overdue              | `boolean`    | 只读     | /        | 执行是否逾期                                                         |
| 工作量评估方法       | evalWorkloadMethod   | `enum`       | 只读     | /        | 查看下面 [工作量评估方法](#)                                         |
| 实际工作量           | actualWorkload       | `bigdecimal` | 只读     | /        | 实际消耗工作量                                                       |
| 评审状态             | review               | `boolean`    | 只读     | /        | 是否经过评审                                                         |
| 评审人ID             | reviewerId           | `long`       | 只读     | /        | 评审人ID                                                             |
| 评审人姓名           | reviewerName         | `string`     | 只读     | /        | 评审人姓名                                                           |
| 评审时间             | reviewDate           | `datetime`   | 只读     | /        | 评审时间                                                             |
| **评审状态**         | reviewStatus         | `enum`       | 只读     | /        | 查看下面 [评审状态](#)                           |
| 评审备注             | reviewRemark         | `string`     | 只读     | /        | 评审意见备注                                                         |
| 评审次数             | reviewNum            | `int`        | 只读     | /        | 评审总次数                                                           |
| 评审失败次数         | reviewFailNum        | `int`        | 只读     | /        | 评审未通过次数                                                       |
| 测试人员姓名         | testerName           | `string`     | 只读     | /        | 测试人员姓名                                                         |
| 开发人员姓名         | developerName        | `string`     | 只读     | /        | 开发人员姓名                                                         |
| 是否未计划           | unplanned            | `boolean`    | 只读     | /        | 是否未纳入计划                                                       |
| 测试次数             | testNum              | `int`        | 只读     | /        | 执行测试总次数                                                       |
| 测试失败次数         | testFailNum          | `int`        | 只读     | /        | 测试失败次数                                                         |
| **测试结果**         | testResult           | `enum`       | 只读     | /        | 查看下面 [测试结果](#)            |
| 测试备注             | testRemark           | `string`     | 只读     | /        | 测试结果备注                                                         |
| 结果处理时间         | testResultHandleDate | `datetime`   | 只读     | /        | 测试结果处理时间                                                     |
| 标签信息             | tags                 | `list`       | 只读     | /        | 标签详细信息列表                                                     |
| 关联任务信息         | refTaskInfos         | `list`       | 只读     | /        | 关联任务详细信息                                                     |
| 关联用例信息         | refCaseInfos         | `list`       | 只读     | /        | 关联用例详细信息                                                     |
| 全版本用例           | allVersionCaseVos    | `map`        | 只读     | /        | 所有历史版本用例信息                                                 |
| 进度信息             | progress             | `object`     | 只读     | /        | 用例执行进度                                                         |
| 收藏状态             | favourite            | `boolean`    | 只读     | /        | 是否收藏                                                             |
| 关注状态             | follow               | `boolean`    | 只读     | /        | 是否关注                                                             |
| 评论数量             | commentNum           | `int`        | 只读     | /        | 评论数量                                                             |
| 活动数量             | activityNum          | `int`        | 只读     | /        | 活动记录数量                                                         |
| 租户ID               | tenantId             | `long`       | 只读     | /        | 所属租户ID                                                           |
| 创建人ID             | createdBy            | `long`       | 只读     | /        | 用例创建人ID                                                         |
| 创建人姓名           | createdByName        | `string`     | 只读     | /        | 创建人姓名                                                           |
| 创建人头像           | avatar               | `string`     | 只读     | /        | 创建人头像地址                                                       |
| 创建时间             | createdDate          | `datetime`   | 只读     | /        | 用例创建时间                                                         |
| 最后修改人ID         | lastModifiedBy       | `long`       | 只读     | /        | 最后修改人ID                                                         |
| 最后修改人姓名       | lastModifiedByName   | `string`     | 只读     | /        | 最后修改人姓名                                                       |
| 最后修改时间         | lastModifiedDate     | `datetime`   | 只读     | /        | 最后修改时间                                                         |

### 测试步骤（steps）
**数据结构**：
```json
[
  {
    "step": "输入用户名和密码",
    "expectedResult": "登录成功"
  },
  {
    "step": "点击支付按钮",
    "expectedResult": "跳转支付页面"
  }
]
```

### 步骤视图（stepView）
| 模式       | 显示方式           |
|------------|--------------------|
| `TABLE`    | 表格形式展示步骤   |
| `TEXT`     | 纯文本形式展示步骤 |

### 优先级（priority）
| 枚举值       | 说明   |
|--------------|--------|
| `HIGHEST`    | 最高   |
| `HIGH`       | 高     |
| `MEDIUM`     | 中     |
| `LOW`        | 低     |
| `LOWEST`     | 最低   |

### 工作量评估方法（evalWorkloadMethod）
| 枚举值           | 说明               |
|------------------|--------------------|
| `WORKING_HOURS`  | 工时评估           |
| `STORY_POINT`    | 故事点评估         |

### 评审状态（reviewStatus）
| 枚举值         | 说明         |
|----------------|--------------|
| `PENDING`      | 待评审       |
| `PASSED`       | 评审通过     |
| `FAILED`   | 评审未通过   |

### 测试结果（testResult）
| 枚举值         | 说明         |
|----------------|--------------|
| `PENDING`      | 待测试       |
| `PASSED`       | 测试通过     |
| `NOT_PASSED`   | 测试未通过   |
| `BLOCKED`      | 阻塞中       |
| `CANCELED`     | 已取消       |