# Contributing to OpenKetchupSource Web

저희 OpenKetchupSource Web 프로젝트에 관심을 가져주셔서 감사합니다!

본 문서는 OpenKetchupSource Web 프로젝트에 기여하고자 하는 모든 분들을 위한 가이드입니다. 원활하고 일관된 협업을 위해 아래 사항을 준수해주시기 바랍니다.

---

## 📚 프로젝트 소개

본 프로젝트는 OpenKetchupSource 플랫폼의 **Frontend Web Application**으로, React 기반의 SPA(Single Page Application)입니다. 사용자 경험(UX) 향상과 효율적인 상태 관리를 위해 최신 기술 스택을 적극 활용하고 있습니다.

## 🛠️ 기여 방법

### 1. 이슈 확인 및 작성
- **이슈 확인**: 작업 전, [Issues](https://github.com/OpenKetchupSource/Web/issues) 탭을 확인하여 유사한 이슈가 이미 등록되어 있는지 확인해주세요.
- **이슈 작성**: 새로운 버그나 기능 제안은 `New Issue` 버튼을 클릭하여 등록해주세요.
  - 명확하고 간결한 제목
  - 발생 환경(브라우저, OS 등), 재현 방법, 스크린샷(필요시) 포함
  - 버그 재현 시, 콘솔 에러 로그 첨부 권장

### 2. 브랜치 전략
- 기본 브랜치: `main`
- 브랜치 규칙:
  - 이슈 생성
  - 이슈에서 브랜치 생성
  - 브랜치에서 작업 후 PR
  - 코드리뷰 및 merge

> 브랜치는 항상 `main`에서 새로 따세요!

### 3. 커밋 메시지 작성
커밋 메시지는 다음 규칙을 따라주세요:
- feat : 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 스타일 수정 (코드 포맷팅, 세미콜론, 공백 등)
- refactor : 코드 리팩토링
- chore : 기타 변경사항

### 4. Pull Request (PR) 작성
- PR 대상 브랜치: `main`
- 제목: `[FEAT/FIX/DOCS/STYLE/REFACTOR/CHORE] 작업 요약`
- 본문: 작업 내용, 구현 이유, 관련 이슈(`Closes #이슈번호`) 명시
- 가능하면 **작동 스크린샷** 첨부
- 리뷰어 지정 필수 (`@OpenKetchupSource/프론트엔드팀`)

> **PR 승인 전까지 `main` 브랜치 직접 Push 금지** 🚫

### 5. 코드 스타일 가이드
- Prettier 및 ESLint 설정 준수
- 코드 일관성을 위해 **Prettier 포맷터** 사용 필수
- 컴포넌트 단위로 폴더 구조 구성
- 타입스크립트 사용 시 `any` 사용 지양
- React Hook 규칙 준수
  - `useEffect` 의존성 배열 주의
  - 불필요한 `console.log` 제거
- 커스텀 훅, 컴포넌트 네이밍 컨벤션:
  - 파일명은 `camelCase`, 컴포넌트명은 `PascalCase`

### 6. 개발 환경
- Node.js 18 이상 권장
- 패키지 설치:
  ```bash
  npm install

### 8. 커뮤니케이션
   GitHub Issue 및 PR 코멘트를 통한 소통

필요 시, Slack/Discord에서 추가 논의

---
### 🤝 첫 기여를 위한 도움말
GitHub Flow를 따릅니다.

작은 수정이라도 PR 제출을 환영합니다.

친절하고 건설적인 코드 리뷰를 지향합니다.
---
### 📄 라이선스
본 프로젝트는 MIT License를 따릅니다.
