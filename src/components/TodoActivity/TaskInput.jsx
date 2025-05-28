import { Plus, Save, X } from 'lucide-react';

export default function TaskInput({
    isAddingTask,
    newTaskName,
    setNewTaskName,
    handleAddTask,
    setIsAddingTask
}) {
    return isAddingTask ? (
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
    );
} 