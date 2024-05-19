import { Routes, Route, BrowserRouter } from "react-router-dom"
import NavBar from "./components/navbar/NavBar";
import Leadeboard from "./components/leaderboard/Leaderboard";

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar />
        <Routes>
         <Route path="/" element={<Leadeboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
