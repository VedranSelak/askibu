<?php
require_once dirname(__FILE__)."/dao/UserDao.class.php";

$user_dao = new UserDao();

//$user = $user_dao->get_user_by_id(2);

$user1 = [
  "name" => "Naim Secerovic",
  "email" => "naim@stu.ibu.edu.ba",
  "password" => "josvolimmonu",
  "date_of_joining" => date('Y-m-d H:i:s'),
  "faculty_id" => 1,
  "department_id" =>1
];

// $user1 = [
//   "name" => "Admir Krilašević",
//   "password" => "adminpass"
// ];

$user = $user_dao->add_user($user1);

//$user_dao->get_user_by_email("dino.keco@gmail.com");

print_r($user);

?>
