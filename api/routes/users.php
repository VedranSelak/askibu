<?php
/**
 * @OA\Info(title="askIBU API", version="0.1")
 * @OA\OpenApi(
 *   @OA\Server(url="http://localhost/web-programming-project/api/", description="Development Enviroment"),
 *   @OA\Server(url="https://askIBU.ba/api/", description="Production Enviroment")
 * )
 */

/**
 * @OA\Get(path="/users",
 *     @OA\Response(response="200", description="List users from database")
 * )
 */
Flight::route('GET /users', function(){
    $offset = Flight::query("offset",0);
    $limit = Flight::query("limit",10);
    $search = Flight::query('search');
    $order = Flight::query('order','-id');
    Flight::json(Flight::userService()->get_users($search, $offset, $limit, $order));
});

/**
 * @OA\Get(path="/users/{id}",
 *     @OA\Parameter(@OA\Schema(type="interger"), in="path", allowReserved=true, name="id", example=1),
 *     @OA\Response(response="200", description="Get user by id")
 * )
 */
Flight::route('GET /users/@id', function($id){
    Flight::json(Flight::userService()->get_by_id($id));
});

/**
 * @OA\Post(path="/users/register",
 *     @OA\Response(response="200", description="Add user")
 * )
 */
Flight::route('POST /users/register', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userService()->register($data));
});

/**
 * @OA\Put(path="/users/{id}",
 *     @OA\Parameter(@OA\Schema(type="interger"), in="path", allowReserved=true, name="id", example=1),
 *     @OA\Response(response="200", description="Update user based on id")
 * )
 */
Flight::route('PUT /users/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::userService()->update($id,$data));
});

Flight::route('GET /users/confirm/@token', function($token){
  Flight::userService()->confirm($token);
  Flight::json(["message"=>"Your account has been activated"]);
});


 ?>
