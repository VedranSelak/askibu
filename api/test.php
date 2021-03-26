<?php
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(1);

require_once dirname(__FILE__).'/../vendor/autoload.php';

// Create the Transport
$transport = (new Swift_SmtpTransport('smtp-relay.sendinblue.com', 587))
  ->setUsername('vedran.selak@stu.ibu.edu.ba')
  ->setPassword('xWnHkgJXzDUFS49Y')
;

// Create the Mailer using your created Transport
$mailer = new Swift_Mailer($transport);

// Create a message
$message = (new Swift_Message('veka salje kodom'))
  ->setFrom(['vedran.selak@stu.ibu.edu.ba' => 'Vedran'])
  ->setTo(['admirkrilasevic@gmail.com', ])
  ->setBody('Radil ovo sranje')
  ;

// Send the message
$result = $mailer->send($message);
?>
