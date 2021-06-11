<?php
/**
 * @OA\Get(path="/semesters",tags={"semester"},
 *     @OA\Response(response="200", description="Get semesters")
 * )
 */
Flight::route("GET /semesters", function(){
  Flight::json(Flight::semesterService()->get_semesters());
});

 ?>
