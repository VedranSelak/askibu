<?php

require_once dirname(__FILE__) . '/../vendor/autoload.php';
require_once dirname(__FILE__) . '/dao/UserDao.class.php';

Flight::register('userDao', 'UserDao');

require_once dirname(__FILE__) . "/routes/users.php";

Flight::route('/hello3', function(){
    echo 'hello world3!';
});

Flight::route('/hello4', function(){
    echo 'hello world4!';
});

Flight::route('/hello5', function(){
    echo 'hello world5!';
});

Flight::start();

?>
