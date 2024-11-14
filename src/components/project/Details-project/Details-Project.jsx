import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../../context/ApiContext";
import Spiner from "../../../shared/Spiner/Spiner";
import styles from "./Details-Project.module.css";
import Card from "../../../shared/card/Card";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import BtnCreateTask from "../../Tasks/BtnCreateTask/BtnCreateTask";
import Button from "../../../shared/Button/Button";
import Modal from "../../../shared/Modal/Modal";

const DetailsProject = () => {
  const { id } = useParams();
  console.log(id);
  const {
    loading,
    getProjectListById,
    detailsTask,
    deletTask,
    updateTaskStatus,
  } = useAppContext();

  useEffect(() => {
    getProjectListById(id);
  }, [id]);

  const handleStatusChange = (taskId, status) => {
    // به‌روزرسانی وضعیت تسک در سرور
    updateTaskStatus(id, taskId, status);
  };

  // MODAL DELETE PROJECT
  const [isShow, setIsShow] = useState(false);
  const [selectedIdTask, setSelectedIdTask] = useState(null);

  const handleModalDelete = (id) => {
    setSelectedIdTask(id);
    setIsShow(true);
  };

  const confirmDelete = () => {
    if (selectedIdTask !== null) {
      deletTask(id, selectedIdTask);
      setIsShow(false);
    }
  };

  return (
    <div >
      {loading ? (
        <Spiner />
      ) : (
        <div className={styles.wrapDetails}>
          {detailsTask ? (
            <Card>
              <div className={styles.detailsAuth}>
                <p className={styles.wrapBadge}>
                  <span className={styles.badge}>نام پروژه:</span>
                  <span className={styles.DetailText}>{detailsTask.name}</span>
                </p>
                <p className={styles.wrapBadge}>
                  <span className={styles.badge}>موضوع پروژه:</span>
                  <span className={styles.DetailText}>
                    {detailsTask?.description?.length > 50
                      ? detailsTask.description.substring(0, 50) + "..."
                      : detailsTask.description}
                  </span>
                </p>
                {/*Btn  ADD TASK */}
                <BtnCreateTask />
              </div>
              <div className={styles.cardTask}>
                {detailsTask?.tasks ? (
                  detailsTask?.tasks?.map((item, index) => (
                    <Card key={item.id || index}>
                      <section className={styles.wrapTaskDetails}>
                        <div className={styles.detailsAuth}>
                          <p>
                            <span className={styles.badge}>نام تسک:</span>
                            <span>{item.name}</span>
                          </p>
                          <p>
                            <span className={styles.badge}>موضوع تسک:</span>
                            <span>{item.description}</span>
                          </p>
                          <p>
                            <span className={styles.badge}>
                              زمان انجام تسک:
                            </span>
                            <span>{item.dueDate}</span>
                          </p>
                          <div className={styles.wrapRadioBtn}>
                            <span className={styles.badge}>
                              وضعیت انجام تسک:
                            </span>
                            <section className={styles.radioBtn}>
                              <div>
                                <input
                                  type="radio"
                                  id={`done-${item.id}`}
                                  name={`status-${item.id}`}
                                  value="done"
                                  checked={item.status === "done"}
                                  onChange={() =>
                                    handleStatusChange(item.id, "done")
                                  }
                                />
                                <label htmlFor={`done-${item.id}`}>done</label>
                              </div>

                              <div>
                                <input
                                  type="radio"
                                  id={`in-progress-${item.id}`}
                                  name={`status-${item.id}`}
                                  value="in-progress"
                                  checked={item.status === "in-progress"}
                                  onChange={() =>
                                    handleStatusChange(item.id, "in-progress")
                                  }
                                />
                                <label htmlFor={`in-progress-${item.id}`}>
                                  in-progress
                                </label>
                              </div>

                              <div>
                                <input
                                  type="radio"
                                  id={`toDo-${item.id}`}
                                  name={`status-${item.id}`}
                                  value="toDo"
                                  checked={item.status === "toDo"}
                                  onChange={() =>
                                    handleStatusChange(item.id, "toDo")
                                  }
                                />
                                <label htmlFor={`toDo-${item.id}`}>toDo</label>
                              </div>
                            </section>
                          </div>
                        </div>
                        {/* ICONS */}
                        <div className={styles.wrapIcons}>
                          <Button onClick={() => handleModalDelete(item.id)}>
                            <FaTrash size={24} color="#b8860b" />
                          </Button>
                          <Modal status={isShow} setStatus={setIsShow}>
                            <p className={styles.title_Delete}>
                              آیا از حذف پروژه مطمن هستید؟
                            </p>
                            <hr className={styles.hr} />
                            <div className={styles.wrap_modal_Btn}>
                              <Button onClick={() => setIsShow(false)}>
                                انصراف
                              </Button>
                              <Button
                                className={styles.deleteM}
                                onClick={confirmDelete}
                              >
                                حذف
                              </Button>
                            </div>
                          </Modal>
                          {/* <button>
                            <FaPen size={24} color="#9858fd" />
                          </button> */}
                        </div>
                      </section>
                    </Card>
                  ))
                ) : (
                  <p>هنوز تسک ایجاد نشده است</p>
                )}
              </div>
            </Card>
          ) : (
            <p>اطلاعات در دسترس نیست</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailsProject;
