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
        "faculty_id" => $faculty['id'],
        "created_at" => date(Config::DATE_FORMAT)
      ]);
      return $department;
    } else {
      throw new Exception("Faculty id incorect!",400);
    }
  }

  public function get_departments($faculty_id, $offset, $limit, $search, $order){
    return $this->dao->get_departments_by_faculty_id($faculty_id, $offset, $limit, $search, $order);
  }

  public function get_deparment_and_faculty($id){
    return $this->dao->get_deparment_and_faculty($id);
  }
}

?>
