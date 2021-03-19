<?php
require_once dirname(__FILE__) . '/../dao/FacultyDao.class.php';
require_once dirname(__FILE__) . '/../dao/DepartmentDao.class.php';
require_once dirname(__FILE__) . '/BaseService.class.php';

class DepartmentService extends BaseService {

  private $facultyDao;
  public function __construct(){
    $this->dao = new DepartmentDao();
    $this->facultyDao = new FacultyDao();
  }

  public function add($department){
    $faculty = $this->facultyDao->get_by_id($department['faculty_id']);
    if($faculty != null){
      parent::add([
        "name" => $department['name'],
        "faculty_id" => $faculty['id']
      ]);
      return $department;
    } else {
      throw new Exception("Faculty id incorect!",400);
    }
  }

}

?>
