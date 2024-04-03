<?php 

class DbManager {
    private $db;

	function __construct(){

		$server = 'localhost';
        $dbname = 'react';
        $user = 'root';
        $pass = '';

		try {
			$this->db = new PDO("mysql:host=$server;dbname=$dbname", $user, $pass);
			$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		} catch (Exception $e) {
			throw new Exception("Database connection error: " . $e->getMessage());
		}
	}

    /***
     * Add  a new user to db 
    */
    public function addUser($user){
		$query = $this->db->prepare("INSERT INTO quiz_app_users (username, password, email) VALUES (:username, :password, :email)");
        /* return $query->execute($user->shortProperties()); */

        $status = $query->execute($user->shortProperties());
	}

    /***
    * Get All Users
    */
    public function getAllUsers() {
		$query = $this->db->query( "SELECT * FROM quiz_app_users" );
		return $query->fetchAll( PDO::FETCH_CLASS, "User" );
	}

    /***
    *Get a user by username and password
    */
    public function getUserByUsername($loggingUser){
            //prepare the sql statement
            $query = $this->db->prepare("SELECT id, username, password, email, created_at FROM quiz_app_users WHERE username = :username");

            //execute sql statement with param of associative array
            $query->execute(array('username'=>$loggingUser['username']));

            //save queried data to a var
            $user_data = $query->fetch(PDO::FETCH_ASSOC);

            //check if queried return something if not it returns false/null
            if ($user_data) {
                $fetchedUser = new User ($user_data);

                //check if user password input match the password that was fetched from the database
                if(password_verify($loggingUser['password'],$fetchedUser->getPassword())){
                    echo json_encode(array('status' => 'success', 'message' => 'User Found','user' => $user_data));
                }else{
                    $message = array('username_message' => '','password_message'=>'The password you entered is incorrect');
                    echo json_encode(array('status' => 'errror', 'message' => $message));
                }
            } else {
                $message = array('username_message' => 'User not found','password_message'=>'');
                echo json_encode(array('status' => 'error', 'message' => $message));
            }
            
        }

        public function checkUserifExistbyUsernameAndEmail(array $user){
            // Prepared query for username
            $queryUsername = $this->db->prepare("SELECT COUNT(*) as userCount FROM quiz_app_users WHERE username = :username");
            $queryUsername->execute(array('username' => $user['username']));
            $rowUsername = $queryUsername->fetch(PDO::FETCH_ASSOC);

            // Prepared query for email
            $queryEmail = $this->db->prepare("SELECT COUNT(*) as userCount FROM quiz_app_users WHERE email = :email");
            $queryEmail->execute(array('email' => $user['email']));
            $rowEmail = $queryEmail->fetch(PDO::FETCH_ASSOC);

            // Initialize response
            $message = ['username_err_msg'=>'','email_err_msg'=>'','successful_msg'=>'You have successfully created your account!'];
            $response = ['status' => 1, 'message' => $message , 'username_duplicate' => false, 'email_duplicate' => false];


            // Check for duplicates
            if($rowUsername['userCount'] > 0) {
                $response['status'] = 0;
                $response['message']['username_err_msg'] = 'Username is already used';
                $response['username_duplicate'] = true;
            }

            if($rowEmail['userCount'] > 0) {
                $response['status'] = 0;
                $response['message']['email_err_msg'] = 'Email is already used';
                $response['email_duplicate'] = true;
            }

            echo json_encode($response);
            return $response['status'] === 0; // true if there was an error, false if successful

        }   

    }
    

?>