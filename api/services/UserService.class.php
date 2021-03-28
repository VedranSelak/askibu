<?php
require_once dirname(__FILE__) . '/../dao/UserDao.class.php';
require_once dirname(__FILE__) . '/../dao/DepartmentDao.class.php';
require_once dirname(__FILE__) . '/BaseService.class.php';
require_once dirname(__FILE__) . '/../clients/SMTPClient.class.php';
class UserService extends BaseService {

  private $departmentDao;
  private $smtpClient;
  public function __construct(){
    $this->dao = new UserDao();
    $this->departmentDao = new DepartmentDao();
    $this->smtpClient = new SMTPClient();
  }

  public function get_users($search, $offset, $limit, $order){
    if($search) {
        return $this->dao->get_users($search, $offset, $limit, $order);
    } else {
        return $this->dao->get_all($offset, $limit, $order);
    }
  }

  public function login($user){
    $db_user = $this->dao->get_user_by_email($user["email"]);
    if(!isset($db_user["id"])) throw new Exception("User doesn't exist",400);
    if($db_user["status"] != "ACTIVE") throw new Exception("Account not active",400);
    if($db_user["password"] != md5($user["password"])) throw new Exception("Invalid password",400);
    return $db_user;
  }

  public function register($user){
    if(!isset($user['department_id'])) throw new Exception("Department not set!");

    $availableDepartments = $this->departmentDao->get_departments_by_faculty_id($user['faculty_id'],0,25,"","-id");
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
        "password" => md5($user['password']),
        "pins" => 0,
        "date_of_joining" => date(Config::DATE_FORMAT),
        "faculty_id" => $user['faculty_id'],
        "department_id" => $department['id'],
        "status" => "PENDING",
        "role" => "USER",
        "token" => md5(random_bytes(16))
      ]);

      //TODO send email with token
      $this->dao->commit();
    } catch (\Exception $e) {
      $this->dao->rollBack();
      if(str_contains($e->getMessage(),'uq_user_email')){
        throw new Exception("Account with same email exists in the database!", 400, $e);
      } else {
        throw $e;
      }
    }
    $this->smtpClient->send_register_user_token($user);
    return $user;
  }

  public function confirm($token){
    $user = $this->dao->get_user_by_token($token);

    if (!isset($user['id'])) throw new Exception("Invalid token");

    $this->dao->update($user['id'], ["status" => "ACTIVE"]);

    //TODO send email to user
  }

}

 ?>
