document.addEventListener('DOMContentLoaded', () => {
  let originalNavContent = null; // Сохраняем исходную структуру меню
  let isMobileMenuInitialized = false; // Флаг инициализации мобильного меню

  // Анимация при загрузке
  const initAnimations = () => {
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('animated');
          }, delay);
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(element => observer.observe(element));

    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      document.querySelectorAll('.hero-content > *').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.2}s`;
      });
    });
  };

  // Мобильное меню
  const initMobileMenu = () => {
    if (isMobileMenuInitialized) return;
    isMobileMenuInitialized = true;
    
    const nav = document.querySelector('.main-nav');
    originalNavContent = nav.innerHTML; // Сохраняем оригинал

    // Создаем структуру для мобильной версии
    const mobileStructure = `
      <a href="index.html" class="logo">
        <img src="myaat5cnway51.webp" alt="DMC Logo">
      </a>
      <div class="dropdown">
        <a href="index.html" class="menu-item mobile-home">Главная</a>
        ${[...nav.querySelectorAll('a:not(.logo)')]
          .map(link => link.outerHTML)
          .join('')}
      </div>
    `;
    
    nav.innerHTML = mobileStructure;
    
    // Обработчик клика на логотип
    document.querySelector('.logo').addEventListener('click', (e) => {
      if (window.innerWidth > 768) return;
      e.preventDefault();
      nav.classList.toggle('active');
    });
  };

  // Восстановление десктопного меню
  const restoreDesktopMenu = () => {
    if (!originalNavContent) return;
    const nav = document.querySelector('.main-nav');
    nav.innerHTML = originalNavContent;
    isMobileMenuInitialized = false;
  };

  // Адаптация меню
  const handleResponsiveMenu = () => {
    window.innerWidth <= 768 ? initMobileMenu() : restoreDesktopMenu();
  };

  // Основная инициализация
  const init = () => {
    initAnimations();
    handleResponsiveMenu();
    
    // Обработчики кнопок
    document.querySelectorAll('.btn-order').forEach(btn => {
      btn.addEventListener('click', () => window.location.href = 'order.html');
    });

    // Скролл-анимации
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const direction = window.pageYOffset > lastScroll ? 'down' : 'up';
      lastScroll = window.pageYOffset;
      
      document.querySelectorAll('[data-animate]').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.8 && direction === 'down') {
          setTimeout(() => el.classList.add('animated'), el.dataset.delay || 0);
        }
      });
    }, { passive: true });
  };

  // Запуск
  init();
  window.addEventListener('resize', () => {
    handleResponsiveMenu();
    document.querySelector('.main-nav').classList.remove('active');
  });
});