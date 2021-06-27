<?php
require_once dirname(__FILE__) . '/BaseService.class.php';
require_once dirname(__FILE__) . '/../dao/QuestionDao.class.php';

class QuestionService extends BaseService {

  private $answerDao;

  public function __construct(){
    $this->dao = new QuestionDao();
    $this->answerDao = new AnswerDao();
  }
  public function get_questions_by_question_id($user_id, $id){
    return  $this->dao->get_questions_by_question_id($user_id, $id);
  }

  public function get_weeks_hottest_questions($status, $department_id){
    $questions =  $this->dao->get_weeks_hottest_questions($status, $department_id);
    $answers = $this->answerDao->get_answers(null, 0, 1000000000, $status, null, "-id", null);

    $entries = [];

    foreach ($questions as $key => $question) {
      $entries[$question["id"]] = 0;
      foreach ($answers as $key => $answer) {
        if($answer["question_id"] == $question["id"]){
          $entries[$question["id"]] += 1;
        }
      }
    }

    arsort($entries);
    $back = [];
    foreach ($entries as $yeah => $entry) {
      foreach ($questions as $key => $question) {
        if($yeah == $question["id"]){
          array_push($back, $question);
        }
      }
    }

    return array_slice($back, 0, 5);

  }

  public function remove_question($id){
    return  $this->dao->remove_question($id);
  }

  public function retrieve_question($id){
    return  $this->dao->retrieve_question($id);
  }

  public function get_question_count($user_id){
    return $this->dao->get_question_count($user_id);
  }

  public function get_questions($user_id, $offset, $limit, $search, $order, $status, $answer_id, $total = FALSE){
    return $this->dao->get_questions($user_id, $offset, $limit, $search, $order, $status, $answer_id, $total);
  }

  public function get_questions_for_departments($limit, $offset, $order, $department_id, $semester_id, $course_id, $status, $total = FALSE){
    return  $this->dao->get_questions_for_departments($limit, $offset, $order, $department_id, $semester_id, $course_id, $status, $total);
  }

  public function post_question($user, $question){
    try {
      //TODO : do validation of the fields
      if($question["course_id"] == ""){
        $question["course_id"] = NULL;
      }
      $data = [
        "subject" => $question["subject"],
        "body" => $question["body"],
        "department_id" => $question["department_id"],
        "course_id" => $question["course_id"],
        "semester_id" => $question["semester_id"],
        "user_id" => $user["id"],
        "posted_at" => date(Config::DATE_FORMAT),
        "status" => "ACTIVE"
      ];
      return parent::add($data);
    } catch (\Exception $e) {
      throw new Exception("One of the fields is invalid!",403);
    }

  }

  public function update_question($user, $id, $data) {
    $db_question = $this->dao->get_by_id($id);
    if($db_question["user_id"] != $user["id"]) throw new Exception("Invalid question!", 403);
    return $this->update($id, $data);
  }

}

 ?>
