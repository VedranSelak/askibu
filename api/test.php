<?php
require_once dirname(__FILE__)."/dao/UserDao.class.php";
require_once dirname(__FILE__)."/dao/DepartmentDao.class.php";

$user_dao = new UserDao();

$dao = new DepartmentDao();

$department = [
  "name" => "Information Technology"
];

$dep = $dao->get_departments_by_faculty_id(1);

print_r($dep);

?>
