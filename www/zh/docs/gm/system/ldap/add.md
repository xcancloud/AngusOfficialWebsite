添加目录
===

`添加目录`用于向应用系统中添加新的目录。添加后，将允许管理员或有相关权限的用户向应用系统新的用户身份信息，以满足最大化集中管理用户身份信息的系统需求。
 
## 操作步骤

**第一步：登录应用后进入"AngusGM"->"系统"->"LDAP"，点击列表右上角"添加LDAP服务"，如下图：**

![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-add.png?fid=207887590483820792&fpt=cemQo31m9NwMC2gzyOphh3aCtMQvFQSJdi4z8yDM)

**第二步：依次编辑LDAP目录信息并保存，如下：**

配置服务器，如下图：

![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-addserver.png?fid=207887590483820802&fpt=vhk96LWk1oerOexm8pqIN0CctPakLICCcCtFwmJy)

配置基础模式，如下图：

![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-addbase.png?fid=207887590483820794&fpt=4l5wn1ywlQi9mzKoVBofltUljvACgixwxi6BWNew)

配置用户模式，如下图：

![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-adduser.png?fid=207887590483820804&fpt=SKXzxkHOkW2jk0fxpGXFJbuStOCCx5cBOFIErOrg)

配置组模式，如下图：

![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-addgroup.png?fid=207887590483820796&fpt=882fZdYInCr4JujBhIx15K6NeGRUhmy82pp2N8u9)

配置成员模式，如下图：

![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-addmember.png?fid=207887590483820800&fpt=veXlZnHUiyglo826aFKgCivZ9mwalzGQNIeIKEYt)

**第三步：查看已经添LDAP目录服务，如下图：**

![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/ldap-addlist.png?fid=207887590483820798&fpt=SZC9XYgR9bCI1EgdRGdOLZKafIHkB4nrFrSAlMKP)

## 配额限制

最大允许配置`10`个LDAP目录服务。

## 注意事项

- 添加配置LDAP目录服务后，系统会按照启用LDAP目录服务排列顺序每隔`5`分钟自动同步一次。
- 为了目录中条目删除后不影响业务数据完整性，自动同步和下方列表操作列中"同步"、"删除目录"默认不会删除当前系统中已同步用户和组，只会删除组和用户成员关系。
- 如果要删除目录中不存在的用户和组，可以进入"AngusGM"->"组织人员"中手动删除，或者通过下方列表操作列中"删除目录和数据"删除所有。
