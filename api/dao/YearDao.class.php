<?php

require_once dirname(__FILE__)."/BaseDao.class.php";

class YearDao extends BaseDao{

  public function __construct(){
    parent::__construct("years");
  }

  public function get_semesters(){
    return $this->query("SELECT * FROM years",[]);
  }

}

?>
