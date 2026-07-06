# CareerFit AI Design Skill Guide

## 프로젝트 컨셉

**프로젝트명:** CareerFit AI  
**서비스:** 취업·공모전 포트폴리오 코치  
**대상:** 대학생(취업 준비생)  
**키워드:** 전문성, 친근함, 깔끔함, 신뢰감

---

# 1. 컬러 팔레트

Tailwind CSS 기준

| 역할 | Tailwind | Hex |
|-------|----------|------|
| Primary | `blue-600` | #2563EB |
| Primary Hover | `blue-700` | #1D4ED8 |
| Secondary | `emerald-500` | #10B981 |
| Background | `gray-50` | #F9FAFB |
| Card Background | `white` | #FFFFFF |
| Text Primary | `gray-900` | #111827 |
| Text Secondary | `gray-600` | #4B5563 |
| Border | `gray-200` | #E5E7EB |
| Error | `red-500` | #EF4444 |
| Success | `green-500` | #22C55E |

### 디자인 원칙

- 흰색 배경 중심
- Primary 색상은 CTA(Button)에만 사용
- 회색 계열을 기본으로 사용
- 성공/오류 색상은 상태 표시에서만 사용

---

# 2. 타이포그래피 규칙

## Font

기본

```
font-sans
```

---

## 제목

### Page Title

```
text-3xl
font-bold
text-gray-900
```

---

### Section Title

```
text-xl
font-semibold
```

---

### Card Title

```
text-lg
font-semibold
```

---

### Body

```
text-base
leading-7
text-gray-700
```

---

### Caption

```
text-sm
text-gray-500
```

---

# 3. 컴포넌트 구조

```
App
│
├── Header
│
├── InputForm
│      │
│      ├── Major Select
│      ├── Skill Input
│      ├── JobType Select
│      └── Analyze Button
│
├── ResultCard
│      │
│      ├── 현재 역량 평가
│      ├── 부족한 역량
│      ├── 추천 공고
│      └── AI 답변
│
└── SourceCard
       │
       ├── 회사명
       ├── 직무
       ├── 유사도(distance)
       └── 필수 스킬
```

---

# 4. 레이아웃 규칙

## 최대 너비

```
max-w-5xl
mx-auto
```

---

## 여백

페이지

```
px-6
py-10
```

카드

```
p-6
```

컴포넌트 간

```
space-y-6
```

버튼

```
mt-6
```

---

## Card 스타일

```
rounded-xl

border

border-gray-200

bg-white

shadow-sm
```

Hover

```
hover:shadow-md

transition
```

---

## Button

Primary

```
bg-blue-600

text-white

rounded-lg

px-6

py-3

hover:bg-blue-700

transition
```

---

## Input

```
border

border-gray-300

rounded-lg

px-4

py-3

focus:ring-2

focus:ring-blue-500

focus:outline-none
```

---

## Grid

Desktop

```
grid-cols-2
```

Mobile

```
grid-cols-1
```

---

# 5. 금지 사항

❌ 과도한 애니메이션 사용

❌ 4가지 이상의 메인 컬러 사용

❌ 그라데이션 남용

❌ 너무 작은 글씨 (`text-xs`)를 본문에 사용

❌ 카드마다 다른 Radius 사용

❌ 여러 종류의 그림자 혼용

❌ Primary 버튼 색상을 화면마다 변경

❌ 과도한 이모지 사용

❌ 긴 문장을 한 줄에 배치

❌ 결과 카드와 출처 카드를 동일한 스타일로 구분 없이 표시

---

# UI 디자인 원칙

- 전문적인 취업 서비스 느낌을 유지한다.
- 대학생도 부담 없이 사용할 수 있도록 친근한 인터페이스를 제공한다.
- 정보 전달을 우선하며 불필요한 장식을 최소화한다.
- 동일한 컴포넌트는 동일한 스타일 규칙을 유지한다.
- 모바일과 데스크톱 모두에서 읽기 쉬운 레이아웃을 제공한다.