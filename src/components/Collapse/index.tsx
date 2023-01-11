import React, { useState } from "react";
import { Collapse } from "antd";
import "./collapse.less";
import JsonView from "@/components/JsonView/index";
import CountryForm from "@/components/CountryForm/index";

const { Panel } = Collapse;

const CollapseContent: React.FC = function () {
  const [state, setState] = useState({});
  const [jsonText, setJsonText] = useState<string>();

  const formatJSON = (value: string) => {
    if (value.trim() !== '') {
      let result = value.replace(/“/g, "\"");
      result = result.replace(/”/g, "\"");
      result = result.replace(/：/g, ":");
      result = result.replace(/，/g, ",");
      result = result.replace(/、/g, ",");
      result = result.replace(/《/g, "\"");
      result = result.replace(/》/g, "\"");
      result = result.replace(/no_transa/g, '');
      try {
        const json = JSON.parse(result);
        setState({
          ...state,
          ...json
        });
      } catch (error) {
        alert('JSON 解析错误，请在控制台检查格式');
      } finally {
        setJsonText(result);
        return result;
      }
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
                jsonText={jsonText}
                formatJSON={formatJSON}
                updateCountry={setState}
                setJsonText={setJsonText}
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
