<?php
require_once dirname(__FILE__) . '/BaseService.class.php';
require_once dirname(__FILE__) . '/../dao/QuestionDao.class.php';

class QuestionService extends BaseService {

  public function __construct(){
    $this->dao = new QuestionDao();
  }

  public function get_questions_by_user($id){
    return $this->dao->get_questions_by_user($id);
  }

}

 ?>
