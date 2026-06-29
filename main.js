// motion-engineer가 GSAP 모션 추가 예정


/* =========================================================
   히어로 오브젝트 — 팝 완료 후 floatY 이어받기
   ========================================================= */
(function initHeroPop() {
  const targets = ['.obj-chat', '.obj-pennib', '.obj-notebook', '.obj-dashes', '.obj-pencil', '.obj-eraser'];
  targets.forEach((sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.addEventListener('animationend', () => {
      el.style.opacity = '1';
      el.style.animation = '';
      // floatY는 CSS의 .hero-obj animation이 담당하므로 클래스로 재활성
      el.classList.add('hero-pop-done');
    }, { once: true });
  });
})();

/* =========================================================
   stats 섹션 — 숫자 카운트업 애니메이션
   ========================================================= */
(function initStatCounter() {
  const nums = document.querySelectorAll('.stat-card__num[data-count]');
  if (!nums.length) return;

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach((el) => observer.observe(el));
})();

/* =========================================================
   why 섹션 — 꼬불꼬불 선 스크롤 진입 시 드로우 애니메이션
   ========================================================= */

(function initSquiggle() {
  const squiggle = document.querySelector('.why-squiggle');
  if (!squiggle) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          squiggle.classList.add('is-visible');
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(squiggle);
})();

/* =========================================================
   공통 — .reveal 요소 스크롤 진입 시 페이드업
   ========================================================= */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach((el) => observer.observe(el));
})();

/* =========================================================
   시리즈 — 배지·타이틀 → 카드 1→2→3→4 순차 등장
   ========================================================= */
(function initSeriesReveal() {
  const badge  = document.querySelector('.series-badge');
  const title  = document.querySelector('.series-title');
  const cards  = document.querySelectorAll('.series-card');
  const trigger = badge || title;
  if (!trigger) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      badge && badge.classList.add('is-visible');
      setTimeout(() => title && title.classList.add('is-visible'), 200);
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('is-visible'), 400 + i * 180);
      });
    });
  }, { threshold: 0.2 });
  observer.observe(trigger);
})();

/* =========================================================
   시리즈 카드 — 클릭 시 활성 카드 전환
   ========================================================= */
(function initSeriesCards() {
  const cards = document.querySelectorAll('.series-card');
  if (!cards.length) return;
  cards.forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      cards.forEach((c) => c.classList.remove('series-card--featured'));
      card.classList.add('series-card--featured');
    });
  });
})();

/* =========================================================
   flow 스텝 — step1 → 선 → step2 → 선 → step3 → 화살표 → 텍스트
   ========================================================= */
(function initFlowSteps() {
  const steps = document.querySelectorAll('.flow-step');
  const lines = document.querySelectorAll('.flow-step-line');
  const arrows = document.querySelector('.flow-arrows');
  const outro = document.querySelector('.flow-outro');
  const trigger = document.querySelector('.flow-card');
  if (!trigger || !steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const T = 550; // step 등장 시간
      const L = 500; // 선 그리는 시간

      steps[0] && steps[0].classList.add('is-visible');                          // step1
      setTimeout(() => lines[0] && lines[0].classList.add('is-visible'), T);    // 선1
      setTimeout(() => steps[1] && steps[1].classList.add('is-visible'), T+L);  // step2
      setTimeout(() => lines[1] && lines[1].classList.add('is-visible'), T*2+L);// 선2
      setTimeout(() => steps[2] && steps[2].classList.add('is-visible'), T*2+L*2); // step3
      setTimeout(() => arrows && arrows.classList.add('is-visible'), T*3+L*2);  // 화살표
      setTimeout(() => outro  && outro.classList.add('is-visible'),  T*3+L*2+400); // 텍스트
    });
  }, { threshold: 0.2 });
  observer.observe(trigger);
})();

/* =========================================================
   flow 섹션 — 말풍선 → 언더라인 → 별 순차 등장
   ========================================================= */
(function initFlowSequence() {
  const bubbleL   = document.querySelector('.flow-bubble--l');
  const bubbleR   = document.querySelector('.flow-bubble--r');
  const underline = document.querySelector('.flow-underline');
  const star      = document.querySelector('.flow-star');
  const trigger = bubbleL && (bubbleL.closest('.flow-head') || bubbleL);
  if (!trigger) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      bubbleL   && bubbleL.classList.add('is-visible');
      setTimeout(() => bubbleR   && bubbleR.classList.add('is-visible'),   200);
      setTimeout(() => underline && underline.classList.add('is-visible'), 1500);
      setTimeout(() => star      && star.classList.add('is-visible'),      2100);
    });
  }, { threshold: 0.3 });
  observer.observe(trigger);
})();

/* =========================================================
   도구 섹션 — 도구 선택 시 우측 GIF 데모 + 캡션 전환
   ========================================================= */
(function initToolShowcase() {
  const items = Array.from(document.querySelectorAll('.tool-item'));
  const gif = document.getElementById('toolDemoGif');
  const caption = document.getElementById('toolDemoCaption');
  if (!items.length || !gif) return;

  // 도구 순서와 동일한 전체 설명(캡션용)
  const descriptions = [
    '펜과 형광펜으로 핵심 내용을 쓰고, 밑줄 치고, 강조할 수 있습니다.',
    '설명 중 중요한 위치를 짚어 주며 학생들의 집중을 자연스럽게 유도할 수 있습니다.',
    '수업에 필요한 다양한 도형을 손쉽게 그려 개념 설명을<br />더 직관적으로 전달할 수 있습니다.',
    '좌표, 함수, 변화 흐름 등을 시각적으로 표현해 개념 이해를 도와줍니다.',
    '대충 그린 선과 도형도 정돈된 형태로 보정되어 더 정확하고 보기 쉽게 정리됩니다.',
    '도형과 오브젝트를 선택한 뒤 자유롭게 늘리고 줄이고,<br />원하는 위치로 이동할 수 있습니다.',
    '부분만 지우는 수동 지우개부터, 연결된 선을 한 번에 지우는 기능까지 지원합니다.',
    '단어, 답, 핵심 내용을 가려두었다가<br />설명 흐름에 맞춰 열어보며 수업을 진행할 수 있습니다.',
    '텍스트 입력 기능으로 제목, 개념 정리, 설명 문장을<br />더 깔끔하게 배치할 수 있습니다.',
  ];

  function select(idx) {
    items.forEach((b, i) => {
      const active = i === idx;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    const btn = items[idx];
    // src 재할당으로 GIF를 처음부터 재생
    gif.style.opacity = '0';
    setTimeout(() => { gif.src = btn.dataset.gif; gif.style.opacity = '1'; }, 200);
    gif.alt = (btn.dataset.title || '도구') + ' 데모';
    if (caption && descriptions[idx]) caption.innerHTML = descriptions[idx];
  }

  let current = 0;
  let timer = null;
  const list = document.querySelector('.tools-list');

  function next() {
    current = (current + 1) % items.length;
    select(current);
    // 활성 아이템이 보이도록 스크롤
    items[current].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function startAuto() {
    timer = setInterval(next, 5000);
  }

  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  items.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      stopAuto();
      current = idx;
      select(idx);
    });
  });

  if (list) {
    list.addEventListener('mouseenter', stopAuto);
    list.addEventListener('mouseleave', startAuto);
  }

  select(0);
  startAuto();
})();
