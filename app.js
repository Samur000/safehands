document.addEventListener('DOMContentLoaded', function () {
	initScrollAnimations();
	initBurgerMenu();
	initSmoothScrolling();
	initFAQAccordion();
	initTabs();
});

function initScrollAnimations() {
	const animateElements = document.querySelectorAll(
		'.hero-text, .hero-image, .service-card, .benefit-item, .step, ' +
		'.result-card, .team-member, .faq-item, .stat-item, .testimonial-card, ' +
		'.stats-grid, .services-grid, .process-steps, .results-grid, .team-grid, ' +
		'.faq-container, .contact-container'
	);

	animateElements.forEach((el) => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(30px)';
		el.style.transition = 'all 0.6s ease';
	});

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const element = entry.target;
				element.style.opacity = '1';
				element.style.transform = 'translateY(0)';

				if (element.classList.contains('stat-item')) {
					animateStatCounter(element);
				}

				observer.unobserve(element);
			}
		});
	}, {
		threshold: 0.1,
		rootMargin: '0px 0px -100px 0px'
	});

	animateElements.forEach(el => observer.observe(el));
}
function animateStatCounter(statItem) {
	const numberElement = statItem.querySelector('.stat-number');
	const finalValue = parseInt(numberElement.textContent.replace(/[^0-9]/g, ''));
	const duration = 2000;
	const startTime = Date.now();
	const suffix = numberElement.textContent.replace(/[0-9]/g, '');

	function updateNumber() {
		const currentTime = Date.now();
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);

		const easedProgress = 1 - Math.pow(1 - progress, 3);
		const currentValue = Math.floor(easedProgress * finalValue);

		numberElement.textContent = currentValue + suffix;

		if (progress < 1) {
			requestAnimationFrame(updateNumber);
		}
	}

	numberElement.textContent = '0' + suffix;
	updateNumber();
}

function initBurgerMenu() {
	const burgerMenu = document.querySelector('.burger-menu');
	const nav = document.querySelector('nav ul');

	burgerMenu.addEventListener('click', function () {
		if (nav.classList.contains('show')) {
			nav.style.maxHeight = '0';
			nav.style.padding = '0 20px';
			setTimeout(() => {
				nav.classList.remove('show');
			}, 300);
		} else {
			nav.classList.add('show');
			requestAnimationFrame(() => {
				nav.style.maxHeight = '500px';
				nav.style.padding = '20px';
			});
		}
	});
}

function initSmoothScrolling() {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			const targetId = this.getAttribute('href');
			if (targetId === '#') return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 80,
					behavior: 'smooth'
				});

				if (window.innerWidth <= 768) {
					const nav = document.querySelector('nav ul');
					nav.classList.remove('show');
				}
			}
		});
	});
}

function initFAQAccordion() {
	const faqItems = document.querySelectorAll('.faq-item');
	faqItems.forEach(item => {
		const question = item.querySelector('.faq-question');
		question.addEventListener('click', () => {
			item.classList.toggle('active');
		});
	});
}

function initTabs() {
	const tabBtns = document.querySelectorAll('.tab-btn');
	const tabContents = document.querySelectorAll('.tab-content');

	tabBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			tabBtns.forEach(b => b.classList.remove('active'));
			tabContents.forEach(c => c.classList.remove('active'));

			btn.classList.add('active');

			const tabId = btn.getAttribute('data-tab');
			document.getElementById(`${tabId}-content`).classList.add('active');
		});
	});
}
