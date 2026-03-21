import { answers } from "./Question[id]";
import questions from "../data/questions";

function ResultTable() {
    return (
        <div>
            <h2>Viktoriini tulemused</h2>
            {questions && questions.map((question: any, index: number) => (
                <p key={index}> 
                    <p>{question.question}</p>
                    {question.options.map((option: string, optionIndex: number) => (
                        <p key={optionIndex} style={{ 
                            backgroundColor: option === question.answer ? "green" : 
                                            option === answers.find((a: any) => a.questionId === question.id)?.selectedOption ? "red" : "transparent"
                        }}>
                            {option}
                        </p>
                    ))}
                </p>
      ))}
        </div>
    );
}

export default ResultTable;