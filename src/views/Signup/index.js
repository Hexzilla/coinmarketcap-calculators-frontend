import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Layout } from "antd";
import "./signup.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "_actions";

const Signup = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const registering = useSelector(state => state.registration.registering);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);
  const onFinish = (values) => {
    setUser({
      name: values.username,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation
    });

    console.log(user);
    if (user.name && user.email && user.password && user.password_confirmation) {
      dispatch(userActions.register(user));
    }
  };

  const layout = {
    wrapperCol: {span: 24}
  }

  return (
    <Card style={{ width: 500, margin: "10% auto"}}>
      <h1>Create Your Account</h1>
      <br></br>
      <p>
        Sign up for a free 14 day trial using your professional email address.
      </p>
      <br></br>
      <Form

        name="register"
        {...layout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="username"  rules={[{required: true,  message: 'Please input your Username!'}]}>
          <Input placeholder="Username" prefix={<UserOutlined className="site-form-item-icon"/>}/>
        </Form.Item>
        <Form.Item name="email" rules={[{type:'email', message: 'The input is not valid Email!'}, {required: true, message: 'Please input your Email!'}]}>
          <Input placeholder="e.g john.smith@organization.com" prefix={<UserOutlined className="site-form-item-icon"/>} />
        </Form.Item>
        <Form.Item name="password" rules={[{required: true, message: 'Please input your password!'}]} hasFeedback>
          <Input.Password placeholder="Password" prefix={<LockOutlined className="site-form-item-icon"/>}/>
        </Form.Item>
        <Form.Item name="password_confirmation" dependencies={['password']} hasFeedback rules={[{required: true, message: 'Please confirm your password!'}, ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
          },
        }),]}>
          <Input.Password placeholder="Password" prefix={<LockOutlined className="site-form-item-icon"/>}/>
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
