import React from "react";
import CollapseContent from "@/components/Collapse";
import "./country.less";

const CountryContent: React.FC = function () {
  return (
    <div className="header">
      <CollapseContent />
    </div>
  );
};

export default CountryContent;
