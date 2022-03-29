
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

// ====================================================================================================


