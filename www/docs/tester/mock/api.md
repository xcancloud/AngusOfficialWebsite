# 模拟接口

当某个接口尚未实现或无法访问时，可以通过 Mock 接口模仿真实接口的行为和数据返回，使用例、接口、场景测试不再依赖真实的服务，使测试团队能够在项目启动初期就展开全面的测试活动。

## 核心功能
       
- 模拟对象行为：模拟实际对象的行为，使得在测试过程中可以替代真实对象，从而隔离被测系统的各个模块，集中关注当前被测试的功能单元。
- 外部依赖模拟：当测试涉及外部服务、API调用时，为了确保测试的独立性，Mock 接口可以模拟这些外部依赖的行为，使得测试可以在受控的环境中运行，即消除对这些外部依赖的直接依赖。
- 定制返回值：根据不同请求参数(业务入参)返回对应的响应值，以便测试不同的场景和分支。
- 异常场景测试：模拟一些异常场景，确保系统能够正确处理异常情况，如果状态码错误、响应延迟超时、错误处理等。
- 验证异步处理：通过接收到 Mock 请求后自动触发回推，可以验证系统在异步操作完成后的状态是否符合预期，或者模拟外部系统向您的系统发送通知的场景，以确保您的系统能够正确处理这些通知。

## 模拟接口示例

运行 Mock 接口需要先在 AngusTester 应用 "Mock" 中先创建并启动服务，然后点击进入服务中接口，选择"新建接口"下拉选择中"导入接口"导入 Mock 接口脚本即可。

- 模拟一个基准性能测试接口

通过模拟基准性能测试接口，可以测量系统对请求的响应时间。这有助于评估系统在正常负载下的响应效率。下面脚本模拟一个无业务处理快速响应的接口，当前Mock接口接收到客户端请求后立即返回成功。

```yaml
specification: angus/1.0.0
type: MOCK_APIS
task:
  mockApis:
    - name: Benchmark performance testing
      description: Mock fast response api without any business processing. The current Mock api immediately returns success upon receiving a request from the client.
      method: GET
      endpoint: /benchmark
      responses:
        - name: No delay in successful response
          match:
            priority: 1000
          content:
            status: 200
            headers:
              - name: Content-Type
                value: text/plain
            content: Success
```

调用结果：

```bash
> curl -i http://serv01-sample.angusmock.cloud:30010/benchmark
HTTP/1.1 200 OK
XC-Mock-ServiceId: 203883811233071109
XC-Mock-RequestId: 1a137a2e-0b60-4931-b4c9-a3d1ceb9a858
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
Content-Type: text/plain
content-length: 7

Success
```

- 模拟业务处理延迟接口

```yaml
specification: angus/1.0.0
type: MOCK_APIS
task:
  mockApis:
    - name: Business processing delay
      description: Mock different business processing delays. Used to return corresponding fixed delays based on client's time requirements.
      method: GET
      endpoint: /business
      responses:
        - name: Mock 1 millisecond business processing delay response
          match:
            parameters:
              - name: delay
                in: query
                condition: EQUAL
                expected: 1
            priority: 1000
          content:
            status: 200
            content: '{
                          "code": "S",
                          "msg": "Respond with a delay of 1 millisecond."
                      }'
            delay:
              mode: FIXED
              fixedTime: 1ms
        - name: Mock 10 millisecond business processing delay response
          match:
            parameters:
              - name: delay
                in: query
                condition: EQUAL
                expected: 10
            priority: 1000
          content:
            status: 200
            content: '{
                          "code": "S",
                          "msg": "Respond with a delay of 10 millisecond."
                      }'
            delay:
              mode: FIXED
              fixedTime: 10ms
        - name: Mock 50 millisecond business processing delay response
          match:
            parameters:
              - name: delay
                in: query
                condition: EQUAL
                expected: 50
            priority: 1000
          content:
            status: 200
            content: '{
                          "code": "S",
                          "msg": "Respond with a delay of 50 millisecond."
                      }'
            delay:
              mode: NONE
        - name: Mock 100 millisecond business processing delay response
          match:
            parameters:
              - name: delay
                in: query
                condition: EQUAL
                expected: 100
            priority: 1000
          content:
            status: 200
            content: '{
                          "code": "S",
                          "msg": "Respond with a delay of 100 millisecond."
                      }'
            delay:
              mode: NONE
        - name: Mock 200 millisecond business processing delay response
          match:
            parameters:
              - name: delay
                in: query
                condition: EQUAL
                expected: 200
            priority: 1000
          content:
            status: 200
            content: '{
                          "code": "S",
                          "msg": "Respond with a delay of 200 millisecond."
                      }'
            delay:
              mode: NONE
        - name: Default response, returned when no matching conditions are met, with a random delay of 1-200 seconds
          match:
            priority: 1000
          content:
            status: 200
            content: '{
                          "code": "S",
                          "msg": "Respond with a delay of 1-200 millisecond."
                      }'
            delay:
              mode: RANDOM
              minRandomTime: 1ms
              maxRandomTime: 200ms
```

调用结果：

```bash
> curl -i http://serv01-sample.angusmock.cloud:30010/business?delay=1
HTTP/1.1 200 OK
XC-Mock-ServiceId: 203883811233071109
XC-Mock-RequestId: af0248e5-6c9c-46b2-a1fe-43e5d1b9a3e1
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
content-length: 72

{
    "code": "S",
    "msg": "Respond with a delay of 1 millisecond."
}
```

- 模拟用户登录接口

```yaml
specification: angus/1.0.0
type: MOCK_APIS
task:
  mockApis:
    - name: User login apis
      description: Mock user login business processing api. When the user enters the account and password as admin, it returns login success; otherwise, it returns login failure.
      method: POST
      endpoint: /user/signin
      responses:
        - name: Return success when the user enters the correct account and password
          match:
            parameters:
              - name: Content-Type
                in: header
                condition: EQUAL
                expected: application/json
            body:
              condition: EQUAL
              expected: '{
                             "username": "admin",
                             "password": "admin"
                         }'
            priority: 1000
          content:
            status: 200
            headers:
              - name: Content-Type
                value: application/json
            content: '{
                          "code": "S",
                          "msg": "Success",
                          "data": {
                              "access_token": "181622ea2a1f4934ad6bec0308390da9",
                              "expires_in": "3599",
                              "token_type": "bearer"
                          }
                      }'
            delay:
              mode: NONE
        - name: Return failure when the user enters an incorrect account or password
          match:
            priority: 1000
          content:
            status: 400
            headers:
              - name: Content-Type
                value: application/json
            content: '{
                         "code": "E0",
                         "msg": "Login account or password error"
                     }'
```

调用结果：

```bash
> curl -i -X POST http://serv01-sample.angusmock.cloud:30010/user/signin -d '{"username":"admin", "password":"admin"}' -H 'Content-Type: application/json'
HTTP/1.1 200 OK
XC-Mock-ServiceId: 203883811233071109
XC-Mock-RequestId: cdc7295d-dfc3-47c5-b776-0a0c32151c93
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
Content-Type: application/json
content-length: 186

{
    "code": "S",
    "msg": "Success",
    "data": {
         "access_token": "181622ea2a1f4934ad6bec0308390da9",
         "expires_in": "3599",
         "token_type": "bearer"
    }
}
```

- 模拟用户注册接口

```yaml
specification: angus/1.0.0
type: MOCK_APIS
task:
  mockApis:
    - name: User registration api
      description: Mock the user registration process api. Return success when the user provides an account and password, otherwise return failure.
      method: POST
      endpoint: /user/signup
      responses:
        - name: Return success when the user enters the valid account and password
          match:
            parameters:
              - name: Content-Type
                in: header
                condition: EQUAL
                expected: application/json
            body:
              condition: REG_MATCH
              expression: (?=.*\busername\b)(?=.*\bpassword\b).*
            priority: 1000
          content:
            status: 200
            headers:
              - name: Content-Type
                value: application/json
            content: '{
                          "code": "S",
                          "msg": "Success"
                      }'
            delay:
              mode: NONE
        - name: Return failure when the user enters the valid account and password
          match:
            priority: 1000
          content:
            status: 400
            headers:
              - name: Content-Type
                value: application/json
            content: '{
                          "code": "E0",
                          "msg": "Username and password are required"
                      }'
```

调用结果：

```bash
> curl -i -X POST http://serv01-sample.angusmock.cloud:30010/user/signup -d '{"username":"admin", "password":"admin"}' -H 'Content-Type: application/json'
HTTP/1.1 200 OK
XC-Mock-ServiceId: 203883811233071109
XC-Mock-RequestId: 301662be-a147-4081-a6b8-26f5c1c48e64
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
Content-Type: application/json
content-length: 41

{
    "code": "S",
    "msg": "Success"
}
```

- 模拟查询用户信息接口

```yaml
specification: angus/1.0.0
type: MOCK_APIS
task:
  mockApis:
    - name: Query user api
      description: Mock the api for querying user information. How to return user information when querying admin, otherwise return 404
      method: GET
      endpoint: "/user/{username}"
      responses:
        - name: Return admin user information when querying username as `admin`
          match:
            path:
              condition: EQUAL
              expected: /user/admin
            priority: 1000
          content:
            status: 200
            content: '{
                           "username": "admin",
                           "age": 18,
                           "hobbies": "swimming, playing basketball",
                           "avatar": "http://serv01-sample.angusmock.cloud:30010/user/admin/avatar.png"
                       }'
            delay:
              mode: NONE
        - name: Default response, does return 404 when is not querying admin user
          match:
            priority: 1000
          content:
            status: 404
            delay:
              mode: NONE
```

调用结果：

```bash
> curl -i http://serv01-sample.angusmock.cloud:30010/user/admin
HTTP/1.1 200 OK
XC-Mock-ServiceId: 203883811233071109
XC-Mock-RequestId: 1f25a79a-6829-43a5-b787-0ab13bf651c5
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
content-length: 167

{
    "username": "admin",
    "age": 18,
    "hobbies": "swimming, playing basketball",
    "avatar": "http://serv01-sample.angusmock.cloud:30010/user/admin/avatar.png"
}
```

- 模拟下载用户头像接口

```yaml
specification: angus/1.0.0
type: MOCK_APIS
task:
  mockApis:
    - name: Download user avatar api
      description: Mock file download example.
      method: GET
      endpoint: "/user/{username}/avatar.png"
      responses:
        - name: Respond to a binary file in PNG format
          match:
            path:
              condition: CONTAIN
              expected: admin
            priority: 1000
          content:
            status: 200
            headers:
              - name: Content-Type
                value: image/jpeg
            contentEncoding: gzip_base64
            content: <File binary gzip_base64 content>
```

调用结果：

```bash
> curl -O http://serv01-sample.angusmock.cloud:30010/user/admin/avatar.png
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  180k  100  180k    0     0   320k      0 --:--:-- --:--:-- --:--:--  320k

> ls -al
-rw-r--r--   1 root root 184754 Jan 12 19:01 avatar.png
```
