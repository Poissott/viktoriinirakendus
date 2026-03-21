import { Link } from "react-router-dom";

function StartPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white flex flex-col items-center justify-center p-25">
        <h1 className="text-3xl font-bold mb-4">Tere tulemast viktoriinirakendusse!</h1>
        <Link to="/kysimus/1" className="bg-black text-white hover:bg-white hover:text-black border border-black border-2 font-bold py-2 px-4">
          Alusta viktoriini
        </Link>
      </div>
    </div>
  );
}

export default StartPage;