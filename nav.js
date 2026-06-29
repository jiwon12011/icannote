// 네비게이션 — 스크롤 시 헤더 축소(.scrolled) + 모바일 햄버거 토글 (전 페이지 공통)
(function initNav() {
  // 스크롤하면 .site-header 가 상단 고정 바로 전환 (CSS의 .scrolled 상태를 구동)
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  function close() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
  }
  function open() {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', '메뉴 닫기');
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.contains('is-open') ? close() : open();
  });

  // 바깥 클릭 / ESC / 링크 클릭 시 닫기
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !nav.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
  nav.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', close));

  // 데스크탑 폭으로 넘어가면 열림 상태 초기화
  const mq = window.matchMedia('(min-width: 810px)');
  (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(() => close());
})();
