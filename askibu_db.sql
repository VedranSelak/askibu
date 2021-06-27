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
  `is_pinned` int(10) NOT NULL,
  `body` varchar(4096) COLLATE utf8_bin NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `question_id` int(10) unsigned NOT NULL,
  `posted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`),
  KEY `fk_answer_user` (`user_id`),
  KEY `fk_answer_question` (`question_id`),
  CONSTRAINT `fk_answer_question` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  CONSTRAINT `fk_answer_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `answers` */

insert  into `answers`(`id`,`is_pinned`,`body`,`user_id`,`question_id`,`posted_at`,`status`) values
(3,0,'we did some updates',92,3,'2021-06-24 16:35:29','REMOVED'),
(4,0,'i like this questions',92,3,'2021-06-24 16:35:31','REMOVED'),
(5,0,'vekas answer',92,5,'2021-06-24 16:35:32','ACTIVE'),
(6,0,'google it bro',92,34,'2021-06-24 16:35:33','REMOVED'),
(7,0,'wrong section bro',92,26,'2021-06-24 16:35:34','REMOVED'),
(9,0,'I study 3 to 4 hours a day.',92,30,'2021-06-24 16:35:36','REMOVED'),
(10,0,'Ask the professor',92,34,'2021-06-24 21:11:06','ACTIVE'),
(11,1,'I want to know this as well',92,34,'2021-06-24 21:11:07','ACTIVE'),
(12,1,'print(\"print something\")',92,36,'2021-06-18 16:08:08','ACTIVE'),
(13,1,'it does',92,39,'2021-06-15 15:39:24','ACTIVE'),
(14,1,'does this really work',92,39,'2021-06-15 15:49:02','ACTIVE'),
(15,0,'class Name extends ParentName {}',92,27,'2021-06-14 20:39:41','ACTIVE'),
(17,0,'i think 3',92,42,'2021-06-14 20:46:36','ACTIVE'),
(18,0,'elmida won\'t help',92,40,'2021-06-15 17:39:29','ACTIVE'),
(19,1,'i can help, contact me',92,40,'2021-06-16 14:23:24','ACTIVE'),
(20,1,'who doesn\'t',92,14,'2021-06-14 23:17:17','ACTIVE'),
(21,1,'i love it as well',92,14,'2021-06-14 23:17:36','ACTIVE'),
(23,0,'how about now',92,39,'2021-06-15 15:49:21','ACTIVE'),
(26,1,'google it bro',92,43,'2021-06-15 18:30:17','ACTIVE'),
(27,0,'JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can ',92,44,'2021-06-15 18:31:27','ACTIVE'),
(28,1,'JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can ',92,44,'2021-06-18 16:45:34','ACTIVE'),
(29,0,'what he said',92,36,'2021-06-15 21:19:04','ACTIVE'),
(30,1,'nice job',92,44,'2021-06-18 16:42:46','ACTIVE'),
(32,0,'All from week 7 till week 13. I think.',92,45,'2021-06-15 22:03:27','ACTIVE'),
(33,1,'yeah she wont',92,40,'2021-06-18 22:37:55','ACTIVE'),
(34,0,'yeah lets do it',92,50,'2021-06-18 23:42:50','ACTIVE'),
(37,0,'I think its from 8 till 13',92,45,'2021-06-18 22:40:04','ACTIVE'),
(39,0,'testing',92,50,'2021-06-22 15:31:01','ACTIVE'),
(41,0,'it works',92,46,'2021-06-22 15:45:38','ACTIVE'),
(44,0,'no, do it yourself',92,51,'2021-06-23 17:52:52','ACTIVE'),
(58,0,'I dont want to',92,53,'2021-06-26 20:34:44','ACTIVE'),
(60,1,'I emailed the professor and she said that it\'s going to be on the exam',92,53,'2021-06-26 19:54:42','ACTIVE'),
(61,1,'5 hours',92,30,'2021-06-26 20:08:27','ACTIVE'),
(65,0,'I think it work great',92,3,'2021-06-27 16:33:53','ACTIVE'),
(66,0,'I emailed and got a different response',92,53,'2021-06-27 16:36:53','ACTIVE'),
(67,0,'2 hours max, I\'m lazy',92,30,'2021-06-27 16:45:49','ACTIVE'),
(68,0,'Is this encrypted?',92,52,'2021-06-27 17:09:52','ACTIVE'),
(69,0,'It\'s cool tbh',92,14,'2021-06-27 17:10:52','ACTIVE'),
(70,1,'It is hahaha',92,52,'2021-06-27 17:21:38','ACTIVE'),
(71,0,'I study for 4 hours',92,30,'2021-06-27 17:22:12','ACTIVE');

/*Table structure for table `courses` */

DROP TABLE IF EXISTS `courses`;

CREATE TABLE `courses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8_bin NOT NULL,
  `department_id` int(10) unsigned NOT NULL,
  `semester_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_course_department` (`department_id`),
  KEY `fk_course_year` (`semester_id`),
  CONSTRAINT `fk_course_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `fk_course_semester` FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `courses` */

insert  into `courses`(`id`,`name`,`department_id`,`semester_id`) values
(1,'Object Oriented Programming',1,3),
(2,'Programming II',1,2),
(3,'Programming I',1,1),
(4,'German Language I',1,1),
(6,'Introduction to Web Development',1,4),
(7,'Computer Networks',1,3),
(8,'Calculus I',1,1),
(9,'Calculus II',1,2),
(10,'General Physics I',1,1),
(11,'General Physics II ',1,2),
(12,'Introduction to Mobile Development',1,4),
(13,'Discret Math',1,3);

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
(3,'Politics');

/*Table structure for table `questions` */

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `subject` varchar(256) COLLATE utf8_bin NOT NULL,
  `body` varchar(4096) COLLATE utf8_bin NOT NULL,
  `department_id` int(10) unsigned NOT NULL,
  `course_id` int(10) unsigned DEFAULT NULL,
  `semester_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `posted_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(256) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_question_user` (`user_id`),
  KEY `fk_question_course` (`course_id`),
  KEY `fk_question_department` (`department_id`),
  KEY `fk_question_semester` (`semester_id`),
  CONSTRAINT `fk_question_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `fk_question_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `fk_question_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `questions` */

insert  into `questions`(`id`,`subject`,`body`,`department_id`,`course_id`,`semester_id`,`user_id`,`posted_at`,`status`) values
(3,'Does this website work','does the controller work now',1,2,2,92,'2021-06-27 16:26:28','ACTIVE'),
(4,'Can I use BaseDao to update','Some body updated',1,2,2,92,'2021-06-27 16:26:27','REMOVED'),
(5,'first question','how to get gyal',1,2,2,92,'2021-06-27 16:26:29','REMOVED'),
(6,'update','body ody ',1,2,2,92,'2021-06-27 16:26:30','REMOVED'),
(8,'how to start programming','is it good to start with python',1,2,2,92,'2021-06-27 17:30:53','ACTIVE'),
(9,'how does coding work','Some body',1,1,3,92,'2021-06-27 16:27:19','REMOVED'),
(10,'vekacii','veka',1,1,3,92,'2021-06-27 16:27:20','REMOVED'),
(11,'tost that tost','yeahh budddy',1,1,3,92,'2021-06-27 16:27:31','REMOVED'),
(12,'how to code','how to hack nasa with html',1,1,3,92,'2021-06-27 16:27:32','ACTIVE'),
(13,'wow omg','blabla',1,1,3,92,'2021-06-27 16:27:39','ACTIVE'),
(14,'i love bootstrap','weee',1,1,3,92,'2021-06-27 16:27:41','ACTIVE'),
(15,'operating systems','how to operate systems heh',1,1,3,92,'2021-06-27 16:27:42','ACTIVE'),
(16,'asking','something',1,1,3,92,'2021-06-27 16:27:43','ACTIVE'),
(17,'bfasadf','short text',1,1,3,92,'2021-06-27 16:27:44','ACTIVE'),
(18,'peggy','how to dog',1,1,3,92,'2021-06-27 16:27:45','ACTIVE'),
(19,'how to code next facebook','i want money now',1,1,3,92,'2021-06-27 16:27:48','ACTIVE'),
(21,'First question from departments','pls work',1,1,3,92,'2021-06-27 16:27:48','ACTIVE'),
(22,'Testing ordering','will it work i wonder',1,1,3,92,'2021-06-27 16:27:51','ACTIVE'),
(26,'how to do maths','can i get help',1,2,2,92,'2021-06-18 14:14:22','ACTIVE'),
(27,'Java parent','How to extend a class.',1,1,3,92,'2021-06-18 14:14:25','ACTIVE'),
(28,'Homework','What is for homework this week.',1,4,1,92,'2021-06-18 14:14:24','ACTIVE'),
(29,'Python, lists','How to make a list in python?',1,3,1,92,'2021-06-18 14:14:34','ACTIVE'),
(30,'General question','How much do you study per day?',1,3,1,92,'2021-06-18 14:13:00','ACTIVE'),
(33,'asking','asking about general',1,NULL,1,92,'2021-06-18 14:13:02','ACTIVE'),
(34,'Limits','How to calculate a limit that goes to infinity?',1,8,1,92,'2021-06-18 14:13:03','ACTIVE'),
(35,'Midterms','When do midterms start.',1,NULL,1,92,'2021-06-18 14:13:04','ACTIVE'),
(36,'printing ','how to print in python',1,3,1,92,'2021-06-18 14:13:05','ACTIVE'),
(37,'asking','something',1,3,1,92,'2021-06-18 14:13:06','ACTIVE'),
(38,'testing adding questions','after refactor',1,1,1,92,'2021-06-18 14:13:07','ACTIVE'),
(39,'lets see does this work','i hope so',1,1,1,92,'2021-06-18 14:13:08','ACTIVE'),
(40,'Elmida help','elmida hlep with german',1,4,1,92,'2021-06-18 14:13:10','ACTIVE'),
(41,'how to calculate mass','help',1,10,1,92,'2021-06-18 14:13:10','ACTIVE'),
(42,'Newton\'s laws','how many Newton\'s laws are there?',1,10,1,92,'2021-06-18 14:13:13','ACTIVE'),
(43,'What is a JWT token','JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.\r\n\r\nAlthough JWTs can be encrypted to also provide secrecy between parties, we will focus on signed tokens. Signed tokens can verify the integrity of the claims contained within it, while encrypted tokens hide those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.',1,3,1,92,'2021-06-18 14:13:15','ACTIVE'),
(44,'dsghrsgfdgsdfg','JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.\r\n\r\nAlthough JWTs can be encrypted to also provide secrecy between parties, we will focus on signed tokens. Signed tokens can verify the integrity of the claims contained within it, while encrypted tokens hide those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.\r\nJSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.\r\n\r\nAlthough JWTs can be encrypted to also provide secrecy between parties, we will focus on signed tokens. Signed tokens can verify the integrity of the claims contained within it, while encrypted tokens hide those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.\r\nJSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.\r\n\r\nAlthough JWTs can be encrypted to also provide secrecy between parties, we will focus on signed tokens. Signed tokens can verify the integrity of the claims contained within it, while encrypted tokens hide those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.',1,3,1,92,'2021-06-18 14:13:16','ACTIVE'),
(45,'About the final','Does anybody know what will be on the final exam?',1,9,2,92,'2021-06-18 14:13:51','ACTIVE'),
(46,'DOes the status work','pls work',1,10,1,92,'2021-06-18 13:43:23','ACTIVE'),
(50,'work work','lets code some more',1,10,1,92,'2021-06-25 18:42:07','ACTIVE'),
(51,'My o my no','Can I copy somebodies homework!!',1,10,1,92,'2021-06-24 21:40:33','ACTIVE'),
(52,'p[o]o[]','p[o]uyi0o',1,NULL,1,92,'2021-06-24 21:42:28','ACTIVE'),
(53,'Final exam question','Will there be modal verb on the final exam?\r\n',1,4,1,92,'2021-06-27 17:21:15','ACTIVE'),
(57,'Why is there no questions here','Come on guys be active!!',2,NULL,1,92,'2021-06-27 17:27:57','ACTIVE'),
(58,'Final exam','What will be on the final exam??',1,3,1,92,'2021-06-27 17:28:25','ACTIVE'),
(59,'Project defense','When is the project defense',1,6,4,92,'2021-06-27 17:30:19','ACTIVE'),
(60,'My first question','How to change a light bulb?',2,NULL,1,155,'2021-06-27 17:39:40','ACTIVE');

/*Table structure for table `semesters` */

DROP TABLE IF EXISTS `semesters`;

CREATE TABLE `semesters` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `semesters` */

insert  into `semesters`(`id`,`name`) values
(1,'Semester I'),
(2,'Semester II'),
(3,'Semester III'),
(4,'Semester IV'),
(5,'Semester V'),
(6,'Semester VI');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8_bin NOT NULL,
  `email` varchar(256) COLLATE utf8_bin NOT NULL,
  `password` varchar(256) COLLATE utf8_bin NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`password`,`date_of_joining`,`faculty_id`,`department_id`,`status`,`role`,`token`,`token_created_at`) values
(92,'Selak Vedran','selakvedran@gmail.com','078f4b946d6498e0e506830c9cda8668','2021-06-22 23:28:43',1,1,'ACTIVE','ADMIN',NULL,'2021-05-05 23:56:39'),
(155,'Veka Peka','vedran.selak@stu.ibu.edu.ba','078f4b946d6498e0e506830c9cda8668','2021-06-27 17:37:52',1,2,'ACTIVE','USER',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
