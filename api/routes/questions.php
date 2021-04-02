<?php
/**
 * @OA\Get(path="/user/questions",tags={"x-user","question"},security={{"ApiKeyAuth": {}}},
 *     @OA\Response(response="200", description="Get questions by users id")
 * )
 */
Flight::route("GET /user/questions", function(){
  Flight::json(Flight::questionService()->get_questions_by_user(Flight::get("user")["id"]));
});

 ?>
