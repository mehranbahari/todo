import { useEffect, useState } from "react";
import styles from "./ProjectList.module.css";
import { useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import { TbListDetails } from "react-icons/tb";
import Spiner from "../../../shared/Spiner/Spiner";
import BtnCreateProject from "../Btn-CreateProject/Btn-CreateProject";
import Button from "../../../shared/Button/Button";
import { motion } from "framer-motion";
import Modal from "../../../shared/Modal/Modal";
import useStore from "../../../../store/UseStore";

const ProjectList = () => {
  const { getProjectList, tasks, deleteProject, loading } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    getProjectList();
  }, []);

  // MODAL DELETE PROJECT
  const [isShow, setIsShow] = useState(false);
  const [selectedIdProject, setSelectedIdProject] = useState(null);

  const handleModalDelete = (id) => {
    setSelectedIdProject(id);
    setIsShow(true);
  };

  const confirmDelete = () => {
    if (selectedIdProject !== null) {
      deleteProject(selectedIdProject);
      setIsShow(false);
    }
  };

  return (
    <div>
      <BtnCreateProject />
      {loading ? (
        <Spiner />
      ) : (
        <div className={styles.wrapperTaskList}>
          {tasks?.map((item) => (
            <motion.div
              className={styles.cardTaskList}
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.8, rotate: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
              }}
            >
              <p className={styles.TaskListTitle}>{item.name}</p>
              <p className={styles.TaskListDes}>{item.description}</p>
              <div className={styles.wrapperBtnTaskList}>
                <Button
                  onClick={() => navigate(`/details-project/${item.id}`)}
                  className={styles.DetailsTaskListbtn}
                >
                  جزییات پروژه
                  <TbListDetails size={20} />
                </Button>

                <Button
                  onClick={() => handleModalDelete(item.id)}
                  className={styles.DeleteTaskListbtn}
                >
                  حذف پروژه
                  <CiTrash size={20} />
                </Button>

                <Modal status={isShow} setStatus={setIsShow}>
                  <p className={styles.title_Delete}>
                    آیا از حذف پروژه مطمن هستید؟
                  </p>
                  <hr className={styles.hr} />
                  <div className={styles.wrap_modal_Btn}>
                    <Button onClick={() => setIsShow(false)}>انصراف</Button>
                    <Button className={styles.deleteM} onClick={confirmDelete}>
                      حذف
                    </Button>
                  </div>
                </Modal>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
