import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getCurrentUser } from "../apicalls/user";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { Layout, Menu, message } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  UserOutlined,
  HomeOutlined,
  LoginOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navItems = [
    {
      key: "home",
      label: <span onClick={() => navigate("/")}>Home</span>,
      icon: <HomeOutlined />,
    },
    {
      label: `${user ? user.name : " "}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                user.isAdmin ? navigate("/admin") : navigate("/profile");
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link to="/login" onClick={() => localStorage.removeItem("token")}>
              Log Out
            </Link>
          ),
          icon: <LoginOutlined />,
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoading());

      const response = await getCurrentUser();
      if (response.success) {
        dispatch(setUser(response.data));
        if (!response.data.isAdmin) {
          message.error("You are not authorized for this page");
          navigate("/");
        }
      } else {
        dispatch(setUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      } // this is for to use the user data anywhere if we need user detail so we are saving this inside user state

      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      dispatch(setUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;
