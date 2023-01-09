import React from "react";
import { Select } from "antd";
import './index.less';

const { Option } = Select;
const countries = [
  'albania',
  'armenia',
  'australia',
  'austria',
  'azerbaijan',
  'bangladesh',
  'belarus',
  'belgium',
  'bolivia',
  'bosnia herzegovina',
  'brazil',
  'bulgaria',
  'cambodia',
  'canada',
  'chile',
  'china',
  'colombia',
  'costa rica',
  'croatia',
  'cyprus',
  'czech republic',
  'denmark',
  'dominican republic',
  'ecuador',
  'egypt',
  'estonia',
  'finland',
  'france',
  'georgia',
  'germany',
  'ghana',
  'greece',
  'guatemala',
  'honduras',
  'hong kong',
  'hungary',
  'iceland',
  'india',
  'indonesia',
  'ireland',
  'israel',
  'italy',
  'ivory coast',
  'japan',
  'kenya',
  'kosovo',
  'latvia',
  'lithuania',
  'luxembourg',
  'madagascar',
  'malaysia',
  'malta',
  'mauritius',
  'mexico',
  'mongolia',
  'morocco',
  'namibia',
  'netherlands',
  'new zealand',
  'nigeria',
  'north macedonia',
  'norway',
  'pakistan',
  'panama',
  'peru',
  'philippines',
  'poland',
  'portugal',
  'puerto rico',
  'romania',
  'russia',
  'rwanda',
  'serbia',
  'singapore',
  'slovakia',
  'slovenia',
  'south africa',
  'south korea',
  'spain',
  'sri lanka',
  'sweden',
  'switzerland',
  'taiwan',
  'thailand',
  'the united-kingdom',
  'tunisia',
  'turkey',
  'uganda',
  'ukraine',
  'united arab-emirates',
  'united states',
  'uruguay',
  'vietnam'
]
const LoadCountry:React.FC<{importFn: Function}> = ({importFn}) => { 
  const onChangeSelect = (value: string) => { 
    importFn(value)
  }
  return (
    <div className="load-country">
      <div className='load-country_title'>请选择导入的国家</div>
      <Select
        showSearch
        className="load-country_select"
        onChange={(e) => onChangeSelect(e)}
        allowClear
      >
        {countries.map((key) => (
          <Option value={key} key={key}>
            {key}
          </Option>
        ))}
      </Select>
    </div>
  )
 }

export default LoadCountry;