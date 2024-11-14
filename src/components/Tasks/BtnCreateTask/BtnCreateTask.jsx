import { useEffect, useState } from "react";
import Modal from "../../../shared/Modal/Modal";
import styles from "./BtnCreateTask.module.css";
import { FaPlus } from "react-icons/fa";
import CreateTask from "../CreateTask/CreateTask";
import Button from "../../../shared/Button/Button";

const BtnCreateTask = () => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsShow(false);
  }, []);

  return (
    <div className={styles.WrapperbtnCreateTask}>
      <Button onClick={() => setIsShow(true)}>
        Create Task
        <FaPlus size={24} />
      </Button>

      <Modal status={isShow} setStatus={setIsShow}>
        <CreateTask />
      </Modal>
    </div>
  );
};

export default BtnCreateTask;
