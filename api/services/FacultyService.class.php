<?php

require_once dirname(__FILE__) . '/BaseService.class.php';
require_once dirname(__FILE__) . '/../dao/FacultyDao.class.php';

class FacultyService extends BaseService {

  public function __construct(){
    $this->dao = new FacultyDao();
  }

  public function get_faculties($offset, $limit, $search, $order){
    return $this->dao->get_faculties($offset, $limit, $search, $order);
  }
}
 ?>
