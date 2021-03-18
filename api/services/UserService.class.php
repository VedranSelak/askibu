<?php
require_once dirname(__FILE__) . '/../dao/UserDao.class.php';
require_once dirname(__FILE__) . '/../dao/DepartmentDao.class.php';
require_once dirname(__FILE__) . '/BaseService.class.php';

class UserService extends BaseService {

  private $departmentDao;
  public function __construct(){
    $this->dao = new UserDao();
    $this->departmentDao = new DepartmentDao();
  }

  public function get_users($search, $offset, $limit){
    if($search) {
        return $this->dao->get_users($search, $offset, $limit);
    } else {
        return $this->dao->get_all($offset,$limit);
    }
  }

  public function register($user){
    if(!isset($user['department_id'])) throw new Exception("Department not set!");

    $availableDepartments = $this->departmentDao->get_departments_by_faculty_id($user['faculty_id']);
    $doesExist = false;
    $department;
    foreach ($availableDepartments as $index => $dep) {
      if($dep['id'] == $user['department_id']){
        $department = $dep;
        $doesExist = true;
        break;
      } else {
        $doesExist = false;
      }
    }

    if($doesExist) {
      $user = parent::add([
        "name" => $user['name'],
        "email" => $user['email'],
        "password" => $user['password'],
        "pins" => 0,
        "date_of_joining" => $user['date_of_joining'],
        "faculty_id" => $user['faculty_id'],
        "department_id" => $department['id'],
        "status" => "PENDING",
        "role" => "USER",
        "token" => md5(random_bytes(16))
      ]);

      //TODO send email with token
      return $user;
    } else {
      throw new Exception("Department doesn't exist");
    }

  }

  public function confirm($token){
    $user = $this->dao->get_user_by_token($token);

    if (!isset($user['id'])) throw new Exception("Invalid token");

    $this->dao->update($user['id'], ["status" => "ACTIVE"]);

    //TODO send email to user
  }

}

 ?>
