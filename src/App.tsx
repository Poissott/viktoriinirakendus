import { BrowserRouter, Route, Routes } from "react-router-dom"
import Question from "./components/Question[id]"
import StartPage from "./components/StartPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/question/:id" element={<Question />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
