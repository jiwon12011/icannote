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
