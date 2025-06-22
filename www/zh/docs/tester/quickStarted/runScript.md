# 如何快速运行测试脚本

> 两种高效执行方式，一键启动自动化测试

```mermaid  
graph LR  
    A[选择执行方式] --> B{脚本直接执行<br>或<br>场景配置执行}  
    B -->|快速启动| C[脚本页面创建]  
    B -->|定制执行| D[执行页面配置]  
    C --> E[立即执行]  
    D --> F[按需配置后执行]  
```

## 执行方式对比

| 方式 | 适用场景 | 特点 |  
|------|----------|------|  
| 脚本直接执行 | 快速验证脚本 | 一键启动·无参数调整 |  
| 场景配置执行 | 定制化测试 | 可视化配置·参数调整 |  

## 方式一：脚本直接执行（推荐）
> **适用场景**：快速验证脚本可用性  

1. **进入脚本模块**
    - 导航至 **「脚本」**
    - 选中目标脚本  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/QS02-01.png?fid=203622539782521029&fpt=Jbv1kN4YIWgYPmibcIw1OVDYGyXL0abphS9ARTTi)

2. **启动执行**
    - 点击 **「创建执行」** 按钮
    - 系统自动生成执行任务  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/QS02-04.png?fid=203622539782521035&fpt=Bqtt14leOoj3yuowl15iUW44psHi8wXjhwvQjryT)

> **优势**：3秒完成执行创建，无需任何配置

## 方式二：场景配置执行
> **适用场景**：需要调整执行参数

1. **进入执行模块**
    - 导航至 **「执行」**
    - 点击 **「创建执行」**  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/QS02-02.png?fid=203622539782521031&fpt=JkZdt9lxkfbeBeuKSo6fVqn4dg3vBkON7tz23alm)

2. **配置执行参数**
    - 选择目标脚本
    - 按需调整配置：如线程模型、运行时长等
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/QS02-03.png?fid=203622539782521039&fpt=PEKyb4GxiXXoKj5R6tjEE2HlLB5YhBj9qZSn9rDu)

3. **启动执行**
    - 点击确认创建执行任务
    - 在任务列表查看执行状态  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/QS02-04.png?fid=203622539782521035&fpt=Bqtt14leOoj3yuowl15iUW44psHi8wXjhwvQjryT)

## 执行监控要点
- 🟢 实时状态：执行中/已完成/已失败
- 📊 性能指标：TPS/响应时间/错误率
- 🔍 日志追踪：详细执行过程记录
