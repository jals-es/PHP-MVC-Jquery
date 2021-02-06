<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/clase/appbar/';
include($path . "module/shop/model/DAOShop.php");


if(isset($_GET['op'])){
    switch($_GET['op']){
        case "catego":
            if(isset($_GET['id'])){
                try{
                    $dao = new DAOShop();
                    $rdao = $dao -> get_prods_catego($_GET['id']);
                }catch(Exception $e){
                    $callback = '?page=503';
                    die('<script>window.location.href="'.$callback .'";</script>');
                }
    
                if($rdao){
                    echo json_encode($rdao);
                }else{
                    echo "error";
                }
            }else{
                echo "error";
            }

            break;
        case "prod":
            if(isset($_GET['id'])){
                try{
                    $dao = new DAOShop();
                    $rdao = $dao -> get_prod_by_id($_GET['id']);
                }catch(Exception $e){
                    $callback = '?page=503';
                    die('<script>window.location.href="'.$callback .'";</script>');
                }
    
                if($rdao){
                    echo json_encode($rdao);
                }else{
                    echo "error";
                }
            }else{
                echo "error";
            }
            break;
        case "all_prod":
            try{
                $dao = new DAOShop();
                $rdao = $dao -> get_all_prods();
            }catch(Exception $e){
                $callback = '?page=503';
                die('<script>window.location.href="'.$callback .'";</script>');
            }

            if($rdao){
                echo json_encode($rdao);
            }else{
                echo "error";
            }
            break;
        default:
            include('view/inc/error404.php');
            break;
    }
}else{
    
    include('module/shop/view/shop.html');
}

?>