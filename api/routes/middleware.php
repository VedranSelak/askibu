<?php

Flight::route('*', function(){
  if(Flight::request()->url == "/users/login" || Flight::request()->url == "/users/register" || Flight::request()->url == "/users/forgot"|| Flight::request()->url == "/users/reset" || Flight::request()->url == "/users/confirm/@token") return TRUE;

  $headers = getallheaders();
  $token = @$headers["Authentication"];
  try {
   $decoded = (array) \Firebase\JWT\JWT::decode($token,"JWT SECRET",["HS256"]);
   Flight::set('user', $decoded);
   //ADMIN - routes for admin
   //USER - routes for regular users
   //USER_READ_ONLY - block POST nas PUT
   return TRUE;
  } catch (\Exception $e) {
   Flight::json(["message"=>$e->getMessage()],401);
   die;
  }
});

 ?>
