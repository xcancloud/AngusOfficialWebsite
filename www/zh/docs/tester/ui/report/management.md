# 报告管理

AngusTester报告管理模块是一个高效的工具，用于生成、管理和存储各类报告。该模块支持多种操作，方便用户根据需要创建和修改报告，确保信息及时更新并符合需求。

## 报告操作

AngusTester 报告管理模块支持以下操作：

### 创建报告

用户可以通过选择模版和填写基本信息来创建新报告。

操作步骤:

1. 进入AngusTester报告页面，点击“创建报告”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-add.png?fid=251751417168003227&fpt=naTGDEeimY01BQlLxYL6QoidwEDdM3eS7s1bXHW9)
2. 在弹窗中选择合适的模版，设置时间生成选项，填写报告名称、描述等基本信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-add-content.png?fid=251751417168003225&fpt=9dfjhQBDN5IGKB3htUJUI1c0waZubCkNOGGq5ZJW)
3. 点击“确定”以保存报告。

***注意事项:***

- 名称和描述应简洁明了，说明报告的内容或用途，便于其他用户理解。
- 报告生成后内容会保持不变，如果需要更新内容可以通过“立即生成”或配置周期性生成报告来实现定时更新。

### 编辑报告

用户可以对已创建的报告进行编辑，更新报告内容或基本信息。

操作步骤:

1. 进入AngusTester报告页面，找到需要编辑的报告。
2. 点击“编辑”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-edit.png?fid=251751339858591922&fpt=QhioeAvq2DnPKr56WKdiE7MNGIo0mK0ej7OOjTcy)
3. 在弹窗中修改字段信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-edit-view.png?fid=251751339858591920&fpt=wHkcqSiayP9vd07A7clYHzhCV1ygfB1NFTYp1129)
4. 点击“确定”以应用更改。

***注意事项:***

- 编辑过程中确保信息的准确性。

### 查看报告

用户可以查看所有已创建的报告，了解报告的基本信息和状态。

操作步骤:

1. 进入AngusTester报告页面，找到需要查看的报告。
2. 点击目标报告的“查看”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-view.png?fid=251751417168003241&fpt=fFu2JwBTkTyMP73SropYC4tQSGTH0H606sCoMj4y)
3. 查看报告定义信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-view-view.png?fid=251751339858591924&fpt=gkiN1cXHeAvOBQjsnvLy7iUFMOFhRS2kbOHMJtpO)

### 查看报告内容

用户可以查看生成的报告内容，确保所需信息的完整性。

操作步骤:

1. 进入AngusTester报告页面，找到需要查看的报告。
2. 点击目标报告的名称打开报告内容页面。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-content.png?fid=251751417168003231&fpt=i3nS5BSBP2ucZVC1mkR9cyd5rAIzGvNLw1dE1zjy)
3. 在新打开的页面中查看报告内容。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-content-view.png?fid=251751417168003229&fpt=zfht3P5PSNnP9ViH9moAcLw7UGEhB4uS9w99e4Gv)

### 立即生成报告

用户可以选择立即生成报告以便快速获取结果，或者对报告信息更新。

操作步骤:

1. 进入AngusTester报告页面，找到需要立即生成报告的。
2. 点击“立即生成”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-gen-now.png?fid=251751417168003237&fpt=u3qEMs8xLakjC5m2MYgf9c31dDhx2G7dhqQLokcZ)
3. 等待系统反馈生成状态。

***注意事项:***

- 确保在生成前所有必填信息已填写完整。

### 删除报告

用户可以删除不再需要的报告，以维护报告管理的整洁性。

操作步骤:

1. 进入AngusTester报告页面，在报告列表中找到需要删除的报告。
2. 点击“删除”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-delete.png?fid=251751417168003233&fpt=CxuEkGYc4sL1SDcJqRar0j7WdPSWQheMb5JDk25K)
3. 在弹出的确认窗口中确认删除操作。
   
***注意事项:***

- 删除操作不可逆，请谨慎操作。
- 确保该报告不再被其他用户使用。

### 配置报告生成通知事件

用户可以设置生成报告后发送通知，确保相关人员及时获取报告信息。

操作步骤:

1. 进入AngusTester“配置”->"事件"->“推送配置”，找到"报告生成成功"事件选项。
2. 选择通知方式，如邮件、短信、站内消息，选择后会自动保存失效。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-event-config.png?fid=251751417168003235&fpt=O82I06hLuKp6SY1Tf11uy6TiqF4sCJ9BdkmU4MsI)

***注意事项:***
1. 配置后，默认只有报告创建人会收到通知。
2. 如果需要更多人收到提醒，需要进入全局管理应用“事件”中进行接收通道设置。


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