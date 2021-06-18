<?php

require_once dirname(__FILE__) . '/BaseService.class.php';
require_once dirname(__FILE__) . '/../dao/AnswerDao.class.php';
require_once dirname(__FILE__) . '/../dao/QuestionDao.class.php';

class AnswerService extends BaseService {

  private $questionDao;

  public function __construct(){
    $this->dao = new AnswerDao();
    $this->questionDao = new QuestionDao();
  }
  public function get_answer_by_answer_id($user_id, $id){
    return  $this->dao->get_answer_by_answer_id($user_id, $id);
  }

  public function remove_answer($id){
    return  $this->dao->remove_answer($id);
  }

  public function get_answer_count($user_id){
    return $this->dao->get_answer_count($user_id);
  }

  public function get_answers($user_id, $offset, $limit, $status, $search, $order, $total = FALSE){
    return $this->dao->get_answers($user_id, $offset, $limit, $status, $search, $order, $total);
  }

  public function get_answer_by_question_id($id, $order, $status){
    return $this->dao->get_answer_by_question_id($id, $order, $status);
  }

  public function pin_answer($user_id, $id, $question_id, $value){
    $question = $this->questionDao->get_questions_by_question_id($user_id, $question_id);
    if($question != NULL){
      $this->dao->pin_answer($id, $value);
      return "Answer pinned successfuly!";
    } else {
      throw new Exception("Can't pin answers that are not on your question!", 403);
    }
  }

  public function post_answer($user, $answer){
    try {
      //TODO : do validation of the fields
      $data = [
        "is_pinned" => 0,
        "body" => $answer["body"],
        "user_id" => $user["id"],
        "question_id" => $answer["question_id"],
        "posted_at" => date(Config::DATE_FORMAT)
      ];
      return parent::add($data);
    } catch (\Exception $e) {
      //throw new Exception("One of the fields is invalid!",403);
      throw new $e;
    }

  }

  public function update_answer($user, $id, $data) {
    $db_answer = $this->dao->get_by_id($id);
    if($db_answer["user_id"] != $user["id"]) throw new Exception("Invalid answer!", 403);
    $data["status"] = "UPDATED";
    return $this->update($id, $data);
  }

}

 ?>
