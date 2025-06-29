# 敏捷会议管理

AngusTester的敏捷会议管理模块旨在帮助团队高效组织和管理敏捷会议。用户可以通过该模块创建、编辑、删除和查看会议，增强团队协作和信息共享。

## 会议信息

在AngusTester中，每个会议包含以下字段信息：

- ID：每个会议的唯一标识符，创建会议后自动分配。
- 项目ID：会议所属项目ID。
- 主题：会议的主题，简要描述会议的主要内容或目的。
- 所属会议：会议所关联的会议，帮助团队在不同会议中组织会议，非必须。
- 类型：会议的类型，例如“站立会议”、“回顾会议”、“计划会议”等。
- 会议日期：会议安排的日期。
- 会议时间：会议的开始时间。
- 会议地点：会议的举行地点，可以是实体地点或虚拟会议链接。
- 主持人：负责会议的主持人，通常是会议的组织者或团队负责人。
- 参会者：参与会议的人员列表，可能包括团队成员和其他相关人员。
- 会议内容：会议的详细内容或议程，包括讨论点和决策。
- 创建人：创建该会议记录的用户。
- 创建时间：创建会议记录的时间。
- 最后修改人：最后编辑该会议记录的用户。
- 最后修改时间：最后一次修改会议记录的时间。

## 会议操作

AngusTester提供了以下完整操作，以便于会议的创建和管理：

### 添加会议

快速设置新会议，包括主题、时间、地点和参与者信息。

操作步骤：

1. 进入“任务”->“会议”管理页面，点击“添加会议”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/meeting-add.png?fid=251751417168003157&fpt=CIZttpzdbRauvdkFwhWQg8ygyN3uKOqJYJ1AVqjZ)
2. 填写会议信息，包括主题、所属会议、类型、会议日期、会议时间、会议地点、主持人、参会者、会议内容信息。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/meeting-add-view.png?fid=251751417168003149&fpt=IptEXzRmHSliMuwTcnULSSFqbBHntPh9Vq9faF9I)
3. 确认所有信息无误后，点击“保存”按钮以创建会议。

### 编辑会议

修改已有会议的详细信息，以确保内容的准确性和及时性。

操作步骤：

1. 进入“任务”->“会议”管理页面，在列表中找到需要编辑的会议。
2. 点击该会议的“编辑”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/meeting-edit.png?fid=251751417168003153&fpt=2WTdpY6oEkXsqRLqybx7suaRFhwinaq0ESjQIRnS)
3. 修改所需的字段信息。
4. 确认修改后，点击“保存”以更新会议信息。

### 删除会议

移除不再需要的会议记录，保持会议列表的整洁。

操作步骤：

1. 进入“任务”->“会议”管理页面，在列表中找到需要删除的会议。
2. 点击该会议的“删除”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/meeting-delete.png?fid=251751417168003155&fpt=XZlpq6bS6wOlgynXKPXPunCvMFK7lmdg70XCwFNx)
3. 系统将弹出确认对话框，提示您确认是否删除该会议。
4. 确认删除操作，系统将提示确认以防误操作。

### 查看会议

浏览和了解会议的详细信息，包括议程、参与者和会议记录。

操作步骤：

1. 进入“任务”->“会议”管理页面，在列表中找到需要查看的会议。
2. 点击该会议的名称。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/meeting-view.png?fid=251751417168003151&fpt=f5sd5EaAnM6cqbPXkUlrWI3hDp0CfkcL479FU290)
3. 系统将显示该会议的详细信息。

