<?php
require_once dirname(__FILE__)."/BaseDao.class.php";

class QuestionDao extends BaseDao{

  public function __construct(){
    parent::__construct("questions");
  }

  public function get_questions_by_question_id($user_id, $id) {
    return $this->query_unique("SELECT * FROM questions WHERE id = :id AND user_id = :user_id",["id" => $id, "user_id" => $user_id]);
  }

  public function get_questions($user_id, $offset, $limit, $search, $order = "-id") {
    list($order_column,$order_direction) = self::parse_order($order);
    $params = [];
    $query = "SELECT * FROM questions WHERE 1=1";
    if(isset($user_id)){
      $query .= " AND user_id = :user_id";
      $params["user_id"] = $user_id;
    }
    if(isset($search)){
      $query .= " AND LOWER(subject) LIKE CONCAT('%', :search, '%')
                  OR LOWER(body) LIKE CONCAT('%', :search, '%')";
      $params["search"] = strtolower($search);
    }
    $query .= " ORDER BY ${order_column} ${order_direction} LIMIT ${limit} OFFSET ${offset}";
    return $this->query($query,$params);
  }

}
?>
