<?php

require_once dirname(__FILE__)."/BaseDao.class.php";

class SemesterDao extends BaseDao{

  public function __construct(){
    parent::__construct("semesters");
  }

  public function get_semesters(){
    return $this->query("SELECT * FROM semesters",[]);
  }

}

?>
