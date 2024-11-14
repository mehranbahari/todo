import styles from "./CreateTask.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../../../shared/card/Card";
import { CreateTaskVal } from "../../../validations/CreateTask";
import { useAppContext } from "../../../context/ApiContext";
import { useParams } from "react-router-dom";
import Button from "../../../shared/Button/Button";

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CreateTaskVal),
  });

  const { createTaskSend } = useAppContext();
  const { id } = useParams();

  // Submit form
  const submitHandle = (data) => {
    console.log("Form Data:", data);
    createTaskSend(id, data);
    reset();
  };

  // Log errors if any
  console.log("Form Errors:", errors);

  return (
    <Card>
      <div className={styles.formContainer}>
        <h2>Create Task</h2>
        <form onSubmit={handleSubmit(submitHandle)} className={styles.logForm}>
          <div className={styles.logWrapper}>
            <label htmlFor="name">Name:</label>
            <input
              {...register("name")}
              autoComplete="off"
              id="name"
              type="text"
              className={`${styles.logInput} ${
                errors.name ? styles.error : ""
              }`}
            />
            {errors.name && (
              <span className={styles.errorMessage}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.logWrapper}>
            <label htmlFor="description">Description:</label>
            <input
              {...register("description")}
              autoComplete="off"
              id="description"
              type="text"
              className={`${styles.logInput} ${
                errors.description ? styles.error : ""
              }`}
            />
            {errors.description && (
              <span className={styles.errorMessage}>
                {errors.description.message}
              </span>
            )}
          </div>

          <div className={styles.logWrapper}>
            <label htmlFor="dueDate">Date (Jalali):</label>
            <input
              {...register("dueDate")}
              autoComplete="off"
              id="dueDate"
              type="date"
              placeholder="YYYY/MM/DD"
              className={`${styles.logInput} ${
                errors.dueDate ? styles.error : ""
              }`}
            />
            {errors.dueDate && (
              <span className={styles.errorMessage}>
                {errors.dueDate.message}
              </span>
            )}
          </div>

          <div className={styles.logWrapper}>
            <label>Status:</label>
            <div className={styles.radioBtn}>
              <label>
                <input
                  type="radio"
                  value="done"
                  {...register("status")} // Registering the radio buttons
                />
                Done
              </label>
              <label>
                <input
                  type="radio"
                  value="in-progress"
                  {...register("status")} // Registering the radio buttons
                />
                In Progress
              </label>
              <label>
                <input
                  type="radio"
                  value="toDo"
                  {...register("status")} // Registering the radio buttons
                />
                To Do
              </label>
            </div>
            {errors.status && (
              <span className={styles.errorMessage}>
                {errors.status.message}
              </span>
            )}
          </div>

          <div className={styles.buttonWrapper}>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default CreateTask;
