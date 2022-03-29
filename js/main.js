
$(document).ready(function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie; 
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}
// *Адаптивное меню бургер

let iconMenu = document.querySelector(".icon-menu");
let menuBodyLock = document.querySelector("body");
let menuBody = document.querySelector(".menu__body");
if (iconMenu) {
	iconMenu.addEventListener("click", function () {
		iconMenu.classList.toggle("active");
		menuBodyLock.classList.toggle("lock");
		menuBody.classList.toggle("active");
	});
}

// ====================================================================================================

// *Popup

// Все ссылки открытия popup
const popupLinks = document.querySelectorAll('.popup-link');
// Блокировка скрола общего контента
const body = document.querySelector('body');
// Исправление смещения контента при блокировке скрола
const lockPadding = document.querySelectorAll('.lock-padding');
// Защита от двойных нажатий
let unlock = true;
// Блокировка скрола. Указать продолжительность transition
const timeout = 800;

// Повесить обработчк на все popup ссылки 
if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		})
	}
}

// Повесить обработчик на все закрывающие popup ссылки
const popupCloseIcon = document.querySelectorAll('.popup__close');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const cl = popupCloseIcon[index];
		cl.addEventListener('click', function(e) {
			popupClose(cl.closest('.popup'));
			e.preventDefault();
		})
	}
}

// Функция открытия popup
function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function(e) {
			if (!e.target.closest('.popup-content')) {
				popupClose (e.target.closest('.popup'));
			}
		});
	}
}

// Функция закрытия popup
// doUnlock = true - если в popup есть еще один popup
function popupClose (popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

// Закрытие popup по Escape
document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
})


// Функция блокирования скрола общего контента \ исправление сдвига контента при блокировке
function bodyLock () {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	// Блокирует случайное двойное нажатие открытия popup
	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

// Функция разблокирования скрола 
function bodyUnlock () {
	setTimeout (function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}





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

var slider = $('.slider__body');
	$('.slider__count-totall').text( slider.slick("getSlick").slideCount);
	$(".slider__body").on('afterChange', function(event, slick, currentSlide){
	     $(".slider__count-current").text(currentSlide + 1);
	});

/*


// SLIDER ON MOBILE
if($('.reviews-object__items').length>0){
		let slider=$('.reviews-object__items');
	function reviews_object(){
		slider.slick({
			dots: true,
			arrows: false,
			accessibility:false,
			slidesToShow:1,
			autoplaySpeed: 3000,
			//asNavFor:'',
			//appendDots:
			//appendArrows:$('.mainslider-arrows .container'),
			nextArrow:'<button type="button" class="slick-next ic-arrow"></button>',
			prevArrow:'<button type="button" class="slick-prev ic-arrow"></button>',
			responsive: [{
				breakpoint: 9999,
				settings:'unslick'
			},{
				breakpoint: 768,
				settings: {
					
				}
			}]
		});
	}
		reviews_object();
	$(window).resize(function(event) {
			var w=$(this).outerWidth();
		if(w<768 && !slider.hasClass('slick-initialized')){
			reviews_object();
		}
	});
}


//SLICK FIX
function slick_fix(slider){
	//SET OPTIONS
	//$('.progress__slider').slick('slickSetOption',{autoplay:false},true);
		var sltoshow=slider.get(0).slick.options.slidesToShow;
		var all=slider.find('.slick-slide').length;
		var allactive=slider.find('.slick-slide').not('.slick-cloned').length;
	slider.on('beforeChange', function(event,slick,currentSlide,nextSlide){
		if(nextSlide==0){
				var ind=all-allactive;
			if(sltoshow==1){
				slider.find('.slick-slide').eq(ind).addClass('active');
			}else{
				sliderfix(slider,ind);
			}
		}
		if(nextSlide==allactive-1){
			if(sltoshow==1){
				slider.find('.slick-slide').eq(0).addClass('active');
			}else{
				sliderfix(slider,sltoshow-1);
			}
		}
		//DIRECTION
		if (currentSlide === 0 && nextSlide === slick.$slides.length - 1) {
			direction = 'prev';
		}else if(nextSlide > currentSlide || (currentSlide === (slick.$slides.length - 1) && nextSlide === 0 )) {
			direction = 'next';
		}else{
			direction = 'prev';
		}
		//console.log(direction);
	});
	slider.on('afterChange', function(event, slick, currentSlide){
		slider.find('.slick-slide').removeClass('active');
	});
	function sliderfix(slider,v){
		for (var i=0; i < sltoshow; i++) {
				var n=v+i;
			slider.find('.slick-slide').eq(n).addClass('active');
		}
	}
}
*/
/*
if($('.newsmodule-slider').length>0){
	//Опция
	$('.newsmodule-slider').get(0).slick.options.slidesToShow

	$('.newsmodule-items-item').click(function(event) {
		$('.newsmodule-items-item').removeClass('active');
		$(this).addClass('active');
		$('.newsmodule-slider').slick('goTo',$(this).index());
	});
	$('.newsmodule-navigator-info span').eq(1).html($('.newsmodule-items-item').length);
	
	$('.newsmodule-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.newsmodule-navigator-info span').eq(0).html(nextSlide+1);
	});
	$('.newsmodule-slider').on('afterChange', function(event, slick, currentSlide){
		$('.newsmodule-navigator-info span').eq(0).html(currentSlide+1);
	});
	$('.newsmodule-navigator__arrow.fa-angle-left').click(function(event) {
		$('.newsmodule-slider').slick('slickPrev');
	});
	$('.newsmodule-navigator__arrow.fa-angle-right').click(function(event) {
		$('.newsmodule-slider').slick('slickNext');
	});
}
*/
});