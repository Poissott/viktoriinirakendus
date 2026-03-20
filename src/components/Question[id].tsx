import { useParams } from "react-router-dom";
import questions from "../data/questions";
import React from "react";

function Question() {
  const { id } = useParams<{ id: string }>();
  const questionObj = questions.find(q => q.id === parseInt(id!));
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  }

  return (
    <div className="question">
      <h2>{questionObj?.question}</h2>
      {questionObj && questionObj.options.map((option: string, index: number) => (
        <p key={index} 
        onClick={() => handleOptionClick(option)} 
        style={{ 
          cursor: "pointer", 
          backgroundColor: selectedOption === option ? "gray" : "transparent" }
        }>
          {option}
        </p>
      ))}
    </div>
  );
}

export default Question;