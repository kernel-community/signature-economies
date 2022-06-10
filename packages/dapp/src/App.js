import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Essay from "./pages/Essay";
import SignedOn from "./pages/SignedOn";
import SoulSigns from "./pages/SoulSigns";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/essay" element={<Essay />} />
        <Route path="/signatures" element={<SoulSigns />} />
        <Route path="/signed/:address" element={ <SignedOn /> } />
      </Routes>
    </div>
  );
}

export default App;
