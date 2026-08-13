const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileNav?.classList.toggle('is-open', !open);
});

mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('is-open');
}));

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('has-motion');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

const newsletterForm = document.querySelector('#newsletter-form');
newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(newsletterForm);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const status = document.querySelector('#newsletter-status');
  const subject = encodeURIComponent('Inscrição — Novidades da Frente Negra Brasileira');
  const body = encodeURIComponent(`Olá, meu nome é ${name}. Desejo receber as novidades da Frente Negra Brasileira neste e-mail: ${email}.`);
  if (status) status.textContent = 'Seu aplicativo de e-mail será aberto para confirmar a inscrição.';
  window.location.href = `mailto:contato@frentenegra.org.br?subject=${subject}&body=${body}`;
});
