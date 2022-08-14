---
title: Python
date: 2020-03-011 21:40:33
categories: IT
tags:
    - IT，Web,数据库
toc: true
thumbnail: 
---

## 概述

　　python语法简单，应用广泛，好好学习。

<!--more-->

https://github.com/jackfrued/Python-100-Days

## 基础函数、标准包

os:提供与操作系统关联的函数

sys：通常用于命令行参数

math：数学运算

re:正则匹配

datetime：处理日期时间

### 内置函数

divmod(x,y):返回一个包含商和余数的元组

```python
divmod(7,2) //(3,1)
```



## 基础语法

### 条件语句

```python
if b > a:
  print("b is greater than a")
elif a == b:
  print("a and b are equal")
else:
  print("a is greater than b")
```

### 循环语句

for循环可以直接遍历数组和字符串

```python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x)
```





### 并行赋值

python具有并行赋值的特性，可以一次性赋值多个

```python
a,b = 2,0
```

对于右边有变量的，先求出右边的表达式，再一起赋值给左边

``` python
a,b = 2,0
a,b,a = 1,a,4
>>>a,b(4,2)
```

a,b的值分别为2,0，执行并行语句时，先求出右边的右边的表达式为1,2,4，再依次赋值给左边，a先被赋值为1，最后被赋值为4

应用：反转链表的题目：

```python
def reverseList(head):
    prev = None
    while head:
        cur = head
        head = head.next
        cur.next = prev
        prev = cur
    return prev
```

并行赋值写法简化

```python
def reverseList(head):
    prev = None
    while head:
        head.next,prev,head = prev,head,head.next
    return prev
```







python中加语句

```python
if __name__ == '__main__':
```

表示该语句之后的代码只作为脚本执行，被其他软件引用时不执行此部分代码，称为主程序的入口



## 变量类型

### 字符串

join方法

join方法可以将一个字符串列表（一个列表中所有元素均为字符串）连接起来，并用指定的分割符隔开。





### 列表（list）

列表是一种有序的集合，可以存储任意类型，list里面可以是数字、字典、对象、列表等。

list方法

```python
L = range(1,5)#创建连续list，即[1,2,3,4],间隔默认为1，不包含最后一个元素
L = range(1,10,2)#创建间隔为2的连续list，即[1,3,5,7,9],同样不包含最后一个元素
L.append(var) #追加元素
L.insert(index,var)#在指定位置追加元素
L.pop(var) #返回最后一个元素，并在list中删除
L.remove(var) #删除第一次出现的该元素
L.count(var) #该元素在列表中出现的个数
L.remove(var) #删除第一次出现的该元素
L.extend(list) #追加list，即合并list到L上
L.sort() #排序
L.reverse() #倒序
len(L)#获取列表长度
del L[1] #删除指定下标的元素
del L[1:3] #删除指定下标范围的元素
```

列表允许使用列表推导式组成新的列表



### 元组（tuple）

元组与列表相似，区别在于元组的元素不能修改

列表用方括号，元组用小括号，



### 数组（array）

array 是只能够保存一种类型, 初始化的时候就决定了可以保存什么样的类型。

array 可以紧凑地表示一个基本值的数组：字符，整数，浮点数。

[1:] :去掉列表中第一个元素（下标为0），去后面的元素进行操作

[::-1]：python的slice notation的特殊用法。

b = a[i:j] 表示复制a[i]到a[j-1]，以生成新的list对象

当i缺省时，默认为0，即 a[:3]相当于 a[0:3]
当j缺省时，默认为len(alist), 即a[1:]相当于a[1:10]

当i,j都缺省时，a[:]就相当于完整复制一份a了

b = a[i:j:s]的表示：i,j与上面的一样，但s表示步进，缺省为1.
所以a[i:j:1]相当于a[i:j]
当s<0时：i缺省时，默认为-1； j缺省时，默认为-len(a)-1
所以a[::-1]相当于 a[-1:-len(a)-1:-1]，也就是从最后一个元素到第一个元素复制一遍。

数组与列表可以使用很多方法，如append、insert、pop、extend、index等

二维数组

使用*号

```python
m = n = 3
test = [[0] * m] * n
print("test =", test)

test[0][0] = 233
print("test =", test)

//输出
test = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
test = [[233, 0, 0], [233, 0, 0], [233, 0, 0]]
```

matrix = [array] * 3操作中，只是创建3个指向array的引用，所以一旦array改变，matrix中3个list也会随之改变。

正确的方法：

列表生成式法：

```python
test = [[0 for i in range(m)] for j in range(n)]
```



### 链表





### 字典

字典是一个容器类，用来存储数据。

字典存储数据结构为key：value键值对类型，

key 必须是不可变的，一般使用字符串作为字典中的key，也可以使用数字、元组等不可变类型的值

key是唯一的 如果有多个相同的key的情况，保留key最后一次对应的值

字典中存储的数据没有顺序

定义字典

```python
dict_1={
  'name':'zhangsan',
  'age':22,
  'phone':110,
  'sex':'男'
}
dict2=dict.copy() #克隆字典，即另一个拷贝。
```

根据key取出字典中的值

```python
name=dict_1['name']
```

添加/修改数据

```python
//如果key不存在则直接添加数据，如果key存在则修改数据
dict_1['name']='lisi'
dict_1['sss']='4s'
```

删除字典元素

```python
del dict['Name']  # 删除键是'Name'的条目
dict.clear()      # 清空字典所有条目
del dict 
```

获取所有key

```python
keys=dict_1.keys()
```

获取所有value

```python
values=dict_1.values()
#for循环 取出所有的value
for value in values:
    print(value)
```

获取所有键值对

```python
items=dict_1.items()
#for循环遍历items
for item in items:
    # print(item)
    #从元组中 根据索引取出数据
    key=item[0]
    value=item[1]
    print('键：%s值：%s'%(key,value))
```

判断字典中是否有某个key

```python
#python2中 有has_key函数，可以直接调用
dict_1.has_key(key)
if 'phone' in dict_1.keys():
    print('有这个key')
else:
    print('没有这个key')
```



其他方法

比较两个字典元素：cmp(dict1,dict2)

计算字典元素个数：len(dict)

输出字典可打印的字符串表示: str(dict)

返回输入的变量类型，如果变量是字典就返回字典类型:type(variable)

## self参数

python规定不管是构造方法还是实例方法最少要包含一个参数，于是约定俗成self，self指向类自身，对象可以通过self调用类里的方法

函数调用self也表示调用自身



## 进程与线程

Python既支持多进程又支持多线程，因此使用Python实现并发编程主要有3种方式：多进程、多线程、多进程+多线程。

Unix和Linux操作系统上提供了`fork()`系统调用来创建进程，调用`fork()`函数的是父进程，创建出的是子进程，子进程是父进程的一个拷贝，但是子进程拥有自己的PID。`fork()`函数非常特殊它会返回两次，父进程中可以通过`fork()`函数的返回值得到子进程的PID，而子进程中的返回值永远都是0。Python的os模块提供了`fork()`函数。由于Windows系统没有`fork()`调用，因此要实现跨平台的多进程编程，可以使用multiprocessing模块的`Process`类来创建子进程，而且该模块还提供了更高级的封装，例如批量启动进程的进程池（`Pool`）、用于进程间通信的队列（`Queue`）和管道（`Pipe`）等。

```python
import threading

```



## 多继承



## 网络

### request库

requests是一个基于HTTP协议来使用网络的第三库，其[官方网站](http://cn.python-requests.org/zh_CN/latest/)有这样的一句介绍它的话：“Requests是唯一的一个**非转基因**的Python HTTP库，人类可以安全享用。”简单的说，使用requests库可以非常方便的使用HTTP，避免安全缺陷、冗余代码以及“重复发明轮子”（行业黑话，通常用在软件工程领域表示重新创造一个已有的或是早已被优化過的基本方法）。前面的文章中我们已经使用过这个库，下面我们还是通过requests来实现一个访问网络数据接口并从中获取美女图片下载链接然后下载美女图片到本地的例子程序，程序中使用了[天行数据](https://www.tianapi.com/)提供的网络API。

我们可以先通过pip安装requests及其依赖库。

```powershell
pip install requests
```



### 发送短信与邮件

在即时通信软件如此发达的今天，电子邮件仍然是互联网上使用最为广泛的应用之一，公司向应聘者发出录用通知、网站向用户发送一个激活账号的链接、银行向客户推广它们的理财产品等几乎都是通过电子邮件来完成的，而这些任务应该都是由程序自动完成的。

就像我们可以用HTTP（超文本传输协议）来访问一个网站一样，发送邮件要使用SMTP（简单邮件传输协议），SMTP也是一个建立在TCP（传输控制协议）提供的可靠数据传输服务的基础上的应用级协议，它规定了邮件的发送者如何跟发送邮件的服务器进行通信的细节，而Python中的smtplib模块将这些操作简化成了几个简单的函数。

```python
from smtplib import SMTP
from email.header import Header
from email.mime.text import MIMEText


def main():
    # 请自行修改下面的邮件发送者和接收者
    sender = 'abcdefg@126.com'
    receivers = ['uvwxyz@qq.com', 'uvwxyz@126.com']
    message = MIMEText('用Python发送邮件的示例代码.', 'plain', 'utf-8')
    message['From'] = Header('王大锤', 'utf-8')
    message['To'] = Header('骆昊', 'utf-8')
    message['Subject'] = Header('示例代码实验邮件', 'utf-8')
    smtper = SMTP('smtp.126.com')
    # 请自行修改下面的登录口令
    smtper.login(sender, 'secretpass')
    smtper.sendmail(sender, receivers, message.as_string())
    print('邮件发送完成!')


if __name__ == '__main__':
    main()
```

对于有附件的邮件，

```python
from smtplib import SMTP
from email.header import Header
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart

import urllib


def main():
    # 创建一个带附件的邮件消息对象
    message = MIMEMultipart()
    
    # 创建文本内容
    text_content = MIMEText('附件中有本月数据请查收', 'plain', 'utf-8')
    message['Subject'] = Header('本月数据', 'utf-8')
    # 将文本内容添加到邮件消息对象中
    message.attach(text_content)

    # 读取文件并将文件作为附件添加到邮件消息对象中
    with open('/Users/Hao/Desktop/hello.txt', 'rb') as f:
        txt = MIMEText(f.read(), 'base64', 'utf-8')
        txt['Content-Type'] = 'text/plain'
        txt['Content-Disposition'] = 'attachment; filename=hello.txt'
        message.attach(txt)
    # 读取文件并将文件作为附件添加到邮件消息对象中
    with open('/Users/Hao/Desktop/汇总数据.xlsx', 'rb') as f:
        xls = MIMEText(f.read(), 'base64', 'utf-8')
        xls['Content-Type'] = 'application/vnd.ms-excel'
        xls['Content-Disposition'] = 'attachment; filename=month-data.xlsx'
        message.attach(xls)
    
    # 创建SMTP对象
    smtper = SMTP('smtp.126.com')
    # 开启安全连接
    # smtper.starttls()
    sender = 'abcdefg@126.com'
    receivers = ['uvwxyz@qq.com']
    # 登录到SMTP服务器
    # 请注意此处不是使用密码而是邮件客户端授权码进行登录
    # 对此有疑问的读者可以联系自己使用的邮件服务器客服
    smtper.login(sender, 'secretpass')
    # 发送邮件
    smtper.sendmail(sender, receivers, message.as_string())
    # 与邮件服务器断开连接
    smtper.quit()
    print('发送完成!')


if __name__ == '__main__':
    main()
```

发送短信也是项目中常见的功能，网站的注册码、验证码、营销信息基本上都是通过短信来发送给用户的。在下面的代码中我们使用了[互亿无线](http://www.ihuyi.com/)短信平台（该平台为注册用户提供了50条免费短信以及常用开发语言发送短信的demo，可以登录该网站并在用户自服务页面中对短信进行配置）提供的API接口实现了发送短信的服务，当然国内的短信平台很多，读者可以根据自己的需要进行选择（通常会考虑费用预算、短信达到率、使用的难易程度等指标），如果需要在商业项目中使用短信服务建议购买短信平台提供的套餐服务。

```python
import urllib.parse
import http.client
import json


def main():
    host  = "106.ihuyi.com"
    sms_send_uri = "/webservice/sms.php?method=Submit"
    # 下面的参数需要填入自己注册的账号和对应的密码
    params = urllib.parse.urlencode({'account': '你自己的账号', 'password' : '你自己的密码', 'content': '您的验证码是：147258。请不要把验证码泄露给其他人。', 'mobile': '接收者的手机号', 'format':'json' })
    print(params)
    headers = {'Content-type': 'application/x-www-form-urlencoded', 'Accept': 'text/plain'}
    conn = http.client.HTTPConnection(host, port=80, timeout=30)
    conn.request('POST', sms_send_uri, params, headers)
    response = conn.getresponse()
    response_str = response.read()
    jsonstr = response_str.decode('utf-8')
    print(json.loads(jsonstr))
    conn.close()


if __name__ == '__main__':
    main()
```

## 读写word和excel





## 定义链表

https://blog.csdn.net/Tonywu2018/article/details/88853533

定义单链表类

```python
class Node(object)
        def _init_(sef,data,next = None):
               self.data = data
               self.next = next
```



实例化节点对象

```python

```



## Django入门

### Django版本与python版本对应关系

| Django版本 | Python版本                                |
| ---------- | ----------------------------------------- |
| 1.8        | 2.7、3.2、3.3、3.4、3.5                   |
| 1.9、1.10  | 2.7、3.4、3.5                             |
| 1.11       | 2.7、3.4、3.5、3.6、3.7（Django 1.11.17） |
| 2.0        | 3.4、3.5、3.6、3.7                        |
| 2.1        | 3.5、3.6、3.7                             |
| 2.2        | 3.5、3.6、3.7、3.8（Django 2.2.8）        |
| 3.0        | 3.6、3.7、3.8                             |

### 创建应用

执行命令

```powershell
python manage.py startapp first
```



### DRF

在Django项目中，如果要实现REST架构，即将网站的资源发布成REST风格的API接口，可以使用著名的三方库`djangorestframework` ，我们通常将其简称为DRF。

安装DRF

```shell
pip install djangorestframework
```

配置DRF

```python
INSTALLED_APPS = [
    'rest_framework',
]

# 下面的配置根据项目需要进行设置
REST_FRAMEWORK = {
    # 配置默认页面大小
    # 'PAGE_SIZE': 10,
    # 配置默认的分页类
    # 'DEFAULT_PAGINATION_CLASS': '...',
    # 配置异常处理器
    # 'EXCEPTION_HANDLER': '...',
    # 配置默认解析器
    # 'DEFAULT_PARSER_CLASSES': (
    #     'rest_framework.parsers.JSONParser',
    #     'rest_framework.parsers.FormParser',
    #     'rest_framework.parsers.MultiPartParser',
    # ),
    # 配置默认限流类
    # 'DEFAULT_THROTTLE_CLASSES': (
    #     '...'
    # ),
    # 配置默认授权类
    # 'DEFAULT_PERMISSION_CLASSES': (
    #     '...',
    # ),
    # 配置默认认证类
    # 'DEFAULT_AUTHENTICATION_CLASSES': (
    #     '...',
    # ),
}
```



### JWT

用三方库`PyJWT`生成和验证JWT，下面是安装`PyJWT`的命令。

```shell
pip install pyjwt
```

生成令牌

```shell
payload = {
    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
    'userid': 10001
}
token = jwt.encode(payload, settings.SECRET_KEY).decode()
```

验证令牌

```python
try:
    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ4NzIzOTEsInVzZXJpZCI6MTAwMDF9.FM-bNxemWLqQQBIsRVvc4gq71y42I9m2zt5nlFxNHUo'
    payload = jwt.decode(token, settings.SECRET_KEY)
except InvalidTokenError:
    raise AuthenticationFailed('无效的令牌或令牌已经过期')
```



### 中间件



### session与cookie

在创建Django项目时，默认的配置文件`settings.py`文件中已经激活了一个名为`SessionMiddleware`的中间件（关于中间件的知识我们在后面的章节做详细讲解，这里只需要知道它的存在即可），因为这个中间件的存在，我们可以直接通过请求对象的`session`属性来操作会话对象。前面我们说过，`session`属性是一个像字典一样可以读写数据的容器对象，因此我们可以使用“键值对”的方式来保留用户数据。与此同时，`SessionMiddleware`中间件还封装了对cookie的操作，在cookie中保存了sessionid，这一点我们在上面已经提到过了。

在默认情况下，Django将session的数据序列化后保存在关系型数据库中，在Django 1.6以后的版本中，默认的序列化数据的方式是JSON序列化，而在此之前一直使用Pickle序列化。JSON序列化和Pickle序列化的差别在于前者将对象序列化为字符串（字符形式），而后者将对象序列化为字节串（二进制形式），因为安全方面的原因，JSON序列化成为了目前Django框架默认序列化数据的方式，这就要求在我们保存在session中的数据必须是能够JSON序列化的，否则就会引发异常。还有一点需要说明的是，使用关系型数据库保存session中的数据在大多数时候并不是最好的选择，因为数据库可能会承受巨大的压力而成为系统性能的瓶颈，在后面的章节中我们会告诉大家如何将session保存到缓存服务中以提升系统的性能。



## Redis

通常情况下，Web应用的性能瓶颈都会出现在关系型数据库上，当并发访问量较大时，如果所有的请求都需要通过关系型数据库完成数据持久化操作，那么数据库一定会不堪重负。优化Web应用性能最为重要的一点就是使用缓存，就是把哪些数据体量不大但访问频率非常高的数据提前加载到缓存服务器中，这又是典型的空间换时间的方法。通常缓存服务器都是直接将数据置于内存中而且使用了非常高效的数据存取策略（例如：键值对方式），在读写性能上是远远优于传统的关系型数据库的，因此我们可以让Web应用接入缓存服务器来优化其性能，一个非常好的选择就是使用Redis。



## 大数据

https://blog.csdn.net/wally21st/article/details/77688755?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param





## 瘦脸算法

自动瘦脸与眼睛放大可以算作图像局部扭曲算法的一个应用，

大概流程如下：

1.使用dlib检测出人脸关键点

2.使用Interactive Image Warping 局部平移算法实现瘦脸

```python
import dlib
import cv2
import numpy as np
import math
predictor_path='shape_predictor_68_face_landmarks.dat'
 
#使用dlib自带的frontal_face_detector作为我们的特征提取器
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(predictor_path)

def landmark_dec_dlib_fun(img_src):
    img_gray = cv2.cvtColor(img_src,cv2.COLOR_BGR2GRAY)
 
    land_marks = []
 
    rects = detector(img_gray,0)
 
    for i in range(len(rects)):
        land_marks_node = np.matrix([[p.x,p.y] for p in predictor(img_gray,rects[i]).parts()])
        # for idx,point in enumerate(land_marks_node):
        #     # 68点坐标
        #     pos = (point[0,0],point[0,1])
        #     print(idx,pos)
        #     # 利用cv2.circle给每个特征点画一个圈，共68个
        #     cv2.circle(img_src, pos, 5, color=(0, 255, 0))
        #     # 利用cv2.putText输出1-68
        #     font = cv2.FONT_HERSHEY_SIMPLEX
        #     cv2.putText(img_src, str(idx + 1), pos, font, 0.8, (0, 0, 255), 1, cv2.LINE_AA)
        land_marks.append(land_marks_node)
 
    return land_marks
'''
方法： Interactive Image Warping 局部平移算法
'''
 
 
def localTranslationWarp(srcImg,startX,startY,endX,endY,radius):
 
    ddradius = float(radius * radius)
    copyImg = np.zeros(srcImg.shape, np.uint8)
    copyImg = srcImg.copy()
 
    # 计算公式中的|m-c|^2
    ddmc = (endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)
    H, W, C = srcImg.shape
    for i in range(W):
        for j in range(H):
            #计算该点是否在形变圆的范围之内
            #优化，第一步，直接判断是会在（startX,startY)的矩阵框中
            if math.fabs(i-startX)>radius and math.fabs(j-startY)>radius:
                continue
 
            distance = ( i - startX ) * ( i - startX) + ( j - startY ) * ( j - startY )
 
            if(distance < ddradius):
                #计算出（i,j）坐标的原坐标
                #计算公式中右边平方号里的部分
                ratio=(  ddradius-distance ) / ( ddradius - distance + ddmc)
                ratio = ratio * ratio
 
                #映射原位置
                UX = i - ratio  * ( endX - startX )
                UY = j - ratio  * ( endY - startY )
 
                #根据双线性插值法得到UX，UY的值
                value = BilinearInsert(srcImg,UX,UY)
                #改变当前 i ，j的值
                copyImg[j,i] =value
 
    return copyImg

#双线性插值法
def BilinearInsert(src,ux,uy):
    w,h,c = src.shape
    if c == 3:
        x1=int(ux)
        x2=x1+1
        y1=int(uy)
        y2=y1+1
 
        part1=src[y1,x1].astype(np.float)*(float(x2)-ux)*(float(y2)-uy)
        part2=src[y1,x2].astype(np.float)*(ux-float(x1))*(float(y2)-uy)
        part3=src[y2,x1].astype(np.float) * (float(x2) - ux)*(uy-float(y1))
        part4 = src[y2,x2].astype(np.float) * (ux-float(x1)) * (uy - float(y1))
 
        insertValue=part1+part2+part3+part4
        return insertValue.astype(np.int8)

def face_thin_auto(src):
 
    landmarks = landmark_dec_dlib_fun(src)
 
    #如果未检测到人脸关键点，就不进行瘦脸
    if len(landmarks) == 0:
        return
 
    for landmarks_node in landmarks:
        left_landmark= landmarks_node[3]
        left_landmark_down=landmarks_node[5]
 
        right_landmark = landmarks_node[13]
        right_landmark_down = landmarks_node[15]
 
        endPt = landmarks_node[30]
 
 
        #计算第4个点到第6个点的距离作为瘦脸距离
        r_left=math.sqrt((left_landmark[0,0]-left_landmark_down[0,0])*(left_landmark[0,0]-left_landmark_down[0,0])+
                         (left_landmark[0,1] - left_landmark_down[0,1]) * (left_landmark[0,1] - left_landmark_down[0, 1]))
 
        # 计算第14个点到第16个点的距离作为瘦脸距离
        r_right=math.sqrt((right_landmark[0,0]-right_landmark_down[0,0])*(right_landmark[0,0]-right_landmark_down[0,0])+
                         (right_landmark[0,1] -right_landmark_down[0,1]) * (right_landmark[0,1] -right_landmark_down[0, 1]))
 
        #瘦左边脸
        thin_image = localTranslationWarp(src,left_landmark[0,0],left_landmark[0,1],endPt[0,0],endPt[0,1],r_left)
        #瘦右边脸
        thin_image = localTranslationWarp(thin_image, right_landmark[0,0], right_landmark[0,1], endPt[0,0],endPt[0,1], r_right)
 
    #显示
    cv2.imshow('thin',thin_image)
    cv2.imwrite('thin.jpg',thin_image)

def main():
    src = cv2.imread('timg4.jpg')
    cv2.imshow('src', src)
    face_thin_auto(src)
    cv2.waitKey(0)
 
if __name__ == '__main__':
    main()
```



人脸老化

- 制作皱纹、斑点纹理图,并且手动标定纹理图的关键点
- 头发分割，根据年纪改变发色
- 检测人脸关键点，通过关键点对纹理图进行形变
- 纹理图与原图进行叠加、融合

https://blog.csdn.net/danffer1985/article/details/54602585?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param

