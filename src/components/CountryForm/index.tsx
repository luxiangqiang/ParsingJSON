import React, { useEffect, useMemo, useState } from "react";
import { Input, Select, Form, Button, message, InputNumber, Spin } from "antd";
import { IData, ISaveCountry } from "@/components/types";
import "./country-form.less";
// import { downloadJSON } from "@/utils/downloadJSON";
import debounce from "lodash.debounce";
import md5 from 'js-md5';
import axios from "axios";

const { Option } = Select;

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
const appid = process.env.REACT_APP_APPID;
const secret = process.env.REACT_APP_SECRET;

const CountryForm: React.FC<{
  sourceData: IData;
  formData: IData;
  updateCountry: React.Dispatch<React.SetStateAction<any>>;
}> = function ({ sourceData, formData, updateCountry }) {
  const [form] = Form.useForm();
  const continents = useContinents();
  const [loading, setLoading] = useState(false);

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
    localStorage.setItem(sourceData.hireIn, JSON.stringify(formData));
    message.success("保存成功");
  };

  // 下载到本地
  // const handlerDownload = function () {
  //   downloadJSON(formData, sourceData.hireIn);
  // };

  // 上传服务器
  const handlerUpload = function () { 
    setLoading(true);
    const params: ISaveCountry = {
      name: sourceData.hireIn,
      title: formData.hireIn,
      benefits: sourceData.necessary_benefits.map(item => item.title),
      capital: formData.capital,
      currency: formData.currency,
      officialLanguage: formData.offical_language,
      payrollCycle: formData.payroll_cycle,
      priority: formData.priority,
      quickStartGuide: sourceData.quickStartGuide,
      area: Number(formData.continent)
    }
    const config:RequestInit  = {
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
      .then(({status}) => { 
        if (status === 200) {
          message.success("上传成功");
        } else { 
          message.success("上传错误");
        }
        setLoading(false);
    })
  }

  // 一键翻译
  const handlerTranslation = function () {
    setLoading(true);
    const qsKeys = ['hireIn', 'capital', 'currency', 'offical_language', 'payroll_cycle'];
    let qs = qsKeys.reduce((pre, key) => {
      return pre + `${pre !== '' ? '、' : ''}${sourceData[key as keyof IData]}`;
    }, '');
    const salt = Math.random();
    const sign = md5(appid + qs + salt + secret);
    const allURL = `/baiduApi/api/trans/vip/translate?q=${encodeURI(qs)}&from=en&to=zh&salt=${ salt }&appid=${appid}&sign=${sign}`
    axios.get(allURL).then(({data}) => {
      const { trans_result } = data;
      const results = trans_result?.[0]?.dst?.split('、') as string[] || [];
      const newData: Record<string, string> = {};
      qsKeys.forEach((key: string, index) => { 
        newData[key] = results[index];
      })
      updateCountry({
       ...newData
      })
      setLoading(false);
    });
  }

  useEffect(() => {
    console.log("CountryForm.tsx", formData);
    form.setFieldsValue(formData);
  }, [form, formData]);

  return (
    <Spin spinning={loading} >
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
      <Form.Item wrapperCol={{ offset: 3, span: 24 }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handlerSaveLocalStory}
        >
          缓存到本地
        </Button>
        {/* <Button
          className="download"
          type="primary"
          htmlType="submit"
          onClick={handlerDownload}
        >
          下载到本地
        </Button> */}
        <Button
          className="upload"
          type="primary"
          htmlType="submit"
          onClick={handlerTranslation}
        >
          一键翻译
        </Button>
        <Button
          className="upload"
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
