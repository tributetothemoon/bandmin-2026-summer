document.getElementById('copy-account-btn').addEventListener('click', async () => {
  const text = '카카오뱅크 3333-34-6118377 김기문';

  try {
    await navigator.clipboard.writeText(text);

    const message = document.getElementById('copy-message');
    message.style.opacity = '1';

    setTimeout(() => {
      message.style.opacity = '0';
    }, 2000);

  } catch (err) {
    alert(text);
  }
});

// 햄버거 메뉴
const hamburger = document.getElementById('nav-hamburger');
const drawer = document.getElementById('nav-drawer');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
});

// 드로어 링크 클릭시 닫기
drawer?.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
  });
});

document.getElementById('nav-logo')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Band links 조건부 렌더링 ──
document.querySelectorAll('.band-card').forEach(card => {
  const ig = card.dataset.instagram;
  const yt = card.dataset.youtube;
  const container = card.querySelector('.band-links');
  if (ig) container.insertAdjacentHTML('beforeend',
    `<a href="${ig}" target="_blank" rel="noopener" class="band-link" aria-label="Instagram"><img src="static/instagram.png" alt="Instagram"></a>`);
  if (yt) container.insertAdjacentHTML('beforeend',
    `<a href="${yt}" target="_blank" rel="noopener" class="band-link" aria-label="YouTube"><img src="static/youtube.png" alt="YouTube"></a>`);
  if (!ig && !yt) container.remove();
});

// ── Countdown ── 26.07.25 18:00 KST
const concertDate = new Date('2026-07-25T18:00:00+09:00');
function updateCountdown() {
  const diff = concertDate - new Date();
  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<span class="countdown-live">🎸 공연 중!</span>';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-d').textContent = String(d).padStart(2,'0');
  document.getElementById('cd-h').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-m').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-s').textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── Scroll Reveal ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Set list (타임테이블 아코디언) ──
document.querySelectorAll('.tt-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.tt-group');
    const open = group.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
});

// ── FAQ ──
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// 응원하기 버튼: hero에선 숨기고, 아래로 내려가면 표시
(function () {
  const fab = document.querySelector('.floating-support');
  const hero = document.getElementById('hero');
  if (fab && hero) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      fab.classList.toggle('show', entry.intersectionRatio < 0.5);
    }, { threshold: [0, 0.5, 1] });
    heroObserver.observe(hero);
  }
})();
