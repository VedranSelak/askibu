<?php
/**
 * @OA\Info(title="askIBU API", version="0.1")
 * @OA\OpenApi(
 *   @OA\Server(url="http://localhost/web-programming-project/api/", description="Development Enviroment"),
 *   @OA\Server(url="https://askIBU.ba/api/", description="Production Enviroment")
 * )
 */

/**
 * @OA\Get(path="/users", tags={"user"},
 *     @OA\Parameter(@OA\Schema(type="interger"), in="query", name="offset", default=0, description="Offset for pagination"),
 *     @OA\Parameter(@OA\Schema(type="interger"), in="query", name="limit", default=25, description="Limit for pagination"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="search", description="Search string for users. Case insensitive search"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -columne_name ascending order by columne_name, +columne_name descending order by columne_name"),
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
 * @OA\Get(path="/users/{id}",tags={"user"},
 *     @OA\Parameter(@OA\Schema(type="interger"), in="path", allowReserved=true, name="id", default=1, description="id of user"),
 *     @OA\Response(response="200", description="Get user by id")
 * )
 */
Flight::route('GET /users/@id', function($id){
    Flight::json(Flight::userService()->get_by_id($id));
});

/**
 * @OA\Post(path="/users/register",tags={"user"},
 * @OA\RequestBody(description="Basic user info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="name", type="string", example="My test user", desctiption="Name of the user"),
 *        @OA\Property(property="email", type="string", example="username@gmail.com", desctiption="Users email"),
 *        @OA\Property(property="password", type="string", example="userspass", desctiption="Users password"),
 *        @OA\Property(property="faculty_id", type="string", example="1", desctiption="Faculty that the user attends"),
 *        @OA\Property(property="department_id", type="string", example="1", desctiption="Department that the user attends")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="User that has been added to the database")
 * )
 */
Flight::route('POST /users/register', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userService()->register($data));
});

/**
 * @OA\Put(path="/users/{id}",tags={"user"},
 *     @OA\Parameter(@OA\Schema(type="interger"), in="path", name="id", default=1),
 *       @OA\RequestBody(description="Basic user info that is going to be updated", required=true,
 *         @OA\MediaType(
 *           mediaType="application/json",
 *           @OA\Schema(
 *             @OA\Property(property="name", type="string", example="My test user", desctiption="Name of the user"),
 *             @OA\Property(property="email", type="string", example="username@gmail.com", desctiption="Users email"),
 *             @OA\Property(property="password", type="string", example="userspass", desctiption="Users password"),
 *             @OA\Property(property="faculty_id", type="string", example="1", desctiption="Faculty that the user attends"),
 *             @OA\Property(property="department_id", type="string", example="1", desctiption="Department that the user attends")
 *           )
 *         )
 *        ),
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
