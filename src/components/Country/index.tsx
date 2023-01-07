import React from "react";
import CollapseContent from "@/components/Collapse";
import "./country.less";
import { ICountry } from "@/components/types";

const CountryContent: React.FC<{ country: ICountry }> = function ({ country }) {
  return (
    <div className="header">
      <div className="header_title">{country.name}</div>
      <CollapseContent sourceData={country.sourceData} />
    </div>
  );
};

export default CountryContent;
