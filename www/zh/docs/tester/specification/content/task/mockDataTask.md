# 模拟数据任务

> `AngusTester` 高效生成多种格式测试数据，满足各类测试场景需求。  
> **模拟数据功能支持 7 种主流数据格式，帮助您：**
>
> - **批量生成**海量测试数据
> - **灵活配置**数据结构与存储方式
> - **无缝集成**数据库与文件系统
> - **参数化支持**在测试中直接引用生成数据

## 主参数清单

| 参数          | 类型          | 必填 | 限制       | 说明                         |
| ------------- | ------------- | ---- | ---------- | ---------------------------- |
| `name`        | string        | 否   | <=200 字符 | 数据名称（自动设为脚本名）   |
| `description` | string        | 否   | <=800 字符 | 详细描述（自动设为脚本描述） |
| `fields`      | array[object] | 否   | 1-200 个   | 数据字段定义（见下方详情）   |
| `settings`    | object        | 否   | -          | 数据生成设置（见下方详情）   |

一个完整的配置示例：

```yaml
mockData:
  name: 用户数据
  description: CSV格式的用户账号密码数据
  fields:
    - name: username
      type: string
      value: "@String(3,20)"
    - name: password
      type: string
      value: "@String(6,32)"
  settings:
    format: CSV
    rows: 100000
    batchRows: 200
    location: LOCAL
    lineEnding: UNIT_LF
    includeHeader: true
```

## 字段定义(fields)

| 参数    | 类型   | 必填 | 限制        | 说明                                                                                                 |
| ------- | ------ | ---- | ----------- |----------------------------------------------------------------------------------------------------|
| `name`  | string | 是   | <=200 字符  | 字段名称                                                                                               |
| `type`  | enum   | 是   | -           | 字段类型：`string`,`integer`,`boolean`,<br/>`number`,`object`,`array`。<br/>注意：`object`和`array`仅JSON格式支持 |
| `value` | string | 否   | <=8192 字符 | 字段值（常量或 Mock 函数）                                                                                   |

**示例配置：**

```yaml
fields:
  - name: username
    type: string
    value: "@String(3,20)"
  - name: age
    type: integer
    value: "@Number(18,60)"
```

## 生成设置(settings)

| 参数                    | 类型    | 必填 | 限制      | 说明                                                                                       |
| ----------------------- | ------- | ---- | --------- |------------------------------------------------------------------------------------------|
| `format`                | string  | 是   | <=40 字符 | 数据格式：`CSV`,`CUSTOM`,`EXCEL`,<br>`JSON`,`SQL`,`TAB`,`XML`                                  |
| `rows`                  | integer | 是   | 1-1000 亿 | 生成总行数                                                                                    |
| `batchRows`             | integer | 否   | 1-10000   | 批量生成行数                                                                                   |
| `location`              | enum    | 是   | -         | 存储位置：`DATASPACE`,`DATASOURCE`,<br>`LOCAL`,`PUSH_THIRD`                                       |
| `storeRequest`          | object  | 否   | /         | Http 请求配置，当存储数据到`空间`<br>或`推送到三方接口`时是必须的。<br><br>注意：`只支持 POST 请求方法`。<br>具体参数请查看“脚本规范”中 Http 请求配置。 |
| **_Plugin Parameters_** | object  | 否   | /         | 模拟数据插件独有配置参数，<br>具体请查看下面“插件参数”。                                                          |

### 存储位置(location)

```mermaid  
graph TD  
    L[存储位置] --> D1[数据空间存储]  
    L --> D2[数据库存储]  
    L --> D3[本地文件存储]  
    L --> D4[HTTP接口推送]  
```

- **DATASPACE · 数据空间存储**
  - **存储位置**：AngusTester应用空间：`数据` → `文件数据` → `空间`
  - **适用场景**：  
    - 团队协作共享数据  
    - 长期保存测试数据集  
    - 跨测试复用数据
  - **访问方式**：通过AngusTester应用在线管理

- **DATASOURCE · 数据源存储**
  - **存储位置**：AngusTester内置数据源：`数据` → `数据源数据` → `数据源`
  - **适用场景**：  
    - 数据库压测初始化  
    - 生产环境数据预填充  
    - 数据驱动测试支持
  - **访问方式**：数据库客户端直连或通过应用查看

- **LOCAL · 本地文件存储**
  - **存储位置**：执行节点文件系统
  - **默认路径**：`${AGENT_HOME}/data/exec/[执行ID]/data.[格式]`
  - **适用场景**：  
    - 临时测试数据生成  
    - 快速获取原始数据文件  
    - 大文件处理场景
  - **访问方式**：执行完成页直接下载

- **PUSH_THIRD · HTTP接口推送**
  - **传输模式**：
    ```mermaid  
    graph LR  
        P[数据生成] --> C{上传类型}  
        C -->|文件上传| F[生成完整文件后传输]  
        C -->|文本流| S[实时分块推送]  
    ```
  - **智能判断依据**：
    - ContentType=application/octet-stream
    - FormData包含文件类型
  - **性能优化建议**：文本流传输时设置`batchRows=1000`
  - **适用场景**：  
    - 数据集成流水线  
    - 第三方系统对接  
    - 实时数据管道

### 格式插件专属参数(_Plugin Parameters_)

各数据格式的特殊配置参数：

#### CSV 格式参数

| 参数            | 类型    | 必填 | 说明                             |
| --------------- | ------- | ---- | -------------------------------- |
| `lineEnding`    | enum    | 是   | 换行符：`UNIT_LF`/`WINDOWS_CRLF` |
| `includeHeader` | boolean | 是   | 是否包含表头                     |

#### 自定义格式参数

| 参数            | 类型 | 必填 | 说明                 |
| --------------- | ---- | ---- | -------------------- |
| `escapeChar`    | char | 否   | 转义符（默认\u0000） |
| `quoteChar`     | char | 否   | 引用符（默认\u0000） |
| `separatorChar` | char | 否   | 分隔符（默认,）      |

#### Excel 格式参数

| 参数            | 类型    | 必填 | 说明         |
| --------------- | ------- | ---- | ------------ |
| `includeHeader` | boolean | 是   | 是否包含表头 |

#### JSON 格式参数

| 参数          | 类型    | 必填 | 说明             |
| ------------- | ------- | ---- | ---------------- |
| `includeNull` | boolean | 否   | 是否包含空值字段 |
| `rowsToArray` | boolean | 否   | 是否转换为数组   |

#### SQL 格式参数

| 参数              | 类型    | 必填 | 说明                 |
| ----------------- | ------- | ---- | -------------------- |
| `tableName`       | string  | 是   | 数据库表名           |
| `batchInsert`     | boolean | 否   | 是否批量插入         |
| `storeDatasource` | object  | 是   | 数据库配置（见下方） |

**数据库连接配置：**

```yaml
storeDatasource:
  type: MYSQL
  driverClassName: com.mysql.cj.jdbc.Driver
  jdbcUrl: jdbc:mysql://localhost:3306/db
  username: user
  password: pass
```

#### TAB 格式参数

| 参数            | 类型    | 必填 | 说明         |
| --------------- | ------- | ---- | ------------ |
| `includeHeader` | boolean | 是   | 是否包含表头 |

#### XML 格式参数

| 参数            | 类型   | 必填 | 说明         |
| --------------- | ------ | ---- | ------------ |
| `rootElement`   | string | 是   | 根元素名称   |
| `recordElement` | string | 是   | 记录元素名称 |

## 最佳实践场景

### 场景 1：CSV 用户数据生成

```yaml
settings:
  format: CSV
  rows: 50000
  location: LOCAL
  lineEnding: WINDOWS_CRLF
  includeHeader: true
```

### 场景 2：JSON 测试数据

```yaml
settings:
  format: JSON
  rows: 20000
  location: DATASPACE
  includeNull: false
  rowsToArray: true
```

### 场景 3：数据库直连写入

```yaml
settings:
  format: SQL
  location: DATASOURCE
  batchInsert: true
  storeDatasource:
    type: POSTGRES
    jdbcUrl: jdbc:postgresql://dbserver:5432/testdb
    username: admin
    password: securePass123
```

### 场景 4：推送到第三方系统

```yaml
settings:
  format: XML
  location: PUSH_THIRD
  rootElement: Users
  recordElement: User
  storeRequest:
    url: https://api.example.com/upload
    parameters:
      - name: Content-Type
        in: header
        enabled: true
        type: string
        value: multipart/form-data
      - name: Authorization
        in: header
        enabled: true
        type: string
        value: "Bearer {token}"
```
