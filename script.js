const root = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const backToTop = document.getElementById('backToTop');
const progressBar = document.querySelector('.scroll-progress');

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('cv-theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  body.classList.add('dark');
}

function updateThemeIcon() {
  const isDark = body.classList.contains('dark');
  themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  themeToggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('cv-theme', isDark ? 'dark' : 'light');
  updateThemeIcon();
});

menuToggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  backToTop.classList.toggle('show', scrollTop > 600);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const skillBars = document.querySelectorAll('.progress-bar span');
skillBars.forEach((bar, index) => {
  setTimeout(() => {
    bar.style.width = bar.dataset.width;
  }, 220 * (index + 1));
});
