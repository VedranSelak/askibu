<?php
require_once dirname(__FILE__)."/dao/UserDao.class.php";
require_once dirname(__FILE__)."/dao/DepartmentDao.class.php";
require_once dirname(__FILE__)."/dao/YearDao.class.php";
require_once dirname(__FILE__)."/dao/FacultyDao.class.php";
require_once dirname(__FILE__)."/dao/CourseDao.class.php";
require_once dirname(__FILE__)."/dao/QuestionDao.class.php";
require_once dirname(__FILE__)."/dao/AnswerDao.class.php";


$dao = new DepartmentDao();

$dep = [
  "name" => "Menagment & Marketing",
];

$entity = $dao->get_all($_GET['offset'],$_GET['limit']);

echo json_encode($entity,JSON_PRETTY_PRINT);

?>
