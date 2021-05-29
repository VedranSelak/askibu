<?php
require_once dirname(__FILE__)."/BaseDao.class.php";

class AnswerDao extends BaseDao{

  public function __construct(){
    parent::__construct("answers");
  }

  public function get_answer_by_answer_id($user_id, $id){
      return $this->query_unique("SELECT * FROM answers WHERE id = :id AND user_id = :user_id",["id" => $id, "user_id" => $user_id]);
  }

  public function get_answer_count($user_id){
    return $this->query_unique("SELECT COUNT(*) AS count FROM answers WHERE user_id = :user_id",["user_id" => $user_id]);
  }

  public function get_answer_by_question_id($id){
    return $this->query("SELECT * FROM answers WHERE question_id = :question_id",["question_id" => $id]);
  }

  public function get_answers($user_id, $offset, $limit, $status, $search, $order = "-id") {
    list($order_column,$order_direction) = self::parse_order($order);
    $params = [];
    $query = "SELECT a.*, u.name, u.email
              FROM answers a
              JOIN users u ON u.id=a.user_id
              WHERE 1=1";
    if(isset($user_id)){
      $query .= " AND a.user_id = :user_id";
      $params["user_id"] = $user_id;
    }
    if(isset($search)){
      $query .= " AND LOWER(a.body) LIKE CONCAT('%', :body, '%')";
      $params["body"] = strtolower($search);
    }
    if(isset($status)){
      $query .= " AND a.status = :status";
      $params["status"] = $status;
    }
    $query .= " ORDER BY ${order_column} ${order_direction} LIMIT ${limit} OFFSET ${offset}";
    return $this->query($query,$params);
    }

}
 ?>
