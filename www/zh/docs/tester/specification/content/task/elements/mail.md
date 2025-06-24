# Mail测试任务

> `Mail测试任务` 定义一个 Mail(POP3/IMAP) 协议测试任务，用于 Mail 功能、性能、稳定性和自定义测试。

## 主参数清单

| 参数          | 类型    | 必填 | 长度限制  | 说明                                                           |
| ------------- | ------- | ---- | --------- | -------------------------------------------------------------- |
| `target`      | enum    | 是   | -         | **任务类型**<br>固定值：`MAIL`                                 |
| `name`        | string  | 是   | ≤400 字符 | **任务名称**<br>唯一标识邮件任务                               |
| `description` | string  | 否   | ≤800 字符 | **任务描述**<br>详细说明任务目的                               |
| `enabled`     | boolean | 是   | -         | **启用状态**<br>`true`：启用（默认）<br>`false`：禁用          |
| `beforeName`  | string  | 否   | ≤400 字符 | **前序任务**<br>控制任务执行顺序                               |
| `protocol`    | enum    | 是   | -         | **邮件协议**<br>`POP3`：邮局协议<br>`IMAP`：互联网消息访问协议 |
| `server`      | object  | 是   | -         | **服务器配置**<br>详见下方服务器配置说明                       |
| `mail`        | object  | 是   | -         | **邮件配置**<br>详见下方邮件配置说明                   |

::: tip 注意
支持同时编排多个 Mail 接口，但每次只允许启用一个 Mail 进行测试。
:::

*Mail完整结构配置示例：*

```yaml
- target: MAIL
  name: Get mail messages (IMAP)
  description: Using IMAP protocol to obtain emails
  enabled: true
  protocol: IMAP
  server:
    # 邮件服务器配置 ...
  mail:
    # 邮件配置
```

### Mail服务器配置(server)

| 字段名称         | 类型    | 必填 | 范围/长度  | 默认值 | 说明                                                                                                       |
| ---------------- | ------- | ---- | ---------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| `server`         | string  | 是   | -          | -      | **邮件服务器地址**<br>支持域名/IP<br>示例：`mail.example.com`                                              |
| `port`           | integer | 是   | 1-65535    | -      | **服务端口**<br>标准端口：<br>SMTP:25, POP3:110, IMAP:143<br>加密端口：<br>SMTPS:465, POP3S:995, IMAPS:993 |
| `security`       | object  | 是   | -          | -      | **安全配置对象**<br>详见安全配置说明                                                                       |
| `useAuth`        | boolean | 是   | -          | `true` | **启用认证**<br>`true`：需要用户名密码<br>`false`：匿名访问                                                |
| `username`       | string  | 条件 | ≤400 字符  | -      | **认证账号**<br>`useAuth=true`时必填<br>完整邮箱格式：`user@domain.com`                                    |
| `password`       | string  | 条件 | ≤4096 字符 | -      | **认证凭证**<br>`useAuth=true`时必填<br>支持加密存储                                                       |
| `connectTimeout` | string  | 否   | 1s-24h     | `6s`   | **连接超时**<br>格式：`数字+单位`（如`10s`）<br>建立 TCP 连接最大等待时间                                  |
| `readTimeout`    | string  | 否   | 1s-24h     | `60s`  | **读取超时**<br>格式：`数字+单位`（如`30s`）<br>单次数据读取最大等待时间                                   |

*Mail服务器结构配置示例：*

```yaml
server:
  server: 192.168.0.211
  port: 993
  security:
    # 安全配置 ...
  useAuth: true
  username: test001@xcan.cloud
  password: test001@xcan
  readTimeout: 60s
  connectTimeout: 6s
```

#### Mail服务器安全配置(security)

| 参数                      | 类型    | 必填 | 长度限制   | 默认值  | 说明                                                                                     |
| ------------------------- | ------- | ---- | ---------- | ------- | ---------------------------------------------------------------------------------------- |
| `use`                     | enum    | 是   | -          | `NONE`  | **加密类型**<br>`NONE`：明文传输<br>`USE_SSL`：SSL 加密<br>`USE_STARTTLS`：STARTTLS 升级 |
| `trustAllCerts`           | boolean | 否   | -          | `false` | **信任所有证书**<br>`true`：跳过证书验证（危险）<br>`false`：验证证书有效性              |
| `enforceStartTLS`         | boolean | 否   | -          | `false` | **强制 STARTTLS**<br>`true`：拒绝不支持的服务器<br>`false`：降级为明文                   |
| `useLocalTrustStore`      | boolean | 否   | -          | `false` | **使用本地信任库**<br>`true`：使用自定义证书<br>`false`：使用系统默认                    |
| `trustStorePath`          | string  | 条件 | ≤4096 字符 | -       | **信任库路径**<br>本地证书文件路径<br>示例：`/etc/ssl/custom.pem`                        |
| `trustStoreBase64Content` | string  | 条件 | ≤40KB      | -       | **信任库内容**<br>Base64 编码证书内容                                                    |
| `tlsProtocols`            | string  | 否   | ≤80 字符   | -       | **强制协议版本**<br>示例：`TLSv1.2, TLSv1.3`                                             |

::: tip 注意
使用 trustStorePath 时需要确保文件已上传到对应执行节点路径。
:::

*Mail服务器安全配置示例：*

```yaml
security:
  use: USE_START_TLS
  trustAllCerts: true
  enforceStartTLS: false
  useLocalTrustStore: false
  trustStorePath: ""
  trustStoreBase64Content: VGhpcyBpcyBhIGNlcnRpZmljYXRlIGNvbnRlbnQ=
  tlsProtocols: TLSv1.2
```

### Mail邮件配置(mail)

| 字段名称         | 类型    | 是否必须 | 长度/数量限制 | 描述                                                                                      |
| ---------------- | ------- | -------- | ------------- | ----------------------------------------------------------------------------------------- |
| folder           | string  | 否       | ≤100 字符     | **目标邮件夹**<br>默认值：`INBOX`<br>支持标准邮件夹（SENT/DRAFTS/TRASH）或自定义路径      |
| deleteMessage    | boolean | 否       | -             | **邮件删除策略**<br>`true`：处理完成后自动删除邮件<br>`false`：保留邮件（默认）           |
| storeMimeMessage | boolean | 否       | -             | **原始邮件存储**<br>`true`：以 MIME 格式保存完整邮件到任务目录<br>`false`：不存储（默认） |
| numMessages      | integer | 否       | ≥0            | **邮件处理数量**<br>默认值：`1`<br>`0`：处理所有邮件<br>`N`：限制处理 N 封邮件            |

*Mail邮件配置示例：*

```yaml
mail:
  folder: INBOX
  deleteMessage: false
  storeMimeMessage: true
  numMessages: 1
```

## 脚本示例(target)

### 完整参数配置示例

```yaml
- target: MAIL
  name: Get mail messages (IMAP)
  description: Using IMAP protocol to obtain emails
  enabled: true
  protocol: IMAP
  server:
    server: 192.168.0.211
    port: 993
    security:
      use: USE_START_TLS
      trustAllCerts: true
      enforceStartTLS: false
      useLocalTrustStore: false
      trustStorePath: ""
      trustStoreBase64Content: VGhpcyBpcyBhIGNlcnRpZmljYXRlIGNvbnRlbnQ=
      tlsProtocols: TLSv1.2
    useAuth: true
    username: test001@xcan.cloud
    password: test001@xcan
    readTimeout: 60s
    connectTimeout: 6s
  mail:
    folder: INBOX
    deleteMessage: false
    storeMimeMessage: false
    numMessages: 1
```

### 使用IMAP协议获取电子邮件

```yaml
- target: MAIL
  name: Get mail messages (IMAP)
  description: Using IMAP protocol to obtain emails
  enabled: true
  protocol: POP3
  server:
    server: 192.168.0.211
    port: 995
    security:
      use: USE_START_TLS
      trustAllCerts: true
    useAuth: true
    username: test001@xcan.cloud
    password: test001@xcan
    readTimeout: 60s
    connectTimeout: 6s
  mail:
    folder: INBOX
    deleteMessage: false
    storeMimeMessage: false
    numMessages: 1
```

### 使用POP3协议获取电子邮件

```yaml
- target: MAIL
  name: Get mail messages (POP3)
  description: Using POP3 protocol to obtain emails
  enabled: true
  protocol: POP3
  server:
    server: 192.168.0.211
    port: 995
    security:
      use: USE_START_TLS
      trustAllCerts: true
    useAuth: true
    username: test001@xcan.cloud
    password: test001@xcan
    readTimeout: 60s
    connectTimeout: 6s
  mail:
    folder: INBOX
    deleteMessage: false
    storeMimeMessage: false
    numMessages: 1
```
