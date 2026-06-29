// 사용 예시 페이지 — 활용 영상 카테고리 필터
/* =========================================================
   필터 버튼(토글 그룹) 클릭 시 data-category로 카드 show/hide.
   - role=tab이 아니라 일반 버튼 + aria-pressed로 누름 상태 표현
   - "전체(all)"는 모두 표시, 그 외엔 일치 카드만
   - 카드 숨김은 hidden 속성으로 → 접근성 트리에서도 제외
   ========================================================= */
(function initVideoFilter() {
  const buttons = Array.from(document.querySelectorAll('.uc-filter__btn'));
  const cards = Array.from(document.querySelectorAll('.uc-video-card'));
  const empty = document.getElementById('ucVideoEmpty');
  if (!buttons.length || !cards.length) return;

  function applyFilter(filter) {
    let visible = 0;
    cards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.hidden = !match;
      if (match) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      applyFilter(btn.dataset.filter);
    });
  });
})();

/* =========================================================
   유튜브 영상 카드 — data-yt="영상ID"
   - 썸네일은 영상 ID로 자동 로드(maxres → 없으면 hq 폴백)
   - 클릭하면 그 자리에서 인라인 재생(JS 없으면 href로 유튜브 이동)
   ========================================================= */
(function initYouTubeCards() {
  const cards = Array.from(document.querySelectorAll('[data-yt]'));
  if (!cards.length) return;

  cards.forEach((card) => {
    const id = card.dataset.yt;
    const img = card.querySelector('img');

    // maxresdefault가 없는 영상이면 회색 플레이스홀더(120x90)가 옴 → hqdefault로 교체
    if (img) {
      img.addEventListener('error', function onErr() {
        img.removeEventListener('error', onErr);
        img.src = 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
      });
      img.addEventListener('load', function onLoad() {
        if (img.naturalWidth <= 120) {
          img.removeEventListener('load', onLoad);
          img.src = 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
        }
      });
    }

    card.addEventListener('click', (e) => {
      e.preventDefault();
      const player = document.createElement('div');
      player.className = card.className + ' is-playing';
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = card.getAttribute('aria-label') || 'YouTube 영상';
      iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      player.appendChild(iframe);
      card.replaceWith(player);
    });
  });
})();
