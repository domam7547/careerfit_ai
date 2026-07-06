function ResultCard({
  answer,
  matchedSkills = [],
  missingSkills = [],
  recommendedProjects = [],
  confidence,
}) {
  const answerLines = typeof answer === "string"
    ? answer
        .replace(/\\n/g, "\n")
        .replace(/\s+(?=(1\.|2\.|3\.)\s)/g, "\n")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  function formatLine(line) {
    return line.replace(/\*\*/g, "");
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">CareerFit AI Analysis</p>
          <h2 className="text-lg font-semibold text-gray-900">AI 분석 결과</h2>
        </div>
        {confidence != null && (
          <span className="inline-flex shrink-0 items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            신뢰도 {confidence}%
          </span>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
        <p className="text-sm font-semibold text-gray-900 mb-3">요약</p>
        <div className="space-y-3 text-base leading-7 text-gray-700 break-words">
          {answerLines.map((line, index) => (
            <p key={`${line}-${index}`}>
              {formatLine(line)}
            </p>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-500 leading-6">
          발표할 때는 아래 출처 카드와 함께 설명하면 분석 근거를 더 신뢰감 있게 전달할 수 있습니다.
        </p>
      </div>

      {(matchedSkills.length > 0 || missingSkills.length > 0 || recommendedProjects.length > 0) && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">추가 구조화 데이터</h3>
          <p className="text-sm text-gray-600 mb-3">
            백엔드 응답이 확장되면 아래 항목도 자동으로 함께 표시할 수 있습니다.
          </p>

          <div className="space-y-3">
            {matchedSkills.length > 0 && (
              <div>
                <p className="text-sm font-medium text-emerald-700 mb-2">잘 맞는 역량</p>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm text-emerald-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {missingSkills.length > 0 && (
              <div>
                <p className="text-sm font-medium text-amber-700 mb-2">보완할 역량</p>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-amber-200 bg-white px-3 py-1 text-sm text-amber-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {recommendedProjects.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">추천 프로젝트</p>
                <div className="space-y-2">
                  {recommendedProjects.map((project, index) => (
                    <div
                      key={`${project}-${index}`}
                      className="rounded-lg border border-gray-200 bg-white p-3 text-sm leading-6 text-gray-700"
                    >
                      {project}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default ResultCard;
