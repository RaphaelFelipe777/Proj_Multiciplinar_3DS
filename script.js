document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth Scroll para links de navegação ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                const navLinks = document.querySelector('.nav-links');
                const burgerMenu = document.getElementById('burger-menu');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burgerMenu.classList.remove('active');
                }
            }
        });
    });

    // --- Menu Hamburger para Responsividade ---
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        });
    }

    // --- Scroll Reveal (Animações ao Rolar) ---
    ScrollReveal({
        distance: '60px',
        duration: 1000,
        easing: 'cubic-bezier(.215, .61, .355, 1)',
        reset: false
    });

    ScrollReveal().reveal('.reveal-bottom', { origin: 'bottom', interval: 100 });
    ScrollReveal().reveal('.reveal-left', { origin: 'left' });
    ScrollReveal().reveal('.reveal-right', { origin: 'right' });
    ScrollReveal().reveal('.panel-title', { origin: 'top', distance: '30px', delay: 200 });
    ScrollReveal().reveal('.content-panel p, .content-panel ul, .content-panel ol, .content-panel .btn-secondary', { origin: 'bottom', distance: '30px', delay: 300, interval: 100 });
    ScrollReveal().reveal('.gallery-item', { origin: 'bottom', distance: '50px', interval: 150 }); // Para itens da galeria
    ScrollReveal().reveal('.color-item', { origin: 'bottom', distance: '40px', interval: 100 }); // Para itens de cor

    // --- Efeito Parallax ---
    const parallaxSections = document.querySelectorAll('.hero-section, .page-banner');

    function applyParallax() {
        parallaxSections.forEach(section => {
            const speed = parseFloat(section.dataset.parallaxSpeed || 0.3); // Padrão 0.3
            const background = section.dataset.parallaxImg; // Obter a URL da imagem
            if (background) {
                const yPos = -(window.scrollY - section.offsetTop) * speed;
                section.style.backgroundPositionY = `${yPos}px`;
                // Definir a imagem de fundo via JS para facilitar o controle
                section.style.backgroundImage = `url('${background}')`;
            }
        });
    }

    window.addEventListener('scroll', applyParallax);
    window.addEventListener('resize', applyParallax); // Ajustar ao redimensionar
    applyParallax(); // Chamada inicial para posicionar corretamente

    // --- Carrossel Simples (para a Home) ---
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    if (carouselTrack && carouselItems.length > 0) {
        let currentIndex = 0;

        const updateCarousel = () => {
            let itemsPerPage;
            const itemMargin = 20; // total de margin entre itens (10px de cada lado)

            if (window.innerWidth <= 768 && window.innerWidth > 480) {
                itemsPerPage = 2; // 2 itens em tablets
            } else if (window.innerWidth <= 480) {
                itemsPerPage = 1; // 1 item em smartphones
            } else {
                itemsPerPage = 3; // 3 itens em desktop
            }

            // A largura efetiva de cada item é calculada no CSS, mas para o JS precisamos do valor total
            // Isso é um pouco mais complexo se a largura % não for exata e o gap for fixo.
            // Para simplificar, vou assumir uma largura que funciona com a média.
            // O ideal seria usar getBoundingClientRect().width para o item real.
            const itemWidthWithMargin = carouselItems[0].offsetWidth + itemMargin; 

            let totalItems = carouselItems.length;

            // Garante que o currentIndex não exceda os limites válidos
            if (currentIndex > totalItems - itemsPerPage) {
                currentIndex = totalItems - itemsPerPage;
                if (currentIndex < 0) currentIndex = 0;
            }

            const offset = -currentIndex * (carouselItems[0].offsetWidth + (itemMargin / itemsPerPage)); // Ajuste aproximado para o offset

            carouselTrack.style.transform = `translateX(${offset}px)`;

            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= totalItems - itemsPerPage;
        };

        nextButton.addEventListener('click', () => {
            if (currentIndex < carouselItems.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Volta para o início
            }
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = carouselItems.length - 1; // Volta para o final
            }
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    }

    // --- Validação de Formulário de Contato (exemplo básico para contato.html) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('assunto'); // Adicionado
            const messageInput = document.getElementById('mensagem');

            nameInput.classList.remove('error-input');
            emailInput.classList.remove('error-input');
            subjectInput.classList.remove('error-input'); // Adicionado
            messageInput.classList.remove('error-input');
            formMessage.textContent = '';
            formMessage.classList.remove('success', 'error');

            let isValid = true;

            if (nameInput.value.trim() === '') {
                nameInput.classList.add('error-input');
                isValid = false;
            }

            if (emailInput.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                emailInput.classList.add('error-input');
                isValid = false;
            }
            
            if (subjectInput.value.trim() === '') { // Adicionado
                subjectInput.classList.add('error-input');
                isValid = false;
            }

            if (messageInput.value.trim() === '') {
                messageInput.classList.add('error-input');
                isValid = false;
            }

            if (isValid) {
                formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
                formMessage.classList.add('success');
                contactForm.reset();
                console.log('Formulário enviado:', {
                    nome: nameInput.value,
                    email: emailInput.value,
                    assunto: subjectInput.value, // Adicionado
                    mensagem: messageInput.value
                });
            } else {
                formMessage.textContent = 'Por favor, preencha todos os campos corretamente.';
                formMessage.classList.add('error');
            }
        });
    }
});