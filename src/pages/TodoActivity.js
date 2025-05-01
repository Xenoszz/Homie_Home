import Menubar from "@/components/Menubar";
import { ArrowLeft, Edit, Trash2, Plus, Save, X, Loader } from 'lucide-react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TodoActivity() {
    const router = useRouter();
    const [room, setRoom] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTaskName, setNewTaskName] = useState("");
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskName, setEditTaskName] = useState("");
    const [highlightedTask, setHighlightedTask] = useState(null);
    
    useEffect(() => {
        // Check if we're on the client-side and have the roomId
        if (typeof window !== 'undefined' && router.query.roomId) {
            fetchRoomData();
        }
    }, [router.query]);
    
    const fetchRoomData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }
            
            const { roomId } = router.query;
            
            // Fetch room details
            const roomResponse = await axios.get(`http://localhost:8000/api/rooms`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const roomData = roomResponse.data.find(r => r._id === roomId);
            if (!roomData) {
                console.error("Room not found");
                router.push('/Todolist');
                return;
            }
            
            setRoom(roomData);
            
            // Fetch tasks for this room
            const tasksResponse = await axios.get(`http://localhost:8000/api/rooms/${roomId}/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setTasks(tasksResponse.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching room data:", error);
            setLoading(false);
        }
    };
    
    const handleGoBack = () => {
        router.push('/Todolist');
    };
    
    const handleAddTask = async () => {
        if (!newTaskName.trim()) return;
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/api/rooms/${room._id}/tasks`, 
                { name: newTaskName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            setTasks([...tasks, response.data]);
            setNewTaskName("");
            setIsAddingTask(false);
            
            // Refresh room data to get updated progress
            fetchRoomData();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const randomTask = () => {
        // กรองเอาเฉพาะ tasks ที่ยังไม่เสร็จ
        const incompleteTasks = tasks.filter(task => !task.completed);
        
        if (incompleteTasks.length === 0) {
            return; // ไม่มี task ที่ยังไม่เสร็จ
        }
        
        // สุ่มหนึ่ง task จาก incompleteTasks
        const randomIndex = Math.floor(Math.random() * incompleteTasks.length);
        const randomSelectedTask = incompleteTasks[randomIndex];
        
        // เพิ่ม animation หรือ effect เพื่อแสดงผล task ที่สุ่มได้ (เช่น highlight)
        setHighlightedTask(randomSelectedTask._id);
        
        // ลบ highlight หลังจาก 2 วินาที
        setTimeout(() => {
            setHighlightedTask(null);
        }, 2000);
    };
    
    const handleToggleTask = async (taskId, isCompleted) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8000/api/tasks/${taskId}`, 
                { completed: !isCompleted },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            setTasks(tasks.map(task => 
                task._id === taskId ? response.data : task
            ));
            
            // Refresh room data to get updated progress
            fetchRoomData();
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    };
    
    const handleEditTask = (taskId, currentName) => {
        setEditTaskId(taskId);
        setEditTaskName(currentName);
    };
    
    const saveTaskEdit = async () => {
        if (!editTaskName.trim()) return;
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8000/api/tasks/${editTaskId}`, 
                { name: editTaskName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            setTasks(tasks.map(task => 
                task._id === editTaskId ? response.data : task
            ));
            setEditTaskId(null);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };
    
    const handleDeleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setTasks(tasks.filter(task => task._id !== taskId));
            
            // Refresh room data to get updated progress
            fetchRoomData();
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
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {room?.progress || 0}% Complete
                            </span>
                        </div>
                        
                        {/* Task List */}
                        <div className="space-y-3 mb-6">
                            {tasks.map(task => (
                                <div 
                                key={task._id} 
                                className={`flex items-center p-3 ${
                                    highlightedTask === task._id 
                                        ? 'bg-yellow-200 animate-pulse' 
                                        : 'bg-[#FAF6E3]'
                                } rounded-md shadow-sm transition-colors duration-300`}
                            >
                                    {/* Checkbox */}
                                    <div 
                                        className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer mr-3 border ${
                                            task.completed 
                                                ? 'bg-green-500 border-green-600 text-white' 
                                                : 'border-gray-400 bg-white'
                                        }`}
                                        onClick={() => handleToggleTask(task._id, task.completed)}
                                    >
                                        {task.completed && '✓'}
                                    </div>
                                    
                                    {/* Task Name */}
                                    {editTaskId === task._id ? (
                                        <div className="flex-1 flex items-center">
                                            <input
                                                type="text"
                                                value={editTaskName}
                                                onChange={(e) => setEditTaskName(e.target.value)}
                                                className="flex-1 p-1 border rounded mr-2"
                                                autoFocus
                                            />
                                            <button 
                                                onClick={saveTaskEdit}
                                                className="p-1 text-green-600 hover:text-green-800 mr-1"
                                            >
                                                <Save size={18} />
                                            </button>
                                            <button 
                                                onClick={() => setEditTaskId(null)}
                                                className="p-1 text-red-600 hover:text-red-800"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                                {task.name}
                                            </span>
                                            
                                            {/* Action Buttons */}
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleEditTask(task._id, task.name)}
                                                    className="p-1 text-blue-600 hover:text-blue-800"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteTask(task._id)}
                                                    className="p-1 text-red-600 hover:text-red-800"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                            
                            {tasks.length === 0 && (
                                <div className="text-center py-4 text-gray-500">
                                    No tasks added yet
                                </div>
                            )}
                        </div>
                        
                        {/* Add Task Input */}
                        {isAddingTask ? (
                            <div className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                    placeholder="Enter task name"
                                    className="flex-1 p-2 border rounded mr-2"
                                    autoFocus
                                />
                                <button 
                                    onClick={handleAddTask}
                                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mr-1"
                                >
                                    <Save size={18} />
                                </button>
                                <button 
                                    onClick={() => setIsAddingTask(false)}
                                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => setIsAddingTask(true)}
                                className="flex items-center justify-center w-full p-2 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                <Plus size={20} className="mr-2" />
                                <span>Add task</span>
                            </button>
                        )}
                    </div>
                    
                    {/* Task Wheel - Right Side (Placeholder for now) */}
                    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-[#58482D] mb-4">Task Wheel</h2>
                        <div className="flex flex-col items-center justify-center h-64">
                            <div className="w-48 h-48 rounded-full border-4 border-gray-200 relative flex items-center justify-center">
                                {/* You'll implement the wheel functionality later */}
                                <div className="text-xl font-semibold text-[#58482D]">
                                    {tasks.find(task => task.completed === false)?.name || "All Done!"}
                                </div>
                            </div>
                            <button 
    onClick={randomTask}
    className="mt-6 bg-[#B59F78] text-white px-6 py-2 rounded-md hover:bg-[#8d7c5f]"
>
    random
</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}