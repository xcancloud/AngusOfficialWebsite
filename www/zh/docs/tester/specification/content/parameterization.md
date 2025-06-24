# 参数化

> **AngusTester 提供以下4种参数化方式，满足不同测试需求**：
> - **变量**：定义可在整个测试中共享的常量值
> - **数据集**：定义一组相关参数，测试中动态变化值
> - **Mock函数**：动态生成参数值或随机值
> - **采样提取变量**：从上个采样结果提取值供后续使用

## 变量(variables)

定义单个可复用的值，使用`{变量名}`格式引用。支持：
1. 静态值
2. Mock函数生成值
3. 从HTTP/文件/数据库提取值

> 📌 **重要**：采样执行前变量值就会固定，执行中不会改变

| 字段名称          | 类型    | 必须 | 长度限制 | 说明                                                                 |
|-------------------|---------|------|----------|----------------------------------------------------------------------|
| `name`            | string  | 是   | <=100    | 变量名称                                                             |
| `description`     | string  | 否   | <=200    | 变量描述                                                             |
| `value`           | string  | 否   | <=4096   | 变量值（非提取变量时必填），支持Mock函数如`@String(5,10)`             |
| `passwordValue`   | boolean | 否   | /        | 是否为密码值（是则在界面隐藏）                                       |
| `extraction`      | object  | 是   | /        | 提取配置（提取变量时必填），详见下方 **提取配置说明**                 |

**示例：静态变量**
```yaml
configuration:
  variables:
  - name: myUsername
    value: xcan
```

**示例：密码变量**
```yaml
configuration:
  variables:
  - name: myPassword
    value: 123456
    passwordValue: true
```

**示例：Mock函数变量**
```yaml
configuration:
  variables:
  - name: userId
    value: '@Uuid()'  # 每次迭代生成新UUID
```
> 💡 **特性**：Mock函数变量在**同次迭代内值不变**，支持资源CRUD测试  
> ⚙️ 可通过`updateVariableByIteration`配置关闭迭代更新（默认开启）

**示例：HTTP提取变量**
```yaml
configuration:
  variables:
  - name: accessToken
    extraction: 
      source: HTTP
      method: JSON_PATH
      expression: $.data.access_token
      location: RESPONSE_BODY
      request:  # HTTP请求配置
        method: POST
        url: http://example.com/login
        body:
          rawContent: "{\n    \"username\":\"admin\",\n    \"password\":\"admin\"\n}"
```
> ✅ **优势**：自动更新令牌等时效性数据，避免手动维护

**示例：文件提取变量**
```yaml
configuration:
  variables:
  - name: hobbies
    extraction: 
      source: FILE
      fileType: CSV
      path: /data/user.csv
      rowIndex: 3  # 第4行(索引从0开始)
      columnIndex: 2 # 第3列
```
> 📝 文件格式支持：CSV/Excel

**示例：数据库提取变量**
```yaml
configuration:
  variables:
  - name: userCount
    extraction: 
      source: JDBC
      select: SELECT count(*) FROM users
      datasource:
        type: MYSQL
        username: sample
        password: 123456
        jdbcUrl: jdbc:mysql://host:3306/db
```

## 数据集(datasets)

定义一组相关参数（如测试数据），使用`{参数名}`引用。支持：
1. 静态数据集
2. 文件提取
3. JDBC提取

> 🔄 **动态特性**：执行过程中参数值会动态变化

| 字段名称        | 类型          | 必须 | 长度限制 | 说明                                      |
|-----------------|---------------|------|----------|-------------------------------------------|
| `name`          | string        | 是   | <=100    | 数据集名称                                |
| `description`   | string        | 否   | <=200    | 数据集描述                                |
| `parameters`    | array[object] | 否   | <=200    | 参数列表（静态数据集时必填）              |
| `extraction`    | object        | 是   | /        | 提取配置（提取数据集时必填）              |

### 参数配置(parameters)
| 字段名称 | 类型   | 必须 | 长度限制 | 说明             |
|----------|--------|------|----------|------------------|
| `name`   | string | 是   | <=100    | 参数名称         |
| `value`  | string | 否   | <=4096   | 参数值（静态时必填）|

**示例：静态数据集**
```yaml
task:
  pipelines:
    - target: HTTP
      name: UpdateUserEmail              # 更新用户邮箱
      request:
        method: PATCH
        url: http://example.com/api/v1/user/email
        body:
          rawContent: "{\"id\":\"{id}\",\"email\":\"{email}\"}"
      datasets:
      - name: UserData
        parameters:  # 定义参数列
        - name: id
          value: '@Uuid()'  # 动态生成ID
        - name: age
          value: '@Email()' # 动态生成Email
```

**示例：文件数据集**
```yaml
task:
  pipelines:
    - target: HTTP
      name: UpdateUserEmail              # 更新用户邮箱
      request:
        method: PATCH
        url: http://example.com/api/v1/user/email
        body:
          rawContent: "{\"id\":\"{id}\",\"email\":\"{email}\"}"
      datasets:
      - name: CSVData
        parameters:  # 定义参数列
        - name: id
        - name: email
        extraction:
          source: FILE
          fileType: CSV
          path: /data/users.csv
```

**示例：数据库数据集**
```yaml
task:
  pipelines:
    - target: HTTP
      name: UpdateUserEmail              # 更新用户邮箱
      request:
        method: PATCH
        url: http://example.com/api/v1/user/email
        body:
          rawContent: "{\"id\":\"{id}\",\"email\":\"{email}\"}"
      datasets:
        - name: DBData
          parameters:  # 定义参数列
          - name: id
          - name: email
          extraction:                                 # 提取配置
            source: JDBC                              # 提取值来源，固定值：JDBC
            method: EXACT_VALUE                       # 使用精确值方式提取值
            datasource:                               # 数据源配置
              type: MYSQL
              username: sample
              password: 123456
              jdbcUrl: jdbc:mysql://host:3306/db
            select: SELECT * FROM users               # 查询数据集值对应SQL语句，不需要指定分页参数，默认每次拉取5000条
            rowIndex: 0                               # 指定从哪一行开始读取，默认从第一行(索引0)开始
            columnIndex: 0                            # 指定从哪一列开始读取，默认从第一列(索引0)开始
```

## Mock函数

通过`@函数名()`格式生成动态值，如`@Email()`生成邮箱。支持：
- 文本生成（姓名/地址/ID等）
- 数字生成（整数/小数/范围）
- 日期生成（日期/时间/时间戳）

> 📚 详见独立的 [Mock函数文档](../../mock/function)

## 采样提取变量

从**当前采样**的请求/响应中提取值，供**后续采样**使用

```yaml
task:
  pipelines:
    - target: HTTP
      name: AddGroup               # 添加组
      enabled: true
      request:
        method: POST
        url: http://example.com/api/v1/group
        body:
          rawContent: "[{\"code\":\"TestGroup\",\"name\":\"测试组\",\"remark\":\"\",\"\tagIds\":[]}]"
      variables:
        - source: HTTP_SAMPLING     # 提取值来源，固定值：HTTP_SAMPLING
          name: groupId             # 从响应结果中提取采样组ID，响应结果：{"code":"S","msg":"成功","data":[{"id":"235027106575356558"}],"datetime":"2024-07-17 15:02:09","ext":{}}
          method: JSON_PATH
          expression: $.data.id
          location: RESPONSE_BODY
    - target: HTTP
      name: QueryGroup              # 查询组
      enabled: true
      beforeName: ModifyGroup
      request:
        method: GET
        url: "http://example.com/api/v1/group/{id}"
        parameters:
          - name: id
            in: path
            enabled: true
            type: string
            value: "{groupId}"                      # 注意：在Path参数中使用{groupId}引用采样变量
```

## 提取配置(extraction)

**AngusTester 支持从文本值、Http、Http采样、文件、JDBC五种数据源提取数据。**

### 提取公共参数

| 参数 | 类型 | 必填 | 限制 | 说明                                               |  
|------|------|------|------|--------------------------------------------------|  
| **`name`** | string | 条件 | ≤100字符 | 提取项标识。<br/>**注意：采样提取变量时为名称作为变量名且是必须的。**               |  
| **`method`** | enum | 是 | - | 提取方法：`EXACT_VALUE`,`REGEX`,<br/>`JSON_PATH`,`X_PATH`  |  
| **`expression`** | string | 条件 | ≤1024字符 | 提取表达式（非精确值方法时必填）                                 |  
| **`matchItem`** | integer | 否 | 0-1024 | 多值匹配时的索引位置                                       |  
| **`defaultValue`** | string | 是 | ≤4096字符 | 提取失败时的默认值                                        |  
| **`source`** | enum | 是 | - | 数据源标识：`VALUE`,`FILE`,`HTTP`,<br/>`HTTP_SAMPLING`,`JDBC` |  

### 文本值提取(source=VALUE)

::: tip 提取说明
`文本值提取` 可以直接从给定的文本内容中提取数据。
:::

| 字段名称     | 类型    | 是否必须 | 长度限制     | 描述                                                                                             |
| ------------ | ------- | -------- |----------|------------------------------------------------------------------------------------------------|
| `source`       | enum    | 是       | /        | 提取来源，固定值：`VALUE`。<br>具体请查看“匹配来源(source)”说明。                                                         |

#### 提取方法(method)

| 方法 | 说明 | 适用场景                    |  
|------|------|-------------------------|  
| **EXACT_VALUE** | **精确值提取**<br>直接获取原始内容，无需表达式匹配 | - 完整内容提取<br>- 无格式数据处理   |  
| **REGEX** | **正则表达式提取**<br>通过正则模式匹配目标数据 | - 文本模式匹配<br>-非结构化数据处理  |  
| **JSON_PATH** | **JSON路径提取**<br>使用JSONPath语法定位JSON结构中的数据 | - JSON响应解析<br>- API数据提取 |  
| **X_PATH** | **XML路径提取**<br>使用XPath语法定位XML文档中的数据 | - XML文件解析<br>- SOAP接口测试 |  

#### 匹配项(matchItem)

当表达式匹配到多个值或者结果为数组时，指定第几个值作为表达式期望值，支持位置从0开始到最大值2000，指定位置数据不存在时返回null，不指定时合并多个值为一个值。

- 正则表达式匹配
  > - 匹配值：
  >   ```txt
  >   hello, RegexExtraction! my phone number is 18888888888 and 13999999999.
  >   ```
  > - 表达式: `(1\d{10})`
  > - 匹配结果: `["18888888888","13999999999"]`
  > - 匹配项:
  >   - 不指定位置默认取合并结果合并匹配值：`"1888888888813999999999"`
  >   - 指定位置0取值：`"18888888888"`
  >   - 指定位置1取值：`"13999999999"`

- JSONPath匹配
  > - 匹配值:
  >   ```json
  >   {
  >     "store": {
  >       "book": [
  >         {
  >           "title": "Sayings of the Century",
  >           "price": 100
  >         },
  >         {
  >           "title": "Confucianism",
  >           "price": 200
  >         }
  >       ]
  >     }
  >   }
  >   ```
  > - 表达式: `$.store.book[*]`
  > - 匹配结果: `[{"title":"Sayings of the Century","price":100},{"title":"confucianism","price":200}]`
  > - 匹配项:
  >     - 不指定位置默认取合并结果：`[{"title":"Sayings of the Century","price":100},{"title":"confucianism","price":200}]`
  >     - 指定位置0取值：`{"title":"Sayings of the Century","price":100}`
  >     - 指定位置1取值：`{"title":"confucianism","price":200}`

- XPath匹配
  > - 匹配值:
  >   ```xml
  >   <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  >   <persons>
  >     <person>
  >       <age>30</age>
  >       <interests>coding</interests>
  >       <interests>basketball</interests>
  >       <name>Angus1</name>
  >     </person>
  >     <person>
  >       <age>32</age>
  >       <interests>coding</interests>
  >       <name>Angus2</name>
  >     </person>
  >   </persons>
  >   ```
  > - 表达式: `/persons/person[age >= 30]`
  > - 匹配结果: `"30codingbasketballAngus1", "32codingAngus2"`
  > - 匹配项:
  >     - 不指定位置默认取合并结果：`"30codingbasketballAngus132codingAngus2"`
  >     - 指定位置0取值：`"30codingbasketballAngus1"`
  >     - 指定位置1取值：`"32codingAngus2"`

#### 匹配来源(source)

| 来源               | 描述 | 适用场景                          |  
|------------------|------|-------------------------------|  
| **`VALUE`**        | 从文本内容中直接提取数据 | - 固定文本解析<br>- 表达式验证测试<br>- 简单数据提取 |  
| **`FILE`**         | 从本地或远程文件中提取数据 | - 批量数据处理<br>- 测试数据集加载<br>- 文件格式转换   |  
| **`HTTP`**         | 通过API请求获取数据 | - 预加载动态数据<br>- 获取认证令牌<br>- 跨系统数据集成  |  
| **`HTTP_SAMPLING`** | 从测试过程中的API响应实时提取 | - 链式API调用<br>- 动态参数传递<br>- 上下文关联测试  |  
| **`JDBC`**         | 从数据库查询结果中提取 | - 业务数据验证<br>- 数据库状态检查<br>- 数据驱动测试   |  

### 文件提取(source=FILE)

::: tip 提取说明
`文件提取` 可以从本地/远程文件（CSV/Excel）中读取结构化数据。**注意：变量和数据集都支持该方式。**
:::

| 字段名称      | 类型    | 是否必须 | 长度限制 | 描述                                                                                                                               |
| ------------- | ------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `source`        | enum    | 是       | /        | 提取来源，固定值：`FILE`。                                                                                                         |
| `fileType`      | enum    | 是       | /        | 提取位置，具体支持条件请查看下面“提取位置(location)”说明。                                                                         |
| `encoding`      | string  | /        |          | 提取文件类型，支持`CSV`和`EXCEL`，默认`CSV`。                                                                                      |
| `quoteChar`     | object  | 否       | /        | 引用符，Csv 类型文件参数，用于表示 CSV 文件中字段的开始和结束，特别是当字段包含分隔符（例如逗号）或换行符等特殊字符时，默认为“\”。 |
| `escapeChar`    | object  | 否       | /        | 转义(逃离)符，Csv 类型文件参数，用于转义字段中的特殊字符，特别是将引号字符本身作为文字字符包含在内，默认为“\”                      |
| `separatorChar` | object  | 否       | /        | 分隔符，Csv 类型文件参数，用于分隔 CSV 文件中的不同字段或数据列，默认值为“,”。                                                     |
| `rowIndex`      | integer | 否       | /        | 读取参数值开始行，默认索引基于 0 开始，即读取第一行。注意：第一行为参数名标题行时，通常需要从索引 1 即第二行读取数据。             |
| `columnIndex`   | integer | 否       | /        | 读取参数开始列，默认索引基于 0 开始，即读取第一列。                                                                                |

```yaml
extraction:                                 # 提取配置
  source: FILE                              # 提取值来源，固定值：FILE
  name: Extract from csv file
  method: EXACT_VALUE                       # 使用精确值方式提取值
  fileType: CSV                             # 指定从CSV格式文件中提取
  path: /data/user.csv                      # 提取本地文件路径
  encoding: UTF-8                           # 读取文件编码
  quoteChar: '"'                            # 引用符
  escapeChar: \                             # 逃离符
  separatorChar: ","                        # 分割符
  rowIndex: 4                               # 指定从哪一行开始读取，默认从第一行(索引0)开始
  columnIndex: 2                            # 指定从哪一列开始读取，默认从第一列(索引0)开始
```

### Http提取(source=HTTP)

::: tip 提取说明
`Http提取` 可以通过预置HTTP请求从接口响应中提取目标数据。**注意：变量支持Http提取，数据集不支持从Http中提取参数数据。**
:::

| 字段名称     | 类型    | 是否必须 | 长度限制 | 描述                                                                                                  |
| ------------ | ------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `name`         | string  | 否       | /        | 提取名称，采样提取变量时为名称为变量名且是必须的。                                                    |
| `method`       | enum    | 是       | /        | 提取方法，支持：EXACT_VALUE，REGEX，JSON_PATH，X_PATH，具体请查看“提取方法(method)”说明。             |
| `expression`   | string  | 是       | /        | 提取表达式，当提取方法是REGEX，JSON_PATH，X_PATH时是必须的。      |
| `matchItem`    | integer | 否       | /        | 匹配项，用于指定正则、JsonPath 和 XPath 匹配到多个值时取那一个值，具体请查看“匹配项(matchItem)”说明。 |
| `defaultValue` | string  | 是       | /        | 提取失败或者为空时的默认值。                                                                          |
| `source`       | enum    | 是       | /        | 提取来源，固定值：`HTTP`。          
| `location`     | enum   | 是       | /        | 提取位置，具体支持条件请查看下面“提取位置(location)”说明。               |
| `parameterName`| string | 否       | /        | 提取参数名，从请求头、响应头、查询参数、路径参数和Form参数中提取时，参数名称是必需的。 |
| `request`      | object | 否       | /        | 提取 Http 请求配置，具体配置参数请查看 Http 中“请求”配置。 |

#### 提取位置(location)

- 请求数据提取位置

| 位置 | 说明 | 示例场景 |  
|------|------|----------|  
| **PATH_PARAMETER** | 从URL路径参数提取 | `/users/{user_id}` |  
| **QUERY_PARAMETER** | 从URL查询参数提取 | `?order_id=12345` |  
| **REQUEST_HEADER** | 从HTTP请求头提取 | `Authorization: Bearer token` |  
| **FORM_PARAMETER** | 从表单参数提取 | `username=admin&password=123` |  
| **REQUEST_RAW_BODY** | 从原始请求体提取 | JSON/XML请求体内容 |  

- 响应数据提取位置

| 位置 |说明 | 示例场景 |  
|------|------|----------|  
| **RESPONSE_HEADER** | 从HTTP响应头提取 | `Set-Cookie: session_id=abc` |  
| **RESPONSE_BODY** | 从响应体内容提取 | API返回的JSON/XML数据 |  

```yaml
extraction: 
  source: HTTP                                      # 提取值来源，固定值：HTTP
  name: Extract access_token value
  method: JSON_PATH                                 # 使用 JsonPath 方式提取值
  expression: $.data.access_token                   # JsonPath提取表达式
  defaultValue: a4b08effa7bf4bfb9579fb2fe96e1812    # 指定默认值，提取值不存在或表达式异常时返回
  location: RESPONSE_BODY                           # 指定提取位置，从响应体中提取
  request:                                          # Http请求配置
    method: POST
    url: http://example.com/user/signin
    body:
      rawContent: "{\n    \"username\":\"admin\",\n    \"password\":\"admin\"\n}"
```

### Http采样提取(source=HTTP_SAMPLING)

::: tip 提取说明
`Http采样提取` 在测试执行中实时从HTTP请求/响应上下文提取动态数据。  
:::

| 字段名称     | 类型    | 是否必须 | 长度限制 | 描述                                                                                                  |
| ------------ | ------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `source`       | enum    | 是       | /        | 提取来源，固定值：`HTTP_SAMPLING`。          
| `location`     | enum   | 是       | /        | 提取位置，具体支持条件请查看下面“提取位置(location)”说明。               |
| `parameterName`| string | 否       | /        | 提取参数名，从请求头、响应头、查询参数、路径参数和Form参数中提取时，参数名称是必需的。 |

```yaml
variables:
- source: HTTP_SAMPLING     # 提取值来源，固定值：HTTP_SAMPLING
  name: groupId             # 从当前采样响应结果中提取
  method: JSON_PATH
  expression: $.data.id
  location: RESPONSE_BODY
```

### Jdbc提取(source=JDBC)

::: tip 提取说明
`Jdbc提取` 通过SQL查询从数据库结果集中提取字段值。**注意：变量和数据集都支持该方式。**
:::

| 字段名称     | 类型    | 是否必须 | 长度限制 | 描述                                                                                                                   |
| ------------ | ------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `source`       | enum    | 是       | /        | 提取来源，固定值：`JDBC`。                                                                                             |
| `datasource`   | object  | 是       | /        | 数据源配置，具体请查看”数据源配置参数(storeDatasource)“参数说明。                                                      |
| `select`       | string  | 是       | /        | 查询表数据 Select 语句，最长 1024 个字符，注意：数据集提取数据时，select 默认每次查询 5000 条。                        |
| `rowIndex`     | integer | 否       | /        | 读取参数值开始行，默认索引基于 0 开始，即读取第一行。注意：第一行为参数名标题行时，通常需要从索引 1 即第二行读取数据。 |
| `columnIndex`  | integer | 否       | /        | 读取参数开始列，默认索引基于 0 开始，即读取第一列。                                                                    |

```yaml
extraction:                                 # 提取配置
  source: JDBC                              # 提取值来源，固定值：JDBC
  name: Extract value from MYSQL database
  method: EXACT_VALUE                       # 使用精确值方式提取值
  datasource:                               # 数据源配置
    type: MYSQL
    username: sample
    password: 123456
    jdbcUrl: jdbc:mysql://mysql01-sample.angusmock.cloud:3306/xcan_mockdata_sample
  select: SELECT * FROM `user`              # 查询数据集值对应SQL语句，不需要指定分页参数，默认每次拉取5000条
  rowIndex: 0                               # 指定从哪一行开始读取，默认从第一行(索引0)开始
  columnIndex: 0                            # 指定从哪一列开始读取，默认从第一列(索引0)开始
```
