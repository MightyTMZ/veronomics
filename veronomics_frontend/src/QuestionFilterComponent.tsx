import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuestionFilterComponent.css";

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
  difficulty: string; // Assuming there's a difficulty field
}

const QuestionFilterComponent: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;

    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
      console.log(selectedCategories);
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }

    filterQuestions(selectedCategories, selectedDifficulty);
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const difficulty = event.target.value;
    setSelectedDifficulty(difficulty);
    filterQuestions(selectedCategories, difficulty);
  };

  const filterQuestions = (categories: string[], difficulty: string) => {
    const filtered = questions.filter((question) => {
      const categoryMatch =
        categories.length > 0
          ? categories.includes(question.category.title)
          : true;
      const difficultyMatch = difficulty
        ? question.difficulty === difficulty
        : true; // Assuming questions have a difficulty property
      return categoryMatch && difficultyMatch;
    });

    setFilteredQuestions(filtered);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Economics Quiz</h1>

      {/* Filter Display */}
      <div className="filter-container mb-4 border rounded p-3 bg-light">
        <h3>Filter Questions</h3>

        {/* Mega Dropdown for Categories */}
        <div className="category-dropdown mb-3">
          <h5>Category:</h5>
          <div className="category-grid">
            <label className="category">
              <input
                type="checkbox"
                value="Economics"
                checked={selectedCategories.includes("Economics")}
                onChange={handleCategoryChange}
              />
              Economics
            </label>
            <label className="category">
              <input
                type="checkbox"
                value="Finance"
                checked={selectedCategories.includes("Finance")}
                onChange={handleCategoryChange}
              />
              Finance
            </label>
            <label className="category">
              <input
                type="checkbox"
                value="Microeconomics"
                checked={selectedCategories.includes("Microeconomics")}
                onChange={handleCategoryChange}
              />
              Microeconomics
            </label>
            <label className="category">
              <input
                type="checkbox"
                value="Macroeconomics"
                checked={selectedCategories.includes("Macroeconomics")}
                onChange={handleCategoryChange}
              />
              Macroeconomics
            </label>
            <label className="category">
              <input
                type="checkbox"
                value="Public Economics"
                checked={selectedCategories.includes("Public Economics")}
                onChange={handleCategoryChange}
              />
              Public Economics
            </label>
            <label className="category">
              <input
                type="checkbox"
                value="Accounting"
                checked={selectedCategories.includes("Accounting")}
                onChange={handleCategoryChange}
              />
              Accounting
            </label>
            <label className="category">
              <input
                type="checkbox"
                value="International"
                checked={selectedCategories.includes("International")}
                onChange={handleCategoryChange}
              />
              International
            </label>

            {/* Add more categories as needed */}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-3">
          <label htmlFor="difficultySelect" className="form-label">
            Difficulty:
          </label>
          <select
            id="difficultySelect"
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            className="form-select"
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default QuestionFilterComponent;
