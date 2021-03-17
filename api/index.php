<?php

require dirname(__FILE__) . '/../vendor/autoload.php';
require dirname(__FILE__) . '/dao/UserDao.class.php';

Flight::register('userDao', 'UserDao');

Flight::route('GET /users', function(){
    $users = Flight::userDao()->get_all(0,10);
    Flight::json($users);
});

Flight::route('GET /users/@id', function($id){
    $user = Flight::userDao()->get_by_id($id);
    Flight::json($user);
});

Flight::route('POST /users', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    $user = Flight::userDao()->add($data);
    Flight::json($user);
});

Flight::route('PUT /users/@id', function($id){
  $request = Flight::request();
  $data = $request->data->getData();
  Flight::userDao()->update($id,$data);

  $user = Flight::userDao()->get_by_id($id);
  Flight::json($user);
});

Flight::route('/hello3', function(){
    echo 'hello world3!';
});

Flight::route('/hello4', function(){
    echo 'hello world4!';
});

Flight::route('/hello5', function(){
    echo 'hello world5!';
});

Flight::start();

?>
