---
title: Git使用技巧
date: 2020-06-18 21:40:33
categories: 技术博客
tags:
    - IT，Github
thumbnail: http://cdn.kunkunzhang.top/git-logo.jpg
---

　　Git是最常用的版本管理工具，利于协同开发

​        原来的标题是Github使用技巧，但是后来开发之后发现github和gitlab都是基于Git，因此改为Git

<!--more-->

## 多人协同开发流程

​        一般在开发产品适合，通常挑选一个分支作为可以上线的正式版本分支，比如master或者release，develop是用来开发的，可能带有bug。 当很多人参与同一个项目的时候，如果给每个人都有Commit到master和release分支的权c限是非常不合理的。这个时候，就可以使用Fork + PR/MR的方式来实现多人协作开发。 每个开发者先Fork一份代码到自己的账号下，功能完成后发PR给项目管理者，项目管理者Code Review后确认无误后即可进行Merge操作，这样协作开发效率高，问题少。

## 安装Git

windows端

下载git工具，`[这里是链接](https://git-scm.com/downloads)`，选择适合自己的版本进行安装。

mac端

苹果电脑自带Git。

linux

以centos为例

下载git源代码压缩文件

```shell
wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.23.0.tar.xz
```

解压缩和解归档

```shell
xz -d git-2.23.0.tar.xz
tar -xvf git-2.23.0.tar
```

安装底层依赖库

```shell
yum -y install libcurl-devel
```

构建和安装

```shell
make && make install
```

## Git本地设置　　

Windows新安装Git需要设置github账户。Mac默认没有修改的情况mac使用icloud账户登录系统，提交时会提示`Your name and email address were configured automatically based on your username and hostname. Please check that they are accurate`.也需要将提交用户改为github账户。

windows在cmd窗口输入命令，mac在终端输入。

方式一：直接设置自己的用户名和邮箱

```git
$ git config --global user.name "coliyin@163.com"
$ git config --global user.email "coliyin@163.com"
```

设置SSHkey

方式二：修改配置文件

在终端输入

```
git config --global --edit
```

然后会进入vi修改配置文件，将name=和email=之后的内容修改为自己的用户名和邮箱。记得将首列的#号去掉。

修改完后渐入命令使配置生效

```git
git commit --amend --reset-author
```

也可以按照windows设置，最后使其

**通常来说，本地的Git只能建议只有一个版本，否则提交代码或者pr时会显示多个账号，会造成混乱**

### 邮箱

邮箱是GitHub验证账户的重要标识，包括SSH key的生成。所以一般入职公司之后，如果使用GitHub都会要求改成公司的，所以更换邮箱之后都要重新生成一次public key,直接使用原来的会报错，像这样子

```shell
fatal: unable to access 'https://github.com/Kun8018/Kun8018.github.io.git/': LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 
```

在本地环境执行

```shell
ssh-keygen -t rsa -b 4096 -C "your-github@email.com"
```

然后找到对应的ssh key

```shell
cd .ssh
cd ~/.ssh
```

查看key中的内容

```shell
cat id_rsa.pub
```

复制输出并且在GitHub常见ssh key

在GitHub。account -> settings -> create a SSH and GPG keys，把本地的key粘贴进去就好

现在已经可以运行了，可以在本地验证一下

```shell
ssh -vT git@github.com
```

输出是这样就代表可以

```shell
debug1: channel 0: free: client-session, nchannels 1
Transferred: sent 3848, received 2040 bytes, in 0.2 seconds
Bytes per second: sent 16032.4, received 8499.5
debug1: Exit status 1
```



## 从远程仓库拉取项目

GitHub可以使用http和ssh两种方式获取代码

https比较简单，但是每次fetch和push都需要账号密码

sshfetch和push不需要在输入账号密码：

```git
ssh-keygen -t rsa -b 4096 -C "1027690173@qq.com"
```

会请求你输入文件名和设置密码，可以不设置直接enter跳过，文件名为默认id_rsa，密码默认为空

在.ssh下查看文件，有id_rsa或id_dsa命名的文件即是，后缀为.pub的是公钥，没有的是私钥

```git
cd ~/.ssh
ls
```



运行ssh-agent

```git
eval "$(ssh-agent -s)"
```



```git
Host * IdentityFile ~/.ssh/id_rsa
```



添加ssh key到github或gitlab

复制公钥

```git
pbcopy < ~/.ssh/id_rsa.pub
```

粘贴到github ssh-key或者gitlab

首次下载项目

```git
git clone 
```

获取远程修改到本地

```git
git  git@github.com:anyangxaut/LearnGit.git
```

## 基本操作

将文件夹变成git仓库

```shell
git init 
```

当你完成了上述操作后，本地目录就变成了工作区（正在操作的工作目录）、仓库和工作区和本地仓库之间的暂存区（也称为缓存区）。

通过`git add`可以将指定的文件或所有文件添加到暂存区。

```shell
git add <file>
git add .
```

如果不希望将文件添加到暂存区，可以按照提示，使用`git rm --cached <file>`命令将文件从暂存区放回到工作区。

如果这个时候对工作区的文件又进行了修改使得工作区和暂存区的内容并不相同了，再次执行`git status`可以看到哪个或哪些文件被修改了，如果希望用暂存区的内容恢复工作区，可以使用下面的命令。

```shell
git restore <file>
git restore .
```

通过下面的命令可以将暂存区的内容纳入本地仓库，

```shell
git commit -m '本次提交的说明'
```

提交commit可以直接关联issue，在issue下面可以直接显示关联的commit代码

```shell
git commit -m '说明 #issue链接'
```

在pr的comment中添加issue的链接可以关联pr与issue，当pr被合并时issue会被自动关闭

如果提交之后才发现之前的修改少了一些内容，回到过去，修改上一次提交的那个文件。如此一来，你的commit记录只会有一条。对于一些有代码洁癖并且看中git commit记录的程序员，这点很重要

执行`git commit --amend --no-edit`之后，hash值由`c56f680`变成了`eb6c8cb`，但是message内容并没有发生变化，并且最重要的是只有一条commit记录。

如果要修改上一条的message，那么去掉`--no-edit`选项即可，`git commit --amend -m "xxxx"`。同理，commit记录同样只会有一条。

可以通过`git log`查看每次提交对应的日志。

```shell
git log
git log --graph --oneline --abbrev-commit
```

gitlog不能显示已经删除的commit记录，需要查看时使用git reflog命令

```shell
git reflog
```

reflog可以显示所有分支的操作记录，包括已经删除的commit，要回复已经删除的commit使用cherry-pick

```shell
git cherru-pick 4c97ff3
```

## 远程操作

添加远程仓库（Git服务器）

```shell
git remote add origin git@gitee.com:jackfrued/python.git
```

从远程仓库取回代码。

```shell
git pull origin master
```

将本地代码（工作成果）推送到远程仓库。

```shell
git push -u origin master:master
```

删除远程分支

执行此命令时慎重操作

```shell
git branch -r -d origin/develop
git push origin :develop

git push origin --delete develop
```

## 分支

创建分支

```shell
git branch <branch-name>
```

切换分支

```shell
git switch <branch-name>
```

分支合并

在`dev`分支上完成开发任务之后，如果希望将`dev`分支上的成果合并到`master`，可以先切回到`master`分支然后使用`git merge`来做分支合并，合并的结果如下图右上方所示。

```shell
git switch master
git merge --no-ff dev
```

在合并分支时，没有冲突的部分Git会做自动合并。如果发生了冲突（如`dev`和`master`分支上都修改了同一个文件），会看到`CONFLICT (content): Merge conflict in <filename>. Automatic merge failed; fix conflicts and then commit the result`（自动合并失败，修复冲突之后再次提交）的提示，这个时候我们可以用`git diff`来查看产生冲突的内容。解决冲突通常需要当事人当面沟通之后才能决定保留谁的版本，冲突解决后需要重新提交代码。

删除分支

如果分支上的工作成果还没有合并，那么在删除分支时会看到`error: The branch '<branch-name>' is not fully merged.`这样的错误提示。如果希望强行删除分支，可以使用`-D`参数。

```shell
git branch -d <branch-name>
error: The branch '<branch-name>' is not fully merged.
If you are sure you want to delete it, run 'git branch -D <branch-name>'.
git branch -D <branch-name>
```

分支变基

分支合并操作可以将多个分支上的工作成果最终合并到一个分支上，但是再多次合并操作之后，分支可能会变得非常的混乱和复杂，为了解决这个问题，可以使用`git rebase`操作来实现分支变基。

```shell
git rebase master
git switch master
git merge dev
```

关联远程分支

如果当前所在的分支还没有关联到远程分支，可以使用下面的命令为它们建立关联。

```shell
git branch --set-upstream-to origin/develop
```

也可以指定别的分支关联到远程分支

```shell
git branch --set-upstream-to origin/develop <branch-name>
```

也创建分支时使用了`--track`参数，直接指定与本地分支关联的远程分支

```shell
git branch --track <branch-name> origin/develop
```

解除关联远程分支

```shell
git branch --track <branch-name> origin/develop
```

### rebase、squash与merge的区别

rebase可以尽可能保持master分支干净，并且易于识别author

squash也可以保持master分支干净，但是master中author都是maintainer，而不是原owner

merge不能保持master分支干净，但是保持了所有的commit history，大多数情况下都是不好的，个别情况好



## 子模块submodule

当你在一个git项目上工作时，你需要在其中使用另一个Git项目。也许它是一个第三方开发的库或者是你独立开发合并在多个父项目中使用。

在git中可以用子模块submodule来管理这些项目，submodule允许你将一个git仓库当作另外一个git仓库的子目录，这允许你克隆另外一个仓库到你的项目中并且保持你的提交相对独立

克隆含有子模块的项目

克隆含有子模块的项目可以先克隆父项目，再更新子模块，另一种是直接递归克隆整个项目

先克隆父项目，再更新子模块

```shell
git clone https://.../.git assets
```

此时子模块子模块还未初始化

初始化子模块

```shell
git submodule init
```

更新子模块

```shell
git submodule update
```

直接递归克隆整个项目

```shell
git clone https://.../.git assets --recursive
```

添加子模块

```shell
git submodule add https://.../.git assets
```

查看子模块

```shell
git status
git submodule
```

更新子模块

```shell
## 更新项目内子模块到最新版本
git submodule update
## 更新子模块为远程项目的最新版本
git submodule update --remote
## 更新所有子模块
git submodule foreach git pull
```

修改子模块

在子模块中修改文件后，直接提交到远程项目分支

```shell
git add .
git ci -m "commit"
git push origin HEAD:master
```

删除子模块

删除子模块比较麻烦，需要手动删除相关的文件，否则在添加子模块时有可能出现错误。

首先删除子模块文件夹

```shell
git rm --cached assets
rm -rf assets
```

删除相关子模块信息

```shell
[submodule "assets"]
	path = assets
	url = https://github.com/../.git
```

删除相关子模块信息

```shell
[submodule "assets"]
	url = https://github.com/../.git
```

删除相关子模块文件

```shell
rm -rf ./git/modules/assets
```

## 子仓库subtree

与submodule的异同

git submodule:

允许其他仓库指定以一个commit嵌入仓库的子目录

仓库clone下来要init和update

会产生文件记录和submodule版本信息

git submodule删除起来比较费劲

git subtree：

避免以上问题

管理和更新流程比较方便

git subtree合并子仓库到项目中的子目录，不用像submodule一样每次子目录修改之后都要init和update，万一每次没update就直接add，将

git 1.5之后建议使用git submodule

使用方法

如果p1项目和p2项目共用S项目

添加subtree

```shell
git subtree add --prefix=<s project path>  <s project url> <branch> --squash
```

修改代码，可以改subtree里面的代码，添加相关commit

pull&push

```shell
git subtree pull --prefix=<s project path>  <s project url> <branch> --squash
git subtree push --prefix=<s project path>  <s project url> <branch> --squash
```

拆分已有项目,比如P项目拆分出s项目

```shell
git subtree split -P <S project path> -b <tmp branch>
```

git会遍历所有commit，分离与S项目有关的commit，并存入临时分支branch中

创建子repo

```shell
mkdir 
cd s new path
git init
git pull <S project path> <tmp branch>
git remote add origin <S github>
git push origin -u master
```

清理原项目中的子项目数据

```shell
cd P project
git rm -rf 
git commit -m
git branch -D 
```

在新项目中添加subtree

```shell
git subtree add --prefix=<s project path>  <s project url> <branch> --squash
git push origin master
```



## 其他操作

`git fetch`：下载远程仓库的所有变动，可以将远程仓库下载到一个临时分支，然后再根据需要进行合并操作，`git fetch`命令和`git merge`命令可以看作是之前讲的`git pull`命令的分解动作。

```shell
git fetch origin master:temp
git merge temp
```

`git push -f`：强制提交，完全以自己的提交为准，之前其他人的提交都会被覆盖，适用于pr被block之后重新提交，提交后不需要重新提pr.

`git rebase dev`：解决合并冲突。rebase之后如果有冲突，会进入临时变基分支，手动消除冲突之后在rebase

`git checkou branch`: 切换分支

`git checkou -b｜B branch`: 创建新分支并切换到该分支

`git checkout -- a.txt` ： 将文件迁出修改到上一次提交的内容

`git checkout commit_id -- a.txt` ： 将文件迁出修改到指定的提交历史中某次提交的内容

`git checkout branch -- a.txt `：将文件迁出修改到指定分支的该文件的内容

`git checkout -- *.txt`将根目录下所有指定后缀的文件都迁出

`git checkout -- *.txt`将根目录下所有指定目录的文件都迁出

`git diff`：常用于比较工作区和仓库、暂存区与仓库、两个分支之间有什么差别。

`git diff --cached`：查看有add但没有commit的改动

`git diff HEAD`:是上面两条命令的合并

`git stash`：将当前工作区和暂存区发生的变动放到一个临时的区域，让工作区变干净。这个命令适用于手头工作还没有提交，但是突然有一个更为紧急的任务（如线上bug需要修正）需要去处理的场景。

```shell
git stash ## 保存当前的工作进度，会把暂存区和工作区的改动保存起来，使用git stash sava ‘message’ 添加一些注释
git stash list ## 显示保存进度的列表，git stash可以执行多次
## 通过git stash pop命令恢复进度后，会删除当前进度。
git stash pop ## 恢复最新的进度到工作区，git默认会把工作区和暂存区的改动都恢复到工作区
git stash pop --index ## 恢复最新的进度到工作区和暂存区
git stash pop stash@{1} ## 恢复指定的进度到工作区，stash_id为通过git stash list命令得到的
git stash apply ##恢复最新的进度到工作区，除了不删除恢复的进度外，其他和git stash pop命令一样
git stash drop [stash_id] ## 删除一个存储的进度，如果不执行stash_id则默认保存最新的存储进度
git stash clear ## 删除所有存储进度
```

`git reset`：回退到指定的版本。

`git revert`：撤回提交信息。

`git cherry-pick`：挑选某个分支的提交并作为一个新的提交引入到你当前分支上。

默认cherry-pick只挑选单次的commit，如果想转移多个commit，使用命令git cherry-pick commitid1...commitid100

...命令默认不包含第一个commit id，如果你想包含第一个commit，也就是闭区间，使用git cherry-pick A^...B

Cherry-pick的过程中如果有冲突，需要先修改冲突文件，再git add .，然后继续执行git cherry-pick --continue

在任何阶段都可以执行`git cherry-pick --abort`放弃本次cherry-pick

`git tag`：经常用于查看或新增一个标签。

`git rebase`：分支变基，多用于合并commit和重新合并master分支的代码

如果一次开发提交过多commit，会有很多弊端：

1.不利于代码review：如果做一个很小的功能有很多commit，会很多。

2.会造成分支污染：如果项目充满了无用的commit，有一天项目出现紧急问题需要回滚代码，却发现海量commit，会很崩溃

合并最近四次commit

```shell
git rebase -i HEAD~4
```

rebase之后进入vim模式，把不需要的commit前面的pick改为squash就可以

合并其他分支

每次开发完都要先在master分支下拉取别的同事的远程代码，然后当前分支对master分支进行合并才不会冲突

具体操作

```shell
git:(feature1):git rebase master
```

执行命令后：

首先git会把feature1分支里面的每个commit取消掉

然后把上面的操作临时保存成一个patch文件，存在`.git/rebase`目录下

然后把feature1分支更新到最新的master分支下

最后把上面保存的patch文件应用到feature1分支上

出现冲突时需要先解决冲突，然后执行命令

```shell
git add .
git rebase --continue
```

在任何时候都可以随时取消rebase操作

```shell
git rebase --abort
```

`git alias`可以配置命令的别名，简化命令

```shell
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch

git ci -m "commit message"
```

查看文件修改历史

```shell
git log --follow -p 想要查看的文件
```



## worktree

在大型软件开发过程中可能经常需要维护一个古老的分支，比如三年前的分支，当然 git 允许你每个分支维护一个版本，但是切换 branch 的成本太高，尤其是当代码变动很大的时候，有可能改变了项目结构，甚至可能变更了 build system，如果切换 branch，IDE 可能需要花费大量的时间来重新索引和设置。

但是通过 worktree, 可以避免频繁的切换分支，将老的分支 checkout 到单独的文件夹中作为 worktree，每一个分支都可以有一个独立的 IDE 工程。当然像过去一样你也可以在磁盘上 clone 这个 repo 很多次，但这意味着很多硬盘空间的浪费，甚至需要在不同的仓库中拉取相同的变更很多次。

回到原来的问题，使用 git worktree 确实能够解决最上面提及的问题。

git worktree 的命令只有几行非常容易记住

```shell
git worktree add ../new-dir some-existing-branch
git worktree add [path] [branch]
```

这行命令将在 new-dir 目录中将 some-existing-branch 中的内容 check out 出来，就像在该目录中 clone 了一份新代码一样。新的文件地址可以在文件系统中的任何位置，但是注意千万不要将目录放到主仓库中。在此之后新目录中的内容就可以和主仓库中的内容一样，新建分支，push 到远端。

当工作结束后可以直接删除该目录，然后运行 `git worktree prune`.

git worktree 非常适合大型项目又需要维护多个分支，想要避免来回切换的情况，这里总结一些优点：

- git worktree 可以快速进行并行开发，同一个项目多个分支同时并行演进
- git worktree 的提交可以在同一个项目中共享
- git worktree 和单独 clone 项目相比，节省了硬盘空间，又因为 git worktree 使用 hard link 实现，要远远快于 clone

## pr与mr

合并代码的操作在github中叫pr，在gitlab中成为mr，本质上都是合并代码

GitHub pr

强制push之后pr不能重开



## Git Alias

开启zsh git plugin之后，会获得一群好用的git alias



## Gitflow

进入本地文件夹，打开Git bash,

执行指令进行初始化，会在原始文件夹中生成一个隐藏的文件夹.git

```node
rm -rf .git//删掉原来的.git目录
$ git init
```

将文件添加到本地仓库,运行命令：

```node
$ git add . 
```

输入本次提交说明

```node
$ git commit -m "layout"
```

将本地仓库与远程仓库相关联，

```git
$ git remote add origin https://github.com/CongliYin/CSS.git
```

如果出现错误：fatal: remote origin already exists，则执行以下语句：

```git
$ git remote rm origin
```

执行上传命令

```node
git push origin master
```

新建远程仓库需要添加-u参数

```git
git push -u origin master
```

如果出现错误failed to push som refs to…….，则执行以下语句，先把远程服务器github上面的文件拉先来，再push 上去。：

```node
$ git pull origin master
```

如果出现错误fatal: refusing to merge unrelated histories，后面加上--allow-unrelated-histories

```node
git pull origin master --allow-unrelated-histories
```

特别注意：执行命令后，git会弹出一个GitHub登陆的小界面，你登录成功后要求你输入用户名和密码。这里的密码并不是你的GitHub的密码或者本地git的密码。**而是GitHub的Personal access tokens**

https://github.com/settings/tokens

### 错误

GitHub pull之后有冲突



尚未完成合并(MERGE_HEAD存在)？

```shell
rm -rf .git/MERGE*
```

或者

```shell
git merge --quit
```



## Git Hooks



## 更新不了代码

代码加入本地仓库后，上传后显示everything -up-date，但是远程仓库没有更新

先创建新分支

```git
git branch newbranch
```

检查分支创建是否成功

```git
git branch
```

此时输出

```
* master
  newbranch
```

切换到新创建的分支

```git
git checkout newbranch
```

将改动提交到新分支

```git
git add .
git commit -a
```

回到主分支

```git
git checkout master
```



将新分支与原分支合并

```git
git merge newbranch 
```

正常合并没有冲突，如果产生冲突，查看冲突文件修改后再一次提交

```git
git diff
```

解决后就正常提交

```git
git push -u origin master
```

删除分支

```git
git branch -d newbranch
```



## 检查版本信息

查看远程仓库信息

```git
git remote -v
```



```git
git status
```

检查文件或者文件夹在工作区或暂存区的状态，有三种

文件已经从工作区add到暂存区，git restore --staged filename

文件在工作区、暂存区都有，并且在工作区进行了修改或删除，没有add到暂存区

git add file

文件只在工作区

```git
git checkout -- <file>
```

拉取暂存区文件为工作区文件

```git
git log
```

git log 会按提交时间列出所有的更新，最近的更新排在最上面

```git
git open
```

在git目录输入git open就能打开github对于的页面

```node
npm install -g git-open
```

将本地仓库文件撤回至工作区

```git
git reset --hard
git reser --mixed
```



```git
git revert HEAD
```



```git
git fetch origin
```

创建并更新远程分支，并拉取代码到origin，一般默认是master

git pull可以认为是git fetch和git merge的组合体

```git
git rebase origin/master
```



```git
git diff
```

git-diff能在命令行显示当前代码与上次提交时代码的修改，可以逐行见检查代码

## 代码检查

### js

使用husky

安装

```shell
npm install husky -D
```

编辑package。json 》 prepare 脚本并且运行

```shell
npm set-script prepare "husky install" 
npm run prepare
```

添加钩子函数

```shell
npx husky add .husky/pre-commit "npm test"
git add ./husky/pre-commit
```

然后提交commit就会检查

如果不想检查使用no-verify

```shell
git commit -m '' --no-verify
```



### 