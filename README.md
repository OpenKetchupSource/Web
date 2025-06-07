# 💞 Soulmate

## 🧠 프로젝트 소개

**Soulmate**는 사용자에게 깊은 이해와 공감을 제공하는 감성 기반 일기 서비스입니다.  
AI 채팅을 통해 사용자의 하루와 감정을 섬세히 읽어내고, 사용자가 작성한 일기에 댓글을 달아 진심 어린 피드백과 응원을 제공합니다.  

> 사용자가 혼자일 때도 곁을 지키며, 말하지 않아도 마음을 알아주는 진정한 동반자가 되고자 합니다.

---

## 👯‍♀️ FE 팀원별 역할

### 👩‍💻 김혜린: 백엔드, 프론트엔드
- [FE] 세팅 화면 스타일링

---
### 🖥️ 정선빈: 프론트엔드, AI
- GitHub Action 설정
- [FE] 컴포넌트, 페이지 제작  
- [FE] 기능 제작
- [FE] 프론트엔드 배포  
- [FE] API 연결  
- [AI] AI 코멘트 구현  

## 🔗 Soulmate 관련 링크

- 🔗 **프론트엔드 배포 URL**: [https://withsoulmate.netlify.app/](https://withsoulmate.netlify.app/)
- 🛠️ **백엔드 테스트 URL**: [https://soulmate.o-r.kr/api/test](https://soulmate.o-r.kr/api/test)
- 💻 **GitHub**:
  - 프론트엔드: [https://github.com/OpenKetchupSource/Web](https://github.com/OpenKetchupSource/Web)
  - 백엔드: [https://github.com/OpenKetchupSource/Server](https://github.com/OpenKetchupSource/Server)
- 📘 **Notion 문서**: [프로젝트 문서 바로가기](https://rainbow-uncle-f19.notion.site/1c4e29af6ad5806c903be9dfaa2a4152?pvs=74)

---

## 🛠️ 기술 스택 요약

| 분류 | 기술 |
|------|------|
| Frontend | React 19, Vite, Zustand, Styled-components, TypeScript |
| Backend | Spring Boot, JPA, MySQL, OAuth (Kakao), EC2/RDS |
| AI | OpenAI GPT API 기반 코멘트 및 일기 생성 |
| 기타 | GitHub Actions, Netlify, Swagger, Notion, Figma |

---

## 📁 FE 프로젝트 구조
```
📦src
 ┣ 📂assets
 ┃ ┗ 📜react.svg
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜TheFooter.tsx
 ┃ ┣ 📂diary
 ┃ ┃ ┗ 📜Header.tsx
 ┃ ┣ 📂home
 ┃ ┃ ┗ 📜DiaryList.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜KakaoCallback.tsx
 ┃ ┃ ┗ 📜Login.tsx
 ┃ ┗ 📜CustomDatePicker.tsx
 ┣ 📂pages
 ┃ ┣ 📂chatting
 ┃ ┃ ┣ 📜ChatPage.tsx
 ┃ ┃ ┗ 📜SettingPage.tsx
 ┃ ┣ 📂collection
 ┃ ┃ ┣ 📜Comments.tsx
 ┃ ┃ ┣ 📜HashtagDetail.tsx
 ┃ ┃ ┗ 📜Hashtags.tsx
 ┃ ┣ 📂writing
 ┃ ┃ ┣ 📜EditPage.tsx
 ┃ ┃ ┗ 📜WritingPage.tsx
 ┃ ┣ 📜DiaryDetail.tsx
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜LoadingPage.tsx
 ┃ ┣ 📜LoginPage.tsx
 ┃ ┗ 📜Testpage.tsx
 ┣ 📂services
 ┃ ┣ 📂apis
 ┃ ┃ ┣ 📂chatting
 ┃ ┃ ┃ ┗ 📜chat.ts
 ┃ ┃ ┣ 📂collection
 ┃ ┃ ┃ ┣ 📜comment.ts
 ┃ ┃ ┃ ┗ 📜collection.ts
 ┃ ┃ ┣ 📂diary
 ┃ ┃ ┃ ┣ 📜diary.ts
 ┃ ┃ ┃ ┗ 📜writing.ts
 ┃ ┃ ┣ 📂hashtag
 ┃ ┃ ┃ ┗ 📜hashtag.ts
 ┃ ┃ ┣ 📜apitest.ts
 ┃ ┃ ┣ 📜axiosInstance.ts
 ┃ ┃ ┗ 📜axiosInstanceWithToken.ts
 ┃ ┣ 📂gpt
 ┃ ┃ ┗ 📜openai.ts
 ┃ ┗ 📂zustand
 ┃ ┃ ┗ 📜setting.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
📦public
 ┣ 📂images
 ┃ ┣ 📂characters
 ┃ ┃ ┣ 📂reading
 ┃ ┃ ┣ 📂writing
 ┃ ┃ ┣ 📜앙글이.png
 ┃ ┃ ┣ 📜웅이.png
 ┃ ┃ ┗ 📜티바노.png
 ┃ ┣ 📜arrow.png
 ┃ ┣ 📜home.png
 ┃ ┣ 📜icon.png
 ┃ ┣ 📜meta.png
 ┃ ┣ 📜next.png
 ┃ ┗ 📜send.png
 ┗ 📜_redirects
```


## 🧱 Build 환경

### Vite + SWC

SWC는 JavaScript와 TypeScript를 매우 빠르게 트랜스파일(변환) 해주는 차세대 컴파일러입니다.
간단히 말해, Babel의 빠른 대체재입니다.

---

## 📦 설치 및 실행

### 1. 의존성 설치
`npm install`

### 2. 개발 서버 실행
`npm run dev`
