// MOBILE MENU
  function openMenu() { document.getElementById('mobile-menu').classList.add('open'); }
  function closeMenu() { document.getElementById('mobile-menu').classList.remove('open'); }

  // PROGRESS BAR + SCROLL TOP
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('progress-bar').style.width = (scrolled / total * 100) + '%';
    const btn = document.getElementById('scrollTop');
    scrolled > 400 ? btn.classList.add('show') : btn.classList.remove('show');
  });

  // SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // ANIMATED COUNTER
  function animateCounter(el, target, suffix = '') {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString() + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.market-big').forEach(el => {
          const text = el.textContent;
          if (text.includes('%')) animateCounter(el, parseInt(text), '%');
          else if (text.includes('M')) animateCounter(el, parseInt(text), 'M');
          else if (text.includes('K')) animateCounter(el, parseInt(text), 'K');
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const marketSection = document.getElementById('market');
  if (marketSection) statsObserver.observe(marketSection);

  // NAV ACTIVE
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('.nav-links a').forEach(l => l.style.color = '');
      this.style.color = '#B4F230';
    });
  });

  // FAQ ACCORDION
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      
      // Opcional: Cerrar otros acordeones abiertos al abrir uno nuevo
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('active');
      });

      item.classList.toggle('active');
    });
  });

  // LEAD MAGNET FORM SUBMISSION
  const leadForm = document.getElementById('lead-form');
  const formMessage = document.getElementById('form-message');

  if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Evita que la página se recargue
      
      const emailInput = document.getElementById('lead-email');
      const emailValue = emailInput.value.trim();

      if (emailValue) {
        // Simulamos una petición exitosa al servidor
        formMessage.textContent = "¡Registro exitoso! Te hemos enviado la guía a " + emailValue + " (Revisa tu bandeja de spam).";
        formMessage.className = "form-message success";
        
        // Limpiar el campo y deshabilitar el botón
        emailInput.value = "";
        leadForm.querySelector('button').disabled = true;
        leadForm.querySelector('button').style.opacity = "0.5";
      } else {
        formMessage.textContent = "Por favor, ingresa un correo válido.";
        formMessage.className = "form-message error";
      }
    });
  }