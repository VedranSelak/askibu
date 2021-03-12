<?php
require_once dirname(__FILE__)."/dao/UserDao.class.php";
require_once dirname(__FILE__)."/dao/DepartmentDao.class.php";
require_once dirname(__FILE__)."/dao/YearDao.class.php";
require_once dirname(__FILE__)."/dao/FacultyDao.class.php";
require_once dirname(__FILE__)."/dao/CourseDao.class.php";
require_once dirname(__FILE__)."/dao/QuestionDao.class.php";
require_once dirname(__FILE__)."/dao/AnswerDao.class.php";


$dao = new AnswerDao();

$answer = [
  "is_pinned" => 0,
  "content" => "Google it bro",
  "user_id" => 5,
  "question_id" => 1
];

$entity = $dao->get_all();

print_r($entity);

?>
