<?php
require_once dirname(__FILE__)."/BaseDao.class.php";

class QuestionDao extends BaseDao{

  public function __construct(){
    parent::__construct("questions");
  }

  public function get_questions_for_departments($order = "-id", $department_id, $semester_id, $course_id, $status) {
    list($order_column,$order_direction) = self::parse_order($order);
    $params = [];
    $query = "SELECT questions.*, users.name FROM questions JOIN users ON questions.user_id=users.id WHERE 1=1";

    if(isset($department_id)){
      $query .= " AND questions.department_id = :department_id";
      $params["department_id"] = $department_id;
    }
    if(isset($semester_id)){
      $query .= " AND questions.year_id = :semester_id";
      $params["semester_id"] = $semester_id;
    }
    if($course_id != NULL){
      $query .= " AND questions.course_id = :course_id";
      $params["course_id"] = $course_id;
    }
    if(isset($status) && $status != "ALL"){
      $query .= " AND questions.status = :status";
      $params["status"] = $status;
    }
    $query .= " ORDER BY ${order_column} ${order_direction}";
    return $this->query($query, $params);
  }

  public function get_questions_by_question_id($user_id, $id) {
    return $this->query_unique("SELECT * FROM questions WHERE id = :id AND user_id = :user_id",["id" => $id, "user_id" => $user_id]);
  }

  public function remove_question($id){
    $entity = [
      "status" => "REMOVED"
    ];
    return $this->update($id, $entity);
  }

  public function retrieve_question($id){
    $entity = [
      "status" => "ACTIVE"
    ];
    return $this->update($id, $entity);
  }

  public function get_question_count($user_id){
    return $this->query_unique("SELECT COUNT(*) AS count FROM questions WHERE user_id = :user_id",["user_id" => $user_id]);
  }

  public function get_questions($user_id, $offset, $limit, $search, $order = "-id", $status, $total = FALSE) {
    list($order_column,$order_direction) = self::parse_order($order);

    $params = [];
    if ($total){
      $query = "SELECT COUNT(*) AS total ";
    }else{
      $query = "SELECT * ";
    }
    $query .= "FROM questions
               WHERE 1 = 1";

    if(isset($user_id)){
      $query .= " AND user_id = :user_id";
      $params["user_id"] = $user_id;
    }
    if(isset($search)){
      $query .= " AND LOWER(subject) LIKE CONCAT('%', :search, '%')
                  OR LOWER(body) LIKE CONCAT('%', :search, '%')";
      $params["search"] = strtolower($search);
    }
    if(isset($status) && $status != "ALL") {
      $query .= " AND status = :status";
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
