# Mock服务管理

AngusTester Mock服务管理功能旨在提供一个灵活、便捷的Mock服务创建和管理平台，方便开发者在应用开发和测试过程中模拟真实的服务接口。

## Mock服务操作

AngusTester Mock服务管理模块支持以下操作：

### 创建服务

AngusTester支持下面三种方式创建Mock服务，需要注意的事项：

- 为服务设置域名后，您可以通过域名访问Mock接口，设置的域名需要被解析到所在节点的IP。
- 服务所运行的节点，服务添加后不允许修改。
- 服务所监听的端口，服务添加后不允许修改。

### 添加Mock服务

用户手动输入相关信息创建服务，添加Mock服务后需要手动添加Mock接口。

操作步骤:

1. 进入AngusTester Mock页面，点击“添加Mock服务”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-add.png?fid=251751339858591932&fpt=ACQjFydlvVviKVQZk7gftRKIWM4P06hK1m9cKlHh)
2. 选择“添加Mock服务”选项。
3. 填写服务名称、域名、端口等信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-add-view-created.png?fid=251751339858591928&fpt=GJM1gg2BpDPOuiUca5p8wU8hlWaTPpDAy9lhIhTG)
4. 点击“确定”以创建服务。

### 已有服务关联导入

根据现有接口服务进行添加，用户可以选择需要Mock的接口，添加后系统将自动与接口服务建立关联。

操作步骤:

1. 进入AngusTester Mock页面，点击“添加Mock服务”按钮。
2. 选择“已有服务关联导入”选项。
3. 填写服务名称、端口等信息，并选择需要关联导入的服务。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-add-view-assoc.png?fid=251751339858591926&fpt=TM28TWidoP9umrd8ZVE2v7BURDdCWLrA6YDvzljM)
4. 点击“确定”以创建服务。

### 文件导入Mock

基于Swagger2.0、OpenAPI3.x、Postman2.0、Postman2.1、Angus格式数据创建Mock服务并导入接口。

操作步骤:

1. 进入AngusTester Mock页面，点击“添加Mock服务”按钮。
2. 选择“文件导入Mock”选项。
3. 填写服务名称、端口等信息，并选择需要导入接口文件。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-add-view-import.png?fid=251751339858591930&fpt=limE91WJ6DynMNkmdWMNQjZGh9dAePwRHdDYZ7Tz)
4. 点击“确定”以创建服务。

### 启动服务

启动并运行刚创建的Mock服务或停止的Mock服务。

操作步骤:

1. 进入AngusTester Mock页面，找到需要启动的Mock服务。
2. 点击“启动”按钮运行Mock服务系统会异步启动Mock服务。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-start.png?fid=251751339858591942&fpt=BJhurj9wN3riVryt30IgeK9W2vzYvRIoXG0tmAvw)
3. 等待服务启动成功，这个过程预计需要数十秒。

### 停止服务

停止正则运行的Mock服务。

操作步骤:

1. 进入AngusTester Mock页面，找到需要停止的Mock服务。
2. 点击“停止”按钮运行Mock服务系统会异步停止Mock服务。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-stop.png?fid=251751339858591944&fpt=8dUEowZQguD4r0onctyypcU8s9NhZNVMJXUBRYM2)
3. 等待服务停止成功，这个过程预计需要数秒。

### 刷新实例

强制更新Mock服务配置和所有Mock接口信息到运作的服务实例。

操作步骤:

1. 进入AngusTester Mock页面，找到需要刷新的Mock服务。
2. 点击“刷新实例”按钮进行刷新。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-instance-update.png?fid=251751417168003251&fpt=6ktceUeKekhaHCDUyGOfAsRsH0XGvBTXJJlu2rhB)
3. 刷新成功后系统会自动提示成功。

### 删除Mock服务

用户可以删除不再需要的报告，以维护报告管理的整洁性。

操作步骤:

1. 进入AngusTester Mock页面，找到需要删除Mock服务。
2. 点击“删除”按钮。
3. 在弹出的确认窗口中确认删除操作。

***注意事项:***

- 删除操作不可逆，请谨慎操作。
- 确保该Mock服务不再被其他用户使用。

### 导出Mock脚本

导出Mock服务中所有Mock接口到脚本文件。

操作步骤:

1. 进入AngusTester Mock页面，找到需要导出的Mock服务。
2. 点击“导出”按钮系统会自动下载Mock文件。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-export.png?fid=251751417168003249&fpt=8TVDOkckmJqLwje4EVQCUzib1WV7lrM5Lp2J9T1v)
3. 下载成功可以在浏览器下载中找到该文件。

### 编辑基本信息

修改服务的基本信息，以便于后续管理和识别。

操作步骤:

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
3. 在“设置”->“基本信息”编辑需要修改的基本信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-edit-basic.png?fid=251751339858591936&fpt=VR11lo98T7lnIoBrR2SmSTvHjvQHVa7SroBXq2Ng)
4. 点击“确定”以完成修改。

### 修改服务配置

调整服务的配置参数，包括请求超时时间、最大并发数等，修改后，请务必保存更改，以确保配置生效。

操作步骤:

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 在“设置”->“服务配置”编辑需要修改的配置信息，以下是配置参数说明：
     - 线程数：处理请求的线程数，最大10000，默认256。
     - 文件日志级别：配置请求日志信息级别。
       - NONE：无日志记录。
       - BASIC：只记录请求方法和URL以及响应状态代码和执行时间，默认。
       - HEADERS：记录基本信息以及请求和响应头。
       - FULL：记录请求和响应头、正文和元数据。
     - 记录请求日志：是否发送Mock请求日志到服务端。
     - 最大请求大小：允许的最大请求大小，默认为1000*1024*1024（1000MB）。
     - 回推线程数：处理回推请求的线程数，默认为8。
     - 回推连接超时：回推时最大连接超时，单位毫秒，默认5000。
     - 回推请求超时：回推时最大请求超时，单位毫秒，默认-1不超时。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-edit-config.png?fid=251751339858591938&fpt=TIpHvPmqdVzVG0YSIg7zx0FUSjFbmEeAMQ1s8Ii5)
3. 点击“确定”以完成修改。

***注意事项:***

- 修改后需要重启服务或刷新实例后生效。

### 开启接口安全

设置访问接口接口的安全策略，确保设置符合安全要求，以保护服务不受未授权访问，默认未开启。

操作步骤:

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 在“设置”->“接口安全”中，开启“接口安全”选项，并配置访问接口所需的授权信息，最多允许添加10个。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-edit-apisecurity.png?fid=251751339858591934&fpt=hnQ5Hb3taZ3tA0ssi6wkiBcyltelwxDFhrF7SxFv)
3. 点击“保存”以创建服务。

***注意事项:***

- 开启配置后访问接口必须携带授权参数才可以访问接口。
- 修改后需要重启服务或刷新实例后生效。

### 开启跨域设置

配置跨域资源共享（CORS）策略，指定允许访问的域名，确保用户能够顺利访问接口，同时保持安全性，默认开启。

操作步骤:

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 在“设置”->“跨域设置”中，开启“是否开启”选项，并修改跨域策略，以下是配置参数说明：
    - 是否开启：启用跨域访问限制配置，默认为不启用。
    - 允许的域：指定哪些网站可以参与跨来源资源共享，默认设置*，通过响应头Access-Control-Allow-Origin返回。
    - 允许访问凭证：指定第三方站点可能能够执行特权操作并检索敏感信息，默认为true，通过响应头Access-Control-Allow-Credentials返回。
    - 允许的请求方法：指定允许的HTTP方法，默认为GET、POST、PUT、PATCH、DELETE、OPTIONS、HEAD，通过响应头Access-Control-Allow-Methods返回。
    - 允许的请求头：指定允许客户端使用的HTTP请求标头，默认不指定，通过响应头Access-Control-Allow-Headers返回。
    - 可访问的响应头：指定允许访问响应中的那些标头字段，这些字段不包括浏览器可以访问的默认头，默认不指定，通过响应头Access-Control-Expose-Headers返回。
    ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-edit-cors.png?fid=251751339858591940&fpt=AY3BiJ0xjGPMs4DfEMfVdWukyUQ4kMQVm71vsH14)
3. 点击“确定”以完成修改。

***注意事项:***

- 修改后需要重启服务生效。

### 查看Mock接口

查看已创建的Mock接口的列表，可以查看每个接口的详细信息，包括请求和响应示例。

操作步骤:

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 点击“接口”查看接口列表和Mock接口详细信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-apis.png?fid=251751417168003247&fpt=F64hh0E9ZRkswC9uVjDgZDZpHEOSmUwYbFGIwCcW)

### 查看请求记录

提供对部分请求的详细记录，包括时间、请求参数等。

操作步骤:

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 点击“请求”查看所有对该服务的请求记录，包括请求时间、请求详情等。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-apis-logs.png?fid=251751417168003245&fpt=RQ6zg3wvqypXank0vS7fZK6gbkno5Dr484KbUnwi)

### 查看服务日志

服务的日志信息，了解服务的运行状态和错误信息。日志记录有助于快速定位问题并进行故障排查。

操作步骤:

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 点击“日志”查看服务的运行日志，以便排查问题。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-logs.png?fid=251751417168003253&fpt=tBNAPbJDxiBUfNzUFEJg8CxFWYfqbKhys0cm2wJ5)

### 查看活动记录

有重要活动记录，包括用户操作、系统事件等。通过查看活动记录，您可以追踪服务的操作历史，确保操作的透明性和安全性。

操作步骤:

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 点击“活动”查看Mock服务的活动历史，包括创建、修改等操作。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-activity.png?fid=251751417168003243&fpt=HTTvl0pF1J2TfbEf9U15deEQSTHz11j3dwgJwGc1)

### 查看服务资源监控

监控服务的资源使用情况，如 CPU、内存等。通过监控，您可以及时发现潜在的性能瓶颈，并进行优化和扩容调整。

操作步骤:

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 点击“监控”查看查看Mock服务的资源使用情况和性能指标。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-monitor.png?fid=251751417168003255&fpt=km1G3oKvEE0uhztoA4O6muriThhgQ1I9bRy1T0T2)

## 字段信息

| 参数                 | 字段名                | 类型         | 必填     | 长度限制 | 说明                      |
|----------------------|-----------------------|--------------|----------|----------|-------------------------|
| **ID**               | id                   | `bigint`     | **条件** | /        | Mock服务唯一标识符；<br/>修改时必须       |
| **项目ID**           | projectId            | `long`       | **是**   | /        | 所属项目唯一标识                |
| **服务名称**         | name                 | `string`     | **是**   | ≤200     | Mock服务标识名称              |
| **节点ID**           | nodeId               | `long`       | **是**   | /        | 服务运行节点唯一标识              |
| **服务端口**         | servicePort          | `int`        | **是**   | /        | 服务监听端口（1-65535）         |
| 服务域名             | serviceDomain        | `string`     | 否       | ≤200     | 服务访问域名                  |
| **API认证配置**      | apisSecurity         | `list`       | 否       | /        | API认证配置列表               |
| **跨域配置**         | apisCors             | `map`        | 否       | /        | CORS跨域资源共享配置            |
| **服务配置**         | setting              | `map`        | 否       | /        | Mock服务高级配置              |
| 服务来源             | source               | `enum`       | 只读     | /        | **来源枚举**：<br/>手动创建/文件导入/关联服务 |
| 服务状态             | status               | `enum`       | 只读     | /        | **状态枚举**：<br/>未启动/运行中        |
| 节点名称             | nodeName             | `string`     | 只读     | /        | 节点名称                    |
| 节点IP               | nodeIp               | `string`     | 只读     | /        | 节点内网IP                  |
| 节点公网IP           | nodePublicIp        | `string`     | 只读     | /        | 节点公网IP                  |
| 服务域名URL          | serviceDomainUrl     | `string`     | 只读     | /        | 完整服务域名地址                |
| 服务主机URL          | serviceHostUrl       | `string`     | 只读     | /        | 服务主机地址<br/>（IP:端口）           |
| 代理端口             | agentPort            | `int`        | 只读     | /        | 代理服务端口，<br/>默认30010       |
| 授权状态             | auth                 | `boolean`    | 只读     | /        | 当前授权状态                  |
| 当前权限             | currentAuths         | `set`        | 只读     | /        | 当前用户权限集合                |
| 关联服务状态         | assocServices        | `boolean`    | 只读     | /        | 是否关联Angus服务             |
| 租户ID               | tenantId             | `long`       | 只读     | /        | 所属租户ID                  |
| 创建人ID             | createdBy            | `long`       | 只读     | /        | 服务创建人ID                 |
| 创建人姓名           | createdByName        | `string`     | 只读     | /        | 创建人姓名                   |
| 创建时间             | createdDate          | `datetime`   | 只读     | /        | 服务创建时间                  |
| 最后修改人ID         | lastModifiedBy       | `long`       | 只读     | /        | 最后修改人ID                 |
| 最后修改人姓名       | lastModifiedByName   | `string`     | 只读     | /        | 最后修改人姓名                 |
| 最后修改时间         | lastModifiedDate     | `datetime`   | 只读     | /        | 最后修改时间                  |

### API认证配置（apisSecurity）
**数据结构**：
```json
[
  {
    "in": "header",
    "keyName": "Authorization",
    "value": "Bearer xxxxx"
  }
]
```
**认证位置**：
| 枚举值   | 说明         |
|----------|--------------|
| `header` | HTTP头部     |
| `query`  | URL查询参数  |

### 跨域配置（apisCors）
**配置项**：
```json
{
  "enabled": true,
  "allowOrigin": "*",
  "allowCredentials": true,
  "allowMethods": "GET,POST,PUT,DELETE",
  "allowHeaders": "Content-Type,Authorization",
  "exposeHeaders": "X-Custom-Header"
}
```

### 服务配置（setting）
**核心配置**：
```json
{
  "useSsl": false,
  "workThreadNum": 256,
  "enableNettyLog": false,
  "logFileLevel": "BASIC",
  "sendRequestLog": true,
  "maxContentLength": 1048576000,
  "workPushbackThreadNum": 8,
  "maxPushbackConnectTimeout": 5000,
  "maxPushbackRequestTimeout": -1
}
```

### 服务来源（source）
| 枚举值           | 说明         |
|------------------|--------------|
| `CREATED`        | 手动创建     |
| `FILE_IMPORT`    | 文件导入     |
| `ASSOC_SERVICE`  | 关联服务     |

### 服务状态（status）
| 枚举值         | 说明       |
|----------------|------------|
| `NOT_STARTED`  | 未启动     |
| `RUNNING`      | 运行中     |

### 日志级别（logFileLevel）
| 枚举值   | 说明                     |
|----------|--------------------------|
| `NONE`   | 无日志                   |
| `BASIC`  | 基础日志（默认）         |
| `HEADERS`| 记录头部信息             |
| `FULL`   | 完整请求响应日志         |