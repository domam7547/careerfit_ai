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
| 프론트엔드 | React, 햣 Vite |
| 실행 환경 | Docker |
## 진행 현황

- [v] 1일차: 프로젝트 기획 및 개발 환경 세팅
- [v] 2일차: FastAPI 서버 구축 및 Gemini API 연결
- [ ] 3일차: 데이터 파이프라인 구축
- [ ] 4일차: RAG 기반 서비스 + React UI
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
