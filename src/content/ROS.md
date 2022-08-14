---

title: ROS与机器人控制 
date: 2020-03-18 21:40:33
categories: 技术博客
tags:
    - 技术，Robotic，IT
toc: true
thumbnail: http://cdn.kunkunzhang.top/ros-logo.jpg
---

## 机器人控制

　　其实现在看起来，ROS并不难，不管是配置的文件，或者是编程语言都不是新的，只是把它们整合成一个机器人控制系统里。但是我当时要学习的东西很多，所处的环境特殊，自己又毫无心情，所以并没有深入学习，真是非常遗憾。



<!--more-->

## 操作系统

　　ROS的运行环境是Linux系统，我用过Ubuntu16.0，Debian9.0，不同版本系统下可运行的ROS版本不同。

​     ROS目前使用较多的版本是Melodic、Kinetic和Indigo，分别对应Ubuntu系统18.0、16.0、14.0。Indigo使用最多，最稳定，但是现在已经停止维护 和开发，因此本教程在Ubuntu16.0上安装  Kinetic。

## ROS安装

　    完整的教程其实在[ROS官网](ros.org)都有，本文旨在梳理

在Ubuntu下打开命令行窗口，

更新应用市场

```ROS
sudo apt-get update
```

安装ROS内核、rviz、2D/3D simulator、robot-generic libraries、navigation and 2D/3D perception

```ROS
sudo apt-get install ros-kinetic-desktop-full
```

安装ROS依赖包

```
sudo rosdep init
rosdep update
```

注：ROS自带python语言环境

安装

```
echo "source /opt/ros/kinetic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

创建工作空间

Workspace下一般有三个文件夹，src放源文件，build文件夹和devel文件夹是编译后生的文件夹。



catkin_init_workspace

catkin make   //编译目标文件，生成可执行文件

source  ~/catkin_ws/devel/setup.bash //刷新工作环境

#### ROS Master与Node

roscore

rosrun

#### 

#### Launch 文件

roslaunch  .launch

<node>

rostopic





<ros.h>

## URDF

标准标记语言文件，与xml语言类似

stl

##  SLAM 

　　

## MoveIt

　　



## Gazebo



