import { useEffect, useState } from "react";
import Modal from "../../../shared/Modal/Modal";
import styles from "./BtnCreateProject.module.css";
import CreateTask from "../craeteProject/CreateProject";
import { FaPlus } from "react-icons/fa";
import Button from "../../../shared/Button/Button";

const BtnCreateProject = () => {
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

export default BtnCreateProject;
