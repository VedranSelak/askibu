<?php
require_once dirname(__FILE__)."/BaseDao.class.php";
  class DepartmentDao extends BaseDao {

    public function add_department($department){
      return $this->insert("department", $department);
    }

    public function update_department($id, $department){
      $this->update("department", $id, $department);
    }

    public function get_department_by_id($id){
      return $this->query_unique("SELECT * FROM department WHERE id = :id", ["id" => $id]);
    }

    public function get_departments_by_faculty_id($faculty_id){
      return $this->query("SELECT * FROM department WHERE faculty_id = :faculty_id",["faculty_id" =>$faculty_id]);
    }

  }
?>
