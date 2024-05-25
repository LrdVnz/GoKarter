import { Routes, Route, BrowserRouter } from "react-router-dom"
import NavBar from "./components/navbar/NavBar";
import Leadeboard from "./components/leaderboard/Leaderboard";
import Frontpage from "./components/frontpage/frontpage";

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar />
        <Routes>
         <Route path="/" element={<Frontpage />} />
         <Route path="/race/:id" element={<Leadeboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
