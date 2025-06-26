# Mock介绍

AngusTester的Mock功能为开发和测试提供了强有力的支持。通过快速生成和模拟API，团队能够更加高效地进行开发和测试，降低项目风险，加快产品交付。无论是在前端开发、集成测试，还是性能测试中，AngusTester的Mock功能都能帮助团队实现更全面的测试，确保最终产品的稳定性和可靠性。选择AngusTester，您将获得一个强大的工具，助力您的软件开发和测试工作。

在现代软件开发和测试过程中，API作为系统之间交互的桥梁，其稳定性和可用性直接影响到应用的开发效率和最终质量。AngusTester的Mock功能专为满足这一需求而设计，提供了一种快速生成和模拟API的解决方案。通过使用Mock，开发和测试团队能够提前进行接口集成，降低开发风险，加速产品交付，同时确保系统的稳定性和一致性。

## 主要功能

- 快速生成API Mock
    - AngusTester允许用户根据实际API文档或需求快速生成Mock接口。用户只需提供必要的请求和响应信息，系统即可自动构建Mock服务。
    - 这一过程显著减少了手动编码的时间，提高了开发效率。
- 模拟复杂的业务逻辑
    - 通过AngusTester的Mock功能，用户可以模拟复杂的业务逻辑和数据交互。支持动态响应，通过设置条件和参数，用户能够模拟不同的场景，例如成功响应、错误处理、延迟响应等。
    - 这为测试团队提供了更全面的测试覆盖，确保系统在各种情况下的稳定性。
- 先行开发与测试
    - Mock的最大优势之一在于它赋予开发和测试团队先行工作的能力。在后端API尚未完成的情况下，前端开发者可以利用Mock接口进行开发，避免了因API不可用而导致的开发停滞。
    - 这种并行开发模式能够显著缩短项目的交付周期。
- 避免脏数据问题
    - 直接与生产系统的联调往往会引入脏数据，影响测试结果的准确性。使用AngusTester的Mock功能，用户可以完全避免这一问题。
    - 通过模拟真实的API行为，开发和测试团队能够在安全的环境中验证系统逻辑，而不会影响到实际的生产数据。

## 应用场景

- 前端开发：在前端开发中，开发者通常需要与后端API进行交互。使用 AngusTester的Mock功能，前端团队可以在API开发完成之前进行测试和开发，确保前端界面的功能和用户体验。
- 集成测试：在进行集成测试时，团队可以使用Mock接口模拟外部服务的行为，验证系统的整体工作流。通过模拟不同的响应，团队能够测试系统在各种情况下的反应，确保系统的稳定性和健壮性。
- 性能测试：Mock接口能够帮助团队在进行性能测试时，模拟高并发的请求场景。这使得团队能够评估系统在高负载下的表现，识别潜在的瓶颈和性能问题，及时优化系统。

## 数据权限

Mock服务数据权限控制是指在编写或使用特定Mock服务时，对Mock服务访问和操作，进行严格安全管理和控制的过程。***默认不开启授权控制，即项目的所有成员都可以访问和操作。***

### 权限控制的目的

- 保护敏感信息：通过限制对敏感数据的访问，可以有效防止未经授权的数据泄露。
- 维护数据完整性：确保只有经过授权的用户或Mock服务能够修改数据，避免数据被误改或恶意篡改。
- 遵守法规要求：许多行业标准和法律法规都要求对个人数据进行严格的保护措施。

### 实施方法

允许管理员访问所有数据，而普通用户只能访问其工作相关被授权数据，支持授权方式如下：

- 共享权限：在Mock服务操作中选择“授权”，设置Mock服务为“无权限控制”，允许其他用户访问和执行。
- 指定权限：设置Mock服务为“有权限控制”，授权特定用户、部门或用户组Mock服务的部分或全部权限，确保安全性和可控性。


## Mock服务信息

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