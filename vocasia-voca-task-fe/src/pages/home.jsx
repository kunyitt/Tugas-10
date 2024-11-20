import  { useEffect } from "react";
import { FiLogOut, FiEdit } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import { useTaskStore } from "../store/taskStore";
import { useProfileStore } from "../store/profileStore";
import { AddForm } from "../components/addForm";
import { TaskList } from "../components/taskList";
import { useNavigate } from "react-router-dom";
import Avatar from "/src/assets/avatar.svg";

const Home = () => {
  const logout  = useAuthStore((state) => state.logout);
  const profile = useProfileStore((state) => state.profile);
  const {tasks, getTasks, removeTask, toggleTaskCompletion} = useTaskStore();

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/update-profile");
  }

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const toggleTask = async (taskId) => {
    try {
      await toggleTaskCompletion(taskId)
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };
  
  const deleteTask = async (taskId) => {
    try {
      await removeTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const incompleteTasks= tasks.filter((task) => !task.isDone)
  const completeTasks= tasks.filter((task) => task.isDone)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral text-base-content">
      <div className="max-w-lg w-full p-6 bg-base-200 rounded-lg shadow-md max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center justify-center gap-3  mb-2">
          <img 
            src={profile?.imageUrl ?? Avatar} 
            alt="avatar" 
            className="w-20 h-20 rounded-full border border-gray-300 mb-2"
          />
        </div>

        <div className="flex items-center justify-center mb-6">
          <h1 className="text-xl text-primary text-center "> Hi, {profile?.name ?? "Voca User"}!</h1>
        </div> 

        <div className="flex items-center justify-center gap-3  mb-6">         
          <FiLogOut size={12} className="hover:cursor-pointer" onClick={logout}/>
          <FiEdit size={12} className="hover:cursor-pointer" onClick={handleEditProfile} />
        </div>   
        
        {/* Input Form */}
      <AddForm/>
        
        {/* Tasks to do */}
        <TaskList title="incompleted Tasks" tasks={incompleteTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask}/>
       

        {/* Completed Tasks */}
        <TaskList title="Completed Tasks" tasks={completeTasks} onDeleteTask={deleteTask}/>
      </div>

      
    </div>
  );
};

export default Home;
