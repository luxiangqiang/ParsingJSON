import React from "react";
import CollapseContent from "./Collapse";

const CountryContent: React.FC<{ title: string }> = function ({ title }) {
  return (
    <div>
      <div className="title">{title}</div>
      <CollapseContent />
    </div>
  );
};

export default CountryContent;
