# 测试示例

以下是AngusTester提供的各个协议测试脚本示例。

## Http协议

- Http功能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Http functionality testing
  description: This is an example of http functionality testing orchestration.
type: TEST_FUNCTIONALITY
plugin: Http
configuration:
  iterations: 10
  thread:
    threads: 1
  priority: 1000
task:
  arguments:
    httpSetting:
      connectTimeout: 6s
      readTimeout: 60s
      retryNum: 0
      maxRedirects: 1
    ignoreAssertions: false
  pipelines:
  - target: HTTP
    name: Case01
    description: Test logging in with the correct username and password.
    enabled: true
    request:
      method: POST
      url: http://serv01-sample.angusmock.cloud:30010/user/signin
      parameters:
      - name: Content-Type
        in: header
        description: Content-Type is used to determine the request content
        enabled: true
        type: string
        value: application/json
      body:
        rawContent: "{\n    \"username\":\"admin\",\n    \"password\":\"admin\"\n}"
    assertions:
    - name: Assert that the HTTP status code is `200`
      enabled: true
      type: STATUS
      assertionCondition: EQUAL
      expected: 200
    - name: Assert the business code is `S`
      enabled: true
      type: BODY
      assertionCondition: JSON_PATH_MATCH
      expression: $..code
      expected: S
  - target: HTTP
    name: Case02
    description: "Test logging in with incorrect username and password, and returning\
      \ a login failure message."
    enabled: true
    beforeName: Case01
    request:
      method: POST
      url: http://serv01-sample.angusmock.cloud:30010/user/signin
    assertions:
    - name: Assert the business code is `E0`
      enabled: true
      type: BODY
      assertionCondition: JSON_PATH_MATCH
      expression: $..code
      expected: E0
    - name: Assert the failure message is `Login account or password error`
      enabled: true
      type: BODY
      assertionCondition: JSON_PATH_MATCH
      expression: $..msg
      expected: Login account or password error
```

- Http性能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Http performance testing
  description: This is an example of http performance testing orchestration
type: TEST_PERFORMANCE
plugin: Http
configuration:
  duration: 50min
  thread:
    threads: 5000
    rampUpInterval: 1min
    rampUpThreads: 100
  onError:
    action: CONTINUE
    sampleError: true
    sampleErrorNum: 20
  priority: 1000
task:
  arguments:
    ignoreAssertions: true
    httpSetting:
      connectTimeout: 6s
      readTimeout: 60s
      retryNum: 0
      maxRedirects: 1
  pipelines:
  - target: TRANS_START
    name: BusinessTransaction
    description: Business processing start transaction
    enabled: true
  - target: HTTP
    name: UserSignup
    description: User signup a system account
    enabled: true
    beforeName: BusinessTransaction
    transactionName: BusinessTransaction
    request:
      method: POST
      url: http://serv01-sample.angusmock.cloud:30010/user/signup
      parameters:
      - name: Content-Type
        in: header
        enabled: true
        type: string
        value: application/json
      body:
        rawContent: "{\"username\": \"admin\", \"password\": \"admin\"}"
    assertions:
    - name: Assert the HTTP status code is `200`
      enabled: true
      type: STATUS
      assertionCondition: EQUAL
      expected: 200
  - target: WAITING_TIME
    name: WaitingForEnter
    description: Wait for 10 seconds for the user to enter account and password
    enabled: true
    beforeName: UserSignup
    transactionName: BusinessTransaction
    maxWaitTimeInMs: 10000
  - target: HTTP
    name: UserSignIn
    description: User sign-in system
    enabled: true
    beforeName: WaitingForEnter
    transactionName: BusinessTransaction
    request:
      method: POST
      url: http://serv01-sample.angusmock.cloud:30010/user/signin
      parameters:
      - name: Content-Type
        in: header
        enabled: true
        type: string
        value: application/json
      body:
        rawContent: "{\n    \"username\":\"admin\",\n    \"password\":\"admin\"\n}"
    assertions:
    - name: Assert the HTTP status code is `200`
      enabled: true
      type: STATUS
      assertionCondition: EQUAL
      expected: 200
  - target: TRANS_END
    name: EndTransaction
    description: Business processing end transaction
    enabled: true
    beforeName: UserSignIn
    transactionName: BusinessTransaction
  - target: RENDEZVOUS
    name: Business1Rendezvous
    description: "Ensure a minimum of 50 user accesses to the business each time,\
      \ allow the current visiting user to proceed if 50 users cannot be gathered\
      \ within a timeout period of 100 milliseconds"
    enabled: true
    beforeName: EndTransaction
    threads: 100
    timeoutInMs: 100
  - target: HTTP
    name: UserBusiness1
    description: User access to Business 1
    enabled: true
    beforeName: Business1Rendezvous
    request:
      method: GET
      url: http://serv01-sample.angusmock.cloud:30010/business
    assertions:
    - name: Assert the HTTP status code is `200`
      enabled: true
      type: STATUS
      assertionCondition: EQUAL
      expected: 200
    - name: Assert the business code is `S`
      enabled: true
      type: BODY
      assertionCondition: JSON_PATH_MATCH
      expression: $..code
      expected: S
  - target: THROUGHPUT
    name: Business2RateLimiter
    description: Limit the maximum number of accesses to Business 2 per second
    enabled: true
    beforeName: UserBusiness1
    permitsPerSecond: 50
    timeoutInMs: 100
  - target: HTTP
    name: UserBusiness2
    description: User access to Business 2
    enabled: true
    beforeName: Business2RateLimiter
    request:
      method: GET
      url: http://serv01-sample.angusmock.cloud:30010/business
    assertions:
    - name: Assert the HTTP status code is `200`
      enabled: true
      type: STATUS
      assertionCondition: EQUAL
      expected: 200
    - name: Assert the business code is `S`
      enabled: true
      type: BODY
      assertionCondition: JSON_PATH_MATCH
      expression: $..code
      expected: S
```

## WebSocket协议

- WebSocket功能测试示例

```yaml
specification: angus/1.0.0
info:
  name: WebSocket functionality testing
  description: This is an example of a WebSocket functionality testing orchestration.
type: TEST_FUNCTIONALITY
plugin: WebSocket
configuration:
  thread:
    threads: 1
  priority: 1000
  iterations: 10
task:
  arguments:
    ignoreAssertions: false
    webSocketSetting:
      connectTimeout: 6s
      responseTimeout: 60s
      maxReconnections: 0
      reconnectionInterval: 200ms
  pipelines:
    - target: WEBSOCKET
      name: The `ONLY_SEND` mode example
      description: Only send custom messages to the server.
      enabled: false
      url: ws://serv01-sample.angusmock.cloud:8082/example/ONLY_SEND
      parameters:
        - name: access_token
          in: query
          description: Authentication parameters when connecting to WebSocket.
          enabled: true
          type: string
          value: 17062ee76ea94bd28cf4eccc48a85f0e
      mode: ONLY_SEND
      message: Hi~
      rawTextMessage: true
    - target: WEBSOCKET
      name: The `ONLY_RECEIVE` mode example
      description: Only receiving messages from the server and asserting them.
      enabled: false
      url: ws://serv01-sample.angusmock.cloud:8082/example/ONLY_RECEIVE
      parameters:
        - name: access_token
          in: query
          description: Authentication parameters when connecting to WebSocket.
          enabled: true
          type: string
          value: 17062ee76ea94bd28cf4eccc48a85f0e
        - name: ServerMessage
          in: query
          description: This is the simulated test client's expectation for the message
            to be returned by the server.
          enabled: true
          type: string
          value: This is a `SUCCESS` message returned by the server.
        - name: ServerDelay
          in: query
          description: This is the simulated test client's expectation for the delay(milliseconds)
            in the message returned by the server.
          enabled: true
          type: string
          value: 20-200
      mode: ONLY_RECEIVE
      assertions:
        - name: Assert that the received content includes SUCCESS.
          enabled: true
          type: BODY
          assertionCondition: CONTAIN
          expected: SUCCESS
        - name: Assert that the length of the received content does not exceed 1 KB.
          enabled: true
          type: SIZE
          assertionCondition: LESS_THAN
          expected: 1024
        - name: Assert that the time interval for receiving the latest message does not
            exceed 200 milliseconds.
          enabled: true
          type: DURATION
          assertionCondition: LESS_THAN
          expected: 200
      rawTextMessage: true
    - target: WEBSOCKET
      name: The `SEND_AND_RECEIVE` mode example
      description: "The client and server simultaneously remoting messages with each\
      \ other, default Mode."
      enabled: true
      url: ws://serv01-sample.angusmock.cloud:8082/example/SEND_AND_RECEIVE
      parameters:
        - name: access_token
          in: query
          description: Authentication parameters when connecting to WebSocket.
          enabled: true
          type: string
          value: 17062ee76ea94bd28cf4eccc48a85f0e
        - name: ServerMessage
          in: query
          description: This is the simulated test client's expectation for the message
            to be returned by the server.
          enabled: true
          type: string
          value: Hi~
      mode: SEND_AND_RECEIVE
      message: Hi~
      assertions:
        - name: Assert that the received content includes SUCCESS.
          enabled: true
          type: BODY
          assertionCondition: CONTAIN
          expected: SUCCESS
      rawTextMessage: true
```

- WebSocket性能测试示例

```yaml
specification: angus/1.0.0
info:
  name: WebSocket performance testing
  description: This is an example of a WebSocket performance testing orchestration.
type: TEST_PERFORMANCE
plugin: WebSocket
configuration:
  duration: 50min
  thread:
    threads: 5000
    rampUpInterval: 1min
    rampUpThreads: 10
  priority: 1000
task:
  arguments:
    ignoreAssertions: true
    webSocketSetting:
      connectTimeout: 6s
      responseTimeout: 60s
      maxReconnections: 0
      reconnectionInterval: 200ms
  pipelines:
    - target: WEBSOCKET
      name: The `ONLY_SEND` mode example
      description: Only send custom messages to the server.
      enabled: false
      url: ws://serv01-sample.angusmock.cloud:8082/example/ONLY_SEND
      parameters:
        - name: access_token
          in: query
          description: Authentication parameters when connecting to WebSocket.
          enabled: true
          type: string
          value: 17062ee76ea94bd28cf4eccc48a85f0e
      mode: ONLY_SEND
      message: Hi~
      rawTextMessage: true
    - target: WEBSOCKET
      name: The `ONLY_RECEIVE` mode example
      description: Only receiving messages from the server and asserting them.
      enabled: true
      url: ws://serv01-sample.angusmock.cloud:8082/example/ONLY_RECEIVE
      parameters:
        - name: access_token
          in: query
          description: Authentication parameters when connecting to WebSocket.
          enabled: true
          type: string
          value: 17062ee76ea94bd28cf4eccc48a85f0e
        - name: ServerMessage
          in: query
          description: This is the simulated test client's expectation for the message
            to be returned by the server.
          enabled: true
          type: string
          value: This is a `SUCCESS` message returned by the server.
        - name: ServerDelay
          in: query
          description: This is the simulated test client's expectation for the delay(milliseconds)
            in the message returned by the server.
          enabled: true
          type: string
          value: 20-200
      mode: ONLY_RECEIVE
      assertions:
        - name: Assert that the received content includes SUCCESS.
          enabled: true
          type: BODY
          assertionCondition: CONTAIN
          expected: SUCCESS
        - name: Assert that the length of the received content does not exceed 1 KB.
          enabled: true
          type: SIZE
          assertionCondition: LESS_THAN
          expected: 1024
        - name: Assert that the time interval for receiving the latest message does not
            exceed 200 milliseconds.
          enabled: true
          type: DURATION
          assertionCondition: EQUAL
          expected: 200
      rawTextMessage: true
    - target: WEBSOCKET
      name: The `SEND_AND_RECEIVE` mode example
      description: "The client and server simultaneously remoting messages with each\
      \ other, default Mode."
      enabled: false
      url: ws://serv01-sample.angusmock.cloud:8082/example/SEND_AND_RECEIVE
      parameters:
        - name: access_token
          in: query
          description: Authentication parameters when connecting to WebSocket.
          enabled: true
          type: string
          value: 17062ee76ea94bd28cf4eccc48a85f0e
        - name: ServerMessage
          in: query
          description: This is the simulated test client's expectation for the message
            to be returned by the server.
          enabled: true
          type: string
          value: Hi~
      mode: SEND_AND_RECEIVE
      message: Hi~
      assertions:
        - name: Assert that the received content includes SUCCESS.
          enabled: true
          type: BODY
          assertionCondition: CONTAIN
          expected: SUCCESS
      rawTextMessage: true
```

## Jdbc协议

- Jdbc功能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Jdbc functionality testing
  description: This is an example of jdbc functionality testing orchestration.
type: TEST_FUNCTIONALITY
plugin: Jdbc
configuration:
  thread:
    threads: 1
  priority: 1000
task:
  arguments:
    jdbcSetting:
      type: MYSQL
      driverClassName: com.mysql.cj.jdbc.Driver
      jdbcUrl: jdbc:mysql://mysql01-sample.angusmock.cloud:3306/xcan_mockdata_sample
      username: sample
      password: 123456
      isolation: TRANSACTION_REPEATABLE_READ
      pool:
        name: hikari
        maximumPoolSize: 32
        minimumIdle: 10
        maxWaitTimeoutMillis: 60000
    ignoreAssertions: false
  pipelines:
    - target: JDBC
      name: QueryUserEmpty
      description: Query user by select statement
      enabled: true
      type: SELECT
      sql: SELECT * FROM `user` WHERE username = 'JohnDoe'
      maxResultRows: 1
      timeoutInSecond: 60
      assertions:
        - name: Assert that the query result is empty.
          enabled: true
          type: BODY
          assertionCondition: IS_EMPTY
    - target: JDBC
      name: InsertUser
      description: Save user by insert statement
      enabled: true
      beforeName: QueryUserEmpty
      type: UPDATE
      sql: "INSERT INTO `user` (username, password) VALUES ('JohnDoe', '@String(32)')"
      timeoutInSecond: 60
      assertions:
        - name: Assert that affected rows is 1.
          enabled: true
          type: BODY
          assertionCondition: EQUAL
          expected: 1
    - target: JDBC
      name: UpdateUser
      description: "Modify user by prepared update statement, it is equivalent to static\
      \ statement \"UPDATE `user` SET password = 'password123' WHERE username = 'JohnDoe'\""
      enabled: true
      beforeName: InsertUser
      type: PREPARED_UPDATE
      sql: UPDATE `user` SET password = ? WHERE username = ?
      timeoutInSecond: 60
      arguments:
        - type: varchar
          value: password123
          inout: IN
        - type: varchar
          value: JohnDoe
          inout: IN
      assertions:
        - name: Assert that affected rows is 1.
          enabled: true
          type: BODY
          assertionCondition: EQUAL
          expected: 1
    - target: JDBC
      name: QueryUser
      description: Query user by select statement
      enabled: true
      beforeName: UpdateUser
      type: SELECT
      sql: SELECT * FROM `user` WHERE username = 'JohnDoe'
      maxResultRows: 1
      timeoutInSecond: 60
      assertions:
        - name: Assert that the query result includes JohnDoe.
          enabled: true
          type: BODY
          assertionCondition: CONTAIN
          expected: JohnDoe
        - name: Assert that the query SQL response time does not exceed 100 milliseconds.
          enabled: true
          type: DURATION
          assertionCondition: LESS_THAN
          expected: 100
    - target: JDBC
      name: DeleteUser
      description: Delete user by delete statement
      enabled: true
      beforeName: QueryUser
      type: UPDATE
      sql: DELETE FROM `user` WHERE username = 'JohnDoe'
      timeoutInSecond: 60
      assertions:
        - name: Assert that affected rows is 1.
          enabled: true
          type: BODY
          assertionCondition: GREATER_THAN_EQUAL
          expected: 1
```

- Jdbc性能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Jdbc performance testing
  description: This is an example of jdbc performance testing orchestration.
type: TEST_PERFORMANCE
plugin: Jdbc
configuration:
  duration: 50min
  thread:
    threads: 5000
    rampUpInterval: 1min
    rampUpThreads: 100
  priority: 1000
  variables:
    - name: username
      enabled: true
      description: An example of execution configuration variables
      value: '@Uuid()'
task:
  arguments:
    ignoreAssertions: true
    jdbcSetting:
      type: MYSQL
      driverClassName: com.mysql.cj.jdbc.Driver
      jdbcUrl: jdbc:mysql://mysql01-sample.angusmock.cloud:3306/xcan_mockdata_sample
      username: sample
      password: 123456
      isolation: TRANSACTION_REPEATABLE_READ
      pool:
        name: hikari
        maximumPoolSize: 32
        minimumIdle: 10
        maxWaitTimeoutMillis: 60000
  pipelines:
    - target: TRANS_START
      name: BusinessTransaction
      description: Create user starts transaction
      enabled: true
    - target: JDBC
      name: InsertUser
      description: Save user by insert statement
      enabled: true
      beforeName: BusinessTransaction
      transactionName: BusinessTransaction
      type: UPDATE
      sql: "INSERT INTO `user` (username, password) VALUES ('{username}', '@String(32)')"
      timeoutInSecond: 60
      variables:
        - name: username
          enabled: true
          description: An example of global configuration variables
          scope: GLOBAL
          source: APIS
          value: '@String(3)'
    - target: WAITING_TIME
      name: ThinkTime
      description: Waiting 1 - 10 ms
      enabled: true
      beforeName: InsertUser
      transactionName: BusinessTransaction
      minWaitTimeInMs: 1
      maxWaitTimeInMs: 10
    - target: JDBC
      name: UpdateUser
      description: "Modify user by prepared update statement, it is equivalent to static\
      \ statement \"UPDATE `user` SET password = 'password123' WHERE username = 'JohnDoe'\""
      enabled: true
      beforeName: ThinkTime
      transactionName: BusinessTransaction
      type: PREPARED_UPDATE
      sql: UPDATE `user` SET password = ? WHERE username = ?
      timeoutInSecond: 60
      arguments:
        - type: varchar
          value: password123
          inout: IN
        - type: varchar
          value: "{username}"
          inout: IN
      assertions:
        - name: Assert that affected rows is 1.
          enabled: true
          type: BODY
          assertionCondition: EQUAL
          expected: 1
    - target: TRANS_END
      name: EndTransaction
      enabled: true
      beforeName: UpdateUser
      transactionName: BusinessTransaction
    - target: JDBC
      name: QueryUser
      description: Query user by select statement
      enabled: true
      beforeName: EndTransaction
      type: SELECT
      sql: "SELECT * FROM `user` WHERE username = '{username}'"
      maxResultRows: 1
      timeoutInSecond: 60
      assertions:
        - name: Assert that the query result includes `JohnDoe`.
          enabled: true
          type: BODY
          assertionCondition: CONTAIN
          expected: "{username}"
        - name: Assert that the query SQL response time does not exceed `100` milliseconds.
          enabled: true
          type: DURATION
          assertionCondition: LESS_THAN
          expected: 100
    - target: JDBC
      name: DeleteUser
      description: Delete user by delete statement
      enabled: true
      beforeName: QueryUser
      type: UPDATE
      sql: "DELETE FROM `user` WHERE username = '{username}'"
      timeoutInSecond: 60
```

## Ftp协议

- Ftp功能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Ftp functionality testing
  description: This is an example of Ftp functionality testing orchestration.
type: TEST_FUNCTIONALITY
plugin: Ftp
configuration:
  thread:
    threads: 1
  priority: 1000
task:
  pipelines:
    - target: FTP
      name: UploadFromLocalFile
      description: Upload file from local file
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 8084
        username: admin
        password: 123456
      uploadFile: false
      uploadFileSource: LOCAL_FILE
      remoteFileName: remote.txt
      localFileName: local.txt
      localFileContent: This is a text file content
    - target: FTP
      name: UploadAndEncodingFromLocalFile
      description: Upload and encode file from local file
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 8084
        username: admin
        password: 123456
      uploadFile: true
      uploadFileSource: LOCAL_FILE
      remoteFileName: remote2.txt
      localFileName: local2.txt
      localFileContent: VGhpcyBpcyBhIHRleHQgZmlsZSBjb250ZW50
      localFileContentEncoding: base64
      binaryMode: false
    - target: FTP
      name: UploadFromRemoteFtpFile
      description: Download a file from the Ftp server and then upload it
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 8084
        username: admin
        password: 123456
      uploadFile: true
      uploadFileSource: REMOTE_FILE
      remoteFileName: remote.txt
    - target: FTP
      name: UploadFromRemoteUrl
      description: Download a file from the Ftp server and then upload it
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 8084
        username: admin
        password: 123456
      uploadFile: true
      uploadFileSource: REMOTE_URL
      remoteFileUrl: https://pics6.baidu.com/feed/d50735fae6cd7b897fbfd8ad27e746a9d8330e1a.jpeg
    - target: FTP
      name: RetrieveFile
      description: Retrieve file from remote Ftp server
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 8084
        username: admin
        password: 123456
      uploadFile: false
      remoteFileName: remote.txt
    - target: FTP
      name: RetrieveAndRenameFile
      description: "Retrieve file from remote Ftp server and save it. Note: By default,\
      \ it is saved in the execution data directory."
      enabled: true
      server:
        server: serv01-sample.angusmock.cloud
        port: 8084
        username: admin
        password: 123456
      uploadFile: false
      remoteFileName: remote.txt
      localFileName: new_file.txt
```

- Ftp性能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Ftp performance testing
  description: This is an example of Ftp performance testing orchestration.
type: TEST_PERFORMANCE
plugin: Ftp
configuration:
  duration: 50min
  thread:
    threads: 500
    rampUpInterval: 1min
    rampUpThreads: 20
  priority: 1000
task:
  pipelines:
    - target: FTP
      name: UploadFromLocalFile
      description: Upload file from local file
      enabled: true
      server:
        server: serv01-sample.angusmock.cloud
        port: 8084
        username: admin
        password: 123456
      uploadFile: true
      uploadFileSource: LOCAL_FILE
      remoteFileName: remote.txt
      localFileName: local.txt
      localFileContent: This is a text file content
    - target: FTP
      name: UploadAndEncodingFromLocalFile
      description: Upload and encode file from local file
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 8084
        username: admin
        password: 123456
      uploadFile: true
      uploadFileSource: LOCAL_FILE
      remoteFileName: remote.txt
      localFileName: local.txt
      localFileContent: VGhpcyBpcyBhIHRleHQgZmlsZSBjb250ZW50
      localFileContentEncoding: base64
      binaryMode: false
    - target: FTP
      name: UploadFromRemoteFtpFile
      description: Download a file from the Ftp server and then upload it
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 8084
        username: admin
        password: 123456
      uploadFile: true
      uploadFileSource: REMOTE_FILE
      remoteFileName: remote.txt
    - target: FTP
      name: UploadFromRemoteUrl
      description: Download a file from the Ftp server and then upload it
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 8084
        username: admin
        password: 123456
      uploadFile: true
      uploadFileSource: REMOTE_URL
      remoteFileUrl: https://pics6.baidu.com/feed/d50735fae6cd7b897fbfd8ad27e746a9d8330e1a.jpeg
    - target: FTP
      name: RetrieveFile
      description: Retrieve file from remote Ftp server
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 8084
        username: admin
        password: 123456
      uploadFile: false
      remoteFileName: remote.txt
    - target: FTP
      name: RetrieveAndRenameFile
      description: "Retrieve file from remote Ftp server and save it. Note: By default,\
      \ it is saved in the execution data directory."
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 8084
        username: admin
        password: 123456
      uploadFile: false
      remoteFileName: remote.txt
      localFileName: new_file.txt
```

## Ldap协议

- Ldap功能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Ldap functionality testing
  description: This is an example of Ldap functionality testing orchestration.
type: TEST_FUNCTIONALITY
plugin: Ldap
configuration:
  thread:
    threads: 1
  priority: 1000
task:
  pipelines:
    - target: LDAP
      name: Add entry
      description: Add person entry
      enabled: true
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: ADD
    - target: LDAP
      name: Add customized entry
      description: Add user defined person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: ADD
      userDefined: true
      entryDn: cn=TestUser
      arguments:
        givenname: User
        sn: Test
        cn: TestUser
        uid: user
        userpassword: passd
    - target: LDAP
      name: Modify entry
      description: Modify person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: MODIFY
    - target: LDAP
      name: Modify customized entry
      description: Modify user defined person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: MODIFY
      userDefined: true
      entryDn: cn=TestUser
      arguments:
        mobile: 18910691700
        userpassword: passd2
    - target: LDAP
      name: Search entry
      description: Search person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: SEARCH
    - target: LDAP
      name: Search customized entry
      description: Search user defined person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: SEARCH
      userDefined: true
      searchBase: cn=TestUser
      searchFilter: cn=TestUser
    - target: LDAP
      name: Delete entry
      description: Delete person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: DELETE
    - target: LDAP
      name: Delete customized entry
      description: Delete user defined person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: DELETE
      userDefined: true
      deleteEntry: cn=TestUser
```

- Ldap性能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Ldap performance testing
  description: This is an example of Ldap performance testing orchestration.
type: TEST_PERFORMANCE
plugin: Ldap
configuration:
  duration: 50min
  thread:
    threads: 500
    rampUpInterval: 1min
    rampUpThreads: 20
  priority: 1000
task:
  pipelines:
    - target: LDAP
      name: Add entry
      description: Add person entry
      enabled: true
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: ADD
    - target: LDAP
      name: Add customized entry
      description: Add user defined person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: ADD
      userDefined: true
      entryDn: cn=TestUser
      arguments:
        givenname: User
        sn: Test
        cn: TestUser
        uid: user
        userpassword: passd
    - target: LDAP
      name: Modify entry
      description: Modify person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: MODIFY
    - target: LDAP
      name: Modify customized entry
      description: Modify user defined person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: MODIFY
      userDefined: true
      entryDn: cn=TestUser
      arguments:
        mobile: 18910691700
        userpassword: passd2
    - target: LDAP
      name: Search entry
      description: Search person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: SEARCH
    - target: LDAP
      name: Search customized entry
      description: Search user defined person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: SEARCH
      userDefined: true
      searchBase: cn=TestUser
      searchFilter: cn=TestUser
    - target: LDAP
      name: Delete entry
      description: Delete person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: DELETE
    - target: LDAP
      name: Delete customized entry
      description: Delete user defined person entry
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 389
        username: "cn=admin,dc=serv01-sample,dc=angusmock,dc=cloud"
        password: xcan@demo123
        rootDn: "dc=serv01-sample,dc=angusmock,dc=cloud"
      testType: DELETE
      userDefined: true
      deleteEntry: cn=TestUser
```

## Mail协议

- Mail功能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Mail(IMAP/POP3) functionality testing
  description: This is an example of Mail(IMAP/POP3) functionality testing orchestration.
type: TEST_FUNCTIONALITY
plugin: Mail
configuration:
  thread:
    threads: 1
  priority: 1000
task:
  pipelines:
    - target: MAIL
      name: Get mail messages (IMAP)
      description: Using IMAP protocol to obtain emails
      enabled: true
      protocol: IMAP
      server:
        server: 192.168.0.211
        port: 993
        security:
          use: USE_START_TLS
          trustAllCerts: true
        useAuth: true
        username: test001@xcan.cloud
        password: test001@xcan
        readTimeout: 60s
        connectTimeout: 6s
      mail:
        folder: INBOX
        deleteMessage: false
        storeMimeMessage: true
        numMessages: 1
    - target: MAIL
      name: Get mail messages (POP3)
      description: Using POP3 protocol to obtain emails
      enabled: false
      protocol: POP3
      server:
        server: 192.168.0.211
        port: 995
        security:
          use: USE_START_TLS
          trustAllCerts: true
        useAuth: true
        username: test001@xcan.cloud
        password: test001@xcan
        readTimeout: 60s
        connectTimeout: 6s
      mail:
        folder: INBOX
        deleteMessage: false
        storeMimeMessage: true
        numMessages: 1
```

- Mail性能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Mail(IMAP/POP3) performance testing
  description: This is an example of Mail(IMAP/POP3) performance testing orchestration.
type: TEST_PERFORMANCE
plugin: Mail
configuration:
  duration: 50min
  thread:
    threads: 500
    rampUpInterval: 30s
    rampUpThreads: 1
  priority: 1000
task:
  pipelines:
    - target: MAIL
      name: Get mail messages (IMAP)
      description: Using IMAP protocol to obtain emails
      enabled: true
      protocol: IMAP
      server:
        server: 192.168.0.211
        port: 993
        security:
          use: USE_START_TLS
          trustAllCerts: true
        useAuth: true
        username: test001@xcan.cloud
        password: test001@xcan
        readTimeout: 60s
        connectTimeout: 6s
      mail:
        folder: INBOX
        deleteMessage: false
        storeMimeMessage: false
        numMessages: 1
    - target: MAIL
      name: Get mail messages (POP3)
      description: Using POP3 protocol to obtain emails
      enabled: false
      protocol: POP3
      server:
        server: 192.168.0.211
        port: 995
        security:
          use: USE_START_TLS
          trustAllCerts: true
        useAuth: true
        username: test001@xcan.cloud
        password: test001@xcan
        readTimeout: 60s
        connectTimeout: 6s
      mail:
        folder: INBOX
        deleteMessage: false
        storeMimeMessage: true
        numMessages: 1
```

## Smtp协议

- Smtp功能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Smtp functionality testing
  description: This is an example of Smtp functionality testing orchestration.
type: TEST_FUNCTIONALITY
plugin: Smtp
configuration:
  thread:
    threads: 1
  priority: 1000
task:
  pipelines:
    - target: SMTP
      name: Send mail plain message (SMTP)
      description: Using SMTP protocol to send plain message email
      enabled: false
      server:
        server: 192.168.0.211
        port: 465
        security:
          use: USE_SSL
          trustAllCerts: true
          enforceStartTLS: false
          useLocalTrustStore: false
        useAuth: true
        username: test001@xcan.cloud
        password: test001@xcan
        readTimeout: 60s
        connectTimeout: 6s
      mail:
        mailFrom: test002@xcan.cloud
        receiverTo: test001@xcan.cloud
        content:
          subject: The subject of the email
          suppressSubject: false
          message: The main content or body of the email.
          plainBody: true
          messageSizeStatistics: true
          enableDebugLogging: true
    - target: SMTP
      name: Send mail local attachments message (SMTP)
      description: Using SMTP protocol to send local attachments message email
      enabled: false
      server:
        server: 192.168.0.211
        port: 465
        security:
          use: USE_SSL
          trustAllCerts: true
          enforceStartTLS: false
          useLocalTrustStore: false
        useAuth: true
        username: test001@xcan.cloud
        password: test001@xcan
        readTimeout: 60s
        connectTimeout: 6s
      mail:
        mailFrom: test002@xcan.cloud
        receiverTo: test001@xcan.cloud
        content:
          subject: The subject of the email
          suppressSubject: false
          message: The main content or body of the email.
          plainBody: true
          includeTimestamp: true
          messageSizeStatistics: true
          localAttachFiles:
            - /data/attach1.txt
            - /data/attach2.txt
          localAttachBase64Contents:
            attach1.txt: VGhpcyBpcyBhIGF0dGFjaG1lbnQxIGNvbnRlbnQ=
            attach2.txt: VGhpcyBpcyBhIGF0dGFjaG1lbnQyIGNvbnRlbnQ=
          enableDebugLogging: true
    - target: SMTP
      name: Send mail eml file message (SMTP)
      description: Using SMTP protocol to send eml file message email
      enabled: true
      server:
        server: 192.168.0.211
        port: 465
        security:
          use: USE_SSL
          trustAllCerts: true
          enforceStartTLS: false
          useLocalTrustStore: false
        useAuth: true
        username: test001@xcan.cloud
        password: test001@xcan
        readTimeout: 60s
        connectTimeout: 6s
      mail:
        mailFrom: test002@xcan.cloud
        receiverTo: test001@xcan.cloud
        content:
          subject: The subject of the email
          suppressSubject: false
          plainBody: false
          messageSizeStatistics: true
          sendEmlMessage: true
          localEmlMessageBase64Content: VGhpcyBpcyBhIGVtYWlsIGNvbnRlbnQ=
          enableDebugLogging: true
```

- Smtp性能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Smtp performance testing
  description: This is an example of Smtp performance testing orchestration.
type: TEST_PERFORMANCE
plugin: Smtp
configuration:
  duration: 50min
  thread:
    threads: 500
    rampUpInterval: 1min
    rampUpThreads: 20
  priority: 1000
task:
  pipelines:
    - target: SMTP
      name: Send mail plain message (SMTP)
      description: Using SMTP protocol to send plain message email
      enabled: true
      server:
        server: 192.168.0.211
        port: 465
        security:
          use: USE_SSL
          trustAllCerts: true
          enforceStartTLS: false
          useLocalTrustStore: false
        useAuth: true
        username: test001@xcan.cloud
        password: test001@xcan
        readTimeout: 60s
        connectTimeout: 6s
      mail:
        mailFrom: test002@xcan.cloud
        receiverTo: test001@xcan.cloud
        content:
          subject: The subject of the email
          suppressSubject: false
          message: The main content or body of the email.
          plainBody: true
          enableDebugLogging: false
    - target: SMTP
      name: Send mail local attachments message (SMTP)
      description: Using SMTP protocol to send local attachments message email
      enabled: false
      server:
        server: 192.168.0.211
        port: 465
        security:
          use: USE_SSL
          trustAllCerts: true
          enforceStartTLS: false
          useLocalTrustStore: false
        useAuth: true
        username: test001@xcan.cloud
        password: test001@xcan
        readTimeout: 60s
        connectTimeout: 6s
      mail:
        mailFrom: test002@xcan.cloud
        receiverTo: test001@xcan.cloud
        content:
          subject: The subject of the email
          suppressSubject: false
          message: The main content or body of the email.
          plainBody: true
          includeTimestamp: true
          localAttachFiles:
            - attach1.txt
            - attach2.txt
          localAttachBase64Contents:
            attach1.txt: VGhpcyBpcyBhIGF0dGFjaG1lbnQxIGNvbnRlbnQ=
            attach2.txt: VGhpcyBpcyBhIGF0dGFjaG1lbnQyIGNvbnRlbnQ=
          enableDebugLogging: false
    - target: SMTP
      name: Send mail eml file message (SMTP)
      description: Using SMTP protocol to send eml file message email
      enabled: false
      server:
        server: 192.168.0.211
        port: 465
        security:
          use: USE_SSL
          trustAllCerts: true
          enforceStartTLS: false
          useLocalTrustStore: false
        useAuth: true
        username: test001@xcan.cloud
        password: test001@xcan
        readTimeout: 60s
        connectTimeout: 6s
      mail:
        mailFrom: test002@xcan.cloud
        receiverTo: test001@xcan.cloud
        content:
          subject: The subject of the email
          suppressSubject: false
          plainBody: false
          sendEmlMessage: true
          localEmlMessageBase64Content: VGhpcyBpcyBhIGVtYWlsIGNvbnRlbnQ=
          enableDebugLogging: false
```

## Tcp协议

- Tcp功能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Tcp functionality testing
  description: This is an example of Tcp functionality testing orchestration.
type: TEST_FUNCTIONALITY
plugin: Tcp
configuration:
  thread:
    threads: 1
  priority: 1000
task:
  pipelines:
    - target: TCP
      name: Send tcp data using eol byte
      description: Send TCP data using the TcpClientImpl class implementation.
      enabled: true
      server:
        server: serv02-sample.angusmock.cloud
        port: 8083
        connectTimeout: 6s
        responseTimeout: 60s
      data: This is a tcp data content
      dataEncoding: none
      setting:
        tcpClientImplClass: TcpClientImpl
        reUseConnection: true
        closeConnection: false
        tcpNoDelay: true
        tcpCharset: UTF-8
        eolByte: 10
    - target: TCP
      name: Send tcp data using eom byte
      description: Send TCP data using the BinaryTcpClientImpl class implementation.
      enabled: false
      server:
        server: serv02-sample.angusmock.cloud
        port: 8083
        connectTimeout: 6s
        responseTimeout: 60s
      data: This is a tcp data content
      dataEncoding: none
      setting:
        tcpClientImplClass: BinaryTcpClientImpl
        reUseConnection: true
        closeConnection: false
        tcpNoDelay: true
        tcpCharset: UTF-8
        eomByte: 13
    - target: TCP
      name: Send tcp data using length prefixed
      description: Send TCP data using the LengthPrefixedBinaryTcpClientImpl class implementation.
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 8083
        connectTimeout: 6s
        responseTimeout: 60s
      data: This is a tcp data content
      dataEncoding: none
      setting:
        tcpClientImplClass: LengthPrefixedBinaryTcpClientImpl
        reUseConnection: true
        closeConnection: false
        tcpNoDelay: true
        tcpCharset: UTF-8
        binaryPrefixLength: 2
```

- Tcp性能测试示例

```yaml
specification: angus/1.0.0
info:
  name: Tcp performance testing
  description: This is an example of Tcp performance testing orchestration.
type: TEST_PERFORMANCE
plugin: Tcp
configuration:
  duration: 50min
  thread:
    threads: 500
    rampUpInterval: 1min
    rampUpThreads: 20
  priority: 1000
task:
  pipelines:
    - target: TCP
      name: Send tcp data using eol byte
      description: Send TCP data using the TcpClientImpl class implementation.
      enabled: true
      server:
        server: serv02-sample.angusmock.cloud
        port: 8083
        connectTimeout: 6s
        responseTimeout: 60s
      data: This is a tcp data content
      dataEncoding: none
      setting:
        tcpClientImplClass: TcpClientImpl
        reUseConnection: true
        closeConnection: false
        eolByte: 10
        tcpNoDelay: true
        tcpCharset: UTF-8
    - target: TCP
      name: Send tcp data using eom byte
      description: Send TCP data using the BinaryTcpClientImpl class implementation.
      enabled: false
      server:
        server: serv02-sample.angusmock.cloud
        port: 8083
        connectTimeout: 6s
        responseTimeout: 60s
      data: This is a tcp data content
      dataEncoding: none
      setting:
        tcpClientImplClass: BinaryTcpClientImpl
        reUseConnection: true
        closeConnection: false
        tcpNoDelay: true
        tcpCharset: UTF-8
        eomByte: 13
    - target: TCP
      name: Send tcp data using length prefixed binary
      description: Send TCP data using the LengthPrefixedBinaryTcpClientImpl class implementation.
      enabled: false
      server:
        server: serv01-sample.angusmock.cloud
        port: 8083
        connectTimeout: 6s
        responseTimeout: 60s
      data: This is a tcp data content
      dataEncoding: none
      setting:
        tcpClientImplClass: LengthPrefixedBinaryTcpClientImpl
        reUseConnection: true
        closeConnection: false
        tcpNoDelay: true
        tcpCharset: UTF-8
        binaryPrefixLength: 2
```
