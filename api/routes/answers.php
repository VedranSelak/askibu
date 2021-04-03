<?php
/**
 * @OA\Get(path="/user/answer",tags={"x-user","answer"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="offset", default=0, description="Offset for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="limit", default=25, description="Limit for pagination"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="search", description="Search string for questions. Case insensitive search"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -columne_name ascending order by columne_name, +columne_name descending order by columne_name"),
 *     @OA\Response(response="200", description="Get answers by users id")
 * )
 */
Flight::route("GET /user/answer", function(){
  $offset = Flight::query("offset",0);
  $limit = Flight::query("limit",10);
  $search = Flight::query('search');
  $order = Flight::query('order','-id');
  Flight::json(Flight::answerService()->get_answers(Flight::get("user")["id"], $offset, $limit, $search, $order));
});

/**
 * @OA\Get(path="/user/answer/{id}",tags={"x-user","answer"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of a question"),
 *     @OA\Response(response="200", description="Get answer by id")
 * )
 */
// Flight::route("GET /user/answer/@id", function($id){
//   Flight::json(Flight::answerService()->get_questions_by_question_id(Flight::get("user")["id"], $id));
// });

/**
 * @OA\Post(path="/user/answer",tags={"x-user","answer"},security={{"ApiKeyAuth": {}}},
 * @OA\RequestBody(description="Question info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="body", type="string", example="Some body", desctiption="Body of the answer"),
 *        @OA\Property(property="question_id", type="integer", example=1, desctiption="Question for this answer")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="Success message")
 * )
 */
Flight::route("POST /user/answer", function(){
  $data = Flight::request()->data->getData();
  Flight::answerService()->post_answer(Flight::get("user"),$data);
  Flight::json(["message"=>"Your answer has been posted"]);
});

/**
 * @OA\Put(path="/user/answer/{id}",tags={"x-user","answer"},security={{"ApiKeyAuth": {}}},
 * @OA\Parameter(type="integer", in="path", name="id", default=1),
 * @OA\RequestBody(description="Question info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="subject", type="string", example="Some subject", desctiption="Subject of the question"),
 *        @OA\Property(property="body", type="string", example="Some body", desctiption="Body of the question"),
 *        @OA\Property(property="department_id", type="integer", example=1, desctiption="Department that the question is ment for"),
 *        @OA\Property(property="course_id", type="integer", example=1, desctiption="Course that the question is ment for"),
 *        @OA\Property(property="year_id", type="integer", example=1, desctiption="Year that the question is ment for")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="Updated question")
 * )
 */
// Flight::route("PUT /user/answer/@id", function($id){
//   $data = Flight::request()->data->getData();
//   Flight::json(Flight::questionService()->update_question(Flight::get("user") , $id, $data));
// });

 ?>
