import { answers } from "./Question[id]";
import questions from "../data/questions";

function ResultTable() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-[20px] min-w-[900px] text-left gap-4">
                <h3 className="font-bold mb-4 text-lg text-black">Viktoriini tulemused</h3>
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
                                    <td className="border border-[#DDDDDD] p-2 text-[#565656]">{selectedAnswer ?? "Vastamata"}</td>
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
            </div>
        </div>
    );
}

export default ResultTable;