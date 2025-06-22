# 如何快速调试接口

> 3分钟掌握接口调试核心操作，精准验证接口功能

```mermaid  
graph LR  
    A[选择接口] --> B[打开调试]  
    B --> C[发送请求]  
    C --> D[分析响应]  
```

## 调试步骤

### 1. 定位目标接口
1. 登录系统后进入 **「接口」** 模块
2. 在服务列表中找到目标服务
3. 双击打开目标服务 
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/debug-apis-step1.png?fid=251751339858592090&fpt=SmGgD5sG3P5Fn4R1b9Ke0yVdwuAc1RwgeoW5DhHz)

### 2. 启动调试
1. 在接口列表中，选中需要调试的接口
2. 双击打开接口详情  
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/debug-apis-step2.png?fid=251751339858592092&fpt=J13jfBHJfxdXmLrixDXtDM4TUTzvC8TS7tRHjCtp)

### 3. 发送调试请求
1. 在接口调试面板确认请求参数
2. 点击 **「发送请求」** 按钮  
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/QS06-03.png?fid=203622614944448706&fpt=YLBOgbT6Uq8tgKfsYksToMzLeQtOADeYlV6POTG2)

### 4. 分析调试结果
查看核心验证指标：
- ✅ HTTP状态码
- ⏱ 响应时间
- 📋 响应内容结构  
  ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/debug-apis-step4.png?fid=251751339858592094&fpt=VmFbNKAz7yO64esmeNkBWvo1PQMFI5mrnxBieXrx)

## 关键调试指标说明

| 指标 | 验证标准 | 调试意义 |  
|------|----------|----------|  
| 状态码 | 2xx/3xx | 请求是否被正确处理 |  
| 响应时间 | ≤500ms | 接口性能是否达标 |  
| 响应体 | JSON/XML结构 | 数据结构是否符合预期 |  
| 头部信息 | Content-Type等 | 数据格式是否正确 |  
