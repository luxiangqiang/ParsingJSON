import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

function CollapseContent() {
  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="This is panel header 1" key="1">
          <p>12121</p>
        </Panel>
      </Collapse>
    </div>
  );
}

export default CollapseContent;
