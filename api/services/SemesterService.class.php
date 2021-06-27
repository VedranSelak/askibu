<?php

require_once dirname(__FILE__) . '/BaseService.class.php';
require_once dirname(__FILE__) . '/../dao/SemesterDao.class.php';

class SemesterService extends BaseService {

  public function __construct(){
    $this->dao = new SemesterDao();
  }

  public function get_semesters(){
    return $this->dao->get_semesters();
  }
}

 ?>
