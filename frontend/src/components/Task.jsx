
export const Task = ({task,handleDeleteTask }) => {
    return (
        <li key={task} className="todo-item" onClick={()=>console.log('  text-decoration: line-through')}>
            <label className="todo-label">
                <input type="checkbox" className="todo-checkbox" />
                <span className="todo-text">{task.value}</span>
            </label>
            <button className="todo-remove" aria-label="Eliminar tarea" onClick={()=>handleDeleteTask (task.id)}>✕</button>
        </li>
    )
}
