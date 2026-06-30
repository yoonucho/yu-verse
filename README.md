# YU Verse

YU-Verse는 개인 프로젝트들을 한곳에서 관리하기 위해 구성한 모노레포입니다. 현재는 YU캘린더와 YU책찾기 프로젝트를 포함하고 있습니다.

## 주요 특징

- 효율적인 모노레포 관리: 여러 프로젝트를 한 저장소에서 관리하고, Turborepo와 pnpm으로 빌드와 의존성 관리를 최적화합니다.
- 일관된 개발 환경: Next.js 14와 TypeScript 기반의 프론트엔드 환경을 사용합니다.

## 사용된 도구

### 1. Turborepo

[Turborepo](https://turborepo.org/)는 모노레포에서 빌드와 배포 파이프라인을 관리하는 도구입니다. 이 저장소에서는 다음 기능을 활용합니다.

- **빌드 캐싱**: 이전 빌드 결과를 캐시해 반복 작업을 줄입니다.
- **병렬 작업 처리**: 여러 패키지를 병렬로 빌드해 시간을 줄입니다.
- **빌드 파이프라인 구성**: 패키지 의존성에 맞춰 빌드 순서를 관리합니다.

### 2. pnpm

[pnpm](https://pnpm.io/)은 빠르고 효율적인 패키지 매니저입니다. 이 저장소에서는 다음 장점을 활용합니다.

- **디스크 공간 절약**: 중복 패키지를 공유해 디스크 사용량을 줄입니다.
- **빠른 설치 속도**: 링크된 패키지 저장소를 사용해 설치 시간을 줄입니다.
- **일관된 의존성 관리**: 프로젝트별 의존성 버전을 정확하게 고정합니다.

## 모노레포 구성 시 문제 해결 과정

- 모노레포를 구성하면서 겪은 과정과 문제 해결을 정리한 글입니다. 자세한 내용은 아래 링크에서 확인할 수 있습니다.
  [Next.js 14 프로젝트를 모노레포로 관리하기 Turborepo + pnpm](https://www.notion.so/tomorrowcho/Next-js-14-Turborepo-pnpm-1041c66258d480c28888e110653b130f)

## 프로젝트 구조

```
yu-verse
📦yu-verse
 ┣ 📂packages
 ┃ ┣ 📂yu-books  # YU책찾기 프로젝트의 코드와 설정 파일을 포함하는 디렉토리
 ┃ ┗ 📂yu-calendar # YU캘린더 프로젝트의 코드와 설정 파일을 포함하는 디렉토리
 ┣ 📜.gitignore # Git에 포함하지 않을 파일과 디렉토리를 지정하는 파일
 ┣ 📜package.json # 모노레포의 루트에서 사용하는 npm 패키지와 스크립트를 정의한 파일
 ┣ 📜pnpm-lock.yaml  # pnpm 패키지 매니저가 생성하는 잠금 파일로, 의존성의 정확한 버전을 고정
 ┣ 📜pnpm-workspace.yaml # pnpm을 위한 워크스페이스 설정 파일, 모노레포의 패키지 관리를 정의
 ┣ 📜README.md # 프로젝트 설명과 실행 방법을 담은 파일
 ┣ 📜tsconfig.json # TypeScript 컴파일러 옵션을 정의하는 파일
 ┗ 📜turbo.json # Turborepo 설정 파일로, 빌드 파이프라인과 캐싱을 관리

```

## 프로젝트 목록

### 1. [YU 캘린더](https://github.com/yoonucho/yu-verse/tree/main/packages/yu-calendar)

Next.js와 TypeScript로 만든 일정 관리 웹앱입니다.

- **주요 기능**: 공휴일 검색, 메인 캘린더 이벤트 팝업 기능
- **개발 환경**: Node.js(>=18.18.0), Next.js 14, TypeScript, Supabase V2.0.
- **배포**: [YU 캘린더](https://yu-calendar.vercel.app)
- **Trouble Shooting**: [노션 링크](https://www.notion.so/tomorrowcho/YU-e3d060001cd84f919f1adafc90e20166?pvs=4#96db7517f88e4ff8abe7d73ca387a4f3)

프로젝트의 자세한 내용은 [YU 캘린더 README](https://github.com/yoonucho/yu-verse/tree/main/packages/yu-calendar#readme)에서 확인할 수 있습니다.

### 2. [YU 책 찾기](https://github.com/yoonucho/yu-verse/tree/main/packages/yu-books)

Next.js와 TypeScript로 만든 책 검색 서비스입니다.

- **주요 기능**: 책 검색
- **개발 환경**: Node.js(>=18.18.0), Next.js 14, TypeScript
- **배포**: [YU 책 찾기](https://yu-books.vercel.app)
- **Trouble Shooting**: [노션 링크](https://www.notion.so/tomorrowcho/YU-ff10f1843b5541ca998235269a9879ad)

프로젝트의 자세한 내용은 [YU 책 찾기 README](https://github.com/yoonucho/yu-verse/tree/main/packages/yu-books#readme)에서 확인할 수 있습니다.

## 공통 기술 스택

- **프론트엔드**: Next.js 14, TypeScript
- **배포**: Vercel
- **상태 관리**: Zustand

## 시작하기

1.  저장소 클론

```bash
git clone https://github.com/yoonucho/yu-verse.git
```

2.  Node.js 설치(>=18.18.0)
3.  의존성 설치 및 실행

```bash
pnpm install
# yu-books 실행
pnpm run yu-books dev
# yu-calendar 실행
pnpm run yu-calendar dev
```
