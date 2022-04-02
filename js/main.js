



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

		// curentPopup.addEventListener('click', function(e) {
		// 	if (!e.target.closest('.popup-content')) {
		// 		popupClose (e.target.closest('.popup'));
		// 	}
		// });
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
	const activeMenu = document.querySelector(".icon-menu");
	setTimeout (function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		if (!activeMenu.classList.contains('.active')) {
			body.classList.remove('lock');
		}
		
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

// ====================================================================================================

// *Обработка формы (валидация\маска\placeholder\) 

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	const popupContent = document.querySelector('.popup__content');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();
		let error = formValidate(form);
		let formData = new FormData(form);
		
		if (error === 0) {
			popupContent.classList.add('_sending');

			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
				popupContent.classList.remove('_sending');
			} else {
				alert('Ошибка! Форма не отправлена!');
				popupContent.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязаьельные поля');
		}
		
	}

	// Функция валидации формы
	
	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req')

		for (let index = 0; index < formReq.length; index++ ) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	// Добавляет класс error
	function formAddError (input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	// Удаляет класс error
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	// Функция проверки email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

})


// Маска ввода для телефона на JQ плагине inputmask

$(document).ready(function() {
	$("#formTel").mask("+7 (999) 999-99-99");
});


	
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


