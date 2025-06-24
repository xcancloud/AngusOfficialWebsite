# Ftp测试任务

> `Ftp测试任务` 定义一个 Ftp 协议测试任务，用于 Ftp 功能、性能、稳定性和自定义测试。

## 主参数清单

| 参数                       | 类型    | 必填 | 长度限制   | 说明                                                                                                |
| -------------------------- | ------- | ---- | ---------- | --------------------------------------------------------------------------------------------------- |
| `target`                   | enum    | 是   | -          | **任务类型**<br>固定值：`FTP`                                                                       |
| `name`                     | string  | 是   | ≤400 字符  | **任务名称**<br>唯一标识 FTP 任务                                                                   |
| `description`              | string  | 否   | ≤800 字符  | **任务描述**<br>详细说明任务目的                                                                    |
| `enabled`                  | boolean | 是   | -          | **启用状态**<br>`true`：启用（默认）<br>`false`：禁用                                               |
| `beforeName`               | string  | 否   | ≤400 字符  | **前序任务**<br>控制任务执行顺序                                                                    |
| `server`                   | object  | 是   | -          | **服务器配置**<br>详见下方服务器配置说明                                                            |
| `uploadFile`               | boolean | 是   | -          | **传输方向**<br>`true`：上传<br>`false`：下载（默认）                                               |
| `uploadFileSource`         | enum    | 否   | -          | **文件来源**<br>`REMOTE_FILE`：远程文件<br>`REMOTE_URL`：远程 URL<br>`LOCAL_FILE`：本地文件（默认） |
| `remoteFileName`           | string  | 否   | ≤4096 字符 | **远程文件名**<br>上传：保存的文件名<br>下载：下载的文件名                                          |
| `remoteFileUrl`            | string  | 否   | ≤4096 字符 | **远程文件 URL**<br>上传时从此 URL 下载文件                                                         |
| `localFileName`            | string  | 否   | ≤4096 字符 | **本地文件名**<br>上传：本地文件路径<br>下载：保存的本地路径                                        |
| `localFileContent`         | string  | 否   | ≤2MB       | **本地文件内容**<br>支持 Base64/Gzip 编码                                                           |
| `localFileContentEncoding` | enum    | 否   | -          | **内容编码**<br>`none`：明文<br>`base64`：Base64 编码<br>`gzip_base64`：Gzip 压缩后 Base64          |
| `binaryMode`               | boolean | 否   | -          | **传输模式**<br>`true`：二进制模式<br>`false`：文本模式                                             |

::: tip 注意
支持同时编排多个 Ftp 接口，但每次只允许启用一个 Ftp 进行测试。
:::

*Ftp完整结构配置示例：*

```yaml
- target: FTP
  name: UploadFromLocalFile
  description: Upload file from local file
  enabled: true
  server:
    # FTP服务器配置 ...
  uploadFile: true
  uploadFileSource: LOCAL_FILE
  remoteFileName: remote.txt
  localFileName: local.txt
  localFileContent: This is a text file content
  localFileContentEncoding: none
  binaryMode: false
```

### 服务器配置 (`server`)

| 字段名称         | 类型    | 必填 | 长度/范围限制 | 默认值 | 描述                                                                       |
| ---------------- | ------- | ---- | ------------- | ------ | -------------------------------------------------------------------------- |
| `server`         | string  | 是   | ≤253 字符     | -      | **FTP 服务器地址**<br>支持 IP 地址或完整域名<br>示例：`ftp.example.com`    |
| `port`           | integer | 是   | 1-65535       | 21     | **服务端口**<br>标准端口：21（命令端口）<br>数据传输端口根据模式自动分配   |
| `username`       | string  | 条件 | ≤400 字符     | -      | **认证账号**<br>服务器要求认证时必填<br>示例：`ftpuser`                    |
| `password`       | string  | 条件 | ≤4096 字符    | -      | **认证凭证**<br>采用加密存储和传输<br>企业级建议使用 SFTP 替代 FTP         |
| `readTimeout`    | string  | 否   | 1s-24h        | 60s    | **数据传输超时**<br>格式：数字+单位（如 30s）<br>大文件传输建议增大至 300s |
| `connectTimeout` | string  | 否   | 1s-24h        | 6s     | **连接建立超时**<br>格式：数字+单位（如 10s）<br>跨地域连接建议 15-30s     |

*Ftp服务器配置示例：*

```yaml
server:
  server: localhost
  port: 8084
  username: admin
  password: 123456
  readTimeout: 60s
  connectTimeout: 6s
```

### 文件传输方向 (`uploadFile`)

- **上传 (`true`)**：将文件从本地传输到FTP服务器
- **下载 (`false`)**：从FTP服务器获取文件到本地

### 文件来源 (`uploadFileSource`)

| 来源 | 适用场景 | 关联参数 |  
|------|----------|----------|  
| `LOCAL_FILE` | 使用本地文件 | `localFileName`<br>`localFileContent` |  
| `REMOTE_FILE` | 使用FTP服务器文件 | `remoteFileName` |  
| `REMOTE_URL` | 从URL获取文件 | `remoteFileUrl` |  

### 传输模式 (`binaryMode`)

| 模式 | 适用文件类型 | 特点 |  
|------|--------------|------|  
| **二进制模式** | 图片/视频/压缩文件 | 保持文件完整性 |  
| **文本模式** | 文本文件 | 自动转换换行符 |  


## 脚本示例(target)

### 完整参数配置示例

```yaml
- target: FTP
  name: UploadFromLocalFile
  description: Upload file from local file
  enabled: true
  server:
    server: localhost
    port: 8084
    username: admin
    password: 123456
    readTimeout: 60s
    connectTimeout: 6s
  uploadFile: true
  uploadFileSource: LOCAL_FILE
  remoteFileName: remote.txt
  localFileName: local.txt
  localFileContent: This is a text file content
  localFileContentEncoding: none
  binaryMode: false
```

### 从服务器中下载对应文件用于上传示例

```yaml
- target: FTP
  name: UploadFromRemoteFtpFile
  description: Download a file from the Ftp server and then upload it
  server:
    server: localhost
    port: 8084
    username: admin
    password: 123456
  uploadFile: true
  uploadFileSource: REMOTE_FILE
  remoteFileName: remote.txt
```

### 根据远程URL资源下载文件用于上传示例

```yaml
- target: FTP
  name: UploadFromRemoteUrl
  description: Download a file from the Ftp server and then upload it
  server:
    server: localhost
    port: 8084
    username: admin
    password: 123456
  uploadFile: true
  uploadFileSource: REMOTE_URL
  remoteFileUrl: https://pics6.baidu.com/feed/d50735fae6cd7b897fbfd8ad27e746a9d8330e1a.jpeg
```

### 上传本地文件示例

```yaml
- target: FTP
  name: UploadFromLocalFile
  description: Upload file from local file
  server:
    server: localhost
    port: 8084
    username: admin
    password: 123456
  uploadFile: true
  uploadFileSource: LOCAL_FILE
  remoteFileName: remote.txt
  localFileName: local.txt
  localFileContent: This is a text file content
```

### 上传本地文件Base64编码示例

```yaml
- target: FTP
  name: UploadAndEncodingFromLocalFile
  description: Upload and encode file from local file
  server:
    server: localhost
    port: 8084
    username: admin
    password: 123456
  uploadFile: true
  uploadFileSource: LOCAL_FILE
  remoteFileName: remote.txt
  localFileName: local.txt
  localFileContent: VGhpcyBpcyBhIHRleHQgZmlsZSBjb250ZW50
  localFileContentEncoding: base64
  binaryMode: false
```

### 下载文件实例

```yaml
- target: FTP
  name: RetrieveFile
  description: Retrieve file from remote Ftp server
  server:
    server: localhost
    port: 8084
    username: admin
    password: 123456
  uploadFile: true
  remoteFileName: test.txt
```

### 下载并重命名文件示例

```yaml
- target: FTP
  name: RetrieveAndRenameFile
  description: "Retrieve file from remote Ftp server and save it. Note: By default,\
    \ it is saved in the execution data directory."
  server:
    server: localhost
    port: 8084
    username: admin
    password: 123456
  uploadFile: true
  remoteFileName: remote.txt
  localFileName: new_file.txt
```
