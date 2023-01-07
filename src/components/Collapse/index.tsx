import React, { useEffect, useReducer } from "react";
import { Collapse } from "antd";
import { IData } from "@/components/types";
import "./collapse.less";
import JsonView from "@/components/JsonView/index";
import CountryForm from "@/components/CountryForm/index";

const { Panel } = Collapse;

let initialState = {
  capital: "",
  currency: "",
  hireIn: "",
  offical_language: "",
  payroll_cycle: "",
  continent: "",
  priority: 0,
};

function reducer(state: IData, action: { type: string; payload: IData }) {
  const country = action.payload;
  switch (action.type) {
    case "update":
      return {
        ...country,
      };
  }
}

const CollapseContent: React.FC<{ sourceData: IData }> = function ({
  sourceData,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  function onUpdateCountry(newData: Partial<IData>) {
    dispatch({
      type: "update",
      payload: {
        ...state,
        ...newData,
      },
    });
  }

  useEffect(() => {
    console.log("Collapse.tsx");
    function getStoryData() {
      let story = localStorage.getItem(sourceData.hireIn)
        ? (JSON.parse(localStorage.getItem(sourceData.hireIn)) as IData)
        : null;
        dispatch({
          type: "update",
          payload: story ? {
            ...sourceData,
            ...story,
          } : {
            ...sourceData,
            ...initialState,
          },
        });
    }
    getStoryData();
  }, [sourceData]);

  return (
    <div className="collapse">
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="请在此处填写" key="1">
          <div className="collapse_container">
            <div className="collapse_left">
              <CountryForm
                sourceData={sourceData}
                formData={state}
                updateCountry={onUpdateCountry}
              />
            </div>
            <div className="collapse_right">
              <JsonView json={state} />
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default CollapseContent;
