import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import "./FashionQuizPage.css";

const FashionQuizPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  /* ================= QUESTIONS ================= */
  const questions = [
    {
      id: 1,
      title: "What's your lifestyle like?",
      subtitle: "Select the option that best matches your daily routine",
      type: "single",
      options: [
        { id: "corporate", title: "Corporate", desc: "Office & meetings", icon: "💼" },
        { id: "creative", title: "Creative", desc: "Artistic & flexible", icon: "🎨" },
        { id: "casual", title: "Casual", desc: "Comfort focused", icon: "🏠" },
        { id: "social", title: "Social", desc: "Events & outings", icon: "🎉" },
      ],
    },
    {
      id: 2,
      title: "Your style personality?",
      subtitle: "You can select multiple options",
      type: "multiple",
      options: [
        { id: "minimalist", title: "Minimalist", icon: "⚪" },
        { id: "bohemian", title: "Bohemian", icon: "🌸" },
        { id: "classic", title: "Classic", icon: "👔" },
        { id: "edgy", title: "Edgy", icon: "⚡" },
      ],
    },
    {
      id: 3,
      title: "Color preferences",
      subtitle: "Choose palettes you love",
      type: "multiple",
      options: [
        { id: "neutrals", title: "Neutrals", color: "#EDE7DC" },
        { id: "earth", title: "Earth tones", color: "#C19A6B" },
        { id: "jewel", title: "Jewel tones", color: "#4B0082" },
        { id: "pastels", title: "Pastels", color: "#F4C2C2" },
      ],
    },
  ];

  /* ================= EFFECTS ================= */
  useEffect(() => {
    setProgress(((currentIndex + 1) / questions.length) * 100);
  }, [currentIndex]);

  /* ================= HELPERS ================= */
  const currentQ = questions[currentIndex];

  const isSelected = (qid, oid) =>
    answers[qid]?.includes(oid);

  const handleSelect = (qid, oid, type) => {
    setAnswers((prev) => {
      if (type === "single") return { ...prev, [qid]: [oid] };

      const current = prev[qid] || [];
      return current.includes(oid)
        ? { ...prev, [qid]: current.filter((x) => x !== oid) }
        : { ...prev, [qid]: [...current, oid] };
    });
  };

  const canNext = answers[currentQ.id]?.length > 0;

  const next = () =>
    currentIndex < questions.length - 1
      ? setCurrentIndex((p) => p + 1)
      : setShowResults(true);

  const prev = () => currentIndex > 0 && setCurrentIndex((p) => p - 1);

  const restart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  /* ================= RESULTS ================= */
  if (showResults) {
    return (
      <section className="quiz-results">
        <Sparkles className="result-icon" />
        <h1>Your Style Profile</h1>

        <div className="tags">
          {Object.entries(answers).flatMap(([qid, opts]) =>
            opts.map((opt) => (
              <span key={qid + opt} className="tag">{opt}</span>
            ))
          )}
        </div>

        <button className="btn primary">View Recommendations</button>
        <button className="btn ghost" onClick={restart}>
          <RotateCcw size={16} /> Retake Quiz
        </button>
      </section>
    );
  }

  /* ================= QUIZ ================= */
  return (
    <section className="quiz">
      <div className="progress">
        <div className="bar" style={{ width: `${progress}%` }} />
        <span>{currentIndex + 1} / {questions.length}</span>
      </div>

      <h1>{currentQ.title}</h1>
      <p className="subtitle">{currentQ.subtitle}</p>

      <div className="options">
        {currentQ.options.map((opt) => (
          <div
            key={opt.id}
            className={`card ${isSelected(currentQ.id, opt.id) ? "active" : ""}`}
            onClick={() => handleSelect(currentQ.id, opt.id, currentQ.type)}
          >
            {opt.color
              ? <span className="color" style={{ background: opt.color }} />
              : <span className="icon">{opt.icon}</span>}
            <h3>{opt.title}</h3>
            {opt.desc && <p>{opt.desc}</p>}
          </div>
        ))}
      </div>

      <div className="nav">
        <button className="btn ghost" onClick={prev} disabled={currentIndex === 0}>
          <ChevronLeft /> Back
        </button>
        <button className="btn primary" onClick={next} disabled={!canNext}>
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default FashionQuizPage;
