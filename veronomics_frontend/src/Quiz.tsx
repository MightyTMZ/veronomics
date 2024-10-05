import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quiz.css";

interface Option {
  option_text: string;
  correct: boolean;
}

interface Category {
  title: string;
}

interface Question {
  id: number;
  question_source: string;
  category: Category;
  question_text: string;
  options: Option[];
  explanation: string;
  difficulty: string;
}

const Quiz: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  // const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const backendServerAddress = "https://quiztrepreneur.pythonanywhere.com";

  console.log(filteredQuestions);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${backendServerAddress}/quiz/categories/`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchQuestionsByCategory = async (category: string) => {
    try {
      const response = await axios.get(
        `${backendServerAddress}/quiz/questions/list-all/?search=${category}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching questions for category ${category}:`,
        error
      );
      return [];
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;

    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleFilterQuestions = async () => {
    let allQuestions: Question[] = [];
    for (const category of selectedCategories) {
      const questionsForCategory = await fetchQuestionsByCategory(category);
      allQuestions = [...allQuestions, ...questionsForCategory];
    }

    // Filter by difficulty
    const difficultyFilteredQuestions = allQuestions.filter(
      (question) =>
        !selectedDifficulty || question.difficulty === selectedDifficulty
    );

    setFilteredQuestions(difficultyFilteredQuestions);

    // Pick a random question
    if (difficultyFilteredQuestions.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * difficultyFilteredQuestions.length
      );
      setQuestion(difficultyFilteredQuestions[randomIndex]);
    } else {
      setQuestion(null);
    }
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
          "Incorrect. The correct answer is: " +
            "<strong>" +
            correctOption?.option_text +
            "</strong>"
        );
      }
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption("");
    setFeedback("");
    setShowExplanation(false);
    handleFilterQuestions(); // Fetch a new random question
  };

  return (
    <div className="container mt-5 afacad-flux">
      <h1 className="text-center mb-4" style={{ letterSpacing: "3px", fontWeight: 'bold' }}>EconChamp</h1>
      <div className="container mt-5">
        {/* Filter Display */}
        <div className="filter-container mb-4 border rounded p-3 bg-light">

          {/* Dynamic Categories */}
          <div className="category-dropdown mb-3">
            <h2 >Category:</h2>
            <div className="category-grid">
              {categories.map((category, index) => (
                <label key={index} className="category">
                  <input
                    type="checkbox"
                    value={category.title}
                    checked={selectedCategories.includes(category.title)}
                    onChange={handleCategoryChange}
                  />
                  {category.title}
                </label>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-3">
            <label htmlFor="difficultySelect" className="form-label">
              <h2>Difficulty:</h2>
            </label>
            <select
              id="difficultySelect"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              className="form-select"
            >
              <option value="">All Difficulties</option>
              <option value="E">Easy</option>
              <option value="M">Medium</option>
              <option value="H">Hard</option>
            </select>
          </div>

          <button className="btn btn-primary" onClick={handleFilterQuestions}>
            Give me practice!
          </button>
        </div>
      </div>

      {/* Display Question */}
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
          <p>No questions found or loading...</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
