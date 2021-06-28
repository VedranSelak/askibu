<?php

/**
 * @OA\Get(path="/faculties",tags={"faculty"},
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="offset", default=0, description="Offset for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="limit", default=25, description="Limit for pagination"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="search", description="Search string for faculty. Case insensitive search"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -columne_name ascending order by columne_name, +columne_name descending order by columne_name"),
 *     @OA\Response(response="200", description="Get faculties")
 * )
 */
Flight::route("GET /faculties", function(){
  $offset = Flight::query("offset",0);
  $limit = Flight::query("limit",25);
  $search = Flight::query('search');
  $order = urldecode(Flight::query('order','-id'));
  Flight::json(Flight::facultyService()->get_faculties($offset, $limit, $search, $order));
});


/**
 * @OA\Post(path="/admin/faculties",tags={"x-admin","faculty"},security={{"ApiKeyAuth": {}}},
 * @OA\RequestBody(description="Faculty info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="name", type="string", example="Faculty name", desctiption="Name of the faculty")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="faculty that was added")
 * )
 */
Flight::route('POST /admin/faculties', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::facultyService()->add($data));
});

 ?>
