import React, { useState } from "react";
import { Collapse } from "antd";
import "./collapse.less";
import JsonView from "@/components/JsonView/index";
import CountryForm from "@/components/CountryForm/index";

const { Panel } = Collapse;

const CollapseContent: React.FC = function () {
  const [state, setState] = useState({});

  const handlerTextAreaChange = (e: any) => {
    if (e.target.value.trim() !== '') {
      let result = e.target.value.replace(/“/g, "\"");
      result = result.replace(/”/g, "\"");
      result = result.replace(/：/g, ":");
      result = result.replace(/，/g, ",");
      result = result.replace(/、/g, ",");
      result = result.replace(/no_transa/g, '');
      console.error(result)
      setState({
        ...state,
        ...JSON.parse(result)
      });
    }
  }

  return (
    <div className="collapse">
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="请在此处填写" key="1">
          <div className="collapse_container">
            <div className="collapse_left">
              <CountryForm
                country={state}
                onTextAreaChange={handlerTextAreaChange}
                updateCountry={setState}
              />
            </div>
            <div className="collapse_right">
              <JsonView json={state} updateText={setState} />
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default CollapseContent;
