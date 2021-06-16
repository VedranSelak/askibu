<?php
require_once dirname(__FILE__)."/BaseDao.class.php";
  class DepartmentDao extends BaseDao {

    public function __construct(){
      parent::__construct("departments");
    }

    public function get_departments_by_faculty_id($faculty_id, $offset, $limit,$search, $order){
      $params = ['faculty_id' =>$faculty_id];
      list($order_column, $order_direction) = self::parse_order($order);
      $query = "SELECT *
                FROM departments
                WHERE faculty_id = :faculty_id ";
      if(isset($search)){
        $query .= "AND LOWER(name) LIKE CONCAT('%', :search, '%')";
        $params['search'] = strtolower($search);
      }

      $query .= " ORDER BY ${order_column} ${order_direction}";
      $query .= " LIMIT ${limit} OFFSET ${offset}";

      return $this->query($query,$params);
    }

    public function get_deparment_and_faculty($id){
      return $this->query_unique("SELECT departments.name, faculties.name AS faculty FROM departments JOIN faculties ON departments.faculty_id=faculties.id WHERE departments.id = :id",["id" => $id]);
    }

  }
?>
