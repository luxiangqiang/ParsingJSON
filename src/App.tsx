import React, { useEffect } from "react";
import "./App.css";
import CountryContent from "./components/Country";
import data from "./static/uk.json";

function App() {
  useEffect(() => {
    console.error(data);
  }, []);
  return (
    <div className="App">
      <CountryContent title="中国" />
    </div>
  );
}

export default App;
