/* eslint-disable react/prop-types */

import { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";
import { httpService } from "../config/http-services";

const ApiContext = createContext();

// Context Provider
const ContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsTask, setDetailsTask] = useState([]);

  // GET (project)
  const getProjectList = async () => {
    setLoading(true);
    try {
      const { data } = await httpService.get(`http://localhost:5001/projects`);
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE (project)
  const sendData = async (data) => {
    try {
      const response = await httpService.post(`/projects`, data);
      if (response.status === 201) {
        toast.success("پروژه با موفیت ایجاد شد");
      }
    } catch (error) {
      console.log(error);
      toast.error("خطا در ایجاد پروژه");
    }
  };

  // DELETE  PROJECT
  const deleteProject = async (id) => {
    try {
      const response = await toast.promise(
        httpService.delete(`/projects/${id}`),
        {
          pending: "در حال حذف...",
          success: {
            render({ data }) {
              console.log(data);
              if (data.status === 200) {
                const filteredDelete = tasks.filter((item) => item.id !== id);
                setTasks(filteredDelete);
              }
              return "با موفقیت حذف شد";
            },
          },
          error: {
            render({ data }) {
              if (data && data.status !== 200) {
                return "حذف نشد";
              }
              return "خطا در حذف";
            },
          },
        }
      );
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("خطا در حذف پروژه");
    }
  };

  // GET TaskListById (project)
  const getProjectListById = async (id) => {
    console.log(id);
    setLoading(true);
    try {
      const { data } = await httpService.get(`/projects/${id}`);
      setDetailsTask(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TASK
  const deletTask = async (projectId, taskId) => {
    console.log(projectId, taskId);

    try {
      // دریافت پروژه به‌صورت کامل
      // const projectResponse = await httpService.get(`/projects/${projectId}`);
      // const project = projectResponse.data;

      // حذف تسک مورد نظر از آرایه `tasks`
      const updatedTasks = detailsTask.tasks.filter(
        (task) => task.id !== taskId
      );
      const updatedProject = { ...detailsTask, tasks: updatedTasks };

      // ارسال پروژه‌ی به‌روز شده به سرور
      const response = await toast.promise(
        httpService.put(`/projects/${projectId}`, updatedProject),
        {
          pending: "در حال حذف...",
          success: "تسک با موفقیت حذف شد",
          error: "خطا در حذف تسک",
        }
      );

      if (response.status === 200) {
        // بروزرسانی حالت محلی
        setDetailsTask((prevDetails) => ({
          ...prevDetails,
          tasks: updatedTasks,
        }));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("خطا در حذف تسک");
    }
  };

  //  CREATE TASK
  const createTaskSend = async (projectId, data) => {
    try {
      const newTask = {
        ...data,
        id: crypto.randomUUID(),
      };

      // به آرایه tasks پروژه، تسک جدید را اضافه کنید
      const updatedTasks = [...(detailsTask.tasks || []), newTask];
      const updatedProject = { ...detailsTask, tasks: updatedTasks };

      // پروژه‌ی به‌روز شده را به سرور ارسال کنید
      const response = await httpService.put(
        `/projects/${projectId}`,
        updatedProject
      );

      if (response.status === 200) {
        toast.success("تسک با موفقیت ایجاد شد");

        // بروزرسانی وضعیت محلی برای نمایش تغییرات در رابط کاربری
        setDetailsTask((prevDetails) => ({
          ...prevDetails,
          tasks: updatedTasks,
        }));
      }
    } catch (error) {
      console.log("Error creating task:", error);
      toast.error("خطا در ایجاد تسک");
    }
  };

  // STATUS
  const updateTaskStatus = async (projectId, taskId, newStatus) => {
    try {
      // به‌روزرسانی وضعیت تسک در آرایه `tasks`
      const updatedTasks = detailsTask.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      const updatedProject = { ...detailsTask, tasks: updatedTasks };

      // ارسال داده به‌روز شده به سرور
      const response = await httpService.put(
        `/projects/${projectId}`,
        updatedProject
      );

      if (response.status === 200) {
        // بروزرسانی وضعیت محلی برای نمایش تغییرات در رابط کاربری
        setDetailsTask((prevDetails) => ({
          ...prevDetails,
          tasks: updatedTasks,
        }));
        toast.success("وضعیت تسک با موفقیت به‌روزرسانی شد");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("خطا در به‌روزرسانی وضعیت تسک");
    }
  };

  return (
    <ApiContext.Provider
      value={{
        sendData,
        getProjectList,
        tasks,
        setTasks,
        deleteProject,
        loading,
        getProjectListById,
        detailsTask,
        createTaskSend,
        deletTask,
        updateTaskStatus,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the ApiContext
const useAppContext = () => {
  return useContext(ApiContext);
};

export { ContextProvider, useAppContext };
