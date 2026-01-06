import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import "../components/FashionQuizPage.css";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  // ===================== Questions =====================
  const questions = [
    {
      id: 1,
      title: "What's your lifestyle like?",
      subtitle: "Help us understand your daily routine",
      type: "single",
      options: [
        {
          id: "corporate",
          title: "Corporate Professional",
          description: "Office meetings, business events, formal settings",
          icon: "💼",
        },
        {
          id: "creative",
          title: "Creative & Artistic",
          description: "Flexible schedule, creative projects, self-expression",
          icon: "🎨",
        },
        {
          id: "casual",
          title: "Casual & Relaxed",
          description: "Work from home, casual outings, comfort-focused",
          icon: "🏠",
        },
        {
          id: "social",
          title: "Social & Active",
          description: "Events, parties, social gatherings, networking",
          icon: "🎉",
        },
      ],
    },
    {
      id: 2,
      title: "What's your style personality?",
      subtitle: "Choose the styles that resonate with you",
      type: "multiple",
      options: [
        {
          id: "minimalist",
          title: "Minimalist",
          description: "Clean lines, neutral colors, less is more",
          icon: "⚪",
        },
        {
          id: "bohemian",
          title: "Bohemian",
          description: "Free-spirited, artistic, mix of patterns and textures",
          icon: "🌸",
        },
        {
          id: "classic",
          title: "Classic",
          description: "Timeless pieces, elegant, sophisticated",
          icon: "👔",
        },
        {
          id: "edgy",
          title: "Edgy",
          description: "Bold choices, statement pieces, unconventional",
          icon: "⚡",
        },
        {
          id: "romantic",
          title: "Romantic",
          description: "Soft fabrics, feminine details, delicate touches",
          icon: "🌹",
        },
      ],
    },
    {
      id: 3,
      title: "What's your color preference?",
      subtitle: "Select your favorite color palettes",
      type: "multiple",
      options: [
        {
          id: "neutrals",
          title: "Neutrals",
          description: "Beige, cream, white, grey, brown",
          color: "#F5F5DC",
        },
        {
          id: "earth-tones",
          title: "Earth Tones",
          description: "Terracotta, olive, rust, mustard",
          color: "#CD853F",
        },
        {
          id: "jewel-tones",
          title: "Jewel Tones",
          description: "Emerald, sapphire, ruby, amethyst",
          color: "#4B0082",
        },
        {
          id: "pastels",
          title: "Pastels",
          description: "Soft pink, lavender, mint, peach",
          color: "#FFB6C1",
        },
        {
          id: "bold-colors",
          title: "Bold Colors",
          description: "Bright red, royal blue, vibrant yellow",
          color: "#FF4500",
        },
      ],
    },
    {
      id: 4,
      title: "What's your body type?",
      subtitle: "Help us recommend the most flattering styles",
      type: "single",
      options: [
        {
          id: "pear",
          title: "Pear Shape",
          description: "Smaller shoulders, fuller hips and thighs",
          icon: "🍐",
        },
        {
          id: "apple",
          title: "Apple Shape",
          description: "Fuller midsection, narrower hips",
          icon: "🍎",
        },
        {
          id: "hourglass",
          title: "Hourglass",
          description: "Balanced shoulders and hips, defined waist",
          icon: "⏳",
        },
        {
          id: "rectangle",
          title: "Rectangle",
          description: "Similar measurements throughout, athletic build",
          icon: "📱",
        },
        {
          id: "inverted-triangle",
          title: "Inverted Triangle",
          description: "Broader shoulders, narrower hips",
          icon: "🔺",
        },
      ],
    },
    {
      id: 5,
      title: "What's your budget range?",
      subtitle: "Help us recommend options within your comfort zone",
      type: "single",
      options: [
        {
          id: "budget-friendly",
          title: "Budget-Friendly",
          description: "$0 - $50 per item",
          icon: "💚",
        },
        {
          id: "mid-range",
          title: "Mid-Range",
          description: "$50 - $150 per item",
          icon: "💛",
        },
        {
          id: "premium",
          title: "Premium",
          description: "$150 - $300 per item",
          icon: "🧡",
        },
        {
          id: "luxury",
          title: "Luxury",
          description: "$300+ per item",
          icon: "💜",
        },
      ],
    },
  ];

  // ===================== Effects =====================
  useEffect(() => {
    setProgress(((currentQuestion + 1) / questions.length) * 100);
  }, [currentQuestion, questions.length]);

  // ===================== Handlers =====================
  const handleAnswerSelect = (questionId, optionId) => {
    const question = questions.find((q) => q.id === questionId);

    if (question.type === "single") {
      setAnswers((prev) => ({ ...prev, [questionId]: [optionId] }));
    } else {
      setAnswers((prev) => {
        const currentAnswers = prev[questionId] || [];
        return currentAnswers.includes(optionId)
          ? {
              ...prev,
              [questionId]: currentAnswers.filter((id) => id !== optionId),
            }
          : { ...prev, [questionId]: [...currentAnswers, optionId] };
      });
    }
  };

  const isOptionSelected = (questionId, optionId) =>
    answers[questionId]?.includes(optionId) || false;
  const canProceed = () => answers[questions[currentQuestion].id]?.length > 0;
  const handleNext = () =>
    currentQuestion < questions.length - 1
      ? setCurrentQuestion((prev) => prev + 1)
      : setShowResults(true);
  const handlePrevious = () =>
    currentQuestion > 0 && setCurrentQuestion((prev) => prev - 1);
  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setProgress(0);
  };

  // ===================== Recommendations =====================
  const generateRecommendations = () => {
    const recommendations = [];
    if (answers[1]?.includes("corporate"))
      recommendations.push("Professional blazers and tailored pieces");
    if (answers[1]?.includes("creative"))
      recommendations.push("Unique accessories and artistic prints");
    if (answers[2]?.includes("minimalist"))
      recommendations.push("Clean-cut silhouettes in neutral tones");
    if (answers[2]?.includes("bohemian"))
      recommendations.push("Flowy fabrics and eclectic patterns");
    return recommendations.length
      ? recommendations
      : ["Versatile pieces that suit your unique style"];
  };

  // ===================== Results View =====================
  if (showResults) {
    return (
      <section className="quiz-results">
        <div className="container">
          <div className="results-content">
            <div className="results-header">
              <div className="success-icon">
                <Sparkles className="icon" />
              </div>
              <h1>Your Style Profile is Ready!</h1>
              <p>
                Based on your answers, we've curated personalized
                recommendations just for you.
              </p>
            </div>

            <div className="recommendations-grid">
              <div className="recommendation-card">
                <h3>Your Style DNA</h3>
                <div className="style-tags">
                  {Object.entries(answers).map(
                    ([questionId, selectedOptions]) =>
                      selectedOptions.map((optionId) => {
                        const question = questions.find(
                          (q) => q.id === parseInt(questionId)
                        );
                        const option = question?.options.find(
                          (opt) => opt.id === optionId
                        );
                        return option ? (
                          <span
                            key={`${questionId}-${optionId}`}
                            className="style-tag"
                          >
                            {option.icon} {option.title}
                          </span>
                        ) : null;
                      })
                  )}
                </div>
              </div>

              <div className="recommendation-card">
                <h3>Recommended for You</h3>
                <ul className="recommendations-list">
                  {generateRecommendations().map((rec, index) => (
                    <li key={index}>
                      <Check className="check-icon" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="results-actions">
              <button className="btn btn-primary">
                View My Recommendations
              </button>
              <button className="btn btn-secondary" onClick={handleRestart}>
                <RotateCcw className="icon" /> Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ===================== Quiz View =====================
  const currentQ = questions[currentQuestion];
  return (
    <section className="quiz">
      <div className="container">
        {/* Progress Bar */}
        <div className="quiz-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        {/* Question Content */}
        <div className="question-content">
          <div className="question-header">
            <h1>{currentQ.title}</h1>
            <p className="question-subtitle">{currentQ.subtitle}</p>
          </div>

          <div className="options-grid">
            {currentQ.options.map((option) => (
              <div
                key={option.id}
                className={`option-card ${
                  isOptionSelected(currentQ.id, option.id) ? "selected" : ""
                }`}
                onClick={() => handleAnswerSelect(currentQ.id, option.id)}
              >
                {option.color ? (
                  <div
                    className="color-circle"
                    style={{ backgroundColor: option.color }}
                  ></div>
                ) : (
                  <div className="option-icon">{option.icon}</div>
                )}
                <div className="option-content">
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="quiz-navigation">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft /> Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next <ChevronRight />
                </>
              ) : (
                <>
                  Finish <ChevronRight />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
