import React from "react";
import { Input, Form, Button } from "antd";
import { message } from "antd";

import { Link } from "react-router-dom";
import { RegisterUser } from "../apicalls/user";

function Register() {
  const submitForm = async (value) => {
    try {
      const response = await RegisterUser(value);
      console.log(response);
      if (response.success) {
        console.log(response.message);
        message.success(response.message);
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
            <h1>Register to BookMyShow</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={submitForm}>
              <Form.Item
                label="Name"
                name="name"
                className="d-block"
                rules={[{ required: true, message: "Name is required!" }]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                ></Input>
              </Form.Item>
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
                  Sign Up
                </Button>
              </Form.Item>
              <div>
                <p>
                  Already a user? <Link to="/login">Login now</Link>
                </p>
              </div>
            </Form>
          </section>
        </main>
      </header>
    </>
  );
}

export default Register;
