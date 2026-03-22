import { answers } from "./Question[id]";
import questions from "../data/questions";
import { Link } from "react-router-dom";

// Tulemuste leht - kuvab kasutajale skoori, sõnumi ja tulemuste tabeli

// Nupu stiili baas
const baseButtonClass = "transition duration-100 border border-2 font-bold py-2 px-4";

function ResultTable() {
    // Lõppskoori arvutamine
    const finalScore = questions.length > 0 ? answers.filter((a) => a.selectedOption === questions.find((q) => q.id === a.questionId)?.answer).length : 0;
    const hasAnswers = answers.length > 0;

    // Sõnumi määramine skoori põhjal
    let resultsMessage = "Pole veel vastuseid.";
    if (hasAnswers && questions.length > 0) {
        if (finalScore === questions.length) {
            resultsMessage = "Kõik vastused on õiged! Sa tunned Eestit läbi ja lõhki.";
        } else if (finalScore / questions.length > 0.5) {
            resultsMessage = "Sinu teadmised Eestist on head. Sa ei pruugi küll igat fakti teada, aga vähemalt sa üritasid.";
        } else {
            resultsMessage = "Sinu teadmistele Eestist on veel arenguruumi. Aga kõige olulisem on see, et sa üritasid.";
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-[20px] min-w-[900px] text-left gap-4 flex flex-col">
                {/* Lõppskoor */}
                <p className="text-2xl font-bold text-black">Skoor: {finalScore}/{questions.length} {finalScore / questions.length === 1 ? "🎉" : ""}</p>
                {/* Isikupärastatud sõnum */}
                <p className="font-normal text-[#565656]">{resultsMessage}</p>
                {/* Tulemuste tabel */}
                <table className="w-full border-collapse border border-[#DDDDDD] text-sm">
                    <thead className="bg-[#F8F8F8]">
                        <tr>
                            <th className="border border-[#DDDDDD] p-2 text-left"></th>
                            <th className="border border-[#DDDDDD] p-2 text-left text-black">Valitud vastus</th>
                            <th className="border border-[#DDDDDD] p-2 text-left text-black">Tulemus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => {
                            const selectedAnswer = answers.find((a) => a.questionId === question.id)?.selectedOption;
                            const isCorrect = selectedAnswer === question.answer;

                            return (
                                <tr key={question.id} className={index % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#F8F8F8]"}>
                                    <td className="border border-[#DDDDDD] p-2 font-bold text-black">{question.question}</td>
                                    <td className="border border-[#DDDDDD] p-2 text-[#565656] font-normal">{selectedAnswer ?? "Vastamata"}</td>
                                    <td
                                        className={`border border-[#DDDDDD] p-2 font-bold ${
                                            selectedAnswer ? (isCorrect ? "text-[#4DC14D]" : "text-[#DC1919]") : "text-[#565656]"
                                        }`}
                                    >
                                        {selectedAnswer ? (isCorrect ? "Õige" : "Vale") : "Vastamata"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {/* Nupp, mis viib kasutaja tagasi avalehele */}
                <Link to={`/`}
                    className={`${baseButtonClass} bg-black text-white border-black hover:bg-white hover:text-black w-max self-end`}
                >
                    Tagasi pealehele
                </Link>
            </div>
        </div>
    );
}

export default ResultTable;