import { Link, useParams } from "react-router-dom";
import questions from "../data/questions";
import React, { useEffect } from "react";

const answers: string[] = [];

function Question() {
  const { id } = useParams<{ id: string }>();
  const questionObj = questions.find(q => q.id === parseInt(id!));
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [id]);
  

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  }

  const handleOptionSubmitClick = () => {
    if (selectedOption) {
      answers.push(selectedOption);
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