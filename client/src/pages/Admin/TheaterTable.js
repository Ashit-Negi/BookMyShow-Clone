import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { message, Button, Table } from "antd";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAlltheatersForAdmin, updatetheater } from "../../apicalls/theater";

function TheatersTable() {
  const [theaters, settheaters] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAlltheatersForAdmin();
      if (response.success) {
        const alltheaters = response.data;
        settheaters(
          alltheaters.map(function (item) {
            return { ...item, key: `theater${item._id}` };
          })
        );
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const handleStatusChange = async (theater) => {
    try {
      dispatch(showLoading);
      let values = {
        ...theaters,
        theaterId: theater._id,
        isActive: !theater.isActive,
      };
      const response = await updatetheater(values);
      console.log(response, theater);
      if (response.success) {
        message.success(response.message);
        getData();
      }
      dispatch(hideLoading);
    } catch (err) {
      dispatch(hideLoading);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, data) => {
        return data.owner && data.owner.name;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, data) => {
        if (data.isActive) {
          return "Approved";
        } else {
          return "Pending/ Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            {data.isActive ? (
              <Button onClick={() => handleStatusChange(data)}>Block</Button>
            ) : (
              <Button onClick={() => handleStatusChange(data)}>Approve</Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return <>{<Table dataSource={theaters} columns={columns} />}</>;
}

export default TheatersTable;
