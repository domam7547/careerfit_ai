# backend/main.py
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import health
from routers import jobs
from routers import analyze

load_dotenv()

DEFAULT_FRONTEND_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


def get_allowed_origins() -> list[str]:
    origins = list(DEFAULT_FRONTEND_ORIGINS)
    extra_origins = os.getenv("FRONTEND_ORIGINS", "")

    if not extra_origins.strip():
        return origins

    for origin in extra_origins.split(","):
        cleaned = origin.strip()
        if cleaned and cleaned not in origins:
            origins.append(cleaned)

    return origins

# FastAPI 앱 객체 생성
# title과 version은 /docs 페이지에 표시된다
app = FastAPI(
title="CareerFit AI",
description="취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치",
version="0.1.0"
)
# CORS 설정: 로컬 프론트엔드와 Render 프론트엔드 origin을 허용한다.
# FRONTEND_ORIGINS는 쉼표로 여러 origin을 받을 수 있다.
app.add_middleware(
CORSMiddleware,
allow_origins=get_allowed_origins(),
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)
# 라우터 등록
app.include_router(health.router) 
app.include_router(jobs.router) 
app.include_router(analyze.router)
# 라우터 등록은 실습 4·5·6에서 추가한다
@app.get("/")
def root():
    return {"message": "CareerFit AI 서버가 실행 중입니다."}
