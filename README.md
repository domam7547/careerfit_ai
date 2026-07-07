# careerfit_ai
취업/공모전 데이터 기반 ai 포트폴리오 도우미 

## 프로젝트 개요

[기업의 여러 직무에서 요구하는 기술스택이 어느정도 수준인지 파악이 필요함]

## 기술 스택

| 영역 | 기술 |
|---|---|
| 백엔드 | Python, FastAPI |
| AI API | Gemini 2.5 Flash-Lite |
| 데이터 | Pandas, SQLite, ChromaDB |
| 프론트엔드 | React, Vite |
| 실행 환경 | Docker |
## 진행 현황

- [v] 1일차: 프로젝트 기획 및 개발 환경 세팅
- [v] 2일차: FastAPI 서버 구축 및 Gemini API 연결
- [v] 3일차: 데이터 파이프라인 구축
- [v] 4일차: RAG 기반 서비스 + React UI
- [ ] 5일차: Docker + 포트폴리오 완성

## 1일차
* 파이썬 가상환경 및 프로젝트 폴더 구성 
(기대 구조도)
careerfit_ai/
│
├── backend/                  # FastAPI 백엔드
│   ├── main.py               # 서버 시작
│   │
│   ├── routers/              # API 엔드포인트
│   │   ├── health.py
│   │   ├── jobs.py
│   │   └── analyze.py
│   │
│   ├── services/             # 핵심 비즈니스 로직
│   │   ├── llm_service.py
│   │   ├── rag_service.py
│   │   └── db_service.py
│   │
│   ├── models/               # Pydantic 모델
│   │   ├── request.py
│   │   └── response.py
│   │
│   ├── data/
│   │   ├── jobs.csv
│   │   ├── preprocess.py
│   │   ├── careerfit.db
│   │   └── rag_documents.json
│   │
│   ├── chroma_db/            # ChromaDB 저장소
│   │
│   ├── utils/                # 공통 함수
│   │
│   ├── .env
│   └── requirements.txt
│
├── frontend/                 # React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── docs/
│
├── tests/
│
├── README.md
│
├── .gitignore
│
└── docker-compose.yml

## 2일차 
* FastAPI 프로젝트 구조를 생성하고 기본 서버를 실행
* GitHub 저장소를 생성하고 Git 버전 관리를 시작
* /health 엔드포인트를 구현하여 서버 상태를 확인
* Swagger UI(/docs)를 활용하여 API 테스트 환경을 구축
* /jobs와 /analyze API 엔드포인트를 구현
* Pydantic을 활용하여 Request·Response 모델을 설계
* 추가실습 : Hugging Face 토큰 발급 

## 3일차 
* Gemini 2.5 Flash-Lite API 연동 구조를 구현
* .env를 이용해 API Key와 MOCK_MODE 환경변수를 관리하도록 구성
* Swagger UI를 통해 AI 응답 및 Mock Mode 동작을 검증
* 추가 실습: ollama 설치 및 lamma 3.2:3b 설치

* 데이터 파이프라인 도식화
원본 CSV
    │
    ▼
① 데이터 읽기
    │
    ▼
② 데이터 검사
(결측치, 인코딩)
    │
    ▼
③ 데이터 정리
(전처리)
    │
    ▼
④ SQLite 저장
    │
    ▼
⑤ RAG 문서 생성

## 4일차

* React + Vite 기반 프론트엔드에서 FastAPI `/analyze` API를 호출해 AI 분석 결과를 표시하는 흐름을 점검
* `App.jsx`, `InputForm.jsx`, `ResultCard.jsx`, `SourceCard.jsx`를 중심으로 사용자 입력 → 분석 요청 → 결과 출력 구조를 정리
* `ResultCard`에 `answer`, `matched_skills`, `missing_skills`, `recommended_projects`, `confidence` 값을 props로 전달하도록 연결
* `InputForm`의 보유 스킬 입력 라벨을 다듬고 프론트 입력 흐름을 정리
* AI 분석 결과가 한 줄로 붙어 보이던 문제를 수정해 `1. 현재 역량 평가`, `2. 추천 공고`, `3. 부족한 역량 및 준비 방향`이 줄바꿈되어 표시되도록 개선
* Mistral API를 실제로 연동해 `/analyze` 응답을 테스트하고 1차 벤치마크를 기록
* Hugging Face `Qwen/Qwen2.5-0.5B-Instruct` 모델 연동 테스트를 진행하고 provider 설정 문제를 확인 및 수정
* `HUGGINGFACE_PROVIDER` 환경변수를 추가해 Hugging Face Inference Provider를 지정할 수 있도록 보완
* `MODEL_BENCHMARK.md`에 Mistral, Hugging Face Qwen, Ollama, Mock Response 비교 결과를 정리
* Gemini는 Google AI Studio 기준 일일 요청 한도 초과(RPD 21/20) 상태를 확인하고 다음 날 재테스트하기로 정리
* `.codex/development_log.md`에 오늘 작업 내용과 현재 모델 비교 결론을 최신화

  * 현재 AI 분석 흐름 정리
  사용자 입력
      │
      ▼
  React + Vite 프론트엔드
  (InputForm)
      │
      ▼
  FastAPI `/analyze` 요청
      │
      ▼
  RAG 검색
  (관련 공고 3개 조회)
      │
      ▼
  LLM 응답 생성
  (Mistral / Hugging Face / Mock 비교)
      │
      ▼
  결과 카드 표시
  (ResultCard, SourceCard)
      │
      ▼
  줄바꿈 가독성 개선