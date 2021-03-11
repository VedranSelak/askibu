<?php
require_once dirname(__FILE__)."/dao/UserDao.class.php";

$user_dao = new UserDao();

//$user = $user_dao->get_user_by_id(2);

$user1 = [
  "password" => "123"
];

$user = $user_dao->update_user_by_email("elda@stu.ibu.edu.ba",$user1);

//$user_dao->get_user_by_email("dino.keco@gmail.com");

// print_r($user);

?>
