# 如何快速导入外部接口

> 支持OpenAPI/Swagger/Postman格式无缝导入，3分钟完成接口迁移

```mermaid  
graph LR  
    A[导入方式] --> B{选择目标位置}  
    B -->|新建服务| C[创建服务同时导入]  
    B -->|已有服务| D[直接追加导入]  
    C --> E[新服务新接口]  
    D --> F[已有服务扩展]  
```

## 导入到新服务
> **适用场景**：新建服务并导入接口定义

1. **进入服务创建**
    - 导航至 **「接口」→「服务」**
    - 点击 **「创建服务」** 下拉选择 **「本地导入」**  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-import-new-step1.png?fid=251751417168003355&fpt=0QB3kl61ZcQ0LEE3yWBBo6Oew1EBJUd5JXxkxQZu)

2. **上传接口文件**
    - 填写新服务名称
    - 选择支持的格式：
        - OpenAPI 3.x
        - Swagger 2.0
        - Postman Collection  
          ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-import-new-step2.png?fid=251751417168003357&fpt=UqNNqLqu0JaHr1RV6Y6mi5DWNt6CAbT6E392Noxi)

3. **完成导入**
    - 系统自动创建服务并导入接口
    - 在服务详情查看导入的接口列表  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/service-import-new-step3.png?fid=251751417168003359&fpt=SczogEUqyNygWEQKrILnJoidEETsIN9hTsl7cFs7)

## 导入到已有服务
> **适用场景**：为现有服务追加接口

1. **选择目标服务**
    - 在服务列表中右键点击目标服务
    - 选择 **「本地导入」**  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-import-new-step1.png?fid=251751417168003349&fpt=h1F3R1sQFvSw6ThfruIsfVPZWFv2BX0bJxW9aABT)

2. **配置导入策略**
    - 上传接口文件
    - 设置冲突处理策略：
        - 覆盖重名接口
        - 跳过重名接口
        - 重命名新接口  
          ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-import-new-step2.png?fid=251751417168003351&fpt=YSYWgdR1vbXpi1GGjhB4YZ6V8ToEHzMOnUzB2tGF)

3. **完成导入**
    - 在服务接口列表查看新增接口  
      ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-import-new-step3.png?fid=251751417168003353&fpt=zvUIQmX13u8n44E7lpgWacdUD2GlHUhuKkewl1wr)

## 支持格式说明

| 格式 | 版本 | 文件示例 |  
|------|------|----------|  
| OpenAPI | 3.0.x | `openapi.yaml` |  
| Swagger | 2.0 | `swagger.json` |  
| Postman | Collection v2.1 | `postman_collection.json` |  

## 最佳实践
✅ 首次导入选择 **「覆盖重名接口」** 确保数据最新  
✅ 定期导入前进行 **「冲突检查」**  
✅ 大文件导入（>10MB）建议分批进行
