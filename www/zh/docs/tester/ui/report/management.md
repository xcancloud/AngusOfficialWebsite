# 报告管理

AngusTester报告管理模块是一个高效的工具，用于生成、管理和存储各类报告。该模块支持多种操作，方便用户根据需要创建和修改报告，确保信息及时更新并符合需求。

## 报告操作

AngusTester 报告管理模块支持以下操作：

### 创建报告

用户可以通过选择模版和填写基本信息来创建新报告。

操作步骤:

1. 进入AngusTester报告页面，点击“创建报告”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-add.png?fid=251751417168003227&fpt=naTGDEeimY01BQlLxYL6QoidwEDdM3eS7s1bXHW9)
2. 在弹窗中选择合适的模版，设置时间生成选项，填写报告名称、描述等基本信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-add-content.png?fid=251751417168003225&fpt=9dfjhQBDN5IGKB3htUJUI1c0waZubCkNOGGq5ZJW)
3. 点击“确定”以保存报告。

***注意事项:***

- 名称和描述应简洁明了，说明报告的内容或用途，便于其他用户理解。
- 报告生成后内容会保持不变，如果需要更新内容可以通过“立即生成”或配置周期性生成报告来实现定时更新。

### 编辑报告

用户可以对已创建的报告进行编辑，更新报告内容或基本信息。

操作步骤:

1. 进入AngusTester报告页面，找到需要编辑的报告。
2. 点击“编辑”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-edit.png?fid=251751339858591922&fpt=QhioeAvq2DnPKr56WKdiE7MNGIo0mK0ej7OOjTcy)
3. 在弹窗中修改字段信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-edit-view.png?fid=251751339858591920&fpt=wHkcqSiayP9vd07A7clYHzhCV1ygfB1NFTYp1129)
4. 点击“确定”以应用更改。

***注意事项:***

- 编辑过程中确保信息的准确性。

### 查看报告

用户可以查看所有已创建的报告，了解报告的基本信息和状态。

操作步骤:

1. 进入AngusTester报告页面，找到需要查看的报告。
2. 点击目标报告的“查看”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-view.png?fid=251751417168003241&fpt=fFu2JwBTkTyMP73SropYC4tQSGTH0H606sCoMj4y)
3. 查看报告定义信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-view-view.png?fid=251751339858591924&fpt=gkiN1cXHeAvOBQjsnvLy7iUFMOFhRS2kbOHMJtpO)

### 查看报告内容

用户可以查看生成的报告内容，确保所需信息的完整性。

操作步骤:

1. 进入AngusTester报告页面，找到需要查看的报告。
2. 点击目标报告的名称打开报告内容页面。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-content.png?fid=251751417168003231&fpt=i3nS5BSBP2ucZVC1mkR9cyd5rAIzGvNLw1dE1zjy)
3. 在新打开的页面中查看报告内容。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-content-view.png?fid=251751417168003229&fpt=zfht3P5PSNnP9ViH9moAcLw7UGEhB4uS9w99e4Gv)

### 立即生成报告

用户可以选择立即生成报告以便快速获取结果，或者对报告信息更新。

操作步骤:

1. 进入AngusTester报告页面，找到需要立即生成报告的。
2. 点击“立即生成”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-gen-now.png?fid=251751417168003237&fpt=u3qEMs8xLakjC5m2MYgf9c31dDhx2G7dhqQLokcZ)
3. 等待系统反馈生成状态。

***注意事项:***

- 确保在生成前所有必填信息已填写完整。

### 删除报告

用户可以删除不再需要的报告，以维护报告管理的整洁性。

操作步骤:

1. 进入AngusTester报告页面，在报告列表中找到需要删除的报告。
2. 点击“删除”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-delete.png?fid=251751417168003233&fpt=CxuEkGYc4sL1SDcJqRar0j7WdPSWQheMb5JDk25K)
3. 在弹出的确认窗口中确认删除操作。
   
***注意事项:***

- 删除操作不可逆，请谨慎操作。
- 确保该报告不再被其他用户使用。

### 配置报告生成通知事件

用户可以设置生成报告后发送通知，确保相关人员及时获取报告信息。

操作步骤:

1. 进入AngusTester“配置”->"事件"->“推送配置”，找到"报告生成成功"事件选项。
2. 选择通知方式，如邮件、短信、站内消息，选择后会自动保存失效。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/report-event-config.png?fid=251751417168003235&fpt=O82I06hLuKp6SY1Tf11uy6TiqF4sCJ9BdkmU4MsI)

***注意事项:***
1. 配置后，默认只有报告创建人会收到通知。
2. 如果需要更多人收到提醒，需要进入全局管理应用“事件”中进行接收通道设置。

