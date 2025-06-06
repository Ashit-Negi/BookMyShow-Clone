import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import BookingList from "./BookingList";
import TheaterList from "./TheaterList";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const tabItems = [
    {
      key: "2",
      label: "theaters",
      children: <TheaterList />,
    },
    {
      key: "1",
      label: "Bookings",
      children: <BookingList />,
    },
  ];
  return (
    <div>
      <h1>Welcome {user.name}! to your Profile</h1>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
}

export default Profile;
