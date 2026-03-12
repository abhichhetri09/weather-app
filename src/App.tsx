import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { AboutPage } from "./pages/about";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
