# 사이드프로젝트 - YU 책 찾기

https://gist.github.com/user-attachments/assets/14294ac0-26ac-4919-ab4c-c991b0b75926

YU-Verse의 도서 검색 서비스입니다. Next.js와 TypeScript를 사용하여 개발되었으며, 카카오 도서 검색 API를 통해 책 정보를 검색하고 보여줍니다.

## 주요 기능
* 카테고리 및 검색어를 이용한 도서 검색
* 가격순 정렬 기능

## 개발 환경
* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript
* **Package Manager**: pnpm
* **Testing**: Jest, Playwright
* **API**: [Kakao 도서검색 OpenAPI](https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book)

## 시작하기

### 1. 환경 변수 설정
프로젝트를 실행하기 위해 API 키 설정이 필요합니다. `packages/yu-books` 디렉토리에 `.env.local` 파일을 생성하고 아래 내용을 추가하세요.

```.env.local
NEXT_PUBLIC_KAKAO_API_KEY=여기에_카카오_REST_API_키를_입력하세요
```

### 2. 의존성 설치
프로젝트 루트 디렉토리에서 아래 명령어를 실행하여 모든 의존성을 설치합니다.

```bash
pnpm install
```

### 3. 개발 서버 실행
아래 명령어를 실행하여 개발 서버를 시작합니다.

```bash
# yu-books 앱만 실행
pnpm --filter yu-books run dev
```
서버가 시작되면 [http://localhost:3000/book-list](http://localhost:3000/book-list)에서 확인할 수 있습니다.

## 테스트

### 단위 테스트 (Jest)
아래 명령어로 단위 테스트를 실행할 수 있습니다.

```bash
# 모든 테스트 실행
pnpm --filter yu-books test

# 감시 모드(watch mode)로 테스트 실행
pnpm --filter yu-books test:watch
```

### 성능 테스트 (Playwright)
이 프로젝트에는 Playwright를 사용한 간단한 성능 측정 스크립트가 포함되어 있습니다.

1.  **Playwright 브라우저 설치**
    성능 테스트를 처음 실행하기 전, 아래 명령어로 Playwright에 필요한 브라우저들을 설치해야 합니다.

    ```bash
    pnpm exec playwright install
    ```

2.  **성능 측정 실행**
    먼저 개발 서버(`pnpm --filter yu-books run dev`)를 실행한 상태에서, 별도의 터미널을 열어 아래 명령어를 실행하세요.

    ```bash
    pnpm --filter yu-books run perf:dev
    ```
    측정 결과는 `packages/yu-books/perf-logs` 디렉토리에 JSON 파일로 저장됩니다.

## 배포
* **Vercel**: [https://yu-books.vercel.app/book-list](https://yu-books.vercel.app/book-list)

## 요구사항 명세서
* [Notion 링크](https://www.notion.so/tomorrowcho/yu-books-d3020a7061cf4c0e836c5a490a588dc9)