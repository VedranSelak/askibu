<?php

/**
 * @OA\Get(path="/courses",tags={"course"},
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="semester_id", default=25, description="Get courses by semester"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="search", description="Search string for faculty. Case insensitive search"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -columne_name ascending order by columne_name, +columne_name descending order by columne_name"),
 *     @OA\Response(response="200", description="Get faculties")
 * )
 */
Flight::route("GET /courses", function(){
  $semester_id = Flight::query("semester_id");
  $search = Flight::query('search');
  $order = urldecode(Flight::query('order','-id'));
  Flight::json(Flight::courseService()->get_courses($semester_id, $search, $order));
});

 ?>
