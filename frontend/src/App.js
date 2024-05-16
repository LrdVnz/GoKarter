import { Routes, Route, BrowserRouter } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Hello world!</div>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
