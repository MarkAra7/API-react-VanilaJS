import { useState } from "react";
import "./App.css";

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
    </div>
  );
}

export default App;
