<?php
require_once dirname(__FILE__) . '/../../vendor/autoload.php';
require_once dirname(__FILE__) . '/../config.php';


class SMTPClient {
  private $mailer;


  public function __construct(){
    $transport = (new Swift_SmtpTransport(Config::SMTP_HOST, Config::SMTP_PORT))
      ->setUsername(Config::SMTP_USER)
      ->setPassword(Config::SMTP_PASSWORD)
    ;
    $this->mailer = new Swift_Mailer($transport);
  }

  public function send_register_user_token($user){
    $message = (new Swift_Message('Confirm your account'))
      ->setFrom(['vedran.selak@stu.ibu.edu.ba' => 'askIBU'])
      ->setTo($user['email'])
      ->setBody('Here is the confirmation link: http://localhost/web-programming-project/api/users/confirm/'.$user["token"]);
      ;

    // Send the message
    $result = $this->mailer->send($message);
  }
}
?>
