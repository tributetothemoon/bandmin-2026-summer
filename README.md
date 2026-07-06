# 밴드의민족 2026 여름 정기공연

2026년 7월 25일(토) 18:00, 펄스라이브홀에서 열리는 **밴드의민족 여름 정기공연** 소개 페이지입니다.
GitHub Pages로 호스팅됩니다: https://tributetothemoon.github.io/bandmin-2026-summer/

## 로컬에서 미리보기

빌드 과정 없이 정적 파일을 그대로 서빙하면 됩니다.

```bash
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000/ 열기
```

## 구성

- `index.html` — 페이지 전체(마크업 + 인라인 스크립트)
- `static/style.css` — 전체 스타일
- `static/` — 포스터, 밴드 사진, 아이콘 등 모든 이미지 에셋

별도의 빌드 도구나 패키지 매니저는 사용하지 않습니다.

## 내용 업데이트하기

- **참가 밴드 / 타임테이블**: `index.html`의 `#bands`, `#timetable` 섹션에서 밴드 카드와 타임테이블 항목이 1:1로 대응합니다. 팀이 확정되면 두 곳 모두 같은 순서로 채워주세요.
- **히어로 이미지**: 현재 배경·전경 이미지(`static/hero_bg.png`, `static/hero_foreground.png`)는 메인 포스터에서 추출/생성한 샘플이고, 제목은 디자이너 최종본이 나오기 전까지 임시 텍스트로 되어 있습니다. 최종 에셋이 나오면 `<section id="hero">` 안의 안내 주석을 따라 교체하면 됩니다.
- **CSS 변경 시**: `index.html`의 `static/style.css?v=N` 쿼리 스트링의 버전을 올려주세요. GitHub Pages 캐시 때문에 안 올리면 배포 후에도 이전 스타일이 보일 수 있습니다.

## 배포

`main` 브랜치에 푸시하면 GitHub Pages가 자동으로 반영합니다.
