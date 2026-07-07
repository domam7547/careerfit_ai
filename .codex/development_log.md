# Development Log

## 2026-07-03

### 이번 세션에서 한 작업
- `.codex/project-guide.md`를 읽고 작업 원칙과 세션 시작 규칙을 확인했다.
- `README.md`를 읽고 프로젝트 목적, 기술 스택, 현재 진행 현황을 파악했다.
- 현재 작업 범위를 `careerfit_ai` 폴더로 제한하기로 정리했다.
- 프로젝트가 AI 기반 취업 포트폴리오 및 커리어 코칭 서비스라는 점을 요약했다.

### 현재 파악한 프로젝트 상태
- FastAPI 기반 백엔드 구조가 이미 존재한다.
- Gemini 연동 관련 백엔드 코드가 포함되어 있다.
- 문서 기준으로 2일차까지는 완료 상태다.
- 이후 주요 작업은 데이터 파이프라인, RAG 서비스, React UI, Docker 정리다.

### 메모
- 이후 작업은 `project-guide.md`의 답변 원칙과 보안 원칙을 우선 적용한다.
- 여러 파일 수정이 필요한 경우에는 수정 이유, 대상 파일, 예상 영향을 먼저 설명한 뒤 진행한다.

## 2026-07-06

### 이번 세션에서 한 작업
- `.codex/project-guide.md`, `README.md`, `docs/PROJECT_PLAN.md`를 다시 읽고 현재 상태를 점검했다.
- `backend/data/rag_documents.json`을 메타데이터 확장 전 백업했다.
  - 백업 파일: `backend/data/rag_documents.backup.json`
- `backend/data/preprocess.py`를 점검했고, 실행 결과 생성된 `rag_documents.json`의 메타데이터를 확인했다.
  - 현재 `deadline_month`, `is_startup`, `first_saved_date`가 들어간 상태다.
  - 다만 `deadline_month`는 문자열이고, 일부 `deadline`은 형식 불일치 또는 `nan` 문자열 문제가 있었다.
- ChromaDB 설치/저장 상태를 확인했다.
  - `backend/requirements.txt`에 `chromadb==0.5.23` 존재
  - `backend/chroma_db/chroma.sqlite3` 및 내부 디렉터리 생성 확인
- RAG 연결 흐름을 정리했다.
  - `backend/services/rag_service.py` 생성/사용
  - `backend/services/llm_service.py`를 RAG 프롬프트 + provider 분기 + Ollama 통합 구조로 정리
  - `backend/routers/analyze.py`를 `search_documents -> get_llm_response` 흐름으로 연결
- 프론트엔드 `frontend/` 폴더 구조를 점검했다.
  - 처음에는 React/Vite 스캐폴드로 보였으나, 이후 실제 `InputForm`, `ResultCard`, `SourceCard` 기반 API 연동 UI가 존재함을 확인했다.
- `careerfit-ai/` 폴더를 조사했다.
  - 실행용 앱 코드가 아니라 AI 참조용 하네스/가이드 문서 폴더임을 확인했다.
- `MODEL_BENCHMARK.md`를 생성/보강했다.
  - 1차 평가 대상 모델을 정리
  - Mock Response 1차 평가 기록 추가
  - Ollama `llama3.2:3b` 1차 평가 기록 추가
- 하네스 기준으로 UI 작업을 수행했다.
  - 참조한 파일:
    - `careerfit-ai/harness/MAIN_HARNESS.md`
    - `careerfit-ai/harness/ROUTING.md`
    - `careerfit-ai/harness/agents/ui-designer.md`
    - `careerfit-ai/harness/skills/design-skill.md`
    - `careerfit-ai/harness/checks/security-check.md`
  - 주의: 요청받은 `careerfit-ai/harness/checks/ui-test-check.md`는 실제 파일이 없었다.

### 백엔드 관련 현재 상태
- `backend/services/llm_service.py`
  - `.env`의 `LLM_MODEL`을 기준으로 `gemini`, `mistral`, `ollama`, `huggingface` 분기 구조를 가짐
  - `MOCK_MODE=true`이면 실제 API 호출 없이 mock 응답 반환
  - Ollama 호출 함수는 통합되어 있고 기존 `ollama_service.py` 역할을 흡수한 구조
- `backend/services/rag_service.py`
  - ChromaDB 컬렉션을 가져오고 비어 있으면 `rag_documents.json`을 다시 로드
  - `search_documents(query, n_results, job_type=None)` 형태
  - `where_filter`로 `job_type` 필터 지원
- `backend/routers/analyze.py`
  - 현재 `context_docs = search_documents(query, n_results=3)`로 호출
  - `job_type` 필터는 아직 analyze 경로에서 사용하지 않음
- 런타임 검증 상태
  - 문법 검사는 통과
  - Uvicorn 실행 및 `POST /analyze` 200 OK 확인
  - ChromaDB telemetry 경고는 있으나 기능 자체는 동작함
  - Codex 환경에서는 ONNX 임시 디렉터리 제약 때문에 Chroma query가 실패했지만, 사용자 로컬 환경에서는 성공

### 벤치마크 관련 현재 상태
- `MODEL_BENCHMARK.md`는 프로젝트 루트에 존재
- 현재 기록된 1차 평가
  - Mock Response
  - Ollama `llama3.2:3b`
- Gemini
  - API 한도 초과로 실제 벤치마크 중단 상태
- Mistral
  - `LLM_MODEL=mistral-small-latest` 사용을 검토했으나, API 과금 가능성이 있어 실제 테스트는 보류
- Hugging Face
  - 후보에서 논의했으나 아직 실측하지 않음

### 프론트엔드 관련 현재 상태
- 수정 파일
  - `frontend/src/App.jsx`
  - `frontend/src/components/InputForm.jsx`
  - `frontend/src/components/ResultCard.jsx`
- `App.jsx`
  - `ResultCard`에 `answer`, `matched_skills`, `missing_skills`, `recommended_projects`, `confidence`를 props로 넘기도록 변경
- `InputForm.jsx`
  - `"보유 스킬 (쉼표 구분)"` 라벨을 `"보유 스킬"`로 수정
- `ResultCard.jsx`
  - 발표용 표시를 위해 여러 차례 수정
  - 최종 방향은 `design-skill.md` 기준으로 과한 장식을 줄이고, 회색 중심의 깔끔한 카드 톤으로 정리
  - 현재 `answer`를 `formattedAnswer`로 가공해서 렌더링
    - `\\n` -> 실제 개행 문자 치환
    - 숫자 목록 `1.`, `2.`, `3.` 앞에 개행을 넣으려는 보정 로직 추가
- 중요한 현재 문제
  - 사용자가 확인한 결과, `answer`의 `1.`, `2.`, `3.` 줄바꿈이 여전히 기대대로 보이지 않음
  - 즉 `ResultCard.jsx`의 줄바꿈 보정 로직은 아직 미해결 상태
  - 다음 세션에서는 이 문제를 우선 디버깅해야 함

### 사용자가 중요하게 밝힌 제약/선호
- `project-guide.md`를 반드시 따를 것
- 여러 파일 수정 전에는 이유/대상/영향을 설명할 것
- `.env`는 읽지 말 것
- React 작업에서는 backend를 수정하지 말 것
- API Key를 React 코드에 넣지 말 것
- 전체 코드를 다시 쓰기보다 수정 방향과 필요한 코드 조각을 선호하지만, 명시적으로 요청하면 직접 수정 가능

### Git/작업 트리 상태 메모
- 세션 중 사용자 커밋이 여러 번 있었다.
- 현재 확인된 워킹 트리 변경:
  - 수정됨: `.gitignore`
  - 수정됨: `frontend/src/App.jsx`
  - 수정됨: `frontend/src/components/InputForm.jsx`
  - 수정됨: `frontend/src/components/ResultCard.jsx`
  - 미추적: `MODEL_BENCHMARK.md`
- 커밋 메시지는 사용자 요청 시 한국어/영어 모두 여러 차례 추천했다.

### 다음 세션 우선 작업
1. `ResultCard.jsx`에서 `answer` 번호 목록 줄바꿈이 실제 화면에 반영되지 않는 원인 확인
2. 필요하면 `answer`를 문단 배열로 변환해 렌더링하는 방식으로 변경
3. 이후 모델 벤치마크는 비용 없는 후보(Mock, Ollama) 중심으로 계속 진행
4. Gemini는 한도 복구 전까지 보류

### 같은 날 추가 작업
- 프론트 `ResultCard.jsx`의 줄바꿈 보정 시도를 잠시 진행했지만, 사용자가 벤치마크 우선으로 방향을 바꿔 해당 수정은 보류했다.
- `/analyze` 지연 원인을 확인하려고 `backend/routers/analyze.py`에 시간 측정 로그를 잠시 추가했다가, 사용자 요청에 따라 다시 원래 상태로 복구했다.
- ChromaDB 경고 로그를 다시 점검했다.
  - `Failed to send telemetry event ... capture() takes 1 positional argument but 3 were given`는 실제 검색 실패가 아니라 telemetry 전송 경고임을 확인했다.
  - Codex 환경에서의 실제 검색 실패 원인은 별도로 `onnxruntime` 임시 작업 디렉터리 제약이었다.
- Gemini 상태를 다시 확인했다.
  - 사용자 확인 기준 Google AI Studio에서 `RPD 21/20` 상태였고, 2026-07-06 기준 일일 요청 한도 초과로 판단했다.
  - 따라서 Gemini 실측 벤치마크는 다음 날 다시 진행하기로 정리했다.
- Mistral 벤치마크를 실제로 진행했다.
  - `mistral-small-latest`로 `/analyze` 응답을 받아 1차 평가를 완료했다.
  - 첫 테스트 기준 한국어 품질, 구조화, 직무 적합성이 가장 안정적이어서 당시 기준 기본 LLM 잠정 1순위로 정리했다.
- Hugging Face 벤치마크를 실제로 진행했다.
  - 후보를 `Qwen/Qwen2.5-0.5B-Instruct`로 확정했다.
  - 처음에는 `The requested model ... is not supported by any provider you have enabled.` 오류가 발생했다.
  - 원인은 Hugging Face `Inference Providers` 라우팅 문제로 판단했고, `backend/services/llm_service.py`가 `HUGGINGFACE_PROVIDER` 환경변수를 읽도록 보강했다.
  - `.env.example`도 `HUGGINGFACE_TOKEN`, `HUGGINGFACE_PROVIDER=featherless-ai`, `LLM_MODEL=huggingface:Qwen/Qwen2.5-0.5B-Instruct` 예시를 반영하도록 수정했다.
  - 이후 연결에는 성공했지만, 실제 답변 품질은 Mistral보다 낮고 기본 답변 모델로 쓰기엔 부족하다고 평가했다.
- `MODEL_BENCHMARK.md`를 추가 보강했다.
  - Mistral `mistral-small-latest` 1차 평가 기록 추가
  - Hugging Face `Qwen/Qwen2.5-0.5B-Instruct` 1차 평가 기록 추가
  - 비교표와 최종 선택 기록을 최신 상태로 갱신

### 추가 작업 후 현재 판단
- 현재까지의 1차 비교 기준:
  - `Mistral mistral-small-latest`가 가장 안정적
  - `Hugging Face Qwen/Qwen2.5-0.5B-Instruct`는 연결 확인 및 저비용 비교용으로는 의미가 있지만 기본 모델로는 부족
  - `Ollama llama3.2:3b`는 로컬 실습용 보조 후보
  - `Mock Response`는 fallback 및 시스템 검증용
- Gemini는 성능 비교 기준점으로 중요하지만, 2026-07-06에는 한도 초과로 재검증이 불가능했다.

### 다음 세션 우선 작업 업데이트
1. Gemini 일일 한도 복구 후 같은 질문 세트로 다시 실측한다.
2. Mistral에 2~3개 추가 질문을 넣어 일관성을 확인한다.
3. 필요하면 Hugging Face의 다른 소형 instruct 모델도 비교 후보로 추가한다.
4. 프론트 `ResultCard.jsx` 줄바꿈 문제는 벤치마크 정리 후 다시 디버깅한다.

### 같은 날 마무리 작업
- 프론트 `ResultCard.jsx` 줄바꿈 문제를 다시 수정했다.
  - 기존에는 `whitespace-pre-line`과 문자열 치환에만 기대고 있어 응답 형식이 조금만 흔들려도 한 줄처럼 보일 수 있었다.
  - 최종적으로는 `answer` 문자열을 줄 배열로 분리하고, 각 줄을 별도 `<p>` 요소로 렌더링하도록 변경했다.
  - `1.`, `2.`, `3.` 번호 앞 공백도 줄바꿈으로 바꾼 뒤 배열 렌더링하도록 정리했다.
  - 사용자 확인 결과 줄바꿈 표시가 정상 동작함을 확인했다.
- Git 상태도 다시 확인했다.
  - `Add benchmark results for Mistral and Qwen` 커밋은 `origin/main`과 같은 커밋을 가리키는 상태로 확인되어, 로컬 기준 푸시는 완료된 것으로 판단했다.
  - 다만 프론트/UI 관련 수정과 일부 기타 변경은 아직 워킹 트리에 남아 있다.

### 최종 정리
- 오늘 세션 종료 시점 기준
  - 모델 벤치마크 문서와 개발 로그는 최신화됨
  - Mistral, Hugging Face Qwen 1차 비교 기록 반영 완료
  - `ResultCard.jsx` 줄바꿈 문제 해결 완료
  - Gemini는 다음 날 한도 복구 후 재실측 예정

### 다음 세션 우선 작업 최종 업데이트
1. Gemini 일일 한도 복구 후 동일 질문 세트로 실측한다.
2. Mistral에 추가 질문을 넣어 일관성을 검증한다.
3. 필요하면 Hugging Face의 다른 소형 instruct 모델을 비교 후보로 추가한다.
4. 남아 있는 프론트/UI 변경과 기타 변경의 커밋 범위를 정리한다.

## 2026-07-07

### 이번 세션에서 한 작업
- 프론트엔드 스타일 상태를 다시 점검했다.
  - `frontend/src/index.css`에 `@tailwind` 지시문이 있었지만, 실제 Tailwind 설정 파일과 패키지 연결이 없다는 점을 확인했다.
- 사용자가 직접 `frontend/`에서 Tailwind CSS v3를 설치했다.
  - 실행 명령:
    - `npm install -D tailwindcss@3 postcss autoprefixer`
    - `npx tailwindcss init -p`
- 이후 최소 설정 복구를 진행했다.
  - 수정 파일:
    - `frontend/tailwind.config.js`
    - `frontend/vite.config.js`
  - 내용:
    - `tailwind.config.js`의 `content` 경로를 `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`로 설정
    - `vite.config.js`를 `defineConfig({ plugins: [react()] })` 형태로 정상화
- 프론트 빌드 검증을 다시 실행했다.
  - `npm run build` 통과
  - 이전처럼 raw `@tailwind` 경고가 나오지 않고 CSS 번들이 정상 생성됨
- 사용자가 실제 화면을 확인했고, 현재 UI가 “깔끔하니 괜찮다”고 판단했다.
- 이후 5일차 Docker 작업으로 넘어가기 전에 Gemini 벤치마크를 다시 진행했다.
  - 사용자가 `/analyze` 실제 응답 JSON을 공유했고, 해당 응답을 기준으로 `MODEL_BENCHMARK.md`를 갱신했다.
  - Gemini 2.5 Flash-Lite 1차 평가 기록 추가
  - 비교표 갱신
  - 기본 LLM 잠정 선택을 `Gemini 2.5 Flash-Lite`로 업데이트

### 오늘 기준 현재 판단
- 프론트엔드는 현재 유지 가능한 상태다.
  - Tailwind CSS v3 설정이 정상 복구되었고, 실제 화면 확인도 완료했다.
- Gemini 2.5 Flash-Lite는 현재까지의 1차 비교 기준에서 가장 강한 기본 LLM 후보다.
  - 한국어 자연스러움
  - 직무 적합성
  - 사용자 맥락 반영
  - 실행 가능한 조언
  위 항목에서 가장 안정적인 응답을 보였다.
- 다만 Gemini는 무료 사용 시 일일 한도 제한이 있으므로 보조 후보를 계속 유지해야 한다.
  - 대체 API 후보: `mistral-small-latest`
  - fallback 후보: `Mock Response`

### 현재 Git 상태 메모
- 이번 세션 종료 시점 기준 변경 파일:
  - 수정됨: `MODEL_BENCHMARK.md`
  - 수정됨: `frontend/package.json`
  - 수정됨: `frontend/package-lock.json`
  - 수정됨: `frontend/vite.config.js`
  - 미추적: `frontend/postcss.config.js`
  - 미추적: `frontend/tailwind.config.js`
- 즉 현재 워킹 트리에는
  - 프론트 Tailwind 복구 변경
  - Gemini 벤치마크 문서 갱신
  이 함께 남아 있다.

### 다음 작업 후보
1. Gemini 벤치마크 문서 변경만 별도 커밋할지, 프론트 Tailwind 복구와 함께 묶을지 커밋 범위를 정리한다.
2. 5일차 목표에 맞춰 `backend/compose.yaml`, `.dockerignore`, `README.Docker.md`를 프로젝트 맞춤형으로 정리한다.
3. `docker compose up --build` 기준으로 `/health`, 가능하면 `/analyze`까지 실행 검증한다.
