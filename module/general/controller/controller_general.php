<?php 
$path = $_SERVER['DOCUMENT_ROOT'] . '/clase/appbar/';
include($path . "module/general/model/DAOGeneral.php");


if(isset($_GET['op'])){
    switch($_GET['op']){
        case "locales":
            try{
                $dao = new DAOGeneral();
                $rdao = $dao -> get_locales();
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
    include('module/inicio/view/inicio.html');
}
?>