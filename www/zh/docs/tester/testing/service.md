# 测试服务

> 为了能够快速调试和验证测试脚本，我们提供了简单的公共服务实例来减少外部服务依赖，方便您开发调试脚本。

## Http接口测试Mock服务

| 服务          | 地址                                       |
| ------------- | ------------------------------------------ |
| serv01-sample | http://serv01-sample.angusmock.cloud:30010 |
| serv02-sample | http://serv02-sample.angusmock.cloud:30010 |

## WebSocket测试服务

| 服务          | 域名                          | 端口 | 消息模式        |
| ------------- | ----------------------------- | ---- | --------------- |
| serv01-sample | serv01-sample.angusmock.cloud | 8082 | LENGTH_PREFIXED |
| serv02-sample | serv02-sample.angusmock.cloud | 8082 | ONLY_SEND       |

## MySQL数据库测试服务

| 服务             | 域名                           | 端口 | 账号   | 密码   |
|----------------| ------------------------------ | ---- | ------ | ------ |
| mysql01-sample | mysql01-sample.angusmock.cloud | 3306 | sample | 123456 |
| mysql02-sample | mysql02-sample.angusmock.cloud | 3306 | sample | 123456 |

## Postgres数据库测试服务

| 服务              | 域名                              | 端口 | 账号   | 密码   |
| ----------------- | --------------------------------- | ---- | ------ | ------ |
| postgres01-sample | postgres01-sample.angusmock.cloud | 5432 | sample | 123456 |
| postgres02-sample | postgres02-sample.angusmock.cloud | 5432 | sample | 123456 |

## Ftp测试服务

| 服务          | 域名                          | 端口 | 账号  | 密码   |
| ------------- | ----------------------------- | ---- | ----- | ------ |
| serv01-sample | serv01-sample.angusmock.cloud | 8084 | admin | 123456 |
| serv02-sample | serv02-sample.angusmock.cloud | 8084 | admin | 123456 |

## Ldap测试服务

| 服务          | 域名                          | 端口 | 账号                                              | 密码         |
| ------------- | ----------------------------- | ---- |-------------------------------------------------| ------------ |
| serv01-sample | serv01-sample.angusmock.cloud | 389  | cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud | xcan@demo123 |
| serv02-sample | serv02-sample.angusmock.cloud | 389  | cn=admin,dc=serv02-sample,dc=angusmock,dc=cloud | xcan@demo123 |

## Tcp测试服务

| 服务          | 域名                          | 端口 | TCP 模式        | 长度前缀字节数 |
| ------------- | ----------------------------- | ---- | --------------- |---------|
| serv01-sample | serv01-sample.angusmock.cloud | 8083 | LENGTH_PREFIXED | 2       |
| serv02-sample | serv02-sample.angusmock.cloud | 8083 | EOL_BYTE        | /       |
