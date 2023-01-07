import React, { useEffect, useMemo } from "react";
import { Input, Select, Form, Button, message, InputNumber } from "antd";
import { IData } from "@/components/types";
import "./country-form.less";
import { downloadJSON } from "@/utils/downloadJSON";
import debounce from "lodash.debounce";

const { Option } = Select;

// 六大洲
const useContinents = function () {
  return [
    {
      label: "亚洲",
      value: "Asia",
    },
    {
      label: "欧洲",
      value: "Europe",
    },
    {
      label: "北美洲",
      value: "North America",
    },
    {
      label: "南美洲",
      value: "South America",
    },
    {
      label: "非洲",
      value: "Africa",
    },
    {
      label: "大洋洲",
      value: "Oceania",
    },
  ];
};

const CountryForm: React.FC<{
  sourceData: IData;
  formData: IData;
  updateCountry: React.Dispatch<React.SetStateAction<any>>;
}> = function ({ sourceData, formData, updateCountry }) {
  const [form] = Form.useForm();
  const continents = useContinents();

  const debounceChangeInput = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>, key: string = "") => {
        updateCountry({
          [key]: key === "priority" ? Number(e) : e.target.value,
        });
      }, 500),
    [updateCountry]
  );

  function onChangeInput(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string = ""
  ) {
    debounceChangeInput(e, key);
  }

  function onChangeSelect(value: string) {
    updateCountry({
      continent: value,
    });
  }

  // 保存到本地
  const handlerSaveLocalStory = function () {
    localStorage.setItem(formData.hireIn, JSON.stringify(formData));
    message.success("保存成功");
  };

  // 下载到本地
  const handlerDownload = function () {
    downloadJSON(formData, sourceData.hireIn);
  };

  useEffect(() => {
    console.log("CountryForm.tsx", formData);
    form.setFieldsValue(formData);
  }, [form, formData]);

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      className="CountryForm"
    >
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
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handlerSaveLocalStory}
        >
          保存到本地
        </Button>
        <Button
          className="download"
          type="primary"
          htmlType="submit"
          onClick={handlerDownload}
        >
          下载到本地
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CountryForm;
