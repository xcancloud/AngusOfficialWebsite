# 用例基线管理

AngusTester提供了全面的用例基线管理功能，帮助团队在项目中建立标准和参考，以提高测试的有效性和一致性。通过对基线的创建、编辑、用例管理和对比，团队能够更好地控制项目进度和质量，确保软件在各个阶段都符合预期标准。

## 基线信息

在AngusTester中，每个基线包含以下字段信息：

- ID: 每个基线的唯一标识符，用于区分不同的基线。
- 项目ID: 关联的项目标识符，指明该基线属于哪个项目。
- 名称: 基线的名称，通常用以描述基线的内容或版本信息。
- 计划ID: 与基线相关的测试计划的标识符，确保基线与特定测试计划相对应。
- 描述: 对基线的详细说明，包括基线的目的、适用范围及其他重要信息。
- 已建立基准标志: 表示基线是否已经被正式建立的标识，通常为布尔值（是/否）。
- 创建人：创建该基线的用户。
- 创建时间：创建基线的时间。
- 最后修改人：最后修改该基线的用户。
- 最后修改时间：最后一次修改基线的时间。

## 基线操作

### 添加基线

创建新的基线记录。

具体步骤：

1. 登录AngusTester后，进入“用例”->“基线”管理界面。
2. 点击基线列表上方“添加基线”按钮。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/baseline-add.png?fid=251751339858592064&fpt=ulxBYLflADXJP3EabcvRQL3BJNY3gT0OzN2kF4PL)
3. 填写基线信息、选择需要建立基线用例。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/baseline-add-view.png?fid=251751339858592062&fpt=lbCnO1sPB3ojF13sidmyrCVuSqTyX4afksw10ix7)
4. 点击“保存”按钮，完成基线添加。

***注意事项：***

- 名称必须唯一且具有描述性，便于后续查找和管理。如：测试前阶段基线、测试迭代完成后基线。

### 编辑基线

修改现有基线的相关信息。

具体步骤：

1. 登录AngusTester后，进入“用例”->“基线”管理界面。
2. 点击列表中目标基线“编辑”按钮。
3. 修改基线信息、基线用例。
4. 点击“保存”按钮，完成基线修改。

***注意事项：***

- 已建立基线“基线用例”不允许再次编辑。

### 建立基线

使基线正式生效，建立基线用例版本和内容信息会被锁定，方便后续追溯。

具体步骤：

1. 登录AngusTester后，进入“用例”->“基线”管理界面。
2. 点击列表中目标基线“建立基线”按钮，使基线生效。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/baseline-establish.png?fid=251751339858592072&fpt=RvPmNrOnnsFUFYaRXvPK8ZzcNCT4SvYDw2y79yK7)

### 查看基线用例

查看与基线关联的所有测试用例。

具体步骤：

1. 登录AngusTester后，进入“用例”->“基线”管理界面。
2. 点击列表中目标基线名称进入基线详情页面。
3. 系统将展示该基线下的所有用例列表。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/baseline-case-list.png?fid=251751339858592066&fpt=YNrcyY7RjQavxjNK3GP1L93ldAHsHEiyJTJNIaTg)

### 基线用例对比

对比两个基线的用例差异。

具体步骤：

1. 登录AngusTester后，进入“用例”->“基线”管理界面。
2. 点击列表中目标基线名称进入基线详情页面。
3. 点击“基线对比”Tab页面，选择两个需要对比的基线，点击“比照”。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/baseline-diff.png?fid=251751339858592070&fpt=OsaqFRYowqlzgIcoTEqugHANSfRn5jb0ofnXWKLu)
4. 系统将展示两个基线之间的用例差异。
   ![](https://bj-c1-prod-files.xcan.cloud/storage/pubapi/v1/file/baseline-diff-view.png?fid=251751339858592068&fpt=QNZNnpgse63Ahhh1ldTg0ao7wDx8F9O8yS7hvSTT)

### 删除基线

删除不再需要的基线记录。

具体步骤：

1. 登录AngusTester后，进入“用例”->“基线”管理界面。
2. 点击列表中目标基线“删除”按钮。
3. 系统会弹出确认框，询问是否确认删除。
4. 点击“确认”进行删除操作。

***注意事项：***

- 删除操作不可逆，请确保该基线确实不再需要。

