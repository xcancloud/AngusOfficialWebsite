# 如何快速生成接口测试脚本

> 一键生成功能/性能/稳定性测试脚本，提升测试效率

```mermaid  
graph LR  
    A[选择生成范围] --> B{服务或接口}  
    B -->|服务| C[批量生成]  
    B -->|接口| D[精准生成]  
    C --> E[批量测试]  
    D --> F[针对性测试]  
```

## 生成前准备
✅ 确保接口已完成调试并通过验证  
✅ 确认服务或接口已正确配置

## 基于服务的批量生成
> **适用场景**：需要对整个服务的所有接口进行全面测试

1. **进入服务列表**
    - 导航至 **「接口」→「服务」**
    - 右键点击目标服务  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-script-gen-step1.png?fid=251751417168003331&fpt=vwbs2N9tHSCTV5Zmq6fpWxMXCXhUqJxpYLXKnNv9)

2. **配置测试参数**
    - 选择测试类型（功能/性能/稳定性）
    - 设置关键参数：
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-script-gen-step2.png?fid=251751417168003333&fpt=JeoiafTOQdGRCGQLxrNXHEJoxx3SxY8lVvykuqMU)

3. **确认生成**
    - 点击确认按钮执行生成
    - 系统自动为服务下所有接口创建脚本  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-script-gen-step3.png?fid=251751417168003335&fpt=C8NijtOQIIY9LzbcNl5k27Vzbb5f79DASVBuq2R9)

> ⚠️ 注意：此操作会生成该服务下所有接口的测试脚本

## 基于接口的精准生成
> **适用场景**：针对特定关键接口进行针对性测试

1. **定位目标接口**
    - 在服务详情页右侧接口列表中选中目标接口  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-script-gen-step1.png?fid=251751417168003325&fpt=GbBt8F8mWCdq1yIEr5WvKrCj8zWlAnklCiYH4Fq6)

2. **定制测试参数**
    - 选择测试类型
    - 按需配置参数（同服务生成配置）  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-script-gen-step2.png?fid=251751417168003327&fpt=ryprTgI6rJEgo1jf3Yte9e8OcDnZgMjzING0AngF)

3. **生成专属脚本**
    - 系统仅为选中的接口生成脚本  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-script-gen-step3.png?fid=251751417168003329&fpt=VpGOOPzRXsQpTi6nSIEixmlxy9VXNt1rSoArhBMe)

## 关键参数说明

| 参数 | 功能 | 推荐值 |  
|------|------|--------|  
| 测试类型 | 功能/性能/稳定性测试 | 按需选择 |  
| 并发线程数 | 模拟用户并发量 | 5-50 |  
| 测试时长 | 持续测试时间 | 1-10min |  
| 循环次数 | 单接口重复测试次数 | 10-100 |  
