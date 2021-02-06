<?php 

$path = $_SERVER['DOCUMENT_ROOT'] . '/clase/appbar/';
include( $path."model/connect.php");
    
class DAOHome{

    function get_prods_random($limit){

        $conn = conn();

        $sql = "SELECT * FROM productos ORDER BY RAND() LIMIT $limit";

        $result = $conn -> query($sql);

        $return = get_array($result);

        $conn -> close();

        return $return;
    }

    function get_categories(){
        
        $conn = conn();

        $sql = "SELECT * FROM categorias LIMIT 4";

        $result = $conn -> query($sql);

        $return = get_array($result);

        $conn -> close();

        return $return;
    }
}

?>