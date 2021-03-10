<?php
require_once dirname(__FILE__)."/BaseDao.class.php";
class UserDao extends BaseDao {


  public function get_user_by_email($email){
    return $this->query_unique("SELECT * FROM user WHERE email = :email",["email" => $email]);
  }

  public function get_user_by_id($id){
    return $this->query_unique("SELECT * FROM user WHERE id = :id",["id" => $id]);
  }

  public function add_user($user){
    $query = "INSERT INTO user (name, email, password, pins, date_of_joining, faculty_id, department_id) VALUES (:name, :email, :password, :pins, :date_of_joining, :faculty_id, :department_id)";
    $stmt = $this->connection->prepare($query);
    $stmt->execute($user);
    $user['id'] = $this->connection->lastInsertId();
    return $user;
  }

  public function update_user($id, $user){

  }

}
 ?>
