import { Edit, Trash2, Save, X } from 'lucide-react';

export default function TaskList({ 
    tasks, 
    editTaskId, 
    editTaskName, 
    setEditTaskName, 
    highlightedTaskId,
    handleToggleTask,
    handleEditTask,
    handleDeleteTask,
    saveTaskEdit,
    setEditTaskId 
}) {
    return (
        <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
            {tasks.map((task) => (
                <div
                    key={task._id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 ${highlightedTaskId === task._id ? 'bg-yellow-100 border-2 border-yellow-400 shadow-md' : ''}`}
                > 
                    {/* Checkbox */}
                    <div 
                        className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer mr-3 border ${
                            task.completed 
                                ? 'bg-green-500 border-green-600 text-white' 
                                : 'border-gray-400 bg-white hover:bg-gray-100'
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
                                className="flex-1 p-2 border rounded mr-2"
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
                <div className="text-center py-8 text-gray-500">
                    No tasks added yet
                </div>
            )}
        </div>
    );
} 