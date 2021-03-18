<?php


Flight::route('GET /users', function(){
    $offset = Flight::query("offset",0);
    $limit = Flight::query("limit",10);

    $search = Flight::query('search');
    if($search) {
        Flight::json(Flight::userDao()->get_users($search, $offset, $limit));
    } else {
        Flight::json(Flight::userDao()->get_all($offset,$limit));
    }
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
