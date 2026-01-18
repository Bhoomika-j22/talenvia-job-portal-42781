import React, { useMemo, useState } from "react";
import { apiClient } from "../services/apiClient";
import { Badge, Button, Card, InlineAlert } from "../components/ui";

const DEMO_TESTS = [
  {
    id: "react-basics",
    title: "React Basics",
    difficulty: "Easy",
    minutes: 12,
    topics: ["Components", "Props/State", "Hooks"],
    questions: [
      {
        id: "q1",
        prompt: "Which hook is used to manage local state in a functional component?",
        options: ["useMemo", "useState", "useRef", "useEffect"],
        answerIndex: 1,
      },
      {
        id: "q2",
        prompt: "What prop helps React identify items in a list for efficient updates?",
        options: ["id", "index", "key", "name"],
        answerIndex: 2,
      },
      {
        id: "q3",
        prompt: "Which hook is best for synchronizing with external systems (e.g., subscriptions)?",
        options: ["useEffect", "useCallback", "useLayoutEffect", "useContext"],
        answerIndex: 0,
      },
    ],
  },
  {
    id: "javascript-core",
    title: "JavaScript Core",
    difficulty: "Medium",
    minutes: 15,
    topics: ["Closures", "Async", "Arrays"],
    questions: [
      {
        id: "q1",
        prompt: "What does Array.prototype.map return?",
        options: ["A mutated array", "A new array", "A boolean", "A promise"],
        answerIndex: 1,
      },
      {
        id: "q2",
        prompt: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "function", "const"],
        answerIndex: 1,
      },
      {
        id: "q3",
        prompt: "What does await do?",
        options: [
          "Blocks the entire JS runtime",
          "Pauses function execution until a promise resolves/rejects",
          "Converts callbacks to promises",
          "Runs code in parallel threads",
        ],
        answerIndex: 1,
      },
    ],
  },
];

// PUBLIC_INTERFACE
export default function MockTestsPage() {
  /** Mock tests workflow: pick a test, answer questions, view results. */
  const [selectedId, setSelectedId] = useState(DEMO_TESTS[0].id);
  const [step, setStep] = useState("pick"); // pick | take | result
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const selected = useMemo(
    () => DEMO_TESTS.find((t) => t.id === selectedId) || DEMO_TESTS[0],
    [selectedId]
  );

  const total = selected.questions.length;

  const score = useMemo(() => {
    let correct = 0;
    selected.questions.forEach((q) => {
      if (answers[q.id] === q.answerIndex) correct += 1;
    });
    return { correct, total, pct: Math.round((correct / total) * 100) };
  }, [answers, selected.questions, total]);

  const startTest = () => {
    setAnswers({});
    setSubmitStatus(null);
    setStep("take");
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = {
        testId: selected.id,
        answers,
        score,
        completedAt: new Date().toISOString(),
      };

      await apiClient.submitMockTestAttempt(selected.id, payload);
      setSubmitStatus({ tone: "success", message: "Attempt submitted (backend synced)." });
    } catch (e) {
      setSubmitStatus({
        tone: "warning",
        message:
          e.code === "API_BASE_NOT_CONFIGURED"
            ? "Attempt saved locally. Configure API base to sync results."
            : `Attempt saved locally, but backend sync failed: ${e.message}`,
      });
    } finally {
      setSubmitting(false);
      setStep("result");
    }
  };

  return (
    <div className="tv-grid">
      <Card
        title="Mock Tests"
        subtitle="Practice with fast, focused quizzes. Track improvement over time."
        actions={
          <div className="tv-row tv-row--gap">
            <Badge tone="primary">Neon Mode</Badge>
            <Badge tone="secondary">Instant Feedback</Badge>
          </div>
        }
      >
        {step === "pick" && (
          <div className="tv-tests">
            <div className="tv-tests__list">
              {DEMO_TESTS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`tv-test-item ${t.id === selectedId ? "is-active" : ""}`}
                  onClick={() => setSelectedId(t.id)}
                >
                  <div className="tv-test-item__title">{t.title}</div>
                  <div className="tv-test-item__meta">
                    <span className="tv-muted">{t.minutes} min</span>
                    <span className="tv-dot">•</span>
                    <span className="tv-muted">{t.difficulty}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="tv-tests__detail">
              <div className="tv-h2" style={{ margin: 0 }}>
                {selected.title}
              </div>
              <div className="tv-row tv-row--gap tv-row--wrap" style={{ marginTop: 8 }}>
                {selected.topics.map((topic) => (
                  <Badge key={topic} tone="neutral">
                    {topic}
                  </Badge>
                ))}
              </div>
              <p className="tv-muted" style={{ marginTop: 10 }}>
                Answer {selected.questions.length} questions. Results show immediately after submit.
              </p>
              <div className="tv-row tv-row--gap">
                <Button variant="secondary" onClick={startTest}>
                  Start Test
                </Button>
                <Button variant="ghost" onClick={() => alert("History placeholder: show previous attempts.")}>
                  View History
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "take" && (
          <div className="tv-take">
            <InlineAlert tone="info" title="Test in progress">
              Select one option per question, then submit to see your score.
            </InlineAlert>

            <div className="tv-questions">
              {selected.questions.map((q, idx) => (
                <div key={q.id} className="tv-question">
                  <div className="tv-question__prompt">
                    <span className="tv-muted">Q{idx + 1}/{total}</span>
                    <div className="tv-question__text">{q.prompt}</div>
                  </div>

                  <div className="tv-question__options">
                    {q.options.map((opt, oi) => {
                      const chosen = answers[q.id] === oi;
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`tv-option ${chosen ? "is-chosen" : ""}`}
                          onClick={() => setAnswers((s) => ({ ...s, [q.id]: oi }))}
                        >
                          <span className="tv-option__bullet" aria-hidden="true" />
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="tv-row tv-row--gap tv-row--end">
              <Button variant="ghost" onClick={() => setStep("pick")} disabled={submitting}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={submit} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Answers"}
              </Button>
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="tv-result">
            {submitStatus && (
              <div style={{ marginBottom: 12 }}>
                <InlineAlert
                  tone={submitStatus.tone === "success" ? "success" : submitStatus.tone}
                  title="Submission"
                >
                  {submitStatus.message}
                </InlineAlert>
              </div>
            )}

            <div className="tv-score">
              <div className="tv-score__ring">
                <div className="tv-score__pct">{score.pct}%</div>
                <div className="tv-muted">
                  {score.correct}/{score.total} correct
                </div>
              </div>

              <div className="tv-score__advice">
                <div className="tv-h2" style={{ margin: 0 }}>
                  Results
                </div>
                <p className="tv-muted">
                  Use this as a quick signal. Repeat tests and track patterns—speed + accuracy wins.
                </p>
                <div className="tv-row tv-row--gap">
                  <Button variant="secondary" onClick={startTest}>
                    Retry
                  </Button>
                  <Button variant="ghost" onClick={() => setStep("pick")}>
                    Pick Another Test
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
