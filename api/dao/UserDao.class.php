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

  public function get_users($search, $offset, $limit, $order = '-id', $total = FALSE){
    list($order_column,$order_direction) = self::parse_order($order);

    $params = [];
    if ($total){
      $query = "SELECT COUNT(*) AS total ";
    }else{
      $query = "SELECT * ";
    }
    $query .= "FROM users
               WHERE 1 = 1 ";

    if (isset($search)){
      $query .= "AND  LOWER(name) LIKE CONCAT('%', :search, '%') ";
      $params['search'] = strtolower($search);
    }

    if ($total){
      return $this->query_unique($query, $params);
    }else{
      $query .="ORDER BY ${order_column} ${order_direction} ";
      $query .="LIMIT ${limit} OFFSET ${offset}";

      return $this->query($query, $params);
    }
  }

  public function get_user_by_token($token){
    return $this->query_unique("SELECT * FROM users WHERE token = :token",["token"=>$token]);
  }

}
 ?>
