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



switch ($method) {
    case 'POST':

        try { 
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

?>