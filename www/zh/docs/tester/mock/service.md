# 模拟服务

> - `模拟服务（AngusMockService）` 是专为API测试设计的高性能模拟容器。  
> - 可在`8核CPU`上实现**每秒20万+ HTTP请求**的处理能力。  
> - 它解决了传统模拟工具的局限，通过深度行为模拟和实时监控，提供真实API场景的完整模拟方案。

点击查看：[安装AngusMockService](../installation/AngusMockService.md)

## 核心优势

| 优势 | 说明 | 价值 |  
|------|------|------|  
| **高性能** | 8核CPU支持20万+/秒请求 | 满足高并发压测需求 |  
| **深度行为模拟** | 支持延迟、异常状态、错误响应等 | 覆盖真实业务场景 |  
| **实时监控** | 请求/响应可视化跟踪 | 快速定位问题根源 |  
| **灵活集成** | 与测试流程无缝衔接 | 提升测试迭代效率 |  
| **团队协作** | 服务授权共享机制 | 促进跨团队协作 |  

## 管理功能

### Web控制台操作
1. **服务管理**
    - 创建/启动/停止/删除服务
    - 服务授权与共享
    - 资源监控（CPU/内存/磁盘）

2. **配置中心**
    - 接口安全配置
    - CORS跨域设置
    - 日志级别调整

```mermaid  
graph LR  
    A[服务创建] --> B[接口配置]  
    B --> C[安全设置]  
    C --> D[启动服务]  
    D --> E[监控调试]  
```

## 服务信息查询

### 获取服务状态

```bash
> curl -i http://serv01-sample.angusmock.cloud:30010
HTTP/1.1 200 OK
XC-Mock-ServiceId: 203883811233071109
XC-Mock-RequestId: ed8d92ad-9e54-4879-93e5-8530991d6a03
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD
Content-Type: application/json
content-length: 1385

{
  "app" : "AngusMockService",
  "version" : "1.0.0",
  "health" : {
    "status" : {
      "status" : "UP"
    }
  },
  "uptime" : "354851407",
  "home" : "/opt/AngusAgent-Full-1.0.0/",
  "principal" : {
    "angusmock.principal.deviceId" : "203883980884279296",
    "angusmock.principal.mockServiceId" : "203883811233071109",
    "angusmock.principal.tenantId" : "1"
  },
  "server" : {
    "port" : 30010,
    "ip" : "172.24.76.61"
  },
  "diskSpace" : {
    "total" : "63278391296",
    "used" : "4786548736"
  },
  "info" : {
    "id" : "203883811233071109",
    "name" : "共享Mock服务01",
    "nodeId" : "203883980884279296",
    "serviceDomainUrl" : "http://serv01-sample.angusmock.cloud:30010",
    "serviceHostUrl" : "http://172.24.76.61:30010",
    "auth" : true,
    "apisCors" : {
      "allowCorsOrigin" : "*",
      "allowCorsCredentials" : true,
      "allowCorsRequestMethods" : "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD",
      "enabled" : true
    },
    "setting" : {
      "useSsl" : false,
      "workThreadNum" : 256,
      "enableNettyLog" : false,
      "logFileLevel" : {
        "value" : "NONE",
        "message" : "None"
      },
      "sendRequestLog" : false,
      "maxContentLength" : 1048576000,
      "workPushbackThreadNum" : 8,
      "maxPushbackConnectTimeout" : 5000,
      "maxPushbackRequestTimeout" : -1
    }
  }
}
```

### 查看接口配置

```bash
> curl -i http://120.55.169.231:30010/actuator/apis
HTTP/1.1 200 OK
XC-Mock-ServiceId: 203883811233071109
XC-Mock-RequestId: 363db7c5-00ad-4db9-9543-86e76c38c728
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD
Content-Type: application/json
content-length: 257294

{
  "203883811233071109:POST:/user/signin" : {
    "id" : "204188910677393437",
    "name" : "用户登录业务",
    "method" : "POST",
    "endpoint" : "/user/signin",
    "responses" : [ {
      "name" : "用户输入账号和密码正确时返回登录成功",
      "match" : {
        "parameters" : [ {
          "name" : "Content-Type",
          "in" : "header",
          "condition" : {
            "value" : "EQUAL",
            "message" : "xcm.enum.FullMatchCondition.EQUAL"
          },
          "expected" : "application/json"
        } ],
        "body" : {
          "condition" : {
            "value" : "EQUAL",
            "message" : "xcm.enum.FullMatchCondition.EQUAL"
          },
          "expected" : "{\n    \"username\":\"admin\",\n    \"password\":\"admin\"\n}"
        },
        "priority" : 1000
      },
      "content" : {
        "status" : 200,
        "headers" : [ {
          "name" : "Content-Type",
          "value" : "application/json"
        } ],
        "content" : "{\n    \"code\": \"S\",\n    \"msg\": \"Success\",\n    \"data\": {\n         \"access_token\": \"181622ea2a1f4934ad6bec0308390da9\",\n         \"expires_in\": \"3599\",\n         \"token_type\": \"bearer\"\n    }\n}",
        "delay" : {
          "mode" : {
            "value" : "NONE",
            "message" : "xcm.enum.ResponseDelayMode.NONE"
          }
        }
      }
    }
...
```


## 典型应用场景

### 1. 性能压测支持
- 模拟高并发API响应  
- 测试系统极限承压能力  
- 避免压测影响真实服务

### 2. 异常场景构建
- 自定义错误状态码（4xx/5xx）  
- 模拟网络延迟（ms级控制）  
- 触发特定业务异常

### 3. 开发测试解耦
- 前端开发不依赖后端完成  
- 并行开发测试成为可能  
- 服务版本兼容性验证

### 4. 第三方服务模拟
- 支付网关模拟  
- 短信验证码服务  
- 社交媒体API对接
