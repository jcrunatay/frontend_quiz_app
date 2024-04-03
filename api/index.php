<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

spl_autoload_register(function ($class_name) {
    include  $class_name . ".class.php";
});

// Create a new DbConnect instance
$db = new DbManager();



$method = $_SERVER['REQUEST_METHOD'];

/* switch ($method) {
    case 'POST':

        $user = json_decode(file_get_contents('php://input'));


        $sql = "INSERT INTO quiz_app_users (id,username, password, email, status) VALUES (null, :username, :password, :email, :status)";
        $stmt = $conn->prepare($sql);
        $status = 1;
        $stmt->bindParam(':username',$user->username);
        $stmt->bindParam(':password',$user->password);
        $stmt->bindParam(':email',$user->email);
        $stmt->bindParam(':status',$status);
        if($stmt->execute()){
            $response =  ['status' => 1,'message' => 'Reacord created successfully'];
        }else{
            $response =  ['status' => 0,'message' => 'Failed to create record'];
        }
    break;
}  */


switch ($method) {
    case "GET": 
        /* $sql = "SELECT * FROM quiz_app_users";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users); */
        
    break;
    case 'POST':

        try { 
            /* // Prepare the SQL statement
            $stmt = $conn->prepare("INSERT INTO quiz_app_users (username, password, email) VALUES (:username, :password, :email)"); */

            /* // Bind parameters
            $stmt->bindParam(':username', $user->username);
            $stmt->bindParam(':password', $user->password);
            $stmt->bindParam(':email', $user->email); */
        
        
            /* // Execute the statement
            if($stmt->execute()){
                $response =  ['status' => 1,'message' => 'Reacord created successfully'];
            }else{
                $response =  ['status' => 0,'message' => 'Failed to create record'];
            }
        
            echo json_encode($response); */
            
            //get the data from the submitted Form
            $data = json_decode(file_get_contents('php://input'),true);

            //get the action determine the action accdg to the property action from client side
            $action = $data['action'] ?? null;

            switch ($action) {
                case 'getUserByUsername':

                    //Get user by username -- return an Instance of a User Class 
                    $db->getUserByUsername($data);
                    


                break;
                case 'addUser':

                    //Make an instance of A User Class to use method shortProperties
                    $user = new User($data);

                    //before adding .check if the new username already exist in database
                    if (!$db->checkUserifExistbyUsernameAndEmail($data)) {
                        
                        // must hash the password for security purposes ..
                        $user->setPassword(password_hash($user->getPassword(),PASSWORD_DEFAULT));

                        //user dbmanager to add the new user
                        $db->addUser($user);
                    }
                

                break;
                
            }
            
        }catch (PDOException $e) {
        
            echo json_encode(['error' => $e->getMessage()]);
        };
    
        // Close the connection
        $conn = null;

    break;
}


/* $userData = [
    'id' => 1,
    'name' => 'John Doe',
    'email' => 'john.doe@example.com',
    'username' => 'johndoe',
    'password' => 'password123',
    'level' => 1,
    'status' => 'active'
];

$user = new User($userData); */

/* 
if($conn){
    try { 
        
        // Prepare the SQL statement
        $stmt = $conn->prepare("INSERT INTO quiz_app_users (username, password, email,status) VALUES (:username, :password, :email, :status)");
        
        //get the data from the submitted Form
        $user = json_decode(file_get_contents('php://input'));
    
        var_dump($user);

        if ($user !== null) {
            var_dump($user);
        
            // Your existing code for inserting data into the database
            // ...
        } else {
            echo json_encode(['error' => 'Invalid JSON data']);
        }

        $status = 1;
    

        // Bind parameters
        $stmt->bindParam(':username', $user->username);
        $stmt->bindParam(':password', $user->password);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':status', $status);
    
    
        // Execute the statement
        $stmt->execute();
    
        echo json_encode(['success' => true]);
    }catch (PDOException $e) {
    
        echo json_encode(['error' => $e->getMessage()]);
    };

    // Close the connection
    $conn = null;
}else {
    echo json_encode(['error' => 'Database connection failed']);
} */




?>