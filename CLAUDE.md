# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code(claude.ai/code)에게 제공되는 안내 문서입니다.

## 이 프로젝트는 무엇인가

**밴드의민족 2026년 여름 정기공연**(밴드 쇼케이스 공연)을 위한 싱글 페이지 정적 사이트로, GitHub Pages(`https://tributetothemoon.github.io/bandmin-2026-summer/`)를 통해 호스팅됩니다. 별도의 빌드 시스템, 패키지 매니저, 테스트 스위트가 없습니다 — 순수 HTML/CSS와 약간의 인라인 JS로만 구성되어 있습니다.

## 로컬에서 작업하기

디렉토리를 서빙하고 브라우저로 열면 됩니다 — 빌드할 것이 없습니다:

```bash
python3 -m http.server 8777
# http://localhost:8777/ 열기
```

스크롤 리빌(`.reveal` 섹션)과 카운트다운/타임테이블은 브라우저에서 JS로만 동작하므로, HTML만 읽어서 판단하지 말고 실제로 페이지를 렌더링해서 확인하세요(빠른 확인에는 헤드리스 크롬 스크린샷이 유용합니다).

## 구조

- `index.html` — 페이지 전체: 마크업, 모든 카피, 모든 JS(`<body>` 하단의 인라인 `<script>`). 별도의 `.js` 파일은 없습니다.
- `static/style.css` — 모든 스타일. `index.html`에서 캐시 무효화용 쿼리 스트링(`static/style.css?v=N`)과 함께 참조됩니다 — CSS를 수정해 푸시할 때는 GitHub Pages가 오래된 캐시를 서빙하지 않도록 `N`을 올려주세요.
- `static/` — 모든 이미지(포스터, 밴드 사진, 소셜 아이콘). 새 이미지 에셋은 여기에 넣고 `static/<file>`로 참조합니다.

## 페이지 구조 (`index.html`)

섹션은 다음 순서로 각각 `<section id="...">`로 존재합니다: `hero` → `intro` → `bands` → `timetable` → `venue` → `faq` → `ticket`(무료입장 CTA) → `support`(후원) → `playlist` → `footer`. 내비게이션과 모바일 드로어는 이 id들(`#bands`, `#timetable` 등)에 직접 링크하므로, 섹션 id를 바꾸면 내비 링크도 함께 맞춰야 합니다.

**밴드 목록(`#bands`)과 타임테이블(`#timetable`)은 병렬 리스트**입니다 — 동일한 라인업이 두 곳에 반복되며 순서가 반드시 일치해야 합니다:
- 밴드별 `.band-card`: `.band-img`(사진 `<img>` 또는 플레이스홀더 그라데이션을 위한 빈 값), `.band-name`, 선택적 `.band-desc`(멤버 명단, 예: `이름(V) · 이름(G)`), 카드 자체에 있는 `data-instagram` / `data-youtube` 속성.
- 밴드별 `.tt-group`: `.tt-time` / `.tt-act`가 있는 토글 버튼과, `.setlist-songs`(`.song-no`, `.song-title`, `.song-artist`)로 구성된 `.setlist` 패널. 참고용 유튜브 영상이 있으면 곡 제목은 `<a>` 태그로 링크되고, 없으면 일반 `<span>`입니다.

밴드 소셜 링크는 마크업에 하드코딩되어 있지 **않습니다** — `index.html` 하단의 인라인 JS가 각 `.band-card`의 `data-instagram`/`data-youtube`를 읽어 `.band-links`에 아이콘 링크를 주입합니다(둘 다 비어 있으면 컨테이너 자체를 제거). 아이콘 `<a>`를 직접 작성하지 말고 이 두 속성만 설정하세요.

아직 확정되지 않은 밴드/셋리스트 슬롯은 생략하지 않고 `TBA`, `TBD`, `셋리스트 준비중` 같은 리터럴 플레이스홀더 텍스트를 사용해서, 그리드/타임테이블의 항목 수가 일정하게 유지되도록 합니다.

## 히어로: 플레이스홀더 우선 설계

히어로는 `.hero-poster-frame` 안에 3개의 이미지 레이어(`.hero-bg-img` 배경, `.hero-title-img` 제목, `.hero-hero-img` 전경)를 절대 위치로 겹쳐서 하나의 포스터처럼 합성합니다. 지금 쓰이는 세 파일(`static/hero_bg.png`, `static/hero_title.png`, `static/hero_foreground.png`)은 전부 디자이너 최종본이 아니라 메인 포스터(`static/poster.png`)에서 뽑아낸/생성한 샘플입니다 — 배경은 CSS 그라데이션을 PNG로 구운 것, 제목은 시스템 폰트로 렌더링한 텍스트, 전경은 포스터에서 검정 배경을 지워 추출한 아이스크림+스틱입니다. 디자이너가 진짜 에셋을 주면 `<section id="hero">` 안의 주석대로 이 세 `src`만 갈아 끼우면 되고(마크업/CSS 구조는 그대로), `.hero-poster-frame`의 `aspect-ratio`(현재 포스터 원본 비율 1024/1144)만 최종 배경 이미지 비율에 맞게 조정하면 됩니다. 이 "지금은 플레이스홀더, 나중에 디자이너 에셋" 패턴은 다른 곳에도 있습니다(`.ticket-postertext-bg.ph` 텍스트 워터마크, "QR 준비중" / "플레이리스트 준비중" 박스) — 각각 무엇으로 교체해야 하는지 인라인 주석이 달려 있습니다.

## 색상 체계

모든 색상은 `static/style.css`의 `:root`에 정의된 CSS 커스텀 프로퍼티(`--blue`, `--pink`, `--cream`, `--navy`, `--navy2`)에서 나옵니다. 이름과 달리 실제 팔레트는 포스터 아트에 맞춘 **검정 → 바닐라 아이스크림 골드** 컨셉입니다 — `--pink`는 따뜻한 바닐라 골드(`#E8CE96`), `--blue`는 더 짙은 캐러멜 골드(`#C9A968`), `--navy`/`--navy2`는 따뜻한 톤의 거의 검정색입니다. 새 색상을 추가할 때는 리터럴 값을 새로 만들지 말고 이 변수들(또는 알파 변형에 쓰이는 RGB 값인 `rgba(232,206,150,X)` / `rgba(14,13,12,X)`)을 재사용하세요 — 일부 섹션 배경은 아직 변수 대신 그라데이션 스톱용 일회성 hex 값을 사용하고 있습니다.

## 과거 작업에서 이어지는 컨벤션

- `.band-card` 항목 수와 `.tt-group` 항목 수를 정확히 1:1로(현재 7개) 유지하세요 — 둘이 어긋나면 한쪽 리스트에는 TBA로 남아있는데 다른 쪽에는 아예 빠져있다는 뜻입니다.
- 원본 크기가 큰 이미지(예: 2000px 이상의 원본 밴드 사진)는 `static/`에 넣기 전에 리사이즈/압축하세요(`sips -s format jpeg -Z 800 ...`) — 수 MB짜리 원본을 그대로 커밋하지 마세요.
- 이 저장소의 커밋 메시지는 한데 묶지 않고 논리적인 콘텐츠 변경 단위로 작성됩니다(예: "Add 하늘보리 lineup and setlist", "Rebrand entire site to black/vanilla ice cream color concept") — 이 단위를 따르세요.
