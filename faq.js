// FAQ 페이지 — 검색 + 카테고리 필터 + 아코디언
/* =========================================================
   - 아코디언: 한 번에 하나만 열림(grid-rows 애니메이션은 CSS)
   - 카테고리: 좌측 필터 버튼 + 상단 카테고리 카드(클릭 시 목록으로 점프)
   - 검색: 질문 + 답변 텍스트에서 부분 일치, 카테고리 필터와 AND 결합
   - 많이 찾는 질문: 해당 항목으로 스크롤 + 펼치기
   ========================================================= */
(function initFaq() {
  const acc = document.getElementById('faqAccordion');
  if (!acc) return;

  const items = Array.from(acc.querySelectorAll('.faq-item'));
  const sideBtns = Array.from(document.querySelectorAll('.faq-side__btn'));
  const catCards = Array.from(document.querySelectorAll('.faq-cat-card'));
  const popCards = Array.from(document.querySelectorAll('.faq-pop-card'));
  const searchInput = document.getElementById('faqSearch');
  const countEl = document.getElementById('faqCount');
  const emptyEl = document.getElementById('faqEmpty');

  // 검색 인덱스 미리 계산(질문 + 답변 텍스트, 소문자)
  items.forEach((it) => {
    const q = it.querySelector('.faq-item__text').textContent;
    const a = it.querySelector('.faq-item__a').textContent;
    it._search = (q + ' ' + a).toLowerCase();
  });

  let filter = 'all';
  let query = '';

  function apply() {
    // 공백으로 나눠 모든 토큰이 포함된 항목만(AND) — "녹화 소리"처럼 여러 단어 검색 대응
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    items.forEach((it) => {
      const catOk = filter === 'all' || it.dataset.category === filter;
      const qOk = tokens.every((t) => it._search.includes(t));
      const show = catOk && qOk;
      it.hidden = !show;
      if (show) visible++;
    });
    if (countEl) countEl.textContent = visible;
    if (emptyEl) emptyEl.hidden = visible !== 0;
  }

  function setFilter(f) {
    filter = f;
    sideBtns.forEach((b) => {
      const active = b.dataset.filter === f;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    apply();
  }

  function closeAll() {
    items.forEach((it) => {
      it.classList.remove('is-open');
      it.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false');
    });
  }

  function open(item) {
    item.classList.add('is-open');
    item.querySelector('.faq-item__q').setAttribute('aria-expanded', 'true');
  }

  // 아코디언 토글(이벤트 위임)
  acc.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-item__q');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('is-open');
    closeAll();
    if (!isOpen) open(item);
  });

  // 좌측 카테고리 필터
  sideBtns.forEach((b) => b.addEventListener('click', () => setFilter(b.dataset.filter)));

  // 카테고리 카드 → 필터 적용 후 목록으로 스크롤
  catCards.forEach((c) => c.addEventListener('click', () => {
    setFilter(c.dataset.jump);
    const list = document.getElementById('faq-list');
    if (list) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  // 많이 찾는 질문 → 해당 항목 펼치고 스크롤
  popCards.forEach((c) => c.addEventListener('click', () => {
    query = '';
    if (searchInput) searchInput.value = '';
    setFilter('all');
    const target = document.getElementById(c.dataset.target);
    if (!target) return;
    closeAll();
    open(target);
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));

  // 검색
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      query = searchInput.value;
      apply();
    });
  }

  apply();
})();
