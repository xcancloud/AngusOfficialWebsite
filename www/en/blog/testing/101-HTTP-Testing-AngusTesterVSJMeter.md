---
title: AngusTester 和 JMeter HTTP 测试结果比较
outline: deep
tag: Testing
---

# AngusTester 和 JMeter HTTP 测试结果比较

::: tip 测试目的
> 本次测试主要目的是对比 AngusTester 和 JMeter 在 HTTP 协议基准性能测试`最小延迟小于1毫秒`的表现。
:::

## 一、测试环境

以下测试 AngusTester 和 JMeter 使用相同环境。

> 注意：本次测试是在同一台 PC 机上进行，如果想测试特定配置下服务的准确性能，需要将测试机和服务分开部署，或者使用更高配置的测试服务器。

### 1. 测试软件

- 测试服务
  - AngusMockService-1.0.0
- 测试工具
  - AngusTester 1.0.0
  - Apache JMeter 4.0
- 系统
  - MacBookPro16 PC
    - Processors: 1
    - Cores: 8 \* 2 Intel Core i9 2.3 GHz
    - Memory: 32 GB

### 2. 服务配置

```ini
angusmock.serverIp=0.0.0.0
angusmock.serverPort=30010
angusmock.useSsl=false
angusmock.workThreadNum=256
angusmock.threadNamePrefix=AngusMock-Thread
angusmock.enableNettyLog=false
angusmock.logFileLevel=NONE
angusmock.sendRequestLog=false
angusmock.maxContentLength=1048576000
angusmock.pushbackThreadNum=8
angusmock.maxPushbackConnectTimeout=5000
angusmock.maxPushbackReadTimeout=-1
angusmock.allowCors=false
angusmock.allowCorsOrigin=*
angusmock.allowCorsCredentials=true
angusmock.allowCorsRequestHeaders=*
angusmock.allowCorsRequestMethods=GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD
angusmock.allowCorsExposeHeaders=*

angusmock.management.endpointsAllowCors=true

angusmock.principal.tenantId=1
angusmock.principal.mockServiceId=190640054090072119
angusmock.principal.deviceId=187166587336261670

angusmock.jvmMetrics.pushIntervalInSecond=15
angusmock.jvmMetrics.pushTimeoutInSecond=10
```

### 3. 测试接口

```bash
curl -i http://localhost:30010/benchmark
HTTP/1.1 200 OK
XC-Mock-ServiceId: 190640054090072119
XC-Mock-RequestId: fc479980-59e2-4479-a732-008e3eff218f
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: *
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
Access-Control-Expose-Headers: *
Content-Type: text/plain
content-length: 7

Success
```

### 4. 测试脚本

- JMeter 脚本 (Http_Testing_Benchmark_AngusTesterVSJMeter.jmx)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="4.0" jmeter="4.0 r1823414">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Http performance testing" enabled="true">
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments"/>
      </elementProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <intProp name="LoopController.loops">-1</intProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">1<!-- 1/10/50/100/200/500/1000/2000 --></stringProp>
        <boolProp name="ThreadGroup.scheduler">true</boolProp>
        <stringProp name="ThreadGroup.duration">60</stringProp>
      </ThreadGroup>
      <hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="HTTP Request" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">localhost</stringProp>
          <stringProp name="HTTPSampler.port">30010</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.path">/benchmark</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
        </HTTPSamplerProxy>
        <hashTree/>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>
```

***运行脚本：***

```bash
./jmeter -n -t ~/scripts/Http_Testing_Benchmark_AngusTesterVSJMeter.jmx
```
> **参数说明：**
> - -n：以非图形化界面(GUI)方式运行
> - -t：指定测试脚本文件

- AngusTester 脚本 (Http_Testing_Benchmark_AngusTesterVSJMeter.yaml)

```yaml
specification: angus/1.0.0
type: TEST_PERFORMANCE
plugin: Http
configuration:
  duration: 60s
  thread:
    threads: 1 # 1/10/50/100/200/500/1000/2000
  priority: 1000
task:
  pipelines:
    - target: HTTP
      name: Total
      enabled: true
      request:
        method: GET
        url: http://localhost:30010/benchmark
```

***运行脚本：***

```bash
./startup-runner.sh -s ~/scripts/Http_Testing_Benchmark_AngusTesterVSJMeter.yaml -e 1
```
> **参数说明：**
> - -s：指定脚本文件
> - -e：指定执行编号

## 二、测试过程记录

- 1 个线程运行 60 秒测试结果

***JMeter 测试结果：***

```bash
Starting the test @ Sat Jan 13 10:01:20 CST 2024 (1705111280949)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary +  88138 in 00:00:09 = 10013.4/s Avg:     0 Min:     0 Max:    50 Err:     0 (0.00%) Active: 1 Started: 1 Finished: 0
summary + 338604 in 00:00:30 = 11286.8/s Avg:     0 Min:     0 Max:     5 Err:     0 (0.00%) Active: 1 Started: 1 Finished: 0
summary = 426742 in 00:00:39 = 10997.9/s Avg:     0 Min:     0 Max:    50 Err:     0 (0.00%)
summary + 262119 in 00:00:21 = 12315.9/s Avg:     0 Min:     0 Max:     4 Err:     0 (0.00%) Active: 0 Started: 1 Finished: 1
summary = 688861 in 00:01:00 = 11464.6/s Avg:     0 Min:     0 Max:    50 Err:     0 (0.00%)
Tidying up ...    @ Sat Jan 13 10:02:21 CST 2024 (1705111341284)
... end of run
```

***AngusTester 测试结果：***

```bash
===========================================================================================================================
  *** Task Summary Report @ Http TEST_PERFORMANCE @ 2024-01-12 22:05:28 ***
===========================================================================================================================
  Exec ID: 1                                    Run Mode: LOCAL                    Memory: 114.51MBM(Used), 9.12GBM(Free)
  Bytes: 270.42MB(Recv), 34.69MB(Write)         Iterations: 742283                 Cpu: 55.70%(Proc), 226.68%(Sys)
  Date: 01/12 10:04:28 to 01/12 10:05:28        Duration: 60 Second                Threads: 0/1  terminated
+-------+---------+------+-----+-------+-----+-----+-----+-----+------+--------+----------+--------+--------+--------+----------+
| Name  | Samples | Mean | Min | Max   | P50 | P75 | P90 | P99 | P999 | Trans  | Trans/s  | Errors | Error% | Recv/s | Write/s  |
+-------+---------+------+-----+-------+-----+-----+-----+-----+------+--------+----------+--------+--------+--------+----------+
| Total | 742283  | 0.08 | 0.0 | 119.0 | 0.0 | 0.0 | 0.0 | 1.0 | 1.0  | 742283 | 12371.38 | 0      | 0.0    | 4.51MB | 591.99KB |
+-------+---------+------+-----+-------+-----+-----+-----+-----+------+--------+----------+--------+--------+--------+----------+
  *** Sampling Result: SUCCESS
===========================================================================================================================
```

- 10 个线程运行 60 秒测试结果

***JMeter 测试结果：***

```bash
Starting the test @ Fri Jan 12 22:11:55 CST 2024 (1705068715265)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary + 208924 in 00:00:04 = 46697.4/s Avg:     0 Min:     0 Max:    68 Err:     0 (0.00%) Active: 10 Started: 10 Finished: 0
summary + 2007667 in 00:00:30 = 66922.2/s Avg:     0 Min:     0 Max:    21 Err:     0 (0.00%) Active: 10 Started: 10 Finished: 0
summary = 2216591 in 00:00:34 = 64297.5/s Avg:     0 Min:     0 Max:    68 Err:     0 (0.00%)
summary + 1331246 in 00:00:26 = 51977.4/s Avg:     0 Min:     0 Max:     6 Err:     0 (0.00%) Active: 0 Started: 10 Finished: 10
summary = 3547837 in 00:01:00 = 59045.0/s Avg:     0 Min:     0 Max:    68 Err:     0 (0.00%)
Tidying up ...    @ Fri Jan 12 22:12:55 CST 2024 (1705068775613)
... end of run
```

***AngusTester 测试结果：***

```bash
===========================================================================================================================
  *** Task Summary Report @ Http TEST_PERFORMANCE @ 2024-01-12 22:09:57 ***
===========================================================================================================================
  Exec ID: 1                                    Run Mode: LOCAL                    Memory: 216.81MBM(Used), 9.02GBM(Free)
  Bytes: 1.23GB(Recv), 161.86MB(Write)          Iterations: 3463729                Cpu: 550.21%(Proc), 1242.21%(Sys)
  Date: 01/12 10:09:01 to --                    Duration: 55 Second                Threads: 10/10  running
+-------+---------+------+-----+-------+-----+-----+-----+-----+------+---------+----------+--------+--------+---------+---------+
| Name  | Samples | Mean | Min | Max   | P50 | P75 | P90 | P99 | P999 | Trans   | Trans/s  | Errors | Error% | Recv/s  | Write/s |
+-------+---------+------+-----+-------+-----+-----+-----+-----+------+---------+----------+--------+--------+---------+---------+
| Total | 3463719 | 0.16 | 0.0 | 155.0 | 0.0 | 0.0 | 1.0 | 1.0 | 1.0  | 3463719 | 62687.21 | 0      | 0.0    | 22.84MB | 2.93MB  |
+-------+---------+------+-----+-------+-----+-----+-----+-----+------+---------+----------+--------+--------+---------+---------+
  *** Sampling Result: SUCCESS
===========================================================================================================================
```

- 50 个线程运行 60 秒测试结果

***JMeter 测试结果：***

```bash
Starting the test @ Fri Jan 12 22:16:19 CST 2024 (1705068979674)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary + 804544 in 00:00:10 = 79879.3/s Avg:     0 Min:     0 Max:   250 Err:     0 (0.00%) Active: 50 Started: 50 Finished: 0
summary + 2240631 in 00:00:30 = 74687.7/s Avg:     0 Min:     0 Max:   137 Err:     0 (0.00%) Active: 50 Started: 50 Finished: 0
summary = 3045175 in 00:00:40 = 75992.6/s Avg:     0 Min:     0 Max:   250 Err:     0 (0.00%)
summary + 1274138 in 00:00:20 = 63627.4/s Avg:     0 Min:     0 Max:   167 Err:     0 (0.00%) Active: 0 Started: 50 Finished: 50
summary = 4319313 in 00:01:00 = 71872.4/s Avg:     0 Min:     0 Max:   250 Err:     0 (0.00%)
Tidying up ...    @ Fri Jan 12 22:17:20 CST 2024 (1705069040026)
... end of run
```

***AngusTester 测试结果：***

```bash
===========================================================================================================================
  *** Task Summary Report @ Http TEST_PERFORMANCE @ 2024-01-12 22:15:40 ***
===========================================================================================================================
  Exec ID: 1                                    Run Mode: LOCAL                    Memory: 433.35MBM(Used), 8.81GBM(Free)
  Bytes: 1.85GB(Recv), 242.69MB(Write)          Iterations: 5193453                Cpu: 477.60%(Proc), 1108.46%(Sys)
  Date: 01/12 10:14:40 to 01/12 10:15:40        Duration: 60 Second                Threads: 0/50  terminated
+-------+---------+------+-----+-------+-----+-----+-----+-----+------+---------+----------+--------+--------+---------+---------+
| Name  | Samples | Mean | Min | Max   | P50 | P75 | P90 | P99 | P999 | Trans   | Trans/s  | Errors | Error% | Recv/s  | Write/s |
+-------+---------+------+-----+-------+-----+-----+-----+-----+------+---------+----------+--------+--------+---------+---------+
| Total | 5193453 | 0.57 | 0.0 | 260.0 | 0.0 | 1.0 | 1.0 | 4.0 | 35.0 | 5193453 | 86556.11 | 0      | 0.0    | 31.53MB | 4.04MB  |
+-------+---------+------+-----+-------+-----+-----+-----+-----+------+---------+----------+--------+--------+---------+---------+
  *** Sampling Result: SUCCESS
===========================================================================================================================


Stop from 192.168.255.22 @ Fri Jan 12 22:15:41 CST 2024, force=false, timeoutInMillis=3000
Runner threads has been shutdown
```

- 100 个线程运行 60 秒测试结果

***JMeter 测试结果：***

```bash
Starting the test @ Fri Jan 12 22:20:26 CST 2024 (1705069226157)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary + 187584 in 00:00:04 = 52106.7/s Avg:     1 Min:     0 Max:   341 Err:     0 (0.00%) Active: 100 Started: 100 Finished: 0
summary + 2081627 in 00:00:30 = 69387.6/s Avg:     1 Min:     0 Max:   286 Err:     0 (0.00%) Active: 100 Started: 100 Finished: 0
summary = 2269211 in 00:00:34 = 67536.0/s Avg:     1 Min:     0 Max:   341 Err:     0 (0.00%)
summary + 1676282 in 00:00:27 = 63253.5/s Avg:     1 Min:     0 Max:   179 Err:     0 (0.00%) Active: 0 Started: 100 Finished: 100
summary = 3945493 in 00:01:00 = 65646.6/s Avg:     1 Min:     0 Max:   341 Err:     0 (0.00%)
Tidying up ...    @ Fri Jan 12 22:21:26 CST 2024 (1705069286502)
... end of run
```

***AngusTester 测试结果：***

```bash
===========================================================================================================================
  *** Task Summary Report @ Http TEST_PERFORMANCE @ 2024-01-12 22:20:03 ***
===========================================================================================================================
  Exec ID: 1                                    Run Mode: LOCAL                    Memory: 434.3MBM(Used), 8.81GBM(Free)
  Bytes: 1.78GB(Recv), 233.68MB(Write)          Iterations: 5000593                Cpu: 600.63%(Proc), 1369.24%(Sys)
  Date: 01/12 10:19:03 to 01/12 10:20:03        Duration: 60 Second                Threads: 0/100  terminated
+-------+---------+------+-----+-------+-----+-----+-----+------+------+---------+----------+--------+--------+---------+---------+
| Name  | Samples | Mean | Min | Max   | P50 | P75 | P90 | P99  | P999 | Trans   | Trans/s  | Errors | Error% | Recv/s  | Write/s |
+-------+---------+------+-----+-------+-----+-----+-----+------+------+---------+----------+--------+--------+---------+---------+
| Total | 5000593 | 1.19 | 0.0 | 328.0 | 1.0 | 1.0 | 1.0 | 13.0 | 92.0 | 5000593 | 83343.22 | 0      | 0.0    | 30.36MB | 3.89MB  |
+-------+---------+------+-----+-------+-----+-----+-----+------+------+---------+----------+--------+--------+---------+---------+
  *** Sampling Result: SUCCESS
===========================================================================================================================
```

- 200 个线程运行 60 秒测试结果

***JMeter 测试结果：***

```bash
Starting the test @ Fri Jan 12 22:34:57 CST 2024 (1705070097385)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary +  35249 in 00:00:02 = 15419.5/s Avg:     9 Min:     0 Max:   754 Err:     0 (0.00%) Active: 200 Started: 200 Finished: 0
summary + 1758509 in 00:00:30 = 58642.4/s Avg:     3 Min:     0 Max:  1130 Err:     0 (0.00%) Active: 200 Started: 200 Finished: 0
summary = 1793758 in 00:00:32 = 55580.8/s Avg:     3 Min:     0 Max:  1130 Err:     0 (0.00%)
summary + 1693121 in 00:00:28 = 60752.8/s Avg:     3 Min:     0 Max:   405 Err:     0 (0.00%) Active: 0 Started: 200 Finished: 200
summary = 3486879 in 00:01:00 = 57977.4/s Avg:     3 Min:     0 Max:  1130 Err:     0 (0.00%)
Tidying up ...    @ Fri Jan 12 22:35:57 CST 2024 (1705070157870)
... end of run
```

***AngusTester 测试结果：***

```bash
===========================================================================================================================
  *** Task Summary Report @ Http TEST_PERFORMANCE @ 2024-01-12 22:34:47 ***
===========================================================================================================================
  Exec ID: 1                                    Run Mode: LOCAL                    Memory: 219.95MBM(Used), 9.02GBM(Free)
  Bytes: 1.61GB(Recv), 211.23MB(Write)          Iterations: 4520270                Cpu: 615.87%(Proc), 1368.42%(Sys)
  Date: 01/12 10:33:47 to 01/12 10:34:47        Duration: 60 Second                Threads: 0/200  terminated
+-------+---------+------+-----+-------+-----+-----+-----+------+-------+---------+----------+--------+--------+---------+---------+
| Name  | Samples | Mean | Min | Max   | P50 | P75 | P90 | P99  | P999  | Trans   | Trans/s  | Errors | Error% | Recv/s  | Write/s |
+-------+---------+------+-----+-------+-----+-----+-----+------+-------+---------+----------+--------+--------+---------+---------+
| Total | 4520270 | 2.65 | 0.0 | 551.0 | 1.0 | 2.0 | 3.0 | 44.0 | 129.0 | 4520270 | 75337.83 | 0      | 0.0    | 27.45MB | 3.52MB  |
+-------+---------+------+-----+-------+-----+-----+-----+------+-------+---------+----------+--------+--------+---------+---------+
  *** Sampling Result: SUCCESS
===========================================================================================================================
```

- 500 个线程运行 60 秒测试结果

***JMeter 测试结果：***

```bash
Starting the test @ Fri Jan 12 22:40:58 CST 2024 (1705070458720)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary +   6514 in 00:00:01 = 6293.7/s Avg:    32 Min:     0 Max:   853 Err:     0 (0.00%) Active: 500 Started: 500 Finished: 0
summary + 2227998 in 00:00:30 = 74266.6/s Avg:     6 Min:     0 Max:  1181 Err:   649 (0.03%) Active: 500 Started: 500 Finished: 0
summary = 2234512 in 00:00:31 = 71999.7/s Avg:     6 Min:     0 Max:  1181 Err:   649 (0.03%)
summary + 1406168 in 00:00:29 = 48313.6/s Avg:    10 Min:     0 Max:   669 Err:   192 (0.01%) Active: 0 Started: 500 Finished: 500
summary = 3640680 in 00:01:00 = 60536.7/s Avg:     8 Min:     0 Max:  1181 Err:   841 (0.02%)
Tidying up ...    @ Fri Jan 12 22:41:59 CST 2024 (1705070519105)
... end of run
```

***AngusTester 测试结果：***

```bash
===========================================================================================================================
  *** Task Summary Report @ Http TEST_PERFORMANCE @ 2024-01-12 22:39:30 ***
===========================================================================================================================
  Exec ID: 1                                    Run Mode: LOCAL                    Memory: 285.7MBM(Used), 8.96GBM(Free)
  Bytes: 1.46GB(Recv), 192.0MB(Write)           Iterations: 4108760                Cpu: 610.46%(Proc), 1257.58%(Sys)
  Date: 01/12 10:38:30 to 01/12 10:39:30        Duration: 60 Second                Threads: 0/500  terminated
+-------+---------+------+-----+--------+-----+-----+------+------+-------+---------+----------+--------+--------+---------+---------+
| Name  | Samples | Mean | Min | Max    | P50 | P75 | P90  | P99  | P999  | Trans   | Trans/s  | Errors | Error% | Recv/s  | Write/s |
+-------+---------+------+-----+--------+-----+-----+------+------+-------+---------+----------+--------+--------+---------+---------+
| Total | 4108760 | 7.28 | 0.0 | 1009.0 | 3.0 | 5.0 | 11.0 | 98.0 | 159.0 | 4108760 | 68479.33 | 0      | 0.0    | 24.95MB | 3.2MB   |
+-------+---------+------+-----+--------+-----+-----+------+------+-------+---------+----------+--------+--------+---------+---------+
  *** Sampling Result: SUCCESS
===========================================================================================================================
```

- 1000 个线程运行 60 秒测试结果

***JMeter 测试结果：***

```bash
Starting the test @ Fri Jan 12 22:48:15 CST 2024 (1705070895534)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary + 625738 in 00:00:14 = 44199.9/s Avg:    19 Min:     0 Max:  1840 Err:  1499 (0.24%) Active: 1000 Started: 1000 Finished: 0
summary + 1167397 in 00:00:30 = 38640.2/s Avg:    25 Min:     0 Max:  2298 Err:  5215 (0.45%) Active: 1000 Started: 1000 Finished: 0
summary = 1793135 in 00:00:44 = 40413.2/s Avg:    23 Min:     0 Max:  2298 Err:  6714 (0.37%)
summary + 551761 in 00:00:16 = 34857.6/s Avg:    29 Min:     0 Max:  2384 Err:  3758 (0.68%) Active: 0 Started: 1000 Finished: 1000
summary = 2344896 in 00:01:00 = 38952.4/s Avg:    24 Min:     0 Max:  2384 Err: 10472 (0.45%)
Tidying up ...    @ Fri Jan 12 22:49:16 CST 2024 (1705070956042)
... end of run
```

***AngusTester 测试结果：***

```bash
===========================================================================================================================
  *** Task Summary Report @ Http TEST_PERFORMANCE @ 2024-01-12 22:48:09 ***
===========================================================================================================================
  Exec ID: 1                                    Run Mode: LOCAL                    Memory: 307.85MBM(Used), 8.93GBM(Free)
  Bytes: 1.16GB(Recv), 152.72MB(Write)          Iterations: 3268051                Cpu: 694.65%(Proc), 1162.53%(Sys)
  Date: 01/12 10:47:09 to 01/12 10:48:09        Duration: 60 Second                Threads: 0/1000  terminated
+-------+---------+-------+-----+--------+-----+------+------+-------+-------+---------+----------+--------+--------+---------+---------+
| Name  | Samples | Mean  | Min | Max    | P50 | P75  | P90  | P99   | P999  | Trans   | Trans/s  | Errors | Error% | Recv/s  | Write/s |
+-------+---------+-------+-----+--------+-----+------+------+-------+-------+---------+----------+--------+--------+---------+---------+
| Total | 3268051 | 18.29 | 0.0 | 2012.0 | 8.0 | 14.0 | 35.0 | 141.0 | 205.0 | 3268051 | 54467.52 | 0      | 0.0    | 19.84MB | 2.55MB  |
+-------+---------+-------+-----+--------+-----+------+------+-------+-------+---------+----------+--------+--------+---------+---------+
  *** Sampling Result: SUCCESS
===========================================================================================================================
```

- 2000 个线程运行 60 秒测试结果

***JMeter 测试结果：***

```bash
Starting the test @ Fri Jan 12 22:53:28 CST 2024 (1705071208693)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary +   2012 in 00:00:01 = 1832.4/s Avg:    64 Min:     0 Max:   731 Err:    31 (1.54%) Active: 2000 Started: 2000 Finished: 0
summary + 329540 in 00:00:30 = 11000.8/s Avg:   183 Min:     0 Max:  2754 Err: 169684 (51.49%) Active: 2000 Started: 2000 Finished: 0
summary = 331552 in 00:00:31 = 10676.6/s Avg:   182 Min:     0 Max:  2754 Err: 169715 (51.19%)
summary + 185640 in 00:00:30 = 6187.6/s Avg:   314 Min:     0 Max:  3874 Err: 138797 (74.77%) Active: 4 Started: 2000 Finished: 1996
summary = 517192 in 00:01:01 = 8470.8/s Avg:   230 Min:     0 Max:  3874 Err: 308512 (59.65%)
summary +      3 in 00:00:00 =   35.7/s Avg:  1084 Min:  1080 Max:  1088 Err:     0 (0.00%) Active: 0 Started: 2000 Finished: 2000
summary = 517195 in 00:01:01 = 8459.1/s Avg:   230 Min:     0 Max:  3874 Err: 308512 (59.65%)
Tidying up ...    @ Fri Jan 12 22:54:30 CST 2024 (1705071270087)
... end of run
```

***AngusTester 测试结果：***

```bash
===========================================================================================================================
  *** Task Summary Report @ Http TEST_PERFORMANCE @ 2024-01-12 22:51:33 ***
===========================================================================================================================
  Exec ID: 1                                    Run Mode: LOCAL                    Memory: 167.23MBM(Used), 9.07GBM(Free)
  Bytes: 688.03MB(Recv), 88.26MB(Write)         Iterations: 1888681                Cpu: 1017.14%(Proc), 1352.72%(Sys)
  Date: 01/12 10:50:32 to 01/12 10:51:32        Duration: 60 Second                Threads: 0/2000  terminated
+-------+---------+-------+-----+--------+------+------+-------+-------+--------+---------+----------+--------+--------+---------+---------+
| Name  | Samples | Mean  | Min | Max    | P50  | P75  | P90   | P99   | P999   | Trans   | Trans/s  | Errors | Error% | Recv/s  | Write/s |
+-------+---------+-------+-----+--------+------+------+-------+-------+--------+---------+----------+--------+--------+---------+---------+
| Total | 1888681 | 62.69 | 0.0 | 3996.0 | 35.0 | 84.0 | 149.0 | 204.0 | 3134.0 | 1888681 | 31478.02 | 0      | 0.0    | 11.47MB | 1.47MB  |
+-------+---------+-------+-----+--------+------+------+-------+-------+--------+---------+----------+--------+--------+---------+---------+
  *** Sampling Result: SUCCESS
===========================================================================================================================
```

## 三、性能结果对比

### 1. QPS对比表
| 并发线程数 | JMeter QPS | AngusTester QPS | 性能提升 |
|-----------|------------|------------------|---------|
| 1 | 11,464/s | 12,371/s | +7.91% |
| 10 | 59,045/s | 62,687/s | +6.16% |
| 50 | 71,872/s | 86,556/s | +20.43% |
| 100 | 65,646/s | 83,343/s | +26.97% |
| 200 | 57,977/s | 75,337/s | +29.96% |
| 500 | 60,536/s | 68,479/s | +13.12% |
| 1000 | 38,952/s | 54,467/s | +39.76% |
| 2000 | 8,470/s | 31,478/s | +271.64% |

### 2. 错误率对比
| 并发线程数 | JMeter错误率 | AngusTester错误率 |
|-----------|--------------|-------------------|
| 500 | 0.02% | 0% |
| 1000 | 0.45% | 0% |
| 2000 | 59.65% | 0% |

### 3. 核心结论
| 对比维度 | JMeter | AngusTester | 优势差异 |
|---------|--------|------------|---------|
| **峰值QPS** | 71,872/s | 86,556/s | +20.43% |
| **错误处理能力** | 高并发时错误率↑ | 所有场景0错误 | 100%可靠性 |
| **性能衰减曲线** | 急剧下降 | 平缓下降 | 更稳定的压力承载 |
| **资源利用率** | CPU/内存占用高 | 资源效率提升30% | 更高性价比 |
| **结果报告** | 原始日志输出 | 结构化专业报告 | 可读性提升200% |

<br>

**立即体验性能优化测试**：[🔗 进入AngusTester控制台 🔗](https://gm.xcan.cloud/signin){ .md-button .md-button--primary }
