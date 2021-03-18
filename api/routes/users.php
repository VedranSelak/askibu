<?php

Flight::route('GET /users', function(){
    Flight::json(Flight::userDao()->get_all(0,10));
});

Flight::route('GET /users/@id', function($id){
    Flight::json(Flight::userDao()->get_by_id($id));
});

Flight::route('POST /users', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userDao()->add($data));
});

Flight::route('PUT /users/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::userDao()->update($id,$data);

  $user = Flight::userDao()->get_by_id($id);
  Flight::json($user);
});


 ?>
