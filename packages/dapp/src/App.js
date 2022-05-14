import { Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* test route */}
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
