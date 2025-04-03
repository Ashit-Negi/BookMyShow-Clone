import { Modal, message } from "antd";
import { deletetheater } from "../../apicalls/theater";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const DeletetheaterModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedtheater,
  setSelectedtheater,
  getData,
}) => {
  const dispatch = useDispatch();
  const handleOk = async () => {
    try {
      dispatch(showLoading());
      const theaterId = selectedtheater._id;
      const response = await deletetheater({ theaterId });
      console.log(theaterId, response);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
        setSelectedtheater(null);
      }
      setIsDeleteModalOpen(false);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      setIsDeleteModalOpen(false);
      message.error(err.messagae);
    }
  };
  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedtheater(null);
  };

  return (
    <>
      <Modal
        title="Delete theater?"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">
          Are you sure you want to delete this theater?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this theater data.
        </p>
      </Modal>
    </>
  );
};

export default DeletetheaterModal;
