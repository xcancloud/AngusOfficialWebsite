# 安装部署相关问题

#### **Q1：需要什么运行环境？**
> ⚙️ **硬性要求**：  
> | 组件 | 最低要求 | 推荐配置 |  
> |------|----------|----------|  
> | JDK | OpenJDK 17 | OpenJDK 17 |  
> | 内存 | 2GB | 8GB+ |  
> | 磁盘 | 10GB | SSD 50GB+ |

#### **Q2：遇到环境冲突怎么办？**

> 查看冲突报告（重点关注）：
>    - JDK版本不兼容
>    - 端口占用（80/443）
>    - 权限不足（/opt/AngusXX 目录）

#### **Q3：如何验证安装成功？**
> 1. 访问健康检查接口：  
>    `http://服务器IP:8901/health`
> 2. 查看控制台日志，下面启动成功字样：
>    ```log  
>    [INFO] Application started successfully 
>    ```  

> ⭐ **避坑指南**：
> 1. 避免同时安装多个JDK版本
> 2. Linux系统需关闭Swap分区
>
> 📚 完整文档：[部署应用](../installation/AngusGM)

#### **Q4：不同版本如何收费？**
> 🆓 **免费政策**：
> ```mermaid  
> graph LR
>   AngusGM --> 社区版
>   AngusGM --> 云服务版
>   AngusGM --> 企业版本版
>   AngusGM --> 数据中心版
>   
>   社区版 --> 完全免费
>   云服务版 --> 按用量计费
>   企业版本版 --> 许可证收费
>   数据中心版 --> 许可证收费
> ```  
> 💡 **选型建议**：  
> 测试/小团队 → 社区版  
> 中大型企业 → 云服务版或企业版本和数据中心版

#### **Q5：自签证书不受信问题**
> **日志提示错误：**  
> `PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target`  
> **解决方式：**  
> 修改 `.priv.env` 文件，添加或修改选项`DISABLE_SSL_VERIFICATION=true`。