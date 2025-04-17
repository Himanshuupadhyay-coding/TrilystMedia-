<?php
// Set response header
header('Content-Type: application/json');

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$company = isset($_POST['company']) ? trim($_POST['company']) : '';
$service = isset($_POST['service']) ? trim($_POST['service']) : '';
$budget = isset($_POST['budget']) ? trim($_POST['budget']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
$errors = [];
if (empty($name)) $errors['name'] = 'Name is required';
if (empty($email)) $errors['email'] = 'Email is required';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Invalid email format';
if (empty($message)) $errors['message'] = 'Message is required';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Email configuration
$to = 'info@trilyst.com'; // Replace with your email
$subject = 'New Contact Request from Trilyst Website';
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Email body
$emailBody = "
<html>
<head>
    <title>New Contact Request</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #121212; padding: 20px; text-align: center; }
        .header img { max-width: 150px; height: auto; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { padding: 10px; text-align: center; font-size: 12px; color: #777; }
        .field { margin-bottom: 15px; }
        .field-label { font-weight: bold; color: #121212; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='color: #fff; margin: 0;'>New Contact Request</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='field-label'>Name:</span> $name
            </div>
            <div class='field'>
                <span class='field-label'>Email:</span> $email
            </div>
            <div class='field'>
                <span class='field-label'>Phone:</span> " . ($phone ? $phone : 'Not provided') . "
            </div>
            <div class='field'>
                <span class='field-label'>Company:</span> " . ($company ? $company : 'Not provided') . "
            </div>
            <div class='field'>
                <span class='field-label'>Service Interested In:</span> " . ($service ? ucfirst(str_replace('-', ' ', $service)) : 'Not specified') . "
            </div>
            <div class='field'>
                <span class='field-label'>Budget:</span> " . ($budget ? '$' . str_replace('-', ' - $', str_replace('k', ',000', $budget)) : 'Not specified') . "
            </div>
            <div class='field'>
                <span class='field-label'>Message:</span>
                <p>$message</p>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the contact form on Trilyst website.</p>
        </div>
    </div>
</body>
</html>
";

// Send email
$mailSent = mail($to, $subject, $emailBody, $headers);

if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'There was a problem sending your message. Please try again later.']);
}
?>