---
title: AngusGM添加目录
outline: deep
---

# 添加目录

> `添加目录` 用于在应用系统中添加新的目录，便于集中管理用户身份信息。

## 操作步骤

### 第一步：登录应用

- 使用您的账号登录到应用。

### 第二步：进入LDAP设置

- 点击“AngusGM”。
- 选择“系统”，然后点击“LDAP”。
- 在列表右上角，点击“添加LDAP服务”。

  ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-add.png?fid=207887590483820792&fpt=cemQo31m9NwMC2gzyOphh3aCtMQvFQSJdi4z8yDM)

### 第三步：编辑LDAP目录信息

依次配置以下信息并保存：

1. **配置服务器**  
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-addserver.png?fid=207887590483820802&fpt=vhk96LWk1oerOexm8pqIN0CctPakLICCcCtFwmJy)

2. **配置基础模式**  
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-addbase.png?fid=207887590483820794&fpt=4l5wn1ywlQi9mzKoVBofltUljvACgixwxi6BWNew)

3. **配置用户模式**  
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-adduser.png?fid=207887590483820804&fpt=SKXzxkHOkW2jk0fxpGXFJbuStOCCx5cBOFIErOrg)

4. **配置组模式**  
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-addgroup.png?fid=207887590483820796&fpt=882fZdYInCr4JujBhIx15K6NeGRUhmy82pp2N8u9)

5. **配置成员模式**  
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-addmember.png?fid=207887590483820800&fpt=veXlZnHUiyglo826aFKgCivZ9mwalzGQNIeIKEYt)

### 第四步：查看已添加的LDAP目录服务

- 确认LDAP目录服务已成功添加。

  ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-addlist.png?fid=207887590483820798&fpt=SZC9XYgR9bCI1EgdRGdOLZKafIHkB4nrFrSAlMKP)

## 配额限制

- 最大允许配置 **10** 个LDAP目录服务。

## 注意事项

- 系统会每隔 **5** 分钟自动同步已启用的LDAP目录服务，保持数据更新。
- 删除目录时，系统不会自动删除已同步的用户和组的信息，确保业务数据完整性。
- 若需删除目录中不存在的用户和组，请在“AngusGM”->“组织人员”中手动删除，或使用“删除目录和数据”操作删除所有相关信息。