# 任务配置

> `任务配置(task)` 用于配置或编排具体的执行动作。灵活支持三大核心任务类型，全面覆盖测试场景需求。

## 任务类型
AngusTester提供以下三种核心任务类型，满足不同测试需求：

| 任务类型 | 适用场景 | 脚本类型                                                         |  
|----------|----------|--------------------------------------------------------------|  
| **测试编排(pipelines)** | 复杂业务流程测试 | `TEST_PERFORMANCE`, `TEST_FUNCTIONALITY`, `TEST_STABILITY`, `TEST_CUSTOMIZATION` |  
| **模拟数据(mockData)** | 测试数据生成 | `MOCK_DATA`                                                  |  
| **模拟接口(mockApis)** | 接口模拟服务 | `MOCK_APIS`                                                  |  

::: tip 重要提示
> AngusTester根据脚本`type`字段自动选择任务类型。当脚本包含多种任务配置时，请确保执行的任务类型与脚本类型一致。
:::

## 任务字段说明

| 字段名称 | 类型 | 必填 | 描述                                               |  
|----------|------|------|--------------------------------------------------|  
| `arguments` | object | 否 | **插件专用配置**<br>不同协议的扩展参数 [查看详情](task/pluginConfiguration.md) |  
| `pipelines` | object | 否 | **测试流程编排**<br>构建多步骤测试场景（详见测试编排说明）[查看详情](task/pipeline.md) |  
| `mockData` | object | 否 | **数据生成配置**<br>定制化测试数据生成（详见模拟数据说明）[查看详情](task/mockDataTask.md) |  
| `mockApis` | object | 否 | **接口模拟配置**<br>虚拟API服务设置（详见模拟接口说明）[查看详情](task/mockApisTask.md) |  

## 配置测试任务示例

```yaml
type: TEST_PERFORMANCE              #测试类型
plugin: Http                        #插件
task:                               #任务
  pipelines:
  - target: HTTP
    request:
      method: GET
      url: http://serv01-sample.angusmock.cloud:30010/benchmark
```