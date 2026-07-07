# Render Frontend Deploy Guide

## 1. 로컬 실행 방법

### 1-1. 백엔드 실행

`backend/.env`에 필요한 값을 넣고 백엔드를 실행한다.

예시:

```env
GEMINI_API_KEY=your_real_gemini_api_key
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000
```

실행:

```bash
cd backend
uvicorn main:app --reload
```

### 1-2. 프론트엔드 실행

기본값은 `http://localhost:8000` 이므로, 별도 `.env` 없이도 로컬 백엔드와 연결된다.

필요하면 `frontend/.env`를 만들어 명시할 수 있다.

```env
VITE_API_BASE_URL=http://localhost:8000
```

실행:

```bash
cd frontend
npm install
npm run dev
```

## 2. 프론트엔드 환경변수 설정

프론트엔드는 `VITE_API_BASE_URL`을 사용한다.

```env
VITE_API_BASE_URL=http://localhost:8000
```

배포 시에는 Render 백엔드 주소로 바꾼다.

```env
VITE_API_BASE_URL=https://your-backend-service.onrender.com
```

프론트 코드에서는 아래 규칙으로 읽는다.

```js
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");
```

## 3. 백엔드 CORS 환경변수 설정

백엔드는 `FRONTEND_ORIGINS`를 쉼표로 나눠 여러 origin을 허용한다.

예시:

```env
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000,https://your-frontend-service.onrender.com
```

기본 로컬 허용 origin:

- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `http://localhost:3000`
- `http://127.0.0.1:3000`

Render 프론트 주소는 `FRONTEND_ORIGINS`에 추가한다.

## 4. 프론트엔드 Dockerfile 설명

`frontend/Dockerfile`은 멀티 스테이지 빌드를 사용한다.

1. `node:20-alpine` 빌드 스테이지에서 `npm ci` 후 `npm run build`
2. 두 번째 스테이지에서 `serve`로 `dist/` 정적 파일 서빙
3. Render Web Service의 기본 포트인 `PORT` 환경변수를 읽어 `0.0.0.0`에 바인딩

또한 Render의 Docker 배포에서는 서비스 환경변수가 Docker build argument로도 전달될 수 있으므로, `VITE_API_BASE_URL`을 빌드 시점에 받을 수 있게 `ARG`를 선언해 두었다.

참고:

- Render Docker docs: https://render.com/docs/docker
- Render Web Services docs: https://render.com/docs/web-services
- Render Environment Variables docs: https://render.com/docs/configure-environment-variables
- Render Monorepo docs: https://render.com/docs/monorepo-support

## 5. Render에서 프론트엔드를 Docker 기반 Web Service로 배포하는 과정

### 5-1. 사전 준비

- 백엔드 Render Web Service가 먼저 배포되어 있어야 한다.
- 백엔드 주소 예시: `https://your-backend-service.onrender.com`

### 5-2. Render에서 새 Web Service 생성

1. Render Dashboard에서 `New > Web Service` 선택
2. GitHub 저장소 연결
3. 이 저장소가 모노레포라면 `Root Directory`를 `frontend`로 설정
4. `Language`는 `Docker` 선택
5. `Dockerfile Path`는 `Dockerfile`로 설정

`Root Directory`를 설정하지 않는다면, `frontend/Dockerfile` 경로와 `frontend` 빌드 컨텍스트를 직접 맞춰야 한다.

### 5-3. 프론트엔드 환경변수 입력

Render 프론트 서비스의 `Environment`에 아래 값을 넣는다.

```env
VITE_API_BASE_URL=https://your-backend-service.onrender.com
```

중요:

- Vite 환경변수는 빌드 결과물에 포함되므로 값 변경 시 `Save, rebuild, and deploy`를 선택하는 것이 안전하다.

### 5-4. 배포 시작

설정을 저장하고 배포를 시작한다.

정상 배포되면 Render가 프론트용 `onrender.com` 주소를 발급한다.

## 6. Render 환경변수 설정값

### 6-1. 프론트엔드 Render 서비스

```env
VITE_API_BASE_URL=https://your-backend-service.onrender.com
```

### 6-2. 백엔드 Render 서비스

```env
FRONTEND_ORIGINS=https://your-frontend-service.onrender.com
GEMINI_API_KEY=your_real_gemini_api_key
```

로컬까지 함께 허용하려면 이렇게 넣는다.

```env
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000,https://your-frontend-service.onrender.com
```

## 7. 배포 후 확인 방법

1. 프론트 Render URL 접속
2. 메인 페이지가 정상 표시되는지 확인
3. 입력 폼 작성 후 분석 요청
4. 브라우저 개발자도구 `Network` 탭에서 `/analyze` 요청이 Render 백엔드 주소로 가는지 확인
5. 백엔드 `/health`가 정상 응답하는지 확인

예시:

```bash
curl https://your-backend-service.onrender.com/health
```

## 8. CORS 오류 해결 방법

증상:

- 브라우저 콘솔에 CORS 에러 발생
- `Failed to fetch` 또는 preflight 오류 발생

확인 순서:

1. 백엔드 Render 서비스에 `FRONTEND_ORIGINS`가 정확히 들어갔는지 확인
2. 프론트 Render URL이 `https://...onrender.com` 형태로 정확히 포함됐는지 확인
3. 값 사이에 공백이 들어갔다면 제거
4. 환경변수 수정 후 백엔드를 다시 배포
5. 프론트 `VITE_API_BASE_URL`이 올바른 백엔드 주소인지 확인

주의:

- `allow_origins=["*"]`로 우회하지 않는다.
- 프론트 주소와 백엔드 주소를 서로 혼동하지 않는다.

## 9. Git에 올리면 안 되는 파일 목록

아래 파일은 GitHub에 올리면 안 된다.

- `.env`
- `.env.local`
- `.env.production`
- `backend/.env`
- 실제 API Key가 들어 있는 어떤 환경파일도 포함

Git에 올려도 되는 예시 파일:

- `.env.example`
- `frontend/.env.example`
- `backend/.env.example`

## 10. 빠른 체크 요약

- 프론트는 `VITE_API_BASE_URL`로 백엔드 주소를 읽는다.
- 백엔드는 `FRONTEND_ORIGINS`로 허용 origin을 읽는다.
- 실제 API 키는 백엔드 Render 환경변수에만 넣는다.
- 프론트에는 API 키를 넣지 않는다.
- Render 프론트 배포 시에는 `Save, rebuild, and deploy`로 다시 빌드한다.
