import React, { useEffect, useReducer } from "react";
import "./App.css";
import CountryContent from "@/components/Country";
import { ICountry, IData } from "@/components/types";
import data from "@/static/uk.json";

let initialState: ICountry = {
  name: "",
  sourceData: {
    capital: "",
    currency: "",
    hireIn: "",
    offical_language: "",
    payroll_cycle: "",
    continent: "",
    priority: 0,
  },
};

function reducer(state: ICountry, action: { type: string; payload: IData }) {
  const country = action.payload;
  switch (action.type) {
    case "add":
      return {
        name: data?.hireIn,
        sourceData: {
          ...country,
        },
      };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "add", payload: data });
  }, []);

  return (
    <div className="App">
      <CountryContent country={state} />
    </div>
  );
}

export default App;
