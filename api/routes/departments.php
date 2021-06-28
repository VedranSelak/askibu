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
 * @OA\Get(path="/user/departments/{id}",tags={"user", "department"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of department"),
 *     @OA\Response(response="200", description="Get department by id")
 * )
 */
Flight::route('GET /user/departments/@id', function($id){
    Flight::json(Flight::departmentService()->get_by_id($id));
});

/**
 * @OA\Get(path="/departments/{id}",tags={"department"},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of faculty"),
 *     @OA\Response(response="200", description="Get department by id")
 * )
 */
Flight::route('GET /departments/@id', function($id){
    Flight::json(Flight::departmentService()->get_departments($id, 0, 100, null, "-id"));
});

/**
 * @OA\Get(path="/admin/department-faculty/{id}",tags={"admin", "department"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of department"),
 *     @OA\Response(response="200", description="Get department by id")
 * )
 */
Flight::route('GET /admin/department-faculty/@id', function($id){
    Flight::json(Flight::departmentService()->get_deparment_and_faculty($id));
});

/**
 * @OA\Post(path="/admin/departments",tags={"x-admin","department"},security={{"ApiKeyAuth": {}}},
 * @OA\RequestBody(description="Department info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="name", type="string", example="Department name", desctiption="Name of the department"),
 *        @OA\Property(property="faculty_id", type="integer", example=1, desctiption="Faculty id of that department")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="Department that was added")
 * )
 */
Flight::route('POST /admin/departments', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::departmentService()->add($data));
});

/**
 * @OA\Put(path="/admin/departments/{id}",tags={"x-admin","department"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of the department"),
 * @OA\RequestBody(description="Department info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="name", type="string", example="Department name", desctiption="Name of the department"),
 *        @OA\Property(property="faculty_id", type="integer", example=1, desctiption="Faculty id of that department")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="Department that was updated")
 * )
 */
Flight::route('PUT /admin/departments/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::departmentService()->update($id,$data));
});

 ?>
