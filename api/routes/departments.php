<?php

Flight::route('GET /departments', function(){
    $faculty_id = Flight::query('faculty_id');
    $offset = Flight::query("offset",0);
    $limit = Flight::query("limit",10);
    Flight::json(Flight::departmentService()->get_departments($faculty_id, $offset, $limit));
});

Flight::route('POST /departments', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::departmentService()->add($data));
});

 ?>
