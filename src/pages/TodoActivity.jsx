import Menubar from "@/components/Menubar.jsx";
import { ArrowLeft, Loader } from 'lucide-react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { checkAuth } from "@/utils/auth.jsx";
import { fetchRoomToDoActivity } from "@/utils/fetchData.jsx";
import { createTask, toggleTask, updateTaskName, deleteTask } from "@/utils/sendData.jsx";
import TaskList from "@/components/TodoActivity/TaskList.jsx";
import TaskInput from "@/components/TodoActivity/TaskInput.jsx";
import TaskWheel from "@/components/TodoActivity/TaskWheel.jsx";

export default function TodoActivity() {
    const router = useRouter();
    const [room, setRoom] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTaskName, setNewTaskName] = useState("");
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskName, setEditTaskName] = useState("");
    const [highlightedTaskId, setHighlightedTaskId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // auth.jsx   Check authentication and fetch room data
    useEffect(() => {
        if (typeof window !== 'undefined' && router.query.roomId) {
            checkAuth(router, setIsAuthenticated, handleFetchRoomData);
        }
    }, [router.query]);

    // fetchData.jsx   Fetch room and tasks data
    const handleFetchRoomData = async () => {
        const { roomId } = router.query;
        try {
            setLoading(true);
            const { room, tasks } = await fetchRoomToDoActivity(roomId);
            setRoom(room);
            setTasks(tasks);
        } catch (error) {
            console.error("Error fetching room data:", error);
            router.push('/Todolist');
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        router.push('/Todolist');
    };
    
    // sendData.jsx  Create new task
    const handleAddTask = async () => {
        if (!newTaskName.trim() || !room) return;
        try {
            const response = await createTask(room._id, newTaskName);
            setTasks([...tasks, response]);
            setNewTaskName("");
            setIsAddingTask(false);
            handleFetchRoomData();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // sendData.jsx  Toggle task completion status
    const handleToggleTask = async (taskId, isCompleted) => {
        try {
            const response = await toggleTask(taskId, isCompleted);
            setTasks(tasks.map(task => 
                task._id === taskId ? response : task
            ));
            handleFetchRoomData();
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    };
    
    const handleEditTask = (taskId, currentName) => {
        setEditTaskId(taskId);
        setEditTaskName(currentName);
    };
    
    // sendData.jsx   Update task name
    const saveTaskEdit = async () => {
        if (!editTaskName.trim()) return;
        try {
            const response = await updateTaskName(editTaskId, editTaskName);
            setTasks(tasks.map(task => 
                task._id === editTaskId ? response : task
            ));
            setEditTaskId(null);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };
    
    // sendData.jsx   Delete task
    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task._id !== taskId));
            handleFetchRoomData();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    
    if (loading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <Loader className="w-12 h-12 animate-spin text-blue-500" />
            </div>
        );
    }
    
    return (
        <div className="h-screen w-screen bg-[#F5F2E8]">
            <Menubar />
            <div className="p-4 max-w-7xl mx-auto">
                <div className="flex items-center mb-6">
                    <button 
                        onClick={handleGoBack}
                        className="flex items-center mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-[#58482D]">
                        {room?.name || 'Room'} - Activities
                    </h1>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Task List - Left Side */}
                    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-[#58482D]">To do list</h2>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                room?.progress >= 75 ? 'bg-green-100 text-green-800' :
                                room?.progress >= 40 ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                                {room?.progress || 0}% Complete
                            </span>
                        </div>
                        
                        <TaskList 
                            tasks={tasks}
                            editTaskId={editTaskId}
                            editTaskName={editTaskName}
                            setEditTaskName={setEditTaskName}
                            highlightedTaskId={highlightedTaskId}
                            handleToggleTask={handleToggleTask}
                            handleEditTask={handleEditTask}
                            handleDeleteTask={handleDeleteTask}
                            saveTaskEdit={saveTaskEdit}
                            setEditTaskId={setEditTaskId}
                        />
                        
                        <TaskInput 
                            isAddingTask={isAddingTask}
                            newTaskName={newTaskName}
                            setNewTaskName={setNewTaskName}
                            handleAddTask={handleAddTask}
                            setIsAddingTask={setIsAddingTask}
                        />
                    </div>
                    
                    {/* Task Wheel - Right Side */}
                    <TaskWheel 
                        tasks={tasks}
                        setHighlightedTaskId={setHighlightedTaskId}
                    />
                </div>
            </div>
        </div>
    );
}