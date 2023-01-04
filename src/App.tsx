import React, { useEffect, useState } from "react";
import "./App.css";
import CountryContent from "./components/Country";
import { ICountry } from "./components/types";
import data from "./static/uk.json";

function App() {
  const [country, setCountry] = useState<ICountry>({
    name: "",
    data: {
      capital: "",
      currency: "",
      hireIn: "",
      offical_language: "",
      payroll_cycle: "",
      continent: "",
      priority: 0,
    },
  });
  useEffect(() => {
    setCountry({
      name: data?.hireIn,
      data: {
        capital: data?.capital,
        currency: data.currency,
        hireIn: data.hireIn,
        offical_language: data.offical_language,
        payroll_cycle: data.payroll_cycle,
      },
    });
  }, []);
  return (
    <div className="App">
      <CountryContent country={country} sourceData={data} />
    </div>
  );
}

export default App;
