<?php

Flight::route('/users/*', function(){
  $token = Flight::header("Authentication");
  try {
   $user = (array) \Firebase\JWT\JWT::decode($token,Config::JWT_SECRET,["HS256"]);
   if (Flight::request()->method != "GET" && $user["r"] == "USER_READ_ONLY") throw new Exception("Not a real user!",403);
   Flight::set('user', $user);
   return TRUE;
  } catch (\Exception $e) {
   Flight::json(["message"=>$e->getMessage()],401);
   die;
  }
});

Flight::route('/admin/*', function(){
  $token = Flight::header("Authentication");
  try {
   $user = (array) \Firebase\JWT\JWT::decode($token,Config::JWT_SECRET,["HS256"]);
   if ($user["r"] != "ADMIN") throw new Exception("Not an ADMIN!",403);

   Flight::set('user', $user);
   return TRUE;
  } catch (\Exception $e) {
   Flight::json(["message"=>$e->getMessage()],401);
   die;
  }
});

 ?>
