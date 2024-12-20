import styles from "./CreateTask.module.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../../../shared/card/Card";
import { CreateTaskVal } from "../../../validations/CreateTask";
import { useParams } from "react-router-dom";
import Button from "../../../shared/Button/Button";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import useStore from "../../../../store/UseStore";

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(CreateTaskVal),
  });

  const { createTaskSend } = useStore();
  const { id } = useParams();

  // Submit form
  const submitHandle = (data) => {
    // console.log("Form Data:", data);
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
            <label htmlFor="name">نام تسک:</label>
            <input
              placeholder="نام تسک را وارد کنید"
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
            <label htmlFor="description">موضوع تسک:</label>
            <input
              placeholder="موضوع تسک را وارد کنید"
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

          <label htmlFor="dueDate">زمان تسک:</label>
          <div className={styles.logWrapper}>
            <Controller
              control={control}
              name="dueDate"
              render={({ field: { onChange, value } }) => (
                <>
                  <DatePicker
                    placeholder="تاریخ تسک را وارد کنید"
                    value={value || ""}
                    onChange={(date) => {
                      const formattedDate = date?.format("YYYY/MM/DD");
                      onChange(formattedDate);
                    }}
                    calendar={persian}
                    locale={persian_fa}
                  />
                  {errors.dueDate && (
                    <span className={styles.errorMessage}>
                      {errors.dueDate.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <div className={styles.logWrapper}>
            <label>وضعیت تسک:</label>
            <div className={styles.radioBtn}>
              <label>
                <input type="radio" value="done" {...register("status")} />
                Done
              </label>
              <label>
                <input
                  type="radio"
                  value="in-progress"
                  {...register("status")}
                />
                In Progress
              </label>
              <label>
                <input type="radio" value="toDo" {...register("status")} />
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
