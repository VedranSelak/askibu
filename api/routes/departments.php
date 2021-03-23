<?php

Flight::route('GET /departments', function(){
    $faculty_id = Flight::query('faculty_id',1);
    $offset = Flight::query("offset",0);
    $limit = Flight::query("limit",10);
    $search = Flight::query("search");
    $order = Flight::query("order",'-id');
    Flight::json(Flight::departmentService()->get_departments($faculty_id, $offset, $limit, $search, $order));
});

Flight::route('GET /departments/@id', function($id){
    Flight::json(Flight::departmentService()->get_by_id($id));
});

Flight::route('POST /departments', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::departmentService()->add($data));
});

Flight::route('PUT /departments/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::departmentService()->update($id,$data));
});

 ?>