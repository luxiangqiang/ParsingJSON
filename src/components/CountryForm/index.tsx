import React, { useMemo, useState } from "react";
import { Form, Button, message, Spin, Input, Select, InputNumber } from "antd";
import { ISaveCountry } from "@/components/types";
import "./index.less";
import debounce from "lodash.debounce";

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

const CountryForm: React.FC<{
  country: any,
  jsonText: any,
  formatJSON: (value: any) => void;
  updateCountry: Function;
  setJsonText: Function;
}> = function ({ formatJSON, jsonText, country, setJsonText, updateCountry }) {
  const [form] = Form.useForm();
  const TextArea = Input.TextArea;

  const { Option } = Select;
  const continents = useContinents();

  const [loading, setLoading] = useState(false);

  // 上传服务器
  const handlerUpload = function () {
    setLoading(true);
    const params: ISaveCountry = {
      name: country.hireInOrigin,
      title: country.hireIn,
      benefits: country.necessary_benefits,
      capital: country.capital,
      currency: country.currency,
      officialLanguage: country.offical_language,
      payrollCycle: country.payroll_cycle,
      quickStartGuide: country.quickStartGuide,
      priority: country.priority,
      area: Number(country.continent),
      publishedAt: null
    }
    const config: RequestInit = {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\""
      },
      "referrerPolicy": "no-referrer",
      "body": JSON.stringify({
        "data": params
      }),
      "method": "POST"
    }
    fetch(process.env.REACT_APP_UPLOAD_URL, config)
      .then(({ status }) => {
        if (status === 200) {
          message.success("上传成功");
        } else {
          message.success("上传错误");
        }
        setLoading(false);
      })
  }

  const debounceChangeInput = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>, key: string = "") => {
        updateCountry({
          ...country,
          [key]: key === "priority" ? Number(e) : e.target.value,
        });
      }, 500),
    [updateCountry, country]
  );

  function onChangeSelect(value: string) {
    updateCountry({
      ...country,
      continent: value
    })
  }

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>,
    key: string = "") {
    debounceChangeInput(e, key);
  }

  // 格式化 JSON
  const handlerFormatJSON = () => {
    const data = formatJSON(jsonText)
    form.setFieldValue('json', data)
  }

  const handlerTextAreaChange = (e: any) => {
    setJsonText(e.target.value)
  }

  return (
    <Spin spinning={loading} >
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 24 }}
        className="CountryForm"
      >
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
        <Form.Item label="JSON" name="json">
          <TextArea
            allowClear
            onChange={handlerTextAreaChange}
            style={{ minHeight: 400, width: '100%', marginBottom: 20 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3, span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handlerFormatJSON}
          >
            格式化 JSON
          </Button>
          <Button
            style={{ marginLeft: 20 }}
            type="primary"
            htmlType="submit"
            onClick={handlerUpload}
          >
            上传服务器
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CountryForm;
