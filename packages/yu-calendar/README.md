# 사이드프로젝트 - YU 캘린더

[![preview](https://github.com/yoonucho/yu-calendar/assets/2981954/0d656087-024f-4bc2-8723-d537e376976f)](https://github.com/user-attachments/assets/75e5e7e1-9d32-455a-8f19-776c4b3ab094)

## 주요 기능

- **캘린더 뷰 및 이벤트 관리 (FullCalendar)**: 직관적인 캘린더 UI 상에서 일정 등록, 수정, 삭제 및 기간별 뷰 제공
- **메인 캘린더 이벤트 팝업 기능 구현**: 캘린더 내 이벤트 클릭 시 상세 정보 및 조작 팝업 제공 (Zustand 스토어 기반 UI 제어)
- **공휴일, 이벤트 날짜 검색 기능 구현**: Nager.Date API와 연동해 공휴일 정보를 제공하고, 특정 타겟 요일/이벤트 날짜를 빠르게 찾는 Result Info 전용 페이지 도입
- **상태 분리 및 로딩 최적화**: 이벤트, 공휴일, 로딩, 메뉴 등 다양한 데이터 및 UI 상태를 Zustand 스토어로 세분화하여 관리

## 개발 환경 및 기술 스택

[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/yoonucho/yu-calendar)

- **Framework** : Node.js (>=18.18.0), Next.js 14
- **Language** : TypeScript
- **Database** : Supabase V2.0
- **State Management** : Zustand
- **Major Libraries** : `@fullcalendar/react`, `date-fns`, `react-datepicker`
- **상세기술스택** : (https://stackshare.io/yoonucho/yu-calendar)

## 아키텍처 및 데이터 흐름

- **Zustand 전역 상태 관리**: `useEventStore`, `useHolidayStore`, `usePopupStore` 등 도메인과 UI 역할별로 스토어를 나누어 이벤트, 공휴일, 팝업 상태를 관리
- **Supabase Server Actions & Type Safety**: Next.js 14의 Server Actions(`supabaseEventsActions.ts`)를 활용하여 데이터베이스와의 통신(CRUD)을 서버 사이드에서 처리. UI 상태(`EventApi`)와 DB 상태(`YuCalendarRowInsert/Update`) 간 타입 매핑 및 데이터 직렬화/역직렬화 적용

## API 및 외부 연동

- [Nager.Date API (공휴일 데이터)](https://date.nager.at/Api)

## Trouble Shooting & Dev Notes

- [검색 결과 페이지 오류 분석](https://www.notion.so/tomorrowcho/5776f3f177fc4f73b8f1fd93f4dbc00f)
- [Zustand로 날짜 상태관리하기](https://www.notion.so/tomorrowcho/Zustand-2ad6bf64297e476fb7219112a915c9ba)
- [Zustand로 메뉴 상태관리 & React FullCalendar Custom Button 생성하기](https://www.notion.so/tomorrowcho/Zustand-React-FullCalendar-Custom-Button-63cbf318620f434b8224b63645b0eb59)
- [IOS 인풋창 클릭 시 날짜선택기 확대 이슈](https://www.notion.so/tomorrowcho/IOS-c3df81c14f334102b97f71e3d49468f9)
- [window is not defined 오류 해결 과정](https://www.notion.so/tomorrowcho/window-is-not-defined-225266cad69a4a96bb6c49d5737fa0c1)
- [React DatePicker에 커스텀 헤더 추가하여 연도 선택하기 기능 추가하기](https://www.notion.so/tomorrowcho/React-DatePicker-adb7b1a18bad4543889226b826651125)
- [공휴일 데이터 중복 호출 문제를 최적화하며 단일 책임 원칙 지키기](https://www.notion.so/tomorrowcho/17c1c66258d480219d44ff4ec95d026f)

## 향후 확장 계획 (Future Plans)

현재 기능 및 아키텍처 수준을 기반으로 다음과 같은 확장 및 고도화를 계획하고 있습니다.

- **오픈형 아이돌 스케줄러로 확장**: 팬들이 아이돌 활동 일정, 방송·공연·발매·기념일 정보를 함께 확인하고 관리할 수 있는 공개형 스케줄러 경험을 구체화

## 배포

https://yu-calendar.vercel.app/

## 요구사항 명세서

[요구사항 명세서](https://www.notion.so/tomorrowcho/66717788a1564a19b04da9130f988c4f)
