// motion-engineer가 GSAP 모션 추가 예정

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
    '수업에 필요한 다양한 도형을 손쉽게 그려 개념 설명을 더 직관적으로 전달할 수 있습니다.',
    '좌표, 함수, 변화 흐름 등을 시각적으로 표현해 개념 이해를 도와줍니다.',
    '대충 그린 선과 도형도 정돈된 형태로 보정되어 더 정확하고 보기 쉽게 정리됩니다.',
    '도형과 오브젝트를 선택한 뒤 자유롭게 늘리고 줄이고, 원하는 위치로 이동할 수 있습니다.',
    '부분만 지우는 수동 지우개부터, 연결된 선을 한 번에 지우는 기능까지 지원합니다.',
    '단어, 답, 핵심 내용을 가려두었다가 설명 흐름에 맞춰 열어보며 수업을 진행할 수 있습니다.',
    '텍스트 입력 기능으로 제목, 개념 정리, 설명 문장을 더 깔끔하게 배치할 수 있습니다.',
  ];

  function select(idx) {
    items.forEach((b, i) => {
      const active = i === idx;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    const btn = items[idx];
    // src 재할당으로 GIF를 처음부터 재생
    gif.src = btn.dataset.gif;
    gif.alt = (btn.dataset.title || '도구') + ' 데모';
    if (caption && descriptions[idx]) caption.textContent = descriptions[idx];
  }

  items.forEach((btn, idx) => {
    btn.addEventListener('click', () => select(idx));
  });
})();
