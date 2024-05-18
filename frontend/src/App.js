import { Routes, Route, BrowserRouter } from "react-router-dom"
import NavBar from "./components/navbar/BlogNavbar";

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar />
        <Routes>
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
