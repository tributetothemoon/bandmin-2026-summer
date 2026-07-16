# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code(claude.ai/code)에게 제공되는 안내 문서입니다.

## 언어 선호

한국어 선호

## 이 프로젝트는 무엇인가

**밴드의민족 2026년 여름 정기공연**(밴드 쇼케이스 공연)을 위한 싱글 페이지 정적 사이트로, GitHub Pages(`https://tributetothemoon.github.io/bandmin-2026-summer/`)를 통해 호스팅됩니다. 별도의 빌드 시스템, 패키지 매니저, 테스트 스위트가 없습니다 — 순수 HTML/CSS/JS로만 구성되어 있습니다.

## 로컬에서 작업하기

디렉토리를 서빙하고 브라우저로 열면 됩니다 — 빌드할 것이 없습니다:

```bash
python3 -m http.server 8777
# http://localhost:8777/ 열기
```

스크롤 리빌(`.reveal` 섹션)과 카운트다운/타임테이블은 브라우저에서 JS로만 동작하므로, HTML만 읽어서 판단하지 말고 실제로 페이지를 렌더링해서 확인하세요(빠른 확인에는 헤드리스 크롬 스크린샷이 유용합니다).

## 구조

- `index.html` — 페이지 전체: 마크업과 모든 카피. 인라인 `style=""`/`<script>`는 쓰지 않습니다 — 스타일은 `static/style.css`, 동작은 `static/script.js`로 전부 분리되어 있습니다. 예외적으로 Google Analytics(gtag) 부트스트랩 스니펫만 `<head>`에 그대로 인라인으로 남아있습니다(서드파티 표준 삽입 방식).
- `static/style.css` — 모든 스타일. `index.html`에서 캐시 무효화용 쿼리 스트링(`static/style.css?v=N`)과 함께 참조됩니다 — CSS를 수정해 푸시할 때는 GitHub Pages가 오래된 캐시를 서빙하지 않도록 `N`을 올려주세요.
- `static/script.js` — 모든 JS(카운트다운, 스크롤 리빌, 타임테이블/FAQ 아코디언, 밴드 링크 주입, 햄버거 메뉴, 계좌번호 복사, 응원하기 플로팅 버튼). `index.html`에서 `static/script.js?v=N`으로 참조되며, CSS와 마찬가지로 수정 시 `N`을 올려주세요. `toggleFaq`처럼 HTML의 `onclick=""`에서 직접 호출하는 함수는 전역 `function` 선언으로 유지해야 합니다.
- `static/` — 모든 이미지(포스터, 밴드 사진, 소셜 아이콘). 새 이미지 에셋은 여기에 넣고 `static/<file>`로 참조합니다.

## 페이지 구조 (`index.html`)

섹션은 다음 순서로 각각 `<section id="...">`로 존재합니다: `hero` → `intro` → `bands` → `timetable` → `venue` → `faq` → `ticket`(무료입장 CTA) → `support`(후원) → `footer`. 내비게이션과 모바일 드로어는 이 id들(`#bands`, `#timetable` 등)에 직접 링크하므로, 섹션 id를 바꾸면 내비 링크도 함께 맞춰야 합니다. 별도의 "미리듣기" 섹션은 없습니다 — 각 밴드 셋리스트 곡이 이미 유튜브 링크를 갖고 있어서, 관련 네비 링크는 모두 `#timetable`로 연결됩니다.

**밴드 목록(`#bands`)과 타임테이블(`#timetable`)은 병렬 리스트**입니다 — 동일한 라인업이 두 곳에 반복되며 순서가 반드시 일치해야 합니다:
- 밴드별 `.band-card`: `.band-img`(사진 `<img>` 또는 플레이스홀더 그라데이션을 위한 빈 값), `.band-name`, 선택적 `.band-desc`(멤버 명단, 예: `이름(V) · 이름(G)`), 카드 자체에 있는 `data-instagram` / `data-youtube` 속성.
- 밴드별 `.tt-group`: `.tt-time` / `.tt-act`가 있는 토글 버튼과, `.setlist-songs`(`.song-no`, `.song-title`, `.song-artist`)로 구성된 `.setlist` 패널. 참고용 유튜브 영상이 있으면 곡 제목은 `<a>` 태그로 링크되고, 없으면 일반 `<span>`입니다.

밴드 소셜 링크는 마크업에 하드코딩되어 있지 **않습니다** — `static/script.js`가 각 `.band-card`의 `data-instagram`/`data-youtube`를 읽어 `.band-links`에 아이콘 링크를 주입합니다(둘 다 비어 있으면 컨테이너 자체를 제거). 아이콘 `<a>`를 직접 작성하지 말고 이 두 속성만 설정하세요.

아직 확정되지 않은 밴드/셋리스트 슬롯은 생략하지 않고 `TBA`, `TBD`, `셋리스트 준비중` 같은 리터럴 플레이스홀더 텍스트를 사용해서, 그리드/타임테이블의 항목 수가 일정하게 유지되도록 합니다.

## 히어로

`<section id="hero">`는 `.hero-bg-img`(배경 포스터) 위에 `.hero-tag`/`.hero-overlay`/`.hero-content`(텍스트 블록)를 겹친 구조입니다. **배경 포스터는 데스크톱과 모바일에서 서로 다른 이미지**를 `<picture>`+`<source media>`로 골라 한 장만 로드합니다(둘 다 제목 없음):
- 데스크톱(≥769px): 가로형(16:9) `static/hero_poster.jpg` — 원본 `poster_without_title.png`(3107×1747, 9.7MB)를 1600px JPEG로 압축.
- 모바일(≤768px): 정방형(1:1) `static/hero_poster_square.jpg` — 원본 `poster_square.png`(2831×2831, 13MB)를 1200px JPEG로 압축.

두 원본 PNG는 대용량이라 커밋하지 않고(`.gitignore`) 웹용 JPEG만 커밋합니다. 제목 있는 720×720 버전(`static/poster_with_title.png`)은 공유 썸네일(og:image/twitter:image) 전용입니다. 제목은 아직 임시로 텍스트(`.hero-title`, `nav-logo-text`와 동일한 굵기/자간)를 쓰고, 디자이너 제목 PNG(`static/hero_title.png`)가 나오면 `<section id="hero">` 안의 주석 처리된 `<img class="hero-title-img">` 주석만 풀면 됩니다.

**레이아웃도 반응형으로 둘**입니다(가로/정방형 포스터를 세로 모바일에서 잘라 확대하지 않기 위함): 데스크톱은 `.hero-bg-img`를 `position:absolute`+`object-fit:cover`로 화면 전체에 깔고 그 위에 텍스트를 겹칩니다. 모바일은 `.hero-bg-img`를 `position:static`(일반 흐름 블록, `width:100%;height:auto`)으로 바꿔 정방형 포스터 **전체(기타 모양)**를 상단에 풀블리드로 얹고, 텍스트(`.hero-content`, 좌우 패딩은 여기에)를 그 아래로 흐르게 합니다 — 이때 `.hero-img-spacer`와 `.hero-overlay`는 `display:none`. `<picture>` 래퍼는 `#hero picture { display:contents }`로 레이아웃에서 빼서 안의 `img`만 배치되게 합니다. 좁은 폭에서 카운트다운 4칸·팀명 칩이 넘치지 않도록 `@media (max-width:480px)`에서 크기를 한 번 더 줄입니다. **주의: 이 환경의 헤드리스 크롬은 창 폭을 500px 미만으로 못 내리므로(레이아웃이 500으로 고정), 진짜 좁은 모바일 레이아웃은 375/360px 폭 `<iframe>`으로 감싸 렌더해서 확인해야 합니다.**

이 "지금은 플레이스홀더, 나중에 디자이너 에셋" 패턴은 다른 곳에도 남아있습니다(`.ticket-postertext-bg.ph` 텍스트 워터마크, "QR 준비중" 박스) — 각각 무엇으로 교체해야 하는지 인라인 주석이 달려 있습니다.

## 색상 체계

모든 색상은 `static/style.css`의 `:root`에 정의된 CSS 커스텀 프로퍼티(`--blue`, `--pink`, `--cream`, `--navy`, `--navy2`)에서 나옵니다. 팔레트는 확정된 메인 포스터(아스팔트 위에 녹아내리는 기타 모양 베리 아이스크림)에 맞춘 **검정 아스팔트 → 베리 핑크** 컨셉입니다 — `--pink`는 밝은 베리 핑크(`#EB8FB8`), `--blue`는 더 짙은 로즈/베리(`#9C4468`), `--cream`은 따뜻한 톤이 살짝 도는 거의 흰색(`#FFF1EE`), `--navy`/`--navy2`는 아스팔트의 어두운 그림자 톤과 자연스럽게 맞아떨어지는 거의 검정색입니다. 새 색상을 추가할 때는 리터럴 값을 새로 만들지 말고 이 변수들(또는 알파 변형에 쓰이는 RGB 값인 `rgba(235,143,184,X)` / `rgba(255,241,238,X)` / `rgba(14,13,12,X)`)을 재사용하세요 — 일부 섹션 배경은 아직 변수 대신 그라데이션 스톱용 일회성 hex 값을 사용하고 있습니다.

## 과거 작업에서 이어지는 컨벤션

- `.band-card` 항목 수와 `.tt-group` 항목 수를 정확히 1:1로(현재 7개) 유지하세요 — 둘이 어긋나면 한쪽 리스트에는 TBA로 남아있는데 다른 쪽에는 아예 빠져있다는 뜻입니다.
- 원본 크기가 큰 이미지(예: 2000px 이상의 원본 밴드 사진)는 `static/`에 넣기 전에 리사이즈/압축하세요(`sips -s format jpeg -Z 800 ...`) — 수 MB짜리 원본을 그대로 커밋하지 마세요.
- 이 저장소의 커밋 메시지는 한데 묶지 않고 논리적인 콘텐츠 변경 단위로 작성됩니다(예: "Add 하늘보리 lineup and setlist", "Rebrand entire site to black/vanilla ice cream color concept") — 이 단위를 따르세요.
