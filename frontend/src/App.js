import { Routes, Route, BrowserRouter } from "react-router-dom"
import NavBar from "./components/navbar/NavBar";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Frontpage from "./components/frontpage/Frontpage";

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar />
        <Routes>
         <Route path="/" element={<Frontpage />} />
         <Route path="/race/:id" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
