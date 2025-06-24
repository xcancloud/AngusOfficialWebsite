# Ldap测试任务

> `Ldap测试任务` 定义一个 Ldap 协议测试任务，用于 Ldap 功能、性能、稳定性和自定义测试。

## 主参数清单

| 参数           | 类型    | 必填 | 长度限制   | 说明                                                                                              |
| -------------- | ------- | ---- | ---------- | ------------------------------------------------------------------------------------------------- |
| `target`       | enum    | 是   | -          | **任务类型**<br>固定值：`LDAP`                                                                    |
| `name`         | string  | 是   | ≤400 字符  | **任务名称**<br>唯一标识 LDAP 任务                                                                |
| `description`  | string  | 否   | ≤800 字符  | **任务描述**<br>详细说明任务目的                                                                  |
| `enabled`      | boolean | 是   | -          | **启用状态**<br>`true`：启用（默认）<br>`false`：禁用                                             |
| `beforeName`   | string  | 否   | ≤400 字符  | **前序任务**<br>控制任务执行顺序                                                                  |
| `server`       | object  | 是   | -          | **服务器配置**<br>LDAP 服务器连接信息                                                             |
| `testType`     | enum    | 是   | -          | **操作类型**<br>`ADD`：添加条目<br>`MODIFY`：修改条目<br>`DELETE`：删除条目<br>`SEARCH`：搜索条目 |
| `userDefined`  | boolean | 否   | -          | **自定义条目**<br>`true`：使用自定义条目配置<br>`false`：使用预定义配置（默认）                   |
| `entryDn`      | string  | 条件 | ≤4096 字符 | **条目标识名**<br>`testType`为`ADD`或`MODIFY`时必填                                               |
| `arguments`    | map     | 条件 | 1-50 项    | **条目属性**<br>`testType`为`ADD`或`MODIFY`时必填<br>格式：`属性名: 值`                           |
| `searchBase`   | string  | 条件 | ≤4096 字符 | **搜索根节点**<br>`testType`为`SEARCH`时必填                                                      |
| `searchFilter` | string  | 条件 | ≤4096 字符 | **搜索过滤器**<br>`testType`为`SEARCH`时必填<br>示例：`(objectClass=*)`                           |
| `deleteEntry`  | string  | 条件 | ≤4096 字符 | **删除条目**<br>`testType`为`DELETE`时必填                                                        |

::: tip 注意
支持同时编排多个 Ldap 接口，但每次只允许启用一个 Ldap 进行测试。
:::

*LDAP完整结构配置示例：*

```yaml
- target: LDAP
  name: Add customized entry
  description: Add user defined person entry
  enabled: true
  server:
    # LDAP服务器配置 ...
  testType: ADD
  userDefined: true
  entryDn: cn=TestUser
  arguments:
    # 条目参数配置 ...
  searchBase: cn=TestUser
  searchFilter: cn=TestUser
  deleteEntry: cn=TestUser
```

### 服务器配置 (`server`)

| 字段名称   | 类型    | 必填 | 长度/范围限制 | 默认值 | 描述                                                                      |
| ---------- | ------- | ---- | ------------- | ------ | ------------------------------------------------------------------------- |
| `server`   | string  | 是   | ≤253 字符     | -      | **LDAP服务器地址**<br>支持 IPv4/IPv6 地址或域名<br>示例：`ldap.example.com` |
| `port`     | integer | 是   | 1-65535       | 389    | **服务端口**<br>标准端口：389（明文）/636（SSL）<br>企业级建议使用 636 端口  |
| `username` | string  | 条件 | ≤400 字符     | -      | **绑定DN**<br>认证用户完整 DN<br>示例：`cn=admin,dc=example,dc=com`       |
| `password` | string  | 条件 | ≤4096 字符    | -      | **绑定凭证**<br>支持加密存储<br>企业级建议使用 TLS 加密传输                  |
| `rootDn`   | string  | 否   | ≤4096 字符    | -      | **基准DN**<br>搜索操作的起点<br>示例：`ou=users,dc=example,dc=com`         |

*Ftp服务器配置示例：*

```yaml
server:
  server: 192.168.0.102
  port: 180
  username: "cn=admin,dc=dev-ldap,dc=xcan,dc=work"
  password: admin@mnbv123
  rootDn: "dc=dev-ldap,dc=xcan,dc=work"
```

### 操作类型 (`testType`)

- 添加条目 (`ADD`)  
  - `entryDn`：新条目的唯一标识名
  - `arguments`：条目属性键值对

- 修改条目 (`MODIFY`)  
  - `entryDn`：要修改的条目标识名
  - `arguments`：需要修改的属性键值对

- 删除条目 (`DELETE`)  
  - `deleteEntry`：要删除的条目标识名

- 搜索条目 (`SEARCH`)  
  - `searchBase`：搜索的起始节点
  - `searchFilter`：搜索过滤条件

## 脚本示例(target)

*内置默认人员条目信息*
> objectClass：top,person,organizationalPerson,inetOrgPerson  
> givenname：User  
> sn：Test  
> cn：TestUser + 唯一计数器编号  
> uid：user  
> userpassword：Test

### 完整参数配置示例

```yaml
- target: LDAP
  name: Add customized entry
  description: Add user defined person entry
  enabled: true
  server:
    server: 192.168.0.102
    port: 180
    username: "cn=admin,dc=dev-ldap,dc=xcan,dc=work"
    password: admin@mnbv123
    rootDn: "dc=dev-ldap,dc=xcan,dc=work"
  testType: ADD
  userDefined: true
  entryDn: cn=TestUser
  arguments:
    givenname: User
    sn: Test
    cn: TestUser
    uid: user
    userpassword: passd
  searchBase: cn=TestUser
  searchFilter: cn=TestUser
  deleteEntry: cn=TestUser
```

### 添加默认人员条目

```yaml
- target: LDAP
  name: Add entry
  description: Add person entry
  enabled: true
  server:
    server: 192.168.0.102
    port: 180
    username: "cn=admin,dc=dev-ldap,dc=xcan,dc=work"
    password: admin@mnbv123
    rootDn: "dc=dev-ldap,dc=xcan,dc=work"
  testType: ADD
```

::: tip 注意事项
非自定义测试时（userDefined=false），添加完默认人员条目信息后会自动删除。
:::

### 添加用户自定义人员条目

```yaml
- target: LDAP
  name: Add customized entry
  description: Add user defined person entry
  enabled: true
  server:
    server: 192.168.0.102
    port: 180
    username: "cn=admin,dc=dev-ldap,dc=xcan,dc=work"
    password: admin@mnbv123
    rootDn: "dc=dev-ldap,dc=xcan,dc=work"
  testType: ADD
  userDefined: true
  entryDn: cn=TestUser
  arguments:
    givenname: User
    sn: Test
    cn: TestUser
    uid: user
    userpassword: passd
```

### 修改默认人员条目

```yaml
- target: LDAP
  name: Modify entry
  description: Modify person entry
  enabled: true
  server:
    server: 192.168.0.102
    port: 180
    username: "cn=admin,dc=dev-ldap,dc=xcan,dc=work"
    password: admin@mnbv123
    rootDn: "dc=dev-ldap,dc=xcan,dc=work"
  testType: MODIFY
```

::: tip 注意事项
非自定义测试时（userDefined=false），修改前会先添加默认人员条目信息，添加成功后在执行修改操作，修改完成后会自动删除。
:::

### 修改用户自定义人员条目（修改手机号和密码）

```yaml
- target: LDAP
  name: Modify customized entry
  description: Modify user defined person entry
  enabled: true
  server:
    server: 192.168.0.102
    port: 180
    username: "cn=admin,dc=dev-ldap,dc=xcan,dc=work"
    password: admin@mnbv123
    rootDn: "dc=dev-ldap,dc=xcan,dc=work"
  testType: MODIFY
  userDefined: true
  entryDn: cn=TestUser
  arguments:
    mobile: 18910691700
    userpassword: passd2
```

### 搜索默认人员条目

```yaml
- target: LDAP
  name: Modify entry
  description: Modify person entry
  enabled: true
  server:
    server: 192.168.0.102
    port: 180
    username: "cn=admin,dc=dev-ldap,dc=xcan,dc=work"
    password: admin@mnbv123
    rootDn: "dc=dev-ldap,dc=xcan,dc=work"
  testType: MODIFY
```

::: tip 注意事项
非自定义测试时（userDefined=false），搜索前会先添加默认人员条目信息，添加成功后在执行搜索操作，搜索完成后会自动删除。
:::

### 搜索用户自定义人员条目

```yaml
- target: LDAP
  name: Search customized entry
  description: Search user defined person entry
  enabled: true
  server:
    server: 192.168.0.102
    port: 180
    username: "cn=admin,dc=dev-ldap,dc=xcan,dc=work"
    password: admin@mnbv123
    rootDn: "dc=dev-ldap,dc=xcan,dc=work"
  testType: SEARCH
  userDefined: true
  searchBase: cn=TestUser
  searchFilter: cn=TestUser
```

### 删除默认人员条目

```yaml
- target: LDAP
  name: Delete entry
  description: Delete person entry
  enabled: true
  server:
    server: 192.168.0.102
    port: 180
    username: "cn=admin,dc=dev-ldap,dc=xcan,dc=work"
    password: admin@mnbv123
    rootDn: "dc=dev-ldap,dc=xcan,dc=work"
  testType: DELETE
```

::: tip 注意事项
非自定义测试时（userDefined=false），删除前会先添加默认人员条目信息，添加成功后在执行删除操作。
:::

### 删除用户自定义人员条目

```yaml
- target: LDAP
  name: Delete customized entry
  description: Delete user defined person entry
  enabled: true
  server:
    server: 192.168.0.102
    port: 180
    username: "cn=admin,dc=dev-ldap,dc=xcan,dc=work"
    password: admin@mnbv123
    rootDn: "dc=dev-ldap,dc=xcan,dc=work"
  testType: DELETE
  userDefined: true
  deleteEntry: cn=TestUser
```
