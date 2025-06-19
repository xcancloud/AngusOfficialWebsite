---
title: AngusTester 插件化架构
outline: deep
---

# AngusTester 插件化架构

## 核心价值

> **灵活可扩展的插件生态**
> 
> AngusTester 通过**模块化插件架构**实现高度灵活的功能模块和测试扩展能力：
> - 🧱 **模块解耦**：测试功能与核心引擎分离
> - 🔄 **热插拔设计**：插件安装/更新无需重启主系统（<2秒）
> - 🌐 **开放生态**：支持开发者创建共享插件

## 架构优势

| 特性 | 描述 | 用户收益 |
|------|------|----------|
| **灵活扩展** | 通过插件添加新协议/功能 | 适应不断变化的技术栈 |
| **按需定制** | 选择安装所需功能插件 | 减少资源占用 |
| **持续进化** | 独立更新的插件生态系统 | 及时获取最新测试能力 |
| **标准集成** | 统一插件API规范 | 降低集成复杂度 |

## 插件生态全景

### 功能插件
- **功能测试**：UI与业务流验证 <el-icon><CircleCheck /></el-icon>
- **安全测试**：漏洞扫描与防护 <el-icon><CircleCheck /></el-icon>
- **事件通知**：
  - 华为云短信通知 <el-icon><CircleCheck /></el-icon>
  - 阿里云短信通知 <el-icon><CircleCheck /></el-icon>
- **接口签名**：自动生成验证签名 <el-icon><CircleCheck /></el-icon>

### 协议测试插件
- Http(s) <el-icon><CircleCheck /></el-icon>
- WebSocket(s) <el-icon><CircleCheck /></el-icon>
- JDBC <el-icon><CircleCheck /></el-icon>
- TCP <el-icon><CircleCheck /></el-icon>
- FTP <el-icon><CircleCheck /></el-icon>
- LDAP <el-icon><CircleCheck /></el-icon>
- SMTP <el-icon><CircleCheck /></el-icon>
- MAIL(POP3/IMAP) <el-icon><CircleCheck /></el-icon>
- JMS <el-icon><CircleCheck /></el-icon>
- Dubbo <el-icon><CircleClose /></el-icon>
- gRPC <el-icon><CircleClose /></el-icon>

### 中间件测试插件
- **数据库测试：**  
  - MySQL  <el-icon><CircleCheck /></el-icon>
  - SQLServer  <el-icon><CircleCheck /></el-icon>
  - Postgresql <el-icon><CircleCheck /></el-icon>
  - Oracle   <el-icon><CircleCheck /></el-icon>

- **NoSQL测试：**  
  - MongoDB <el-icon><CircleCheck /></el-icon>
  - Cassandra <el-icon><CircleClose /></el-icon>
  - InfluxDB <el-icon><CircleClose /></el-icon>

- **消息队列测试：**  
  - Kafka  <el-icon><CircleCheck /></el-icon>
  - RabbitMQ <el-icon><CircleCheck /></el-icon>
  - RocketMQ <el-icon><CircleClose /></el-icon>

### 数据生成插件
- MockCsv <el-icon><CircleCheck /></el-icon>
- MockExcel <el-icon><CircleCheck /></el-icon>
- MockJson <el-icon><CircleCheck /></el-icon>
- MockSql <el-icon><CircleCheck /></el-icon>
- MockTab <el-icon><CircleCheck /></el-icon>
- MockXml <el-icon><CircleCheck /></el-icon>
- MockCustom <el-icon><CircleCheck /></el-icon>
