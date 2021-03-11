<?php
require_once dirname(__FILE__)."/dao/UserDao.class.php";
require_once dirname(__FILE__)."/dao/DepartmentDao.class.php";


$dao = new UserDao();

$user = [
  "name" => "Ilma Tabak",
  "email" => "ilma.tabak1999@stu.ibu.edu.ba",
  "pins" => 4
];

$dep = $dao->update_user_by_email("ilma.tabak1999@stu.ibu.edu.ba",$user);

print_r($dep);

?>
