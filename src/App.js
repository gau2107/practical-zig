import Header from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import Invites from "./Invites";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/invites" element={<Invites />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
