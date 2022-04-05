import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button } from "antd";
import "./signup.less";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { userActions } from "actions";

const Signup = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

 // const registering = useSelector(state => state.registration.registering);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.logout());
  });

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
      const { from } = {from: {pathname: '/#/billing'}};
      dispatch(userActions.login(user.email, user.password, from ))
    }
  };

  const layout = {
    wrapperCol: {span: 24}
  }

  return (
    <Card className="signup">
      <h1>14 Day Free Trial</h1>
      <h4>
        You can cancel your trial anytime before it ends and no charges will apply.
      </h4>
      <div className="fb-signup">
       <Button className="facebook-btn" type="primary" size="large" block> SIGN UP WITH FACEBOOK</Button>
      </div>
      <div className="or">or via email</div>
      <br/>
      <Form
        className="signup-form"
        name="register"
        {...layout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        size="large"
      >
        <Form.Item name="username"  rules={[{required: true,  message: 'Please input your Username!'}]}>
          <Input placeholder="Username" prefix={<UserOutlined className="site-form-item-icon"/>}/>
        </Form.Item>
        <Form.Item name="email" rules={[{type:'email', message: 'The input is not valid Email!'}, {required: true, message: 'Please input your Email!'}]}>
          <Input placeholder="Email" prefix={<UserOutlined className="site-form-item-icon"/>} />
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
          <Button className="signup-btn" type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Signup;
