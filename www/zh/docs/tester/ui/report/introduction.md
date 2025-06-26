# 报告介绍

AngusTester提供多样化的报告模板，能够帮助团队更好地管理和优化测试和研发流程，确保项目的顺利进展和高质量交付。     

AngusTester的“报告”功能旨在为团队提供一个全面、系统化的工具，以总结研发和测试活动的各个方面。通过详尽的数据和分析，这些报告涵盖了项目的进度、效能、质量、执行情况以及结果分析等关键指标，从而大幅提高项目的透明度和团队间的沟通效率。无论是在项目的各个阶段，还是在不同的团队之间，清晰的报告都能为项目的成功交付提供有力的支持和保障。

报告不仅能够帮助团队及时识别问题，还能为决策提供数据驱动的依据。通过有效的报告管理，团队可以在动态变化的项目环境中，保持信息的一致性和准确性，确保所有相关人员都能实时了解项目的最新状态。

团队可以根据报告模板，在指定的时间内生成报告，并通过事件通知将其发送给相关人员。这一过程不仅自动化了报告的生成和分发，还确保了报告的及时性和有效性。用户可以查看自己添加的报告或被授权访问的报告内容，便于追踪和管理项目进展。

## 报告模版资源定义

以下是报告模版和资源完整定义，具体请查看AngusTester报告功能内容。

### 报告模版定义

| 报告模版标题         | 报告模版编码                      | 报告模版描述                                                   |
| ------------------ |-----------------------------|----------------------------------------------------------|
| 项目进度报告         | PROJECT_PROGRESS            | 报告项目任务、功能测试、接口测试、场景测试四部分完成进度。                            |
| 项目数据资产报告      | PROJECT_DATA_ASSETS         | 报告项目功能、接口、场景、脚本、任务、参数数据、报告和 Mock 接口等资源的增长趋势、状态分布以及共享排行榜。 |
| 项目效能报告         | PROJECT_EFFICIENCY          | 报告项目任务和用例结果汇总、效能指标统计及排行。                                 |
| 项目活动报告         | PROJECT_ACTIVITY            | 报告项目用户操作记录信息。                                            |
| 迭代报告            | TASK_SPRINT                 | 报告迭代信息、研发任务完成进度，迭代和经办人汇总统计信息。                            |
| 任务报告            | TASK                        | 报告单个任务处理结果及详情信息。                                         |
| 测试计划报告         | FUNC_TESTING_PLAN           | 报告测试计划信息、用例测试进度、测试计划和测试人汇总统计信息。              |
| 测试用例报告         | FUNC_TESTING_CASE           | 报告单个用例测试结果及详情信息。                                         |
| 服务测试结果报告     | SERVICES_TESTING_RESULT     | 报告服务信息、汇总统计及服务下接口测试结果信息。                                 |
| 接口测试结果报告     | APIS_TESTING_RESULT         | 报告接口信息、功能测试、性能测试、稳定性测试结果。                                |
| 场景测试结果报告     | SCENARIO_TESTING_RESULT     | 报告场景信息、功能测试、性能测试、稳定性测试结果。                                |
| 执行功能测试报告     | EXEC_FUNCTIONAL_RESULT      | 报告执行功能测试采样指标详细结果。                                        |
| 执行性能测试报告     | EXEC_PERFORMANCE_RESULT     | 报告执行性能测试采样指标详细结果。                                        |
| 执行稳定性测试报告   | EXEC_STABILITY_RESULT       | 报告执行稳定性测试采样指标详细结果。                                       |
| 执行自定义测试报告   | EXEC_CUSTOMIZATION_RESULT   | 报告执行自定义测试采样指标详细结果。                                       |


### 报告资源定义

| 报告资源标题 | 报告资源编码       | 资源子分类标题    | 资源子分类编码                   |
| ------------ | ------------------ |------------| -------------------------------- |
| 任务          | TASK               | 任务详细信息     | TASK_DETAIL                      |
|              |                    | 任务结果明细     | TASK_RESULT_LIST                 |
|              |                    | 任务汇总结果     | TASK_SUMMARY                     |
|              |                    | 任务状态分组统计   | TASK_STATUS_COUNT                |
|              |                    | 任务类型分组统计   | TASK_TYPE_COUNT                  |
|              |                    | 任务优先级分组统计  | TASK_PRIORITY_COUNT              |
|              |                    | 任务增长趋势     | TASK_GROW_THTREND                |
|              |                    | 任务燃尽图      | TASK_BURNDOWN_CHART              |
|              |                    | 任务贡献排行     | TASK_DATAASSETS_RANKING          |
|              |                    | 任务效能指标排行   | TASK_EFFICIENCY_RANKING          |
|              |                    | 迭代详细信息     | SPRINT_DETAIL                    |
|              |                    | 迭代增长趋势     | SPRINT_GROW_THTREND              |
| 功能测试      | FUNCTIONAL_TESTING | 用例详细信息     | CASE_DETAIL                      |
|              |                    | 用例测试结果明细   | CASE_RESULT_LIST                 |
|              |                    | 用例测试汇总结果   | CASE_SUMMARY                     |
|              |                    | 用例测试结果分组统计 | CASE_RESULT_COUNT                |
|              |                    | 用例类型分组统计   | CASE_REVIEW_COUNT                |
|              |                    | 用例优先级分组统计  | CASE_PRIORITY_COUNT              |
|              |                    | 用例增长趋势     | CASE_GROW_THTREND                |
|              |                    | 用例燃尽图      | CASE_BURNDOWN_CHART              |
|              |                    | 用例贡献排行     | CASE_DATAASSETS_RANKING          |
|              |                    | 用例效能指标排行   | CASE_EFFICIENCY_RANKING          |
|              |                    | 测试计划详细信息   | TESTING_PLAN_DETAIL              |
|              |                    | 测试计划增长趋势   | TESTING_PLAN_GROW_THTREND        |
| 接口测试      | APIS_TESTING       | 接口基本信息     | APIS_BASIC_INFO                  |
|              |                    | 接口测试结果详细信息 | APIS_TESTING_DETAIL              |
|              |                    | 接口测试结果明细   | APIS_TESTING_LIST                |
|              |                    | 接口测试汇总结果   | APIS_TESTING_SUMMARY             |
|              |                    | 接口状态分组统计   | APIS_STATUS_COUNT                |
|              |                    | 接口方法分组统计   | APIS_METHOD_COUNT                |
|              |                    | 接口增长趋势     | APIS_GROW_THTREND                |
|              |                    | 接口贡献排行     | APIS_DATAASSETS_RANKING          |
|              |                    | 服务详细信息     | SERVICES_DETAIL                  |
|              |                    | 服务汇总结果     | SERVICES_SUMMARY                 |
|              |                    | 服务增长趋势     | SERVICES_GROW_THTREND            |
| 场景测试      | SCENARIO_TESTING   | 场景基本信息     | SCENARIO_BASIC_INFO              |
|              |                    | 场景测试结果详细信息 | SCENARIO_TESTING_DETAIL          |
|              |                    | 场景测试结果明细   | SCENARIO_TESTING_LIST            |
|              |                    | 场景测试汇总结果   | SCENARIO_TESTING_SUMMARY         |
|              |                    | 场景插件分组统计   | SCENARIO_PLUGIN_COUNT            |
|              |                    | 场景增长趋势     | SCENARIO_GROW_THTREND            |
|              |                    | 场景贡献排行     | SCENARIO_DATAASSETS_RANKING      |
| 脚本          | SCRIPT             | 脚本插件分组统计   | SCRIPT_PLUGIN_COUNT              |
|              |                    | 脚本增长趋势     | SCRIPT_GROW_THTREND              |
|              |                    | 脚本贡献排行     | SCRIPT_GDATAASSETS_RANKING       |
| Mock         | MOCK               | Mock 资源统计  | MOCK_RESOURCE_COUNT              |
|              |                    | Mock 增长趋势  | MOCK_RESOURCE_GROW_THTREND       |
|              |                    | Mock 贡献排行  | MOCK_API_DATAASSETS_RANKING      |
| 数据          | DATA               | 数据资源统计     | DATA_RESOURCE_COUNT              |
|              |                    | 数据资源增长趋势   | DATA_RESOURCE_GROW_THTREND       |
|              |                    | 变量贡献排行     | DATA_VARIABLE_DATAASSETS_RANKING |
|              |                    | 数据集贡献排行    | DATA_DATASET_DATAASSETS_RANKING  |
| 执行          | EXECUTION          | 执行信息       | EXECUTION_INFO                   |
|              |                    | 执行汇总结果     | EXECUTION_SUMMARY_RESULT         |
|              |                    | 执行采样结果     | EXECUTION_SAMPLING_RESULT        |
|              |                    | 执行日志       | EXECUTION_LOGS                   |
| 报告          | REPORT             | 报告分类分组统计   | REPORT_CATEGORY_COUNT            |
|              |                    | 报告增长趋势     | REPORT_GROW_THTREND              |
|              |                    | 报告记录增长趋势   | REPORT_RECORD_GROW_THTREND       |
|              |                    | 报告贡献排行     | REPORT_DATAASSETS_RANKING        |
| 活动          | ACTIVITY           | 活动信息明细     | ACTIVITY_LIST                    |
|              |                    | 活动操作资源分组统计 | ACTIVITY_RESOURCE_COUNT          |
|              |                    | 活动增长趋势     | ACTIVITY_GROW_THTREND            |


## 数据权限

报告数据权限控制是指在编写或使用特定报告时，对报告访问和操作，进行严格安全管理和控制的过程。***默认不开启授权控制，即项目的所有成员都可以访问和操作。***

### 权限控制的目的

- 保护敏感信息：通过限制对敏感数据的访问，可以有效防止未经授权的数据泄露。
- 维护数据完整性：确保只有经过授权的用户或报告能够修改数据，避免数据被误改或恶意篡改。
- 遵守法规要求：许多行业标准和法律法规都要求对个人数据进行严格的保护措施。

### 实施方法

允许管理员访问所有数据，而普通用户只能访问其工作相关被授权数据，支持授权方式如下：

- 共享权限：在报告操作中选择“授权”，设置报告为“无权限控制”，允许其他用户访问和执行。
- 指定权限：设置报告为“有权限控制”，授权特定用户、部门或用户组报告的部分或全部权限，确保安全性和可控性。


## 字段信息

| 参数                 | 字段名                | 类型         | 必填     | 长度限制 | 说明                                                                 |
|----------------------|-----------------------|--------------|----------|----------|----------------------------------------------------------------------|
| **ID**               | id                   | `bigint`     | **条件** | /        | 报告唯一标识符；<br/>修改时必须                                           |
| **项目ID**           | projectId            | `long`       | **是**   | /        | 所属项目唯一标识                                                     |
| **报告名称**         | name                 | `string`     | **是**   | ≤200     | 报告简要概述                                                         |
| 授权控制             | auth                 | `boolean`    | 否       | /        | 是否启用权限控制（默认`false`）                                      |
| **报告版本**         | version              | `string`     | **是**   | ≤20      | 报告版本标识                                                         |
| 描述                 | description          | `string`     | 否       | ≤200     | 报告详细描述                                                         |
| **报告类别**         | category             | `enum`       | **是**   | /        | **类别枚举**：<br/>项目报告/任务报告/功能测试报告/接口测试报告/场景测试报告/执行报告 |
| **报告模板**         | template             | `enum`       | **是**   | /        | **模板枚举**：<br/>项目进度报告/项目数据资产报告/项目效能报告/项目活动报告/迭代报告/任务报告/测试计划报告/测试用例报告/服务测试结果报告/接口测试结果报告/接口测试报告/场景测试结果报告/场景测试报告/执行功能测试报告/执行性能测试报告/执行稳定性测试报告/执行自定义测试报告 |
| **时间设置**         | createTimeSetting    | `object`     | **是**   | /        | 报告生成时间配置                                                     |
| **基础信息设置**     | basicInfoSetting     | `object`     | **是**   | /        | 报告基础信息配置                                                     |
| **内容设置**         | contentSetting       | `object`     | **是**   | /        | 报告内容配置                                                         |
| 报告状态             | status               | `enum`       | 只读     | /        | **状态枚举**：<br/>生成中/已完成/失败                                     |
| 失败原因             | failureMessage       | `string`     | 只读     | /        | 报告生成失败原因                                                     |
| 创建方式             | createdAt            | `enum`       | 只读     | /        | **创建方式枚举**：<br/>立即/定时/周期                                     |
| 下次生成时间         | nextGenerationDate   | `datetime`   | 只读     | /        | 下次报告生成时间                                                     |
| 目标ID               | targetId             | `long`       | 只读     | /        | 报告关联目标ID                                                       |
| 目标类型             | targetType           | `enum`       | 只读     | /        | 报告关联目标类型                                                     |
| 目标名称             | targetName           | `string`     | 只读     | /        | 报告关联目标名称                                                     |
| 租户ID               | tenantId             | `long`       | 只读     | /        | 所属租户ID                                                           |
| 创建人ID             | createdBy            | `long`       | 只读     | /        | 报告创建人ID                                                         |
| 创建人姓名           | createdByName        | `string`     | 只读     | /        | 创建人姓名                                                           |
| 创建时间             | createdDate          | `datetime`   | 只读     | /        | 报告创建时间                                                         |
| 最后修改人ID         | lastModifiedBy       | `long`       | 只读     | /        | 最后修改人ID                                                         |
| 最后修改人姓名       | lastModifiedByName   | `string`     | 只读     | /        | 最后修改人姓名                                                       |
| 最后修改时间         | lastModifiedDate     | `datetime`   | 只读     | /        | 最后修改时间                                                         |

## 时间设置字段（createTimeSetting）

| 参数                 | 字段名                | 类型         | 必填 | 长度限制 | 说明                              |
|----------------------|-----------------------|--------------|------|----------|---------------------------------|
| **创建方式**         | createdAt             | `enum`       | **是** | /        | **创建方式枚举**：<br/>立即/定时/周期        |
| 指定时间             | createdAtSomeDate     | `datetime`   | 条件 | /        | 定时创建的具体时间；<br/>当创建方式为"定时"时必须        |
| 周期单位             | periodicCreationUnit  | `enum`       | 条件 | /        | **周期单位枚举**：天/周/月；<br/>当创建方式为"周期"时必须 |
| 星期几               | dayOfWeek             | `enum`       | 条件 | /        | **星期枚举**：周一至周日；<br/>当周期单位为"周"时必须    |
| 每月日期             | dayOfMonth            | `int`        | 条件 | /        | 每月具体日期（1-31）；<br/>当周期单位为"月"时必须      |
| 每日时间             | timeOfDay             | `time`       | 条件 | /        | 每日具体时间；<br/>当创建方式为"周期"时必须           |

## 基础信息设置字段（basicInfoSetting）

| 参数                 | 字段名                | 类型         | 必填 | 长度限制 | 说明                                                                 |
|----------------------|-----------------------|--------------|------|----------|----------------------------------------------------------------------|
| 报告联系人           | reportContacts        | `string`     | 否   | ≤200     | 报告负责人联系方式                                                   |
| 版权信息             | reportCopyright       | `string`     | 否   | ≤200     | 报告版权声明                                                         |
| 其他信息             | otherInformation      | `string`     | 否   | ≤200     | 补充说明信息                                                         |
| 水印                 | watermark             | `string`     | 否   | ≤100     | 报告水印文本                                                         |

## 内容设置字段（contentSetting）

| 参数                 | 字段名                | 类型         | 必填 | 长度限制 | 说明                                                                 |
|----------------------|-----------------------|--------------|------|----------|----------------------------------------------------------------------|
| **过滤设置**         | filter                | `object`     | **是** | /        | 报告内容过滤配置                                                     |
| 目录内容             | catalogContent        | `map`        | 否   | /        | 报告目录结构配置                                                     |

### 过滤设置字段（filter）

| 参数                 | 字段名                | 类型         | 必填 | 长度限制 | 说明                                                                 |
|----------------------|-----------------------|--------------|------|----------|----------------------------------------------------------------------|
| **目标类型**         | targetType            | `enum`       | **是** | /        | **目标类型枚举**：<br/>项目/任务/测试计划/测试用例                         |
| **目标ID**           | targetId              | `long`       | **是** | /        | 报告内容关联目标ID                                                   |
| 创建组织类型         | creatorObjectType     | `enum`       | 否   | /        | **组织类型枚举**：<br/>用户/部门/小组                                     |
| 创建组织ID           | creatorObjectId       | `long`       | 否   | /        | 资源创建组织ID                                                       |
| 计划/迭代ID          | planOrSprintId        | `long`       | 否   | /        | 关联计划或迭代ID                                                     |
| 创建开始时间         | createdDateStart      | `datetime`   | 否   | /        | 资源创建时间范围起点                                                 |
| 创建结束时间         | createdDateEnd        | `datetime`   | 否   | /        | 资源创建时间范围终点                                                 |

### 报告类别（category）
| 枚举值           | 说明             |
|------------------|------------------|
| `PROJECT`        | 项目报告         |
| `TASK`           | 任务报告         |
| `FUNCTIONAL`     | 功能测试报告     |
| `APIS`           | 接口测试报告     |
| `SCENARIO`       | 场景测试报告     |
| `EXECUTION`      | 执行报告         |

### 报告模板（template）
| 枚举值                       | 说明                   |
|------------------------------|------------------------|
| `PROJECT_PROGRESS`           | 项目进度报告           |
| `PROJECT_DATA_ASSETS`        | 项目数据资产报告       |
| `PROJECT_EFFICIENCY`         | 项目效能报告           |
| `PROJECT_ACTIVITY`           | 项目活动报告           |
| `TASK_SPRINT`                | 迭代报告               |
| `TASK`                       | 任务报告               |
| `FUNC_TESTING_PLAN`          | 测试计划报告           |
| `FUNC_TESTING_CASE`          | 测试用例报告           |
| `SERVICES_TESTING_RESULT`    | 服务测试结果报告       |
| `APIS_TESTING_RESULT`        | 接口测试结果报告       |
| `APIS_TESTING`               | 接口测试报告           |
| `SCENARIO_TESTING_RESULT`    | 场景测试结果报告       |
| `SCENARIO_TESTING`           | 场景测试报告           |
| `EXEC_FUNCTIONAL_RESULT`     | 执行功能测试报告       |
| `EXEC_PERFORMANCE_RESULT`    | 执行性能测试报告       |
| `EXEC_STABILITY_RESULT`      | 执行稳定性测试报告     |
| `EXEC_CUSTOMIZATION_RESULT`  | 执行自定义测试报告     |

### 报告状态（status）
| 枚举值         | 说明       |
|----------------|------------|
| `GENERATING`   | 生成中     |
| `COMPLETED`    | 已完成     |
| `FAILED`       | 失败       |