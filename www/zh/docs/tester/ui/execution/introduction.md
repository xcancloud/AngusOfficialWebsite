# 执行介绍

AngusTester的“执行”功能为用户提供了一种高效、灵活的测试执行方式。通过合理配置和管理，用户能够更好地进行测试、生成数据并分析结果，进而提升整个测试流程的效率与质量。希望用户在使用过程中充分发挥这一功能的潜力，以实现更高效的测试管理。

在AngusTester中，"执行"功能为用户提供了一种便捷的方式来运行测试脚本和Mock数据脚本。通过这一功能，用户可以直接发起测试，并根据需要对测试结果进行更新。执行过程中的灵活配置选项使得用户能够根据项目需求自定义测试执行的行为。主要功能如下：

- 运行测试脚本：用户可以选择并执行已有的测试脚本，快速发起测试。
- 生成Mock数据：通过执行Mock数据脚本，用户可以自动生成所需的测试数据，减少手动配置的时间。
- 实时分析：在执行过程中，用户可即时查看执行采样指标，并对测试结果进行深度分析，帮助快速发现问题及优化测试流程。

## 可以完成的工作

- 根据测试脚本发起测试：通过选择合适的测试脚本，用户可以快速启动测试流程，确保测试的可持续性和回归性。
- 生成Mock数据：执行Mock数据脚本可以自动化生成测试数据，提升测试效率，确保测试环境的真实性和有效性。
- 时查看执行指标：在测试执行的同时，用户能够实时监控执行过程中的关键性能指标，方便及时调整测试策略。

## 注意事项

在使用“执行”功能时，用户需注意以下几点：

- 配置优先级：在执行过程中，"执行"配置的优先级高于"脚本"中的对应配置。这意味着在执行时使用的配置将覆盖脚本中的设置，确保执行过程的灵活性。
- 权限控制：执行添加后，只有执行添加人、执行脚本添加人、应用管理员和系统管理员能够修改执行配置。其他用户的权限仅限于查看，这样可以有效保护测试执行的完整性和安全性。
- 更新测试结果：对于接口测试和场景测试，只有在开启“更新测试结果”选项后，执行结果才会被更新到相应的接口和场景测试结果中。这一设置确保了测试结果的准确性和可追溯性。

## 字段信息

| 参数       | 字段名                | 类型         | 必填     | 长度限制    | 说明                                                      |
|----------|-----------------------|--------------|----------|---------|---------------------------------------------------------|
| **ID**   | id                   | `bigint`     | **条件** | /       | 执行记录唯一标识符；修改时必须                                         |
| **执行名称** | name                 | `string`     | 否       | ≤100    | 执行任务名称，<br/>为空时使用脚本名称                                   |
| **脚本ID** | scriptId             | `long`       | **是**   | /       | 关联的脚本唯一标识                                               |
| 脚本类型     | scriptType           | `enum`       | 否       | /       | **脚本类型枚举**：<br/>功能测试/性能测试/稳定性测试/自定义测试/模拟数据/模拟接口         |
| 通用配置     | configuration        | `object`     | 否       | /       | 脚本执行的通用配置参数                                             |
| 插件参数     | arguments            | `map`        | 否       | /       | 插件专用配置参数                                                |
| 试用标记     | trial                | `boolean`    | 否       | /       | 是否为试用测试，只针对云服务版有效                   |
| 项目ID     | projectId            | `long`       | 只读     | /       | 所属项目唯一标识                                                |
| 执行编号     | no                   | `string`     | 只读     | /       | 执行任务编号                                                  |
| 插件类型     | plugin               | `string`     | 只读     | /       | 执行使用的插件类型                                               |
| 脚本名称     | scriptName           | `string`     | 只读     | /       | 关联脚本名称                                                  |
| 脚本来源     | scriptSource         | `enum`       | 只读     | /       | **脚本来源枚举**：<br/>自定义创建/导入创建/服务冒烟测试/服务安全测试/接口测试/场景测试/生成数据 |
| 脚本来源ID   | scriptSourceId       | `long`       | 只读     | /       | 脚本来源对象ID                                                |
| 脚本来源名称   | scriptSourceName     | `string`     | 只读     | /       | 脚本来源名称                                                  |
| 执行状态     | status               | `enum`       | 只读     | /       | **执行状态枚举**：<br/>已创建/调度中/执行中/已停止/失败/已完成/超时               |
| 迭代次数     | iterations           | `long`       | 只读     | /       | 执行迭代次数                                                  |
| 持续时间     | duration             | `object`     | 只读     | /       | 执行持续时间配置                                                |
| 线程数      | thread               | `int`        | 只读     | /       | 执行线程数量                                                  |
| 优先级      | priority             | `int`        | 只读     | /       | 执行任务优先级                                                 |
| 忽略断言     | ignoreAssertions     | `boolean`    | 只读     | /       | 是否忽略断言检查                                                |
| 启动模式     | startMode            | `enum`       | 只读     | /       | **启动模式枚举**：<br/>立即执行/定时执行                               |
| 定时启动时间   | startAtDate          | `datetime`   | 只读     | /       | 定时执行的具体时间                                               |
| 报告间隔     | reportInterval       | `object`     | 只读     | /       | 报告生成间隔时间                                                |
| 实际启动时间   | actualStartDate      | `datetime`   | 只读     | /       | 实际启动时间                                                  |
| 结束时间     | endDate              | `datetime`   | 只读     | /       | 执行结束时间                                                  |
| 仪表状态     | meterStatus          | `string`     | 只读     | /       | 执行仪表监控状态                                                |
| 仪表消息     | meterMessage         | `string`     | 只读     | /       | 仪表状态详情信息                                                |
| 执行人ID    | execBy               | `long`       | 只读     | /       | 执行操作人ID                                                 |
| 执行人姓名    | execByName           | `string`     | 只读     | /       | 执行人姓名                                                   |
| 创建人ID    | createdBy            | `long`       | 只读     | /       | 记录创建人ID                                                 |
| 创建人姓名    | createdByName        | `string`     | 只读     | /       | 创建人姓名                                                   |
| 创建时间     | createdDate          | `datetime`   | 只读     | /       | 记录创建时间                                                  |
| 最后修改人ID  | lastModifiedBy       | `long`       | 只读     | /       | 最后修改人ID                                                 |
| 最后修改人姓名  | lastModifiedByName   | `string`     | 只读     | /       | 最后修改人姓名                                                 |
| 最后修改时间   | lastModifiedDate     | `datetime`   | 只读     | /       | 最后修改时间                                                  |
| 采样统计摘要 | sampleSummaryInfo     | `object`     | 只读     | /      | 执行采样的统计摘要信息                                               |
| 操作权限     | hasOperation<br/>Permission| `boolean`    | 只读     | /      | 当前用户是否有操作权限                                               |
| 调度次数     | schedulingNum         | `int`        | 只读     | /      | 任务调度次数                                                         |
| 最后调度时间  | lastSchedulingDate    | `datetime`   | 只读     | /      | 最后一次调度时间                                                     |
| 最后调度结果   | lastSchedulingResult  | `list`       | 只读     | /      | 最后一次调度结果详情                                                 |
| 采样内容     | sampleContents        | `list`       | 只读     | /      | 执行采样的详细内容                                                   |

### 脚本配置（configuration）

请查看测试规范：[参数化 -> 执行配置](https://www.xcan.cloud/en/docs/tester/specification/content/configuration)

### 插件参数（arguments）

请查看测试规范：[任务 -> 插件配置参数](https://www.xcan.cloud/en/docs/tester/specification/content/task/pluginConfiguration)

### 脚本类型（scriptType）
| 枚举值               | 说明               |
|----------------------|--------------------|
| `TEST_FUNCTIONALITY`| 功能测试           |
| `TEST_PERFORMANCE`   | 性能测试           |
| `TEST_STABILITY`     | 稳定性测试         |
| `TEST_CUSTOMIZATION` | 自定义测试         |
| `MOCK_DATA`          | 模拟数据           |
| `MOCK_APIS`          | 模拟接口           |

### 脚本来源（scriptSource）
| 枚举值             | 说明             |
|--------------------|------------------|
| `USER_DEFINED`     | 自定义创建       |
| `IMPORTED`         | 导入创建         |
| `SERVICE_SMOKE`    | 服务冒烟测试     |
| `SERVICE_SECURITY` | 服务安全测试     |
| `API`              | 接口测试         |
| `SCENARIO`         | 场景测试         |
| `GENERATE_DATA`    | 生成数据         |

### 执行状态（status）
| 枚举值       | 说明             |
|--------------|------------------|
| `CREATED`    | 已创建           |
| `PENDING`    | 调度中           |
| `RUNNING`    | 执行中           |
| `STOPPED`    | 已停止           |
| `FAILED`     | 失败             |
| `COMPLETED`  | 已完成           |
| `TIMEOUT`    | 超时             |

### 启动模式（startMode）
| 枚举值          | 说明             |
|-----------------|------------------|
| `IMMEDIATELY`   | 立即执行         |
| `TIMING`        | 定时执行         |