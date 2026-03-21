import { Link, useParams } from "react-router-dom";
import questions from "../data/questions";
import React, { useEffect } from "react";

type AnsweredQuestion = {
  questionId: number;
  selectedOption: string;
};

const ANSWERS_STORAGE_KEY = "quizAnswers";

const loadAnswers = (): AnsweredQuestion[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(ANSWERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AnsweredQuestion[]) : [];
  } catch {
    return [];
  }
};

const saveAnswers = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(answers));
};

export const answers: AnsweredQuestion[] = loadAnswers();

function Question() {
  const { id } = useParams<{ id: string }>();
  const questionObj = questions.find(q => q.id === parseInt(id!));
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  
  useEffect(() => {
    const currentQuestionId = parseInt(id!);
    const existingAnswer = answers.find(a => a.questionId === currentQuestionId);

    if (existingAnswer) {
      setSelectedOption(existingAnswer.selectedOption);
      setIsAnswered(true);
      return;
    }

    setSelectedOption(null);
    setIsAnswered(false);
  }, [id]);
  

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  }

  const handleOptionSubmitClick = () => {
    if (selectedOption) {
      const currentQuestionId = parseInt(id!);
      const existingAnswer = answers.find(a => a.questionId === currentQuestionId);

      if (existingAnswer) {
        existingAnswer.selectedOption = selectedOption;
      } else {
        answers.push({ questionId: currentQuestionId, selectedOption });
      }

      saveAnswers();
      setIsAnswered(true);
    }  
  }

  return (
    <div className="question">
      <h2>{questionObj?.question}</h2>
      {questionObj && questionObj.options.map((option: string, index: number) => (
        <p key={index} 
        onClick={() => handleOptionClick(option)} 
        style={{ 
          cursor: "pointer", 
          backgroundColor: 
            isAnswered ? 
              option === questionObj.answer ? "green" : 
              option === selectedOption ? "red" : "transparent" 
            : option === selectedOption ? "lightblue" : "transparent",
          pointerEvents: isAnswered ? "none" : "auto"
        }}>
          {option}
        </p>
      ))}
      <p
      onClick={handleOptionSubmitClick}
      style={{
        cursor: "pointer",
        backgroundColor: selectedOption ? "blue" : "gray",
      }}>
        Kontrolli vastust
      </p>
      {isAnswered && (
        <Link to={{ pathname: parseInt(id!) + 1 == questions.length + 1 ? `/tulemused` : `/kysimus/${parseInt(id!) + 1}` }}
        style={{
          cursor: "pointer",
        }}
        >
          Järgmine küsimus
        </Link>
      )}
    </div>
  );
}

export default Question;