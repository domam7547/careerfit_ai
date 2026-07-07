# CareerFit AI 최종 확인 체크리스트

최종 점검 기준일: 2026-07-07

## GitHub Repository

- [x] `careerfit_ai` Repository가 Public으로 설정되어 있는가?
- [x] `README.md`가 GitHub에서 정상 렌더링되는가?
- [x] `backend/`, `frontend/`, `docs/` 폴더가 모두 있는가?
- [x] 실제 `.env` 파일이 Repository에 추적되지 않는가?
- [x] `chroma_db/`가 Repository에 추적되지 않는가?
- [x] `backend/` 폴더 안에 `Dockerfile`이 있는가?

## 코드 동작

- [x] `uvicorn`으로 FastAPI 실행 후 `/health` 응답 확인
- [x] `/analyze`가 `sources` 포함 응답을 반환하는가?
- [x] React UI에서 결과 카드와 출처 카드가 출력되는가?
- [x] Docker build가 성공하는가? 
- [x] Docker run 후 `/health` 응답이 오는가?

## 문서

- [x] `README.md`에 실행 방법이 있는가?
- [ ] `docs/` 폴더에 하네스 파일 4개 이상이 있는가?

  이 항목은 현재 구조상 해당되지 않는다.  
  하네스 관련 파일은 `docs/`가 아니라 `careerfit-ai/harness/` 아래에 정리되어 있다.

- [x] 구현하지 않은 기능이 `"향후 개선"`으로 분리되어 있는가?

## 보안

- [x] `.gitignore`에 `.env`가 있는가?
- [x] 코드 어디에도 API Key가 직접 포함되어 있지 않은가?
- [x] `.env.example` 파일이 있는가?

## 메모

- 로컬 실행 방법은 `README.md`에 정리되어 있다.
- 프론트 Render 주소와 백엔드 Render 주소는 정상 연결을 확인했다.
- `/health` 한글 인코딩 문제는 영문 메시지로 수정 후 해결했다.
