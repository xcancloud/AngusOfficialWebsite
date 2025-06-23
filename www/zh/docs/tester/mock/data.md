# 模拟数据

> 一键生成7种格式测试数据，全面满足数据驱动测试需求

## 核心功能概览

### 1. 多格式支持
支持生成7种常用数据格式，满足不同测试场景需求

### 2. 灵活存储选项
| 存储位置 | 适用场景 | 访问方式 |  
|----------|----------|----------|  
| 数据空间 | 团队共享数据 | AngusTester "数据"→"文件数据"→"空间" |  
| 数据源 | 数据库存储 | AngusTester "数据"→"数据源数据"→"数据源" |  
| 本地存储 | 单次测试使用 | `${AGENT_HOME}/data/exec/[执行ID]/data.[格式]` |  
| 第三方系统 | 外部系统集成 | 通过API推送 |  

### 3. 数据参数化
✅ 生成后可立即在测试脚本中引用  
✅ 支持字段级动态生成规则  
✅ 批量生成海量测试数据

## 数据格式插件一览

```mermaid  
graph TD  
    AngusTester[模拟数据] --> 格式支持  
    格式支持 --> CSV[CSV格式]  
    格式支持 --> JSON[JSON格式]  
    格式支持 --> EXCEL[Excel格式]  
    格式支持 --> SQL[SQL脚本]  
    格式支持 --> XML[XML格式]  
    格式支持 --> TAB[TAB分隔]  
    格式支持 --> CUSTOM[自定义格式]  
```

| 格式   | 插件名 | 存储支持 | 安装包 |  
|------|--------|----------|--------|  
| CSV  | `MockCsv` | 数据空间/本地/第三方 | csv-mock-plugin-1.0.0.zip |  
| JSON | `MockJson` | 数据空间/本地/第三方 | json-mock-plugin-1.0.0.zip |  
| Excel | `MockExcel` | 数据空间/本地/第三方 | excel-mock-plugin-1.0.0.zip |  
| SQL  | `MockSql` | 数据空间/数据源/本地/第三方 | sql-mock-plugin-1.0.0.zip |  
| XML  | `MockXml` | 数据空间/本地/第三方 | xml-mock-plugin-1.0.0.zip |  
| TAB分隔 | `MockTab` | 数据空间/本地/第三方 | tab-mock-plugin-1.0.0.zip |  
| 自定义  | `MockCustom` | 数据空间/本地/第三方 | custom-mock-plugin-1.0.0.zip |  

> 💡 插件自动部署在代理节点的 `${AGENT_HOME}/plugins/` 目录

## 典型应用场景

### 场景1：生成CSV测试数据
```yaml  
task:  
  mockData:  
    fields:  
      - name: username  
        value: "@String(3,20)"  
      - name: password  
        value: "@String(6,32)"  
    settings:  
      format: CSV  
      rows: 100000  
      location: LOCAL  
```

### 场景2：生成JSON测试数据
```yaml  
task:  
  mockData:  
    fields:  
      - name: userId  
        value: "@Number(1000,9999)"  
      - name: email  
        value: "@Email"  
    settings:  
      format: JSON  
      rows: 50000  
      rowsToArray: true  
```

### 场景3：直接入库SQL数据
```yaml  
task:  
  mockData:  
    settings:  
      format: SQL  
      location: DATASOURCE  
      storeDatasource:  
        type: MYSQL  
        jdbcUrl: jdbc:mysql://mysql01-sample.angusmock.cloud:3306/db  
        username: user  
        password: pass  
```

### 场景4：上传到第三方系统
```yaml  
task:  
  mockData:  
    settings:  
      location: DATASPACE  
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

### 场景5：Excel数据生成注意事项
```yaml  
# Linux系统需要先安装字体库：  
# Ubuntu: sudo apt-get install fontconfig  
# CentOS: yum install -y fontconfig  
task:  
  mockData:  
    settings:  
      format: EXCEL  
      rows: 10000  
```

## 高级配置参数

| 参数 | 说明 | 示例值 |  
|------|------|--------|  
| `batchRows` | 批量生成行数 | 200 |  
| `lineEnding` | 行尾符 | UNIT_LF (Linux)/WIN_CRLF (Windows) |  
| `separatorChar` | 字段分隔符（自定义格式） | `|` |  
| `escapeChar` | 转义字符 | `\` |  
| `includeHeader` | 包含列头 | true/false |  
| `batchInsert` | SQL批量插入 | true/false |  
