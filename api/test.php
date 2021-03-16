<?php
require_once dirname(__FILE__)."/dao/UserDao.class.php";
require_once dirname(__FILE__)."/dao/DepartmentDao.class.php";
require_once dirname(__FILE__)."/dao/YearDao.class.php";
require_once dirname(__FILE__)."/dao/FacultyDao.class.php";
require_once dirname(__FILE__)."/dao/CourseDao.class.php";
require_once dirname(__FILE__)."/dao/QuestionDao.class.php";
require_once dirname(__FILE__)."/dao/AnswerDao.class.php";


$dao = new UserDao();

$answer = [
  "name" => "Sara Selak",
  "email" => "sara@gmail.com",
  "password" => "bratz",
  "date_of_joining" => date("Y-m-d H:i:s"),
  "faculty_id" => 1,
  "department_id" => 1
];

$entity = $dao->get_all();

echo json_encode($entity,JSON_PRETTY_PRINT);

?>
