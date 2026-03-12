import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Homepage />} />
        {/* more routes here */}
      </Routes>
    </Layout>
  );
}

export default App;
