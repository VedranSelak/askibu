<?php

require_once dirname(__FILE__) . '/BaseService.class.php';
require_once dirname(__FILE__) . '/../dao/AnswerDao.class.php';

class AnswerService extends BaseService {

  public function __construct(){
    $this->dao = new AnswerDao();
  }
  public function get_answer_by_answer_id($user_id, $id){
    return  $this->dao->get_answer_by_answer_id($user_id, $id);
  }

  public function get_answers($user_id, $offset, $limit, $search, $order){
    return $this->dao->get_answers($user_id, $offset, $limit, $search, $order);
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
      throw new Exception("One of the fields is invalid!",403);
    }

  }

  public function update_answer($user, $id, $data) {
    $db_answer = $this->dao->get_by_id($id);
    if($db_answer["user_id"] != $user["id"]) throw new Exception("Invalid answer!", 403);
    return $this->update($id, $data);
  }

}

 ?>
