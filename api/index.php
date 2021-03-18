<?php

require_once dirname(__FILE__) . '/../vendor/autoload.php';
require_once dirname(__FILE__) . '/services/UserService.class.php';

//reading query params from URL
Flight::map('query',function($name, $default_value = NULL){
  $request = Flight::request();
  $query_param = @$request->query->getData()[$name];
  $query_param = $query_param ? $query_param : $default_value;
  return $query_param;
});

//register BLL services
Flight::register('userService', 'UserService');

//include all routes
require_once dirname(__FILE__) . "/routes/users.php";

Flight::start();

?>
