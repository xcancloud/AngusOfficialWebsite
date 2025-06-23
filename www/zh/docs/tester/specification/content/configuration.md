# 执行配置

> `执行配置(configuration)` 用于精确控制测试任务的运行参数，是脚本的核心控制模块。以下配置适用于所有插件类型的测试任务。

## 主参数清单

| 字段名                            | 类型          | 必填 | 约束范围             | 说明                                  |
|--------------------------------|---------------|------|----------------------|-------------------------------------|
| `iterations`                   | integer       | 否   | 1-100亿             | 每个线程的采样迭代次数（功能测试限≤200）              |
| `duration`                     | string        | 否   | 1s-86400s (24小时)  | 任务最大执行时长（未配置时默认30秒）                 |
| `thread`                       | object        | 是   | -                    | 并发线程配置（详见下方线程配置）                    |
| `onError`                      | object        | 否   | -                    | 错误处理策略（详见下方错误处理）                    |
| `priority`                     | integer       | 否   | 1-2147483647         | 任务优先级（默认1000，值越高优先级越高）              |
| `startMode`                    | enum          | 否   | -                    | 启动模式：`IMMEDIATELY`(立即)/`TIMING`(定时) |
| `startAtDate`                  | date          | 否   | -                    | 定时执行时间（格式：yyyy-MM-dd HH:MM:SS）      |
| `startupTimeout`               | string        | 否   | 1s-7200s (2小时)     | Agent启动Runner的超时时间（默认1分钟）           |
| `runnerSetupTimeout`           | string        | 否   | 1s-7200s             | Runner初始化超时时间（默认1分钟）                |
| `shutdownTimeout`              | string        | 否   | 1s-7200s             | 停止执行超时时间（默认3秒）                      |
| `nodeSelectors`                | object        | 否   | -                    | 节点选择策略（详见下方节点配置）                    |
| `reportInterval`               | string        | 否   | 1s-300s              | 结果采样间隔（默认5秒）                        |
| `lang`                         | enum          | 否   | -                    | 输出语言：`zh_CN`(简体中文)/`en`(英文)         |
| `variables`                    | object[]      | 否   | ≤200个               | 参数化变量（参考"参数化"文档）                    |
| `updateVariableByIteration`    | boolean       | 否   | -                    | 每轮迭代更新变量（默认开启）                      |

一个完整的执行配置示例：

```yaml
configuration:
  iterations: 100000000
  duration: 180s
  thread:
    threads: 5000
    rampUpInterval: 60s
    rampUpThreads: 1000
    rampDownInterval: 60s
    rampDownThreads: 1000
    resetAfterRamp: true
  onError:
    action: CONTINUE
    sampleError: true
    sampleErrorNum: 10
  priority: 1000
  startMode: IMMEDIATELY
  startAtDate: 2023-11-09 10:10:00
  startupTimeout: 1min
  runnerSetupTimeout: 1min
  shutdownTimeout: 10s
  nodeSelectors:
    num: 2
    availableNodeIds:
    - 182283969729922201
    - 182283969729922202
    - 182283969729922203
    appNodeIds:
    - 182283969729922204
    - 182283969729922205
    - 182283969729922206
    strategy:
      enabled: true
      maxTaskNum: 0
      lastExecuted: false
      specEnabled: true
      cpuSpec: 16
      memorySpec: 16GB
      diskSpec: 500MB
      idleRateEnabled: true
      cpuIdleRate: 80%
      memoryIdleRate: 80%
      diskIdleRate: 20%
  reportInterval: 5s
  lang: zh_CN
  variables:
    - name: MyAuthorization
      value: Bearer f4390d2a-895e-4711-a7a5-0ee0670dab40
  updateVariableByIteration: false
```

## 参数详解

### 采样迭代次数(iterations)

- **迭代次数**指单个虚拟用户（线程）执行完整测试流程的循环次数。它控制着：
> 1. 每个线程执行测试步骤（子任务）的循环次数
> 2. 相同迭代内的所有步骤共享执行上下文（变量、会话等）

- 多节点分配规则
> 当测试在N个节点上分布式执行时，总迭代次数按以下算法分配到各个节点：
>
> | 节点类型 | 计算公式 | 计算示例（总迭代10001次/10节点） |  
> |----------|----------|--------------------------------|  
> | **前(N-1)个节点** | `总迭代次数 ÷ 节点数（取整）` | `10001 ÷ 10 = 1000次` |  
> | **最后一个节点** | `总迭代次数 ÷ 节点数 + 总迭代次数 % 节点数` | `1000 + (10001 % 10) = 1001次` |

> ***算法特点：***
> - **负载均衡**：确保大多数节点负载均匀  
> - **完整性保障**：由最后一个节点承担余数任务  
> - **精度保证**：总迭代次数严格等于各节点迭代之和

### 线程配置 (thread)

- **线程**是模拟真实用户并发的核心机制，每个线程代表一个**独立虚拟用户**，能够执行完整的操作序列：
> - 访问应用程序接口
> - 浏览网页内容
> - 提交表单数据
> - 发送消息请求

- 多节点线程分配规则
> 当测试任务在多个节点上分布式执行时，总线程数按以下算法分配到各节点：
>
> | 节点类型 | 分配公式 | 计算示例（总线程数10001、节点数10） |  
> |----------|----------|-----------------------|  
> | **前(N-1)个节点** | `总线程数 ÷ 节点数（取整）` | `10001 ÷ 10 = 1000`   |  
> | **最后一个节点** | `总线程数 ÷ 节点数 + 总线程数 % 节点数` | `1000 + 1 = 1001`     |  

> ***算法特点：***
> - **负载均衡**：多数节点承载相同负载  
> - **余数处理**：由末节点承担额外负载  
> - **精确匹配**：各节点线程数之和严格等于总线程数

| 字段名            | 类型    | 必填 | 约束范围   | 说明                                                                 |
|-------------------|---------|------|------------|----------------------------------------------------------------------|
| `threads`         | integer | 是   | 1-10000    | 最大并发线程数（Mock数据任务限≤1000，功能测试限=1）                 |
| `rampUpInterval`  | integer | 否   | 1s-86400s  | 线程递增时间（需≤总时长）                                           |
| `rampUpThreads`   | integer | 否   | 1-10000    | 每轮递增线程数（需≤最大线程数）                                     |
| `rampDownInterval`| string  | 否   | 1s-86400s  | 线程递减时间（需≤总时长）                                           |
| `rampDownThreads` | integer | 否   | 1-10000    | 每轮递减线程数（需≤最大线程数）                                     |
| `resetAfterRamp`  | bool    | 否   | -          | 线程调整后重置采样数据（默认false）                                 |

```yaml
thread:
  threads: 5000
  rampUpInterval: 60s
  rampUpThreads: 1000
  rampDownInterval: 60s
  rampDownThreads: 1000
  resetAfterRamp: true
```

### 错误处理 (onError)
定义异常处理机制

| 字段名           | 类型    | 必填 | 约束范围 | 说明                                                                 |
|------------------|---------|------|----------|----------------------------------------------------------------------|
| `action`         | enum    | 是   | -        | 错误响应：`CONTINUE`(继续)/`STOP`(停止)/`STOP_NOW`(立即停止)         |
| `sampleError`    | boolean | 是   | -        | 是否采集错误详情（默认true）                                        |
| `sampleErrorNum` | integer | 否   | 1-200    | 最大错误采样数（默认20）                                            |

```yaml
onError:
  action: CONTINUE
  sampleError: true
  sampleErrorNum: 10
```

### 节点选择 (nodeSelectors)
配置任务执行环境

| 字段名            | 类型          | 必填 | 约束范围 | 说明                                                                 |
|-------------------|---------------|------|----------|----------------------------------------------------------------------|
| `num`             | integer       | 否   | 1-200    | 执行节点数量（默认1）                                               |
| `availableNodeIds`| integer[]     | 否   | 1-200个  | 可用节点ID范围（未指定时自动选择）                                  |
| `appNodeIds`      | integer[]     | 否   | 1-200个  | 被测应用所在节点ID                                                  |
| `strategy`        | object        | 否   | -        | 智能节点选择策略（详见下方策略配置）                                |

```yaml
nodeSelectors:
  num: 2
  availableNodeIds: [182283969729922201, 182283969729922202, 182283969729922203]
  appNodeIds: [182283969729922204, 182283969729922205, 182283969729922206]
  strategy: 
    # 策略配置见下表
```

#### 节点策略 (strategy)
智能节点选择规则

| 字段名           | 类型    | 必填 | 约束范围   | 说明                                                               |
|------------------|---------|------|------------|--------------------------------------------------------------------|
| `enabled`        | boolean | 是   | -          | 启用智能节点选择（默认false）                                      |
| `maxTaskNum`     | integer | 否   | 1-1000     | 节点最大任务承载量（0=无限制）                                     |
| `lastExecuted`   | boolean | 否   | -          | 优先选择上次执行节点                                               |
| `specEnabled`    | boolean | 否   | -          | 启用硬件规格筛选                                                   |
| `cpuSpec`        | integer | 否   | 1-64       | 最小CPU核心数                                                      |
| `memorySpec`     | string  | 否   | 1-512GB    | 最小内存大小                                                       |
| `diskSpec`       | string  | 否   | 1-2000GB   | 最小磁盘空间                                                       |
| `idleRateEnabled`| boolean | 否   | -          | 启用资源空闲率筛选                                                 |
| `cpuIdleRate`    | string  | 否   | ≤100%      | CPU最低空闲率                                                      |
| `memoryIdleRate` | string  | 否   | ≤100%      | 内存最低空闲率                                                     |
| `diskIdleRate`   | string  | 否   | ≤100%      | 磁盘最低空闲率                                                     |

```yaml
strategy:
  enabled: true
  maxTaskNum: 0
  lastExecuted: false
  specEnabled: true
  cpuSpec: 16
  memorySpec: 16GB
  diskSpec: 500MB
  idleRateEnabled: true
  cpuIdleRate: 80%
  memoryIdleRate: 80%
  diskIdleRate: 20%
```

::: warning 执行须知
> 确保目标节点Agent状态为"已连接"，否则会导致任务调度失败。
:::