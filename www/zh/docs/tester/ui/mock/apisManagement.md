# Mock接口管理

AngusTester Mock接口为开发者和测试人员提供了灵活高效的接口模拟解决方案。通过对Mock接口的有效管理，团队可以在服务开发的不同阶段，快速响应需求变化，提高开发效率和软件质量。

## Mock接口操作

AngusTester提供多种操作来管理Mock接口，具体操作及其说明如下：

### 添加Mock接口

创建新的Mock接口并配置相关字段。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，点击左上角“添加接口”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-add.png?fid=251751339858591950&fpt=yPjbIFe8ZAShAWrkKJdNnR5jKDrzSw10A4zxRfjU)
3. 在右侧填写接口的名称、描述、请求方式、接口路径等信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-add-basic.png?fid=251751339858591946&fpt=iqtiqhPuR1LxESPZ1zlvRygR0fN2ZI6FEM0nfrAo)
4. 最后添加Mock响应内容。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-add-response.png?fid=251751339858591948&fpt=bWB3S51PBIK34Cbeg1Stj7s8QViNwxtHEc5FxDHP)
5. 点击“保存”按钮完成创建。

***注意事项：***

- 确保接口路径和方法唯一，避免与已有接口冲突。
- 点击保存按钮会自动同步Mock接口到服务实例，若不生效可以通过“刷新实例接口”强制刷新。

### 导入Mock接口

基于外部Mock接口脚本入Mock接口。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，点击左上角“添加接口”操作下来中“导入接口”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-import.png?fid=251751339858591960&fpt=b8gUJkgwITnC0ujCc9UleVz7Z37tG7p95cKOQz45)
3. 选择导入脚本文件，指定遇到重复时的处理策略，以及当前接口在导入数据中不存在时是否删除。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-import-view.png?fid=251751339858591958&fpt=DWrQ6LZNrZgLrOfoZobM8PgCJ8jvkuMScCeLZsnH)
4. 确认导入，系统会自动导入示例数据到当前Mock服务。

***注意事项：***

- 导入接口和已存在接口方法和路径不能冲突。

### 导入示例

导入AngusTester提供的示例Mock接口，用于快速熟悉Mock响应配置和测试验证。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，点击左上角“添加接口”操作下来中“导入示例”按钮。
3. 系统会自动导入示例数据到当前Mock服务。

### 导出Mock接口

用于导出Mock接口脚本来备份当前接口或者导出到其他Mock服务。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，点击“导出”按钮系统会自动下载文件。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-export.png?fid=251751339858591956&fpt=TkVtERb3ak3JvNJmItA6xaN61iBVnk3QBhBmmcxU)
3. 下载成功可以在浏览器下载中找到该文件。

***注意事项：***

- 该导出操作只会导出当前接口，导出服务所有接口请查看Mock服务“导出”操作。

### 删除Mock接口

移除不再需要的Mock接口。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，选择要删除的Mock接口，点击“删除”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-delete.png?fid=251751339858591954&fpt=oxJoDWkXqq6f0OadnPsWZ5DkzFz5tXaNHNavrD5W)
3. 在弹出的确认窗口中确认删除操作。

***注意事项：***

- 删除操作不可逆，请谨慎操作。
- 确保该Mock接口不再被其他用户使用。
  
### 克隆Mock接口

基于已存在Mock接口快速复制一个新的接口。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，选择需要克隆的Mock接口，点击“克隆”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-clone.png?fid=251751339858591952&fpt=cxBPpJSwpWidzjAUGitQr32YxK4jhn3lZ3JqgYhN)
3. 修改克隆后的接口信息，如名称和接口路径。
4. 保存新的Mock接口。

***注意事项：***

- 确保克隆后的接口方法和路径唯一，以避免冲突。

### 刷新接口到实例

刷新操作将更新接口的最新状态。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，点击“刷新实例接口”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-refresh.png?fid=251751339858591962&fpt=dCuFqZahwQRsoOZ0pWLhk0wpLDfDD8WHwnEG14Nv)
3. Mock服务会自动拉取当前接口并更新。

***注意事项：***

- 点击Mock接口“保存”按钮也会自动刷新。

### 测试Mock请求响应

验证Mock接口的响应是否符合预期。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，选择要测试Mock接口，点击右侧“测试请求”按钮。
3. 发送请求并查看Mock接口响应状态码、响应头、响应体是否和预期一致。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-request-test.png?fid=251751417168003259&fpt=Id65gQ5WFBrdnVnrGB502k5f8p4r8rd7BI8bJ5jQ)
4. ***如果响应头中返回参数“XC-Mock-Error: true”说明没有找到匹配相应或者配置参数有错误。***

***注意事项：***

- 测试前需要保存最新修改，确保测试数据的准确性，以验证Mock接口的正确性。
- ***如果测试结果和预期不一致，请确认匹配条件参数是否填写正确，或最新修改是否已保存。***

### 配置测试Mock请求代理

通过设置请求代理，可以绕过跨域限制，使得请求能够成功发送到目标服务器。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，点击右侧“代理”按钮。
3. 在展开的弹窗里选择对应“代理”即可。具体代理选择请查看AngusTester“配置”->"代理”中说明。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-request-proxy.png?fid=251751417168003257&fpt=mePRYnizfd1vHE6tB1VeGrF562giQJnwHKZtUvjR)

### Mock随机内容响应

根据Mock函数生成随机响应内容。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，选择要添加相应的Mock接口，点击“添加响应”按钮。
3. 在响应“内容”->“响应体”中添加如下内容。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-response-mockbody.png?fid=251751417168003275&fpt=cAe22vXqEa8rZM6Gz7DTu5kI4mY0mVfSmzKf0hMS)
4. 点击“保存”使修改生效。

### 根据条件匹配模拟响应

根据不同条件返回相应的Mock数据。

***匹配返回规则：***
- 当存在多个响应时，会返回当前满足匹配条件且优先级最高的响应。
- 如果存在多个同优先级满足匹配的响应，会返回排在最前面响应。
- 没有找到匹配条件响应时会返回默认响应，即未配置匹配条件的响应；如果默认响应未配置，Mock服务器会返回404-表示接口为定义。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，选择需要添加条件匹配响应的接口，点击“添加响应”按钮。
3. 配置匹配条件，如下添加请求体匹配条件。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-response-match.png?fid=251751417168003273&fpt=jlT8uNk7pjmPvwIfUVc5H6VllpC5MB4tL6SycXzw)
4. 满足匹配条件时返回响应内容。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-response-content.png?fid=251751417168003265&fpt=ITuhb4bUCfOrA3CPKKE6p69psJfVYwn9qEP5P9b5)
5. 点击“保存”使配置生效。

***注意事项：***

- 正确设置匹配条件，以确保响应的正确性。

### 模拟指定延迟时间的响应

模拟网络延迟，测试客户端处理能力。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，选择需要添加延迟时间响应的接口，点击“添加响应”按钮。
3. 配置延迟时间，如下配置随机10ms-200ms延迟。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-response-delay.png?fid=251751417168003267&fpt=cNgf7cnDHChnrxPO78HzwlNtnbkcSifgdnUa5pbm)
4. 点击“保存”使配置生效。

***注意事项：***

- 延迟时间应合理设置，以模拟真实网络延迟。

### 模拟常状态码响应

返回特定的HTTP状态码以模拟错误情况。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，选择需要模拟异常状态码的接口，点击“添加响应”按钮。
3. 配置错误状态码，如下客户端400错误。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-response-client-error.png?fid=251751417168003263&fpt=7C6T2D0hyWNUQzhY2VRt2e3lmWp4P8eHtN0o2JSY)
4. 点击“保存”使配置生效。

***注意事项：***

- 确保状态码符合HTTP规范，并提供清晰的错误信息，便于前端开发进行错误处理。

### 模拟文件下载响应

返回二进制文件内容，例如图片或文档。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，选择需要模拟文件下载的接口，点击“添加响应”按钮。
3. 点击“内容”->“响应体”右上方“插入文件”文件。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-response-file.png?fid=251751417168003271&fpt=90NOFBe80tYSkCHyGkFg7vcoYlBa1TdD0sgLYvXw)
4. 点击“保存”使配置生效。

***注意事项：***

- 确保文件格式和大小符合预期，以避免在测试中出现异常。
- 插入文件会以Base64编码形式保存到Mock接口和脚本，在模拟响应时自动转成二进制文件。

### Mock响应并自动回推一个请求

在响应后自动将请求回推到真实接口进行处理。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，选择需要模拟文件下载的接口，点击“添加响应”按钮。
3. 开启“内容”->“回推”选项，并配置回推请求。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-response-callback.png?fid=251751417168003261&fpt=iKz5RMCL11Y2IR01ry6HsfCnbrTSodxNjZL6Y3rH)
4. 点击“保存”使配置生效。

### 删除Mock响应

删除不需要的Mock响应。

操作步骤：

1. 进入AngusTester Mock页面，点击服务名进入服务详情。
2. 再进入“接口”页面，选择需要删除的Mock接口。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/apis-response-delete.png?fid=251751417168003269&fpt=KUAcHbROcP79A0WTSSo7clZkgzv8Tw30o0ZWdURr)
3. 找到需要删除的响应，点击“删除响应”按钮，系统会自动删除。

***注意事项：***

- 删除后该响应将不再可用，需小心处理，避免影响测试结果。

## 字段信息

| 参数              | 字段名                | 类型         | 必填     | 长度限制 | 说明                     |
|-----------------|-----------------------|--------------|----------|----------|------------------------|
| **ID**          | id                   | `bigint`     | **条件** | /        | 唯一标识符；<br/>修改时必须     |
| **Mock服务ID**    | mockServiceId        | `long`       | **是**   | /        | 关联Mock服务唯一标识           |
| **接口名称**        | summary              | `string`     | **是**   | ≤400     | 接口功能摘要                 |
| 详细描述            | description          | `string`     | 否       | ≤20000   | 接口详细描述                 |
| **HTTP方法**      | method               | `enum`       | **是**   | /        | **HTTP方法**，<br/>如：GET       |
| **接口端点**        | endpoint             | `string`     | **是**   | ≤800     | 接口访问路径                 |
| 项目ID            | projectId            | `long`       | 只读     | /        | 所属项目ID                 |
| 接口来源            | source               | `enum`       | 只读     | /        | **来源**，<br/>如：手动创建          |
| 导入来源            | importSource         | `enum`       | 只读     | /        | **导入来源**，<br/>如：OpenAPI            |
| 关联项目ID          | assocProjectId        | `long`       | 只读     | /        | 关联项目ID                 |
| 关联项目名称          | assocProjectName     | `string`     | 只读     | /        | 关联项目名称                 |
| 关联接口ID          | assocApisId          | `long`       | 只读     | /        | 关联接口ID                 |
| 关联接口名称          | assocApisName        | `string`     | 只读     | /        | 关联接口名称                 |
| Mock服务名称        | mockServiceName      | `string`     | 只读     | /        | 关联Mock服务名称             |
| Mock服务域名        | mockServiceDomainUrl | `string`     | 只读     | /        | Mock服务域名地址             |
| Mock服务主机地址      | mockServiceHostUrl   | `string`     | 只读     | /        | Mock服务主机地址 |
| 请求次数            | requestNum           | `long`       | 只读     | /        | 接口请求总次数                |
| 推送请求次数          | pushbackNum          | `long`       | 只读     | /        | 推送请求次数                 |
| 模拟错误次数          | simulateErrorNum     | `long`       | 只读     | /        | 模拟错误响应次数               |
| 成功次数            | successNum           | `long`       | 只读     | /        | 请求成功次数                 |
| 异常次数            | exceptionNum         | `long`       | 只读     | /        | 请求异常次数                 |
| 操作不一致标记         | inconsistentOperation| `boolean`    | 只读     | /        | 接口操作是否不一致              |
| 关联接口删除状态        | assocApisDeleted     | `boolean`    | 只读     | /        | 关联接口是否已删除              |
| 实际接口方法          | apisMethod           | `enum`       | 只读     | /        | 关联接口实际HTTP方法           |
| 实际接口端点          | apisEndpoint         | `string`     | 只读     | /        | 关联接口实际访问路径             |
| **响应列表**        | responses            | `list`       | 只读     | /        | Mock响应配置列表<br/> |
| 租户 ID           | tenantId    | `long`     | 只读   | /    | 所属租户 ID                |
| 创建人ID           | createdBy            | `long`       | 只读     | /        | 接口创建人ID                |
| 创建人姓名           | createdByName        | `string`     | 只读     | /        | 创建人姓名                  |
| 创建时间            | createdDate          | `datetime`   | 只读     | /        | 接口创建时间                 |
| 最后修改人ID         | lastModifiedBy       | `long`       | 只读     | /        | 最后修改人ID                |
| 最后修改人姓名         | lastModifiedByName   | `string`     | 只读     | /        | 最后修改人姓名                |
| 最后修改时间          | lastModifiedDate     | `datetime`   | 只读     | /        | 最后修改时间                 |

### 响应列表字段（responses）

| 参数                 | 字段名                | 类型         | 说明                                                                 |
|----------------------|-----------------------|--------------|----------------------------------------------------------------------|
| 响应名称             | name                 | `string`     | 响应配置名称                                                         |
| 请求匹配条件         | match                | `object`     | 请求匹配规则配置                                                     |
| 响应内容             | content              | `object`     | Mock响应内容配置                                                    |
| 推送配置             | pushback             | `object`     | 请求推送配置                                                         |
| 匹配异常响应标记     | matchExceptionResponse| `boolean`    | 是否匹配异常响应                                                    |

### 接口来源（source）
| 枚举值           | 说明             |
|------------------|------------------|
| `CREATED`        | 手动创建         |
| `ANGUS_IMPORT`   | Angus文件导入    |
| `COPY_APIS`      | 复制接口         |
| `ASSOC_APIS`     | 关联接口         |

### 导入来源（importSource）
| 枚举值       | 说明        |
|--------------|-------------|
| `OPENAPI`    | OpenAPI     |
| `POSTMAN`    | Postman     |
| `ANGUS`      | Angus       |

### HTTP方法（method）
| 枚举值       | 说明     |
|--------------|----------|
| `GET`        | GET      |
| `POST`       | POST     |
| `PUT`        | PUT      |
| `DELETE`     | DELETE   |
| `PATCH`      | PATCH    |
| `OPTIONS`    | OPTIONS  |
| `HEAD`       | HEAD     |
