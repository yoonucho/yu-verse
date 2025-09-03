# YU Verse

YU-Verse는 여러 프로젝트를 단일 저장소에서 관리하기 위해 구축된 모노레포입니다. 이 저장소는 [Turborepo](https://turborepo.org/)와 [pnpm](https://pnpm.io/)을 사용하여 효율적이고 일관된 의존성 관리를 제공합니다.

## 사용된 도구

### 1. Turborepo

[Turborepo](https://turborepo.org/)는 모노레포 환경에서 효율적인 빌드 및 배포 파이프라인을 관리하는 도구입니다. 다음과 같은 기능을 제공합니다:

- **빌드 캐싱**: 반복적인 빌드 작업을 피하기 위해 이전 빌드 결과를 캐시합니다.
- **병렬 작업 처리**: 여러 패키지를 병렬로 빌드하여 시간을 절약합니다.
- **빌드 파이프라인 구성**: 의존성에 따라 빌드 순서를 자동으로 관리합니다.

Turborepo를 사용한 이유는 복잡한 모노레포 환경에서 빌드 시간과 관리 부담을 줄이기 위함입니다. 이를 통해 모든 프로젝트의 빌드 및 배포를 일관성 있게 관리할 수 있습니다.

### 2. pnpm

[pnpm](https://pnpm.io/)은 빠르고 효율적인 패키지 매니저입니다. 다음과 같은 장점을 제공합니다:

- **디스크 공간 절약**: 중복된 패키지를 공유하여 디스크 사용량을 줄입니다.
- **빠른 설치 속도**: 링크된 패키지 저장소를 사용하여 빠르게 패키지를 설치합니다.
- **일관된 의존성 관리**: 프로젝트별로 정확한 의존성 버전을 보장합니다.

pnpm을 사용한 이유는 대규모 프로젝트에서 패키지 설치 속도와 디스크 사용량을 최적화하기 위해서입니다. 이는 모노레포에서 많은 패키지를 다룰 때 특히 유용합니다.

## 프로젝트 구조

```
yu-verse
📦yu-verse
 ┣ 📂packages
 ┃ ┣ 📂yu-books  # YU 도서 검색 서비스 프로젝트의 코드와 설정 파일을 포함하는 디렉토리
 ┃ ┗ 📂yu-calendar # YU 캘린더 프로젝트의 코드와 설정 파일을 포함하는 디렉토리
 ┣ 📜.gitignore # Git에 포함하지 않을 파일과 디렉토리를 지정하는 파일
 ┣ 📜package.json # 모노레포의 루트에서 사용하는 npm 패키지와 스크립트를 정의한 파일
 ┣ 📜pnpm-lock.yaml  # pnpm 패키지 매니저가 생성하는 잠금 파일로, 의존성의 정확한 버전을 고정
 ┣ 📜pnpm-workspace.yaml # pnpm을 위한 워크스페이스 설정 파일, 모노레포의 패키지 관리를 정의
 ┣ 📜README.md # 프로젝트의 설명, 사용 방법, 기여 방법 등을 담은 파일
 ┣ 📜tsconfig.json # TypeScript 컴파일러 옵션을 정의하는 파일
 ┗ 📜turbo.json # Turborepo 설정 파일로, 빌드 파이프라인과 캐싱을 관리

```

## 프로젝트 목록

### 1. [YU캘린더](https://github.com/yoonucho/yu-verse/tree/main/packages/yu-calendar)

Next.js와 TypeScript로 개발된 일정 관리 웹앱입니다.

- **주요 기능**: 공휴일 검색, 메인 캘린더 이벤트 팝업 기능
- **개발 환경**: Node.js(>=18.18.0), Next.js 14, TypeScript, Supabase V2.0.
- **배포**: [YU캘린더](https://yu-calendar.vercel.app/).
- **Trouble Shooting**: [노션 링크](https://www.notion.so/tomorrowcho/YU-e3d060001cd84f919f1adafc90e20166?pvs=4#96db7517f88e4ff8abe7d73ca387a4f3)

프로젝트의 자세한 내용은 [YU캘린더 README](https://github.com/yoonucho/yu-verse/tree/main/packages/yu-calendar#readme)에서 확인하실 수 있습니다.

### 2. [YU책찾기](https://github.com/yoonucho/yu-verse/tree/main/packages/yu-books)

Next.js와 TypeScript를 사용하여 개발된 책 검색 서비스입니다.

- **주요 기능**: 책 검색
- **개발 환경**: Node.js(>=18.18.0), Next.js 14, TypeScript
- **배포**: [YU 책 찾기](https://yu-books.vercel.app/)
- **Trouble Shooting**: [노션 링크](https://www.notion.so/tomorrowcho/YU-ff10f1843b5541ca998235269a9879ad)

프로젝트의 자세한 내용은 [YU책찾기 README](https://github.com/yoonucho/yu-verse/tree/main/packages/yu-books#readme)에서 확인하실 수 있습니다.

## 공통 기술 스택

- **프론트엔드**: Next.js 14, TypeScript
- **배포**: Vercel

## 시작하기

1.  저장소 클론

```bash
git clone https://github.com/yoonucho/yu-verse.git
```

2.  node.js 설치(>=18.18.0)
3.  모듈 설치 & 실행

```bash
pnpm install
# yu-books 실행
pnpm --filter yu-books run dev
# yu-calendar 실행
pnpm --filter yu-calendar run dev
```
