import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quiz.css";

interface Option {
  option_text: string;
  correct: boolean;
}

interface Category {
  id: number;
  title: string;
}

interface Question {
  id: number;
  question_source: string;
  category: Category;
  question_text: string;
  options: Option[];
  explanation: string;
}

const Quiz: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/quiz/questions/pick-one-random/"
    );
    setQuestion(response.data);
    setSelectedOption("");
    setFeedback("");
    setShowExplanation(false);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (question) {
      const correctOption = question.options.find((option) => option.correct);
      if (selectedOption === correctOption?.option_text) {
        setFeedback("Correct!");
      } else {
        setFeedback(
          "Incorrect. The correct answer is:" + "<hr/>" + "<strong>" + correctOption?.option_text + "</strong>"
        );
      }
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    fetchQuestion();
  };

  return (
    <div className="container mt-5 afacad-flux">
      <h1 className="text-center mb-4">[Name of App here]</h1>
      {question ? (
        <div className="card shadow-sm border-light p-4">
          <h2
            className="card-title mb-4"
            dangerouslySetInnerHTML={{ __html: question.question_text }}
          />
          <form onSubmit={handleSubmit}>
            {question.options.map((option, index) => (
              <div className="form-check mb-2" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="options"
                  id={`option${index}`}
                  value={option.option_text}
                  checked={selectedOption === option.option_text}
                  onChange={handleOptionChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={`option${index}`}
                  dangerouslySetInnerHTML={{ __html: option.option_text }}
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary btn-lg w-100">
              Submit
            </button>
          </form>

          {feedback && (
            <div
              className={`mt-3 alert ${
                feedback.startsWith("Correct")
                  ? "alert-success"
                  : "alert-danger"
              }`}
              dangerouslySetInnerHTML={{ __html: feedback }}
            ></div>
          )}
          {showExplanation && question.explanation && (
            <div className="mt-3 alert alert-info">
              <strong>Explanation:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{ __html: question.explanation }}
              />
            </div>
          )}
          {showExplanation && (
            <button
              className="btn btn-secondary mt-3"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
      ) : (
        <div className="text-center">
          <p>Loading question...</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
