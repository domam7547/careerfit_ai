# backend/routers/jobs.py
from fastapi import APIRouter
from typing import List
router = APIRouter()

# 목업 데이터: 3일차에 실제 CSV 데이터로 교체한다
MOCK_JOBS = [
    {
        "id": 1,
        "company": "네이버",
        "title": "데이터 분석가",
        "required_skills": ["Python", "SQL", "Excel"],
        "preferred_skills": ["Tableau", "A/B 테스트", "R"],
        "description": "검색·커머스 서비스의 사용자 행동 로그를 분석해 핵심 지표를 설계하고 개선안을 도출합니다. 통계학 기반의 가설 검정과 코호트 분석을 통해 데이터 기반 의사결정을 지원합니다.",
        "deadline": "2026-08-31"
    },
    {
        "id": 2,
        "company": "카카오",
        "title": "데이터 분석가",
        "required_skills": ["Python", "SQL", "통계 분석"],
        "preferred_skills": ["Spark", "Airflow", "Looker"],
        "description": "카카오톡·페이 등 주요 서비스의 KPI를 모니터링하고 이상 패턴을 탐지합니다. 대용량 데이터 파이프라인과 연계해 분석 리포트를 정기적으로 작성·공유합니다.",
        "deadline": "2026-08-31"
    },
    {
        "id": 3,
        "company": "토스",
        "title": "데이터 분석가",
        "required_skills": ["Python", "SQL", "Pandas"],
        "preferred_skills": ["dbt", "BigQuery", "Git"],
        "description": "금융 서비스 이용 데이터를 분석해 전환율·이탈률 등 핵심 지표를 관리합니다. 실험 설계와 결과 해석을 통해 프로덕트 개선에 필요한 인사이트를 제공합니다.",
        "deadline": "2026-08-31"
    }
]

@router.get("/jobs", tags=["Jobs"])
def get_jobs():
    """
    취업 공고 목록을 반환하는 엔드포인트.
    현재는 목업 데이터를 반환하며, 3일차에 실제 데이터로 교체한다.
    """
    return {
        "count": len(MOCK_JOBS),
        "jobs": MOCK_JOBS
    }

@router.get("/jobs/{job_id}", tags=["Jobs"])
def get_job_by_id(job_id: int):
    """
    특정 공고의 상세 정보를 반환한다.
    """
    for job in MOCK_JOBS:
        if job["id"] == job_id:
            return job
    # 찾지 못한 경우
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail=f"공고 ID {job_id}를 찾을 수 없습니다.")