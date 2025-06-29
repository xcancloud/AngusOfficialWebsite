# 执行管理

AngusTester执行管理模块为用户提供了高效的执行管理能力用户可以随时管理、监控和优化测试执行过程，确保软件质量的持续提升。

## 执行信息

在AngusTester中，每个执行包含以下字段信息：

- ID：每个执行的唯一标识符，创建执行后自动分配。
- 项目ID：执行所属项目唯一标识符。
- 服务ID: 执行测试接口服务，便于跟踪与该服务相关的脚本和测试。
- 名称: 执行名称，默认为脚本名称+测试类型，用于简洁明了地描述其功能或目的。
- 插件名称: 脚本执行插件的名称，在执行时会根据名称自动加载最新版本运行执行。
- 脚本类型: 指明脚本的类型，有助于管理和分类不同的任务。
- 脚本ID: 执行脚本唯一标识符。
- 脚本内容: 执行脚本内容，以YAML格式编写的脚本内容，包含具体的测试指令和配置参数。
- 脚本来源: 脚本的来源，有助于理解其来源和维护责任，具体来源包括：
    - 服务冒烟测试：表示是一个服务冒烟测试脚本。
    - 服务安全测试：表示是一个服务安全测试脚本。
    - 接口测试：表示是一个服接口测试脚本。
    - 场景测试：表示是一个场景测试脚本。
    - 生成Mock数据：表示是一个生产数据Mock脚本。
- 脚本来源资源ID: 脚本来源于资源唯一标识符，以便追踪和管理。
- 执行状态: 当前脚本的执行状态，用于监控脚本的运行情况。
    - 已创建：任务已成功创建，但尚未开始执行。
    - 调度中：任务正在被安排执行，等待合适的时机开始。
    - 执行中：任务当前正在进行实际的处理或计算。
    - 已停止：任务被手动或自动中止，未能完成。
    - 失败：任务在执行过程中遇到错误，未能成功完成。
    - 已完成：任务成功执行完毕，所有操作已完成并生成结果。
    - 超时：任务在规定时间内未完成，系统自动终止了执行。
- 迭代次数: 表示脚本被执行的次数，帮助分析脚本的稳定性和性能表现。
- 迭代时长: 每次执行的时长，有助于性能分析和优化。
- 线程数: 执行时使用的线程数量，影响并发性能和资源使用情况。
- 优先级: 指定执行的优先级，高优先级的脚本会被优先执行，影响调度策略。
- 忽略断言: 指示是否在测试中忽略断言检查，通常用于调试阶段或者特定需求下。
- 启动模式: 定义执行的启动方式，支持立即启动和定时启动两种方式，影响执行的控制方式。
- 计划启动时间: 预定的启动时间，帮助调度和计划管理。
- 启动超时: 设置启动的最长等待时间，防止执行在启动过程中无限期阻塞。
- 报告间隔: 指明采样结果的生成频率，用于实时监控和分析测试结果。
- 更新测试结果状态: 是否在执行后更新测试结果到对应测试资源，确保结果的最新性。
- 同步测试结果失败原因: 如果同步测试结果失败，记录失败的原因，以便后续排查和修复。
- 是否体验执行: 表示该执行是一个SaaS版本免费测试任务。
- 可用节点IDs: 可用于运行执行的节点列表，指定后优先从可用节点中选择节点运行执行，便于精准化节点调度。
- 应用节点IDs: 被测试服务所在应用节点，用于分析和监控被测试服务所在节点的资源使用和瓶颈。
- 执行节点IDs: 实际执行的节点列表。
- 实际开始时间: 记录执行实际开始时间，有助于分析执行效率。
- 结束时间: 记录执行实际完成时间，便于计算总执行时长。
- 执行人: 运行执行的用户，便于追踪责任和沟通。
- 调度次数: 表示该执行被调度的次数，用于分析其执行频率。
- 最后调度结果: 最近一次执行调度结果，便于快速评估脚本的状态。
- 采样状态: 执行采样状态，采样上报的采样错误状态编码。
- 采样状态信息: 提供关于采样状态的详细信息，以帮助分析采样过程中的可能问题。
- 创建人：创建该执行的用户。
- 创建时间：创建执行的时间。
- 最后修改人：最后修改该执行的用户。
- 最后修改时间：最后一次修改执行的时间。

注意：关于执行采样指标信息请查看：“指标与度量”->“测试指标”。

## 执行操作

AngusTester提供多种操作来管理执行，具体操作及其说明如下：

### 添加执行

创建新的执行任务，用于执行测试或生成测试数据。

操作步骤:

1. 进入AngusTester执行页面，点击“添加执行”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/exec-add.png?fid=251751339858591966&fpt=c9XbmBAJzKu70uA8PLSQCE1VpLQfLiesefgRNG8w)
2. 在弹窗里选择测试脚本、配置线程、执行时长等必须信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/exec-add-config.png?fid=251751339858591964&fpt=Rw4rPRbzzfhGwPI5MMZwuXxef9WNPmTw4OH7eFIG)
3. 保存执行，系统会自动优先级和运行时间配置调度运行执行。

### 体验执行

启动一个体验测试任务，适用于云服务版（SaaS）版本非付费用户运行和验证测试。

操作步骤:

1. 进入AngusTester执行页面，点击“体验执行”按钮。
2. 在弹窗里选择测试脚本、配置线程、执行时长等必须信息。
3. 保存执行，系统会自动优先级和运行时间配置调度运行执行。

***注意事项:***

- 体验执行只适用云服务版（SaaS），私有化版本不适用。
- 体验任务数默认不允许超过5个。

### 启动执行

启动执行任务，进入实际测试或者生成数据阶段。

操作步骤:

1. 进入AngusTester执行页面，选择需要修改的执行。
2. 点击执行对应的“启动”操作，点击后系统会自动调度运行执行。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/exec-start.png?fid=251751339858591980&fpt=fYneiD01qEhwOn9wmaMeI9tUZSUSUjFUD8xhV12c)

### 停止执行

中止当前的执行任务，结束测试或生成数据。

操作步骤:

1. 进入AngusTester执行页面，选择需要修改的执行。
2. 点击执行对应的“停止”操作，点击后系统会强制停止执行。

***注意事项:***

- 停止执行后，任务状态将更新为“已停止”，请谨慎操作。

### 修改执行配置

更改当前执行任务的配置参数，如并发模式、超时时间、执行节点等。

完整参数配置请查看：脚本规范-[执行配置](https://www.xcan.cloud/help/doc/205509853639082016?c=206089861055120447)。

操作步骤:

1. 进入AngusTester执行页面，选择需要修改的执行。
2. 点击执行对应的“修改执行配置”操作，根据需要进行修改。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/exec-config-edit.png?fid=251751339858591970&fpt=duVmQcGj8y5p897l7ehfegFyKSrSfZr6QOMmxQTY)
3. 点击“确定”以更新配置。

### 修改线程数

调整并发执行的线程数量，以控制测试的并发程度，影响测试的速度和资源消耗。具体参数配置请查看：脚本规范-[执行配置](https://www.xcan.cloud/help/doc/205509853639082016?c=206089861055120447)-线程。

操作步骤:

1. 进入AngusTester执行页面，选择需要修改的执行。
2. 点击执行对应的线程数编辑图标，根据需要进行修改。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/exec-config-thread.png?fid=251751339858591976&fpt=IopboNIrQY1Be7LwqmI70Zx5iDnR3NesZJf1QskB)
3. 鼠标离开失焦后会自动保存修改。

***注意事项:***

- 线程数的修改会影响并发执行的能力，建议根据执行节点配置、系统负载和测试需求合理设置，过多线程会导致执行节点系统卡顿。

### 修改迭代

更改执行迭代次数，用于控制精确采样次数场景。具体参数说明请查看：脚本规范-[执行配置](https://www.xcan.cloud/help/doc/205509853639082016?c=206089861055120447)-迭代次数。

操作步骤:

1. 进入AngusTester执行页面，选择需要修改的执行。
2. 点击执行对应的迭代次数编辑图标，根据需要进行修改。
3. 鼠标离开失焦后会自动保存修改。

***注意事项:***

- 增加迭代次数可能导致测试时间延长，需根据实际需求进行调整。

### 修改优先级

调整当前执行任务的优先级，以决定其在执行队列中的处理顺序。具体参数说明请查看：脚本规范-[执行配置](https://www.xcan.cloud/help/doc/205509853639082016?c=206089861055120447)-任务优先级。

操作步骤:

1. 进入AngusTester执行页面，选择需要修改的执行。
2. 点击执行对应的优先级编辑图标，根据需要进行修改。
3. 鼠标离开失焦后会自动保存修改。

***注意事项:***

- 优先级设置影响任务调度顺序，确保根据测试的紧急性进行调整。

### 修改报告间隔

设置生成报告的时间间隔，通常用于控制报告的频率和详细程度。具体参数说明请查看：脚本规范-[执行配置](https://www.xcan.cloud/help/doc/205509853639082016?c=206089861055120447)-报告采样结果的间隔。

操作步骤:

1. 进入AngusTester执行页面，选择需要修改的执行。
2. 点击执行对应的优先级编辑图标，根据需要进行修改。
3. 鼠标离开失焦后会自动保存修改。

***注意事项:***

- 报告间隔设置要合理，过短可能导致报告过于频繁，过长可能错过关键数据。
- 推荐间隔 5s-30s，如果设置成最小1s，Http单接口测试大约会生成2万条数据，会直接影响系统容量。

### 开启/关闭忽略断言

选择是否在执行采样过程中忽略断言，忽略后会明显提升性能，默认在性能测试时关闭，功能测试时开启。

操作步骤:

1. 进入AngusTester执行页面，选择需要修改的执行。
2. 点击执行对应的“忽略断言”开关，点击后修改自动生效。

***注意事项:***

- 功能测试时，开启忽略断言可能导致测试结果不准确，建议在确认无误的情况下使用。

### 开启/关闭更新测试结果

是否在每次执行后更新执行测试结果到接口和场景测试结果，以便实时反映测试状态。

操作步骤:

1. 进入AngusTester执行页面，选择需要修改的执行。
2. 点击执行对应的“更新测试结果”开关，点击后修改自动生效。

***注意事项:***

- 确保在需要更新测试结果时开启此选项，以便准确记录测试执行状态。
- 目前只支持来源是接口和场景的Http协议测试更新测试结果。

### 查看执行采样详情

查看特定执行任务的详细采样数据，以分析结果、性能或找出问题。具体指标定义信息请查看：测试指标。

操作步骤:

1. 进入AngusTester执行页面，点击需要查看详情的执行名称。
2. 点击后会进入执行详情页面。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/exec-detail.png?fid=251751417168003285&fpt=FnXyiZVaWeLupxbgZH5m8g4PUgs6sl5mNLBlyc0F)

***注意事项:***

- 采样详情提供了执行过程中的关键数据，便于分析和优化。

***注意事项:***

- 调度日志记录了任务调度的历史信息，有助于排查问题。
- 采样日志包含调试记录、请求错误等信息，有助于排查问题。

### 查看实际执行配置

用于记录当前执行的实际配置参数。注意：修改执行配置参数后，实际执行配置参数会和原始脚本不一致。

操作步骤:

1. 进入AngusTester执行页面，点击需要查看实际执行配置的执行名称。
2. 点击进入执行详情页面后，再点击进入“执行配置”Tab页面，可以实际执行的配置选项。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/exec-detail-config.png?fid=251751417168003277&fpt=jsJF4ZxXYoUH2pVTZTZffNIowwwaHHYdRFwjOuZE)

### 查看实际执行脚本

查看当前执行所使用的脚本内容，以便进行审查和修改。

操作步骤:

1. 进入AngusTester执行页面，点击需要查看实际执行脚本的执行名称。
2. 点击进入执行详情页面后，再点击进入“执行脚本”Tab页面，可以实际执行的脚本内容。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/exec-detail-script.png?fid=251751417168003283&fpt=p0OjkqSVlNv9RSXbpkqj9sg4gT2PmOtvFYKReh1M)

### 查看日志

查看调度的日志记录和采样过程中的日志记录，以便分析执行的各个阶段和采样请求错误信息。

操作步骤:

1. 进入AngusTester执行页面，点击需要查看日志执行名称。
2. 点击进入执行详情页面后，再点击进入“日志”Tab页面，可以看到调度和采样日志信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/exec-detail-logs.png?fid=251751417168003279&fpt=t6eTDEigegqNz75n7usJ57IySQZTI1I59IlJFC2n)

### 查看测试结果

查看测试执行后的接口、场景对应结果汇总。

操作步骤:

1. 进入AngusTester执行页面，点击需要查看测试结果的执行名称。
2. 点击进入执行详情页面后，再点击进入“测试结果”Tab页面，可以看到汇总的测试结果。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/exec-detail-result.png?fid=251751417168003281&fpt=9LyipJTQVsXRGGhu1DyoVzM9EPYrSHpYTWSNcHge)

***注意事项:***

- 只有来源是接口和场景的Http测试才可以看到“测试结果”Tab页面。

### 删除执行任务

删除不需要的执行任务。

操作步骤:

1. 进入AngusTester执行页面，点击需要删除执行的“删除”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/exec-delete.png?fid=251751339858591978&fpt=O1qao7P4DtctK7UAZbDIvGHc6CqpyEgVmioIcxDK)
2. 系统将弹出确认对话框，提示您确认是否删除该执行。
3. 确认删除操作，系统将提示确认以防误操作。

***注意事项:***

- 删除任务将永久移除该执行记录，确认无误后再进行此操作。
