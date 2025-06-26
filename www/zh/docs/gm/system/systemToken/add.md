---
title: AngusGM 添加系统令牌
outline: deep
---

# 添加系统令牌

> `添加系统令牌`功能用于在应用系统中创建新的身份验证令牌或密钥，以确保安全的身份验证和授权。

## 操作步骤

1. **登录应用**：
    - 使用您的账号登录到应用。

2. **进入系统令牌管理**：
    - 点击“AngusGM”。
    - 选择“系统”，然后点击“系统令牌”。

   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/systemtoken-add.png?fid=207887511026925867&fpt=2EYZr5NtNyIDhKDCXfFScsLpQDmeYuxshW9Rc5S8)

3. **添加访问令牌**：
    - 在“添加访问令牌”部分，填写相关信息。
    - 完成后，点击“保存”。

   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/systemtoken-addinfo.png?fid=207887511026925869&fpt=jQtxYc6W56cX8BL6zIDsWuy5q45J9cYLp669IeBU)

4. **查看已添加的访问令牌**：
    - 在“系统令牌”页面，您可以查看已添加的访问令牌列表。

   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/systemtoken-addlist.png?fid=207887511026925871&fpt=Zwt79lfVQvzJPg4r5ySCZb5TRgE50cuQi7oTfii6)

## 注意事项

- 为了保证安全性，建议为不同的外部系统创建并授权不同的系统令牌。
- 只有系统管理员可以创建、删除和查看系统令牌。

## 配额说明
不同版本的系统数量限制如下：

| 版本类型   | 默认配额  | 扩展方式                                              |
|------------|-------|---------------------------------------------------|
| 云服务版   | `10个` | 提交[工单申请](https://wo.xcan.cloud/workorders/create) |
| 私有部署版 | `10个` | 联系系统管理员调整可证                               |

> 提示：实时配额可在[资源配额页面](../../introduction/quotas)查看`系统访问令牌数`。