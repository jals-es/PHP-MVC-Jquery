<?php 

$path = $_SERVER['DOCUMENT_ROOT'] . '/clase/appbar/';
include( $path."model/connect.php");
    
class DAOShop{

    function get_all_prods(){

        $conn = conn();

        $sql = "SELECT * FROM productos ORDER BY type";

        $result = $conn -> query($sql);

        $return = get_array($result);

        $conn -> close();

        return $return;
    }

    function get_prods_catego($catego){

        $conn = conn();

        $sql = "SELECT * FROM productos WHERE type='$catego'";

        $result = $conn -> query($sql);

        $return = get_array($result);

        $conn -> close();

        return $return;
    }

    function get_prod_by_id($id){

        $conn = conn();

        $sql = "SELECT * FROM productos WHERE cod_prod='$id'";

        $result = $conn -> query($sql);

        $return = $result -> fetch_assoc();

        $conn -> close();

        return $return;
    }
}

?>