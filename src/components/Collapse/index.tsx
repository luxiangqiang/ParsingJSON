import React, { useEffect } from "react";
import { Collapse } from "antd";
import { IData } from "../types";
import "./collapse.less";
import { useState } from "react";
import JsonView from "../JsonView/index";
import CountryForm from "../CountryForm";

const { Panel } = Collapse;

const CollapseContent: React.FC<{ data: IData; sourceData: any }> = function ({
  data,
  sourceData,
}) {
  const [copyCountry, setCopyCountry] = useState({
    ...sourceData,
    capital: "",
    currency: "",
    hireIn: "",
    offical_language: "",
    payroll_cycle: "",
    continent: "",
    priority: 0,
  });

  async function getStoryData() {
    await new Promise((resolve, reject) => {
      const story = localStorage.getItem(data.hireIn)
        ? (JSON.parse(localStorage.getItem(data.hireIn)) as IData)
        : null;
      story ? resolve(story) : reject();
    }).then(
      (res: IData) => {
        setCopyCountry({
          ...sourceData,
          capital: res?.capital || "",
          currency: res?.currency || "",
          hireIn: res?.hireIn || "",
          offical_language: res?.offical_language || "",
          payroll_cycle: res?.payroll_cycle || "",
          continent: res?.continent || "",
          priority: res?.priority || 0,
        });
      },
      () => {}
    );
  }

  useEffect(() => {
    getStoryData();
  });

  return (
    <div className="collapse">
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="请在此处填写" key="1">
          <div className="collapse_container">
            <div className="collapse_left">
              <CountryForm
                formData={data}
                copyCountry={copyCountry}
                setCopyCountry={setCopyCountry}
              />
            </div>
            <div className="collapse_right">
              <JsonView json={copyCountry} />
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default CollapseContent;
