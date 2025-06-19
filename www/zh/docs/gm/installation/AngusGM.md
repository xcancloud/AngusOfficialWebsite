---
title: AngusGM 应用安装部署
outline: deep
---

# AngusGM 应用安装部署

::: warning 注意
1. AngusGM作为基础应用，运行其他Angus业务应用前需要先运行AngusGM。
2. 以下是针对`Enterprise`安装过程说明，如果需要安装其他版本，将版本类型标志`Enterprise`替换成`Community`或`Datacenter`即可。
:::

## 一、部署前准备

- **系统要求**
    - 操作系统：支持系统 `Linux/Windows/macOS`。
    - 计算资源：最小配置要求 `2核CPU、4GB内存`，推荐配置 `4核CPU、8GB内存`。
    - 磁盘空间：最小 10GB 可用空间，推荐配置 `100GB`。

- **运行环境**
    - ZIP 包部署：需要配置 `OpenJDK 17+`。
    - Docker 和 Compose 部署：需要安装 Docker，推荐版本 `V20.10+`。

- **中间件**
    - 数据库：需要 MySQL 5.7+。
    - Redis 缓存：需要 Redis 7.0+。

- **应用版本**
    - 社区版本（Community）：永久免费版本。
    - 企业版本（Enterprise）：收费版本，需要获取许可。功能和社区版本无差异，支持更多用户。
    - 数据中心版本（Datacenter）：收费版本，需要获取许可。功能和社区版本无差异，支持多租户和更多用户。

  > ***注意：*** 以下是针对`Enterprise`安装过程说明，如果需要安装其他版本，将版本类型标志`Enterprise`替换成`Community`或`Datacenter`即可。

## 二、手动配置安装

**1. 下载并解压**

```bash
# 下载安装包
curl -LO https://nexus.xcan.cloud/repository/release/package/AngusGM-Enterprise-1.0.0.zip

# 解压安装包至目标目录
mkdir -p /opt/AngusGM
unzip -qo AngusGM-Enterprise-1.0.0.zip -d /opt/AngusGM

# 进入到安装目录
cd /opt/AngusGM
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
# 初次安装或重新安装时需要设置成`AngusGM`，安装后会自动清除
INSTALL_APPS=AngusGM
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
# ------------------------
```

::: warning 注意
1. AngusGM支持部署比较灵活，以上为推荐的、可快速安装的主要配置选项。
2. 更多其他配置选项和说明请查看下面`配置参考->应用配置`。
:::

**3. 启动应用**

```bash
# 运行启动命令
./startup-gm.sh

# 查看启动日志
tail -f -n1000 logs/gm.log
```

> 注意：该脚本是以后台进程启用应用，自动安装和启动大约需要2分钟，具体执行信息请查看 `logs` 日志文件内容。

其他管理应用命令：

```bash
# 停止应用
./shutdown-gm.sh

# 查看应用运行状态
./status-gm.sh

# 停止卸载应用
./shutdown-gm.sh && rm -rf /opt/AngusGM
```

::: warning 注意
1. 该脚本是以后台进程启用应用，自动安装和启动大约需要1分钟，具体执行信息请查看 `logs` 日志文件内容。
2. 如果需要Nginx代理AngusGM应用，或通过Nginx虚拟服务器方式给应用配置域名，请查看下面`配置参考->Nginx代理配置`。
:::

## 三、Docker方式安装

**1. 准备安装目录**

```bash
# 创建安装目录，挂载自定义目录时必须，推荐配置
mkdir -p /opt/AngusGM
# 进入安装目录
cd /opt/AngusGM
# 下载配置文件
curl -LO https://nexus.xcan.cloud/repository/release/package/enterprise/conf/.priv.env
# 编辑配置文件，配置内容和上面 `使用 ZIP 包方式安装` 中配置相同
vi .priv.env
```

**2. 启动应用容器**

```bash
# 拉去镜像
docker pull angus/gm:1.0.0

# 启动应用容器（以后台进程方式）
docker run -d \
  --env-file .priv.env
  --name angusgm \
  -p 8802:8802 \
  -v /opt/AngusGM:/app \
  angus/gm:1.0.0
```

**参数说明：**

| **参数**                     | **作用**                                                                                     |
|------------------------------|---------------------------------------------------------------------------------------------|
| **`-d`**                     | 以后台模式（detached）运行容器                                                               |
| **`--env-file .priv.env`**   | 从 `.priv.env` 文件加载环境变量（如数据库密码等）                                             |
| **`--name angusgm`**         | 为容器指定名称 `angusgm`（不指定则默认随机生成）                                              |
| **`-p 8802:8802`**           | 端口映射：将主机 `8802` 端口绑定到容器 `8802` 端口（格式：`主机端口:容器端口`）               |
| **`-v /opt/AngusGM:/app`**   | 数据卷挂载：将主机目录 `/opt/AngusGM` 挂载到容器目录 `/app`（格式：`主机路径:容器路径`）      |
| **`angus/gm:1.0.0`**  | 指定要运行的镜像名称及标签（格式：`仓库/镜像名:标签`）                                        |

## 四、Docker Compose方式安装

**1. 准备安装目录**

```bash
# 创建安装目录，挂载自定义目录时必须，推荐配置
mkdir -p /opt/AngusGM
# 进入安装目录
cd /opt/AngusGM
# 下载配置文件
curl -LO https://nexus.xcan.cloud/repository/release/package/enterprise/conf/.priv.env
# 编辑配置文件，配置内容和上面 `使用 ZIP 包方式安装` 中配置相同
vi .priv.env
```

**2. 创建并配置 `gm.yml` 文件**

**场景1：不包含中间件，需提前部署 `MySQL/Redis/Nginx`**

```bash
cat << EOF > gm.yml
version: '3.8'
    
services:
  gm:
    restart: always
    env_file: .priv.env
    container_name: gm
    image: angus/gm:1.0.0
    ports:
      - "8802:8802"
    volumes:
      - /opt/AngusGM:/app
EOF
```

**场景2：包含中间件 `MySQL/Redis/Nginx`**

```bash
cat << EOF > gm.yml
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
    networks:
      - backend
EOF
```

**3. 启动应用容器**

```bash
docker compse -f gm.yml up -d
```

## 五、部署验证

1. **查看运行日志**

```bash
tail -f /opt/AngusGM/logs/gm.log
```

预期输出：`Application started successfully [PID=21601] and Http(s) port 8802 is ready`，表示启动成功。

2. **健康检查端点验证**

```bash
curl http://localhost:8802/actuator/health
```

预期输出：`{"status":"UP"}`，表示启动成功。

3. **登录验证**

- 访问地址：`http://<部署IP>:8802` 或 `http://<部署域名>`
- 默认账号：
    - 用户名：`admin`
    - 密码：`admin@123`

## 六、应用管理

- Linux/MacOS
```bash
# 启动应用
./startup-gm.sh
# 停止应用
./shutdown-gm.sh
# 查看应用日志
tail -f logs/gm.log
```

- Docker
```bash
# 启动应用
docker start gm
# 停止应用
docker stop gm
# 查看应用日志
docker logs gm
```

- Docker Compose
```bash
# 启动应用
docker compose -f gm.yml up -d
# 停止应用
docker compose -f gm.yml stop
# 查看应用日志
docker compose -f gm.yml logs
```

## 七、故障排查

**1. 常见问题**

- **问题：端口冲突**
    - 错误示例：`Error: Port 8802 already in use`
    - 解决方案：修改 `GM_PORT` 参数或终止占用端口的进程。

- **问题：数据库连接失败**
    - 错误示例：`Connection refused to MySQL at 127.0.0.1:3306`
    - 解决方案：检查网络连通性、防火墙规则及数据库凭证。

**2. 日志分析**

- **日志路径**
    1. 查看运行日志文件：`/opt/AngusGM/logs/gm.log`
    2. 查看错误日志文件：`/opt/AngusGM/logs/gm-error.log`
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
# 启用自动初始化和安装应用选项，默认启用，成功安装后将自动关闭。
# 重要：启用重新安装将导致数据库中的数据丢失。
INSTALL_APPS=AngusGM
# 安装和部署类型，默认为 SHARED，支持选项：
#  - SHARED: 共享安装，所有应用共享同一个数据库
#  - STANDALONE: 独立安装，每个应用使用自己的数据库
# 注意：当所有应用共享数据库时，其他应用将与全局管理应用共享数据库，
# 即所有应用共享 gm.env 中的数据库配置；如使用独立数据库，
# 每个应用需要单独配置自己的数据库。
INSTALL_TYPE=SHARED
# 数据库类型，默认为 `MYSQL`，支持选项：MYSQL, POSTGRES
DATABASE_TYPE=MYSQL
# 应用部署和运行时环境，默认为 `HOST`，支持选项：
# CONTAINER (Docker, Kubernetes), HOST(物理机/虚拟机)
RUNTIME=HOST
# 应用和数据库时区配置
TIMEZONE=Asia/Shanghai
# 最大上传文件大小，默认值为 1000MB
MAX_UPLOAD_FILE_SIZE=1000MB
# 最大上传请求大小，限制批量上传中多个文件的总大小，默认值为 2000MB
MAX_UPLOAD_REQUEST_SIZE=2000MB

#-----------------------------------------------------------------------------------
# AngusGM 应用配置
#-----------------------------------------------------------------------------------
# 应用 IP(v4) 或主机名。未配置时自动获取运行环境的IPv4地址
GM_HOST=
# 应用端口，默认值为 `8802`
GM_PORT=8802
# 链接网站域名URL。如果为空，则设置为 http://GM_HOST:GM_PORT
# 示例值：https://gm.xcan.cloud
GM_WEBSITE=
# 应用Web静态资源目录，默认值为 `classpath:/static/,file:./statics/`
GM_WEB_STATICS=classpath:/static/,file:./statics/
# 指定要加载的插件，配置时仅加载指定的插件，未配置时加载所有插件
GM_PLUGIN_LOADED=aliyun-sms-plugin,huaweicloud-sms-plugin
# 指定要忽略的插件，配置时忽略加载指定的插件，未配置时加载所有插件
# 设置为 * 时忽略所有插件
GM_PLUGIN_IGNORED=
# SaaS云服务API接口地址，用于从云端获取数据
GM_CLOUD_APIS_URL_PREFIX=https://bj-c1-prod-apis.xcan.cloud/gm
# 自托管服务API接口地址，用于从当前托管服务读取数据
# 如果为空，则设置为 http://GM_HOST:GM_PORT
GM_APIS_URL_PREFIX=
#-----------------------------------------------------------------------------------
# AngusGM 管理员用户配置
#-----------------------------------------------------------------------------------
# 管理员用户邮箱
GM_ADMIN_EMAIL=
# 管理员用户账户，默认值为 `admin`
GM_ADMIN_USERNAME=admin
# 管理员用户密码，默认值为 `admin@123`
GM_ADMIN_PASSWORD=admin@123
#-----------------------------------------------------------------------------------
# AngusGM 数据库配置
#-----------------------------------------------------------------------------------
# 数据库IP或主机名，默认值为 `127.0.0.1`
GM_DB_HOST=127.0.0.1
# 数据库端口，默认值为 `3306`
GM_DB_PORT=3306
# 数据库名称，默认值为 `Angus`
GM_DB_NAME=Angus
# 数据库认证用户名，默认值为 `root`
GM_DB_USER=root
# 数据库认证用户密码，默认值为 `Angus123`
GM_DB_PASSWORD=Angus123

#-----------------------------------------------------------------------------------
# Redis 配置
#-----------------------------------------------------------------------------------
# Redis部署模式，默认为 SINGLE，支持选项：
# SINGLE (单实例), SENTINEL (哨兵模式), CLUSTER (集群模式)
REDIS_DEPLOYMENT=SINGLE
# 单实例模式下Redis的IP或主机名，默认值为 `127.0.0.1`
REDIS_HOST=127.0.0.1
# 单实例模式下Redis的端口，默认值为 `6379`
REDIS_PORT=6379
# Redis认证密码，默认值为 `Angus123`
# 当启用Redis安全认证时必须提供
REDIS_PASSWORD=Angus123
# 哨兵模式下的主节点名称，配置示例：mymaster
REDIS_SENTINEL_MASTER=
# 哨兵模式或集群模式下的Redis实例列表
# 配置示例：192.168.0.100:6379,192.168.0.101:6379,192.168.0.102:6379
REDIS_NODES=

#-----------------------------------------------------------------------------------
# 文件存储配置
#-----------------------------------------------------------------------------------
# 存储类型，默认为 `LOCAL`，支持选项：
# LOCAL (本地存储), AWS_S3 (S3协议对象存储)
STORAGE_TYPE=LOCAL
# 本地存储中的文件存储路径
# 未指定时默认存储位置为 `${INSTALL_PATH}/data/files`
STORAGE_LOCAL_DIR=
# 对象存储(S3)的区域名称，示例值：us-west-2
STORAGE_S3_REGION=
# 对象存储(S3)的服务地址，示例值：http://oss-cn-beijing.aliyuncs.com
STORAGE_S3_ENDPOINT=
# 对象存储(S3)服务的访问密钥
# 必须具有创建桶的权限，示例值：ltAI5tBmg9Ym14apePKaGMfm
STORAGE_S3_ACCESSKEY=
# 对象存储(S3)服务的密钥，示例值：ltAI5tBmg9Ym14apePKaGMfm
STORAGE_S3_SECRETKEY=

#-----------------------------------------------------------------------------------
# 云商店配置
#-----------------------------------------------------------------------------------
STORE_CLOUD_APIS_URL_PREFIX=https://bj-c1-prod-apis.xcan.cloud/ess

#-----------------------------------------------------------------------------------
# Eureka 配置
#-----------------------------------------------------------------------------------
# 配置Eureka服务器和仪表板的用户名和密码
# 默认仪表板地址为 http://GM_HOST:GM_PORT/eureka-dashboard
EUREKA_USER_NAME=eureka
EUREKA_USER_PASSWORD=eureka

#-----------------------------------------------------------------------------------
# OAuth2.0 内省客户端配置
#-----------------------------------------------------------------------------------
OAUTH2_INTROSPECT_CLIENT_ID=client-credentials-introspect-client
OAUTH2_INTROSPECT_CLIENT_SECRET=secret
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

    # GM 应用虚拟服务器配置
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

    # 可选：包含其他配置文件
    # include /etc/nginx/conf.d/*.conf;
}
```