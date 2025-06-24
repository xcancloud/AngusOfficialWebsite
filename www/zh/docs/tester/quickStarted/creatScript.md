# 快速创建一个测试脚本

> 3步完成脚本创建，快速开始自动化测试

```mermaid  
graph LR  
    A[创建脚本] --> B[编辑内容]  
    B --> C[保存使用]  
```

## 操作步骤

### 1. 进入脚本创建页面
1. 登录AngusTester系统
2. 导航到 **「脚本」** 模块
3. 点击 **「添加脚本」** 按钮  
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/QS01-01.png?fid=203622539782521023&fpt=7gvj6ytPRXv5q23wqAmaHZmSFbXRuq26DjoJNBvI)

### 2. 编辑脚本内容
在创建页面完成以下关键配置：

| 配置项 | 说明 | 示例值 |  
|--------|------|--------|  
| 脚本类型 | 测试类型 | `TEST_CUSTOMIZATION` |  
| 脚本名称 | 脚本标识名称 | `快速示例` |  

**核心脚本模板**（复制以下内容到脚本编辑区）：
```yaml
specification: angus/1.0.0  # AngusTester脚本规范版本
type: TEST_CUSTOMIZATION    # 测试类型：自定义测试
plugin: Http            # Http协议测试
configuration:          # 执行配置
  duration: 5min        # 测试时长5分钟
  thread:               # 线程配置
    threads: 10         # 并发线程数10
  priority: 1000        # 调度优先级，数值越高，优先级越高。
task:                   # 执行任务配置
  pipelines:            # 任务编排流程配置
    - target: HTTP      # 编排元素类型：HTTP
      name: Total       # 编排任务名称
      request:          # Http请求配置
        method: GET     # 请求方法
        url: http://serv01-sample.angusmock.cloud:30010/benchmark     # 请求接口路径
```

> 💡 完整参数说明请查看：[AngusTester脚本规范](../specification/introduction)

### 3. 保存并使用
1. 点击 **「保存脚本」** 按钮完成创建
2. 在脚本列表中查看新创建的脚本  
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/QS01-03.png?fid=203622539782521027&fpt=syeRJKFW4xJtXcgpwTXLXMkPJoH6PSy5toVE6j4e)
