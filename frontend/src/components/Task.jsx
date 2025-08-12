import { useState } from "react";

export const Task = ({ task, handleDeleteTask }) => {
    const [completed, setCompleted] = useState(task.completed)
    const handleCompleteTask = () => {
        setCompleted(!completed)
    }
    return (
        <li key={task.id} className={`todo-item ${completed ? 'completed' : ''}`}  >
            <label className="todo-label">
                <input type="checkbox" className="todo-checkbox" onChange={handleCompleteTask} checked={completed} />
                <span className={`todo-text ${completed ? 'completed' : ''}`}>{task.value}</span>
            </label>
            <button className="todo-remove" onClick={() => handleDeleteTask(task.id)}>✕</button>
        </li>
    )
}
