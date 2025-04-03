import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAlltheaters } from "../../apicalls/theater";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import TheaterFormModal from "./TheaterFormModal";
import DeletetheaterModal from "./DeleteTheaterModal";

const TheaterList = () => {
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedtheater, setSelectedtheater] = useState(null);
  const [formType, setFormType] = useState("add");
  const [theaters, settheaters] = useState(null);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAlltheaters({ owner: user._id });

      console.log("API Response:", response); // <-- Check if data is coming

      if (response.success) {
        console.log("Theater Data:", response.data); // <-- Check what is returned

        settheaters(
          response.data.map((item) => ({
            ...item,
            key: `theater${item._id}`, // Ensure unique keys
          }))
        );
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      console.error("Error fetching theaters:", err);
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
          return `Approved`;
        } else {
          return `Pending/ Blocked`;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedtheater(data);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedtheater(data);
              }}
            >
              <DeleteOutlined />
            </Button>
            {data.isActive && (
              <Button
                onClick={() => {
                  setIsShowModalOpen(true);
                  setSelectedtheater(data);
                }}
              >
                + Shows
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add theater
        </Button>
      </div>
      <Table dataSource={theaters} columns={columns} />
      {isModalOpen && (
        <TheaterFormModal
          isModalOpen={isModalOpen}
          selectedtheater={selectedtheater}
          setSelectedtheater={setSelectedtheater}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeletetheaterModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedtheater={selectedtheater}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedtheater={setSelectedtheater}
          getData={getData}
        />
      )}

      {/* {isShowModalOpen && (
        <ShowModal
          isShowModalOpen={isShowModalOpen}
          setIsShowModalOpen={setIsShowModalOpen}
          selectedtheater={selectedtheater}
        />
      )} */}
    </>
  );
};

export default TheaterList;
