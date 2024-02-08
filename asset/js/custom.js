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

	// item show block
	$(".properties.foldable h3").click(function(){
		$(this).parent().toggleClass("open");
	});

	// recherche avancée (select vers Solr)
	if($("#recherche-avancee").length){
		$(".inputs select[name*=':']").each(function(){
			let name = $(this).attr("name");
			let nameFacet = name.replace(":", "_") + "_ss";
			$(`select[name='${name}']`).attr("name", nameFacet);
		});
	}

	// carousel
	if($(".carousel").length){
		$(".carousel").each(function(){
			let carousel = this;
			let carouselInner = this.querySelector(".carousel-inner");
			let prev = this.querySelector('.carousel-controls .prev');
			let next = this.querySelector('.carousel-controls .next');
			let slides =  this.querySelectorAll('.carousel-inner .carousel-item');
			let totalSlides = slides.length;
			let step = 100 / totalSlides;
			let activeSlide = 0;
			let activeIndicator = 0;
			let direction = -1;
			let jump = 1;
			let interval = 5000;
			let time;

			//Init carousel
			carouselInner.style.minWidth = (totalSlides * 100) + '%';
			loadIndicators(this, slides);
			loop(true, carousel, carouselInner, direction, step, interval);

			//Carousel events
			next.addEventListener('click',()=>{ slideToNext(carousel, carouselInner, direction, step); });
			prev.addEventListener('click',()=>{ slideToPrev(carousel, carouselInner, direction, step); });

			carouselInner.addEventListener('transitionend',()=>{
				if(direction === -1){
					if(jump > 1){
						for(let i = 0; i < jump; i++){
							activeSlide++;
							carouselInner.append(carouselInner.firstElementChild);
						}
					}else{
						activeSlide++;
						carouselInner.append(carouselInner.firstElementChild);
					}
				}else if(direction === 1){
					if(jump > 1){
						for(let i = 0; i < jump; i++){
							activeSlide--;
							carouselInner.prepend(carouselInner.lastElementChild);
						}
					}else{
						activeSlide--;
						carouselInner.prepend(carouselInner.lastElementChild);
					}
				};

				carouselInner.style.transition = 'none';
				carouselInner.style.transform = 'translateX(0%)';
				setTimeout(()=>{
					jump = 1;
					carouselInner.style.transition = 'all ease 1.5s';
				});
				updateIndicators(this, activeSlide, totalSlides);
			});

			this.querySelectorAll('.carousel-indicators span').forEach(item=>{
				item.addEventListener('click',(e)=>{
					let slideTo = parseInt(e.target.dataset.slideTo);
					let indicators = this.querySelectorAll('.carousel-indicators span');

					indicators.forEach((item,index)=>{
						if(item.classList.contains('active')){
							activeIndicator = index
						}
					})

					if(slideTo - activeIndicator > 1){
						jump = slideTo - activeIndicator;
						step = jump * step;
						slideToNext(carousel, carouselInner, direction, step);
					}else if(slideTo - activeIndicator === 1){
						slideToNext(carousel, carouselInner, direction, step);
					}else if(slideTo - activeIndicator < 0){
						if(Math.abs(slideTo - activeIndicator) > 1){
							jump = Math.abs(slideTo - activeIndicator);
							step = jump * step;
							slideToPrev(carousel, carouselInner, direction, step);
						}
						slideToPrev(carousel, carouselInner, direction, step);
					}
					step = 100 / totalSlides;
				})
			});

			carousel.addEventListener('mouseover',()=>{ loop(false, carousel, carouselInner, direction, step, interval); })
			carousel.addEventListener('mouseout',()=>{ loop(true, carousel, carouselInner, direction, step, interval); })
		});
	}

	//Carousel functions
	function loadIndicators(that, slides){
		slides.forEach((slide,index)=>{
			if(index === 0){
				that.querySelector('.carousel-indicators').innerHTML +=
				`<span data-slide-to="${index}" class="active"></span>`;
			}else{
				that.querySelector('.carousel-indicators').innerHTML +=
				`<span data-slide-to="${index}"></span>`;
			}
		});
	};

	function updateIndicators(that, activeSlide, totalSlides){
		if(activeSlide > (totalSlides - 1)){
			activeSlide = 0;
		}else if(activeSlide < 0){
			activeSlide = (totalSlides - 1);
		}
		that.querySelector('.carousel-indicators span.active').classList.remove('active');
		that.querySelectorAll('.carousel-indicators span')[activeSlide].classList.add('active');
	};

	function slideToNext(carousel, carouselInner, direction, step){
		if(direction === 1){
			direction = -1;
			carouselInner.prepend(carouselInner.lastElementChild);
		};

		carousel.style.justifyContent = 'flex-start';
		carouselInner.style.transform = `translateX(-${step}%)`;
	};

	function slideToPrev(carousel, carouselInner, direction, step){
		if(direction === -1){
			direction = 1;
			carouselInner.append(carouselInner.firstElementChild);
		};
		carousel.style.justifyContent = 'flex-end'
		carouselInner.style.transform = `translateX(${step}%)`;
	};

	function loop(status, carousel, carouselInner, direction, step, interval){
		if(status === true){
			time = setInterval(()=>{
				slideToNext(carousel, carouselInner, direction, step);
			},interval);
		}else{
			clearInterval(time);
		}
	}
})

const copyUrl = async () => {
	try{
		await navigator.clipboard.writeText(document.location);
	}catch (err){
		console.error('Failed to copy: ', err);
	}
}