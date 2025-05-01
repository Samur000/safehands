// Main animations controller
document.addEventListener('DOMContentLoaded', function () {
	// Initialize all animations
	initScrollAnimations();
	initTestimonialsSlider();
	initBurgerMenu();
	initSmoothScrolling();
	initFAQAccordion();
});

// Function to initialize scroll animations
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
		el.style.transition = 'all 0.6s ease'; // 0.5s задержка
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
// Animate statistics counters
function animateStatCounter(statItem) {
	const numberElement = statItem.querySelector('.stat-number');
	const finalValue = parseInt(numberElement.textContent.replace(/[^0-9]/g, ''));
	const duration = 2000; // 2 second animation
	const startTime = Date.now();
	const suffix = numberElement.textContent.replace(/[0-9]/g, '');

	// Animation frame function
	function updateNumber() {
		const currentTime = Date.now();
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);

		// Ease-out function for smooth deceleration
		const easedProgress = 1 - Math.pow(1 - progress, 3);
		const currentValue = Math.floor(easedProgress * finalValue);

		// Update displayed number
		numberElement.textContent = currentValue + suffix;

		// Continue animation if not finished
		if (progress < 1) {
			requestAnimationFrame(updateNumber);
		}
	}

	// Start animation
	numberElement.textContent = '0' + suffix;
	updateNumber();
}

// Testimonials slider functionality
function initTestimonialsSlider() {
	const track = document.querySelector('.testimonials-track');
	const cards = document.querySelectorAll('.testimonial-card');
	const dots = document.querySelectorAll('.slider-dots .dot');
	const prevBtn = document.querySelector('.slider-prev');
	const nextBtn = document.querySelector('.slider-next');

	let currentIndex = 0;
	const cardCount = cards.length;

	// Update slider position and active states
	function updateSlider() {
		track.style.transform = `translateX(-${currentIndex * 100}%)`;

		cards.forEach((card, index) => {
			card.classList.toggle('active', index === currentIndex);
		});

		dots.forEach((dot, index) => {
			dot.classList.toggle('active', index === currentIndex);
		});
	}

	// Next slide
	nextBtn.addEventListener('click', () => {
		currentIndex = (currentIndex + 1) % cardCount;
		updateSlider();
	});

	// Previous slide
	prevBtn.addEventListener('click', () => {
		currentIndex = (currentIndex - 1 + cardCount) % cardCount;
		updateSlider();
	});

	// Dot navigation
	dots.forEach(dot => {
		dot.addEventListener('click', () => {
			currentIndex = parseInt(dot.getAttribute('data-index'));
			updateSlider();
		});
	});

	// Auto-advance slides (optional)
	let autoSlideInterval = setInterval(() => {
		currentIndex = (currentIndex + 1) % cardCount;
		updateSlider();
	}, 5000);

	// Pause on hover
	const slider = document.querySelector('.testimonials-slider');
	slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
	slider.addEventListener('mouseleave', () => {
		autoSlideInterval = setInterval(() => {
			currentIndex = (currentIndex + 1) % cardCount;
			updateSlider();
		}, 5000);
	});

	// Initial update
	updateSlider();
}

// Mobile menu functionality
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

// Smooth scrolling for anchor links
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

				// Close mobile menu if open
				if (window.innerWidth <= 768) {
					const nav = document.querySelector('nav ul');
					nav.classList.remove('show');
				}
			}
		});
	});
}

// FAQ accordion functionality
function initFAQAccordion() {
	const faqItems = document.querySelectorAll('.faq-item');
	faqItems.forEach(item => {
		const question = item.querySelector('.faq-question');
		question.addEventListener('click', () => {
			item.classList.toggle('active');
		});
	});
}

// Tab functionality
function initTabs() {
	const tabBtns = document.querySelectorAll('.tab-btn');
	const tabContents = document.querySelectorAll('.tab-content');

	tabBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			// Remove active class from all buttons and contents
			tabBtns.forEach(b => b.classList.remove('active'));
			tabContents.forEach(c => c.classList.remove('active'));

			// Add active class to clicked button
			btn.classList.add('active');

			// Show corresponding content
			const tabId = btn.getAttribute('data-tab');
			document.getElementById(`${tabId}-content`).classList.add('active');
		});
	});
}

// Добавить вызов функции в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
	// ... другие инициализации
	initTabs();
});