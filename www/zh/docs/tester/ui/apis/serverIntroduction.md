# 服务器介绍

> AngusTester 的服务器可以确保开发人员能够高效地管理和测试API接口，通过灵活的服务器定义和变量管理，团队能够轻松应对`不同的开发环境和版本控制`需求，从而提升整体的开发效率和软件质量。

## 关于服务器

在API的设计与实现中，服务器部分是至关重要的组成部分。通过与接口服务器集成，您可以：
- ✅ **测试阶段自动切换测试环境服务器**
- ✅ **生产发布自动更新生产环境URL**
- ✅ **版本变更自动同步变量配置**

AngusTester对服务器及其相关的动态部分进行了全面的定义，包括：`服务器 (server) `和`变量 (variables)` 两个主要部分。

### 服务器构成

服务器的构成包括完整URL、服务器、端点 (endpoint) 及其关系。这种结构化的定义方式，不仅简化了API的使用流程，也提升了项目的可维护性和可扩展性。

*完整URL(path)构成示意图：*

```text
https://dev-api.example.com/v1/users?role=admin&status=active&page=1
\_________________________/\_______/ \____________________________/
server URL                  endpoint        query parameters
```

*可以拆解为：*
> - **完整 URL (Full URL)**：https://dev-api.example.com/v1/users?role=admin&status=active&page=1
> - **服务器 (Server)**：https://dev-api.example.com
> - **版本 (Version)**：v1
> - **端点 (Endpoint)**：/users
> - **查询参数 (Query Parameters)**：?role=admin&status=active&page=1

### 定义变量

通过变量可以实现服务器动态配置和自动切换，以满足各种API应用场景。

*完整URL(path)变量应用示意图：*

```text
https://{env}-api.example.com/{apiVersion}/users?role=admin&status=active&page=1
\___________________________/\___________/ \____________________________/
server URL                      endpoint        query parameters
```

*变量与自定义变量值示例：*
> - **env**：prod, beta, dev 
> - **apiVersion**：v1, v2

## 服务器信息

AngusTester 接口服务器和变量遵循 OpenAPI3.0规范，更多信息请查看：[OpenAPI Server Object](https://swagger.io/specification/v3/#server-object)。

### 服务器基础配置

| 参数               | 字段名                | 类型                    | 是否必须 | 长度限制 | 说明                                                         |
|--------------------|----------------------|-----------------------|----------|----------|--------------------------------------------------------------|
| **URL模板**        | **url**              | `string`              | **是**   | ≤400     | 目标主机URL，必须符合标准格式（支持`{env}`等模板变量）          |
| 描述               | **description**      | `string`              | 否       | ≤800     | 服务器描述，支持CommonMark富文本语法                          |
| 变量定义           | **variables**        | `map`                 | 否       | /        | URL模板中的变量替换定义                                      |
| 扩展属性           | **extensions**       | `map` | 否       | /        | OpenAPI规范扩展属性                                         |

### 服务器变量配置

| 参数               | 字段名                | 类型       | 是否约束         | 长度限制 | 说明                                                      |
|--------------------|----------------------|----------|------------------|----------|-----------------------------------------------------------|
| 枚举值             | **_enum**            | `list`   | 否               | /        | 可选值列表（定义时不能为空）                              |
| **默认值**         | **_default**         | `string` | **条件**         | ≤400     | 默认值（如定义枚举，必须为枚举项之一）                     |
| 描述               | **description**      | `string` | 否               | ≤800     | 变量说明，支持CommonMark富文本                            |
| 扩展属性           | **extensions**       | `map`    | 否               | /        | OpenAPI规范扩展属性                                       |
