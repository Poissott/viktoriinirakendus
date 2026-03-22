import { Link, useParams } from "react-router-dom";
import questions from "../data/questions";
import React, { useEffect } from "react";

// Anmestruktuur, mis hoiustab vastatud küsimuse ID-d ja valitud vastust
type AnsweredQuestion = {
  questionId: number;
  selectedOption: string;
};


// Vastuste haldamine vahemälus, et need säiliksid ka lehe värskendamisel
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

// Funktsioon, mis kustutab kõik vahemälu info - kasutatakse pealehel nupule "Alusta viktoriiniga" vajutades
export const clearAnswers = () => {
  answers.length = 0;

  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(ANSWERS_STORAGE_KEY);
};

function Question() {
  // State'ide hoiustamine
  const { id } = useParams<{ id: string }>();
  const questionObj = questions.find(q => q.id === parseInt(id!));
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  
  // Kui küsimusele on juba vastatud/vastamata, siis seame vastavad state'id
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

  // Valiku valimise funktsioon
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  }

  // Valiku kinnitamise funktsioon, mis salvestab vastuse ja keelab edasised muudatused selle küsimuse puhul
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

  // Nupu stiili baas
  const baseButtonClass = "border border-2 font-bold py-2 px-4 transition duration-100";

  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white flex flex-col items-start justify-center p-[10px] text-left gap-4 min-w-[600px] p-[20px]">
      {/* Küsimuse tekst */}
      <h2 className="text-3xl font-bold mb-1">{questionObj?.question}</h2>
      {/* Vastusevariandid */}
      <div className="flex flex-col gap-3 w-full">
        {questionObj && questionObj.options.map((option: string, index: number) => (
        <button
        key={index}
        onClick={() => handleOptionClick(option)}
        className={`${baseButtonClass} w-full text-left ${
          isAnswered
            ? option === questionObj.answer
              ? "bg-[#4DC14D] text-black border-black"
              : option === selectedOption
                ? "bg-[#DC1919] text-white border-black"
                : "bg-white text-black border-black"
            : option === selectedOption
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-black hover:text-white"
        }`}
        disabled={isAnswered}
        >
          {option}
        </button>
      ))}
      </div>
      {/* Nupud: "Kontrolli vastust", "JVaata tulemusi" ja "Järgmine küsimus" */}
      <div className="w-full flex items-center justify-between">
        <button
        onClick={handleOptionSubmitClick}
        disabled={!selectedOption || isAnswered}
        className={`${baseButtonClass} ${
          selectedOption && !isAnswered
            ? "bg-black text-white border-black hover:bg-white hover:text-black cursor-pointer"
            : "bg-[#DDDDDD] text-[#565656] border-[#DDDDDD] cursor-not-allowed"
        }`}
        >
          Kontrolli vastust
        </button>
        {isAnswered && parseInt(id!) + 1 == questions.length + 1 ? (
          <Link to={`/tulemused`}
          className={`${baseButtonClass} bg-black text-white border-black hover:bg-white hover:text-black`}
          >
            Vaata tulemusi
          </Link>
        ) : isAnswered ? (
          <Link to={`/kysimus/${parseInt(id!) + 1}`}
          className={`${baseButtonClass} bg-black text-white border-black hover:bg-white hover:text-black`}
          >
            Järgmine küsimus
          </Link>
        ) : null}
      </div>
    </div>
    </div>
  );
}

export default Question;