import { useState } from "react";
import "./App.css";
import CatImageSection from "./components/CatImageSection";
import DogFactsSection from "./components/DogFactsSection";
import CatFactSection from "./components/CatFactSection";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="app">
      <h1>API Datu Ielāde</h1>
      {loading && (
        <div className="progress-bar">
          <div className="progress-fill" />
        </div>
      )}
      <CatImageSection setLoading={setLoading} />
      <DogFactsSection setLoading={setLoading} />
      <CatFactSection setLoading={setLoading} />
    </div>
  );
}

export default App;
