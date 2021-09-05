<?php

// Import PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load composers autoloader
require 'vendor/autoload.php';

// Get configuration parameters
include '../config.php';

// If started from the command line, wrap parameters to $_POST and $_GET
if (!isset($_SERVER["HTTP_HOST"])) {
    parse_str($argv[1], $_GET);
    parse_str($argv[1], $_POST);
}

// Create a PHPMailer instance
$mail = new PHPMailer(true);

$name = "";
$fromEmail = "";
$message = "";

// Try to get the POST data
if (!empty($_POST)) {
    // Name of the sender
    $name = $_POST['name'];

    if (empty($name)) {
        $name = "Missing Name";
    }

    // Email they are sending from
    $fromEmail = $_POST['_replyto'];
    if (empty($fromEmail)) {
        $fromEmail = "error@error.com";
    }

    // Mesage text
    $message = $_POST['message'];
    if (empty($message)) {
        // Empty message!
    } else {
        $message = strip_tags($message);
    }
}

// Get the current time
$time = time();

// Send some mail!
try {

    // specify SMTP credentials
    $mail->isSMTP();
    $mail->Host = $emailHost;
    $mail->SMTPAuth = true;
    $mail->Username = $emailUsername;
    $mail->Password = $emailPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $emailPort;

    $mail->setFrom($emailAddress, 'Portfolio Contact Form');
    $mail->addAddress($myEmail, $myName);
    $mail->Subject = 'New message from your portfolio contact form from ' . $name;

    // Enable HTML if needed
    $mail->isHTML(true);

    $bodyParagraphs = ["Name: {$name}", "Email: {$fromEmail}", "Message:", $message];
    $body = join('<br><br>', $bodyParagraphs);
    $mail->Body = $body;

    if($mail->send()){
        header("Location: index.html?sendResult=success&time=" . $time . "#contact");
    } else {
        header("Location: index.html?sendResult=fail&time=" . $time . "#contact");
    }
} catch (Exception $e) {
    header("Location: index.html?sendResult=fail&time=" . $time . "#contact");
}