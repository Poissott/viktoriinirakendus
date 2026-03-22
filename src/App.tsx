import { BrowserRouter, Route, Routes } from "react-router-dom"
import Question from "./components/Question[id]"
import StartPage from "./components/StartPage"
import ResultTable from "./components/ResultTable"
import statLogo from "./assets/ES_Logo.png"

// Rakenduse struktuur tehtud React Routeri põhjal
function App() {
  return (
    <BrowserRouter>
      <div className="bg-white fixed top-6.5 left-6.5 w-27 h-10">
        <img
        src={statLogo}
        alt="statlogo"
        className="fixed top-6.5 left-6.5 w-27"
      />
      </div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/kysimus/:id" element={<Question />} />
        <Route path="/tulemused" element={<ResultTable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
