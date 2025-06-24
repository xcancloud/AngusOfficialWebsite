# AngusRunner 命令行工具

> `AngusRunner` 是 AngusTester 提供的命令行工具，支持在本地环境执行测试脚本、生成模拟数据，并可将测试结果同步至服务端，适用于自动化集成和持续测试场景。

## 安装准备
使用前请先安装执行程序： 👉 [安装AngusRunner执行程序](../installation/AngusRunner)

## 基本命令格式
```bash
./startup-runner.sh [-dhV] -e=<execId> -s=<script> \
       [-r=<runMode>] [-R=<resultPath>] [-D=<property=value>]...
```

## 参数说明

| 参数                | 缩写 | 说明                                            | 默认值         | 必选 |
|-------------------| ---- |-----------------------------------------------| -------------- | ---- |
| **--script-path** | -s   | 测试脚本文件路径<br>_示例：`-s ~/script.yaml`_           | -              | 是   |
| **--exec-id**     | -e   | 执行任务 ID<br>REMOTE 模式下需与服务端ID一致                | -              | 是   |
| --run-mode        | -r   | 执行模式：<br>`LOCAL` - 结果仅存本地<br>`REMOTE` - 结果同步服务端 | `LOCAL`        | 否   |
| --result-path     | -R   | 测试结果保存路径                                      | `./data/exec/` | 否   |
| --debug           | -d   | 调试模式：<br>• 单次迭代后返回详细结果<br>• 用于脚本功能调试          | `false`        | 否   |
|                 | -D   | 设置系统属性<br>_示例：`-Dkey=value`_                   | -              | 否   |
| --version         | -V   | 显示当前版本                                        | -              | 否   |
| --help            | -h   | 显示帮助信息                                        | -              | 否   |

## 配置示例

### 基础测试执行
```bash
# 本地执行测试脚本
./startup-runner.sh -s ~/scripts/Http_Testing_Benchmark.yaml -e 1
```

### 远程模式执行
```bash
# 将结果同步至服务端（需有效execId）
./startup-runner.sh -s ~/perf_tests/api_load.yaml -e 2001 -r REMOTE
```

### 调试模式运行
```bash
# 调试脚本功能（单次迭代）
./startup-runner.sh -s ~/debug_scripts/login_test.yaml -e debug -d
```

## 执行结果示例
```bash{4,6,14-21}
./startup-runner.sh -s ~/benchmark.yaml -e 1
################################################################
Will start AngusRunner execution: 1
Start runner successfully [PID=6294]
Waiting the completion of the sampling task
Sampling task completed
===========================================================================================================================
  *** Task Summary Report @ Http TEST_PERFORMANCE @ 2024-01-12 21:42:53 ***
===========================================================================================================================
  Exec ID: 1                                    Run Mode: LOCAL                    Memory: 123.76MBM(Used), 9.11GBM(Free)
  Bytes: 256.02MB(Recv), 32.84MB(Write)         Iterations: 702760                 Cpu: 55.60%(Proc), 266.99%(Sys)
  Date: 01/12 09:41:52 to 01/12 09:42:52        Duration: 60 Second                Threads: 0/1  terminated
+-------+---------+------+-----+-------+-----+-----+-----+-----+------+--------+----------+--------+--------+--------+----------+
| Name  | Samples | Mean | Min | Max   | P50 | P75 | P90 | P99 | P999 | Trans  | Trans/s  | Errors | Error% | Recv/s | Write/s  |
+-------+---------+------+-----+-------+-----+-----+-----+-----+------+--------+----------+--------+--------+--------+----------+
| Total | 702760  | 0.08 | 0.0 | 131.0 | 0.0 | 0.0 | 0.0 | 1.0 | 1.0  | 702760 | 11712.67 | 0      | 0.0    | 4.27MB | 560.47KB |
+-------+---------+------+-----+-------+-----+-----+-----+-----+------+--------+----------+--------+--------+--------+----------+
  *** Sampling Result: SUCCESS
===========================================================================================================================
```

## 获取帮助
```bash
./startup-runner.sh -h
  __   __ _  ___ _  _  ____ ____  _  _ __ _ __ _ ____ ____
 / _\ (  ( \/ __) )( \/ ___|  _ \/ )( (  ( (  ( (  __|  _ \
/    \/    ( (_ ) \/ (\___ \)   /) \/ (    /    /) _) )   /
\_/\_/\_)__)\___|____/(____(__\_)\____|_)__)_)__|____|__\_)

Usage: runner [-dhV] -e=<execId> [-r=<runMode>] [-R=<resultPath>] -s=<script>
              [-D=<String=String>]...

Runner commands used for executing tasks in AngusTester.

  -d, --debug                In debug mode, the detail sampling result will be
                               returned after one iteration. Default: false
  -D=<String=String>         Set system properties.
  -e, --exec-id=<execId>     Specify the execution task ID, which needs to be set
                               to the server-side execution task ID in the REMOTE mode.
  -h, --help                 Show this help message and exit.
  -r, --run-mode=<runMode>   The runner execution mode includes two options:
                               LOCAL and REMOTE. When in LOCAL mode, it only
                               runs locally, and test results and reports are
                               only saved locally; When in the REMOTE mode, it
                               is supported to allow run at the specified node,
                               and the test results and reports will be saved
                               to the server. default LOCAL.
  -R, --result-path=<resultPath>
                             Set the path for saving the execution results.
  -s, --script-path=<script> Specify the path where the script file is located.
  -V, --version              Print version information and exit.
```
