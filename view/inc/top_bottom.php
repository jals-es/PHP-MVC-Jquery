<?php 
if(isset($_GET['page'])){
	switch($_GET['page']){
		case "homepage";
			include("module/inicio/view/".$page);
			break;
		case "controller_prod";
			include("module/products/view/".$page);
			break;
		case "shop";
			include("module/shop/view/".$page);
			break;
		case "services";
			include("module/services/view/".$page);
			break;
		case "aboutus";
			include("module/aboutus/view/".$page);
			break;
		case "contactus";
			include("module/contact/view/".$page);
			break;
		default;
			include("view/inc/".$page);
			break;
	}
}else{
	include("module/inicio/view/".$page);
}


?>