import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Select, notification } from 'antd';
import './App.scss';

const { Option } = Select;

function App() {
  const [showErrMsg, setShowErrMsg] = useState(false)
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (!(values.advances || values.alert || values.other)) {
      setShowErrMsg(true)
    }else{

      fetch('https://60653baef091970017787307.mockapi.io/insertFormDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formDetails: values }),
      })
        .then(() => {
          notification.success({
            message: 'Subscribed Successfully',
          });
          onReset()
        })
        .catch((error) => {
          notification.error({
            message: 'Some thing went wrong,Please try again',
          });
        });
    }
    console.log('Success:', values);
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    if (!(errorInfo.values.advances || errorInfo.values.alert || errorInfo.values.other)) {
      setShowErrMsg(true)
    }
  };

  const onValuesChange =()=>{
    setShowErrMsg(false)
  }

  const onReset = () => {
    form.resetFields();
    setShowErrMsg(false)
  };

  return (
    <div className="formContainer">
      <Form name="basic"
        initialValues={{
          remember: true,
        }}
        className="fieldContainer"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        form={form}
      >
        <div className="infoContainer">
          <div>Sign up for email updates</div>
          <div>*Indicates Required Field</div>
        </div>
        <div className="fieldFlex">
          <div className="field_mr">
            <label>FIRST NAME *</label>
            <Form.Item name="FirstName" rules={[{
              required: true,
            }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <label>LAST NAME *</label>
            <Form.Item name="LastName" rules={[{
              required: true,
            }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="fieldFlex">
          <div className="field_mr">
            <label>EMAIL ADDRESS *</label>
            <Form.Item name="Email" rules={[{
              type: "email", required: true,
            }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <label>ORGANIZATION</label>
            <Form.Item name="Organization">
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="residentSelect">
          <label>EU RESIDENT *</label>
          <Form.Item name="Gender" rules={[{ required: true }]}>
            <Select
              placeholder="- SELECT ONE -"
              allowClear
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxFlex">
            <Form.Item name="advances" valuePropName="checked">
              <Checkbox>ADVANCES</Checkbox>
            </Form.Item>
            <Form.Item name="alert" valuePropName="checked">
              <Checkbox>ALERTS</Checkbox>
            </Form.Item>
          </div>

          <div className="checkboxFlex">

            <Form.Item name="other" valuePropName="checked">
              <Checkbox>OTHER COMMUNICATIONS</Checkbox>
            </Form.Item>
            <div className="errmsgCheckbox">{showErrMsg && 'Select atleast one checkbox'}</div>
          </div>
        </div>
        <Form.Item className="btnContainer">
          <Button className="submitbtn" htmlType="submit">SUBMIT</Button>
          <Button className="resetbtn" onClick={onReset}>RESET</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
