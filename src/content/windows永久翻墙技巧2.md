---
title: 翻墙总结
date: 2020-03-11 21:40:33
categories: 技术博客
tags:
    - 技术宅、IT
toc: true
thumbnail: 
---

2年前我写过一篇翻墙的blog，2年后我重写一篇新的。旧的偏向于免费和能用，新的偏向于快速和稳定 

<!--more-->

## Trojan

**trojan**是近两年兴起的网络工具，项目官网 https://github.com/trojan-gfw。与强调加密和混淆的SS/SSR等工具不同，trojan将通信流量伪装成互联网上最常见的https流量，从而有效防止流量被检测和干扰。在敏感时期，基本上只有trojan和 [v2ray伪装](https://itlanyan.com/v2ray-traffic-mask/) 能提供稳如狗的体验。

v2ray和trojan有如下区别及特点：

1. v2ray是一个网络框架，功能齐全；trojan只是一个绕过防火墙的工具，轻量级、功能简单；都使用TLS加密的情况下，理论上trojan比V2ray性能更好；
2. v2ray和trojan都能实现https流量伪装；
3. v2ray内核用go语言开发，trojan是c++实现；
4. v2ray名气大，使用的人多，客户端很好用；trojan关注和使用的人少，官方客户端简陋，生态完善度不高。

trojan无法配合CDN使用，如需过CDN请使用加强版的[trojan-go](https://github.com/p4gefau1t/trojan-go)

V2ray发布了新一代VLESS协议，配合XTLS和direct模式性能大大超过trojan，详情请参考 [VLESS协议介绍和使用教程](https://itlanyan.com/introduce-v2ray-vless-protocol/)

链接vps

安装trojan

```shell
sudo bash -c "$(curl -fsSL https://raw.githubusercontent.com/trojan-gfw/trojan-quickstart/master/trojan-quickstart.sh)"
```

该命令会下载最新版的trojan并安装。安装完毕后，trojan配置文件路径是 `/usr/local/etc/trojan/config.json`

```json
{
    "run_type": "server",
    "local_addr": "0.0.0.0",
    "local_port": 443,
    "remote_addr": "127.0.0.1",
    "remote_port": 80,
    "password": [
        "password1",
        "password2"
    ],
    "log_level": 1,
    "ssl": {
        "cert": "/path/to/certificate.crt",
        "key": "/path/to/private.key",
        "key_password": "",
        "cipher": "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384",
        "cipher_tls13": "TLS_AES_128_GCM_SHA256:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_256_GCM_SHA384",
        "prefer_server_cipher": true,
        "alpn": [
            "http/1.1"
        ],
        "reuse_session": true,
        "session_ticket": false,
        "session_timeout": 600,
        "plain_http_response": "",
        "curves": "",
        "dhparam": ""
    },
    "tcp": {
        "prefer_ipv4": false,
        "no_delay": true,
        "keep_alive": true,
        "reuse_port": false,
        "fast_open": false,
        "fast_open_qlen": 20
    },
    "mysql": {
        "enabled": false,
        "server_addr": "127.0.0.1",
        "server_port": 3306,
        "database": "trojan",
        "username": "trojan",
        "password": "",
        "key": "",
        "cert": "",
        "ca": ""
    }
}
```

配置文件中的如下参数：

1.  `local_port`：监听的端口，默认是443，除非端口被墙，不建议改成其他端口；
2.  `remote_addr`和`remote_port`：非trojan协议时，将请求转发处理的地址和端口。可以是任意有效的ip/域名和端口号，默认是本机和80端口；
3. `password`：密码。需要几个密码就填几行，最后一行结尾不能有逗号；
4. `cert`和`key`：域名的证书和密钥，Let’s Encrypt申请的证书可用 `certbot certificates` 查看证书路径。注意不是mysql里面的key和cert！
5. `key_password`：默认没有密码（如果证书文件有密码就要填上）；
6. `alpn`：建议填两行：http/1.1和h2，保持默认也没有问题。

根据自己的需求修改配置文件（大部分参数保持默认即可），保存，然后设置开机启动：`systemctl enable trojan`，并启动trojan：` systemctl start trojan`。

检查trojan是否在运行：`ss -lp | grep trojan`，如果输出为空，可能的原因包括：

1. config.json文件有语法错误：请注意是否少了逗号，有特殊字符等；
2. 开启了selinux： `setenforce 0`关闭再启动 trojan。

软件运行没问题的话，最后一步是防火墙放行端口（如果开了防火墙的话）：

 为了让伪装更正常，配置文件中的 `remote_addr` 和 `remote_port` 请认真填写。如果使用默认的 127.0.0.1 和 80，请运行以下命令安装Nginx并放行80端口：

https://itlanyan.com/trojan-tutorial/
