//SLIDERS
if($('.slider__body ').length>0){
	$('.slider__body ').slick({
		//autoplay: true,
		//infinite: false,
		dots: false,
		arrows: true,
		accessibility:false,
		slidesToShow:1,
		autoplaySpeed: 3000,
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {}
		}]
	});
}

// Cчетчик слайдов
var slider = $('.slider__body');
	$('.slider__count-totall').text( slider.slick("getSlick").slideCount);
	$(".slider__body").on('afterChange', function(event, slick, currentSlide){
	     $(".slider__count-current").text(currentSlide + 1);
	});

// ====================================================================================================


