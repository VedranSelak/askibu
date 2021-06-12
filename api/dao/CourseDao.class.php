<?php
require_once dirname(__FILE__)."/BaseDao.class.php";

class CourseDao extends BaseDao{

  public function __construct(){
    parent::__construct("courses");
  }

  public function get_courses($semester_id, $search, $order){
    list($order_column,$order_direction) = self::parse_order($order);
    $params = [];
    $query = "SELECT * FROM courses WHERE 1=1";

    if(isset($semester_id)){
      $query .= " AND year_id = :semester_id";
      $params["semester_id"] = strtolower($semester_id);
    }
    if(isset($search)){
      $query .= " AND LOWER(level) LIKE CONCAT('%', :search, '%')";
      $params["search"] = strtolower($search);
    }
    $query .= " ORDER BY ${order_column} ${order_direction}";
    return $this->query($query,$params);
  }

}
?>
