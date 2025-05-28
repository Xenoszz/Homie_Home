import CanvasTaskWheel from "@/components/TodoActivity/CanvasTaskWheel.jsx";

export default function TaskWheel({ tasks, setHighlightedTaskId }) {
    return (
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#58482D] mb-6">Task Wheel</h2>
            <CanvasTaskWheel
                tasks={tasks.filter(task => !task.completed)}
                onSelectIndex={idx => {
                    const incomplete = tasks.filter(task => !task.completed);
                    setHighlightedTaskId(incomplete[idx]?._id || null);
                }}
            />
        </div>
    );
} 