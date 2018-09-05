-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: liveedu
-- ------------------------------------------------------
-- Server version	5.7.20-log

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
-- Table structure for table `_ex_ls_f58c011b13faca941df9763f3eeafc41a99c95e9`
--

DROP TABLE IF EXISTS `_ex_ls_f58c011b13faca941df9763f3eeafc41a99c95e9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_ex_ls_f58c011b13faca941df9763f3eeafc41a99c95e9` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_ex_ls_f58c011b13faca941df9763f3eeafc41a99c95e9`
--

LOCK TABLES `_ex_ls_f58c011b13faca941df9763f3eeafc41a99c95e9` WRITE;
/*!40000 ALTER TABLE `_ex_ls_f58c011b13faca941df9763f3eeafc41a99c95e9` DISABLE KEYS */;
INSERT INTO `_ex_ls_f58c011b13faca941df9763f3eeafc41a99c95e9` VALUES (1,'werwerwe','rwerw','2018-09-05 01:41:57','2018-09-05 01:41:57'),(2,'eetrtet','ertertetr','2018-09-05 01:41:57','2018-09-05 01:41:57');
/*!40000 ALTER TABLE `_ex_ls_f58c011b13faca941df9763f3eeafc41a99c95e9` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_liveedu_channel`
--

DROP TABLE IF EXISTS `_liveedu_channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_liveedu_channel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `partner_id` int(11) NOT NULL,
  `encode_url` varchar(255) NOT NULL,
  `created_at` datetime(5) DEFAULT NULL,
  `updated_at` datetime(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `partner_id_UNIQUE` (`partner_id`),
  UNIQUE KEY `encode_url_UNIQUE` (`encode_url`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_liveedu_channel`
--

LOCK TABLES `_liveedu_channel` WRITE;
/*!40000 ALTER TABLE `_liveedu_channel` DISABLE KEYS */;
INSERT INTO `_liveedu_channel` VALUES (1,1,'e5cc3a9eed0639fabea7d23639973f03f88d0689','2018-08-28 07:32:21.00000','2018-08-28 07:32:21.00000');
/*!40000 ALTER TABLE `_liveedu_channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_liveedu_course`
--

DROP TABLE IF EXISTS `_liveedu_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_liveedu_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `partner_id` int(11) NOT NULL,
  `fields` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `course_price` double NOT NULL,
  `lesson_price` double NOT NULL,
  `pre_required` text NOT NULL COMMENT 'Yêu cầu của học viên để tham gia khóa học',
  `curriculumn` varchar(255) NOT NULL COMMENT 'Tham chiếu đến bảng giáo trình được tạo riêng cho từng khóa học',
  `course_target` text,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(5) DEFAULT NULL,
  `updated_at` datetime(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `curriculum_UNIQUE` (`curriculumn`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_liveedu_course`
--

LOCK TABLES `_liveedu_course` WRITE;
/*!40000 ALTER TABLE `_liveedu_course` DISABLE KEYS */;
INSERT INTO `_liveedu_course` VALUES (3,'werwer',1,'a:5:{i:0;s:13:\"Ngoại ngữ\";i:1;s:12:\"Lập trình\";i:2;s:11:\"Tiếng Anh\";i:3;s:13:\"Tiếng Trung\";i:4;s:14:\"Tiếng Nhật\";}','sfsgfd',131231,12312,'ertertre','_ex_ls_f58c011b13faca941df9763f3eeafc41a99c95e9','gdfgdfgdfgf',0,'2018-09-05 08:41:57.00000','2018-09-05 08:41:57.00000');
/*!40000 ALTER TABLE `_liveedu_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_liveedu_fields`
--

DROP TABLE IF EXISTS `_liveedu_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_liveedu_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `alias` varchar(255) NOT NULL,
  `created_at` datetime(5) DEFAULT NULL,
  `updated_at` datetime(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_liveedu_fields`
--

LOCK TABLES `_liveedu_fields` WRITE;
/*!40000 ALTER TABLE `_liveedu_fields` DISABLE KEYS */;
INSERT INTO `_liveedu_fields` VALUES (1,'Lập trình','lap_trinh',NULL,NULL),(2,'Ngoại ngữ','ngoai_ngu',NULL,NULL),(3,'Thiết kế đồ họa','thiet_ke_do_hoa',NULL,NULL),(4,'Vẽ kỹ thuật','ve_ky_thuat',NULL,NULL);
/*!40000 ALTER TABLE `_liveedu_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_liveedu_partners`
--

DROP TABLE IF EXISTS `_liveedu_partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_liveedu_partners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `fields` text,
  `current_job` varchar(255) DEFAULT NULL,
  `current_org` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `fb` varchar(255) DEFAULT NULL,
  `own_introduce` text,
  `created_at` datetime(5) DEFAULT NULL,
  `updated_at` datetime(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_liveedu_partners`
--

LOCK TABLES `_liveedu_partners` WRITE;
/*!40000 ALTER TABLE `_liveedu_partners` DISABLE KEYS */;
INSERT INTO `_liveedu_partners` VALUES (1,1,1,'Lập trình','Lập trình viên','VJS','01289341568','http://facebook.com','<p>Rất nhiều kinh nghiệm</p>',NULL,'2018-08-28 07:32:21.00000');
/*!40000 ALTER TABLE `_liveedu_partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_liveedu_post`
--

DROP TABLE IF EXISTS `_liveedu_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_liveedu_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `alias` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `image_cover` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` datetime(5) DEFAULT NULL,
  `updated_at` datetime(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alias_UNIQUE` (`alias`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_liveedu_post`
--

LOCK TABLES `_liveedu_post` WRITE;
/*!40000 ALTER TABLE `_liveedu_post` DISABLE KEYS */;
INSERT INTO `_liveedu_post` VALUES (3,'sdfsdfsdfdsf','sdfsdfsdfdsf',NULL,'/uploads/d41d8cd98f00b204e9800998ecf8427e.jpg','<p>This is the initial csdfsdfsdfsdfontent of the editor</p>','2018-09-01 03:40:28.00000','2018-09-01 03:40:28.00000'),(4,'Avartar 2 - Cơn sốt thế kỷ','avartar-2-con-sot-the-ky',NULL,'/uploads/d41d8cd98f00b204e9800998ecf8427e.jpg','<pre class=\"language-markup\">&nbsp;</pre>\n<pre class=\"language-javascript\"><code>var avatar = function(){ console.log(\'avatar 2, cơn sốt thế kỷ\'); }</code></pre>','2018-09-01 03:44:51.00000','2018-09-01 03:44:51.00000'),(6,'dday la phim avatar','dday-la-phim-avatar',NULL,'/uploads/831b2c21cacf16bfd6d362d827916db1.jpg','<p>This is the initial content of the editorsdfsdfdsfdsf</p>','2018-09-01 04:19:46.00000','2018-09-01 04:19:46.00000'),(8,'sdfsdfsdfds','sdfsdfsdfds',NULL,'/uploads/7d28f62446a6b054820c408d70dfb43e.jpg','<p>This is the initial content of the editorsdfsdfd</p>','2018-09-01 04:32:25.00000','2018-09-01 04:32:25.00000'),(9,'dau khi','dau-khi',NULL,'/uploads/599db2c8bf07a95950c1a59a9bf64068.jpg','<p>This is the initial content of the editorsfdfgdfgdf</p>','2018-09-01 04:36:17.00000','2018-09-01 04:36:17.00000');
/*!40000 ALTER TABLE `_liveedu_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2018_08_24_021234_create_notifications_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint(20) unsigned NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('00414cd3-d4e4-406b-bfbf-e6df07afbc49','App\\Notifications\\ActivePartner','App\\User',1,'{\"sender_id\":-1,\"message\":\"T\\u00e0i kho\\u1ea3n partner c\\u1ee7a b\\u1ea1n \\u0111\\u00e3 \\u0111\\u01b0\\u1ee3c k\\u00edch ho\\u1ea1t\"}',NULL,'2018-08-28 00:32:21','2018-08-28 00:32:21'),('fb03b28a-61cc-4dff-8a40-09163e2bedad','App\\Notifications\\PartnerRegistration','App\\User',1,'{\"sender_id\":-1,\"message\":\"G\\u1eedi \\u0111\\u0103ng k\\u00fd th\\u00e0nh c\\u00f4ng\"}',NULL,'2018-08-28 00:31:21','2018-08-28 00:31:21');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'pham Nhu Y','phamnhuy@vijagroup.com','$2y$10$kiK2.lzU1xYF9oz6O0YEk.z67Uv3ej9qeZG.YfFHmQkTJ45gjrBzi','onXckhcg6hWDQYKqac52sBRW2bRWW63Edv1ebe0JaGfXDeEVH5pHRrBglxJa','2018-08-12 20:39:49','2018-08-12 20:39:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'liveedu'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-05 17:17:01
