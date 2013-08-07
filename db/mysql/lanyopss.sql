-- MySQL dump 10.11
--
-- Host: localhost    Database: pps123
-- ------------------------------------------------------
-- Server version	5.0.67-community-nt

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hibernate_sequences`
--

DROP TABLE IF EXISTS `hibernate_sequences`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `hibernate_sequences` (
  `sequence_name` varchar(255) default NULL,
  `sequence_next_hi_value` int(11) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `hibernate_sequences`
--

LOCK TABLES `hibernate_sequences` WRITE;
/*!40000 ALTER TABLE `hibernate_sequences` DISABLE KEYS */;
INSERT INTO `hibernate_sequences` VALUES ('t_department',2),('t_userinfo',2),('t_personality',1),('t_systemmenu',5),('t_systemdictionary',4),('t_systemdictionarydetail',5),('t_productdir',2),('t_product',3),('t_client',2),('t_trole',1),('t_permissiongroup',1),('t_tpermission',1),('t_depot',1),('t_orderinfo',2),('t_orderinfoitem',2),('t_purchasebill',2),('t_purchasebillitem',2),('t_stockincome',3),('t_stockincomeitem',3),('t_stockoutcome',3),('t_stockoutcomeitem',3),('t_tresource',1);
/*!40000 ALTER TABLE `hibernate_sequences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_basecount`
--

DROP TABLE IF EXISTS `t_basecount`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_basecount` (
  `id` bigint(20) NOT NULL,
  `entityname` varchar(255) default NULL,
  `sequence` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_basecount`
--

LOCK TABLES `t_basecount` WRITE;
/*!40000 ALTER TABLE `t_basecount` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_basecount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_baseuiconfig`
--

DROP TABLE IF EXISTS `t_baseuiconfig`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_baseuiconfig` (
  `id` bigint(20) NOT NULL auto_increment,
  `title` varchar(255) default NULL,
  `appclass` varchar(255) default NULL,
  `scripts` varchar(255) default NULL,
  `parent_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK4F5CBE92219309A8` (`parent_id`),
  CONSTRAINT `FK4F5CBE92219309A8` FOREIGN KEY (`parent_id`) REFERENCES `t_baseuiconfig` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_baseuiconfig`
--

LOCK TABLES `t_baseuiconfig` WRITE;
/*!40000 ALTER TABLE `t_baseuiconfig` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_baseuiconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_cat`
--

DROP TABLE IF EXISTS `t_cat`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_cat` (
  `id` bigint(20) NOT NULL auto_increment,
  `name` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_cat`
--

LOCK TABLES `t_cat` WRITE;
/*!40000 ALTER TABLE `t_cat` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_cat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_chatroom`
--

DROP TABLE IF EXISTS `t_chatroom`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_chatroom` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) default NULL,
  `intro` varchar(255) default NULL,
  `announce` varchar(255) default NULL,
  `owner` varchar(255) default NULL,
  `maxuser` int(11) default NULL,
  `intervals` int(11) default NULL,
  `vrtype` varchar(255) default NULL,
  `vrvalue` varchar(255) default NULL,
  `teacher` varchar(255) default NULL,
  `begintime` datetime default NULL,
  `endtime` datetime default NULL,
  `talkmode` bit(1) default NULL,
  `status` int(11) default NULL,
  `inputtime` datetime default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_chatroom`
--

LOCK TABLES `t_chatroom` WRITE;
/*!40000 ALTER TABLE `t_chatroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_chatroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_client`
--

DROP TABLE IF EXISTS `t_client`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_client` (
  `DTYPE` varchar(31) default NULL,
  `id` bigint(20) NOT NULL,
  `sn` varchar(255) default NULL,
  `name` varchar(255) default NULL,
  `shortname` varchar(255) default NULL,
  `zip` varchar(255) default NULL,
  `fax` varchar(255) default NULL,
  `tel` varchar(255) default NULL,
  `address` varchar(255) default NULL,
  `linkman` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  `homepage` varchar(255) default NULL,
  `inputtime` datetime default NULL,
  `intro` varchar(255) default NULL,
  `status` int(11) default NULL,
  `assureamount` decimal(19,2) default NULL,
  `inputuser_id` bigint(20) default NULL,
  `source_id` bigint(20) default NULL,
  `seller_id` bigint(20) default NULL,
  `trade_id` bigint(20) default NULL,
  `types_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `sn` (`sn`),
  KEY `FK628B45F62A284B66` (`source_id`),
  KEY `FK628B45F6DB29517D` (`trade_id`),
  KEY `FK628B45F667221648` (`types_id`),
  KEY `FK628B45F67C6820AC` (`inputuser_id`),
  KEY `FK628B45F653607F82` (`seller_id`),
  CONSTRAINT `FK628B45F62A284B66` FOREIGN KEY (`source_id`) REFERENCES `t_systemdictionarydetail` (`id`),
  CONSTRAINT `FK628B45F653607F82` FOREIGN KEY (`seller_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FK628B45F667221648` FOREIGN KEY (`types_id`) REFERENCES `t_systemdictionarydetail` (`id`),
  CONSTRAINT `FK628B45F67C6820AC` FOREIGN KEY (`inputuser_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FK628B45F6DB29517D` FOREIGN KEY (`trade_id`) REFERENCES `t_systemdictionarydetail` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_client`
--

LOCK TABLES `t_client` WRITE;
/*!40000 ALTER TABLE `t_client` DISABLE KEYS */;
INSERT INTO `t_client` VALUES ('Client',1,'001','淘淘小店','',NULL,NULL,NULL,'浙江杭州',NULL,NULL,NULL,'2010-12-06 16:21:10',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',2,'002','onet凡兔','',NULL,NULL,NULL,'浙江杭州',NULL,NULL,NULL,'2010-12-06 16:23:10',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',3,'003','潮流服饰','',NULL,NULL,NULL,'江苏常熟',NULL,NULL,NULL,'2010-12-06 16:24:45',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',4,'004','金领世家','',NULL,NULL,NULL,'湖南郴州',NULL,NULL,NULL,'2010-12-06 16:25:17',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',5,'005','衣者有橱','',NULL,NULL,NULL,'广东广州',NULL,NULL,NULL,'2010-12-06 16:25:55',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',6,'006','时尚品牌','',NULL,NULL,NULL,'湖南郴州',NULL,NULL,NULL,'2010-12-06 16:26:21',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',7,'007','马莱特','',NULL,NULL,NULL,'福建泉州',NULL,NULL,NULL,'2010-12-06 16:26:50',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',8,'008','炫色英伦服饰','',NULL,NULL,NULL,'北京',NULL,NULL,NULL,'2010-12-06 16:30:48',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',9,'009','斯波帝卡','sportica',NULL,NULL,NULL,'福建厦门',NULL,NULL,NULL,'2010-12-06 16:31:48',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',10,'010','天赐亨通男装','',NULL,NULL,NULL,'北京',NULL,NULL,NULL,'2010-12-06 16:32:29',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',11,'011','時尚夜精靈','',NULL,NULL,NULL,'广东深圳',NULL,NULL,NULL,'2010-12-06 16:33:05',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',12,'012','卡锐仕旗舰店 ','',NULL,NULL,NULL,'福建石狮',NULL,NULL,NULL,'2010-12-06 16:34:24',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',13,'013','topwind','',NULL,NULL,NULL,'浙江杭州',NULL,NULL,NULL,'2010-12-06 16:35:09',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',14,'014','稻草人','',NULL,NULL,NULL,'江苏南京',NULL,NULL,NULL,'2010-12-06 16:36:00',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',15,'015','劲霸','',NULL,NULL,NULL,'湖南郴州',NULL,NULL,NULL,'2010-12-06 16:36:40',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',16,'016','衣品天成','',NULL,NULL,NULL,'浙江杭州',NULL,NULL,NULL,'2010-12-06 16:37:15',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',17,'017','西单男孩 ','',NULL,NULL,NULL,'福建泉州',NULL,NULL,NULL,'2010-12-06 16:38:00',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',18,'018','蒙瑞朋克','MRPK',NULL,NULL,NULL,'浙江杭州',NULL,NULL,NULL,'2010-12-06 16:39:13',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',19,'019','奥派阿西酷龙','',NULL,NULL,NULL,'湖北武汉',NULL,NULL,NULL,'2010-12-06 16:41:39',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',20,'020','one2one','',NULL,NULL,NULL,'上海',NULL,NULL,NULL,'2010-12-06 16:43:10',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',21,'021','虎都','fordoo',NULL,NULL,NULL,'福建泉州',NULL,NULL,NULL,'2010-12-06 16:44:08',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',22,'022','凡转','',NULL,NULL,NULL,'北京',NULL,NULL,NULL,'2010-12-06 16:47:26',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Client',23,'023','杰克琼斯','jackjones',NULL,NULL,NULL,'北京',NULL,NULL,NULL,'2010-12-06 16:47:53',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('Supplier',32768,'00001','七匹狼','QPL','','','','','','','','2010-12-17 13:45:33','',NULL,'0.00',NULL,NULL,NULL,NULL,NULL),('Supplier',32769,'00002','艾格','AG','','','','','','','','2010-12-17 13:45:52','',NULL,'0.00',NULL,NULL,NULL,NULL,NULL),('Supplier',32770,'00003','与狼共舞','YLGW','','','','','','','','2010-12-17 13:46:16','',NULL,'0.00',NULL,NULL,NULL,NULL,NULL),('Supplier',32771,'00004','百家好','BJH','','','','','','','','2010-12-17 13:46:32','',NULL,'0.00',NULL,NULL,NULL,NULL,NULL),('Supplier',32772,'00005','杰克琼斯','JKQS','','','','','','','','2010-12-17 13:48:45','',NULL,'0.00',NULL,NULL,NULL,NULL,NULL),('Supplier',32773,'00006','成都小商品城','CDXSPC','','','','','','','','2010-12-17 13:49:13','',NULL,'0.00',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `t_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_department`
--

DROP TABLE IF EXISTS `t_department`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_department` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) default NULL,
  `sn` varchar(255) default NULL,
  `tel` varchar(255) default NULL,
  `intro` varchar(255) default NULL,
  `sequence` int(11) default NULL,
  `parent_id` bigint(20) default NULL,
  `fax` varchar(255) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FKEFEB87FD56D234DB` (`parent_id`),
  CONSTRAINT `FKEFEB87FD56D234DB` FOREIGN KEY (`parent_id`) REFERENCES `t_department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_department`
--

LOCK TABLES `t_department` WRITE;
/*!40000 ALTER TABLE `t_department` DISABLE KEYS */;
INSERT INTO `t_department` VALUES (1,'分销总公司','001','','',NULL,NULL,NULL),(32768,'采购部','001001','','',NULL,1,NULL),(32769,'储运部','001002','','',NULL,1,NULL),(32770,'配送中心','001003','','',NULL,1,NULL);
/*!40000 ALTER TABLE `t_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_depot`
--

DROP TABLE IF EXISTS `t_depot`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_depot` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) default NULL,
  `maxcapacity` decimal(19,2) default NULL,
  `capcity` decimal(19,2) default NULL,
  `amount` decimal(19,2) default NULL,
  `sequence` int(11) default NULL,
  `types_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FKA02006A967221648` (`types_id`),
  CONSTRAINT `FKA02006A967221648` FOREIGN KEY (`types_id`) REFERENCES `t_systemdictionarydetail` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_depot`
--

LOCK TABLES `t_depot` WRITE;
/*!40000 ALTER TABLE `t_depot` DISABLE KEYS */;
INSERT INTO `t_depot` VALUES (1,'储备库','100000000.00','0.00','0.00',NULL,NULL),(2,'次品库','100000000.00','0.00','0.00',NULL,NULL);
/*!40000 ALTER TABLE `t_depot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_domainoperationlog`
--

DROP TABLE IF EXISTS `t_domainoperationlog`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_domainoperationlog` (
  `id` bigint(20) NOT NULL auto_increment,
  `entitytype` varchar(255) default NULL,
  `entityid` varchar(255) default NULL,
  `ver` int(11) default NULL,
  `vdate` datetime default NULL,
  `ip` varchar(255) default NULL,
  `action` int(11) default NULL,
  `content` text,
  `user_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK315FB8EC123760C` (`user_id`),
  CONSTRAINT `FK315FB8EC123760C` FOREIGN KEY (`user_id`) REFERENCES `t_userinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_domainoperationlog`
--

LOCK TABLES `t_domainoperationlog` WRITE;
/*!40000 ALTER TABLE `t_domainoperationlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_domainoperationlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_emailnotify`
--

DROP TABLE IF EXISTS `t_emailnotify`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_emailnotify` (
  `id` bigint(20) NOT NULL,
  `touser` text,
  `copyto` varchar(255) default NULL,
  `secretto` varchar(255) default NULL,
  `subject` varchar(200) default NULL,
  `content` text,
  `files` varchar(200) default NULL,
  `inputtime` datetime default NULL,
  `types` varchar(16) default NULL,
  `times` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_emailnotify`
--

LOCK TABLES `t_emailnotify` WRITE;
/*!40000 ALTER TABLE `t_emailnotify` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_emailnotify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_employee`
--

DROP TABLE IF EXISTS `t_employee`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_employee` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) default NULL,
  `password` varchar(255) default NULL,
  `truename` varchar(255) default NULL,
  `sex` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  `remark` varchar(255) default NULL,
  `duty` varchar(255) default NULL,
  `tel` varchar(255) default NULL,
  `address` varchar(255) default NULL,
  `types` int(11) default NULL,
  `status` int(11) default NULL,
  `logintimes` int(11) default NULL,
  `lastloginip` varchar(255) default NULL,
  `lastlogintime` datetime default NULL,
  `lastlogouttime` datetime default NULL,
  `dept_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FKFDCF5A1938149560` (`dept_id`),
  KEY `FKFDCF5A199E89518` (`id`),
  CONSTRAINT `FKFDCF5A1938149560` FOREIGN KEY (`dept_id`) REFERENCES `t_department` (`id`),
  CONSTRAINT `FKFDCF5A199E89518` FOREIGN KEY (`id`) REFERENCES `t_userinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_employee`
--

LOCK TABLES `t_employee` WRITE;
/*!40000 ALTER TABLE `t_employee` DISABLE KEYS */;
INSERT INTO `t_employee` VALUES (1,'admin','21232F297A57A5A743894A0E4A801FC3','超级管理员','','11@lanyo.com',NULL,NULL,'1233',NULL,NULL,NULL,45,NULL,'2011-01-27 16:47:53',NULL,1),(32768,'00001','CFCD208495D565EF66E7DFF9F98764DA','张启','','1@2.com',NULL,NULL,'1231',NULL,NULL,NULL,0,NULL,NULL,NULL,32768),(32769,'00002','CFCD208495D565EF66E7DFF9F98764DA','刘永辉','','2@2.com',NULL,NULL,'123',NULL,NULL,NULL,0,NULL,NULL,NULL,32768),(32770,'00003','CFCD208495D565EF66E7DFF9F98764DA','郭杰','','2@2.com',NULL,NULL,'123',NULL,NULL,NULL,0,NULL,NULL,NULL,32769),(32771,'00004','CFCD208495D565EF66E7DFF9F98764DA','张瑶','','2@2.com',NULL,NULL,'32534',NULL,NULL,NULL,0,NULL,NULL,NULL,32769),(32772,'00005','CFCD208495D565EF66E7DFF9F98764DA','付余兴','','2@2.com',NULL,NULL,'13456782549',NULL,NULL,NULL,0,NULL,NULL,NULL,32770),(32773,'00006','CFCD208495D565EF66E7DFF9F98764DA','汪权','','2@2.com',NULL,NULL,'86672588',NULL,NULL,NULL,0,NULL,NULL,NULL,32770);
/*!40000 ALTER TABLE `t_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_onlinemessage`
--

DROP TABLE IF EXISTS `t_onlinemessage`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_onlinemessage` (
  `id` bigint(20) NOT NULL,
  `recivename` varchar(255) default NULL,
  `status` int(11) default NULL,
  `inputtime` datetime default NULL,
  `readtime` datetime default NULL,
  `announce` bit(1) default NULL,
  `content` text,
  `ip` varchar(50) default NULL,
  `reciver_id` bigint(20) default NULL,
  `sender_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK2EA30DC9BD3B762` (`sender_id`),
  KEY `FK2EA30DC9FF3FBE4D` (`reciver_id`),
  CONSTRAINT `FK2EA30DC9BD3B762` FOREIGN KEY (`sender_id`) REFERENCES `t_userinfo` (`id`),
  CONSTRAINT `FK2EA30DC9FF3FBE4D` FOREIGN KEY (`reciver_id`) REFERENCES `t_userinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_onlinemessage`
--

LOCK TABLES `t_onlinemessage` WRITE;
/*!40000 ALTER TABLE `t_onlinemessage` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_onlinemessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_orderinfo`
--

DROP TABLE IF EXISTS `t_orderinfo`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_orderinfo` (
  `id` bigint(20) NOT NULL,
  `sn` varchar(255) default NULL,
  `types` int(11) default NULL,
  `vdate` datetime default NULL,
  `inputtime` datetime default NULL,
  `remark` varchar(255) default NULL,
  `amount` decimal(19,2) default NULL,
  `auditing` bit(1) default NULL,
  `audittime` datetime default NULL,
  `status` int(11) default NULL,
  `seller_id` bigint(20) default NULL,
  `inputuser_id` bigint(20) default NULL,
  `auditor_id` bigint(20) default NULL,
  `client_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `sn` (`sn`),
  KEY `FK7948EF1135D0BA3` (`auditor_id`),
  KEY `FK7948EF17C6820AC` (`inputuser_id`),
  KEY `FK7948EF153607F82` (`seller_id`),
  KEY `FK7948EF1F3195F13` (`client_id`),
  CONSTRAINT `FK7948EF1135D0BA3` FOREIGN KEY (`auditor_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FK7948EF153607F82` FOREIGN KEY (`seller_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FK7948EF17C6820AC` FOREIGN KEY (`inputuser_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FK7948EF1F3195F13` FOREIGN KEY (`client_id`) REFERENCES `t_client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_orderinfo`
--

LOCK TABLES `t_orderinfo` WRITE;
/*!40000 ALTER TABLE `t_orderinfo` DISABLE KEYS */;
INSERT INTO `t_orderinfo` VALUES (3,'1006070001',NULL,'2010-12-17 00:00:00','2010-12-17 14:16:15',NULL,'7840.00',NULL,NULL,0,1,NULL,NULL,5),(4,'1006070002',NULL,'2010-12-17 00:00:00','2010-12-17 14:33:53',NULL,'206320.00',NULL,NULL,0,32768,NULL,NULL,14),(5,'1006070003',NULL,'2010-12-17 00:00:00','2010-12-17 14:35:16',NULL,'33690.00',NULL,NULL,0,32773,NULL,NULL,13),(6,'1006070004',NULL,'2010-12-17 00:00:00','2010-12-17 14:43:08',NULL,'43600.00',NULL,NULL,0,32771,NULL,NULL,21),(7,'1006070006',NULL,'2010-12-17 00:00:00','2010-12-17 14:54:11',NULL,'25800.00',NULL,NULL,0,32768,NULL,NULL,32770),(8,'1006070007',NULL,'2010-12-17 00:00:00','2010-12-17 15:09:26',NULL,'126900.00',NULL,NULL,0,32769,NULL,NULL,11),(9,'1006070008',NULL,'2010-12-17 00:00:00','2010-12-17 15:12:29',NULL,'114500.00',NULL,NULL,0,32770,NULL,NULL,32768),(10,'1006070009',NULL,'2010-12-17 00:00:00','2010-12-17 15:13:34',NULL,'406500.00',NULL,NULL,0,32772,NULL,NULL,7),(32768,'1292657794448',NULL,'2010-12-18 00:00:00','2010-12-18 15:39:02',NULL,'350.00',NULL,NULL,0,1,NULL,NULL,2);
/*!40000 ALTER TABLE `t_orderinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_orderinfoitem`
--

DROP TABLE IF EXISTS `t_orderinfoitem`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_orderinfoitem` (
  `id` bigint(20) NOT NULL,
  `price` decimal(19,2) default NULL,
  `num` decimal(19,2) default NULL,
  `amount` decimal(19,2) default NULL,
  `spec` varchar(255) default NULL,
  `color` varchar(255) default NULL,
  `remark` varchar(255) default NULL,
  `orderinfo_id` bigint(20) default NULL,
  `product_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FKFC13298496F83881` (`orderinfo_id`),
  KEY `FKFC1329845116B941` (`product_id`),
  CONSTRAINT `FKFC13298496F83881` FOREIGN KEY (`orderinfo_id`) REFERENCES `t_orderinfo` (`id`),
  CONSTRAINT `t_orderinfoitem_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `t_product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_orderinfoitem`
--

LOCK TABLES `t_orderinfoitem` WRITE;
/*!40000 ALTER TABLE `t_orderinfoitem` DISABLE KEYS */;
INSERT INTO `t_orderinfoitem` VALUES (3,'98.00','80.00','7840.00','180L','黑色','可以分批发货',3,1),(4,'88.00','100.00','8800.00','','','',3,2),(5,'2050.00','60.00','123000.00','','','',4,6),(6,'499.00','80.00','39920.00','','','',4,7),(7,'139.00','100.00','13900.00','','','',4,28),(8,'200.00','50.00','10000.00','','','',4,10),(9,'390.00','50.00','19500.00','','','',4,30),(10,'155.00','50.00','7750.00','','','',5,8),(11,'142.00','70.00','9940.00','','','',5,9),(12,'55.00','100.00','5500.00','','','',5,13),(13,'105.00','100.00','10500.00','','','',5,20),(14,'218.00','200.00','43600.00','','','',6,80),(15,'139.00','200.00','27800.00','','','',6,79),(16,'129.00','200.00','25800.00','','','',NULL,82),(17,'129.00','200.00','25800.00','','','',7,82),(18,'89.00','100.00','8900.00','','','',8,11),(19,'142.00','100.00','14200.00','','','',8,9),(20,'98.00','100.00','9800.00','','','',8,36),(21,'298.00','100.00','29800.00','','','',8,43),(22,'149.00','100.00','14900.00','','','',8,41),(23,'295.00','100.00','29500.00','','','',8,54),(24,'198.00','100.00','19800.00','','','',8,60),(25,'229.00','500.00','114500.00','','','',9,81),(26,'390.00','500.00','195000.00','','','',10,30),(27,'155.00','500.00','77500.00','','','',10,27),(28,'68.00','500.00','34000.00','','','',10,67),(29,'200.00','500.00','100000.00','','','',10,66),(32768,'35.00','10.00','350.00','','','',32768,21);
/*!40000 ALTER TABLE `t_orderinfoitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_permission_ressource`
--

DROP TABLE IF EXISTS `t_permission_ressource`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_permission_ressource` (
  `permissions_id` bigint(20) NOT NULL,
  `resources_id` bigint(20) NOT NULL,
  KEY `FKB249DD366D7FF337` (`permissions_id`),
  KEY `FKB249DD363714BCB5` (`resources_id`),
  CONSTRAINT `FKB249DD363714BCB5` FOREIGN KEY (`resources_id`) REFERENCES `t_tresource` (`id`),
  CONSTRAINT `FKB249DD366D7FF337` FOREIGN KEY (`permissions_id`) REFERENCES `t_tpermission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_permission_ressource`
--

LOCK TABLES `t_permission_ressource` WRITE;
/*!40000 ALTER TABLE `t_permission_ressource` DISABLE KEYS */;
INSERT INTO `t_permission_ressource` VALUES (3,16),(4,60),(2,8),(7,43),(8,53),(5,24),(6,35),(11,119),(12,90),(9,69),(10,73),(15,142),(16,135),(13,158),(14,151),(20,106),(18,186),(17,179),(22,107),(21,109);
/*!40000 ALTER TABLE `t_permission_ressource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_permissiongroup`
--

DROP TABLE IF EXISTS `t_permissiongroup`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_permissiongroup` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) default NULL,
  `sequence` int(11) default NULL,
  `parent_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FKE1E3684588946B4E` (`parent_id`),
  CONSTRAINT `FKE1E3684588946B4E` FOREIGN KEY (`parent_id`) REFERENCES `t_permissiongroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_permissiongroup`
--

LOCK TABLES `t_permissiongroup` WRITE;
/*!40000 ALTER TABLE `t_permissiongroup` DISABLE KEYS */;
INSERT INTO `t_permissiongroup` VALUES (1,'采购管理',NULL,NULL),(2,'销售管理',NULL,NULL),(3,'库存管理',NULL,NULL),(4,'报表中心',NULL,NULL),(5,'基础数据维护',NULL,NULL),(6,'系统管理',NULL,NULL),(7,'采购单管理',NULL,1),(8,'销售管理',NULL,2),(9,'即时库存',NULL,3),(10,'出库',NULL,3),(11,'入库',NULL,3),(12,'销售出库',NULL,10),(13,'生产领料',NULL,10),(14,'其他出库',NULL,10),(15,'期初入库',NULL,11),(16,'采购入库',NULL,11),(17,'其他入库',NULL,11),(18,'货品管理',NULL,5),(19,'货品类别管理',NULL,5),(20,'仓库设置',NULL,5),(21,'客户管理',NULL,5),(22,'供应商管理',NULL,5),(23,'数据字典',NULL,6),(24,'部门管理',NULL,6),(25,'员工管理',NULL,6),(26,'系统权限设置',NULL,6);
/*!40000 ALTER TABLE `t_permissiongroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_personality`
--

DROP TABLE IF EXISTS `t_personality`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_personality` (
  `id` bigint(20) NOT NULL,
  `maxtabs` int(11) default NULL,
  `singletabmode` bit(1) default NULL,
  `iframe` bit(1) default NULL,
  `enableanimate` bit(1) default NULL,
  `homepage` varchar(255) default NULL,
  `lang` varchar(255) default NULL,
  `style` varchar(255) default NULL,
  `portals` text,
  `commonfunctions` varchar(255) default NULL,
  `portalmode` int(11) default NULL,
  `backgroundimg` varchar(255) default NULL,
  `user_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FKD5061B23123760C` (`user_id`),
  CONSTRAINT `FKD5061B23123760C` FOREIGN KEY (`user_id`) REFERENCES `t_userinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_personality`
--

LOCK TABLES `t_personality` WRITE;
/*!40000 ALTER TABLE `t_personality` DISABLE KEYS */;
INSERT INTO `t_personality` VALUES (1,20,'\0','\0','\0','menu','zh_CN','ext-all','id:LanyoIntro,col:0,row:0@@','',2,NULL,1);
/*!40000 ALTER TABLE `t_personality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_product`
--

DROP TABLE IF EXISTS `t_product`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_product` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) default NULL,
  `sn` varchar(255) default NULL,
  `saleprice` decimal(19,2) default NULL,
  `costprice` decimal(19,2) default NULL,
  `spec` varchar(255) default NULL,
  `model` varchar(255) default NULL,
  `color` varchar(255) default NULL,
  `pic` varchar(255) default NULL,
  `intro` varchar(255) default NULL,
  `content` text,
  `other1` varchar(255) default NULL,
  `other2` varchar(255) default NULL,
  `other3` varchar(255) default NULL,
  `other4` varchar(255) default NULL,
  `dir_id` bigint(20) default NULL,
  `unit_id` bigint(20) default NULL,
  `brand_id` bigint(20) default NULL,
  `isused` bit(1) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FKA91FC024C1FB2BE4` (`dir_id`),
  KEY `FKA91FC0248DE0A07A` (`brand_id`),
  KEY `FKA91FC0247E4FF55D` (`unit_id`),
  CONSTRAINT `FKA91FC0247E4FF55D` FOREIGN KEY (`unit_id`) REFERENCES `t_systemdictionarydetail` (`id`),
  CONSTRAINT `FKA91FC0248DE0A07A` FOREIGN KEY (`brand_id`) REFERENCES `t_systemdictionarydetail` (`id`),
  CONSTRAINT `FKA91FC024C1FB2BE4` FOREIGN KEY (`dir_id`) REFERENCES `t_productdir` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_product`
--

LOCK TABLES `t_product` WRITE;
/*!40000 ALTER TABLE `t_product` DISABLE KEYS */;
INSERT INTO `t_product` VALUES (1,'黑色丝滑缎面英伦风格夹克','312','98.00','50.00','180L','M005','黑色','wQnZFbTKY3U5Pez9_Upload_Product_0.jpg','','<p>09DIOR风靡全球的款型    真丝质地  亮滑舒适     配以完美的剪裁绝对让你成为众人的焦点</p>','','','','',5,32780,2,NULL),(2,'男式连帽短款呢料修身外套','300A','88.00','50.00',NULL,NULL,NULL,'4pHvcbPZMXQ2RsxY_Upload_Product_1.jpg',NULL,'',NULL,NULL,NULL,NULL,5,32780,2,NULL),(3,'男士加绒加厚格子夹克','101-808','125.00','80.00',NULL,NULL,NULL,'3789ThESenBvUVkP_Upload_Product_3.jpg',NULL,'2010--2011年最新款，即将流行的格子面料夹克，做工精致细腻，内层高档绒加厚，适合秋季及冬季穿，全原装配件，版型时尚大气，是青年人必不可少的外套。',NULL,NULL,NULL,NULL,5,32780,2,NULL),(4,'95%白鸭绒羽绒服','B4-AC01','1480.00','1200.00',NULL,NULL,NULL,'ZmBDf9bXKcNRPAEg_Upload_Product_3.jpg',NULL,'2010年AC时装款，顶级客供亚光面料 呈现低调奢华！95%顶级白鸭绒让你体验最最顶级的含绒量最高的羽绒！感受瞬间蓬松的暖流！',NULL,NULL,NULL,NULL,12,32780,32769,NULL),(5,'夹棉连帽呢料潮流夹克外套','1013/9029/P145','178.00','120.00',NULL,NULL,NULL,'4hmabVuwfzqI5KpN_Upload_Product_4.jpg',NULL,'10冬装时尚主流',NULL,NULL,NULL,NULL,5,32780,32769,NULL),(6,'黑色男士修身款小牛皮皮衣','03480','2050.00','1700.00',NULL,NULL,NULL,'4LDpf3s96BYMyQ7u_Upload_Product_5.jpg',NULL,'',NULL,NULL,NULL,NULL,10,32780,32769,NULL),(7,'光电子棉户外棉衣','5702','499.00','300.00',NULL,NULL,NULL,'GQL4BTc3Iu7H5eRS_Upload_Product_6.jpg',NULL,'1,PRIMALOFT作为填充材料有非常好的快干性,羽绒湿了就丧失保暖成为累赘,PRIMALOFT湿水后保暖效果不减\r\n\r\n2,PRIMALOFT只有羽绒服的80%的重量,并非常蓬松有弹性保暖效果好\r\n\r\n3,PRIMALOFT材料具有防泼水功能,即使受到泼水也能迅速的阻挡水的浸湿\r\n\r\n4,PRIMALOFT并有着非常出色的透气性,保证了保暖的同时不会产生汗气和湿气\r\n\r\n5,柔软,接近毛料的手感,保暖性优于毛料,紧密有效的防风效果',NULL,NULL,NULL,NULL,12,32780,32768,NULL),(8,'百家好','ak27','155.00','85.00',NULL,NULL,NULL,'ZWTFjafGh7Btv2PL_Upload_Product_QQ截图未命名.jpg',NULL,'',NULL,NULL,NULL,NULL,32776,32780,65537,NULL),(9,'艾格','1003','142.00','90.00',NULL,NULL,NULL,'YcNPy5ztMwTrejWx_Upload_Product_QQ截图未命名.jpg',NULL,'专柜正品 支持验货\r\n',NULL,NULL,NULL,NULL,32774,32780,65538,NULL),(10,'双领羊毛衫','287','200.00','80.00',NULL,NULL,NULL,'rgUJu3VDHscbieNB_Upload_Product_8.jpg',NULL,'领型: V领\r\n面料材质: 纯棉\r\n工艺处理: 水洗',NULL,NULL,NULL,NULL,6,32780,65539,NULL),(11,'小兔子','11','89.00','69.00',NULL,NULL,NULL,'8KdS2kXajYAT3Cnv_Upload_Product_QQ截图未命名.jpg',NULL,'热卖338件 2010秋冬女装新款 套头毛衣长款韩版 可爱小兔子 ',NULL,NULL,NULL,NULL,32772,32780,65538,NULL),(12,'百家好','33','155.00','105.00',NULL,NULL,NULL,'JBftCEcgArTaDwnK_Upload_Product_QQ截图未命名.jpg',NULL,'热销 2010 秋冬 新 女冬装 超值 修身牛角扣毛呢大衣长款外套',NULL,NULL,NULL,NULL,32776,32780,65537,NULL),(13,'2010韩版新款英伦时尚女装个性长袖纯棉格子衬衫','11841','55.00','30.00',NULL,NULL,NULL,'QITuynUzJvswcSar_Upload_Product_1.jpg',NULL,'品牌: XSENT\r\n货号: 11841\r\n款式: 长袖\r\n板型: 修身型\r\n衣长: 常规款\r\n领子: 翻领\r\n袖型: 常规袖\r\n风格: 韩版\r\n图案: 格子\r\n质地: 纯棉\r\n款式细节: 纽扣装饰\r\n颜色分类: 红黑格 黑白格...\r\n季节: 夏季 秋季\r\n春季尺码: M L XL...\r\n\r\n\r\n',NULL,NULL,NULL,NULL,32775,32780,65540,NULL),(14,'百家好','23','59.00','30.00',NULL,NULL,NULL,'ZJfkFPTbm2qWyGLD_Upload_Product_QQ截图未命名.jpg',NULL,'12.2新 小桃心 灰色卫衣绒衫 ',NULL,NULL,NULL,NULL,32777,32780,65537,NULL),(15,'艾格','134','59.00','39.00',NULL,NULL,NULL,'2TgZemXSIykbfptM_Upload_Product_QQ截图未命名.jpg',NULL,'韩版女装熊猫大王抓绒运动圆领长袖卫衣',NULL,NULL,NULL,NULL,32777,32780,65538,NULL),(16,'moda','34','199.00','99.00',NULL,NULL,NULL,'aSQxw9XrBIeJPgCT_Upload_Product_QQ截图未命名.jpg',NULL,'可爱女装长袖休闲修身',NULL,NULL,NULL,NULL,32773,32780,65542,NULL),(17,'AF新款纯色毛衣','M706 ','120.00','70.00',NULL,NULL,NULL,'jhcdJ5u4eTz3CiDY_Upload_Product_10.jpg',NULL,'男针织 立领毛衣 套头毛衣 长袖',NULL,NULL,NULL,NULL,6,32780,32768,NULL),(18,'SZ','22','89.00','68.00',NULL,NULL,NULL,'gNrvaAKzqGuSX5Wi_Upload_Product_QQ截图未命名.jpg',NULL,'修身毛领毛呢外套 短外套',NULL,NULL,NULL,NULL,32774,32780,65543,NULL),(19,'AF套头厚款圆领毛衣','G-FD072','108.00','50.00',NULL,NULL,NULL,'5aYspxRcXjIHqVCe_Upload_Product_11.jpg',NULL,'款式: 套头 \r\n板型: 修身型\r\n款式细节: 罗纹底摆',NULL,NULL,NULL,NULL,6,32780,32768,NULL),(20,'I”m bobo','12','105.00','65.00',NULL,NULL,NULL,'9tRGxYTCshp3jBXK_Upload_Product_QQ截图未命名.jpg',NULL,'尺寸：袖长—70cm（从领口开始）领口宽—23cm  胸围--108CM  收腰处宽—31cm 裙摆宽—91cm  衣长—83cm\r\n',NULL,NULL,NULL,NULL,32772,32780,65544,NULL),(21,'修身条纹线衫','V102','80.00','35.00',NULL,NULL,NULL,'kUv3TZmaN5dwiFg4_Upload_Product_12.jpg',NULL,'',NULL,NULL,NULL,NULL,6,32780,32775,NULL),(22,'纯棉休闲小西装','2703黑','128.00','50.00',NULL,NULL,NULL,'INk6GxvKct5Wi38P_Upload_Product_13.jpg',NULL,'时尚明袋修身单开叉纯棉休闲小西装',NULL,NULL,NULL,NULL,7,32780,65545,NULL),(23,'2010秋冬新款修身英伦长款格子衬衫 女款长袖加厚衬衣1166 ','1166','88.00','45.00',NULL,NULL,NULL,'KIVm4Gnzk5TviqBu_Upload_Product_2.jpg',NULL,'款式: 长袖板型: 修身型衣长: 中长款(65cm<衣长≤...领子: 翻领袖型: 常规袖风格: 休闲图案: 格子质地: 纯棉款式细节: 纽扣装饰颜色分类: 绿白系 红系 绿系...季节: 冬季 秋季尺码: 均码适合人群: 少女价格区间: 31-70元',NULL,NULL,NULL,NULL,32775,32780,65541,NULL),(24,'棉衣外套','09015','278.00','200.00',NULL,NULL,NULL,'EdnW6ieSHx9ZQfpI_Upload_Product_14.jpg',NULL,'DEERE MARCHI迪尔马奇 帅气秋冬可拆卸帽棉衣外套',NULL,NULL,NULL,NULL,12,32780,65545,NULL),(25,'春秋装英伦风格子格仔格纹 纯棉长袖女装格子衬衫','X4531','199.00','120.00',NULL,NULL,NULL,'kf7uDrzYt9pQnJLN_Upload_Product_3.jpg',NULL,'款式: 长袖板型: 修身型衣长: 常规款(50cm<衣长≤...领子: 翻领袖型: 常规袖风格: 日式图案: 格子质地: 纯棉款式细节: 拼色装饰颜色分类: 16款（绒毛）...季节: 冬季 秋季 春季尺码: 均码适合人群: 少女价格区间: 0-30元图片实拍: 杂志官方图...细节图: 有细节图 ',NULL,NULL,NULL,NULL,32775,NULL,65541,NULL),(26,'男士深花灰西服','9408012','459.00','400.00',NULL,NULL,NULL,'TMmJNkBfy2nd7iHQ_Upload_Product_15.jpg',NULL,'该款西服设计大方得体，凸显出男士整体既简约又不失商务休闲的帅气之风。',NULL,NULL,NULL,NULL,7,32780,3,NULL),(27,'羊毛尼防寒带帽小西装','9643 ','155.00','112.00',NULL,NULL,NULL,'hzwyFDMxVIS63v7a_Upload_Product_16.jpg',NULL,'修身短款，西服偏小，适合身材偏瘦，标准的人穿。超赞剪裁，贴身设计。精致毛呢面料，穿着舒适保暖，衣服柔软有型。',NULL,NULL,NULL,NULL,7,32780,3,NULL),(28,'时尚毛领流行男士西装 ','S102','139.00','100.00',NULL,NULL,NULL,'kDA2PpfWdrjGviC4_Upload_Product_17.jpg',NULL,'2010经典高品质 帅气秋冬男 时尚毛领流行 男士西装 ',NULL,NULL,NULL,NULL,7,32780,32772,NULL),(29,'秋冬新款女装韩版李孝利帅气保暖短外套纯色棉衣棉袄 ','c1062','220.00','199.00',NULL,NULL,NULL,'8dWicQRnuLqTk2KD_Upload_Product_4.jpg',NULL,'货号: c1062板型: 修身型衣长: 短款(40cm<衣长≤50...领子: 可脱卸帽厚薄: 常规袖长: 长袖衣门襟: 拉链图案: 纯色风格: 韩版适合人群: 少女颜色分类: 黑色/c1062尺码: 均码图片实拍: 杂志官方图细节图: 有细节图价格: 0-30元 ',NULL,NULL,NULL,NULL,32774,32780,65541,NULL),(30,'商务皮衣','PY1011-3-3#','390.00','260.00',NULL,NULL,NULL,'kLewmGFDah2u4TxQ_Upload_Product_18.jpg',NULL,'此款为修身版型，\r\n\r\n喜欢穿着稍微宽松一点的亲们建议买大一码。',NULL,NULL,NULL,NULL,10,32780,65546,NULL),(31,'休闲皮夹克','D11','240.00','60.00',NULL,NULL,NULL,'FQJWtxT5p2XHamS7_Upload_Product_19.jpg',NULL,'2010 ZARA 原单正品 顶级水洗皮皮衣 休闲皮夹克 画册款 ',NULL,NULL,NULL,NULL,10,32780,32771,NULL),(36,'5cm','1','98.00','55.00',NULL,NULL,NULL,'X2UiZvYqj9nCBdpJ_Upload_Product_QQ截图未命名.jpg',NULL,'编码：HY947\r\n\r\n标牌：主标 + 水洗标 + 吊牌\r\n\r\n颜色：浅色 \r\n\r\n质地：棉\r\n\r\n尺寸：\r\n\r\n26码  腰围58~66  臀围86  裤长98   大腿围48   腿口围26  前裆20  后裆31\r\n\r\n27码  腰围60~68  臀围88  裤长99   大腿围50   腿口围26  前裆21  后裆32\r\n\r\n30码  腰围66~74  臀围94  裤长101  大腿围54   腿口围28  前裆22  后裆33\r\n',NULL,NULL,NULL,NULL,32780,65548,65547,NULL),(38,'2010年秋冬新款毛呢小西装女外套 呢子修身西装外套','XL01','400.00','299.00',NULL,NULL,NULL,'eEtYMg5qrS4NaKHy_Upload_Product_5.jpg',NULL,'品牌: 雅狼兄弟货号: 小西装01板型: 修身型领子: 常规西装领衣长: 常规款(50cm<衣长≤...袖长: 长袖袖型: 常规袖衣门襟: 一粒扣图案: 纯色里料图案: 纯色风格: OL通勤面料分类: 毛呢适合人群: 仕女颜色分类: 浅灰色 黑色尺码: S M L XL季节: 秋季 春季',NULL,NULL,NULL,NULL,32773,32780,65549,NULL),(39,'only','2','199.00','109.00',NULL,NULL,NULL,'yijQGuEW5vPadFJA_Upload_Product_QQ截图未命名.jpg',NULL,'2010新款女装绣珠铆钉修身直筒牛仔裤',NULL,NULL,NULL,NULL,32780,65548,65550,NULL),(40,'机车立领拉链皮衣(咖啡色)','210410003','1799.00','1500.00',NULL,NULL,NULL,'RLKu89GIAg2frxj7_Upload_Product_20.jpg',NULL,'透着摇滚气质的机车夹克在本季备受青睐，衣领为粗犷的金属拉链装饰；绵羊皮的材质顿时提升你的时尚品味；衣身有多个口袋具有很好的功能性，下摆处为两个斜插的翻盖口袋；袖口为拉链和暗扣结合的设计，袖子为条纹拼接，将机车夹克随性不羁的气质得到完美演绎  ',NULL,NULL,NULL,NULL,10,32780,3,NULL),(41,'only','2010','149.00','79.00',NULL,NULL,NULL,'7Zs53nTUdEvfLt9i_Upload_Product_QQ截图未命名.jpg',NULL,'铅笔裤',NULL,NULL,NULL,NULL,32783,65548,65550,NULL),(42,'秋款西装棉新品韩版短款修身长袖小西装 女C806','Y231','145.00','100.00',NULL,NULL,NULL,'dvML2IpNF4hsTAZD_Upload_Product_6.jpg',NULL,'板型: 修身型领子: 常规西装领衣长: 常规款(50cm<衣长≤...袖长: 长袖袖型: 常规袖衣门襟: 单排扣图案: 纯色里料图案: 纯色风格: 韩版面料分类: 棉布颜色分类: 米白 黑色尺码: M L XL季节: 秋季 春季图片实拍: 模特实拍 搭配实拍细节图: 有细节图价格: 121-',NULL,NULL,NULL,NULL,32773,32780,65546,NULL),(43,'miss sixty','miss sixty','298.00','120.00',NULL,NULL,NULL,'XbPpIxz2QgmKW4uF_Upload_Product_QQ截图未命名.jpg',NULL,'',NULL,NULL,NULL,NULL,32783,65548,65551,NULL),(44,'杰克琼斯羊毛大衣','210427001','799.00','500.00',NULL,NULL,NULL,'EbJLsnBT9Xywk4ja_Upload_Product_21.jpg',NULL,'此款Jack&Jones长款风衣采用毛呢面料，手感微微偏硬，但不影响穿着；双排扣的版型配合立体剪裁让其上身后有型有款；加入羊毛的材质顿时提升你的品味；肩部不对称裁剪让其在细节上体现出品位；衣身有两个斜插式口袋具有很好的功能性；别致的领形设计可以自由变换。  ',NULL,NULL,NULL,NULL,11,32780,3,NULL),(45,'af','af','68.00','25.00',NULL,NULL,NULL,'X2mjFKdhs96Ptx3S_Upload_Product_QQ截图未命名.jpg',NULL,'糖果彩色铅笔裤显瘦修身春秋款打底裤九分裤',NULL,NULL,NULL,NULL,32781,65548,32768,NULL),(46,'韩版','weizhi','28.00','20.00',NULL,NULL,NULL,'sWfzM8wu6B7GZIJE_Upload_Product_QQ截图未命名.jpg',NULL,'百搭雪花图案潮流显瘦打底裤',NULL,NULL,NULL,NULL,32781,65548,65543,NULL),(47,'普莱恩斯克新品连帽风衣','TD9815  ','228.00','100.00',NULL,NULL,NULL,'hEA6ZVfbjWdemXQH_Upload_Product_22.jpg',NULL,'优质工艺剪裁 穿出男性魅力 男型必备',NULL,NULL,NULL,NULL,11,32780,65552,NULL),(48,'CK','JZDH1006','128.00','55.00',NULL,NULL,NULL,'KpSDQsf8VGAzY4BF_Upload_Product_QQ截图未命名.jpg',NULL,'采用牛奶丝面料，质地轻盈、柔软、滑爽、悬垂，穿着透气、导湿、爽身很滑很薄很舒服，料子垂感很好，不会起皱。\r\n',NULL,NULL,NULL,NULL,32782,65548,32771,NULL),(49,'兔毛绒气质高领打底衫款毛衣针织衫1068','1068','200.00','100.00',NULL,NULL,NULL,'5iWKQ36Gy2ZpSwPj_Upload_Product_7.jpg',NULL,'组合形式: 单件套款式: 套头板型: 修身型领子: 堆堆领衣长: 长款(80cm<衣长≤10...袖型: 包袖袖长: 长袖针法: 罗纹针针织面料: 兔毛混纺颜色分类: 卡其(现货-不用等）...尺码: 均码季节: 秋季图片实拍: 模特实拍 搭配实拍细节图: 有细节图货号: 1068价格: 121-200元 ',NULL,NULL,NULL,NULL,32772,32780,65537,NULL),(50,'SZ','KN4001','268.00','98.00',NULL,NULL,NULL,'mv64GMiSWqI39J7s_Upload_Product_QQ截图未命名.jpg',NULL,'绝对个性的一款修身长裤,设计非常独特,裤腰的不对称翻边设计带有上装领身的元素,系腰带时,腰带覆于大翻边上,隐匿于另一窄边再巧妙的穿插而过,裆前倒八字的分割亦不甘于平常,在另一侧采用金属拉链装饰,整个的设计非常新颖独特,却又不失随意休闲,脱离于死板的装束模式,略显几分朋克风貌哦,裤裆部位恰如其分的宽臀小吊裆效果,臀位直至大腿部的松垮,小腿至脚口的收紧,起到非常好的遮掩粗腿,营造宽臀细腿的极佳视觉效果,显瘦又显高哦,材质柔软舒适,厚度适中,尤其在春夏秋季贴身穿着亲肤效果非常好\r\n',NULL,NULL,NULL,NULL,32782,65548,65543,NULL),(51,'Redopin','ROCU00125930','298.00','168.00',NULL,NULL,NULL,'AVi9I5ZsdjQxGcum_Upload_Product_QQ截图未命名.jpg',NULL,'韩国代购Redopin女装哈伦裤',NULL,NULL,NULL,NULL,32782,65548,65554,NULL),(52,'韩版毛呢外套 双排扣呢大衣 女 ','SD81002','200.00','100.00',NULL,NULL,NULL,'qsrbZezYLBNjMCAW_Upload_Product_8.jpg',NULL,'板型: 修身型领子: 立领衣长: 长款(80cm<衣长≤10...袖型: 常规袖袖长: 长袖衣门襟: 双排扣图案: 纯色风格: 韩版面料分类: 仿呢料里料材质: 尼龙里料图案: 纯色适合人群: 淑女颜色分类: 灰色 白色 玫红色...尺码: S-标准-建议胸围84c......季节: 冬季 秋季实拍方式: 平铺实拍 模特实拍...',NULL,NULL,NULL,NULL,32776,32780,65540,NULL),(53,'Mr.Faddo修身风衣','81019','283.00','170.00',NULL,NULL,NULL,'8GQj675V2tPgyufx_Upload_Product_23.jpg',NULL,'本款采用韩国进口毛呢，面料无毛刺感，保暖性更强。比普通的棉质面料风衣看上去更有质感，市场真正的高档毛呢70%羊毛成分20%纤维，10%麻。我们选用羊背上的毛来制作这件衣服，而且根据人体黄金比例来打造衣服板型。',NULL,NULL,NULL,NULL,11,32780,65553,NULL),(54,'淑女屋','FFAJJD4401','295.00','155.00',NULL,NULL,NULL,'eDnI3HhTVJGZ5sxL_Upload_Product_QQ截图未命名.jpg',NULL,'2010淑女屋秋款（再见！我的爱人）SC74衬衫原569元',NULL,NULL,NULL,NULL,32775,32780,65555,NULL),(55,'淑女屋','FSAJAB8401','298.00','210.00',NULL,NULL,NULL,'SuEGRfgPNZQBH5cm_Upload_Product_QQ截图未命名.jpg',NULL,'2010年淑女屋 冬装 又见炊烟 ESC56/SC56衬衫 原价468 ',NULL,NULL,NULL,NULL,32775,32780,65555,NULL),(56,'SELFace男士短款羊毛外套','WC106','458.00','270.00',NULL,NULL,NULL,'GYC6bXAMS9EwaQz3_Upload_Product_24.jpg',NULL,'“小资格调”加强绒毛双排扣短款羊毛尼大衣，奢华鬼泣貉子毛领，可脱卸，加强绒内胆。',NULL,NULL,NULL,NULL,11,32780,65556,NULL),(57,'冬装加厚女装外套 韩版长款大码 ','ypls058','146.00','100.00',NULL,NULL,NULL,'Sk4Fj57BzXTCniEt_Upload_Product_9.jpg',NULL,'组合形式: 单件套款式: 套头厚薄: 抓绒板型: 宽松型领子: 带帽衣长: 中长款(65cm<衣长≤...袖型: 常规袖女装袖长: 长袖女装图案: 卡通风格: 韩版适合人群: 少女颜色分类: 大红 (现货)...尺码: 均码季节: 冬季 秋季 春季图片实拍: 模特实拍 搭配实拍细节图: 有',NULL,NULL,NULL,NULL,32777,32780,65546,NULL),(58,'H&M','H','298.00','128.00',NULL,NULL,NULL,'4s8fpMxLHaD2ZzrG_Upload_Product_QQ截图未命名.jpg',NULL,'原价499',NULL,NULL,NULL,NULL,32778,32780,65557,NULL),(59,'新款男式可拆帽中长款外套羽绒服','6284','990.00','500.00',NULL,NULL,NULL,'tNvFMQZyfT8Yrk2G_Upload_Product_25.jpg',NULL,'中长款开身设计，帽可拆，帽上毛也可单独拆，双拉链头设计，颜色休闲百搭，采用户外高含绒量压缩设计减少厚重感，使羽绒服穿上感觉非常舒适轻便且保暖。',NULL,NULL,NULL,NULL,12,32780,65558,NULL),(60,' Teenie Weenie',' Teenie Weenie','198.00','120.00',NULL,NULL,NULL,'IcFBSAVjKhNpq5fU_Upload_Product_QQ截图未命名.jpg',NULL,'* 简约大方、优雅时尚～\r\n',NULL,NULL,NULL,NULL,32778,32780,65559,NULL),(61,'2010秋装新款百搭长袖打底衫针织衫薄毛衣','YS211','24.00','10.00',NULL,NULL,NULL,'UuTjFcY7QvR3SyBq_Upload_Product_10.jpg',NULL,'款式: 套头板型: 修身型领子: 圆领衣长: 中长款(65cm<衣长≤...袖型: 常规袖袖长: 长袖厚薄: 常规款图案: 纯色针法: 平针毛线粗细: 细毛线针织面料: 全棉风格: 百搭颜色分类: 米色 西瓜红 绿色...尺码: 均码季节: 夏季 冬季 秋季...图片实拍: 悬挂实拍',NULL,NULL,NULL,NULL,32778,NULL,65547,NULL),(62,'直筒时尚休闲牛仔裤','507','149.00','80.00','','','浅蓝','StHzAdX3gpa9JNCF_Upload_Product_30.jpg','','<p>无论是水洗磨白效果，还是精心打造的做旧效果都尽显时尚气质，让您在日常的低调容让找那个泄露出不苟凡俗的独立态度，修身的板型，张扬时尚的个性提臀包跨的设计，裁剪极力展现您的硬朗、性感的线条。</p>','','','','',32784,65548,2,NULL),(63,'时尚男装牛仔裤','X702NH9S5K06','178.00','121.00',NULL,NULL,NULL,'5J7K2LirHVDxeuW9_Upload_Product_31.jpg',NULL,'修身裤型，低腰，厚度适中，面料软硬适中，适合春夏秋冬穿着。',NULL,NULL,NULL,NULL,32784,65548,2,NULL),(64,'双排扣OL女士秋冬外套风衣','XL444','166.00','100.00',NULL,NULL,NULL,'dvFLYTtaxGjCADr4_Upload_Product_11.jpg',NULL,'型: 修身型领子: 方领衣长: 中长款(65cm<衣长≤...袖型: 常规袖袖长: 长袖衣门襟: 双排扣厚薄: 常规款式细节: 腰带装饰图案: 纯色面料分类: 棉布里料分类: 涤纶里料图案: 条纹风格: OL通勤适合人群: 仕女颜色分类: 红色 米白 黑色',NULL,NULL,NULL,NULL,32779,32780,65546,NULL),(65,'男式宽松直筒商务休闲牛仔裤','J8256','115.00','70.00',NULL,NULL,NULL,'enX4fRPpYyFV9DHM_Upload_Product_32.jpg',NULL,'2010新款 细格质感布料 男式宽松直筒商务休闲牛仔裤',NULL,NULL,NULL,NULL,32784,65548,3,NULL),(66,'带帽风衣','US333','200.00','100.00',NULL,NULL,NULL,'IPyhZTscQMgiC7aW_Upload_Product_12.jpg',NULL,'领子: 带帽衣长: 长款(80cm<衣长≤10...袖型: 常规袖袖长: 长袖衣门襟: 拉链厚薄: 常规款式细节: 多口袋装饰图案: 纯色面料分类: 棉布里料分类: 涤纶里料图案: 卡通风格: 韩版适合人群: 淑女',NULL,NULL,NULL,NULL,32779,32780,65541,NULL),(67,'蓝色炫彩牛仔裤 ','O2699','68.00','30.00',NULL,NULL,NULL,'xfCSaw8YHIqMdsyL_Upload_Product_33.jpg',NULL,'蓝色炫彩做旧牛仔裤 ',NULL,NULL,NULL,NULL,32784,65548,65560,NULL),(68,'风衣','KE456','566.00','210.00',NULL,NULL,NULL,'MJiF6nLXG9CKhqpr_Upload_Product_13.jpg',NULL,'板型: 修身型领子: 带帽衣长: 中长款(65cm<衣长≤...袖型: 常规袖袖长: 长袖衣门襟: 单排扣厚薄: 加厚款式细节: 腰带装饰图案: 纯色面料分类: 棉布',NULL,NULL,NULL,NULL,32779,32780,65547,NULL),(69,'男士直筒牛仔裤 ','3105 232','118.00','60.00',NULL,NULL,NULL,'CE6rqpUPt4ASuIRz_Upload_Product_34.jpg',NULL,'2010秋冬款 CK专柜新款 水洗磨白 休闲百搭 男士直筒牛仔裤 ',NULL,NULL,NULL,NULL,32784,65548,32771,NULL),(70,'装迷彩裤子','K001','139.00','60.00',NULL,NULL,NULL,'46KYWmg7LEUPzrcs_Upload_Product_35.jpg',NULL,'ppz男装正品冬装韩版 男 长宽松 休闲裤 工装迷彩裤子 ',NULL,NULL,NULL,NULL,32785,65548,65561,NULL),(71,'SZ','221','228.00','120.00',NULL,NULL,NULL,'KWe9rSR7gAnhjQHz_Upload_Product_QQ截图未命名.jpg',NULL,'羊毛混纺\r\n',NULL,NULL,NULL,NULL,32778,32780,65543,NULL),(72,'全棉弹力松紧腰韩版中腰显瘦修身牛仔裤','561','90.00','57.00',NULL,NULL,NULL,'QMF6rNwXKtaBGfix_Upload_Product_14.jpg',NULL,'款式: 直筒裤裤长: 长裤裤腰: 中腰牛仔颜色: 深色风格: 磨白 纽扣 多口袋...颜色分类: 131款 松紧腰弹力中......面料分类: 全棉牛仔布尺寸: 26 27 28...适合季节: 通用型价格区间',NULL,NULL,NULL,NULL,32780,32780,65547,NULL),(73,'低腰垮裤工装裤多色休闲裤','313C K837','98.00','60.00',NULL,NULL,NULL,'JLH4vxeiyEaZXfYN_Upload_Product_36.jpg',NULL,'宽松款式，采用现代化成衣水洗工艺。面料100%进口纯棉，意大利进口高支纯棉面料，色泽正点。',NULL,NULL,NULL,NULL,32785,65548,32769,NULL),(74,'加厚打底裤','LD223','300.00','199.00',NULL,NULL,NULL,'iuh6KmS7vdAUsQ8B_Upload_Product_15.jpg',NULL,'加厚品牌: Mapuli材质: 其它颜色分类: 黑色图片实拍: 平铺实拍 模特实拍...细节图: 有细节图',NULL,NULL,NULL,NULL,32781,32780,65550,NULL),(75,'弹力铅笔裤','8909','399.00','200.00',NULL,NULL,NULL,'WZksP7YnEVjA2Ce9_Upload_Product_16.jpg',NULL,'款式: 小脚/铅笔裤裤长: 长裤裤腰: 低腰牛仔颜色: 深色风格: 图案 水洗 拉链颜色分类: 蓝色 黑色',NULL,NULL,NULL,NULL,32783,32780,65558,NULL),(76,'MO纯正棉料工装休闲裤','M770','88.00','39.00',NULL,NULL,NULL,'5RxLnrWdSKXTHMBG_Upload_Product_37.jpg',NULL,'融合时尚与运动休闲于一体，\r\n\r\n简约的基本款式，柔软的毛圈纯棉，洗水加厚型，适合四季，加宽系带自由松紧腰带，低腰直筒。',NULL,NULL,NULL,NULL,32785,65548,65562,NULL),(77,'军装工装裤休闲裤长','3316','128.00','69.00',NULL,NULL,NULL,'PzxRAwyQriFUnG2t_Upload_Product_38.jpg',NULL,'此款的板型是我们原创开发，已经畅销三年，线上线下累积销售200000件之多,堪称史上时尚军装之王,因此请大家绝对放心购买！各位朋友千万注意此款黑色是中等厚度的秋装！！！',NULL,NULL,NULL,NULL,32785,65548,65563,NULL),(78,'纯棉冬款男士修身裤子','S336','75.00','30.00',NULL,NULL,NULL,'qehryAgEHFD6SvKx_Upload_Product_39.jpg',NULL,'2010新款秋装韩版休闲时尚男装修身休闲裤纯棉冬款男士修身裤子 ',NULL,NULL,NULL,NULL,32785,65548,NULL,NULL),(79,'虎都男装西裤','FAA8-807A','139.00','69.00',NULL,NULL,NULL,'47FqjBfrKIRtTGMp_Upload_Product_40.jpg',NULL,'可用水洗，悬挂晾干，不可氯漂，熨斗地板最高温度150℃，最高水温40℃。',NULL,NULL,NULL,NULL,32788,65548,65564,NULL),(80,'虎都毛料西裤','FBA8-711A','218.00','100.00',NULL,NULL,NULL,'hUbtuFjPY5W6rkMx_Upload_Product_41.jpg',NULL,'可用水洗，悬挂晾干，不可氯漂，熨斗地板最高温度150℃，建议干洗。',NULL,NULL,NULL,NULL,32788,65548,65564,NULL),(81,'七匹狼商务西裤','172104443-002','229.00','112.00',NULL,NULL,NULL,'wWgznMs9veGBIJaf_Upload_Product_42.jpg',NULL,'商品面料：70%羊毛 里料：100%涤纶\r\n设计风格：简约大方',NULL,NULL,NULL,NULL,32788,65548,65565,NULL),(82,'与狼共舞商务西裤','271104516-102','129.00','60.00',NULL,NULL,NULL,'epBJqX5k9Am8sWES_Upload_Product_43.jpg',NULL,'商品面料：82.2%绦纶17.8%粘纤\r\n设计风格：简约大方',NULL,NULL,NULL,NULL,32788,NULL,65565,NULL),(83,'防寒百搭修身皮裤','S856','118.00','45.00',NULL,NULL,NULL,'LkKpU5nBITzYQPdv_Upload_Product_44.jpg',NULL,'感恩特价 新款巨献 韩版 防寒 百搭修身 男士黑色皮裤/长裤 ',NULL,NULL,NULL,NULL,32789,NULL,65562,NULL),(84,'狗皮裤子','002','179.00','112.00',NULL,NULL,NULL,'A6Kne5vU9cam4NWJ_Upload_Product_45.jpg',NULL,'本品为皮毛一体，一等皮质，不像一般劣质的皮裤，用的是其他季节的硬皮\r\n\r\n子，甚至是很碎的下脚料拼接的！本店所售均为冬季的大张狗皮做成！',NULL,NULL,NULL,NULL,32789,65548,65566,NULL);
/*!40000 ALTER TABLE `t_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_productdir`
--

DROP TABLE IF EXISTS `t_productdir`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_productdir` (
  `id` bigint(20) NOT NULL auto_increment,
  `sn` varchar(32) default NULL,
  `name` varchar(255) default NULL,
  `intro` varchar(200) default NULL,
  `sequence` int(11) default NULL,
  `dirpath` varchar(200) default NULL,
  `status` int(11) default NULL,
  `inherit` bit(1) default NULL,
  `productnum` int(11) default NULL,
  `survey` bit(1) default NULL,
  `parent_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK25DA21E9A33CE868` (`parent_id`),
  KEY `FK25DA21E98CC056A7` (`parent_id`),
  CONSTRAINT `FK25DA21E98CC056A7` FOREIGN KEY (`parent_id`) REFERENCES `t_productdir` (`id`),
  CONSTRAINT `FK25DA21E9A33CE868` FOREIGN KEY (`parent_id`) REFERENCES `t_productdir` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32790 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_productdir`
--

LOCK TABLES `t_productdir` WRITE;
/*!40000 ALTER TABLE `t_productdir` DISABLE KEYS */;
INSERT INTO `t_productdir` VALUES (1,'001','男装','',1,'001@',0,'',0,'\0',NULL),(2,'002','女装','',1,'002@',0,'',0,'\0',NULL),(3,'0011','男上装','',15,'001@0011@',0,'',0,'\0',1),(4,'0012','男裤','',16,'001@0012@',0,'',0,'\0',1),(5,'00111','时尚夹克','',12,'001@0011@00111@00111@',0,'',0,'\0',8),(6,'00112','毛衣/线衣','',13,'001@0011@00111@00112@',0,'',0,'\0',8),(7,'00113','西装上衣','',14,'001@0011@00111@00113@',0,'',0,'\0',8),(8,'00111','薄外套','',10,'001@0011@00111@',0,'',0,'\0',3),(9,'00112','厚外套','',11,'001@0011@00112@',0,'',0,'\0',3),(10,'00211','真皮大衣','',1,'001@0011@00112@00211@',0,'',0,'\0',9),(11,'00212','风衣','',8,'001@0011@00112@00212@',0,'',0,'\0',9),(12,'00213','羽绒服','',9,'001@0011@00112@00213@',0,'',0,'\0',9),(32768,'002','女上装','',NULL,'002@002@',0,'',0,'\0',2),(32769,'1','女下装','',NULL,'002@1@',0,'',0,'\0',2),(32770,'2','薄外套','',NULL,'002@002@2@',0,'',0,'\0',32768),(32771,'3','厚外套','',2,'002@002@3@',0,'',0,'\0',32768),(32772,'1','针织衫','',NULL,'002@002@2@1@',0,'',0,'\0',32770),(32773,'2','小西装','',1,'002@002@2@2@',0,'',0,'\0',32770),(32774,'4','短外套','',5,'002@002@2@4@',0,'',0,'\0',32770),(32775,'3','衬衫','',3,'002@002@2@3@',0,'',0,'\0',32770),(32776,'1','呢大衣','',NULL,'002@002@3@1@',0,'',0,'\0',32771),(32777,'2','卫衣','',NULL,'002@002@3@2@',0,'',0,'\0',32771),(32778,'3','毛衣','',NULL,'002@002@3@3@',0,'',0,'\0',32771),(32779,'4','风衣','',NULL,'002@002@3@4@',0,'',0,'\0',32771),(32780,'1','牛仔裤','',NULL,'002@1@1@',0,'',0,'\0',32769),(32781,'2','打底裤','',1,'002@1@2@',0,'',0,'\0',32769),(32782,'3','哈伦裤','',1,'002@1@3@',0,'',0,'\0',32769),(32783,'4','铅笔裤','',4,'002@1@4@',0,'',0,'\0',32769),(32784,'00121','牛仔裤','',NULL,'001@0012@00121@',0,'',0,'\0',4),(32785,'00122','休闲裤','',1,'001@0012@00122@',0,'',0,'\0',4),(32788,'00125','西裤','',1,'001@0012@00125@',0,'',0,'\0',4),(32789,'00126','皮裤','',1,'001@0012@00126@',0,'',0,'\0',4);
/*!40000 ALTER TABLE `t_productdir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_productstock`
--

DROP TABLE IF EXISTS `t_productstock`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_productstock` (
  `id` bigint(20) NOT NULL auto_increment,
  `storenum` decimal(19,2) default NULL,
  `price` decimal(19,2) default NULL,
  `amount` decimal(19,2) default NULL,
  `incomedate` datetime default NULL,
  `outcomedate` datetime default NULL,
  `warning` bit(1) default NULL,
  `topnum` decimal(19,2) default NULL,
  `bottomnum` decimal(19,2) default NULL,
  `product_id` bigint(20) default NULL,
  `depot_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK18B1AD727D9644E1` (`depot_id`),
  KEY `FK18B1AD725116B941` (`product_id`),
  CONSTRAINT `FK18B1AD727D9644E1` FOREIGN KEY (`depot_id`) REFERENCES `t_depot` (`id`),
  CONSTRAINT `t_productstock_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `t_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_productstock`
--

LOCK TABLES `t_productstock` WRITE;
/*!40000 ALTER TABLE `t_productstock` DISABLE KEYS */;
INSERT INTO `t_productstock` VALUES (1,'500.00','50.00','4400.00','2010-12-18 15:26:16',NULL,NULL,'0.00','0.00',2,1),(2,'500.00','50.00','9800.00','2010-12-18 15:26:16','2010-12-17 14:58:00',NULL,'0.00','0.00',1,1),(3,'88.00','80.00','7040.00','2010-12-18 15:09:21',NULL,NULL,'0.00','0.00',21,2),(4,'100.00','90.00','10934.00','2010-12-18 15:44:52',NULL,NULL,'0.00','0.00',9,2),(5,'100.00','278.00','27800.00','2010-12-18 15:09:21',NULL,NULL,'0.00','0.00',24,2),(6,'120.00','459.00','55080.00','2010-12-18 15:09:21',NULL,NULL,'0.00','0.00',26,2),(7,'500.00','80.00','8000.00','2010-12-18 15:26:16',NULL,NULL,'0.00','0.00',3,1),(8,'1000.00','1200.00','36000.00','2010-12-18 15:26:16',NULL,NULL,'0.00','0.00',4,1),(9,'50.00','1700.00','85000.00','2010-08-12 16:59:31',NULL,NULL,'0.00','0.00',6,1),(10,'1000.00','69.00','69000.00','2010-12-18 15:26:10',NULL,NULL,'0.00','0.00',11,1),(11,'1000.00','105.00','105000.00','2010-12-18 15:26:10',NULL,NULL,'0.00','0.00',12,1),(12,'1000.00','30.00','30000.00','2010-12-18 15:26:10',NULL,NULL,'0.00','0.00',13,1),(13,'1000.00','30.00','30000.00','2010-12-18 15:26:10',NULL,NULL,'0.00','0.00',14,1),(14,'1000.00','39.00','39000.00','2010-12-18 15:26:10',NULL,NULL,'0.00','0.00',15,1),(15,'1000.00','99.00','99000.00','2010-12-18 15:26:10',NULL,NULL,'0.00','0.00',16,1),(16,'1000.00','70.00','70000.00','2010-12-18 15:26:10',NULL,NULL,'0.00','0.00',17,1),(17,'1000.00','68.00','68000.00','2010-12-18 15:26:10',NULL,NULL,'0.00','0.00',18,1),(18,'1000.00','50.00','50000.00','2010-12-18 15:26:10',NULL,NULL,'0.00','0.00',19,1),(19,'1000.00','65.00','65000.00','2010-12-18 15:26:10',NULL,NULL,'0.00','0.00',20,1),(20,'1000.00','35.00','35000.00','2010-12-18 15:26:10',NULL,NULL,'0.00','0.00',21,1),(21,'100.00','120.00','60000.00','2010-08-12 16:59:31',NULL,NULL,'0.00','0.00',5,1),(22,'100.00','300.00','150000.00','2010-08-12 16:59:31',NULL,NULL,'0.00','0.00',7,1),(23,'500.00','85.00','42500.00','2010-12-18 15:26:16',NULL,NULL,'0.00','0.00',8,1),(24,'500.00','90.00','45000.00','2010-12-18 15:26:16',NULL,NULL,'0.00','0.00',9,1),(25,'100.00','80.00','40000.00','2010-08-12 16:59:31',NULL,NULL,'0.00','0.00',10,1),(26,'88.00','105.00','9240.00','2010-12-18 15:44:52',NULL,NULL,'0.00','0.00',12,2),(27,'90.00','112.00','10080.00','2010-12-18 15:44:52',NULL,NULL,'0.00','0.00',27,2),(28,'100.00','109.00','10900.00','2010-12-18 15:44:52',NULL,NULL,'0.00','0.00',39,2),(29,'100.00','120.00','12000.00','2010-08-12 17:00:33',NULL,NULL,'0.00','0.00',43,1);
/*!40000 ALTER TABLE `t_productstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_purchasebill`
--

DROP TABLE IF EXISTS `t_purchasebill`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_purchasebill` (
  `id` bigint(20) NOT NULL,
  `sn` varchar(255) default NULL,
  `types` int(11) default NULL,
  `vdate` datetime default NULL,
  `inputtime` datetime default NULL,
  `remark` varchar(255) default NULL,
  `amount` decimal(19,2) default NULL,
  `auditing` bit(1) default NULL,
  `audittime` datetime default NULL,
  `status` int(11) default NULL,
  `buyer_id` bigint(20) default NULL,
  `inputuser_id` bigint(20) default NULL,
  `auditor_id` bigint(20) default NULL,
  `supplier_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `sn` (`sn`),
  KEY `FK6D398673135D0BA3` (`auditor_id`),
  KEY `FK6D398673734630CE` (`buyer_id`),
  KEY `FK6D3986737C6820AC` (`inputuser_id`),
  KEY `FK6D398673E627A933` (`supplier_id`),
  CONSTRAINT `FK6D398673135D0BA3` FOREIGN KEY (`auditor_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FK6D398673734630CE` FOREIGN KEY (`buyer_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FK6D3986737C6820AC` FOREIGN KEY (`inputuser_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FK6D398673E627A933` FOREIGN KEY (`supplier_id`) REFERENCES `t_client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_purchasebill`
--

LOCK TABLES `t_purchasebill` WRITE;
/*!40000 ALTER TABLE `t_purchasebill` DISABLE KEYS */;
INSERT INTO `t_purchasebill` VALUES (1,'1012170001',NULL,'2010-12-17 00:00:00','2010-12-17 14:21:11',NULL,'98840.00','','2011-01-04 15:17:02',1,32768,NULL,1,32768),(32768,'1292657471932',NULL,'2010-12-18 00:00:00','2010-12-18 15:32:09',NULL,'2500.00',NULL,NULL,0,32769,NULL,NULL,32773);
/*!40000 ALTER TABLE `t_purchasebill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_purchasebillitem`
--

DROP TABLE IF EXISTS `t_purchasebillitem`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_purchasebillitem` (
  `id` bigint(20) NOT NULL,
  `price` decimal(19,2) default NULL,
  `num` decimal(19,2) default NULL,
  `amount` decimal(19,2) default NULL,
  `remark` varchar(255) default NULL,
  `color` varchar(255) default NULL,
  `spec` varchar(255) default NULL,
  `product_id` bigint(20) default NULL,
  `bill_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK8F8C90065116B941` (`product_id`),
  KEY `FK8F8C900672102774` (`bill_id`),
  CONSTRAINT `FK8F8C900672102774` FOREIGN KEY (`bill_id`) REFERENCES `t_purchasebill` (`id`),
  CONSTRAINT `t_purchasebillitem_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `t_product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_purchasebillitem`
--

LOCK TABLES `t_purchasebillitem` WRITE;
/*!40000 ALTER TABLE `t_purchasebillitem` DISABLE KEYS */;
INSERT INTO `t_purchasebillitem` VALUES (1,'229.00','200.00','45800.00','','','',81,1),(2,'98.00','200.00','19600.00','','','',1,1),(3,'88.00','380.00','33440.00','','','',2,1),(4,'125.00','170.00','21250.00','','','',3,1),(32768,'50.00','50.00','2500.00','','','',2,32768);
/*!40000 ALTER TABLE `t_purchasebillitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_role_permissions`
--

DROP TABLE IF EXISTS `t_role_permissions`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_role_permissions` (
  `roles_id` bigint(20) NOT NULL,
  `permissions_id` bigint(20) NOT NULL,
  KEY `FKEBFDAAA6FA112A85` (`roles_id`),
  KEY `FKEBFDAAA66D7FF337` (`permissions_id`),
  CONSTRAINT `FKEBFDAAA66D7FF337` FOREIGN KEY (`permissions_id`) REFERENCES `t_tpermission` (`id`),
  CONSTRAINT `FKEBFDAAA6FA112A85` FOREIGN KEY (`roles_id`) REFERENCES `t_trole` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_role_permissions`
--

LOCK TABLES `t_role_permissions` WRITE;
/*!40000 ALTER TABLE `t_role_permissions` DISABLE KEYS */;
INSERT INTO `t_role_permissions` VALUES (1,11),(1,7),(1,20),(1,21),(1,22),(1,10),(1,3),(1,17),(1,18),(1,5),(1,8),(1,9),(1,4),(1,2),(1,12),(1,6),(1,13),(1,14),(1,15),(1,16),(1,1);
/*!40000 ALTER TABLE `t_role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_role_userinfo`
--

DROP TABLE IF EXISTS `t_role_userinfo`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_role_userinfo` (
  `roles_id` bigint(20) NOT NULL,
  `users_id` bigint(20) NOT NULL,
  KEY `FK3C1B4017FA112A85` (`roles_id`),
  KEY `FK3C1B4017FA144EAF` (`users_id`),
  CONSTRAINT `FK3C1B4017FA112A85` FOREIGN KEY (`roles_id`) REFERENCES `t_trole` (`id`),
  CONSTRAINT `FK3C1B4017FA144EAF` FOREIGN KEY (`users_id`) REFERENCES `t_userinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_role_userinfo`
--

LOCK TABLES `t_role_userinfo` WRITE;
/*!40000 ALTER TABLE `t_role_userinfo` DISABLE KEYS */;
INSERT INTO `t_role_userinfo` VALUES (1,1);
/*!40000 ALTER TABLE `t_role_userinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_rolegroup`
--

DROP TABLE IF EXISTS `t_rolegroup`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_rolegroup` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) default NULL,
  `sequence` int(11) default NULL,
  `parent_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK335949BE745D4387` (`parent_id`),
  CONSTRAINT `FK335949BE745D4387` FOREIGN KEY (`parent_id`) REFERENCES `t_rolegroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_rolegroup`
--

LOCK TABLES `t_rolegroup` WRITE;
/*!40000 ALTER TABLE `t_rolegroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_rolegroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_stockdetailaccount`
--

DROP TABLE IF EXISTS `t_stockdetailaccount`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_stockdetailaccount` (
  `id` bigint(20) NOT NULL auto_increment,
  `billid` bigint(20) default NULL,
  `billsn` varchar(255) default NULL,
  `billitemid` bigint(20) default NULL,
  `types` varchar(255) default NULL,
  `debitorcredit` int(11) default NULL,
  `vdate` datetime default NULL,
  `num` decimal(19,2) default NULL,
  `price` decimal(19,2) default NULL,
  `amount` decimal(19,2) default NULL,
  `depot_id` bigint(20) default NULL,
  `employee_id` bigint(20) default NULL,
  `product_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FKB07ACB117D9644E1` (`depot_id`),
  KEY `FKB07ACB115116B941` (`product_id`),
  KEY `FKB07ACB11E416E5F3` (`employee_id`),
  CONSTRAINT `FKB07ACB117D9644E1` FOREIGN KEY (`depot_id`) REFERENCES `t_depot` (`id`),
  CONSTRAINT `FKB07ACB11E416E5F3` FOREIGN KEY (`employee_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `t_stockdetailaccount_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `t_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_stockdetailaccount`
--

LOCK TABLES `t_stockdetailaccount` WRITE;
/*!40000 ALTER TABLE `t_stockdetailaccount` DISABLE KEYS */;
INSERT INTO `t_stockdetailaccount` VALUES (1,1,'1012170001',1,'11',1,'2010-12-17 00:00:00','50.00','88.00','4400.00',1,NULL,2),(2,1,'1012170001',2,'11',1,'2010-12-17 00:00:00','100.00','98.00','9800.00',1,NULL,1),(3,32768,'1012180001',32768,'12',1,'2010-12-18 00:00:00','88.00','80.00','7040.00',2,NULL,21),(4,32768,'1012180001',32769,'12',1,'2010-12-18 00:00:00','77.00','142.00','10934.00',2,NULL,9),(5,32768,'1012180001',32770,'12',1,'2010-12-18 00:00:00','100.00','278.00','27800.00',2,NULL,24),(6,32768,'1012180001',32771,'12',1,'2010-12-18 00:00:00','120.00','459.00','55080.00',2,NULL,26),(7,32769,'1012180002',32772,'10',1,'2010-12-18 00:00:00','50.00','50.00','2500.00',1,NULL,1),(8,32769,'1012180002',32773,'10',1,'2010-12-18 00:00:00','100.00','80.00','8000.00',1,NULL,3),(9,32769,'1012180002',32774,'10',1,'2010-12-18 00:00:00','70.00','50.00','3500.00',1,NULL,2),(10,32769,'1012180002',32775,'10',1,'2010-12-18 00:00:00','30.00','1200.00','36000.00',1,NULL,4),(11,32769,'1012180002',32776,'10',1,'2010-12-18 00:00:00','50.00','1700.00','85000.00',1,NULL,6),(12,3,'1012170003',13,'11',1,'2010-12-17 00:00:00','1000.00','69.00','69000.00',1,NULL,11),(13,3,'1012170003',14,'11',1,'2010-12-17 00:00:00','1000.00','105.00','105000.00',1,NULL,12),(14,3,'1012170003',15,'11',1,'2010-12-17 00:00:00','1000.00','30.00','30000.00',1,NULL,13),(15,3,'1012170003',16,'11',1,'2010-12-17 00:00:00','1000.00','30.00','30000.00',1,NULL,14),(16,3,'1012170003',17,'11',1,'2010-12-17 00:00:00','1000.00','39.00','39000.00',1,NULL,15),(17,3,'1012170003',18,'11',1,'2010-12-17 00:00:00','1000.00','99.00','99000.00',1,NULL,16),(18,3,'1012170003',19,'11',1,'2010-12-17 00:00:00','1000.00','70.00','70000.00',1,NULL,17),(19,3,'1012170003',20,'11',1,'2010-12-17 00:00:00','1000.00','68.00','68000.00',1,NULL,18),(20,3,'1012170003',21,'11',1,'2010-12-17 00:00:00','1000.00','50.00','50000.00',1,NULL,19),(21,3,'1012170003',22,'11',1,'2010-12-17 00:00:00','1000.00','65.00','65000.00',1,NULL,20),(22,3,'1012170003',23,'11',1,'2010-12-17 00:00:00','1000.00','35.00','35000.00',1,NULL,21),(23,2,'1012170002',3,'11',1,'2010-12-17 00:00:00','500.00','50.00','25000.00',1,NULL,1),(24,2,'1012170002',4,'11',1,'2010-12-17 00:00:00','500.00','50.00','25000.00',1,NULL,2),(25,2,'1012170002',5,'11',1,'2010-12-17 00:00:00','500.00','80.00','40000.00',1,NULL,3),(26,2,'1012170002',6,'11',1,'2010-12-17 00:00:00','1000.00','1200.00','1200000.00',1,NULL,4),(27,2,'1012170002',7,'11',1,'2010-12-17 00:00:00','500.00','120.00','60000.00',1,NULL,5),(28,2,'1012170002',8,'11',1,'2010-12-17 00:00:00','500.00','1700.00','850000.00',1,NULL,6),(29,2,'1012170002',9,'11',1,'2010-12-17 00:00:00','500.00','300.00','150000.00',1,NULL,7),(30,2,'1012170002',10,'11',1,'2010-12-17 00:00:00','500.00','85.00','42500.00',1,NULL,8),(31,2,'1012170002',11,'11',1,'2010-12-17 00:00:00','500.00','90.00','45000.00',1,NULL,9),(32,2,'1012170002',12,'11',1,'2010-12-17 00:00:00','500.00','80.00','40000.00',1,NULL,10),(33,32771,'1012190005',32780,'12',1,'2010-12-18 00:00:00','100.00','90.00','9000.00',2,NULL,9),(34,32771,'1012190005',32781,'12',1,'2010-12-18 00:00:00','88.00','105.00','9240.00',2,NULL,12),(35,32771,'1012190005',32782,'12',1,'2010-12-18 00:00:00','90.00','112.00','10080.00',2,NULL,27),(36,32771,'1012190005',32783,'12',1,'2010-12-18 00:00:00','100.00','109.00','10900.00',2,NULL,39),(37,65536,'1008120001',65536,'10',1,'2010-12-18 00:00:00','50.00','1700.00','85000.00',1,NULL,6),(38,65536,'1008120001',65537,'10',1,'2010-12-18 00:00:00','100.00','120.00','12000.00',1,NULL,5),(39,65536,'1008120001',65538,'10',1,'2010-12-18 00:00:00','100.00','300.00','30000.00',1,NULL,7),(40,65536,'1008120001',65539,'10',1,'2010-12-18 00:00:00','100.00','80.00','8000.00',1,NULL,10),(41,65537,'1008120002',65540,'10',1,'2010-12-18 00:00:00','100.00','120.00','12000.00',1,NULL,43);
/*!40000 ALTER TABLE `t_stockdetailaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_stockincome`
--

DROP TABLE IF EXISTS `t_stockincome`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_stockincome` (
  `id` bigint(20) NOT NULL,
  `sn` varchar(255) default NULL,
  `types` int(11) default NULL,
  `vdate` datetime default NULL,
  `inputtime` datetime default NULL,
  `remark` varchar(255) default NULL,
  `amount` decimal(19,2) default NULL,
  `auditing` bit(1) default NULL,
  `audittime` datetime default NULL,
  `status` int(11) default NULL,
  `keeper_id` bigint(20) default NULL,
  `inputuser_id` bigint(20) default NULL,
  `depot_id` bigint(20) default NULL,
  `supplier_id` bigint(20) default NULL,
  `auditor_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `sn` (`sn`),
  KEY `FKCDB3C0F47D9644E1` (`depot_id`),
  KEY `FKCDB3C0F4135D0BA3` (`auditor_id`),
  KEY `FKCDB3C0F47C6820AC` (`inputuser_id`),
  KEY `FKCDB3C0F445C4CB2F` (`keeper_id`),
  KEY `FKCDB3C0F4E627A933` (`supplier_id`),
  CONSTRAINT `FKCDB3C0F4135D0BA3` FOREIGN KEY (`auditor_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FKCDB3C0F445C4CB2F` FOREIGN KEY (`keeper_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FKCDB3C0F47C6820AC` FOREIGN KEY (`inputuser_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FKCDB3C0F47D9644E1` FOREIGN KEY (`depot_id`) REFERENCES `t_depot` (`id`),
  CONSTRAINT `FKCDB3C0F4E627A933` FOREIGN KEY (`supplier_id`) REFERENCES `t_client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_stockincome`
--

LOCK TABLES `t_stockincome` WRITE;
/*!40000 ALTER TABLE `t_stockincome` DISABLE KEYS */;
INSERT INTO `t_stockincome` VALUES (1,'1012170001',1,'2010-12-17 00:00:00','2010-12-17 14:33:45',NULL,'14200.00','','2010-12-17 14:37:36',NULL,NULL,1,1,32768,1),(2,'1012170002',1,'2010-12-17 00:00:00','2010-12-17 16:05:37',NULL,'2477500.00','','2010-12-18 15:26:16',NULL,NULL,1,1,32772,1),(3,'1012170003',1,'2010-12-17 00:00:00','2010-12-17 16:07:49',NULL,'660000.00','','2010-12-18 15:26:10',NULL,NULL,1,1,32771,1),(4,'101217004',1,'2010-12-17 00:00:00','2010-12-17 16:11:15',NULL,'950000.00',NULL,NULL,NULL,NULL,1,1,32773,NULL),(32768,'1012180001',2,'2010-12-18 00:00:00','2010-12-18 15:09:17',NULL,'100854.00','','2010-12-18 15:09:21',NULL,NULL,1,2,32769,1),(32769,'1012180002',0,'2010-12-18 00:00:00','2010-12-18 15:24:26',NULL,'135000.00','','2010-12-18 15:26:01',NULL,NULL,1,1,32773,1),(32771,'1012190005',2,'2010-12-18 00:00:00','2010-12-18 15:44:48',NULL,'39220.00','','2010-12-18 15:44:52',NULL,NULL,1,2,32773,1),(65536,'1008120001',0,'2010-12-18 00:00:00','2010-08-12 16:59:27',NULL,'135000.00','','2010-08-12 16:59:31',NULL,NULL,1,1,32773,1),(65537,'1008120002',0,'2010-12-18 00:00:00','2010-08-12 17:00:24',NULL,'12000.00','','2010-08-12 17:00:33',NULL,NULL,1,1,32773,1);
/*!40000 ALTER TABLE `t_stockincome` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_stockincomeitem`
--

DROP TABLE IF EXISTS `t_stockincomeitem`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_stockincomeitem` (
  `id` bigint(20) NOT NULL,
  `price` decimal(19,2) default NULL,
  `num` decimal(19,2) default NULL,
  `amount` decimal(19,2) default NULL,
  `remark` varchar(255) default NULL,
  `bill_id` bigint(20) default NULL,
  `product_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK5B73A2075116B941` (`product_id`),
  KEY `FK5B73A207150C2F19` (`bill_id`),
  CONSTRAINT `FK5B73A207150C2F19` FOREIGN KEY (`bill_id`) REFERENCES `t_stockincome` (`id`),
  CONSTRAINT `t_stockincomeitem_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `t_product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_stockincomeitem`
--

LOCK TABLES `t_stockincomeitem` WRITE;
/*!40000 ALTER TABLE `t_stockincomeitem` DISABLE KEYS */;
INSERT INTO `t_stockincomeitem` VALUES (1,'88.00','50.00','4400.00','',1,2),(2,'98.00','100.00','9800.00','',1,1),(3,'50.00','500.00','25000.00','',2,1),(4,'50.00','500.00','25000.00','',2,2),(5,'80.00','500.00','40000.00','',2,3),(6,'1200.00','1000.00','1200000.00','',2,4),(7,'120.00','500.00','60000.00','',2,5),(8,'1700.00','500.00','850000.00','',2,6),(9,'300.00','500.00','150000.00','',2,7),(10,'85.00','500.00','42500.00','',2,8),(11,'90.00','500.00','45000.00','',2,9),(12,'80.00','500.00','40000.00','',2,10),(13,'69.00','1000.00','69000.00','',3,11),(14,'105.00','1000.00','105000.00','',3,12),(15,'30.00','1000.00','30000.00','',3,13),(16,'30.00','1000.00','30000.00','',3,14),(17,'39.00','1000.00','39000.00','',3,15),(18,'99.00','1000.00','99000.00','',3,16),(19,'70.00','1000.00','70000.00','',3,17),(20,'68.00','1000.00','68000.00','',3,18),(21,'50.00','1000.00','50000.00','',3,19),(22,'65.00','1000.00','65000.00','',3,20),(23,'35.00','1000.00','35000.00','',3,21),(24,'50.00','500.00','25000.00','',4,22),(25,'45.00','500.00','22500.00','',4,23),(26,'200.00','500.00','100000.00','',4,24),(27,'120.00','500.00','60000.00','',4,25),(28,'400.00','500.00','200000.00','',4,26),(29,'112.00','500.00','56000.00','',4,27),(30,'100.00','500.00','50000.00','',4,28),(31,'199.00','500.00','99500.00','',4,29),(32,'260.00','500.00','130000.00','',4,30),(33,'60.00','500.00','30000.00','',4,31),(34,'55.00','500.00','27500.00','',4,36),(35,'299.00','500.00','149500.00','',4,38),(32768,'80.00','88.00','7040.00','',32768,21),(32769,'142.00','77.00','10934.00','',32768,9),(32770,'278.00','100.00','27800.00','',32768,24),(32771,'459.00','120.00','55080.00','',32768,26),(32772,'50.00','50.00','2500.00','',32769,1),(32773,'80.00','100.00','8000.00','',32769,3),(32774,'50.00','70.00','3500.00','',32769,2),(32775,'1200.00','30.00','36000.00','',32769,4),(32776,'1700.00','50.00','85000.00','',32769,6),(32780,'90.00','100.00','9000.00','',32771,9),(32781,'105.00','88.00','9240.00','',32771,12),(32782,'112.00','90.00','10080.00','',32771,27),(32783,'109.00','100.00','10900.00','',32771,39),(65536,'1700.00','50.00','85000.00','',65536,6),(65537,'120.00','100.00','12000.00','',65536,5),(65538,'300.00','100.00','30000.00','',65536,7),(65539,'80.00','100.00','8000.00','',65536,10),(65540,'120.00','100.00','12000.00','',65537,43);
/*!40000 ALTER TABLE `t_stockincomeitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_stockoutcome`
--

DROP TABLE IF EXISTS `t_stockoutcome`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_stockoutcome` (
  `id` bigint(20) NOT NULL,
  `sn` varchar(255) default NULL,
  `types` int(11) default NULL,
  `vdate` datetime default NULL,
  `inputtime` datetime default NULL,
  `remark` varchar(255) default NULL,
  `saleamount` decimal(19,2) default NULL,
  `amount` decimal(19,2) default NULL,
  `auditing` bit(1) default NULL,
  `audittime` datetime default NULL,
  `status` int(11) default NULL,
  `keeper_id` bigint(20) default NULL,
  `inputuser_id` bigint(20) default NULL,
  `client_id` bigint(20) default NULL,
  `auditor_id` bigint(20) default NULL,
  `depot_id` bigint(20) default NULL,
  `seller_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `sn` (`sn`),
  KEY `FK3305D1677D9644E1` (`depot_id`),
  KEY `FK3305D167135D0BA3` (`auditor_id`),
  KEY `FK3305D1677C6820AC` (`inputuser_id`),
  KEY `FK3305D16745C4CB2F` (`keeper_id`),
  KEY `FK3305D167F3195F13` (`client_id`),
  KEY `FK3305D16753607F82` (`seller_id`),
  CONSTRAINT `FK3305D167135D0BA3` FOREIGN KEY (`auditor_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FK3305D16745C4CB2F` FOREIGN KEY (`keeper_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FK3305D16753607F82` FOREIGN KEY (`seller_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FK3305D1677C6820AC` FOREIGN KEY (`inputuser_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FK3305D1677D9644E1` FOREIGN KEY (`depot_id`) REFERENCES `t_depot` (`id`),
  CONSTRAINT `FK3305D167F3195F13` FOREIGN KEY (`client_id`) REFERENCES `t_client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_stockoutcome`
--

LOCK TABLES `t_stockoutcome` WRITE;
/*!40000 ALTER TABLE `t_stockoutcome` DISABLE KEYS */;
INSERT INTO `t_stockoutcome` VALUES (1,'1007070001',0,'2010-12-17 00:00:00','2010-12-17 15:18:50',NULL,NULL,'7450.00',NULL,NULL,NULL,NULL,1,5,NULL,1,NULL),(2,'1007070002',0,'2010-12-17 00:00:00','2010-12-17 15:24:31',NULL,NULL,'29350.00',NULL,NULL,NULL,NULL,1,11,NULL,1,NULL),(3,'1007070003',0,'2010-12-17 00:00:00','2010-12-17 15:24:52',NULL,NULL,'436050.00',NULL,NULL,NULL,NULL,1,17,NULL,1,NULL),(4,'1007070004',0,'2010-12-17 00:00:00','2010-12-17 15:26:38',NULL,NULL,'231000.00',NULL,NULL,NULL,NULL,1,32768,NULL,1,NULL),(5,'1007070005',0,'2010-12-17 00:00:00','2010-12-17 15:26:57',NULL,NULL,'120500.00',NULL,NULL,NULL,NULL,1,23,NULL,1,NULL),(6,'1007070010',1,'2010-12-17 00:00:00','2010-12-17 15:37:54',NULL,NULL,'172400.00',NULL,NULL,NULL,NULL,1,2,NULL,1,NULL),(7,'101210001',1,'2010-12-17 00:00:00','2010-12-17 15:44:16',NULL,NULL,'115850.00',NULL,NULL,NULL,NULL,1,5,NULL,2,NULL),(8,'1012170002',1,'2010-12-17 00:00:00','2010-12-17 15:52:59',NULL,NULL,'20150.00',NULL,NULL,NULL,NULL,1,22,NULL,1,NULL),(32768,'1012190001',2,'2010-12-18 00:00:00','2010-12-18 15:25:56',NULL,NULL,'19270.00',NULL,NULL,NULL,NULL,1,12,NULL,1,NULL),(32769,'1012180001',0,'2010-12-18 00:00:00','2010-12-18 15:33:50',NULL,NULL,'500.00',NULL,NULL,NULL,NULL,1,1,NULL,1,NULL),(65536,'1012180002',0,'2010-12-18 00:00:00','2010-12-18 16:32:20',NULL,NULL,'350.00',NULL,NULL,NULL,NULL,1,10,NULL,1,NULL);
/*!40000 ALTER TABLE `t_stockoutcome` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_stockoutcomeitem`
--

DROP TABLE IF EXISTS `t_stockoutcomeitem`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_stockoutcomeitem` (
  `id` bigint(20) NOT NULL,
  `saleprice` decimal(19,2) default NULL,
  `price` decimal(19,2) default NULL,
  `num` decimal(19,2) default NULL,
  `saleamount` decimal(19,2) default NULL,
  `amount` decimal(19,2) default NULL,
  `remark` varchar(255) default NULL,
  `product_id` bigint(20) default NULL,
  `bill_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FKAF9240FA5116B941` (`product_id`),
  KEY `FKAF9240FA9B239628` (`bill_id`),
  CONSTRAINT `FKAF9240FA9B239628` FOREIGN KEY (`bill_id`) REFERENCES `t_stockoutcome` (`id`),
  CONSTRAINT `t_stockoutcomeitem_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `t_product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_stockoutcomeitem`
--

LOCK TABLES `t_stockoutcomeitem` WRITE;
/*!40000 ALTER TABLE `t_stockoutcomeitem` DISABLE KEYS */;
INSERT INTO `t_stockoutcomeitem` VALUES (1,NULL,'149.00','50.00',NULL,'7450.00','',62,1),(2,NULL,'88.00','50.00',NULL,'4400.00','',76,2),(3,NULL,'499.00','50.00',NULL,'24950.00','',7,2),(4,NULL,'2050.00','200.00',NULL,'410000.00','',6,3),(5,NULL,'89.00','200.00',NULL,'17800.00','',11,3),(6,NULL,'55.00','150.00',NULL,'8250.00','',13,3),(7,NULL,'1480.00','100.00',NULL,'148000.00','',4,4),(8,NULL,'142.00','500.00',NULL,'71000.00','',9,4),(9,NULL,'120.00','100.00',NULL,'12000.00','',17,4),(10,NULL,'200.00','500.00',NULL,'100000.00','',10,5),(11,NULL,'2050.00','10.00',NULL,'20500.00','',6,5),(12,NULL,'1480.00','100.00',NULL,'148000.00','',4,6),(13,NULL,'89.00','100.00',NULL,'8900.00','',11,6),(14,NULL,'155.00','100.00',NULL,'15500.00','',12,6),(15,NULL,'125.00','50.00',NULL,'6250.00','',3,7),(16,NULL,'2050.00','50.00',NULL,'102500.00','',6,7),(17,NULL,'142.00','50.00',NULL,'7100.00','',9,7),(18,NULL,'80.00','50.00',NULL,'4000.00','',3,8),(19,NULL,'105.00','50.00',NULL,'5250.00','',12,8),(20,NULL,'109.00','100.00',NULL,'10900.00','',39,8),(32768,'298.00','210.00','27.00','8046.00','5670.00','',55,32768),(32769,'278.00','200.00','50.00','13900.00','10000.00','',24,32768),(32770,'278.00','200.00','18.00','5004.00','3600.00','',24,32768),(32771,'98.00','50.00','10.00','980.00','500.00','',1,32769),(65536,'80.00','35.00','10.00','800.00','350.00','',21,65536);
/*!40000 ALTER TABLE `t_stockoutcomeitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_supplierproduct`
--

DROP TABLE IF EXISTS `t_supplierproduct`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_supplierproduct` (
  `id` bigint(20) NOT NULL,
  `price` decimal(19,2) default NULL,
  `intro` varchar(255) default NULL,
  `product_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK428163D85116B941` (`product_id`),
  CONSTRAINT `t_supplierproduct_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `t_product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_supplierproduct`
--

LOCK TABLES `t_supplierproduct` WRITE;
/*!40000 ALTER TABLE `t_supplierproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_supplierproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemdictionary`
--

DROP TABLE IF EXISTS `t_systemdictionary`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemdictionary` (
  `id` bigint(20) NOT NULL,
  `sn` varchar(255) default NULL,
  `title` varchar(255) default NULL,
  `intro` varchar(255) default NULL,
  `category` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemdictionary`
--

LOCK TABLES `t_systemdictionary` WRITE;
/*!40000 ALTER TABLE `t_systemdictionary` DISABLE KEYS */;
INSERT INTO `t_systemdictionary` VALUES (1,'trade','行业',NULL,NULL),(2,'ProductBrand','品牌',NULL,NULL),(32769,'ProductUnit','货品单位',NULL,NULL),(98304,'clientType','客户类型',NULL,NULL),(98305,'clientSource','客户来源',NULL,NULL);
/*!40000 ALTER TABLE `t_systemdictionary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemdictionarydetail`
--

DROP TABLE IF EXISTS `t_systemdictionarydetail`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemdictionarydetail` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) default NULL,
  `tvalue` varchar(255) default NULL,
  `sequence` int(11) default NULL,
  `intro` varchar(255) default NULL,
  `parent_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK746710C1C4FAC886` (`parent_id`),
  CONSTRAINT `FK746710C1C4FAC886` FOREIGN KEY (`parent_id`) REFERENCES `t_systemdictionary` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemdictionarydetail`
--

LOCK TABLES `t_systemdictionarydetail` WRITE;
/*!40000 ALTER TABLE `t_systemdictionarydetail` DISABLE KEYS */;
INSERT INTO `t_systemdictionarydetail` VALUES (1,'服装','FZ',1,NULL,1),(2,'迪奥','Dior',1,NULL,2),(3,'杰克琼斯','Jack Jones',2,NULL,2),(32768,'Abercrombie Fitch','A&F',3,NULL,2),(32769,'阿玛尼','Armani',4,NULL,2),(32770,'巴宝利','Burberry',5,NULL,2),(32771,'Calvin Klein','CK',6,NULL,2),(32772,'迪赛','Diesel',7,NULL,2),(32773,'Dolce & Gabbana','D&G',8,NULL,2),(32774,'Evisu','Evisu',9,NULL,2),(32775,'G-Star','G-Star',10,NULL,2),(32776,'Hugo Boss','Hugo Boss',11,NULL,2),(32777,'ABC','ABC',12,NULL,2),(32778,'与狼共舞','D-wolves',13,NULL,2),(32779,'Clot','Clot',14,NULL,2),(32780,'件','pieces',1,NULL,32769),(65536,'Cendile','Cendile',15,NULL,2),(65537,'basic house','basic house',16,NULL,2),(65538,'ES','ES',17,NULL,2),(65539,'SY','SY',18,NULL,2),(65540,'SENT','SENT',19,NULL,2),(65541,'XSENT','XSENT',20,NULL,2),(65542,'vero moda','vero moda',21,NULL,2),(65543,'SZ','SZ',22,NULL,2),(65544,'I”m bobo','bobo',23,NULL,2),(65545,'DEERE MARCHI','DEERE MARCHI',24,NULL,2),(65546,'稻草人','Mexican',25,NULL,2),(65547,'5cm','5cm',26,NULL,2),(65548,'条','条',2,NULL,32769),(65549,'雅狼兄弟','雅狼兄弟',27,NULL,2),(65550,'only','only',28,NULL,2),(65551,'miss sixty','miss sixty',29,NULL,2),(65552,'普莱恩斯克','primcycl',30,NULL,2),(65553,'Mr.Faddo','Mr.Faddo',31,NULL,2),(65554,'Redopin','Redopin',32,NULL,2),(65555,'淑女屋','淑女屋',33,NULL,2),(65556,'SELFace','SELFace',34,NULL,2),(65557,'H&M','H&M',35,NULL,2),(65558,'Lee','Lee',36,NULL,2),(65559,' Teenie Weenie',' Teenie Weenie',37,NULL,2),(65560,'Levi\'s','Levi\'s',38,NULL,2),(65561,'PPZ','PPZ',39,NULL,2),(65562,'MO','MO',40,NULL,2),(65563,'麻吉','match',41,NULL,2),(65564,'虎都','虎都',42,NULL,2),(65565,'七匹狼','七匹狼',43,NULL,2),(65566,'沂源','沂源',44,NULL,2),(131072,'类型1','类型1',1,NULL,98304),(131073,'网络','网络',1,NULL,98305);
/*!40000 ALTER TABLE `t_systemdictionarydetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemhelpdoc`
--

DROP TABLE IF EXISTS `t_systemhelpdoc`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemhelpdoc` (
  `id` bigint(20) NOT NULL,
  `fun` varchar(255) default NULL,
  `title` varchar(255) default NULL,
  `types` int(11) default NULL,
  `applyto` varchar(255) default NULL,
  `url` varchar(255) default NULL,
  `content` text,
  `demo` varchar(255) default NULL,
  `auditing` bit(1) default NULL,
  `inputtime` datetime default NULL,
  `modifytime` datetime default NULL,
  `sequence` int(11) default NULL,
  `menu_id` bigint(20) default NULL,
  `inputuser_id` bigint(20) default NULL,
  `parent_id` bigint(20) default NULL,
  `modifyuser_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FKCE7864BD4D1B007A` (`menu_id`),
  KEY `FKCE7864BDD8B5A702` (`inputuser_id`),
  KEY `FKCE7864BD51B5C7E7` (`parent_id`),
  KEY `FKCE7864BD6D1B9812` (`modifyuser_id`),
  CONSTRAINT `FKCE7864BD4D1B007A` FOREIGN KEY (`menu_id`) REFERENCES `t_systemmenu` (`id`),
  CONSTRAINT `FKCE7864BD51B5C7E7` FOREIGN KEY (`parent_id`) REFERENCES `t_systemhelpdoc` (`id`),
  CONSTRAINT `FKCE7864BD6D1B9812` FOREIGN KEY (`modifyuser_id`) REFERENCES `t_userinfo` (`id`),
  CONSTRAINT `FKCE7864BDD8B5A702` FOREIGN KEY (`inputuser_id`) REFERENCES `t_userinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemhelpdoc`
--

LOCK TABLES `t_systemhelpdoc` WRITE;
/*!40000 ALTER TABLE `t_systemhelpdoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_systemhelpdoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemhelpdoc_relativeitem`
--

DROP TABLE IF EXISTS `t_systemhelpdoc_relativeitem`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemhelpdoc_relativeitem` (
  `systemhelpdoc_id` bigint(20) NOT NULL,
  `relativeitems_id` bigint(20) NOT NULL,
  KEY `FK567A902117FB689` (`systemhelpdoc_id`),
  KEY `FK567A9021536EF7DD` (`relativeitems_id`),
  CONSTRAINT `FK567A902117FB689` FOREIGN KEY (`systemhelpdoc_id`) REFERENCES `t_systemhelpdoc` (`id`),
  CONSTRAINT `FK567A9021536EF7DD` FOREIGN KEY (`relativeitems_id`) REFERENCES `t_systemhelpdoc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemhelpdoc_relativeitem`
--

LOCK TABLES `t_systemhelpdoc_relativeitem` WRITE;
/*!40000 ALTER TABLE `t_systemhelpdoc_relativeitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_systemhelpdoc_relativeitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemlog`
--

DROP TABLE IF EXISTS `t_systemlog`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemlog` (
  `id` bigint(20) NOT NULL,
  `vdate` datetime default NULL,
  `ip` varchar(255) default NULL,
  `action` varchar(255) default NULL,
  `cmd` varchar(255) default NULL,
  `types` int(11) default NULL,
  `params` text,
  `user_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK622F48AA123760C` (`user_id`),
  CONSTRAINT `FK622F48AA123760C` FOREIGN KEY (`user_id`) REFERENCES `t_userinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemlog`
--

LOCK TABLES `t_systemlog` WRITE;
/*!40000 ALTER TABLE `t_systemlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_systemlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemmenu`
--

DROP TABLE IF EXISTS `t_systemmenu`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemmenu` (
  `id` bigint(20) NOT NULL,
  `title` varchar(100) default NULL,
  `url` varchar(250) default NULL,
  `types` varchar(100) default NULL,
  `sequence` int(11) default NULL,
  `appclass` varchar(255) default NULL,
  `otherscripts` varchar(255) default NULL,
  `pack` varchar(255) default NULL,
  `icon` varchar(255) default NULL,
  `status` int(11) default NULL,
  `params` varchar(255) default NULL,
  `fee` double default NULL,
  `sn` varchar(32) default NULL,
  `vrtype` varchar(100) default NULL,
  `therole` varchar(255) default NULL,
  `issystem` bit(1) default NULL,
  `actionclass` varchar(255) default NULL,
  `parent_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `sn` (`sn`),
  KEY `FKE3BA1CB98FDC454F` (`parent_id`),
  CONSTRAINT `FKE3BA1CB98FDC454F` FOREIGN KEY (`parent_id`) REFERENCES `t_systemmenu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemmenu`
--

LOCK TABLES `t_systemmenu` WRITE;
/*!40000 ALTER TABLE `t_systemmenu` DISABLE KEYS */;
INSERT INTO `t_systemmenu` VALUES (1,'系统管理','',NULL,6,'','','','',0,'',NULL,'XTGL',NULL,NULL,'','',NULL),(2,'部门管理','basic/DepartmentPanel.js',NULL,2,'DepartmentPanel','','','',0,'',NULL,'BMGL',NULL,NULL,'','',1),(3,'员工管理','basic/EmployeeManage.js',NULL,3,'EmployeeManagePanel','','','',0,'',NULL,'YGGL',NULL,NULL,'','',1),(4,'系统权限设置','',NULL,5,'','','','',0,'',NULL,'XTQXSZ',NULL,NULL,'','',1),(5,'系统菜单','systemManage/SystemMenuManagePanel.js',NULL,1,'SystemMenuManagePanel','','','',0,'',NULL,'XTCD',NULL,NULL,'','',4),(6,'系统角色','systemManage/RoleManagePanel.js',NULL,2,'RoleManagePanel','','','',0,' ',NULL,'XTJS',NULL,NULL,'','',4),(7,'系统权限','systemManage/PermissionPanel.js',NULL,3,'PermissionPanelManage','','','',0,'',NULL,'XTQX',NULL,NULL,'\0','',4),(8,'系统资源','systemManage/SystemResourcePanel.js',NULL,4,'SystemResourcePanel','','','',0,'',NULL,'XTZY',NULL,NULL,'\0','',4),(9,'数据字典','systemManage/SystemDictionaryManagePanel.js',NULL,1,'SystemDictionaryManagePanel','','','',0,'',NULL,'SJZD',NULL,NULL,'\0','',1),(10,'日志查看','systemManage/SystemLogPanel.js',NULL,4,'SystemLogPanel','','','',0,'',NULL,'RZCK',NULL,NULL,'','',1),(65536,'基础数据维护','',NULL,5,'','','','',0,'',NULL,'JCSJWF',NULL,NULL,'\0','',NULL),(65537,'客户管理','basic/ClientPanel.js',NULL,4,'ClientPanel','','','',0,'',NULL,'KHGL',NULL,NULL,'\0','',65536),(65538,'报表中心','',NULL,4,'','','','',0,'',NULL,'BBZX',NULL,NULL,'\0','',NULL),(98304,'货品管理','basic/ProductPanel.js',NULL,1,'ProductPanel','','','',0,'',NULL,'HPGL',NULL,NULL,'\0','',65536),(98305,'货品分类设置','basic/ProductDirManagePanel.js',NULL,2,'ProductDirManagePanel','','','',0,'',NULL,'HPFL',NULL,NULL,'\0','',65536),(98306,'仓库设置','basic/DepotPanel.js',NULL,3,'DepotPanel','','','',0,'',NULL,'CKSZ',NULL,NULL,'\0','',65536),(98307,'供应商管理','basic/SupplierPanel.js',NULL,5,'SupplierPanel','','','',0,'',NULL,'GYSGL',NULL,NULL,'\0','',65536),(98308,'采购报表','PurchaseReportPanel.js',NULL,1,'PurchaseReportPanel','','','',0,'',NULL,'CGBB',NULL,NULL,'\0','',65538),(98309,'销售报表','SaleReportPanel.js',NULL,2,'SaleReportPanel','','','',0,'',NULL,'XSBB',NULL,NULL,'\0','',65538),(98310,'进销存汇总表','chart/ERPSummarySheetPanel.js',NULL,5,'ERPSummarySheetPanel','','','',0,'',NULL,'JXCHZB',NULL,NULL,'\0','',65538),(98311,'进销存明细帐','chart/ERPAccountDetailPanel.js',NULL,3,'ERPAccountDetailPanel','','','',0,'',NULL,'JXCMXZ',NULL,NULL,'\0','',65538),(98312,'库存管理','',NULL,3,'','','','',0,'',NULL,'KCGL',NULL,NULL,'\0','',NULL),(98313,'销售管理','',NULL,2,'','','','',0,'',NULL,'XSGL',NULL,NULL,'\0','',NULL),(98314,'采购管理','',NULL,1,'','','','',0,'',NULL,'CGGL',NULL,NULL,'\0','',NULL),(98317,'采购单管理','PurchaseBillPanel.js',NULL,1,'PurchaseBillPanel','','','',0,'',NULL,'CGDGL',NULL,NULL,'\0','',98314),(98320,'销售订单管理','OrderInfoPanel.js',NULL,1,'OrderInfoPanel','','','',0,'',NULL,'XSDDGL',NULL,NULL,'\0','',98313),(98321,'库存查询','stock/ProductStockPanel.js',NULL,1,'ProductStockPanel','','','',0,'',NULL,'KCCX2',NULL,NULL,'\0','',98313),(98322,'即时库存','stock/ProductStockPanel.js',NULL,1,'ProductStockPanel','','','',0,'',NULL,'JSKC',NULL,NULL,'\0','',98312),(98323,'出库','',NULL,1,'','','','',0,'',NULL,'CK',NULL,NULL,'\0','',98312),(98324,'入库','',NULL,1,'','','','',0,'',NULL,'RK',NULL,NULL,'','',98312),(98325,'销售出库','stock/SellStockOutcomePanel.js',NULL,1,'SellStockOutcomePanel','','','',0,'',NULL,'321',NULL,NULL,'\0','',98323),(98326,'生产领料','stock/MaterialStockOutcomePanel.js',NULL,2,'MaterialStockOutcomePanel','','','',0,'',NULL,'322',NULL,NULL,'\0','',98323),(98327,'其它出库','stock/OtherStockOutcomePanel.js',NULL,3,'OtherStockOutcomePanel','','','',0,'',NULL,'323',NULL,NULL,'\0','',98323),(98328,'期初入库','stock/BeginningStockIncomePanel.js',NULL,1,'BeginningStockIncomePanel','','','',0,'',NULL,'331',NULL,NULL,'\0','',98324),(98329,'采购入库','stock/StockIncomePanel.js',NULL,2,'StockIncomePanel','','','',0,'',NULL,'332',NULL,NULL,'\0','',98324),(98330,'其它入库','stock/OtherStockIncomePanel.js',NULL,3,'OtherStockIncomePanel','','','',0,'',NULL,'333',NULL,NULL,'\0','',98324),(131072,'进销存序时帐','chart/ERPJournalLedgerPanel.js',NULL,4,'ERPJournalLedgerPanel','','','',0,'',NULL,'JXCSXZ',NULL,NULL,'\0','',65538);
/*!40000 ALTER TABLE `t_systemmenu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemmenu_roles`
--

DROP TABLE IF EXISTS `t_systemmenu_roles`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemmenu_roles` (
  `systemmenu_id` bigint(20) NOT NULL,
  `theroles_id` bigint(20) NOT NULL,
  KEY `FKC1ACDFB72E87E9F6` (`theroles_id`),
  KEY `FKC1ACDFB762D18B6B` (`systemmenu_id`),
  CONSTRAINT `FKC1ACDFB72E87E9F6` FOREIGN KEY (`theroles_id`) REFERENCES `t_trole` (`id`),
  CONSTRAINT `FKC1ACDFB762D18B6B` FOREIGN KEY (`systemmenu_id`) REFERENCES `t_systemmenu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemmenu_roles`
--

LOCK TABLES `t_systemmenu_roles` WRITE;
/*!40000 ALTER TABLE `t_systemmenu_roles` DISABLE KEYS */;
INSERT INTO `t_systemmenu_roles` VALUES (98308,1),(98309,1),(98310,1),(98311,1),(131072,1),(2,1),(9,1),(65537,1),(98304,1),(98305,1),(98306,1),(3,1),(98317,1),(98320,1),(98323,1),(98324,1),(4,1);
/*!40000 ALTER TABLE `t_systemmenu_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemmenu_tpermission`
--

DROP TABLE IF EXISTS `t_systemmenu_tpermission`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemmenu_tpermission` (
  `systemmenu_id` bigint(20) NOT NULL,
  `permissions_id` bigint(20) NOT NULL,
  KEY `FK1D2F2BD6D7FF337` (`permissions_id`),
  KEY `FK1D2F2BD62D18B6B` (`systemmenu_id`),
  CONSTRAINT `FK1D2F2BD62D18B6B` FOREIGN KEY (`systemmenu_id`) REFERENCES `t_systemmenu` (`id`),
  CONSTRAINT `FK1D2F2BD6D7FF337` FOREIGN KEY (`permissions_id`) REFERENCES `t_tpermission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemmenu_tpermission`
--

LOCK TABLES `t_systemmenu_tpermission` WRITE;
/*!40000 ALTER TABLE `t_systemmenu_tpermission` DISABLE KEYS */;
INSERT INTO `t_systemmenu_tpermission` VALUES (98308,11),(98309,7),(98311,20),(131072,21),(98310,22),(9,17),(9,18),(98304,8),(98305,9),(98306,4),(65537,2),(2,3),(4,1),(98317,11),(98317,12),(98320,6),(98320,7),(98323,13),(98323,14),(98324,15),(98324,16);
/*!40000 ALTER TABLE `t_systemmenu_tpermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemmenutemplate`
--

DROP TABLE IF EXISTS `t_systemmenutemplate`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemmenutemplate` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) default NULL,
  `intro` varchar(255) default NULL,
  `status` int(11) default NULL,
  `sequence` int(11) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemmenutemplate`
--

LOCK TABLES `t_systemmenutemplate` WRITE;
/*!40000 ALTER TABLE `t_systemmenutemplate` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_systemmenutemplate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemmenutemplateitem`
--

DROP TABLE IF EXISTS `t_systemmenutemplateitem`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemmenutemplateitem` (
  `id` bigint(20) NOT NULL,
  `title` varchar(100) default NULL,
  `url` varchar(250) default NULL,
  `types` varchar(100) default NULL,
  `sequence` int(11) default NULL,
  `appclass` varchar(255) default NULL,
  `otherscripts` varchar(255) default NULL,
  `pack` varchar(255) default NULL,
  `icon` varchar(255) default NULL,
  `status` int(11) default NULL,
  `params` varchar(255) default NULL,
  `fee` double default NULL,
  `template_id` bigint(20) default NULL,
  `menu_id` bigint(20) default NULL,
  `parent_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK93FD49C64D1B007A` (`menu_id`),
  KEY `FK93FD49C6C247119` (`template_id`),
  KEY `FK93FD49C66AB8C19C` (`parent_id`),
  CONSTRAINT `FK93FD49C64D1B007A` FOREIGN KEY (`menu_id`) REFERENCES `t_systemmenu` (`id`),
  CONSTRAINT `FK93FD49C66AB8C19C` FOREIGN KEY (`parent_id`) REFERENCES `t_systemmenutemplateitem` (`id`),
  CONSTRAINT `FK93FD49C6C247119` FOREIGN KEY (`template_id`) REFERENCES `t_systemmenutemplate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemmenutemplateitem`
--

LOCK TABLES `t_systemmenutemplateitem` WRITE;
/*!40000 ALTER TABLE `t_systemmenutemplateitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_systemmenutemplateitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemmenutemplateitem_roles`
--

DROP TABLE IF EXISTS `t_systemmenutemplateitem_roles`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemmenutemplateitem_roles` (
  `systemmenutemplateitem_id` bigint(20) NOT NULL,
  `theroles_id` bigint(20) NOT NULL,
  KEY `FK1BCB4F042E87E9F6` (`theroles_id`),
  KEY `FK1BCB4F04F75E2B0B` (`systemmenutemplateitem_id`),
  CONSTRAINT `FK1BCB4F042E87E9F6` FOREIGN KEY (`theroles_id`) REFERENCES `t_trole` (`id`),
  CONSTRAINT `FK1BCB4F04F75E2B0B` FOREIGN KEY (`systemmenutemplateitem_id`) REFERENCES `t_systemmenutemplateitem` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemmenutemplateitem_roles`
--

LOCK TABLES `t_systemmenutemplateitem_roles` WRITE;
/*!40000 ALTER TABLE `t_systemmenutemplateitem_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_systemmenutemplateitem_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemregion`
--

DROP TABLE IF EXISTS `t_systemregion`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemregion` (
  `id` bigint(20) NOT NULL auto_increment,
  `sn` varchar(255) default NULL,
  `title` varchar(255) default NULL,
  `englishname` varchar(100) default NULL,
  `spell` varchar(100) default NULL,
  `shortspell` varchar(50) default NULL,
  `path` varchar(255) default NULL,
  `lev` int(11) default NULL,
  `sequence` int(11) default NULL,
  `inputtime` datetime default NULL,
  `inputuser` varchar(255) default NULL,
  `status` int(11) default NULL,
  `intro` varchar(255) default NULL,
  `parent_sn` varchar(255) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `sn` (`sn`),
  KEY `FKE62ABFCE514E1024` (`parent_sn`),
  CONSTRAINT `FKE62ABFCE514E1024` FOREIGN KEY (`parent_sn`) REFERENCES `t_systemregion` (`sn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemregion`
--

LOCK TABLES `t_systemregion` WRITE;
/*!40000 ALTER TABLE `t_systemregion` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_systemregion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_systemuser`
--

DROP TABLE IF EXISTS `t_systemuser`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_systemuser` (
  `id` bigint(20) NOT NULL,
  `truename` varchar(50) default NULL,
  `tel` varchar(100) default NULL,
  `im` varchar(100) default NULL,
  `remark` text,
  PRIMARY KEY  (`id`),
  KEY `FKE3BDF3259E89518` (`id`),
  CONSTRAINT `FKE3BDF3259E89518` FOREIGN KEY (`id`) REFERENCES `t_userinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_systemuser`
--

LOCK TABLES `t_systemuser` WRITE;
/*!40000 ALTER TABLE `t_systemuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_systemuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_tpermission`
--

DROP TABLE IF EXISTS `t_tpermission`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_tpermission` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) default NULL,
  `sn` varchar(50) default NULL,
  `description` varchar(250) default NULL,
  `operation` varchar(250) default NULL,
  `status` int(11) default NULL,
  `parent_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `FK471215F888946B4E` (`parent_id`),
  CONSTRAINT `FK471215F888946B4E` FOREIGN KEY (`parent_id`) REFERENCES `t_permissiongroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_tpermission`
--

LOCK TABLES `t_tpermission` WRITE;
/*!40000 ALTER TABLE `t_tpermission` DISABLE KEYS */;
INSERT INTO `t_tpermission` VALUES (1,'系统权限设置',NULL,'系统权限设置',NULL,0,26),(2,'com.lanyotech.pps.mvc.ClientAction:ALL',NULL,'ALL','1',0,21),(3,'com.lanyotech.pps.mvc.DepartmentAction:ALL',NULL,'ALL',NULL,0,24),(4,'com.lanyotech.pps.mvc.DepotAction:ALL',NULL,'ALL','1',0,20),(5,'com.lanyotech.pps.mvc.EmployeeAction:ALL',NULL,'ALL',NULL,0,25),(6,'com.lanyotech.pps.mvc.OrderInfoAction:ALL',NULL,'ALL','1',0,8),(7,'com.lanyotech.pps.mvc.OrderInfoItemAction:ALL',NULL,'ALL','1',0,8),(8,'com.lanyotech.pps.mvc.ProductAction:ALL',NULL,'ALL','1',0,18),(9,'com.lanyotech.pps.mvc.ProductDirAction:ALL',NULL,'ALL','1',0,19),(10,'com.lanyotech.pps.mvc.ProductStockAction:ALL',NULL,'ALL',NULL,0,NULL),(11,'com.lanyotech.pps.mvc.PurchaseBillItemAction:ALL',NULL,'ALL','1',0,7),(12,'com.lanyotech.pps.mvc.PurchaseBillAction:ALL',NULL,'ALL',NULL,0,7),(13,'com.lanyotech.pps.mvc.StockOutcomeItemAction:ALL',NULL,'ALL','1',0,10),(14,'com.lanyotech.pps.mvc.StockOutcomeAction:ALL',NULL,'ALL','1',0,10),(15,'com.lanyotech.pps.mvc.StockIncomeItemAction:ALL',NULL,'ALL','1',0,11),(16,'com.lanyotech.pps.mvc.StockIncomeAction:ALL',NULL,'ALL','1',0,11),(17,'SystemDictionaryAction:ALL',NULL,'com.lanyotech.core.mvc.ajax.SystemDictionaryAction:ALL',NULL,0,23),(18,'SystemDictionaryDetailAction:ALL',NULL,'com.lanyotech.core.mvc.ajax.SystemDictionaryDetailAction:ALL',NULL,0,23),(19,'报表查看',NULL,NULL,NULL,0,4),(20,'com.lanyotech.pps.mvc.ChartCenterAction:doMarketReport',NULL,'doMarketReport','1',0,4),(21,'com.lanyotech.pps.mvc.ChartCenterAction:doJournalLedger',NULL,'doJournalLedger','1',0,4),(22,'com.lanyotech.pps.mvc.ChartCenterAction:doSummarySheet',NULL,'doSummarySheet','1',0,4);
/*!40000 ALTER TABLE `t_tpermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_tresource`
--

DROP TABLE IF EXISTS `t_tresource`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_tresource` (
  `id` bigint(20) NOT NULL,
  `resstr` varchar(250) default NULL,
  `vtype` varchar(16) default NULL,
  `desciption` text,
  `name` varchar(255) default NULL,
  `status` int(11) default NULL,
  `roles` text,
  `havepermission` bit(1) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `resstr` (`resstr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_tresource`
--

LOCK TABLES `t_tresource` WRITE;
/*!40000 ALTER TABLE `t_tresource` DISABLE KEYS */;
INSERT INTO `t_tresource` VALUES (1,'com.lanyotech.pps.mvc.ClientAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(2,'com.lanyotech.pps.mvc.ClientAction:doList','MODULE','doList',NULL,0,'','\0'),(3,'com.lanyotech.pps.mvc.ClientAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(4,'com.lanyotech.pps.mvc.ClientAction:doSave','MODULE','doSave',NULL,0,'','\0'),(5,'com.lanyotech.pps.mvc.ClientAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(6,'com.lanyotech.pps.mvc.ClientAction:doAutocompleteList','MODULE','doAutocompleteList',NULL,0,'','\0'),(7,'com.lanyotech.pps.mvc.ClientAction:doInit','MODULE','doInit',NULL,0,'','\0'),(8,'com.lanyotech.pps.mvc.ClientAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(9,'com.lanyotech.pps.mvc.DepartmentAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(10,'com.lanyotech.pps.mvc.DepartmentAction:doList','MODULE','doList',NULL,0,'','\0'),(11,'com.lanyotech.pps.mvc.DepartmentAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(12,'com.lanyotech.pps.mvc.DepartmentAction:doSave','MODULE','doSave',NULL,0,'','\0'),(13,'com.lanyotech.pps.mvc.DepartmentAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(14,'com.lanyotech.pps.mvc.DepartmentAction:doGetTree','MODULE','doGetTree',NULL,0,'','\0'),(15,'com.lanyotech.pps.mvc.DepartmentAction:doInit','MODULE','doInit',NULL,0,'','\0'),(16,'com.lanyotech.pps.mvc.DepartmentAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(17,'com.lanyotech.pps.mvc.EmployeeAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(18,'com.lanyotech.pps.mvc.EmployeeAction:doList','MODULE','doList',NULL,0,'','\0'),(19,'com.lanyotech.pps.mvc.EmployeeAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(20,'com.lanyotech.pps.mvc.EmployeeAction:doSave','MODULE','doSave',NULL,0,'','\0'),(21,'com.lanyotech.pps.mvc.EmployeeAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(22,'com.lanyotech.pps.mvc.EmployeeAction:doGetDepartmentBySn','MODULE','doGetDepartmentBySn',NULL,0,'','\0'),(23,'com.lanyotech.pps.mvc.EmployeeAction:doInit','MODULE','doInit',NULL,0,'','\0'),(24,'com.lanyotech.pps.mvc.EmployeeAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(25,'com.lanyotech.pps.mvc.OrderInfoAction:getService','MODULE','getService',NULL,0,'','\0'),(26,'com.lanyotech.pps.mvc.OrderInfoAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(27,'com.lanyotech.pps.mvc.OrderInfoAction:doList','MODULE','doList',NULL,0,'','\0'),(28,'com.lanyotech.pps.mvc.OrderInfoAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(29,'com.lanyotech.pps.mvc.OrderInfoAction:doSave','MODULE','doSave',NULL,0,'','\0'),(30,'com.lanyotech.pps.mvc.OrderInfoAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(31,'com.lanyotech.pps.mvc.OrderInfoAction:doAuditing','MODULE','doAuditing',NULL,0,'','\0'),(32,'com.lanyotech.pps.mvc.OrderInfoAction:doBlankOut','MODULE','doBlankOut',NULL,0,'','\0'),(33,'com.lanyotech.pps.mvc.OrderInfoAction:doBatchDel','MODULE','doBatchDel',NULL,0,'','\0'),(34,'com.lanyotech.pps.mvc.OrderInfoAction:doInit','MODULE','doInit',NULL,0,'','\0'),(35,'com.lanyotech.pps.mvc.OrderInfoAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(36,'com.lanyotech.pps.mvc.OrderInfoItemAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(37,'com.lanyotech.pps.mvc.OrderInfoItemAction:doList','MODULE','doList',NULL,0,'','\0'),(38,'com.lanyotech.pps.mvc.OrderInfoItemAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(39,'com.lanyotech.pps.mvc.OrderInfoItemAction:doSave','MODULE','doSave',NULL,0,'','\0'),(40,'com.lanyotech.pps.mvc.OrderInfoItemAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(41,'com.lanyotech.pps.mvc.OrderInfoItemAction:doGroupBy','MODULE','doGroupBy',NULL,0,'','\0'),(42,'com.lanyotech.pps.mvc.OrderInfoItemAction:doInit','MODULE','doInit',NULL,0,'','\0'),(43,'com.lanyotech.pps.mvc.OrderInfoItemAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(44,'com.lanyotech.pps.mvc.ProductAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(45,'com.lanyotech.pps.mvc.ProductAction:doList','MODULE','doList',NULL,0,'','\0'),(46,'com.lanyotech.pps.mvc.ProductAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(47,'com.lanyotech.pps.mvc.ProductAction:doSave','MODULE','doSave',NULL,0,'','\0'),(48,'com.lanyotech.pps.mvc.ProductAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(49,'com.lanyotech.pps.mvc.ProductAction:doAutocompleteList','MODULE','doAutocompleteList',NULL,0,'','\0'),(50,'com.lanyotech.pps.mvc.ProductAction:pars','MODULE','pars',NULL,0,'','\0'),(51,'com.lanyotech.pps.mvc.ProductAction:doLoadBySn','MODULE','doLoadBySn',NULL,0,'','\0'),(52,'com.lanyotech.pps.mvc.ProductAction:doInit','MODULE','doInit',NULL,0,'','\0'),(53,'com.lanyotech.pps.mvc.ProductAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(54,'com.lanyotech.pps.mvc.DepotAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(55,'com.lanyotech.pps.mvc.DepotAction:doList','MODULE','doList',NULL,0,'','\0'),(56,'com.lanyotech.pps.mvc.DepotAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(57,'com.lanyotech.pps.mvc.DepotAction:doSave','MODULE','doSave',NULL,0,'','\0'),(58,'com.lanyotech.pps.mvc.DepotAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(59,'com.lanyotech.pps.mvc.DepotAction:doInit','MODULE','doInit',NULL,0,'','\0'),(60,'com.lanyotech.pps.mvc.DepotAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(61,'com.lanyotech.pps.mvc.ProductDirAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(62,'com.lanyotech.pps.mvc.ProductDirAction:doList','MODULE','doList',NULL,0,'','\0'),(63,'com.lanyotech.pps.mvc.ProductDirAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(64,'com.lanyotech.pps.mvc.ProductDirAction:doSave','MODULE','doSave',NULL,0,'','\0'),(65,'com.lanyotech.pps.mvc.ProductDirAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(66,'com.lanyotech.pps.mvc.ProductDirAction:doGetTree','MODULE','doGetTree',NULL,0,'','\0'),(67,'com.lanyotech.pps.mvc.ProductDirAction:doGetProductDirTree','MODULE','doGetProductDirTree',NULL,0,'','\0'),(68,'com.lanyotech.pps.mvc.ProductDirAction:doInit','MODULE','doInit',NULL,0,'','\0'),(69,'com.lanyotech.pps.mvc.ProductDirAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(70,'com.lanyotech.pps.mvc.ProductStockAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(71,'com.lanyotech.pps.mvc.ProductStockAction:doList','MODULE','doList',NULL,0,'','\0'),(72,'com.lanyotech.pps.mvc.ProductStockAction:doInit','MODULE','doInit',NULL,0,'','\0'),(73,'com.lanyotech.pps.mvc.ProductStockAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(74,'com.lanyotech.pps.mvc.PurchaseBillAction:getService','MODULE','getService',NULL,0,'','\0'),(75,'com.lanyotech.pps.mvc.PurchaseBillAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(76,'com.lanyotech.pps.mvc.PurchaseBillAction:doList','MODULE','doList',NULL,0,'','\0'),(77,'com.lanyotech.pps.mvc.PurchaseBillAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(78,'com.lanyotech.pps.mvc.PurchaseBillAction:doSave','MODULE','doSave',NULL,0,'','\0'),(79,'com.lanyotech.pps.mvc.PurchaseBillAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(80,'com.lanyotech.pps.mvc.PurchaseBillAction:doAuditing','MODULE','doAuditing',NULL,0,'','\0'),(81,'com.lanyotech.pps.mvc.PurchaseBillAction:doBlankOut','MODULE','doBlankOut',NULL,0,'','\0'),(82,'com.lanyotech.pps.mvc.PurchaseBillAction:doBatchDel','MODULE','doBatchDel',NULL,0,'','\0'),(83,'com.lanyotech.pps.mvc.PurchaseBillAction:getiProductStockService','MODULE','getiProductStockService',NULL,0,'','\0'),(84,'com.lanyotech.pps.mvc.PurchaseBillAction:getIpservice','MODULE','getIpservice',NULL,0,'','\0'),(85,'com.lanyotech.pps.mvc.PurchaseBillAction:getEservice','MODULE','getEservice',NULL,0,'','\0'),(86,'com.lanyotech.pps.mvc.PurchaseBillAction:getSservice','MODULE','getSservice',NULL,0,'','\0'),(87,'com.lanyotech.pps.mvc.PurchaseBillAction:doCancelBlankOut','MODULE','doCancelBlankOut',NULL,0,'','\0'),(88,'com.lanyotech.pps.mvc.PurchaseBillAction:doCancelAuditing','MODULE','doCancelAuditing',NULL,0,'','\0'),(89,'com.lanyotech.pps.mvc.PurchaseBillAction:doInit','MODULE','doInit',NULL,0,'','\0'),(90,'com.lanyotech.pps.mvc.PurchaseBillAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(91,'com.lanyotech.pps.mvc.BaseCountAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(92,'com.lanyotech.pps.mvc.BaseCountAction:doList','MODULE','doList',NULL,0,'','\0'),(93,'com.lanyotech.pps.mvc.BaseCountAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(94,'com.lanyotech.pps.mvc.BaseCountAction:doSave','MODULE','doSave',NULL,0,'','\0'),(95,'com.lanyotech.pps.mvc.BaseCountAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(96,'com.lanyotech.pps.mvc.BaseCountAction:doInit','MODULE','doInit',NULL,0,'','\0'),(97,'com.lanyotech.pps.mvc.BaseCountAction:ALL','MODULE','ALL',NULL,0,'','\0'),(98,'com.lanyotech.pps.mvc.CatAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(99,'com.lanyotech.pps.mvc.CatAction:doList','MODULE','doList',NULL,0,'','\0'),(100,'com.lanyotech.pps.mvc.CatAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(101,'com.lanyotech.pps.mvc.CatAction:doSave','MODULE','doSave',NULL,0,'','\0'),(102,'com.lanyotech.pps.mvc.CatAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(103,'com.lanyotech.pps.mvc.CatAction:doInit','MODULE','doInit',NULL,0,'','\0'),(104,'com.lanyotech.pps.mvc.CatAction:ALL','MODULE','ALL',NULL,0,'','\0'),(105,'com.lanyotech.pps.mvc.ChartCenterAction:doPurchaseReport','MODULE','doPurchaseReport',NULL,0,'','\0'),(106,'com.lanyotech.pps.mvc.ChartCenterAction:doMarketReport','MODULE','doMarketReport',NULL,0,'ADMINISTRATOR',''),(107,'com.lanyotech.pps.mvc.ChartCenterAction:doSummarySheet','MODULE','doSummarySheet',NULL,0,'ADMINISTRATOR',''),(108,'com.lanyotech.pps.mvc.ChartCenterAction:doAccountDetail','MODULE','doAccountDetail',NULL,0,'','\0'),(109,'com.lanyotech.pps.mvc.ChartCenterAction:doJournalLedger','MODULE','doJournalLedger',NULL,0,'ADMINISTRATOR',''),(110,'com.lanyotech.pps.mvc.ChartCenterAction:doInit','MODULE','doInit',NULL,0,'','\0'),(111,'com.lanyotech.pps.mvc.ChartCenterAction:ALL','MODULE','ALL',NULL,0,'','\0'),(112,'com.lanyotech.pps.mvc.PurchaseBillItemAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(113,'com.lanyotech.pps.mvc.PurchaseBillItemAction:doList','MODULE','doList',NULL,0,'','\0'),(114,'com.lanyotech.pps.mvc.PurchaseBillItemAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(115,'com.lanyotech.pps.mvc.PurchaseBillItemAction:doSave','MODULE','doSave',NULL,0,'','\0'),(116,'com.lanyotech.pps.mvc.PurchaseBillItemAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(117,'com.lanyotech.pps.mvc.PurchaseBillItemAction:doGroupBy','MODULE','doGroupBy',NULL,0,'','\0'),(118,'com.lanyotech.pps.mvc.PurchaseBillItemAction:doInit','MODULE','doInit',NULL,0,'','\0'),(119,'com.lanyotech.pps.mvc.PurchaseBillItemAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(120,'com.lanyotech.pps.mvc.StockDetailAccountAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(121,'com.lanyotech.pps.mvc.StockDetailAccountAction:doList','MODULE','doList',NULL,0,'','\0'),(122,'com.lanyotech.pps.mvc.StockDetailAccountAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(123,'com.lanyotech.pps.mvc.StockDetailAccountAction:doSave','MODULE','doSave',NULL,0,'','\0'),(124,'com.lanyotech.pps.mvc.StockDetailAccountAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(125,'com.lanyotech.pps.mvc.StockDetailAccountAction:doInit','MODULE','doInit',NULL,0,'','\0'),(126,'com.lanyotech.pps.mvc.StockDetailAccountAction:ALL','MODULE','ALL',NULL,0,'','\0'),(127,'com.lanyotech.pps.mvc.StockIncomeAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(128,'com.lanyotech.pps.mvc.StockIncomeAction:doList','MODULE','doList',NULL,0,'','\0'),(129,'com.lanyotech.pps.mvc.StockIncomeAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(130,'com.lanyotech.pps.mvc.StockIncomeAction:doSave','MODULE','doSave',NULL,0,'','\0'),(131,'com.lanyotech.pps.mvc.StockIncomeAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(132,'com.lanyotech.pps.mvc.StockIncomeAction:doAuditing','MODULE','doAuditing',NULL,0,'','\0'),(133,'com.lanyotech.pps.mvc.StockIncomeAction:doLoadItemById','MODULE','doLoadItemById',NULL,0,'','\0'),(134,'com.lanyotech.pps.mvc.StockIncomeAction:doInit','MODULE','doInit',NULL,0,'','\0'),(135,'com.lanyotech.pps.mvc.StockIncomeAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(136,'com.lanyotech.pps.mvc.StockIncomeItemAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(137,'com.lanyotech.pps.mvc.StockIncomeItemAction:doList','MODULE','doList',NULL,0,'','\0'),(138,'com.lanyotech.pps.mvc.StockIncomeItemAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(139,'com.lanyotech.pps.mvc.StockIncomeItemAction:doSave','MODULE','doSave',NULL,0,'','\0'),(140,'com.lanyotech.pps.mvc.StockIncomeItemAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(141,'com.lanyotech.pps.mvc.StockIncomeItemAction:doInit','MODULE','doInit',NULL,0,'','\0'),(142,'com.lanyotech.pps.mvc.StockIncomeItemAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(143,'com.lanyotech.pps.mvc.StockOutcomeAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(144,'com.lanyotech.pps.mvc.StockOutcomeAction:doList','MODULE','doList',NULL,0,'','\0'),(145,'com.lanyotech.pps.mvc.StockOutcomeAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(146,'com.lanyotech.pps.mvc.StockOutcomeAction:doSave','MODULE','doSave',NULL,0,'','\0'),(147,'com.lanyotech.pps.mvc.StockOutcomeAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(148,'com.lanyotech.pps.mvc.StockOutcomeAction:doAuditing','MODULE','doAuditing',NULL,0,'','\0'),(149,'com.lanyotech.pps.mvc.StockOutcomeAction:doLoadItemById','MODULE','doLoadItemById',NULL,0,'','\0'),(150,'com.lanyotech.pps.mvc.StockOutcomeAction:doInit','MODULE','doInit',NULL,0,'','\0'),(151,'com.lanyotech.pps.mvc.StockOutcomeAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(152,'com.lanyotech.pps.mvc.StockOutcomeItemAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(153,'com.lanyotech.pps.mvc.StockOutcomeItemAction:doList','MODULE','doList',NULL,0,'','\0'),(154,'com.lanyotech.pps.mvc.StockOutcomeItemAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(155,'com.lanyotech.pps.mvc.StockOutcomeItemAction:doSave','MODULE','doSave',NULL,0,'','\0'),(156,'com.lanyotech.pps.mvc.StockOutcomeItemAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(157,'com.lanyotech.pps.mvc.StockOutcomeItemAction:doInit','MODULE','doInit',NULL,0,'','\0'),(158,'com.lanyotech.pps.mvc.StockOutcomeItemAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(159,'com.lanyotech.pps.mvc.SupplierAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(160,'com.lanyotech.pps.mvc.SupplierAction:doList','MODULE','doList',NULL,0,'','\0'),(161,'com.lanyotech.pps.mvc.SupplierAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(162,'com.lanyotech.pps.mvc.SupplierAction:doSave','MODULE','doSave',NULL,0,'','\0'),(163,'com.lanyotech.pps.mvc.SupplierAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(164,'com.lanyotech.pps.mvc.SupplierAction:doInit','MODULE','doInit',NULL,0,'','\0'),(165,'com.lanyotech.pps.mvc.SupplierAction:ALL','MODULE','ALL',NULL,0,'','\0'),(166,'com.lanyotech.pps.mvc.SupplierProductAction:doIndex','MODULE','doIndex',NULL,0,'','\0'),(167,'com.lanyotech.pps.mvc.SupplierProductAction:doList','MODULE','doList',NULL,0,'','\0'),(168,'com.lanyotech.pps.mvc.SupplierProductAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(169,'com.lanyotech.pps.mvc.SupplierProductAction:doSave','MODULE','doSave',NULL,0,'','\0'),(170,'com.lanyotech.pps.mvc.SupplierProductAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(171,'com.lanyotech.pps.mvc.SupplierProductAction:doInit','MODULE','doInit',NULL,0,'','\0'),(172,'com.lanyotech.pps.mvc.SupplierProductAction:ALL','MODULE','ALL',NULL,0,'','\0'),(173,'com.lanyotech.core.mvc.ajax.SystemDictionaryAction:doList','MODULE','doList',NULL,0,'','\0'),(174,'com.lanyotech.core.mvc.ajax.SystemDictionaryAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(175,'com.lanyotech.core.mvc.ajax.SystemDictionaryAction:doSave','MODULE','doSave',NULL,0,'','\0'),(176,'com.lanyotech.core.mvc.ajax.SystemDictionaryAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(177,'com.lanyotech.core.mvc.ajax.SystemDictionaryAction:doGetDictionaryBySn','MODULE','doGetDictionaryBySn',NULL,0,'','\0'),(178,'com.lanyotech.core.mvc.ajax.SystemDictionaryAction:doInit','MODULE','doInit',NULL,0,'','\0'),(179,'com.lanyotech.core.mvc.ajax.SystemDictionaryAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR',''),(180,'com.lanyotech.core.mvc.ajax.SystemDictionaryDetailAction:doList','MODULE','doList',NULL,0,'','\0'),(181,'com.lanyotech.core.mvc.ajax.SystemDictionaryDetailAction:doRemove','MODULE','doRemove',NULL,0,'','\0'),(182,'com.lanyotech.core.mvc.ajax.SystemDictionaryDetailAction:doSave','MODULE','doSave',NULL,0,'','\0'),(183,'com.lanyotech.core.mvc.ajax.SystemDictionaryDetailAction:doUpdate','MODULE','doUpdate',NULL,0,'','\0'),(184,'com.lanyotech.core.mvc.ajax.SystemDictionaryDetailAction:doSwapSequence','MODULE','doSwapSequence',NULL,0,'','\0'),(185,'com.lanyotech.core.mvc.ajax.SystemDictionaryDetailAction:doInit','MODULE','doInit',NULL,0,'','\0'),(186,'com.lanyotech.core.mvc.ajax.SystemDictionaryDetailAction:ALL','MODULE','ALL',NULL,0,'ADMINISTRATOR','');
/*!40000 ALTER TABLE `t_tresource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_trole`
--

DROP TABLE IF EXISTS `t_trole`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_trole` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) default NULL,
  `path` varchar(255) default NULL,
  `title` varchar(100) default NULL,
  `description` text,
  `status` int(11) default NULL,
  `types` int(11) default NULL,
  `rolegroup_id` bigint(20) default NULL,
  `parent_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `FKA107635F854DCD78` (`parent_id`),
  KEY `FKA107635FA165B408` (`rolegroup_id`),
  CONSTRAINT `FKA107635F854DCD78` FOREIGN KEY (`parent_id`) REFERENCES `t_trole` (`id`),
  CONSTRAINT `FKA107635FA165B408` FOREIGN KEY (`rolegroup_id`) REFERENCES `t_rolegroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_trole`
--

LOCK TABLES `t_trole` WRITE;
/*!40000 ALTER TABLE `t_trole` DISABLE KEYS */;
INSERT INTO `t_trole` VALUES (1,'ADMINISTRATOR','ADMINISTRATOR@','超级管理员角色','可以操作系统所有模块。',0,0,NULL,NULL),(2,'PTCZYJS','PTCZYJS@','平台操作员角色','只能操作部门管理，员工管理和数据字典模块。',0,0,NULL,NULL),(3,'PTYGJS','PTYGJS@','普通员工角色','只能操作订单管理和基础数据维护。',0,0,NULL,NULL);
/*!40000 ALTER TABLE `t_trole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user_disable_permissions`
--

DROP TABLE IF EXISTS `t_user_disable_permissions`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_user_disable_permissions` (
  `userinfo_id` bigint(20) NOT NULL,
  `disablepermissions_id` bigint(20) NOT NULL,
  KEY `FK9C0B3CA4B792E01F` (`disablepermissions_id`),
  KEY `FK9C0B3CA48A6781E` (`userinfo_id`),
  CONSTRAINT `FK9C0B3CA48A6781E` FOREIGN KEY (`userinfo_id`) REFERENCES `t_userinfo` (`id`),
  CONSTRAINT `FK9C0B3CA4B792E01F` FOREIGN KEY (`disablepermissions_id`) REFERENCES `t_tpermission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_user_disable_permissions`
--

LOCK TABLES `t_user_disable_permissions` WRITE;
/*!40000 ALTER TABLE `t_user_disable_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_user_disable_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user_permissions`
--

DROP TABLE IF EXISTS `t_user_permissions`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_user_permissions` (
  `userinfo_id` bigint(20) NOT NULL,
  `permissions_id` bigint(20) NOT NULL,
  KEY `FKE7B7BE7B8A6781E` (`userinfo_id`),
  KEY `FKE7B7BE7B6D7FF337` (`permissions_id`),
  CONSTRAINT `FKE7B7BE7B6D7FF337` FOREIGN KEY (`permissions_id`) REFERENCES `t_tpermission` (`id`),
  CONSTRAINT `FKE7B7BE7B8A6781E` FOREIGN KEY (`userinfo_id`) REFERENCES `t_userinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_user_permissions`
--

LOCK TABLES `t_user_permissions` WRITE;
/*!40000 ALTER TABLE `t_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_userinfo`
--

DROP TABLE IF EXISTS `t_userinfo`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_userinfo` (
  `id` bigint(20) NOT NULL,
  `name` varchar(30) default NULL,
  `email` varchar(100) default NULL,
  `password` varchar(64) default NULL,
  `registertime` datetime default NULL,
  `status` int(11) default NULL,
  `logintimes` int(11) default NULL,
  `lastlogintime` datetime default NULL,
  `lastloginip` varchar(255) default NULL,
  `problem` varchar(255) default NULL,
  `solution` varchar(255) default NULL,
  `imuin` bigint(20) default NULL,
  `lastlogouttime` datetime default NULL,
  `enablechangepassword` bit(1) default NULL,
  `passwordexpireddays` int(11) default NULL,
  `passwordchangetime` datetime default NULL,
  `loginatsametime` bit(1) default NULL,
  `useusb` bit(1) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_userinfo`
--

LOCK TABLES `t_userinfo` WRITE;
/*!40000 ALTER TABLE `t_userinfo` DISABLE KEYS */;
INSERT INTO `t_userinfo` VALUES (1,'admin','11@lanyo.com','21232F297A57A5A743894A0E4A801FC3','2010-12-17 10:37:44',NULL,45,'2011-01-27 16:47:53','127.0.0.1',NULL,NULL,NULL,NULL,'',-1,NULL,'\0','\0'),(32768,'00001','1@2.com','CFCD208495D565EF66E7DFF9F98764DA','2010-12-17 14:09:55',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'',-1,NULL,'\0','\0'),(32769,'00002','2@2.com','CFCD208495D565EF66E7DFF9F98764DA','2010-12-17 14:10:30',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'',-1,NULL,'\0','\0'),(32770,'00003','2@2.com','CFCD208495D565EF66E7DFF9F98764DA','2010-12-17 14:11:02',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'',-1,NULL,'\0','\0'),(32771,'00004','2@2.com','CFCD208495D565EF66E7DFF9F98764DA','2010-12-17 14:11:43',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'',-1,NULL,'\0','\0'),(32772,'00005','2@2.com','CFCD208495D565EF66E7DFF9F98764DA','2010-12-17 14:12:39',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'',-1,NULL,'\0','\0'),(32773,'00006','2@2.com','CFCD208495D565EF66E7DFF9F98764DA','2010-12-17 14:14:22',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'',-1,NULL,'\0','\0');
/*!40000 ALTER TABLE `t_userinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_userqueryobject`
--

DROP TABLE IF EXISTS `t_userqueryobject`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_userqueryobject` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) default NULL,
  `objname` varchar(255) default NULL,
  `content` varchar(255) default NULL,
  `user_id` bigint(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK346C4B91123760C` (`user_id`),
  CONSTRAINT `FK346C4B91123760C` FOREIGN KEY (`user_id`) REFERENCES `t_userinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_userqueryobject`
--

LOCK TABLES `t_userqueryobject` WRITE;
/*!40000 ALTER TABLE `t_userqueryobject` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_userqueryobject` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-01-27  9:03:00
