document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Появление карточек при скролле (Fade & Slide Up)
  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Если в видимую область попали метрики — запускаем анимацию цифр
        if (entry.target.classList.contains('stat-card')) {
          animateCounter(entry.target);
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.stat-card, .exp-card, .skill-card, .project-card, .contact-box').forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });

  // 2. Анимация счетчиков для ключевых метрик
  function animateCounter(card) {
    const numEl = card.querySelector('.stat-number');
    if (!numEl || numEl.dataset.animated) return;
    numEl.dataset.animated = "true";

    const text = numEl.innerText;
    const match = text.match(/([\d\.]+)/);
    
    if (match) {
      const targetNum = parseFloat(match[1]);
      const prefix = text.split(match[1])[0];
      const suffix = text.split(match[1])[1];
      let currentNum = 0;
      const duration = 1200; // 1.2 секунды
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = targetNum / steps;

      const timer = setInterval(() => {
        currentNum += increment;
        if (currentNum >= targetNum) {
          currentNum = targetNum;
          clearInterval(timer);
        }
        numEl.innerText = `${prefix}${currentNum.toFixed(targetNum % 1 !== 0 ? 1 : 0)}${suffix}`;
      }, stepTime);
    }
  }

  // 3. Эффект Spotlight (Мягкое свечение карточек при наведении мыши)
  document.querySelectorAll('.exp-card, .skill-card, .project-card, .stat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 4. Мягкий 3D Tilt эффект для фото
  const photo = document.querySelector('.hero-photo-wrapper');
  if (photo) {
    photo.addEventListener('mousemove', (e) => {
      const rect = photo.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      photo.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    photo.addEventListener('mouseleave', () => {
      photo.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    });
  }
});
