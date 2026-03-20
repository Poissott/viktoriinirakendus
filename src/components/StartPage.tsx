import { Link } from "react-router-dom";

function StartPage() {
  return (
    <div className="start-page">
      <h1>Tere tulemast viktoriinirakendusse!</h1>
      <Link to="/question/1">Alusta viktoriini</Link>
    </div>
  );
}

export default StartPage;