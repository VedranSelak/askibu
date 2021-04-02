<?php
require_once dirname(__FILE__)."/BaseDao.class.php";

class QuestionDao extends BaseDao{

  public function __construct(){
    parent::__construct("questions");
  }

  public function get_questions_by_user($user_id, $offset, $limit, $search, $order = "-id") {
    list($order_column,$order_direction) = self::parse_order($order);
    $params = ["user_id" => $user_id];
    $query = "SELECT * FROM questions WHERE user_id = :user_id";
    if(isset($search)){
      $query .= " AND LOWER(subject) LIKE CONCAT('%', :subject, '%')";
      $params["subject"] = strtolower($search);
    }
    $query .= " ORDER BY ${order_column} ${order_direction} LIMIT ${limit} OFFSET ${offset}";
    return $this->query($query,$params);
  }

  public function get_questions($offset, $limit, $search, $order = "-id"){
    list($order_column,$order_direction) = self::parse_order($order);
    $params = [];
    $query = "SELECT * FROM questions WHERE 1=1";
    if(isset($search)){
      $query .= " AND LOWER(subject) LIKE CONCAT('%', :subject, '%')";
      $params["subject"] = strtolower($search);
    }
    $query .= " ORDER BY ${order_column} ${order_direction} LIMIT ${limit} OFFSET ${offset}";
    return $this->query($query,$params);
  }

}
?>
