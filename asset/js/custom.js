$(document).ready(() => {
	// bouton retour haut de page
	window.addEventListener("scroll", function(){
		if(window.scrollY != 0){
			$("#btn-top").show();
			$("#btn-top").click(function(){
				window.scrollTo({top: 0, behavior: "smooth"});
			});
		}
		else
			$("#btn-top").hide();
	});

	// header qrcode
	let qrcode = new QRCode(jQuery("#qrcode")[0], {
		text: document.location.href,
		width: 150,
		height: 150,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.L
	});
	$("#share").click(function(){
		$("#share > div").toggleClass("show");
	});
	$("#share span").click(function(){
		copy(document.location);
	});

	// item show block
	$(".properties.foldable h3").click(function(){
		$(this).parent().toggleClass("open");
	});
})