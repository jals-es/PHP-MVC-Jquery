<?php

	function conn(){
		$host = 'localhost';
    	$user = "root";
    	$pass = "";
    	$db = "clase_appbar";
    	$port = 3306;
    	
		$conn = new mysqli($host, $user, $pass, $db, $port);
		
		if($conn->connect_error){
			die("Connection failed: " . $conn->connect_error);
		}

		return $conn;
	}

	function get_array($result){
		if($result -> num_rows > 0){
            $return = array();
            $i = 0;
            while($row = $result -> fetch_assoc()){
                $return[$i] = $row;
                $i++;
            }
        }else{
            $return = false;
		}
		
		return $return;
	}

?>