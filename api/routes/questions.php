<?php
/**
 * @OA\Get(path="/user/question",tags={"x-user","question"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="offset", default=0, description="Offset for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="limit", default=25, description="Limit for pagination"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="search", description="Search string for questions. Case insensitive search"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -columne_name ascending order by columne_name, +columne_name descending order by columne_name"),
 *     @OA\Response(response="200", description="Get questions by users id")
 * )
 */
Flight::route("GET /user/question", function(){
  $offset = Flight::query("offset",0);
  $limit = Flight::query("limit",10);
  $search = Flight::query('search');
  $order = Flight::query('order','-id');
  Flight::json(Flight::questionService()->get_questions(Flight::get("user")["id"], $offset, $limit, $search, $order));
});

/**
 * @OA\Get(path="/user/question/{id}",tags={"x-user","question"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of a question"),
 *     @OA\Response(response="200", description="Get user by id")
 * )
 */
Flight::route("GET /user/question/@id", function($id){
  Flight::json(Flight::questionService()->get_questions_by_question_id(Flight::get("user")["id"], $id));
});

/**
 * @OA\Get(path="/admin/question",tags={"x-admin","question"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="user_id", default=92, description="Users id"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="offset", default=0, description="Offset for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="limit", default=25, description="Limit for pagination"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="search", description="Search string for questions. Case insensitive search"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -columne_name ascending order by columne_name, +columne_name descending order by columne_name"),
 *     @OA\Response(response="200", description="Get questions from database")
 * )
 */
Flight::route("GET /admin/question", function(){
  $user_id = Flight::query('user_id');
  $offset = Flight::query("offset",0);
  $limit = Flight::query("limit",10);
  $search = Flight::query('search');
  $order = Flight::query('order','-id');
  Flight::json(Flight::questionService()->get_questions($user_id, $offset, $limit, $search, $order));
});

/**
 * @OA\Post(path="/user/question",tags={"x-user","question"},security={{"ApiKeyAuth": {}}},
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
 * @OA\Response(response="200", description="Success message")
 * )
 */
Flight::route("POST /user/question", function(){
  $data = Flight::request()->data->getData();
  Flight::questionService()->post_question(Flight::get("user"),$data);
  Flight::json(["message"=>"Your question has been posted"]);
});

/**
 * @OA\Post(path="/admin/question",tags={"x-admin","question"},security={{"ApiKeyAuth": {}}},
 * @OA\RequestBody(description="Question info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="subject", type="string", example="Some subject", desctiption="Subject of the question"),
 *        @OA\Property(property="body", type="string", example="Some body", desctiption="Body of the question"),
 *        @OA\Property(property="department_id", type="integer", example=1, desctiption="Department that the question is ment for"),
 *        @OA\Property(property="course_id", type="integer", example=1, desctiption="Course that the question is ment for"),
 *        @OA\Property(property="year_id", type="integer", example=1, desctiption="Year that the question is ment for"),
 *        @OA\Property(property="user_id", type="integer", example=1, desctiption="User that is posting the question")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="Question that has been added to the database")
 * )
 */
Flight::route("POST /admin/question", function(){
  Flight::json(Flight::questionService()->add(Flight::request()->data->getData()));
});

/**
 * @OA\Put(path="/user/question/{id}",tags={"x-user","question"},security={{"ApiKeyAuth": {}}},
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
Flight::route("PUT /user/question/@id", function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::questionService()->update_question(Flight::get("user") , $id, $data));
});

/**
 * @OA\Put(path="/admin/question/{id}",tags={"x-admin","question"},security={{"ApiKeyAuth": {}}},
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
Flight::route("PUT /admin/question/@id", function($id){
   Flight::json(Flight::questionService()->update($id, Flight::request()->data->getData()));
});
 ?>
