-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: social_media
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `academic_year_department`
--

DROP TABLE IF EXISTS `academic_year_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_year_department` (
  `academic_year_id` int NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`academic_year_id`,`department_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `academic_year_department_ibfk_1` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`id`),
  CONSTRAINT `academic_year_department_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_year_department`
--

LOCK TABLES `academic_year_department` WRITE;
/*!40000 ALTER TABLE `academic_year_department` DISABLE KEYS */;
/*!40000 ALTER TABLE `academic_year_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `academic_years`
--

DROP TABLE IF EXISTS `academic_years`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_years` (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_years`
--

LOCK TABLES `academic_years` WRITE;
/*!40000 ALTER TABLE `academic_years` DISABLE KEYS */;
/*!40000 ALTER TABLE `academic_years` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `survey_id` int DEFAULT NULL,
  `option_id` int DEFAULT NULL,
  `question_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  KEY `option_id` (`option_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `answers_ibfk_3` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `belongs_to_comment_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `comments_ibfk_1` (`belongs_to_comment_id`),
  KEY `comments_ibfk_2` (`post_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`belongs_to_comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (70,'Chúc mừng Mãi nhee',NULL,39,18,'2023-09-12 04:09:44',NULL),(71,'Cảm ơn nè haha ?',70,39,19,'2023-09-12 04:10:25',NULL),(72,'Năm sau đi nữa hông? :)))',NULL,41,18,'2023-09-12 04:44:14',NULL),(73,'Khoa học máy tính 24 điểm :>',NULL,42,18,'2023-09-12 04:48:21',NULL),(74,'Điểm khối IT năm nay nhìn cũng ổn',73,42,19,'2023-09-12 04:48:52',NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Công nghệ thông tin','2023-09-01 18:40:52','2023-09-02 01:00:08'),(2,'Kế toán Kiểm toán','2023-09-01 18:40:52','2023-09-12 03:12:52'),(3,'Xây dựng','2023-09-01 18:40:52','2023-09-02 01:00:08'),(4,'Đào tạo đặc biệt','2023-09-01 18:40:52','2023-09-02 01:00:08'),(6,'Luật','2023-09-01 18:40:52','2023-09-02 01:00:08'),(7,'Công nghệ sinh học','2023-09-01 18:40:52','2023-09-02 01:00:08'),(8,'Xã hội học - CTXH - Đông Nam Á','2023-09-12 03:12:52','2023-09-12 03:12:52'),(9,'Kinh tế và Quản lý công','2023-09-12 03:12:52','2023-09-12 03:12:52'),(10,'Ngoại ngữ','2023-09-12 03:12:52','2023-09-12 03:12:52'),(11,'Quản trị kinh doanh','2023-09-12 03:12:52','2023-09-12 03:12:52'),(12,'Tài chính Ngân hàng','2023-09-12 03:12:52','2023-09-12 03:12:52');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_member`
--

DROP TABLE IF EXISTS `group_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `group_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `group_member_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_member_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groupsjv` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_member`
--

LOCK TABLES `group_member` WRITE;
/*!40000 ALTER TABLE `group_member` DISABLE KEYS */;
INSERT INTO `group_member` VALUES (13,19,7),(14,18,7);
/*!40000 ALTER TABLE `group_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) DEFAULT NULL,
  `creator_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'Sinh viên OU',1,'2023-09-06 05:22:51','2023-09-07 02:37:45'),(2,'Phòng quản lý Đào tạo',1,'2023-09-06 05:22:51','2023-09-07 02:37:45');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupsjv`
--

DROP TABLE IF EXISTS `groupsjv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupsjv` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) DEFAULT NULL,
  `creator_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  CONSTRAINT `groupsjv_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupsjv`
--

LOCK TABLES `groupsjv` WRITE;
/*!40000 ALTER TABLE `groupsjv` DISABLE KEYS */;
INSERT INTO `groupsjv` VALUES (7,'Sinh viên Khoa CNTT',1,'2023-09-12 04:17:14',NULL);
/*!40000 ALTER TABLE `groupsjv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `images_ibfk_1` (`post_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (17,39,'https://res.cloudinary.com/dz5z2md5y/image/upload/v1694491745/ezefwen5sq4qx1ycgyh5.jpg',1),(18,40,'https://res.cloudinary.com/dz5z2md5y/image/upload/v1694492144/atewkelsyoeh90pqgaex.jpg',1),(19,41,'https://res.cloudinary.com/dz5z2md5y/image/upload/v1694493812/tgjbtirzdg133llkpyrl.jpg',1),(20,42,'https://res.cloudinary.com/dz5z2md5y/image/upload/v1694494009/n1x7n2wkoxrhusenqbya.jpg',1),(21,43,'https://res.cloudinary.com/dz5z2md5y/image/upload/v1694494291/p042nbmcmjxpvgfd6gle.jpg',1),(22,44,'https://res.cloudinary.com/dz5z2md5y/image/upload/v1694494567/jttg3qypchsm7l5atpq0.jpg',1);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letters`
--

DROP TABLE IF EXISTS `letters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letters`
--

LOCK TABLES `letters` WRITE;
/*!40000 ALTER TABLE `letters` DISABLE KEYS */;
INSERT INTO `letters` VALUES (8,'WORKSHOP WEB3 & BLOCKCHAIN - ETHVN - REVEAL TOPIC','2023-09-12 04:21:00',NULL,'Bạn có thắc mắc Chủ đề thảo luận trong các buổi Workshop là gì không?\nNhững vị khách mời đặc biệt nào sẽ đến với chúng ta?\nAd sẽ bật mí một chút về Chủ đề của các buổi Workshop nhé!\n? Buổi 1: Introduction to Blockchain & Web3\n? Buổi 2: Account – Crypto Wallets & Smart contract – Cryptocurrencies\n? Buổi 3: Defi, NFTs, and Gaming in Web3\nCác diễn giả là các chuyên gia đến từ ETHVN, SUCI Blockchain HUB và KyberNetwork ???\nNếu bạn chưa kịp đăng ký tham gia cũng đừng lo! Nhằm tạo thêm điều kiện cho các bạn, Khoa CNTT quyết định mở thêm 50 vé tham dự nữa cho các bạn nhé! Nhanh tay đăng ký thôi nào!!!');
/*!40000 ALTER TABLE `letters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `majors`
--

DROP TABLE IF EXISTS `majors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `majors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `majors_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `majors`
--

LOCK TABLES `majors` WRITE;
/*!40000 ALTER TABLE `majors` DISABLE KEYS */;
INSERT INTO `majors` VALUES (1,'Công nghệ thông tin',1,'2023-09-01 18:41:39','2023-09-01 18:41:39'),(2,'Khoa học máy tính',1,'2023-09-01 18:41:39','2023-09-01 18:41:39'),(3,'Hệ thống quản lý',1,'2023-09-01 18:41:39','2023-09-01 18:41:39'),(4,'Kế toán',2,'2023-09-02 01:00:54','2023-09-02 01:00:54'),(5,'Kiểm toán',2,'2023-09-02 01:00:54','2023-09-02 01:00:54'),(6,'CNKT Công trình xây dựng',3,'2023-09-02 01:00:54','2023-09-12 03:16:49'),(7,'Khoa học máy tính CLC',4,'2023-09-02 01:00:54','2023-09-02 01:10:26'),(8,'Ngôn ngữ Anh CLC',4,'2023-09-12 03:16:49','2023-09-12 03:16:49'),(9,'Ngôn ngữ Trung Quốc CLC',4,'2023-09-12 03:16:49','2023-09-12 03:16:49'),(10,'Ngôn ngữ Nhật CLC',4,'2023-09-12 03:16:49','2023-09-12 03:16:49'),(11,'Kinh tế CLC',4,'2023-09-12 03:16:49','2023-09-12 03:16:49'),(12,'Quản trị kinh doanh CLC',4,'2023-09-12 03:16:49','2023-09-12 03:16:49'),(13,'Quản lý xây dựng',3,'2023-09-12 03:16:49','2023-09-12 03:16:49'),(14,'Ngôn ngữ Anh',10,'2023-09-12 03:17:23','2023-09-12 03:20:11'),(15,'Ngôn ngữ Hàn',10,'2023-09-12 03:17:23','2023-09-12 03:20:11'),(16,'Ngôn ngữ Trung Quốc',10,'2023-09-12 03:17:23','2023-09-12 03:20:11'),(17,'Ngôn ngữ Nhật',10,'2023-09-12 03:17:23','2023-09-12 03:20:11'),(18,'Luật',6,'2023-09-12 03:17:42','2023-09-12 03:17:42'),(19,'Luật kinh tế',6,'2023-09-12 03:17:42','2023-09-12 03:17:42'),(20,'Công nghệ sinh học',7,'2023-09-12 03:20:11','2023-09-12 03:20:11'),(21,'Xã hội học',8,'2023-09-12 03:20:11','2023-09-12 03:20:11'),(22,'Đông Nam Á học',8,'2023-09-12 03:20:11','2023-09-12 03:20:11'),(23,'Kinh tế học',9,'2023-09-12 03:20:11','2023-09-12 03:20:11'),(24,'Quản lý công',9,'2023-09-12 03:20:11','2023-09-12 03:20:11'),(25,'Quàn trị kinh doanh',11,'2023-09-12 03:20:11','2023-09-12 03:20:11'),(26,'Kinh doanh quốc tế',11,'2023-09-12 03:20:11','2023-09-12 03:20:11'),(27,'Marketing',11,'2023-09-12 03:20:11','2023-09-12 03:20:11'),(28,'Tài chính - Ngân hàng',12,'2023-09-12 03:20:39','2023-09-12 03:20:39');
/*!40000 ALTER TABLE `majors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `question_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `is_locked` tinyint(1) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (39,'<p>Một chút thành tựu!</p>',0,19,'2023-02-12 04:09:04','2023-09-12 05:03:24'),(40,'<p><em style=\"color: rgb(5, 5, 5);\">Pháo đỏ rộn ràng&nbsp;- Xuân sang vạn phúc&nbsp;</em></p><p><span style=\"color: rgb(5, 5, 5);\">CHIẾN DỊCH XUÂN TÌNH NGUYỆN 2023 - ẤM&nbsp;</span></p><p><span style=\"color: rgb(5, 5, 5);\">------------------------------------------</span></p><p><strong style=\"color: rgb(5, 5, 5);\">[THÔNG TIN CHIẾN DỊCH]</strong></p><p><span style=\"color: rgb(5, 5, 5);\">Thời gian đóng quân: 10/01/2023 - 14/01/2023</span></p><p><span style=\"color: rgb(5, 5, 5);\">Mặt trận đóng quân: xã Thạnh Đức, huyện Bến Lức, tỉnh Long An</span></p>',0,18,'2023-06-12 04:15:44','2023-09-12 05:02:22'),(41,'<p>Hoàn thành nhiệm vụ!</p>',0,19,'2023-06-12 04:43:31','2023-09-12 05:03:47'),(42,'<p>Điểm chuẩn năm nay của trường mình nè!</p>',0,19,'2023-08-12 04:46:49','2023-09-12 05:02:22'),(43,'<p>Mọi người rảnh thì tham gia cuộc thi này bổ ích lắm nè.</p>',0,18,'2023-09-12 04:51:30',NULL),(44,'<p><span style=\"color: rgb(5, 5, 5);\">TRUNG THU CÙNG \"THẮP 2022\"</span></p><p><br></p><p><span style=\"color: rgb(5, 5, 5);\">Chương trình đã diễn ra thành công trọn vẹn ở cả hai mặt trận. Các em nhỏ đã có một mùa trung thu hân hoan, vui vẻ. Mình cũng có thêm một trải nghiệm mới!</span></p>',0,18,'2023-09-12 04:56:06','2023-09-12 04:58:59');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `survey_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reactions`
--

DROP TABLE IF EXISTS `reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reaction_type` varchar(50) NOT NULL,
  `user_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `reactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reactions_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

LOCK TABLES `reactions` WRITE;
/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
INSERT INTO `reactions` VALUES (7,'ACTION_HEART',18,39,'2023-09-12 04:09:33',NULL),(8,'ACTION_HAHA',19,39,'2023-09-12 04:09:55',NULL),(9,'ACTION_HEART',18,40,'2023-09-12 04:15:54',NULL),(10,'ACTION_LIKE',19,40,'2023-09-12 04:16:16',NULL),(11,'ACTION_HAHA',18,41,'2023-09-12 04:43:55',NULL),(12,'ACTION_LIKE',19,42,'2023-09-12 04:47:26',NULL),(13,'ACTION_HEART',18,42,'2023-09-12 04:47:37',NULL),(14,'ACTION_HEART',19,41,'2023-09-12 04:49:10',NULL),(15,'ACTION_LIKE',19,43,'2023-09-12 04:51:53',NULL),(16,'ACTION_HEART',18,44,'2023-09-12 04:59:19',NULL),(17,'ACTION_HEART',19,44,'2023-09-12 04:59:37',NULL);
/*!40000 ALTER TABLE `reactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shares`
--

DROP TABLE IF EXISTS `shares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shares` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `shares_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shares_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shares`
--

LOCK TABLES `shares` WRITE;
/*!40000 ALTER TABLE `shares` DISABLE KEYS */;
/*!40000 ALTER TABLE `shares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_participant`
--

DROP TABLE IF EXISTS `survey_participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_participant` (
  `user_id` int NOT NULL,
  `survey_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`survey_id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `survey_participant_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `survey_participant_ibfk_2` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_participant`
--

LOCK TABLES `survey_participant` WRITE;
/*!40000 ALTER TABLE `survey_participant` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey_participant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surveys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `type` varchar(50) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveys`
--

LOCK TABLES `surveys` WRITE;
/*!40000 ALTER TABLE `surveys` DISABLE KEYS */;
/*!40000 ALTER TABLE `surveys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_letter`
--

DROP TABLE IF EXISTS `user_letter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_letter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `letter_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `letter_id` (`letter_id`),
  CONSTRAINT `user_letter_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_letter_ibfk_2` FOREIGN KEY (`letter_id`) REFERENCES `letters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_letter`
--

LOCK TABLES `user_letter` WRITE;
/*!40000 ALTER TABLE `user_letter` DISABLE KEYS */;
INSERT INTO `user_letter` VALUES (10,18,8),(11,19,8);
/*!40000 ALTER TABLE `user_letter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `bg_image` varchar(255) DEFAULT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  `role` varchar(20) DEFAULT '1',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `major_id` int DEFAULT NULL,
  `student_id` varchar(255) DEFAULT NULL,
  `academic_year` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `major_id` (`major_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2a$10$I0/FI1Q0gRDrkKS1gGdSF.gZ1ozf0ztbcEzYtAG/UKmEVGiEfqtFO','maidv@gmail.com','TP. HCM','Trường Đại học Mở','0331234567','https://res.cloudinary.com/dz5z2md5y/image/upload/v1694489374/logo-ou_yp5kdd.png','https://res.cloudinary.com/dz5z2md5y/image/upload/v1694489480/logo1_ffzpua.png',NULL,'2023-08-22 11:16:48',1,'ROLE_ADMIN','2023-09-12 04:17:40',NULL,NULL,NULL),(18,'2051012004','$2a$10$/yaaBvR2cqrtdHBT0xefTOcnCa2KFceuL.468ByvIHkS3LWR5iqCO','2051012004anh@ou.edu.vn','Anh','Nguyễn Vân','0395457321','https://res.cloudinary.com/dz5z2md5y/image/upload/v1694489631/grniakalwfvht0s9ssoe.jpg','https://res.cloudinary.com/dz5z2md5y/image/upload/v1694489676/agd7jj4wfaujfesheg8l.jpg',NULL,'2023-09-12 03:34:11',1,'ROLE_ALUMNI',NULL,2,'2051012004','2020'),(19,'2051050265','$2a$10$m9M5cOAETPZNZJibTHWaWeisJh3/foBCyXnXw8jpnV24zfZsrnIVe','2051050265mai@ou.edu.vn','Mãi','Đặng Văn','0395457321','https://res.cloudinary.com/dz5z2md5y/image/upload/v1694491593/kia1huokkjjyfi3bchts.jpg','https://res.cloudinary.com/dz5z2md5y/image/upload/v1694491651/jeazomhjoq7b1gfzzrmh.jpg',NULL,'2023-09-12 04:07:03',1,'ROLE_ALUMNI',NULL,1,'2051050265','2020');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-12 12:05:06
