<?php
require_once dirname(__FILE__) . '/BaseService.class.php';
require_once dirname(__FILE__) . '/../dao/QuestionDao.class.php';

class QuestionService extends BaseService {

  public function __construct(){
    $this->dao = new QuestionDao();
  }

  public function get_questions($user_id, $offset, $limit, $search, $order){
    if(isset($user_id)) {
      return $this->dao->get_questions_by_user($user_id, $offset, $limit, $search, $order);
    }
    return $this->dao->get_all($offset, $limit, $search, $order);
  }

  public function post_question($user, $question){
    try {
      $data = [
        "subject" => $question["subject"],
        "body" => $question["body"],
        "department_id" => $question["department_id"],
        "course_id" => $question["course_id"],
        "year_id" => $question["year_id"],
        "user_id" => $user["id"],
        "posted_at" => date(Config::DATE_FORMAT)
      ];
      return parent::add($data);
    } catch (\Exception $e) {
      throw new Exception($e->getMessage(),403);
    }

  }

  public function update_question($user, $id, $data) {
    $db_question = $this->dao->get_by_id($id);
    if($db_question["user_id"] != $user["id"]) throw new Exception("Invalid question!", 403);
    return parent::update($id, $data);
  }

}

 ?>
