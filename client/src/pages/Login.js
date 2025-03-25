import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../apicalls/user";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
function Login() {
  const navigate = useNavigate();

  const submitForm = async (value) => {
    try {
      const response = await LoginUser(value);
      // console.log(response);
      if (response.success) {
        message.success(response.message);

        localStorage.setItem("token", response.token);

        window.location.href = "/"; // to change the router from login component to home page
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // to not to navigate from home page to anyother page
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

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
