import { BrowserRouter, Route, Routes } from "react-router-dom"
import Question from "./components/Question[id]"
import StartPage from "./components/StartPage"
import ResultTable from "./components/ResultTable"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/kysimus/:id" element={<Question />} />
        <Route path="/tulemused" element={<ResultTable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
