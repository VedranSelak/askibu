<?php
require_once dirname(__FILE__)."/BaseDao.class.php";

class QuestionDao extends BaseDao{

  public function __construct(){
    parent::__construct("questions");
  }

  public function get_questions_by_user($id) {
    $questions = $this->query("SELECT * FROM questions WHERE user_id = :user_id", ["user_id" => $id]);
    return $questions;
  }

}
?>
