<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Email content formatting for the company
    $emailBodyCompany = "
    <h2>Contact Information</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p>$message</p>
    ";

    // Email content formatting for the user confirmation
    $emailBodyUser = "
    <h2>Thank you for contacting us, $name!</h2>
    <p>We have received your message and will get back to you soon.</p>
    <p>Best regards,<br>New Generation University College</p>
    ";

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();                                    // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';                     // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                             // Enable SMTP authentication
        $mail->Username = '';       // SMTP username (your Gmail address)
        $mail->Password = '';               // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                  // TCP port to connect to

        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];

        // Sending email to the company
        $mail->setFrom($email, $name);
        $mail->addAddress('primotrading40@gmail.com');      // Company's email

        // Email subject and body for the company
        $mail->Subject = $subject;
        $mail->isHTML(true); // Set email format to HTML
        $mail->Body = $emailBodyCompany;

        // Send email to the company
        $mail->send();

        // Now send a confirmation email to the user
        $mail->clearAddresses();                            // Clear all recipients
        $mail->addAddress($email);                          // User's email
        $mail->Subject = "Confirmation: We received your message!";
        $mail->Body = $emailBodyUser;

        // Send email to the user
        $mail->send();

        echo "<script LANGUAGE='JavaScript'>
                window.alert('Thank you " . $name . "! We will contact you shortly!');
                window.location.href='index.html';
            </script>";
    } catch (Exception $e) {
        echo "Error sending email: " . $mail->ErrorInfo;
    }
}
?>
