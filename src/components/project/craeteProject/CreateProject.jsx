import { useForm } from "react-hook-form";
import styles from "./CreateProject.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../../../shared/card/Card";
import { useAppContext } from "../../../context/ApiContext";
import Button from "../../../shared/Button/Button";
import { CreateProjectVal } from "../../../validations/CreateProject";

const CreateProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CreateProjectVal),
  });
  const { sendData, getProjectList } = useAppContext();

  // submit form
  const submihHandle = async (data) => {
    await sendData(data);
    await getProjectList();
    reset();
  };

  return (
    <Card>
      <div className={styles.formContainer}>
        <h2>Create Project</h2>
        <form onSubmit={handleSubmit(submihHandle)} className={styles.logForm}>
          <div className={styles.logWrapper}>
            <label htmlFor="name">نام پروژه:</label>
            <input
              placeholder="نام پروژه را وارد کنید"
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
            <label htmlFor="description">توضیح پروژه:</label>
            <textarea
              placeholder="توضیحات را وارد کنید"
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
          <div className={styles.buttonWrapper}>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default CreateProject;
