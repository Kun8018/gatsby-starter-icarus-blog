---
title: Linux2
date: 2020-03-02 21:40:33
categories: 技术博客
tags:
    - IT，
toc: true
thumbnail: https://s1.ax1x.com/2020/03/27/G9OI3V.th.jpg
---

## Linux2

​     服务器配置

<!--more-->

## 配置多个sshkey

检查.ssh文件夹是否有文件，id_rsa.pub是公钥，id_rsa是密钥

```shell
cd ~/.ssh
ls
ssh-keygen
cat ~/.ssh/id_rsa.pub
```

生成后将公钥发送给github服务器或者linux服务器

OpenSSH 规定，用户公钥保存在服务器的`~/.ssh/authorized_keys`

你要以哪个用户的身份登录到服务器，密钥就必须保存在该用户主目录的`~/.ssh/authorized_keys`文件。只要把公钥添加到这个文件之中，就相当于公钥上传到服务器了。每个公钥占据一行。如果该文件不存在，可以手动创建。

ssh-copy-id 命令：自动上传公钥

OpenSSH 自带一个`ssh-copy-id`命令，可以自动将公钥拷贝到远程服务器的`~/.ssh/authorized_keys`文件。如果`~/.ssh/authorized_keys`文件不存在，`ssh-copy-id`命令会自动创建该文件。

`ssh-copy-id`是直接将公钥添加到`authorized_keys`文件的末尾。如果`authorized_keys`文件的末尾不是一个换行符，会导致新的公钥添加到前一个公钥的末尾，两个公钥连在一起，使得它们都无法生效。所以，如果`authorized_keys`文件已经存在，使用`ssh-copy-id`命令之前，务必保证`authorized_keys`文件的末尾是换行符

```shell
$ ssh-copy-id -i key_file user@host
```



## Nginx

Nginx是常用的网络服务器，ubuntu和debian类似，这里以centos7为例

```nginx
yum install nginx
```

nginx的默认安装目录为`/usr/local/nginx`,配置文件的目录为`/usr/local/nginx/conf/nginx.conf`

启动nginx服务

```nginx
systemctl enable nginx.service 
systemctl start nginx.service
systemctl stop nginx.service
systemctl restart nginx.service
```

nginx命令

```nginx
nginx -s reload  # 热重启
nginx -s reopen  # 重启Nginx
nginx -s stop    # 快速关闭
nginx -s quit    # 等待工作进程处理完成后关闭
nginx -T         # 查看配置文件的实际内容
```

### 默认主页、目录访问

```nginx
server {
  root /网站根目录;
  # 优先使用默认主页
  index index.html index.htm index.php;
  # 当默认主页不存在时直接列出目录内文件树
  autoindex on;
}
```



### 反向代理

先了解正向代理

正向代理：局域网中的电脑用户想要直接访问网络是不可行的，只能通过代理服务器来访问，这种代理服务就被称为正向代理。

反向代理是一个`Web`服务器，它接受客户端的连接请求，然后将请求转发给上游服务器，并将从服务器得到的结果返回给连接的客户端。

客户端访问网络不需要配置，只要把请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据，然后再返回到客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器IP地址

location匹配规则：

～：正则匹配，区分大小写

～*：正则匹配，不区分大小写

@：定义一个命名的location，用于内部定向，例如error_page、try_files

=：普通字符匹配，精确匹配

^～：普通字符匹配，如果该选项匹配，则只匹配该选项，不再向下匹配其他选项

匹配优先级（与location书写的先后顺序关系不大）：

1.精确匹配：=符号严格匹配这个查询，如果找到，停止搜索，

2.普通字符匹配：所有剩下的常规字符串，最长的匹配；如果找到^~这个符号停止搜索；

3.正则匹配；

4.默认匹配：如果第三条条件生效使用第三条，否则使用第二条

nginx做http反向代理

```nginx
location ^~ /api {
  proxy_pass http://192.168.40.174:32020;
}

server{
  listen:90;
  server_name:192.168.0.1
    
  location /edu/{
    root html;
    proxy_pass http://192.168.40.174:32020;
  }
  location /ovd/{
    root html;
    proxy_pass http://192.168.40.174:32020;
  }
}
```

更多指令说明

| 指令                     | 说明                                                         |
| :----------------------- | :----------------------------------------------------------- |
| `proxy_connect_timeout`  | `Nginx`从接受请求至连接到上游服务器的最长等待时间            |
| `proxy_send_timeout`     | 后端服务器数据回传时间(代理发送超时)                         |
| `proxy_read_timeout`     | 连接成功后，后端服务器响应时间(代理接收超时)                 |
| `proxy_cookie_domain`    | 替代从上游服务器来的`Set-Cookie`头的`domain`属性             |
| `proxy_cookie_path`      | 替代从上游服务器来的`Set-Cookie`头的`path`属性               |
| `proxy_buffer_size`      | 设置代理服务器（`nginx`）保存用户头信息的缓冲区大小          |
| `proxy_buffers`          | `proxy_buffers`缓冲区，网页平均在多少`k`以下                 |
| `proxy_set_header`       | 重写发送到上游服务器头的内容，也可以通过将某个头部的值设置为空字符串，而不发送某个头部的方法实现 |
| `proxy_ignore_headers`   | 这个指令禁止处理来自代理服务器的应答。                       |
| `proxy_intercept_errors` | 使`nginx`阻止`HTTP`应答代码为400或者更高的应答。             |



#### 泛域名转发

```nginx
server {
  listen 80;
  server_name ~^([\w-]+)\.user\.demo\.com$;
  
  #配合上面语句可以把不同的域名转发到不同目录，如xuexb.user.demo.com-> /home/user/wwwroot/user/xuexb a01.user.demo.com-> /home/user/wwwroot/user/a01
  root /home/user/wwwroot/user/$1;
  
  ## xuexb.user.demo.com/path -> 127.0.0.1:8080/xuexb/path a01.user.demo.com/path -> 127.0.0.1:8080/a01/path
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://127.0.0.1:8080/$1$request_uri;
  }
}
```

#### Nodejs



```nginx
server {
  server_name www.xxoo.com;
  listen 80;
  
  root /wwwroot/www.xxoo.com/;
  
  if (-f $request_filename/index.html) {
    rewrite (.*) $1/index.html break;
  }
  
  if (!-f $request_filename) {
    rewrite (.*) /index.js;
  }
  
  location = /index.js {
    
    proxy_set_header Connection "";
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    
    proxy_pass http://127.0.0.1:8001$request_uri;
    
    proxy_redirect off;
  }
}
```



### 配置浏览器缓存

不缓存

```nginx
server {
  expires -1;
  if_modified_since off;##
}
## Cache-Control: no-cache;
```



设置缓存

```nginx
server {
  expires 1d;
  ## expires max;
}
## Cache-Control: max-age=315360000
```



根据路径设置不同的缓存策略

```nginx
server {
  set $expires_time 1M;
  
  if($request_uri ~* ^/admin(\/.*)?$) {
    set $expires_time -1;
  }
  
  if($request_uri ~* ^/admin(\/.*)?$) {
    set $expires_time max;
  }
  
  expires $expires_time;
}
```





### 负载均衡

`upstream`模块能够使用3种负载均衡算法：轮询、`IP`哈希、最少连接数。

**轮询：** 默认情况下使用轮询算法，不需要配置指令来激活它，它是基于在队列中谁是下一个的原理确保访问均匀地分布到每个上游服务器；

轮询时考研指定轮询几率，`weight`和访问比率成正比，用于后端服务器性能不均的情况。 

```nginx
#10次一般只会有1次会访问到8081，而有9次会访问到8080
upstream test {
    server localhost:8080 weight=9;
    server localhost:8081 weight=1;
}
```

**IP哈希：** 通过`ip_hash`指令来激活，`Nginx`通过`IPv4`地址的前`3`个字节或者整个`IPv6`地址作为哈希键来实现，同一个IP地址总是能被映射到同一个上游服务器；

```nginx
upstream test {
    ip_hash;
    server localhost:8080;
    server localhost:8081;
}
```

**最少连接数：** 通过`least_conn`指令来激活，该算法通过选择一个活跃数最少的上游服务器进行连接。如果上游服务器处理能力不同，可以通过给`server`配置`weight`权重来说明，该算法将考虑到不同服务器的加权最少连接数。

upstream使用第三方模块

Fair：按后端服务器的响应时间来分配请求，响应时间短的优先分配。

```nginx
upstream backend {
    fair;
    server localhost:8080;
    server localhost:8081;
}
```

url_hash:这是个第三方模块，按访问`url`的`hash`结果来分配请求，使每个`url`定向到同一个后端服务器，后端服务器为缓存时比较有效。 在`upstream`中加入`hash`语句，`server`语句中不能写入`weight`等其他的参数，`hash_method`是使用的`hash`算法

```nginx
upstream backend {
    hash $request_uri;
    hash_method crc32;
    server localhost:8080;
    server localhost:8081;
}
```

upstream一般放在conf文件的开头

upstream还能够为每一个设备设置状态值，这些状态值的含义分别例如以下

1. down 表示单前的server临时不參与负载.
2. weight 默觉得1.weight越大，负载的权重就越大。
3. max_fails ：同意请求失败的次数默觉得1.当超过最大次数时，返回proxy_next_upstream 模块定义的错误.
4. fail_timeout : max_fails次失败后。暂停的时间。

**backup：** 其他全部的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。

```nginx
upstream bakend{ #定义负载均衡设备的Ip及设备状态 
      ip_hash; 
      server 10.0.0.11:9090 down; 
      server 10.0.0.11:8080 weight=2; 
      server 10.0.0.11:6060; 
      server 10.0.0.11:7070 backup; 
}
```



### 支持CORS跨域

nginx配置做跨域处理--添加请求头

```nginx
location ^~ /p/asm {
  proxy_pass http://192.168.40.174:32020;
  add_header 'Access-Control-Allow-Origin' '*' always;
  add_header 'Access-Control-Allow-Credentials' 'true' always;
  add_header 'Access-Control-Allow-Methods' 'GET,POST,PUT,DELETE,PATCH,OPTIONS';
  add_header 'Access-Control-Allow-Headers' 'Content-Type,ssid';
  if ($request_method = 'OPTIONS') {return 204;}
  proxy_redirect     off;
  proxy_set_header   Host $host;
}
```

### 高可用keep-alived

正常情况下nginx是可以访问的，但是如果nginx出现宕机或者内存不够等程序错误，就会堵塞请求。为了防止这种情况的发生，配置高可用keep-alived进行预防

安装keep-alived

```shell
yum install keepalived -y
rpm -q -a keepalived
//keepalived-1.3.5-16.el7.x86_64
```

修改配置文件

```shell
systemctl start keepalived.service
vi keepalived.conf 
```

把原主机ip地址换为虚拟ip

```shell
global_defs {
   notification_email {
     acassen@firewall.loc
     failover@firewall.loc
     sysadmin@firewall.loc
   }
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server 192.168.25.147
   smtp_connect_timeout 30
   router_id LVS_DEVEL # 访问的主机地址
}
vrrp_script chk_nginx {
  script "/usr/local/src/nginx_check.sh"  # 检测文件的地址
  interval 2   # 检测脚本执行的间隔
  weight 2   # 权重
}
vrrp_instance VI_1 {
    state BACKUP    # 主机MASTER、备机BACKUP    
    interface ens33   # 网卡
    virtual_router_id 51 # 同一组需一致
    priority 90  # 访问优先级，主机值较大，备机较小
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.25.50  # 虚拟ip
    }
}
```

启动keep-alived

```shell
systemctl start keepalived.service
```





### 屏蔽ip/国外ip

在`nginx`的配置文件`nginx.conf`中加入如下配置，可以放到`http`, `server`, `location`, `limit_except`语句块，需要注意相对路径，本例当中`nginx.conf`，`blocksip.conf`在同一个目录中

```nginx
include blockip.conf;
```

blockip.conf

```nginx
deny IP;   # 屏蔽单个ip访问
allow IP;  # 允许单个ip访问
deny all;  # 屏蔽所有ip访问
allow all; # 允许所有ip访问
deny 123.0.0.0/8   # 屏蔽整个段即从123.0.0.1到123.255.255.254访问的命令
deny 124.45.0.0/16 # 屏蔽IP段即从123.45.0.1到123.45.255.254访问的命令
deny 123.45.6.0/24 # 屏蔽IP段即从123.45.6.1到123.45.6.254访问的命令
```

国外ip

基于 Nginx 的 ngx_http_geoip2 模块来禁止国外 IP 访问网站。

安装模块依赖

```shell
yum install libmaxminddb-devel -y
```

下载模块

```shell
git clone https://github.com/leev/ngx_http_geoip2_module.git
```

解压到/usr/local目录

```shell
mv ngx_http_geoip2_module/ /usr/local/
```

模块安装成功后，还要在 Nginx 里指定数据库，在安装运行库时默认安装了两个，位于 /usr/share/GeoIP/ 目录下，一个只有 IPv4，一个包含 IPv4 和 IPv6。

登录 www.maxmind.com 网址，创建账户，下载最新的库文件。（账户创建就不演示了）点击左侧，Download Files：

选择 GeoLite2 Country，点击 Download GZIP 下载即可：

上传到 /usr/share/GeoIP/ 下并解压：

```shell
cd /usr/share/GeoIP/
```

在nginx.conf中的http中引入数据库文件

```shell
geoip2 /usr/share/GeoIP/GeoLite2-City.mmdb {
        auto_reload 5m;
        $geoip2_data_country_code country iso_code;
        }
        map $geoip2_data_country_code $allowed_country {
default yes;
        CN no;
        }
```

在 server 中的 location 下添加条件，如果满足 IP 是国外 IP，就执行下面的 return 动作，

可以直接返回 404或者别的页面：

```nginx
if ($allowed_country = yes) {
    # return https://www.baidu.com;
    # return /home/japan;
    return 404;
}
```



### 重定向

```nginx
//重定向网站
server {
    server_name old-site.com
    return 301 $scheme://new-site.com$request_uri;
}
//重定向单页面
server {
    location = /oldpage.html {
        return 301 http://example.org/newpage.html;
    }
}
//重定向子路径
location /old-site {
    rewrite ^/old-site/(.*) http://example.org/new-site/$1 permanent;
}
```

### 配置图片防盗链

防盗链是指当图片不是自己网站打开时返回403或者指定图片，通过判断请求的来路判断是否是自己的站点来设置

```nginx
server {
  location ~* \.(gif|jpg|png|bmp)$ {
    valid_referers none blocked *.xuexb.com server_names
      
      if ($invalid_referer) {
      	return 403;
    	}
  }
}
```



### Https配置

#### let's Encrypt

let's Encrypt作为一个公共且免费SSL的项目逐渐被广大用户传播和使用，由Mozilla、Cisco、Akamai、IdenTrust等组织发起，主要的目的也是为了推进网站由http向https过度。

let's Encrypt免费SSL证书的出现，也会对传统提供付费SSL证书服务的商家有不少的打击。目前Let‘s Encrypt获得IndenTrust交叉签名，也就是可以应用且支持包括Firefox、Chrome在内的主流浏览器的兼容和支持。

使用git安装

```shell
git clone https://github.com/letsencrypt/letsencrypt
```

生成证书

```shell
cd letsencrypt
./lensencrypt-auto certonly --standalone --email quiniton@163.com -d www.zhaoheqiang.me -d zhaoheqiang.me
```

执行命令之后，会在/etc/letsencrypt/live/下找到各个域名的文件夹，每个文件夹里面会有四个密钥证书文件：

cert.pem：Apache服务器端证书

chain.pem：Apache根证书和中继证书

fullchain.pem：Nginx所需要的ssl_certificate文件

privkey.pem：安全证书KEY文件

如果是Nginx，使用fullchain.pem和privacy.pem文件，在配置文件中加入语句



```nginx
server {
  listen 443 https;
	ssl_certificate /etc/letsencrypt/live/www.zhaoheqiang.me/fullchain.pem
	ssl_certificate_key /etc/letsencrypt/live/www.zhaoheqiang.me/privkey.pem
}
```

延长有效期

let's Encrypt的证书一般有有效期，需要手动更新续期

```shell
./lensencrypt-auto certonly --renew-by-default --email quiniton@163.com -d www.zhaoheqiang.me -d zhaoheqiang.me
```

#### certbot

certbot是let's Encrypt官方推荐的获取证书的客户端。可以帮我们获取免费的let's Encrypt证书。certbot支持所有unix内核的操作系统。

安装certbot

```shell
yum install certbot
```

获取证书

```shell
certbot certonly --standalone -d example.com -d www.example.com
```

也可以用指定根目录的方式生成证书

```shell
certbot certonly --webroot -w /var/www/example -d example.com -d www.example.com
```

证书生成后就可以在/etc/letsencrypt/live目录下看到对应域名的证书

let's Encrypt提供的证书一般都有90天有效期，在证书到期之前需要更新证书，certbot提供自动更新

```shell
certbot renew --dry-run
```

安装时如果报错

```shell
Problem binding to port 80:Could not bind to IPv4 or IPv6
```

因为nginx占用80端口，需要先停掉nginx进行操作，执行自动更新时也需要停掉nginx



#### openssl

先生成一个key

```shell
openssl genrsa -des3 -out ssl.key 1024
```

根据key生成证书请求文件

```shell
openssl req -new -key ssl.key -out ssl.csr
```

最后根据这两个文件生成crt证书文件，如果需要pfx可以用第二个命令生成

```shell
openssl x509 -req -days 3650 -in ssl.csr -signkey ssl.key -out ssl.cer
openssl pkcs12 -export -inkey ssl.key -in ssl.crt -out ssl.pfx
```

在需要使用证书的server中配置

```nginx
server {
  ssl on;
  ssl_certificate /home/ssl.crt;
  ssl_certificate_key /home/ssl.key;
  ssl_session_timeout 5m;
  ssl_protocols SSLv2 SSLv3 TLSv1;
  ssl_ciphers ALL:!EXPORT56:RC4+RSA+HIGH:+MEDIUM+LOW:+SSLv2:+EXP;
  ssl_prefer_server_cipher on;
  
  listen 443;
  ssl on;
  ssl_certificate /usr/local/webserver/nginx/conf/vhost/ssl/server.crt;
  ssl_certificate_key /usr/local/webserver/nginx/conf/vhost/ssl/server.key;
}
```



重启nginx就可以，使用https进行访问

#### nginx配置/http重定向到https

不可以把301和proxy_pass写在同一个server中，会产生重定向次数过多的问题

```nginx
server {
    server_name www.kunzhang.me kunzhnag.me;
    if ($host = www.kunzhang.me){
       return 301 https://$host/$request_url;
    }
}
server {
    listen 443 ssl http 1.1;
    ssl_certificate /etc/letsencrypt/live/diamondfsd.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/diamondfsd.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3999;
        proxy_http_version 1.1;
        proxy_set_header X_FORWARDED_PROTO https;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}
```

### 缓冲优化

Nginx代理之后会有相应的代理缓存区，缓存区默认只有几十K，某些版本的nginx默认设置中没有相关处理，导致部分文件代理是会出现加载不全的现象，其实不仅仅是JS文件。只是因为框架的JS文件略大，所以经常出现类似问题。

在nginx.conf中添加

```conf
http {
	proxy_buffer_size 128k;
	proxy_buffers   32 128k;
	proxy_busy_buffers_size 128k;
}
```

### gzip压缩

```nginx
http {
  # 开启gzip
  gzip on;

  # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
  gzip_min_length 1k;

  # gzip 压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间
  gzip_comp_level 1;

  # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;

  # 是否在http header中添加Vary: Accept-Encoding，建议开启
  gzip_vary on;

  # 禁用IE 6 gzip
  gzip_disable "MSIE [1-6]\.";
}
```



### 错误日志

打开nginx.conf文件

```shell
vim /etc/nginx/nginx.conf
```



### 性能

内容缓存：允许浏览器基本上永久地缓存静态内容。 `Nginx`将为您设置`Expires`和`Cache-Control`头信息。

设置nginx的静态文件地址

```nginx
location / {
  add_header Cache-Control max-age=360000;
  root /usr/share/nginx/html/webrtc-sdk/dist/;
}
```

设置nginx做websocket代理

```nginx
location ^~ /websocket {
  proxy_pass         http://192.168.40.174:31089;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "Upgrade";
}
```

设置nginx最大打开文件限制

```nginx
user root root;
worker_processes 4;
worker_rlimit_nofile 65535;
```

设置nginx拦截某个请求，并直接返回状态码



```nginx
location ^~ /p/asm {
  return 204 "OK";
}
```

设置nginx给某个路径单独的日志文件

```nginx
location ^~ /p/asm {
  access_log /var/log/nginx/a.log;
  error_log /var/log/nginx/a.err.log;
}
```

#### 警告

```shell
Starting nginx: nginx: [warn] could not build optimal proxy_headers_hash, you should increase either proxy_headers_hash_max_size: 512 or proxy_headers_hash_bucket_size: 64; ignoring proxy_headers_hash_bucket_size
nginx: [warn] could not build optimal proxy_headers_hash, you should increase either proxy_headers_hash_max_size: 512 or proxy_headers_hash_bucket_size: 64; ignoring proxy_headers_hash_bucket_size
nginx: [warn] could not build optimal proxy_headers_hash, you should increase either proxy_headers_hash_max_size: 512 or proxy_headers_hash_bucket_size: 64;
```

在代理中设置

```conf
proxy_headers_hash_max_size 51200;
proxy_headers_hash_bucket_size 6400;
```

### 伪静态

伪静态即是网站本身动态网页，如。php、。asp、。aspx等格式动态网页，加？参数来读取数据库内不同资料，伪静态就是做url重写操作，伪静态最主要的作用是利于seo，

```nginx
location / {
  rewrite c(\d+1)_(.*).html /index.php?c=user&id=$1&title=$2 last;
  root /usr/share/nginx/html/sta;
  index index.html index.htm index.php
}
```

### 405报错

Apache、IIS、[Nginx](https://www.izhangheng.com/tag/nginx)等绝大多数web服务器，都不允许静态文件响应POST请求，否则会返回“HTTP/1.1 405 Method not allowed”错误。

nignx的问题，一般可以通过下面的方法解决，只需要更改nginx配置，增加一句

```conf
server {
    listen       80;
    server_name  域名;
 location /{
       root /www/文件目录;
       index index.html index.htm index.php;
       error_page 405 =200 http://$host$request_uri;
    }
 }  
```



### Nginx WebUI（直连）

nginx网页配置工具

github：https://github.com/cym1102/nginxWebUI

https://www.nginxwebui.cn/product.html

### nginx配置生成工具

https://github.com/digitalocean/nginxconfig.io



### 资源

Https://xuexb.github.io/learn-nginx

## caddy

Caddy 是一个 Go 编写的 Web 服务器，类似于 Nginx，Caddy 提供了更加强大的功能，随着 v2 版本发布 Caddy 已经可以作为中小型站点 Web 服务器的另一个选择；相较于 Nginx 来说使用 Caddy 的优势如下:

- 自动的 HTTPS 证书申请(ACME HTTP/DNS 挑战)
- 自动证书续期以及 OCSP stapling 等
- 更高的安全性包括但不限于 TLS 配置以及内存安全等
- 友好且强大的配置文件支持
- 支持 API 动态调整配置(有木有人可以搞个 Dashboard？)
- 支持 HTTP3(QUIC)
- 支持动态后端，例如连接 Consul、作为 k8s ingress 等
- 后端多种负载策略以及健康检测等
- 本身 Go 编写，高度模块化的系统方便扩展(CoreDNS 基于 Caddy1 开发)
- ……

一键安装

```shell
curl https://getcaddy.com | bash -s personal
或者
wget -qO- https://getcaddy.com | bash -s personal
```

检查安装版本

```bash
which caddy
```



## Harbor

Harbor是VMware公司开源的一个用于存储和分发Docker镜像的企业级Registry服务器，以Docker开源的Registry为基础，通过添加一些企业必需的功能特性，例如安全、标识和管理等，扩展了开源Docker Distribution。作为一个企业级私有Registry服务器，Harbor提供了更好的性能和安全，提升用户使用Registry构建和运行环境传输镜像的效率。Harbor支持安装在多个Registry节点的镜像资源复制，镜像全部保存在私有Registry中，确保数据和知识产权在公司内部网络中管控。另外，Harbor也提供了高级的安全特性，诸如用户管理，访问控制和活动审计等。

Harbor特性

- 基于角色的访问控制（Role Based Access Control）

- 基于策略的镜像复制（Policy based image replication）

- 镜像的漏洞扫描（Vulnerability Scanning）

- AD/LDAP集成（LDAP/AD support）

- 镜像的删除和空间清理（Image deletion & garbage collection）

- 友好的管理UI（Graphical user portal）

- 审计日志（Audit logging）

- RESTful API

- 部署简单（Easy deployment）

Harbor组件：

（1）依赖的外部组件:

- Nginx（Proxy）: Harbor的Registry、UI、Token等服务，通过一个前置的反向代理统一接收浏览器、Docker客户端的请求，并将请求转发给后端不同的服务。

- Registry v2: Docker官方镜像仓库, 负责储存Docker镜像，并处理Docker Push/Pull命令。由于我们要对用户进行访问控制，即不同用户对Docker镜像有不同的读写权限，Registry会指向一个Token服务，强制用户的每次Docker Push/Pull请求都要携带一个合法的Token, Registry会通过公钥对Token进行解密验证。

- Database（MySQL/Postgresql）：为Core Services提供数据库服务，负责储存用户权限、审计日志、Docker镜像分组信息等数据。

（2）Harbor自己的组件

Core Services（Admin Server）: 这是Harbor的核心功能，主要提供以下服务：

API：提供Harbor RESTful API

UI：提供图形化界面，帮助用户管理Registry上的镜像, 并对用户进行授权。

Webhook：为了及时获取Registry上镜像状态变化的情况，在Registry上配置Webhook，把状态变化传递给UI模块。

Auth服务：负责根据用户权限给每个Docker Push/Pull命令签发Token。Docker客户端向Registry服务发起的请求，如果不包含Token，会被重定向到这里，获得Token后再重新向Registry进行请求。

Replication Job Service：提供多个Harbor实例之间的镜像同步功能。

Log Collector：为了帮助监控Harbor运行，负责收集其他组件的日志，供日后进行分析。

### 安装

不建议使用Kubernetes来安裝，原因是镜像仓库非常重要，尽量保证安裝和维护的简洁性，因此这里直接使用Docker Compose的方式进行安裝。事实上Harbor的每个组件都是以Docker容器的形式构建，官方也是使用Docker Compose来对它进行安裝。Harbor官方提供以下三种安裝方式:

在线安装：从Docker Hub下载Harbor的镜像来安装，由于Docker Hub比较慢，建议Docker配置好加速器。

离线安装：这种方式应对与安裝主机没联网的情况使用，需要提前下载离线安装包到本地。

OVA安装：这个主要用vCentor环境时使用。

```shell
# 安装方式分为在线安装和离线安装两种方式，这里采用在线安装方式

# 下载在线安装程序
wget -P /usr/local https://storage.googleapis.com/harbor-releases/release-1.7.0/harbor-online-installer-v1.7.1.tgz

# 解压下载文件
tar zxf /usr/local/harbor-online-installer-v1.7.1.tgz -C /usr/local/

# 修改配置文件，根据自己的需求进行修改
vim /usr/local/harbor/harbor.cfg
# 本机IP或者域名，不能是127.0.0.1或者localhost
hostname = 192.168.1.130
# 系统Harbor管理员的密码
harbor_admin_password = Harbor12345
# 禁止用户注册
self_registration = off
# 设置只有管理员可以创建项目
project_creation_restriction = adminonly

# 由于Harbor的Nginx组件默认会监听宿主机的80、443、4443端口，如果需要更改Nginx的端口映射，可以修改以下配置文件
vim /usr/local/harbor/docker-compose.yml
 ports:
      - 8082:80
      - 443:443
      - 4443:4443

# 如果上面更改了Nginx的80端口映射，此时还需要编辑Harbor的配置文件，修改hostname加上指定的端口号
# vim harbor.cfg
hostname = 192.168.1.130:8082

# 执行安装脚本
/usr/local/harbor/install.sh

# Harbar的日志目录是：/var/log/harbor
# Harbar相关数据卷的挂载目录默认是宿主机的/data目录，如果重新安装Harbar并在配置文件里更改了数据库密码，则需要删除/data目录，否则Harbor部分组件会启动失败
```

Harbor启动/停止/重启

```shell
# 如果某个Harbor组件启动失败，可以在日志目录/var/log/harbor下查看具体的日志信息，进一步定位启动失败的原因
# 启动时Harbor默认会监听宿主机的80、443、4443端口，启动Harbor之前必须确保宿主机的80、443、4443端口不被占用，否则Harbor相关组件会启动失败。

# 查看Harbor容器的运行状态
docker ps

# 或者通过docker-compose查看，此时需要进入Harbor安装脚本所在的目录里执行相关命令
cd /usr/local/harbor

# 查看Harbor容器的运行状态
docker-compose ps
       Name                     Command                  State                                    Ports
-------------------------------------------------------------------------------------------------------------------------------------
harbor-adminserver   /harbor/start.sh                 Up (healthy)
harbor-core          /harbor/start.sh                 Up (healthy)
harbor-db            /entrypoint.sh postgres          Up (healthy)   5432/tcp
harbor-jobservice    /harbor/start.sh                 Up
harbor-log           /bin/sh -c /usr/local/bin/ ...   Up (healthy)   127.0.0.1:1514->10514/tcp
harbor-portal        nginx -g daemon off;             Up (healthy)   80/tcp
nginx                nginx -g daemon off;             Up (healthy)   0.0.0.0:443->443/tcp, 0.0.0.0:4443->4443/tcp, 0.0.0.0:80->80/tcp
redis                docker-entrypoint.sh redis ...   Up             6379/tcp
registry             /entrypoint.sh /etc/regist ...   Up (healthy)   5000/tcp
registryctl          /harbor/start.sh                 Up (healthy)

# 启动Harbor容器
docker-compose start

# 停止Harbor容器
docker-compose stop

# 重启Harbor容器
docker-compose restart

# 停止并删除Harbor容器，加上-v参数可以同时移除挂载在容器上的目录
docker-compose down

# 创建并启动Harbo容器，参数“-d”表示后台运行命令
docker-compose up -d
```

测试访问harbor

浏览器输入以下地址或者域名访问Harbor的Web界面，默认账号密码：admin/Harbor12345 地址： http://192.168.1.130

把本地镜像push到harbor

```shell
# 配置Docker客户端允许使用Http协议，如果Nginx更改了的端口映射，需要在以下IP地址后面指定具体的端口号
vim /etc/docker/daemon.json
{
  "insecure-registries":["192.168.1.130"]
}

# 重新加载Docker的配置文件
systemctl daemon-reload

# 重启Docker
systemctl restart docker

# 拉取Docker官方的Centos镜像
docker pull centos:latest

# 查看镜像列表
docker images
REPOSITORY                    TAG                 IMAGE ID            CREATED             SIZE
centos                        latest              1e1148e4cc2c        7 weeks ago         202MB
....

# 登录Harbor Registry，回车后输入admin用户的帐号信息（admin/Harbor12345）
docker login 192.168.1.130

# 如果不使用默认项目名library，则需要使用admin用户提前登录Harbor的Web界面，手动创建新项目后再进行Push操作
# 给镜像打上相应的标签, 注意标签格式: ip/{project-name}/{image-name}[:tag]
# 项目library只有admin有写的权限
docker tag centos:latest 192.168.1.130/library/centos:1.0

# 将本地镜像Push到Harbor
docker push 192.168.1.130/library/centos:1.0
```

把harbor镜像pull到本地

```shell
# 删除上面创建的镜像
docker rmi centos
docker rm 192.168.1.130/library/centos:1.0

# 将Harbor镜像Pull到本地
docker pull 192.168.1.130/library/centos:1.0

# 查看镜像列表
docker ps
```

Harbor安装后更改Nginx的端口映射

```shell
# 进入Harbor的安装目录
cd /usr/local/harbor

# 停止并删除Harbor容器，加上-v参数可以同时移除挂载在容器上的目录
docker-compose down

# 编辑compose的配置文件，修改Nginx的80端口映射
vim docker-compose.yml
 ports:
      - 8082:80
      - 443:443
      - 4443:4443

# 编辑Harbor的配置文件，修改hostname加上指定的端口号
vim harbor.cfg
hostname = 192.168.1.130:8082

# 重新生成配置文件
prepare

# 创建并启动Harbor容器
docker-compose up -d

# 查看Harbor的容器列表，发现Nginx的端口映射已经更改成功
docker-compose ps
harbor-adminserver   /harbor/start.sh                 Up (health: starting)
harbor-core          /harbor/start.sh                 Up (health: starting)
harbor-db            /entrypoint.sh postgres          Up (health: starting)   5432/tcp
harbor-jobservice    /harbor/start.sh                 Up
harbor-log           /bin/sh -c /usr/local/bin/ ...   Up (healthy)            127.0.0.1:1514->10514/tcp
harbor-portal        nginx -g daemon off;             Up (health: starting)   80/tcp
nginx                nginx -g daemon off;             Up (health: starting)   0.0.0.0:443->443/tcp, 0.0.0.0:4443->4443/tcp, 0.0.0.0:8082->80/tcp
redis                docker-entrypoint.sh redis ...   Up                      6379/tcp
registry             /entrypoint.sh /etc/regist ...   Up (health: starting)   5000/tcp
registryctl          /harbor/start.sh                 Up (health: starting)
```

使用openssl生成TLS证书，用于Harbor配置Https

```shell
# 下面以IP：192.168.1.130为例子，实际操作中将命令中的IP地址修改为自己的IP地址即可

# 创建存放证书的临时目录
mkdir ~/cert
cd ~/cert

# 创建自签名根证书
openssl req \
    -newkey rsa:4096 -nodes -sha256 -keyout ca.key \
    -x509 -days 1000 -out ca.crt \
    -subj "/C=CN/ST=Guangdong/L=Shenzhen/O=test_company/OU=IT/CN=test/emailAddress=test@qq.com"

# ls
ca.crt  ca.key

# 产生证书签名请求
openssl req \
    -newkey rsa:4096 -nodes -sha256 -keyout harbor-registry.key \
    -out harbor-registry.csr \
    -subj "/C=CN/ST=Guangdong/L=Shenzhen/O=test_company/OU=IT/CN=192.168.1.130/emailAddress=test@qq.com"

# ls
ca.crt  ca.key  harbor-registry.csr  harbor-registry.key

# 为Registry主机产生证书
echo subjectAltName = IP:192.168.1.130 > extfile.cnf
openssl x509 -req -days 1000 -in harbor-registry.csr -CA ca.crt -CAkey ca.key -CAcreateserial -extfile extfile.cnf -out harbor-registry.crt

# ls
ca.crt  ca.key  ca.srl  extfile.cnf  harbor-registry.crt  harbor-registry.csr  harbor-registry.key

# 创建Harbor的证书目录
mkdir -p /opt/cert

# 拷贝harbor-registry证书到Harbor的证书目录
cp harbor-registry.crt /opt/cert/
cp harbor-registry.key /opt/cert/
```

Harbor安装后配置https

```shell
# 进入Harbor的安装目录
cd /usr/local/harbor

# 停止并删除Harbor容器，加上-v参数可以同时移除挂载在容器上的目录
docker-compose down

# 修改harbor.cfg配置文件
# vim /usr/local/harbor/harbor.cfg
ui_url_protocol = https
hostname = 192.168.1.130
ssl_cert = /opt/cert/harbor-registry.crt
ssl_cert_key = /opt/cert/harbor-registry.key

# 重新生成配置文件
prepare

# 让Docker客户端默认使用Https协议访问Registry，需要去掉“insecure-registries”相关配置项
# 查看daemon.json文件中是否有"insecure-registries":["192.168.1.130"]，如果有则将其删除掉
vim /etc/docker/daemon.json
{"insecure-registries":[""]}

# 重新加载Docker的配置文件
systemctl daemon-reload

# 重启Docker
systemctl restart docker

# 创建并启动Harbor容器
docker-compose up -d
```

测试 

通过https协议访问harbor

这里首先需要将上面产生的~/cert/ca.crt导入到浏览器的受信任的根证书中，然后就可以通过Https协议访问Harbor的Web界面了，但不能保证所有浏览器都支持。访问地址是： https://192.168.1.130

然后通过docker命令来访问

```shell
# 创建Docker的证书目录，目录名称是IP地址，需要根据自己的情况进行修改
# 注意，如果Nginx的443端口映射到了其他端口，则目录名称需要带上具体的端口号，例如/etc/docker/certs.d/192.168.1.130:8443
mkdir -p /etc/docker/certs.d/192.168.1.130

# 将上面产生的ca.crt拷贝到Docker的证书目录下
cp ~/cert/ca.crt /etc/docker/certs.d/192.168.1.130

# 重启Docker
systemctl restart docker

# 登录Harbor Registry，回车后输入admin用户的帐号信息（admin/Harbor12345）
docker login 192.168.1.130

# 查看镜像列表
# docker images
REPOSITORY                    TAG                 IMAGE ID            CREATED             SIZE
centos                        latest              1e1148e4cc2c        7 weeks ago         202MB
....

# 给镜像打上标签
docker tag centos:latest 192.168.1.130/library/centos:1.0

# 将本地镜像Push到Harbor
docker push 192.168.1.130/library/centos:1.0
```



Docker搭建私有仓库管理系统Harbor
https://blog.51cto.com/wutengfei/2480749









