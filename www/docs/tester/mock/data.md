# 模拟数据

AngusTester模拟数据用于为系统测试、项目演示等生成所需数据。支持生成数据存储到：数据空间、数据源、本地以及三方系统。

生成数据后，您可以通过"参数化"方式在测试中引用这些数据。

## 管理

AngusTester生成模拟数据支持不同的存储方式，管理方式如下：

- 数据空间存储（DATASPACE）：对应 AngusTester 应用"数据"->"文件数据"->"空间"。
- 数据源存储（DATASOURCE）：对应 AngusTester 应用"数据"->"数据源数据"->"数据源"。
- 本地存储（LOCAL）：生成数据会以文件形式存储在执行节点，您可以进入执行详情页面点击下载数据文件。默认存储路径：${AGENT_HOME}/data/exec/[执行ID]/data.[数据格式]。

## 插件

支持数据格式包括：CSV、CUSTOM、EXCEL、JSON、SQL、TAB、XML。对应插件信息如下：

| 数据格式 | 插件名称   | 支持数据存储位置                         | 安装包(版本)                            | 说明                                                                  |
| -------- | ---------- | ---------------------------------------- | --------------------------------------- | --------------------------------------------------------------------- |
| CSV      | MockCsv    | DATASPACE、LOCAL、PUSH_THIRD             | csv-mock-plugin-1.0.0.zip    | 生成 CSV 格式数据插件。                                               |
| CUSTOM   | MockCustom | DATASPACE、LOCAL、PUSH_THIRD             | custom-mock-plugin-1.0.0.zip | 生成自定义格式数据插件。                                              |
| EXCEL    | MockExcel  | DATASPACE、LOCAL、PUSH_THIRD             | excel-mock-plugin-1.0.0.zip  | 生成 Excel 格式数据插件。 |
| JSON     | MockJson   | DATASPACE、LOCAL、PUSH_THIRD             | json-mock-plugin-1.0.0.zip   | 生成 JSON 格式数据插件。                                              |
| SQL      | MockSql    | DATASPACE、DATASOURCE、LOCAL、PUSH_THIRD | sql-mock-plugin-1.0.0.zip    | 生成 Insert SQL 格式数据插件。                                        |
| TAB      | MockTab    | DATASPACE、LOCAL、PUSH_THIRD             | tab-mock-plugin-1.0.0.zip    | 生成基于 Tab 分割数据插件。                                           |
| XML      | MockXml    | DATASPACE、LOCAL、PUSH_THIRD             | xml-mock-plugin-1.0.0.zip    | 生成 XML 格式数据插件。                                               |

注意：

- 数据插件名称完整格式为：xcan-angus.[数据格式]-mock-plugin-[版本号].zip，当存在多个版本时，自动加载最新版本。
- 节点安装代理服务后，插件会自动安装到代理`${AGENT_HOME}/plugins/`目录，可以在代理目录查看已安装Mock数据插件。
- EXCEL格式数据存储位置为 `PUSH_THIRD` 时只支持上传。

# 生成数据示例

脚本参数详细说明请查看“脚本规范”->“模拟数据”。

- 生成一个 CSV 格式文件

```yaml
specification: angus/1.0.0
type: MOCK_DATA
plugin: MockCsv
configuration:
  thread:
    threads: 200
  onError:
    action: CONTINUE
    sampleError: true
    sampleErrorNum: 10
  priority: 1000
  nodeSelectors:
    availableNodeIds:
    - 187166587336261669
  reportInterval: 5s
task:
  mockData:
    name: User
    description: This is an example of generating CSV format data
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

- 生成一个自定义（CUSTOM）格式文件

```yaml
specification: angus/1.0.0
type: MOCK_DATA
plugin: MockCustom
configuration:
  thread:
    threads: 200
  onError:
    action: CONTINUE
    sampleError: true
    sampleErrorNum: 10
  priority: 1000
  nodeSelectors:
    availableNodeIds:
    - 187166587336261669
  reportInterval: 5s
task:
  mockData:
    name: User
    description: This is an example of generating customized format data
    fields:
    - name: username
      type: string
      value: "@String(3,20)"
    - name: password
      type: string
      value: "@String(6,32)"
    settings:
      format: CUSTOM
      rows: 100000
      batchRows: 200
      location: LOCAL
      escapeChar: ''''
      quoteChar: '"'
      separatorChar: '|'
      lineEnding: UNIT_LF
      includeHeader: true
```

- 生成一个 EXCEL 格式文件

```yaml
specification: angus/1.0.0
type: MOCK_DATA
plugin: MockExcel
configuration:
  thread:
    threads: 200
  onError:
    action: CONTINUE
    sampleError: true
    sampleErrorNum: 10
  priority: 1000
  nodeSelectors:
    availableNodeIds:
    - 187166587336261669
  reportInterval: 5s
task:
  mockData:
    name: User
    description: This is an example of generating excel format data
    fields:
    - name: username
      type: string
      value: "@String(3,20)"
    - name: password
      type: string
      value: "@String(6,32)"
    settings:
      format: EXCEL
      rows: 100000
      batchRows: 200
      location: LOCAL
      includeHeader: true
```

生成 Excel POI 库需要字体库，如果节点是 Linux 系统没有安装字体库需要先安装字体库：

Ubuntu:

```yaml
sudo apt-get install fontconfig
```

CentOS:

```yaml
yum install -y fontconfig
```

- 生成一个 JSON 格式文件

```yaml
specification: angus/1.0.0
type: MOCK_DATA
plugin: MockJson
configuration:
  thread:
    threads: 200
  onError:
    action: CONTINUE
    sampleError: true
    sampleErrorNum: 10
  priority: 1000
  nodeSelectors:
    availableNodeIds:
    - 187166587336261669
  reportInterval: 5s
task:
  mockData:
    name: User
    description: This is an example of generating JSON format data
    fields:
    - name: username
      type: string
      value: "@String(3,20)"
    - name: password
      type: string
      value: "@String(6,32)"
    settings:
      format: JSON
      rows: 100000
      batchRows: 200
      location: LOCAL
      lineEnding: UNIT_LF
      includeNull: true
      rowsToArray: false
```

- 生成一个 SQL 格式文件

```yaml
specification: angus/1.0.0
type: MOCK_DATA
plugin: MockSql
configuration:
  thread:
    threads: 200
  onError:
    action: CONTINUE
    sampleError: true
    sampleErrorNum: 10
  priority: 1000
  nodeSelectors:
    availableNodeIds:
    - 187166587336261669
  reportInterval: 5s
task:
  mockData:
    name: User
    description: This is an example of generating insert sql format data
    fields:
    - name: username
      type: string
      value: "@String(3,20)"
    - name: password
      type: string
      value: "@String(6,32)"
    settings:
      format: SQL
      rows: 100000
      batchRows: 200
      location: LOCAL
      lineEnding: UNIT_LF
      tableName: t_user
      batchInsert: true
```

- 生成一个基于 Tab 分割数据格式文件

```yaml
specification: angus/1.0.0
type: MOCK_DATA
plugin: MockTab
configuration:
  thread:
    threads: 200
  onError:
    action: CONTINUE
    sampleError: true
    sampleErrorNum: 10
  priority: 1000
  nodeSelectors:
    availableNodeIds:
    - 187166587336261669
  reportInterval: 5s
task:
  mockData:
    name: User
    description: This is an example of generating tab-based segmentation format data
    fields:
    - name: username
      type: string
      value: "@String(3,20)"
    - name: password
      type: string
      value: "@String(6,32)"
    settings:
      format: TAB
      rows: 100000
      batchRows: 200
      location: LOCAL
      lineEnding: UNIT_LF
      includeHeader: true
```

- 生成一个 XML 格式文件

```yaml
specification: angus/1.0.0
type: MOCK_DATA
plugin: MockXml
configuration:
  thread:
    threads: 200
  onError:
    action: CONTINUE
    sampleError: true
    sampleErrorNum: 10
  priority: 1000
  nodeSelectors:
    availableNodeIds:
    - 187166587336261669
  reportInterval: 5s
task:
  mockData:
    name: User
    description: This is an example of generating XML format data
    fields:
    - name: username
      type: string
      value: "@String(3,20)"
    - name: password
      type: string
      value: "@String(6,32)"
    settings:
      format: XML
      rows: 100000
      batchRows: 200
      location: LOCAL
      lineEnding: UNIT_LF
      rootElement: root
      recordElement: row
```

- 将生成数据存储到数据库

```yaml
specification: angus/1.0.0
type: MOCK_DATA
plugin: MockSql
configuration:
  thread:
    threads: 200
  onError:
    action: CONTINUE
    sampleError: true
    sampleErrorNum: 10
  priority: 1000
  nodeSelectors:
    availableNodeIds:
    - 187166587336261669
  reportInterval: 5s
task:
  mockData:
    name: User
    description: This is an example of generating insert sql format data and store
      by datasource
    fields:
    - name: username
      type: string
      value: "@String(3,20)"
    - name: password
      type: string
      value: "@String(6,32)"
    settings:
      format: SQL
      rows: 100000
      batchRows: 200
      location: DATASOURCE
      lineEnding: UNIT_LF
      tableName: user
      batchInsert: false
      storeDatasource:
        name: Store user datasource
        type: MYSQL
        driverClassName: com.mysql.cj.jdbc.Driver
        username: sample
        password: 123456
        jdbcUrl: jdbc:mysql://mysql01-sample.angusmock.cloud:3306/xcan_mockdata_sample
```

- 将生成数据文件上传到第三方接口或数据空间

```yaml
specification: angus/1.0.0
type: MOCK_DATA
plugin: MockCsv
configuration:
  thread:
    threads: 200
  onError:
    action: CONTINUE
    sampleError: true
    sampleErrorNum: 10
  priority: 1000
  nodeSelectors:
    availableNodeIds:
    - 178982647412817948
  variables:
  - name: myBearerToken
    value: Bearer fcd70dbed4b142d0b87e92105873fc99
    enabled: true
  - name: mySpaceId
    value: 190821606652641519
    enabled: true
task:
  mockData:
    name: User
    description: This is an example of generating CSV format data and store by http
      request
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
      location: DATASPACE
      storeRequest:
        url: http://dev-files.xcan.cloud/storage/api/v1/file/upload
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
          value: "{myBearerToken}"
        body:
          forms:
          - name: files
            enabled: true
            type: string
            format: binary
          - name: bizKey
            enabled: true
            type: string
            format: string
            value: angusTesterDataFiles
          - name: spaceId
            enabled: true
            type: string
            format: string
            value: "{mySpaceId}"
        setting:
          connectTimeout: 6s
          readTimeout: 60s
          retryNum: 0
          maxRedirects: 1
      lineEnding: UNIT_LF
      includeHeader: true
```

> 如果是将数据存储到 AngusTester 应用"数据"->"空间"时，需要将变量 myBearerToken 和 mySpaceId 值分别替换成自己的"用户令牌"和"空间ID"。
