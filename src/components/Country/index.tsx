import React from "react";
import CollapseContent from "@/components/Collapse";
import "./country.less";
import { ICountry } from "@/components/types";

const CountryContent: React.FC<{ country: ICountry; sourceData: any }> =
  function ({ country, sourceData }) {
    return (
      <div className="header">
        <div className="header_title">{country.name}</div>
        <CollapseContent data={country.data} sourceData={sourceData} />
      </div>
    );
  };

export default CountryContent;