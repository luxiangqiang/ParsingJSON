
import React from "react";
import { IData } from "../types";
import { Input, Select, Form, InputNumber } from "antd";
import './index.less';

// 六大洲
const useContinents = function () {
  return [
    {
      label: "亚洲",
      value: 2,
    },
    {
      label: "欧洲",
      value: 4,
    },
    {
      label: "北美洲",
      value: 5,
    },
    {
      label: "南美洲",
      value: 6,
    },
    {
      label: "非洲",
      value: 3,
    },
    {
      label: "大洋洲",
      value: 7,
    },
  ];
};

const BasicInformation: React.FC<{
  sourceData: IData;
  onChangeInput: Function;
  onChangeSelect: Function;
}> = function ({ sourceData, onChangeInput, onChangeSelect }) {
  const { Option } = Select;
  const continents = useContinents();

  return (
    <>
      <div className="basic-information">
        <div className="basic-information_title">基本信息</div>
        <Form.Item label="国家名称" name="hireIn">
          <Input
            allowClear
            addonBefore={sourceData.hireIn}
            onChange={(e) => onChangeInput(e, "hireIn")}
          />
        </Form.Item>
        <Form.Item label="首都" name="capital">
          <Input
            allowClear
            addonBefore={sourceData.capital}
            onChange={(e) => onChangeInput(e, "capital")}
          />
        </Form.Item>
        <Form.Item label="货币种类" name="currency">
          <Input
            allowClear
            addonBefore={sourceData.currency}
            onChange={(e) => onChangeInput(e, "currency")}
          />
        </Form.Item>
        <Form.Item label="官方语言" name="offical_language">
          <Input
            allowClear
            addonBefore={sourceData.offical_language}
            onChange={(e) => onChangeInput(e, "offical_language")}
          />
        </Form.Item>
        <Form.Item label="工资单周期" name="payroll_cycle">
          <Input
            allowClear
            addonBefore={sourceData.payroll_cycle}
            onChange={(e) => onChangeInput(e, "payroll_cycle")}
          />
        </Form.Item>
        <Form.Item label="所属大洲" name="continent">
          <Select onChange={(e) => onChangeSelect(e)} allowClear>
            {continents.map((el) => (
              <Option value={el.value} key={el.value}>
                {el.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="优先级" name="priority">
          <InputNumber
            className="input-number"
            min={0}
            onChange={(e) => onChangeInput.call(this, e, "priority")}
          />
        </Form.Item>
      </div>


    </>
  )
}

export default BasicInformation;