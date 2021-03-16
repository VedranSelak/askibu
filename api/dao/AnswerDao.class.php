<?php
require_once dirname(__FILE__)."/BaseDao.class.php";

class AnswerDao extends BaseDao{

  public function __construct(){
    parent::__construct("answers");
  }

}
 ?>
