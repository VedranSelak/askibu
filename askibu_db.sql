/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.4.17-MariaDB : Database - forumibudb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`forumibudb` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `forumibudb`;

/*Table structure for table `answers` */

DROP TABLE IF EXISTS `answers`;

CREATE TABLE `answers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_pinned` tinyint(1) NOT NULL,
  `body` varchar(256) COLLATE utf8_bin NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `question_id` int(10) unsigned NOT NULL,
  `posted_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`),
  KEY `fk_answer_user` (`user_id`),
  KEY `fk_answer_question` (`question_id`),
  CONSTRAINT `fk_answer_question` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  CONSTRAINT `fk_answer_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `answers` */

insert  into `answers`(`id`,`is_pinned`,`body`,`user_id`,`question_id`,`posted_at`,`status`) values 
(1,1,'Go to the git page and click install',7,1,'2021-04-03 13:55:34','ACTIVE'),
(2,0,'Google it bro',5,1,'2021-04-03 13:55:34','ACTIVE'),
(3,0,'we did some updates',92,3,'2021-04-03 15:01:33','UPDATED'),
(4,0,'i like this questions',92,3,'2021-04-03 14:01:22','ACTIVE'),
(5,0,'vekas answer',92,5,'2021-04-03 14:59:39','UPDATED');

/*Table structure for table `courses` */

DROP TABLE IF EXISTS `courses`;

CREATE TABLE `courses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8_bin NOT NULL,
  `department_id` int(10) unsigned NOT NULL,
  `year_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_course_department` (`department_id`),
  KEY `fk_course_year` (`year_id`),
  CONSTRAINT `fk_course_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `fk_course_year` FOREIGN KEY (`year_id`) REFERENCES `years` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `courses` */

insert  into `courses`(`id`,`name`,`department_id`,`year_id`) values 
(1,'Object Oriented Programming',1,2),
(2,'Programming II',1,1);

/*Table structure for table `departments` */

DROP TABLE IF EXISTS `departments`;

CREATE TABLE `departments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8_bin NOT NULL,
  `faculty_id` int(11) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_department_faculty` (`faculty_id`),
  CONSTRAINT `fk_department_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `departments` */

insert  into `departments`(`id`,`name`,`faculty_id`,`created_at`) values 
(1,'Information Technology',1,'2021-03-19 16:43:23'),
(2,'Electrical Engineering & Robotics',1,'2021-03-19 16:43:24'),
(3,'Architecture',1,'2021-03-19 17:43:23'),
(9,'new name',3,'2021-03-19 17:29:21'),
(10,'Marketing',2,'2021-03-19 16:50:55'),
(11,'Menagment',2,'2021-03-19 16:51:01'),
(12,'Interior Design',3,'2021-03-19 16:51:13');

/*Table structure for table `faculties` */

DROP TABLE IF EXISTS `faculties`;

CREATE TABLE `faculties` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `faculties` */

insert  into `faculties`(`id`,`name`) values 
(1,'Engineering'),
(2,'Economics'),
(3,'Some weird faculty');

/*Table structure for table `questions` */

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `subject` varchar(256) COLLATE utf8_bin NOT NULL,
  `body` varchar(256) COLLATE utf8_bin NOT NULL,
  `department_id` int(10) unsigned NOT NULL,
  `course_id` int(10) unsigned NOT NULL,
  `year_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `posted_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_question_user` (`user_id`),
  KEY `fk_question_course` (`course_id`),
  KEY `fk_question_department` (`department_id`),
  KEY `fk_question_year` (`year_id`),
  CONSTRAINT `fk_question_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `fk_question_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `fk_question_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_question_year` FOREIGN KEY (`year_id`) REFERENCES `years` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `questions` */

insert  into `questions`(`id`,`subject`,`body`,`department_id`,`course_id`,`year_id`,`user_id`,`posted_at`) values 
(1,'updated question one','How does the world work',1,2,1,8,'2021-04-02 18:55:02'),
(2,'second question','How do I install git',1,2,1,8,'2021-04-02 17:11:21'),
(3,'Does this website work','tdghgdsfh',1,2,1,92,'2021-04-02 18:58:16'),
(4,'Can I use BaseDao to update','Some body',1,2,1,92,'2021-04-02 21:58:36'),
(5,'first question','how to get girls',1,2,1,92,'2021-04-02 17:14:09'),
(6,'update','Body',1,2,1,92,'2021-04-02 22:13:49'),
(7,'how to start programming','is it good to start with python',1,2,1,92,'2021-04-02 21:30:26'),
(8,'how to start programming','is it good to start with python',1,2,1,92,'2021-04-02 21:31:09');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8_bin NOT NULL,
  `email` varchar(256) COLLATE utf8_bin NOT NULL,
  `password` varchar(256) COLLATE utf8_bin NOT NULL,
  `pins` int(11) DEFAULT NULL,
  `date_of_joining` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `faculty_id` int(11) unsigned NOT NULL,
  `department_id` int(11) unsigned NOT NULL,
  `status` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT 'PENDING',
  `role` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT 'USER',
  `token` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `token_created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_user_email` (`email`),
  KEY `fk_user_faculty` (`faculty_id`),
  KEY `fk_user_department` (`department_id`),
  CONSTRAINT `fk_user_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `fk_user_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`password`,`pins`,`date_of_joining`,`faculty_id`,`department_id`,`status`,`role`,`token`,`token_created_at`) values 
(2,'Dino Keco','dino.keco@gmail.com','veka123',0,'2021-03-11 18:10:19',1,1,'PENDING','USER',NULL,NULL),
(5,'Eldar Jahic','elda@stu.ibu.edu.ba','123',0,'2021-03-11 18:23:25',1,1,'PENDING','USER',NULL,NULL),
(7,'Admir Krilašević','adma@stu.ibu.edu.ba','adminpass',0,'2021-03-11 19:22:01',1,1,'PENDING','USER',NULL,NULL),
(8,'Naim Secerovic','naim@stu.ibu.edu.ba','josvolimmonu',NULL,'2021-03-11 19:45:48',1,1,'PENDING','USER',NULL,NULL),
(10,'Ilma Tabak','ilma.tabak1999@stu.ibu.edu.ba','honey&maggie',4,'2021-03-11 22:37:55',1,3,'PENDING','USER',NULL,NULL),
(12,'Sara Selak','sara@gmail.com','bratz',NULL,'2021-03-16 15:13:21',1,1,'PENDING','USER',NULL,NULL),
(14,'Semain Tabak','semin@gmail.com','1234567',NULL,'2021-03-16 23:15:29',1,1,'PENDING','USER',NULL,NULL),
(15,'John Terry','john.terry@ibu.edu.ba','london',1,'2021-03-18 14:20:48',1,1,'PENDING','USER',NULL,NULL),
(17,'Harun Kunovac','harunk@gmail.com','hara01',NULL,'2021-03-16 15:13:21',1,1,'PENDING','USER',NULL,NULL),
(18,'Matej Marincic','matejm@gmail.com','ironman',NULL,'2021-03-18 14:21:38',1,1,'PENDING','USER',NULL,NULL),
(19,'Kemal Karic','kemalk@gmail.com','mokisa',NULL,'2021-03-18 14:21:38',1,1,'PENDING','USER',NULL,NULL),
(20,'Dino Terzic','dinot@gmail.com','presek',0,'2021-03-18 17:23:20',1,3,'PENDING','USER','H??\0?\ZK2?,y?Iе',NULL),
(21,'Richard Bro','richardB@gmail.com','rick123',0,'2021-03-18 17:23:20',1,3,'PENDING','USER','=sҹ?:???kj????',NULL),
(22,'Chandler Bing','chandleredge@gmail.com','monica',0,'2021-03-18 18:23:20',1,3,'PENDING','USER','5c931ac9774fadab8d2a0adb934e5852',NULL),
(23,'Monika Bing','monika@gmail.com','monicacooks',0,'2021-03-18 19:09:02',1,3,'ACTIVE','USER','a91cc1f883e9f20f7dfcf807bce30b13',NULL),
(24,'Sheldon Cooper','sheldor@gmail.com','stringtheory',0,'2021-03-18 21:27:00',1,2,'PENDING','USER','cbfcd052db0905f0e0f2ad1705e5f789',NULL),
(25,'Howard Wolowitz','howardw@gmail.com','mitrocks',0,'2021-03-18 21:27:00',1,3,'PENDING','USER','f539c35f2b128fa8860523e8c9b6a4ad',NULL),
(26,'Bernadet Wolowitz','bernadetw@gmail.com','little',0,'2021-03-18 21:27:00',1,2,'PENDING','USER','326db432f206d84ef725f6ab5b11c16b',NULL),
(27,'Mirza Delibasic','mirzoni@gmail.com','bosna',0,'2021-03-18 21:27:00',1,3,'PENDING','USER','5ddf929454ca319ffcfea286571fbc6f',NULL),
(28,'Edin Dzeko','dzekson@gmail.com','roma',0,'2021-03-18 21:27:00',1,2,'PENDING','USER','6eef22c387e56cfcc026c40dfa48aa2a',NULL),
(47,'Stefan Hadalin','stefo@gmail.com','canthavetwogoodruns',0,'2021-03-23 22:57:40',1,1,'PENDING','USER','7b8a3c13a7c09cf196cdb3d572aa63eb',NULL),
(53,'Semin Tabak','sema@gmail.com','userspass',0,'2021-03-28 17:15:51',1,1,'ACTIVE','USER','a80762d78ee999b60d4ad0dd8017b822',NULL),
(91,'Medina Selak','medina.selak@gmail.com','9bb61edb498cebf552ef2619da4070b9',0,'2021-03-29 00:18:20',1,2,'ACTIVE','USER',NULL,NULL),
(92,'Selak Vedran','selakvedran@gmail.com','be5d9e60d045fb5ed33db5f74e1381d0',0,'2021-04-03 16:25:25',1,1,'ACTIVE','USER',NULL,'2021-04-03 16:24:53'),
(96,'My test user','vedran.selak@stu.ibu.edu.ba','be5d9e60d045fb5ed33db5f74e1381d0',0,'2021-04-03 16:04:03',1,1,'ACTIVE','USER',NULL,'2021-04-03 16:02:57');

/*Table structure for table `years` */

DROP TABLE IF EXISTS `years`;

CREATE TABLE `years` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `level` varchar(256) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `years` */

insert  into `years`(`id`,`level`) values 
(1,'bachelor'),
(2,'bachelor\'s degree');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
