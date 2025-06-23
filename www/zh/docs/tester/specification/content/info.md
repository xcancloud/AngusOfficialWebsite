# 元信息

> `元信息(info)` 为测试脚本提供核心描述信息，帮助用户快速理解脚本用途，同时便于工具自动化处理。

## 基本信息字段

脚本的完整描述信息：

| 字段名称       | 类型   | 必填 | 长度   | 说明                  |
|----------------|--------|------|--------|-----------------------|
| `name`        | string | 否   | ≤200   | 脚本标识名称          |
| `description` | string | 否   | ≤800   | 脚本功能详细描述      |
| `version`     | string | 否   | ≤40    | 脚本版本号            |
| `termsOfService` | string | 否   | ≤400   | 服务条款URL地址       |
| `contact`     | object | 否   | -      | 联系人信息对象        |
| `license`     | object | 否   | -      | 许可信息对象          |

> 💡 **扩展提示**：所有元信息字段可通过规范的"扩展字段"机制进行自定义扩展

一个完整的元信息配置示例：

```yaml
info:
  name: "脚本名称示例"
  description: "脚本功能描述示例"
  version: "1.0.0"
  termsOfService: "https://example.com/terms"
  contact: # 联系人信息
    name: "技术支持团队"
    url: "https://example.com/contact"
    email: "support@example.com"
  license: # 许可信息
    name: "MIT License"
    url: "https://opensource.org/licenses/MIT"
```

## 联系人信息 (contact)

脚本维护者的联系渠道

| 字段名称    | 类型   | 必填 | 长度   | 说明                |
|-------------|--------|------|--------|---------------------|
| `name`      | string | 否   | ≤200   | 联系人/团队名称     |
| `url`       | string | 否   | ≤400   | 联系信息页面URL     |
| `email`     | string | 否   | ≤160   | 联系邮箱地址        |

```yaml
contact:
  name: "技术支持团队"
  url: "https://example.com/contact"
  email: "support@example.com"
```

## 许可信息 (license)

脚本的使用授权信息

| 字段名称    | 类型   | 必填 | 长度   | 说明                |
|-------------|--------|------|--------|---------------------|
| `name`      | string | 否   | ≤200   | 许可证名称          |
| `url`       | string | 否   | ≤400   | 许可证详情URL       |

```yaml
license:
  name: "MIT License"
  url: "https://opensource.org/licenses/MIT"
```

