import React from "react";
import ReactJson from "react-json-view";
import { IData } from "../types";

const JsonView: React.FC<{ json: IData }> = function ({ json }) {
  return <ReactJson src={json} />;
};

export default JsonView;
