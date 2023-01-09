import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import { Spin } from 'antd';
import CountryContent from "@/components/Country";
import { ICountry, IData } from "@/components/types";
import data from "@/static/canada.json";
import LoadCountry from '@/components/LoadCountry'

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
        name: country?.hireIn,
        sourceData: {
          ...country,
        },
      };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({ type: "add", payload: data });
  }, []);

  // 导入国家数据
  const importCountry = (value: string) => { 
    setLoading(true);
    import(`@/static/${value}.json`).then(res => { 
      dispatch({
        type: "add", payload: {
          hireIn: res.hireIn,
          currency: res.currency,
          capital: res.capital,
          offical_language: res.offical_language,
          payroll_cycle: res.payroll_cycle,
          necessary_benefits: res.necessary_benefits,
          quickStartGuide: res.quickStartGuide,
      } });
      setLoading(false);
    })
  }

  return (
    <Spin spinning={loading} >
      <div className="App">
        <LoadCountry importFn={importCountry} />
        <CountryContent country={state} />
      </div>
    </Spin>
  );
}

export default App;
