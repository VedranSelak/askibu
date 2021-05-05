<?php
require_once dirname(__FILE__) . '/../../vendor/autoload.php';
require_once dirname(__FILE__) . '/../config.php';


class SMTPClient {
  private $mailer;


  public function __construct(){
    $transport = (new Swift_SmtpTransport(Config::SMTP_HOST, Config::SMTP_PORT, Config::SMTP_ENCRYPT))
      ->setUsername(Config::SMTP_USER)
      ->setPassword(Config::SMTP_PASSWORD)
    ;

    $this->mailer = new Swift_Mailer($transport);
  }

  public function send_register_user_token($user){
    $message = (new Swift_Message('Confirm your account'))
      ->setFrom([Config::SMTP_USER => 'askIBU'])
      ->setTo($user['email'])
      ->setBody('Here is the confirmation link: http://localhost/web-programming-project/api/confirm/'.$user["token"]);
      ;

    $result = $this->mailer->send($message);
  }

  public function send_user_recovery_token($user){
    $message = (new Swift_Message('Reset you password'))
      ->setFrom([Config::SMTP_USER => 'askIBU'])
      ->setTo($user['email'])
      ->setBody('Here is the recovery token: '.$user["token"]);
      ;

    $result = $this->mailer->send($message);
  }
}
?>
