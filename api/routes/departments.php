<?php
/**
 * @OA\Get(path="/user/departments", tags={"user", "department"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="faculty_id", default=1, description="Faculty of the department"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="offset", default=0, description="Offset for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="limit", default=25, description="Limit for pagination"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="search", description="Search string for users. Case insensitive search"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -columne_name ascending order by columne_name, +columne_name descending order by columne_name"),
 *     @OA\Response(response="200", description="List users from database")
 * )
 */
Flight::route('GET /user/departments', function(){
    $faculty_id = Flight::query('faculty_id',1);
    $offset = Flight::query("offset",0);
    $limit = Flight::query("limit",10);
    $search = Flight::query("search");
    $order = Flight::query("order",'-id');
    Flight::json(Flight::departmentService()->get_departments($faculty_id, $offset, $limit, $search, $order));
});

/**
 * @OA\Get(path="/user/departments/{id}",tags={"user", department},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of department"),
 *     @OA\Response(response="200", description="Get department by id")
 * )
 */
Flight::route('GET /user/departments/@id', function($id){
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
