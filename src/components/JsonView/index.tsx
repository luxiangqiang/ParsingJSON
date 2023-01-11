
import React from "react";
import ReactJson, { InteractionProps } from "react-json-view";

const JsonView: React.FC<{ json: any, updateText: Function }> = function ({ json, updateText }) {
  const onEdit = (item: InteractionProps) => {
    updateText({
      ...json,
      ...item.updated_src
    })
  }
  return <ReactJson src={json} onEdit={onEdit} />;
};

export default JsonView;
