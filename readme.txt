功能简介
蓝源进销存迷你版包括了产品采购、日常销售、库存出入库管理等功能为一体，是一个功能比较简洁的进销存系统，本源代码供广大的开源爱好者学习研究使用。
本系统涉及到的技术：Spring2.5及以上、JPA1.0及以上、 Hibernate 3.2及以上、 EasyJWeb 1.2及以上、ExtJS2.2及以上、LanyoRIA 1.0及以上。
初始用户名：admin 密码：admin


文件说明

1、db\mysql\lanyopss.sql：mysql数据库文件脚本。使用mysql -uroot -p  lanyopss< db\mysql\lanyopss.sql类似的命令可以导入初始数据。
2、src\main\webapp目录为WEB根目录；
3、src\main\java目录为系统的java源代码目录；
4、src\main\resources目录为资源文件。


安装说明
1、在tomcat的server.xml文件中设置作如下设置，确保docBase指向解压的webapp目录。

Context path="" docBase="D:\usr\lanyo-pss\trunk\code\src\main\webapp" />

2、修改WEB-INF\classes\db.properties文件中的数据库设置
database.password=你的数据库密码
database.username=你的数据库用户名

3、创建一个名为lanyopss的数据库，然后导入db\mysql\lanyopss.sql文件中的数据内容。

4、运行tomcat，在地址栏输入http://localhost:8080/即可进入系统。

安装说明可以参考视频。更多详情请登录www.lanyotech.com。
