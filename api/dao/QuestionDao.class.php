<?php
require_once dirname(__FILE__)."/BaseDao.class.php";

class QuestionDao extends BaseDao{

  public function __construct(){
    parent::__construct("questions");
  }

  public function get_questions_for_departments($limit, $offset, $order = "-id", $department_id, $semester_id, $course_id, $status, $total = FALSE) {
    list($order_column,$order_direction) = self::parse_order($order);
    $params = [];

    if ($total){
      $query = "SELECT COUNT(*) AS total ";
    }else{
      $query = "SELECT questions.*, users.name ";
    }

    $query .= "FROM questions JOIN users ON questions.user_id=users.id WHERE 1=1";

    if(isset($department_id)){
      $query .= " AND questions.department_id = :department_id";
      $params["department_id"] = $department_id;
    }
    if(isset($semester_id)){
      $query .= " AND questions.semester_id = :semester_id";
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

    if ($total){
      return $this->query_unique($query, $params);
    }else{
      $query .=" ORDER BY questions.${order_column} ${order_direction} ";
      $query .="LIMIT ${limit} OFFSET ${offset}";

      return $this->query($query, $params);
    }
  }

  public function get_questions_by_question_id($user_id, $id) {
    return $this->query_unique("SELECT * FROM questions WHERE id = :id AND user_id = :user_id",["id" => $id, "user_id" => $user_id]);
  }

  public function get_weeks_hottest_questions($status, $department_id){
    return $this->query("SELECT questions.*, users.name AS name FROM questions JOIN users ON questions.user_id=users.id WHERE questions.posted_at > NOW() - INTERVAL 7 DAY AND questions.status = :status AND questions.department_id = :department_id",["status" => $status, "department_id" => $department_id]);
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

  public function get_questions($user_id, $offset, $limit, $search, $order = "-id", $status, $answer_id, $total = FALSE) {
    list($order_column,$order_direction) = self::parse_order($order);

    $params = [];
    if ($total){
      $query = "SELECT COUNT(*) AS total ";
    }else{
      $query = "SELECT questions.*, users.name ";
    }

    if(isset($answer_id)){
      $query .= "FROM questions
                 JOIN answers ON answers.question_id = questions.id
                 JOIN users ON users.id = questions.user_id
                 WHERE answers.id = :answer_id";
      $params["answer_id"] = $answer_id ;
    } else {
      $query .= "FROM questions
                 JOIN users ON users.id = questions.user_id
                 WHERE 1 = 1";
    }


    if(isset($user_id)){
      $query .= " AND questions.user_id = :user_id";
      $params["user_id"] = $user_id;
    }
    if(isset($search)){
      $query .= " AND LOWER(questions.subject) LIKE CONCAT('%', :search, '%')
                  OR LOWER(questions.body) LIKE CONCAT('%', :search, '%')";
      $params["search"] = strtolower($search);
    }
    if(isset($status) && $status != "ALL") {
      $query .= " AND questions.status = :status";
      $params["status"] = $status;
    }

    if ($total){
      return $this->query_unique($query, $params);
    }else{
      $query .=" ORDER BY questions.${order_column} ${order_direction} ";
      $query .="LIMIT ${limit} OFFSET ${offset}";

      return $this->query($query, $params);
    }
  }

}
?>
