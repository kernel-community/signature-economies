import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SoulSignsPage from "./pages/SoulSigns";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/soulsigns" element={<SoulSignsPage />} />
      </Routes>
    </div>
  );
}

export default App;
