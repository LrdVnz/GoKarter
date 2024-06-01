import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
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
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
