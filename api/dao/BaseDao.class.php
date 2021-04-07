<?php
require_once dirname(__FILE__)."/../config.php";
  class BaseDao {
    protected $connection;
    private $table;

    public function beginTransaction(){
      $this->connection->beginTransaction();
    }

    public function commit(){
      $this->connection->commit();
    }

    public function rollBack(){
      $this->connection->rollBack();
    }

    public function parse_order($order){
      switch(substr($order,0,1)){
        case '-': $order_direction = "ASC"; break;
        case '+': $order_direction = "DESC"; break;
        default: throw new Exception("Invalid order format. First character should be either + or -."); break;
      };

      $order_column = trim($this->connection->quote(substr($order,1)), "'");
      return [$order_column,$order_direction];
    }

    public function __construct($table){
      $this->table = $table;
      try {
        $this->connection = new PDO("mysql:host=".Config::DB_HOST().";port=".Config::DB_PORT().";dbname=".Config::DB_SCHEME(), Config::DB_USERNAME(), Config::DB_PASSWORD());
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //$this->connection->setAttribute(PDO::ATTR_AUTOCOMMIT, 0);
      } catch(PDOException $e) {
        throw $e;
      }
    }

    protected function insert($table, $entity){
      $query = "INSERT INTO ${table} (";
      foreach($entity as $name => $value) {
        $query .= $name.", ";
      }
      $query = substr($query, 0, -2).") VALUES (";
      foreach($entity as $name => $value) {
        $query .= ":".$name.", ";
      }
      $query = substr($query, 0, -2).")";
      $stmt = $this->connection->prepare($query);
      $stmt->execute($entity);
      $entity['id'] = $this->connection->lastInsertId();
      return $entity;
    }

    protected function execute_update($table, $id, $entity, $id_column = "id"){
      $query ="UPDATE ${table} SET ";
      foreach($entity as $name => $value) {
        $query .= $name."= :".$name.", ";
      }
      $query = substr($query, 0, -2);
      $query .= " WHERE ${id_column} = :id";

      $stmt = $this->connection->prepare($query);
      $entity['id'] = $id;
      $stmt->execute($entity);
    }

    public function update($id, $entity){
      return $this->execute_update($this->table, $id, $entity);
    }

    public function update_by_other_id($id, $entity, $column){
      $this->execute_update($this->table, $id, $entity, $column);
    }

    public function get_by_id($id){
      return $this->query_unique("SELECT * FROM {$this->table} WHERE id = :id",["id" => $id]);
    }

    public function add($entity){
      return $this->insert($this->table,$entity);
    }

    public function get_all($offset = 0, $limit = 25, $order = '-id'){
      list($order_column,$order_direction) = self::parse_order($order);
      return $this->query("SELECT * FROM ".$this->table."
                         ORDER BY ${order_column} ${order_direction}
                         LIMIT ${limit} OFFSET {$offset}", []);
    }

    protected function query($query, $params){
      $stmt = $this->connection->prepare($query);
      $stmt->execute($params);
      return  $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    protected function query_unique($query, $params){
      $results = $this->query($query, $params);
      return reset($results);
    }

  }

?>
