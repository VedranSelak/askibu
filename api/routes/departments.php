<?php

// Flight::route('GET /departments?faculty_id=1', function(){
//     $offset = Flight::query("offset",0);
//     $limit = Flight::query("limit",10);
//     $search = Flight::query('search');
//     $order = Flight::query('order','-id');
//     Flight::json(Flight::userService()->get_users($search, $offset, $limit, $order));
// });
//
// Flight::route('GET /departments/@id', function($id){
//     Flight::json(Flight::userService()->get_by_id($id));
// });

Flight::route('POST /departments', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::departmentService()->add($data));
});

Flight::route('PUT /departments/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::userService()->update($id,$data));
});

Flight::route('GET /departments/confirm/@token', function($token){
  Flight::userService()->confirm($token);
  Flight::json(["message"=>"Your account has been activated"]);
});


 ?>
