import { Button } from "antd";
import React, { useState } from "react";
import TheaterFormModal from "./TheaterFormModal";

function TheaterList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="d-flex justify-content-end">
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Add Theater
        </Button>
        {isModalOpen && (
          <TheaterFormModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </>
  );
}

export default TheaterList;
