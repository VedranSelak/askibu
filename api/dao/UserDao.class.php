<?php
require_once dirname(__FILE__)."/BaseDao.class.php";
class UserDao extends BaseDao {

  public function __construct(){
    parent::__construct("users");
  }

  public function get_user_by_email($email){
    return $this->query_unique("SELECT * FROM users WHERE email = :email",["email" => $email]);
  }

  public function update_user_by_email($email, $user){
    $this->update_by_other_id ($email, $user, "email");
  }

  public function get_users($search, $offset, $limit, $order = '-id'){
    list($order_column,$order_direction) = self::parse_order($order);

    return $this->query("SELECT * FROM users
                         WHERE LOWER(name) LIKE CONCAT('%', :name, '%')
                         ORDER BY ${order_column} ${order_direction}
                         LIMIT ${limit} OFFSET ${offset}",["name" => strtolower($search)]);
  }

  public function get_pins($user_id){
    return $this->query_unique("SELECT pins FROM users WHERE id = :id",["id"=>$user_id]);
  }

  public function get_user_by_token($token){
    return $this->query_unique("SELECT * FROM users WHERE token = :token",["token"=>$token]);
  }

}
 ?>
