## api usage
### utils API
1. utils.typeString 返回数据类型
```
    import { typeString } from '@/utils/utils'

    const data = 'this is a test'
    const type = typeString(data) // type = 'string'
```

### cookies API
> clear、SET_LANG是扩展cookies的API，更多API请查看https://www.npmjs.com/package/js-cookie

1. cookies.clear 清空所有cookie
```
    import cookies from 'js-cookie'

    cookies.clear()
```
2. cookies.SET_LANG 当前设置的语言保存到cookie
```
    import cookies from 'js-cookie'

    cookies.SET_LANG('zh_CN')
```

### axios API
> signout、getURLSearchParams、enums是扩展axios的API，更多API请查看http://www.axios-js.com/zh-cn/docs/

1. signout 退出登录
```
    import http from '@/utils/http'

    http.signout()
```

2. getURLSearchParams 参数序列化为URLSearchParams格式，如使用http.get、http.post等API，已内置该API进行转换，无需转换
```
    import http from '@/utils/http'

    const params = http.getURLSearchParams({msg:'test'})
```

3. enums 获取各个网关的枚举值，返回值是对象格式。
```
    import http from '@/utils/http'

    const gateways = http.enums('/uc')
```
4. get\post\del\patch\put 基于axios封装的API，使用方法与axios一致，具体请查看http://www.axios-js.com/zh-cn/docs/
