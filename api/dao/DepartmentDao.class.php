<?php
require_once dirname(__FILE__)."/BaseDao.class.php";
  class DepartmentDao extends BaseDao {

    public function __construct(){
      parent::__construct("departments");
    }

    public function get_departments_by_faculty_id($faculty_id, $offset, $limit,$search){
      $params = ['faculty_id' =>$faculty_id];
      $query = "SELECT *
                FROM departments
                WHERE faculty_id = :faculty_id ";
      if(isset($search)){
        $query .= "AND LOWER(name) LIKE CONCAT('%', :search, '%')";
        $params['search'] = strtolower($search);
      }

      $query .= " LIMIT ${limit} OFFSET ${offset}";

      return $this->query($query,$params);
    }

  }
?>
