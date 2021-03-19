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

  public function get_users($search, $offset, $limit, $order){
    if($search) {
        return $this->dao->get_users($search, $offset, $limit, $order);
    } else {
        return $this->dao->get_all($offset, $limit, $order);
    }
  }

  public function register($user){
    if(!isset($user['department_id'])) throw new Exception("Department not set!");

    $availableDepartments = $this->departmentDao->get_departments_by_faculty_id($user['faculty_id']);
    $department;
    foreach ($availableDepartments as $index => $dep) {
      if($dep['id'] == $user['department_id']){
        $department = $dep;
        break;
      }
    }

    try {
      $this->dao->beginTransaction();
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
      $this->dao->commit();
      return $user;
    } catch (\Exception $e) {
      $this->dao->rollBack();
      if(str_contains($e->getMessage(),'uq_user_email')){
        throw new Exception("Account with same email exists in the database!", 400, $e);
      } else {
        throw $e;
      }
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
