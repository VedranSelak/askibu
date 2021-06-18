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
    return $this->query_unique("SELECT COUNT(*) AS count, (SELECT COUNT(*) FROM answers WHERE user_id = :user_id AND is_pinned = 1) AS pins FROM answers WHERE user_id = :user_id",["user_id" => $user_id]);
  }

  public function get_answer_by_question_id($id, $order, $status){
    list($order_column,$order_direction) = self::parse_order($order);
    $params = [];

    $query = "SELECT answers.*, users.name
              FROM answers
              JOIN users ON answers.user_id = users.id
              WHERE 1=1";

    if(isset($status)){
      $query .= " AND answers.status = :status";
      $params["status"] = $status;
    }

    $query .= " AND question_id = :question_id ORDER BY answers.${order_column} ${order_direction}, answers.posted_at ${order_direction}";
    $params["question_id"] = $id;
    return $this->query($query, $params);
  }

  public function remove_answer($id){
    $entity = [
      "status" => "REMOVED"
    ];
    return $this->update($id, $entity);
  }

  public function retrieve_answer($id){
    $entity = [
      "status" => "ACTIVE"
    ];
    return $this->update($id, $entity);
  }

  public function pin_answer($id, $value){
    $entity = [
      "is_pinned" => $value
    ];
    return $this->update($id, $entity);
  }

  public function get_answers($user_id, $offset, $limit, $status, $search, $order = "-id", $total = FALSE) {
    list($order_column,$order_direction) = self::parse_order($order);

    $params = [];

    if ($total){
      $query = "SELECT COUNT(*) AS total ";
    }else{
      $query = "SELECT a.*, u.name, u.email ";
    }

    $query .= "FROM answers a
              JOIN users u ON a.user_id=u.id
              WHERE 1=1";
    if(isset($user_id)){
      $query .= " AND a.user_id = :user_id";
      $params["user_id"] = $user_id;
    }
    if(isset($search)){
      $query .= " AND LOWER(a.body) LIKE CONCAT('%', :body, '%')";
      $params["body"] = strtolower($search);
    }
    if(isset($status) && $status != "ALL"){
      $query .= " AND a.status = :status";
      $params["status"] = $status;
    }

    if ($total){
      return $this->query_unique($query, $params);
    }else{
      $query .=" ORDER BY ${order_column} ${order_direction} ";
      $query .="LIMIT ${limit} OFFSET ${offset}";

      return $this->query($query, $params);
    }
    }

}
 ?>
