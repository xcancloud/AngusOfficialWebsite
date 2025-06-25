---
title: AngusTester 安装与配置指南
outline: deep
---

# AngusTester 应用安装部署

::: warning 注意
1. 安装和运行AngusTester应用之前，需要先安装并运行AngusGM基础应用。  
2. 以下是针对`Enterprise`安装过程说明，如果需要安装其他版本，将版本类型标志`Enterprise`替换成`Community`或`Datacenter`即可。
:::

## 一、前置要求

- **系统要求**
    - 操作系统：支持 Linux / MacOS / Windows Server。
    - 计算资源：最小配置要求 `2核CPU、4GB内存`，推荐配置 `4核CPU、8GB内存`。
    - 磁盘空间：最小 10GB 可用空间，推荐配置 `100GB`。

- **运行环境**
    - 手动配置安装：需要配置 `OpenJDK 17+`，默认会自己安装。
    - Docker 和 Compose 部署：需要安装 Docker，推荐版本 `V20.10+`。

- **中间件**
    - 数据库：需要 MySQL 5.7+。
    - Redis 缓存：需要 Redis 7.0+。

- **应用版本**
    - 社区版本（Community）：永久免费版本。
    - 企业版本（Enterprise）：收费版本，需要获取许可。支持更多高级功能，支持更多用户。
    - 数据中心版本（Datacenter）：收费版本，需要获取许可。支持更多高级功能，支持多租户和更多用户。

## 二、手动配置安装

**1. 下载并解压**

```bash
# 下载安装包
curl -LO https://nexus.xcan.cloud/repository/release/package/AngusTester-Enterprise-1.0.0.zip

# 解压安装包至目标目录
mkdir -p /opt/AngusTester
unzip -qo AngusTester-Enterprise-1.0.0.zip -d /opt/AngusTester

# 进入到安装目录
cd /opt/AngusTester
```

**2. 配置应用**

```bash
# 复制配置模版文件
cp conf/.priv-template.env conf/.priv.env

# 编辑配置文件
vi conf/.priv.env
```

**修改下面选项为自己对应的配置：**

```dotenv
# 初次安装或重新安装时需要设置成`AngusTester`，安装后会自动清除
INSTALL_APPS=AngusTester
# 指定安装数据库类型、必须参数
DATABASE_TYPE=MYSQL

# 配置Web站点访问地址，格式为：`http(s)://域名或IP+端口`，不指定会时会自动设置成：`http://GM_HOST:GM_PORT`
GM_WEBSITE=

# 管理员名称、可选参数
GM_ADMIN_FULL_NAME=
# 管理员邮箱地址、可选参数
GM_ADMIN_EMAIL=
# 管理员用户名，不指定时会自动设置成`admin`
GM_ADMIN_USERNAME=admin
# 管理员密码，不指定时会自动设置成`admin@123`
GM_ADMIN_PASSWORD=admin@123

# 数据库IP或主机名、必须参数
GM_DB_HOST=127.0.0.1
# 数据库端口、必须参数
GM_DB_PORT=3306
# 数据库名称、必须参数
GM_DB_NAME=Angus
# 数据库用户名，该用户必须授权所有Angus数据库权限、必须参数
GM_DB_USER=Angus
# 数据库密码、必须参数
GM_DB_PASSWORD=Angus123

# Redis实例部署类型、必须参数
REDIS_DEPLOYMENT=SINGLE
# Redis实例IP或主机名、必须参数
REDIS_HOST=127.0.0.1
# Redis实例端口、必须参数
REDIS_PORT=6379
# Redis实例密码、必须参数
REDIS_PASSWORD=Angus123

# 配置angustester访问域名，可选参数
TESTER_WEBSITE=
# ------------------------
```
::: warning 注意
1. 以上配置除了`INSTALL_APPS`和`TESTER_WEBSITE`，其他配置选项应该和配置AngusGM应用选项保持一致。
2. 更多其他配置选项和说明请查看下面`配置参考->应用配置`。
:::

**3. 启动应用**

```bash
# 运行启动命令
./startup-tester.sh

# 查看启动日志
tail -f -n1000 logs/tester.log
```

::: warning 注意
1. 该脚本是以后台进程启用应用，自动安装和启动大约需要2分钟，具体执行信息请查看 `logs` 日志文件内容。
2. 如果需要Nginx代理AngusTester应用，或通过Nginx虚拟服务器方式给应用配置域名，请查看下面`配置参考->Nginx代理配置`。
:::

## 三、Docker方式安装

**1. 准备安装目录**

```bash
# 创建安装目录，挂载自定义目录时必须，推荐配置
mkdir -p /opt/AngusTester
# 进入安装目录
cd /opt/AngusTester
# 下载配置文件
curl -LO https://nexus.xcan.cloud/repository/release/package/enterprise/conf/.priv.env
# 编辑配置文件，配置内容和上面 `使用 ZIP 包方式安装` 中配置相同
vi .priv.env
```

**2. 启动应用容器**

```bash
# 拉去镜像
docker pull angus/tester:1.0.0

# 启动应用容器（以后台进程方式）
docker run -d \
  --env-file .priv.env
  --name tester \
  -p 8901:8901 \
  -v /opt/angustester:/app \
  angus/tester:1.0.0
```

**参数说明：**

| **参数**                         | **作用**                                                                                     |
|--------------------------------|---------------------------------------------------------------------------------------------|
| **`-d`**                       | 以后台模式（detached）运行容器                                                               |
| **`--env-file .priv.env`**     | 从 `.priv.env` 文件加载环境变量（如数据库密码等）                                             |
| **`--name tester`**       | 为容器指定名称 `tester`（不指定则默认随机生成）                                              |
| **`-p 8901:8901`**             | 端口映射：将主机 `8901` 端口绑定到容器 `8901` 端口（格式：`主机端口:容器端口`）               |
| **`-v /opt/AngusTester:/app`** | 数据卷挂载：将主机目录 `/opt/AngusTester` 挂载到容器目录 `/app`（格式：`主机路径:容器路径`）      |
| **`angus/tester:1.0.0`** | 指定要运行的镜像名称及标签（格式：`仓库/镜像名:标签`）                                        |

## 四、Docker Compose方式安装

**1. 准备安装目录**

```bash
# 创建安装目录，挂载自定义目录时必须，推荐配置
mkdir -p /opt/AngusTester
# 进入安装目录
cd /opt/AngusTester
# 下载配置文件
curl -LO https://nexus.xcan.cloud/repository/release/package/enterprise/conf/.priv.env
# 编辑配置文件，配置内容和上面 `使用 ZIP 包方式安装` 中配置相同
vi .priv.env
```

**2. 创建并配置 `compose.yml` 文件**

**场景1：不包含中间件，需提前部署 `MySQL/Redis/Nginx/AngusGM`**

```bash
cat << EOF > tester.yml
version: '3.8'
    
services:
  tester:
    restart: always
    env_file: .priv.env
    container_name: tester
    image: angus/tester:1.0.0
    ports:
      - "8901:8901"
    volumes:
      - /opt/AngusTester:/app
EOF
```

**场景2：包含中间件 `MySQL/Redis/Nginx/AngusGM`**

```bash
cat << EOF > tester.yml
version: '3.8'

networks:
  backend:
    driver: bridge
    
services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    restart: always
    env_file: .env.mysql
    volumes:
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - backend
    ports:
      - "3306:3306"
      
  redis:
    image: redis:7.0
    container_name: redis
    restart: always
    env_file: .env.mysql
    networks:
      - backend
    ports:
      - "6379:6379"
      
  nginx:
    image: nginx:latest
    container_name: nginx
    restart: always
    depends_on:
      - mysql
      - redis
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    networks:
      - backend
    ports:
      - "80:80"
      - "443:443"

  gm:
    restart: always
    env_file: .priv.env
    container_name: gm
    image: angus/gm:1.0.0
    depends_on:
      - mysql
      - redis
      - nginx    
    ports:
      - "8802:8802"
    volumes:
      - /opt/AngusGM:/app
      
  tester:
    restart: always
    env_file: .priv.env
    container_name: tester
    image: angus/tester:1.0.0
    depends_on:
      - gm
    ports:
      - "8901:8901"
    volumes:
      - /opt/AngusTester:/app
    networks:
      - backend
EOF
```

**3. 启动应用容器**

```bash
docker compse -f tester.yml up -d
```

## 五、部署验证

1. **查看运行日志**

```bash
tail -f /opt/AngusTester/logs/tester.log
```

预期输出：`Application started successfully [PID=21601] and Http(s) port 8901 is ready`，表示启动成功。

2. **健康检查端点验证**

```bash
curl http://localhost:8901/actuator/health
```

预期输出：`{"status":"UP"}`，表示启动成功。

3. **登录验证**

- 访问地址：`http://<部署IP>:8901` 或 `http://<部署域名>`
- 使用 AngusGM 中用户登录系统，在左侧顶部应用导航器中进入 angustester，表示安装部署成功。

## 六、应用管理

- Linux/MacOS
```bash
# 启动应用
./startup-tester.sh
# 停止应用
./shutdown-tester.sh
# 查看应用日志
tail -f logs/tester.log
```

- Docker
```bash
# 启动应用
docker start tester
# 停止应用
docker stop tester
# 查看应用日志
docker logs tester
```

- Docker Compose
```bash
# 启动应用
docker compose -f tester.yml up -d
# 停止应用
docker compose -f tester.yml stop
# 查看应用日志
docker compose -f tester.yml logs
```

## 七、故障排查

**1. 常见问题**

- **问题：端口冲突**
    - 错误示例：`Error: Port 8901 already in use`
    - 解决方案：修改 `GM_PORT` 参数或终止占用端口的进程。

- **问题：数据库连接失败**
    - 错误示例：`Connection refused to MySQL at 127.0.0.1:3306`
    - 解决方案：检查网络连通性、防火墙规则及数据库凭证。

**2. 日志分析**

- **日志路径**
    1. 查看运行日志文件：`/opt/AngusTester/logs/tester.log`
    2. 查看错误日志文件：`/opt/AngusTester/logs/tester-error.log`
- **关键检索词**：`ERROR`、`Connection refused`

**3. 技术支持**

- 联系邮箱：`technical_support@xcan.cloud`
- 邮件要求：附错误日志截图及环境信息（如：部署方式、版本号等）。

## 八、配置参考

- 应用配置(.priv.env)

```ini
#-----------------------------------------------------------------------------------
# 安装配置
#-----------------------------------------------------------------------------------
## 启用应用程序自动初始化安装选项，默认开启，成功安装后会自动关闭。
## 重要：启用重安装会导致数据库数据丢失
INSTALL_APPS=AngusTester
## 安装部署类型，默认为 SHARED，支持选项：
##   - SHARED: 共享安装，所有应用共用同一数据库
##   - STANDALONE: 独立安装，每个应用使用独立数据库
## 注意：共享安装时，其他应用将与全局管理应用共享数据库配置（即共用gm.env中的配置）；
##       独立安装时，每个应用需单独配置独立数据库
INSTALL_TYPE=SHARED
## 数据库类型，默认 `MYSQL`，支持选项：MYSQL, POSTGRES
DATABASE_TYPE=MYSQL
## 应用部署运行环境，默认 `HOST`，支持选项：CONTAINER (Docker/Kubernetes), HOST(物理机/虚拟机)
RUNTIME=HOST
## 应用与数据库时区配置
TIMEZONE=Asia/Shanghai
## 最大上传文件大小，默认值 1000MB
MAX_UPLOAD_FILE_SIZE=1000MB
## 最大上传请求大小（限制批量上传多文件总大小），默认值 2000MB
MAX_UPLOAD_REQUEST_SIZE=2000MB

#-----------------------------------------------------------------------------------
# AngusGM 应用配置
#-----------------------------------------------------------------------------------
## 应用IP(v4)或主机名。未配置时自动获取运行环境IPv4地址
GM_HOST=
## 应用端口，默认值 `8802`
GM_PORT=8802
## 关联网站域名URL。若为空则设置为 http://GM_HOST:GM_PORT，示例值：https://gm.xcan.cloud
GM_WEBSITE=
## SaaS云服务API接口地址，用于从云端获取数据
GM_CLOUD_APIS_URL_PREFIX=https://bj-c1-prod-apis.xcan.cloud/gm
## 自托管服务API接口地址，用于读取当前托管服务数据。若为空则设置为 http://GM_HOST:GM_PORT
GM_APIS_URL_PREFIX=

#-----------------------------------------------------------------------------------
# AngusGM 数据库配置
#-----------------------------------------------------------------------------------
## 数据库IP或主机名，默认值 `127.0.0.1`
GM_DB_HOST=127.0.0.1
## 数据库端口，默认值 `3306`
GM_DB_PORT=3306
## 数据库名称，默认值 `Angus`
GM_DB_NAME=Angus
## 数据库认证用户名，默认值 `root`
GM_DB_USER=root
## 数据库认证用户密码，默认值 `Angus123`
GM_DB_PASSWORD=Angus123

#-----------------------------------------------------------------------------------
# AngusTester 应用配置
#-----------------------------------------------------------------------------------
## 应用IP(v4)或主机名。未配置时自动获取运行环境IPv4地址
TESTER_HOST=
## 应用端口，默认值 `8901`
TESTER_PORT=8901
## 关联网站域名URL。若为空则设置为 http://TESTER_HOST:TESTER_PORT，示例值：https://tester.xcan.cloud
TESTER_WEBSITE=
## 应用Web静态资源目录，默认值 `classpath:/static/,file:./statics/`
TESTER_WEB_STATICS=classpath:/static/,file:./statics/
## 指定加载插件（配置时仅加载指定插件，未配置时加载所有插件）
TESTER_PLUGIN_LOADED=import-openapi-plugin
## 指定忽略插件（配置时忽略指定插件，未配置时加载所有插件，设为 * 时忽略所有插件）
TESTER_PLUGIN_IGNORED=
## 指定Mock服务连接AngusTester服务地址。若为空则设置为 http://TESTER_HOST:TESTER_PORT
TESTER_APIS_SERVER_URL=

#-----------------------------------------------------------------------------------
# AngusTester 数据库配置
#-----------------------------------------------------------------------------------
## 注意：共享安装(INSTALL_TYPE=SHARED)时，AngusTester将使用AngusGM应用的数据库配置
## 数据库IP或主机名，默认值 `127.0.0.1`
TESTER_DB_HOST=127.0.0.1
## 数据库端口，默认值 `3306`
TESTER_DB_PORT=3306
## 数据库名称，默认值 `Angus`
TESTER_DB_NAME=Angus
## 数据库认证用户名，默认值 `root`
TESTER_DB_USER=root
## 数据库认证用户密码，默认值 `Angus123`
TESTER_DB_PASSWORD=Angus123

#-----------------------------------------------------------------------------------
# AngusTester 节点代理（AngusAgent）服务配置
#-----------------------------------------------------------------------------------
## Agent服务端口，默认值 `5036`
AGENT_REMOTING_SERVER_PORT=5035
## Agent向节点代理客户端发送消息超时时间，默认 `60s`
AGENT_REMOTING_SEND_TIMEOUT=60000
## Agent服务连接检查心跳间隔，默认 `30s`
AGENT_REMOTING_ALLOW_MAX_HEARTBEAT_INTERVAL=30000

#-----------------------------------------------------------------------------------
# AngusTester 节点代理（AngusAgent）安装脚本配置
#-----------------------------------------------------------------------------------
## Agent包与安装脚本下载URL前缀，用于界面自动化安装
AGENT_CLOUD_STORAGE_APIS_PREFIX=https://bj-c1-prod-files.xcan.cloud
## 要安装的Agent版本
AGENT_VERSION=1.0.0
## Agent安装包文件ID
AGENT_FILE_ID=297761877096661000
## Linux Agent自动安装脚本ID
AGENT_LINUX_INSTALL_SCRIPT_ID=297761877096660998
## Windows Agent自动安装脚本ID
AGENT_WINDOWS_INSTALL_SCRIPT_ID=245588291569582089

#-----------------------------------------------------------------------------------
# AngusTester 请求代理（AngusProxy）配置
#-----------------------------------------------------------------------------------
## 启动AngusTester时是否同时启动嵌入API请求代理服务
## 默认开启，独立部署时应禁用
PROXY_STARTUP_IN_TESTER=true

#-----------------------------------------------------------------------------------
# Redis 配置
#-----------------------------------------------------------------------------------
## Redis部署模式，默认为 SINGLE，支持选项：SINGLE (单实例), SENTINEL (哨兵模式), CLUSTER (集群模式)
REDIS_DEPLOYMENT=SINGLE
## 单实例模式Redis的IP或主机名，默认值 `127.0.0.1`
REDIS_HOST=localhost
## 单实例模式Redis端口，默认值 `6379`
REDIS_PORT=6379
## Redis认证密码，默认值 `Angus123`（启用Redis安全认证时必需）
REDIS_PASSWORD=Angus123
## 哨兵模式主节点名称，配置示例：mymaster
REDIS_SENTINEL_MASTER=
## 哨兵/集群模式Redis实例列表，配置示例：192.168.0.100:6379,192.168.0.101:6379,192.168.0.102:6379
REDIS_NODES=

#-----------------------------------------------------------------------------------
# Eureka 配置
#-----------------------------------------------------------------------------------
## 配置Eureka服务器和仪表盘用户名密码，默认仪表盘地址 http://GM_HOST:GM_PORT/eureka-dashboard
EUREKA_USER_NAME=eureka
EUREKA_USER_PASSWORD=eureka

#-----------------------------------------------------------------------------------
# OAuth2.0 客户端配置
#-----------------------------------------------------------------------------------
OAUTH2_INTROSPECT_CLIENT_ID=client-credentials-introspect-client
OAUTH2_INTROSPECT_CLIENT_SECRET=secret

#-----------------------------------------------------------------------------------
# 关闭不受信自签SSL证书验证
#-----------------------------------------------------------------------------------
DISABLE_SSL_VERIFICATION=false
```

- Nginx代理配置(nginx.conf)

```ini
# Nginx 主配置文件
user  nginx;                                      # 以 nginx 用户身份运行进程
worker_processes  auto;                           # 自动设置工作进程数为 CPU 核心数

error_log  /var/log/nginx/error.log notice;       # 错误日志路径，记录级别为 notice
pid        /run/nginx.pid;                        # 存储主进程 PID 的文件路径

events {
    worker_connections  1024;                     # 每个工作进程的最大连接数
}

http {
    default_type  application/octet-stream;       # 默认 MIME 类型（二进制流）

    # 定义日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;  # 访问日志路径和使用 main 格式

    # 性能优化
    tcp_nopush on;                          # 在完整数据包构建后发送
    tcp_nodelay on;                         # 在保持连接时禁用Nagle算法
    client_max_body_size 500M;              # 请求大小限制配置
    sendfile        on;                     # 启用高效文件传输模式
    keepalive_timeout  65;                  # 保持连接超时时间（秒）

    # GM 应用虚拟服务器配置（如果GM应用不在同一台机器部署，删除当前server配置）
    server {
        listen 80;                               # 监听 80 端口（HTTP）
        server_name gm.your.com;                 # 服务器域名

        # WebSocket 代理配置
        location /ws/ {
             proxy_pass http://127.0.0.1:8802;    # 后端服务地址

             # WebSocket 支持配置
             proxy_http_version 1.1;              # 使用 HTTP/1.1（支持 WebSocket）
             proxy_set_header Upgrade $http_upgrade;  # 协议升级头
             proxy_set_header Connection "upgrade";   # 连接升级头
             
             # 超时设置
             proxy_connect_timeout 1d;             # 连接后端超时
             proxy_read_timeout 1d;                # 读取响应超时
             proxy_send_timeout 1d;                # 发送请求超时
             
             # 连接保持设置
             proxy_socket_keepalive on;           # 开启 TCP keepalive
             proxy_hide_header Vary;              # 隐藏响应头中的 Vary

             # 传递客户端信息到后端
             proxy_set_header Host $host;          # 原始主机头
             proxy_set_header X-Real-IP $remote_addr;  # 客户端真实 IP
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # 转发链IP
             proxy_set_header X-Forwarded-Proto $scheme;  # 原始协议
	      }

	      # 普通请求代理配置
        location / {
            proxy_pass http://127.0.0.1:8802;     # 后端服务地址

            # 合理超时设置
            proxy_connect_timeout 10s;             # 连接后端超时
            proxy_read_timeout 120s;               # 读取响应超时
            proxy_send_timeout 120s;               # 发送请求超时

            # 传递客户端信息到后端
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    # Tester 应用虚拟服务器配置
    server {
        listen 80;                               # 监听 80 端口
        server_name tester.your.com;              # 服务器域名

        # AngusProxy 代理配置
        location /angusProxy {
            # CORS 跨域配置
            add_header 'Access-Control-Allow-Origin' * always;                 # 允许所有来源
            add_header 'Access-Control-Allow-Credentials' 'true' always;       # 允许携带凭证
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, PATCH, DELETE' always;  # 允许方法
            add_header 'Access-Control-Allow-Headers' * always;                # 允许所有头（应明确指定）

            # OPTIONS 预检请求处理
            if ($request_method = OPTIONS) {
                add_header 'Access-Control-Max-Age' 1728000;  # 预检结果缓存时间（秒）
                return 204;  # 返回204 No Content
            }
            
            proxy_pass http://127.0.0.1:6806/angusProxy;  # 代理到AngusProxy服务
            proxy_http_version 1.1;                       # 使用 HTTP/1.1

            # WebSocket 支持配置
            proxy_set_header Upgrade $http_upgrade;       
            proxy_set_header Connection "upgrade";       

            # 超时设置
            proxy_connect_timeout 1d;                     # 连接超时
            proxy_read_timeout 1d;                        # 读取超时
            proxy_send_timeout 1d;                        # 发送超时

            # 连接保持设置
            proxy_socket_keepalive on;                   # 开启 TCP keepalive
            proxy_hide_header Vary;                      # 隐藏响应头中的 Vary

            # 传递客户端信息
            proxy_set_header Referer $http_referer;       # 引用来源
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # 普通请求代理配置
        location / {
            proxy_pass http://127.0.0.1:8901;           # 后端服务地址

            # 超时设置
            proxy_connect_timeout 10s;                   # 连接超时
            proxy_read_timeout 120s;                     # 读取超时
            proxy_send_timeout 120s;                     # 发送超时
            
            proxy_set_header Priority "";	             # 清除浏览器端优化参数，防止和业务参数冲突   
            
            # 传递客户端信息 
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;   # 添加协议头
        }
    }

    # 可选：包含其他配置文件
    # include /etc/nginx/conf.d/*.conf;
}
```