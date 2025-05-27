<?php
// Replace these with your actual DB credentials
$host = "localhost";
$db = "nguc_alumni";
$user = "root";
$pass = "";

// Connect to the database
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Only proceed on POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize inputs
    $name = htmlspecialchars(trim($_POST['graduateName']));
    $entryYear = intval($_POST['entryYear']);
    $graduationYear = intval($_POST['graduationYear']);
    $department = htmlspecialchars(trim($_POST['department']));
    $placeOfWork = htmlspecialchars(trim($_POST['placeOfWork']));
    $jobPosition = htmlspecialchars(trim($_POST['jobPosition']));
    $phoneNumber = htmlspecialchars(trim($_POST['phoneNumber']));

    // Generate random student number like: ALM2025001
    $randomDigits = rand(100, 999);
    $studentNo = "ALM" . $graduationYear . $randomDigits;

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO alumni (student_no, graduate_name, entry_year, graduation_year, department, place_of_work, job_position, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssiissss", $studentNo, $name, $entryYear, $graduationYear, $department, $placeOfWork, $jobPosition, $phoneNumber);

    if ($stmt->execute()) {
        // On success, alert and redirect
        echo "<script>
            alert('Submission successful! Your Student No is: $studentNo');
            window.location.href = 'index.html';
        </script>";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
