import React from "react";
import { Card, Form, Input, Button } from "antd";
import "./signup.css";

const Signup = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card style={{ width: 500, margin: "10% auto"}}>
      <h1>Create Your Account</h1>
      <br></br>
      <p>
        Sign up for a free 14 day trial using your professional email address.
      </p>
      <br></br>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Email">
          <Input placeholder="e.g john.smith@organization.com" />
        </Form.Item>
        <Form.Item>
          <a className="signup-form-signin" href="/login">
            Sign In
          </a>
          <Form.Item>
          
            <Button className="signup-btn" type="primary" htmlType="submit" size='middle' shape="round" >
              Submit
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Signup;
