<?php
//headers
include_once("./headers.php");

include_once($_SERVER['DOCUMENT_ROOT'] . '/evolve/dbconnect.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/evolve/auth.php');

//decoding JSON body (POST request)
$data = json_decode(file_get_contents("php://input"));

if ($data) {

    //storing params into variables
    $firstname = $data->firstName;
    $lastname = $data->lastName;
    $location = $data->location;
    $email = $data->email;
    $password = md5($data->password);

    // *Check if the email already exists
    //prepared statements
    $checkifalreadyexistsstmt = $conn->prepare("SELECT userID FROM user WHERE email=? LIMIT 1");
    $checkifalreadyexistsstmt->bind_param("s", $email);

    //executing the statement
    $checkifalreadyexistsstmt->execute();

    //store result
    $checkifalreadyexistsstmt->store_result();

    $result = $checkifalreadyexistsstmt->num_rows;

    if ($result == '0') {

        // *Register new user
        try {
            //prepared statements
            $regnewuserstmt = $conn->prepare("INSERT into user (first_name, last_name, location, email, password) VALUES (?,?,?,?,?)");
            $regnewuserstmt->bind_param("sssss", $firstname, $lastname, $location, $email, $password);

            if ($regnewuserstmt->execute()) {

                //setting http response code
                http_response_code(200);

                // *Get the user id of new registered user
                //prepared statements
                $getuseridstmt = $conn->prepare("SELECT userID FROM user WHERE email=? LIMIT 1");
                $getuseridstmt->bind_param("s", $email);

                //executing the statement
                $getuseridstmt->execute();

                //getting user id
                $result = $getuseridstmt->get_result();

                if ($row = mysqli_fetch_assoc($result)) {

                    $notes = "";
                    //current datetime
                    date_default_timezone_set('Asia/Calcutta');
                    $date = date('Y-m-d H:i:s');

                    //adding new entry in notes for new user
                    try {
                        //prepared statements
                        $newnote = $conn->prepare("INSERT into notes (userID, user_notes, updated_at) VALUES (?,?,?)");

                        $newnote->bind_param("iss", $row['userID'], $notes, $date);

                        if ($newnote->execute()) {
                            //setting http response code
                            http_response_code(200);
                            $auth = new Auth();
                            $token = $auth->generateToken($row['userID'], $firstname);
                            echo json_encode(['userID' => $row['userID'], 'userData' => $token]);
                        } else {
                            //setting http response code
                            http_response_code(500);
                            echo json_encode(["error" => $conn->error]);
                        }
                    } catch (Exception $e) {
                        http_response_code(500);
                        echo json_encode(["error" => "Some error occurred! Please try again!"]);
                    }
                }
            }
        } catch (Exception $e) {

            http_response_code(500);
            echo json_encode(["error" => "Some error occurred! Please try again!"]);
        }
    } else {
        echo json_encode(['error' => 'This account already exists!']);
    }
} else {
    echo json_encode(['error' => 'Fill in all the details!']);
}

//closing db connection
$conn->close();
