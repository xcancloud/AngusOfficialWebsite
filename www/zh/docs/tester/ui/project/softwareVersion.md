# 软件版本


## 软件版本信息

| 参数                 | 字段名                | 类型         | 必填     | 长度限制 | 说明                       |
|----------------------|-----------------------|--------------|----------|----------|--------------------------|
| **ID**               | id                   | `bigint`     | **条件** | /        | 版本唯一标识符；修改时必须            |
| **项目ID**           | projectId            | `long`       | **是**   | /        | 所属项目唯一标识                 |
| **版本名称**         | name                 | `string`     | **是**   | ≤40      | 版本标识名称，<br/>如：V1.0.0          |
| 开始日期             | startDate            | `datetime`   | 否       | /        | 版本开发启动时间                 |
| 发布日期             | releaseDate          | `datetime`   | 否       | /        | 版本正式发布时间                 |
| 描述                 | description          | `string`     | 否       | ≤200     | 版本功能描述                   |
| **版本状态**         | status               | `enum`       | 只读     | /        | **状态枚举**：<br/>未发布/已发布/已归档 |
| 进度统计             | progress             | `object`     | 只读     | /        | 版本开发进度统计                 |
| 任务状态分布         | taskByStatus         | `map`        | 只读     | /        | 按状态分类的任务统计               |
| 创建人ID             | createdBy            | `long`       | 只读     | /        | 版本创建人ID                  |
| 创建人姓名           | createdByName        | `string`     | 只读     | /        | 创建人姓名                    |
| 创建时间             | createdDate          | `datetime`   | 只读     | /        | 版本创建时间                   |
| 最后修改人ID         | lastModifiedBy       | `long`       | 只读     | /        | 最后修改人ID                  |
| 最后修改人姓名       | lastModifiedByName   | `string`     | 只读     | /        | 最后修改人姓名                  |
| 最后修改时间         | lastModifiedDate     | `datetime`   | 只读     | /        | 最后修改时间                   |

### 版本状态（status）
| 枚举值           | 说明             |
|------------------|------------------|
| `NOT_RELEASED`   | 未发布           |
| `RELEASED`       | 已发布           |
| `ARCHIVED`       | 已归档           |
