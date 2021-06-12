<?php

require_once dirname(__FILE__) . '/BaseService.class.php';
require_once dirname(__FILE__) . '/../dao/CourseDao.class.php';

class CourseService extends BaseService {

  public function __construct(){
    $this->dao = new CourseDao();
  }

  public function get_courses($semester_id ,$search, $order, $department_id){
    return $this->dao->get_courses($semester_id, $search, $order, $department_id);
  }
}
 ?>
