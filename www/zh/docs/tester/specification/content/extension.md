# 扩展字段

> `扩展字段` 允许在保持脚本兼容性的前提下灵活扩展功能，所有扩展字段均以 `x-xc` 前缀标识，确保系统升级时不会破坏现有脚本结构。

## 核心规则

1. **前缀规范**：所有扩展字段必须以 `x-xc-` 开头
2. **向后兼容**：扩展字段不会影响现有脚本功能
3. **自由定义**：支持任意值类型（字符串/数字/对象/数组等）
4. **位置灵活**：可在脚本任意层级添加

## 配置示例

```yaml
server:
  url: "http://{env}-sample.angusmock.cloud:660"
  variables:
    env:
      allowableValues: ["beta", "prod"]
      defaultValue: beta
  # 扩展字段示例
  x-xc-serverSource: CURRENT_REQUEST
  x-xc-id: 201982800725803152
```

## 注意事项
1. **大小写敏感**：`x-xc-id` ≠ `x-xc-ID`
2. **值类型一致**：相同字段在不同脚本中应保持相同数据类型
4. **文档化**：团队内部维护扩展字段说明文档

> 💡 扩展字段不会被系统核心功能解析，主要用于存储元数据或传递自定义参数。
