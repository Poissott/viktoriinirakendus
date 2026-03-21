import { Link } from "react-router-dom";
import { clearAnswers } from "./Question[id]";

function StartPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white flex flex-col items-center justify-center p-25">
        <h1 className="text-3xl font-bold mb-4">Tere tulemast viktoriinirakendusse!</h1>
        <Link
          to="/kysimus/1"
          onClick={clearAnswers}
          className="bg-black text-white hover:bg-white hover:text-black transition duration-100 border border-black border-2 font-bold py-2 px-4"
        >
          Alusta viktoriiniga
        </Link>
      </div>
    </div>
  );
}

export default StartPage;