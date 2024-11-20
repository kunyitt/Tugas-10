import { create } from "zustand";
import { createTask, getAllTask, toggleTaskCompletion, deleteTask } from "../api/network";

const initialState = {
  tasks: [],
  error: null,
  isLoading: false,
};

export const useTaskStore = create((set, get) => ({
  ...initialState,
  createTask: async (title) => {
    try {
      set({ error: null });
      await createTask(title);
      await get().getTasks();
    } catch (error) {
      set({ error });
    }
  },
  getTasks: async () => {
    try {
      set({ isLoading: false, error: null });

      const { data } = await getAllTask();
      console.log("data", data);
      set({ tasks: data });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },
  
  removeTask: async (taskId) => {
    try {
      await deleteTask(taskId);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== taskId),
      }));
    } catch (error) {
      set({ error: error.message || "Gagal menghapus tugas" });
    }
  },

  toggleTaskCompletion: async (taskId) => {
    try {
      await toggleTaskCompletion(taskId);
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === taskId ? { ...task, isDone: !task.isDone } : task
          ),
        }));
      
    } catch (error) {
      set({ error: error.message || "Gagal mengubah status tugas" });
    }
  },

}));



