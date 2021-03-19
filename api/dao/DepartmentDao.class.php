<?php
require_once dirname(__FILE__)."/BaseDao.class.php";
  class DepartmentDao extends BaseDao {

    public function __construct(){
      parent::__construct("departments");
    }

    public function get_departments_by_faculty_id($faculty_id, $offset, $limit){
      return $this->query("SELECT *
                           FROM departments
                           WHERE faculty_id = :faculty_id
                           LIMIT ${limit} OFFSET ${offset}",
                           ["faculty_id" =>$faculty_id]);
    }

  }
?>
