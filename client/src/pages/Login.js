import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { LoginUser } from "../apicalls/user";
function Login() {
  const submitForm = async (value) => {
    try {
      const response = await LoginUser(value);
      if (response) {
        message.success(response.message);

        window.location.href = "/"; // to change the router from login component to home page
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header className="App-header">
        <main className=" text-center px-3">
          <section className="left-section">
            <h1>Welcome back to BookMyShow</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={submitForm}>
              <Form.Item
                label="Email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required!" }]}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                ></Input>
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Enter your password" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                ></Input>
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
              <div>
                <p>
                  Not registered yet? <Link to="/register">Register now</Link>
                </p>
              </div>
            </Form>
          </section>
        </main>
      </header>
    </>
  );
}

export default Login;
