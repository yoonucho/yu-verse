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
 ┃ ┣ 📂yu-books  # YU 도서 검색 서비스
 ┃ ┗ 📂yu-calendar # YU 캘린더 서비스
 ┣ 📜.gitignore
 ┣ 📜package.json # 모노레포 전체의 의존성 및 스크립트 정의
 ┣ 📜pnpm-lock.yaml
 ┣ 📜pnpm-workspace.yaml # pnpm 워크스페이스 설정
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┗ 📜turbo.json # Turborepo 파이프라인 설정
```

## 프로젝트 목록

### 1. [YU캘린더](./packages/yu-calendar/README.md)
Next.js와 TypeScript로 개발된 일정 관리 웹앱입니다.

- **주요 기능**: 공휴일 검색, 메인 캘린더 이벤트 팝업 기능
- **개발 환경**: Node.js(>=18.18.0), Next.js 14, TypeScript, Supabase V2.0
- **배포**: [YU캘린더](https://yu-calendar.vercel.app/)

### 2. [YU책찾기](./packages/yu-books/README.md)
Next.js와 TypeScript를 사용하여 개발된 책 검색 서비스입니다.

- **주요 기능**: 책 검색, 가격순 정렬
- **개발 환경**: Node.js(>=18.18.0), Next.js 14, TypeScript
- **배포**: [YU 책 찾기](https://yu-books.vercel.app/)

## 공통 기술 스택
- **Framework**: Next.js 14, React
- **Language**: TypeScript
- **State Management**: Zustand
- **Testing**: Jest, Playwright
- **Build Tool**: Turborepo
- **Package Manager**: pnpm

## 시작하기

1.  **저장소 클론**
    ```bash
    git clone https://github.com/yoonucho/yu-verse.git
    cd yu-verse
    ```
2.  **Node.js 설치**
    `>=18.18.0` 버전의 Node.js를 설치합니다.

3.  **의존성 설치**
    ```bash
    pnpm install
    ```

## 주요 명령어

### 개발 서버 실행
각 패키지를 개별적으로 실행할 수 있습니다.

```bash
# yu-books 개발 서버 실행
pnpm --filter yu-books run dev

# yu-calendar 개발 서버 실행
pnpm --filter yu-calendar run dev
```

### 전체 빌드
모든 패키지를 한 번에 빌드합니다.

```bash
pnpm build
```

### 테스트
단위 테스트와 E2E 테스트를 실행할 수 있습니다.

```bash
# 모든 단위 테스트(Jest) 실행
pnpm test

# yu-books E2E(Playwright) 테스트 실행
pnpm test:e2e:books

# yu-calendar E2E(Playwright) 테스트 실행
pnpm test:e2e:calendar
```
