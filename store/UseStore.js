import { create } from "zustand";
import { toast } from "react-toastify";
import { httpService } from "../src/config/http-services";

// Zustand store
const useStore = create((set, get) => ({
  tasks: [],
  loading: true,
  detailsTask: [],

  // GET (project)
  getProjectList: async () => {
    set({ loading: true });
    try {
      const { data } = await httpService.get(`/projects`);
      set({ tasks: data, loading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ loading: false });
    }
  },

  // CREATE (project)
  sendData: async (data) => {
    try {
      const response = await httpService.post(`/projects`, data);
      if (response.status === 201) {
        toast.success("پروژه با موفقیت ایجاد شد");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("خطا در ایجاد پروژه");
    }
  },

  // DELETE PROJECT
  deleteProject: async (id) => {
    const { tasks } = get();
    try {
      const response = await toast.promise(
        httpService.delete(`/projects/${id}`),
        {
          pending: "در حال حذف...",
          success: "با موفقیت حذف شد",
          error: "خطا در حذف پروژه",
        }
      );

      if (response.status === 200) {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        set({ tasks: updatedTasks });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("خطا در حذف پروژه");
    }
  },

  // GET ProjectListById (project)
  getProjectListById: async (id) => {
    set({ loading: true });
    try {
      const { data } = await httpService.get(`/projects/${id}`);
      set({ detailsTask: data, loading: false });
    } catch (error) {
      console.error("Error fetching project details:", error);
      set({ loading: false });
    }
  },

  // DELETE TASK
  deletTask: async (projectId, taskId) => {
    const { detailsTask } = get();
    try {
      const updatedTasks = detailsTask.tasks.filter(
        (task) => task.id !== taskId
      );
      const updatedProject = { ...detailsTask, tasks: updatedTasks };

      const response = await toast.promise(
        httpService.put(`/projects/${projectId}`, updatedProject),
        {
          pending: "در حال حذف...",
          success: "تسک با موفقیت حذف شد",
          error: "خطا در حذف تسک",
        }
      );

      if (response.status === 200) {
        set({ detailsTask: { ...detailsTask, tasks: updatedTasks } });
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("خطا در حذف تسک");
    }
  },

  // CREATE TASK
  createTaskSend: async (projectId, data) => {
    const { detailsTask } = get();
    try {
      const newTask = { ...data, id: crypto.randomUUID() };
      const updatedTasks = [...(detailsTask.tasks || []), newTask];
      const updatedProject = { ...detailsTask, tasks: updatedTasks };

      const response = await httpService.put(
        `/projects/${projectId}`,
        updatedProject
      );
      if (response.status === 200) {
        toast.success("تسک با موفقیت ایجاد شد");
        set({ detailsTask: { ...detailsTask, tasks: updatedTasks } });
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("خطا در ایجاد تسک");
    }
  },

  // UPDATE TASK STATUS
  updateTaskStatus: async (projectId, taskId, newStatus) => {
    const { detailsTask } = get();
    try {
      const updatedTasks = detailsTask.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      const updatedProject = { ...detailsTask, tasks: updatedTasks };

      const response = await httpService.put(
        `/projects/${projectId}`,
        updatedProject
      );
      if (response.status === 200) {
        toast.success("وضعیت تسک با موفقیت به‌روزرسانی شد");
        set({ detailsTask: { ...detailsTask, tasks: updatedTasks } });
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("خطا در به‌روزرسانی وضعیت تسک");
    }
  },
}));

export default useStore;
