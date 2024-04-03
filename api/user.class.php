<?php
class User{
    //properties
    private $id;
    private $username;
    private $password;
    private $email;
    private $created_at;
    private $status;

    public function __construct(array $userProperties = null)
    { 
        if (!empty($userProperties)) {
            foreach ($userProperties as $key => $value) {
                if (property_exists($this, $key))
                    $this->{$key} = $value;
            }
        }
    }

    /**
     * Returns an associative array of the team member properties
     */
    public function userProperties() {
        return get_object_vars($this);
    }

    /**
     * Returns an associative array of the team member properties, without the ID and status
     */
    public function shortProperties() {
        $properties = get_object_vars($this);

        /* $properties = get_object_vars($this);
        array_shift($properties); // Remove first property ('id')
        array_pop($properties);   // Remove last property ('status')
        array_pop($properties);   // Remove last property ('created_at')
        return $properties; */

        return array_splice($properties, 1, count($properties) - 3);

    }

    public function getPassword(){
        return $this->password;
    }

    public function setPassword(string $password){
        $this->password = $password ;

        return $this;
    }

    public function getUsername(){
        return $this->username;
    }

    public function setUsername(string $username){
        $this->username = $username ;
        
        return $this;
    }

    public function getEmail(){
        return $this->email;
    }

    public function setEmail(string $email){
        $this->email = $email ;
        
        return $this;
    }
}
    ?>