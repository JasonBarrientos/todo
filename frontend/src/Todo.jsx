import { useState } from "react"
import { AddTarea } from "./components/AddTarea"

export const Todo = () => {
    const [tasks, setTasks] = useState([])
    return (
        <div className="todo-app">
            <header className="todo-header">
                <h1>Tareas</h1>
                <p className="subtitle">Agregá tareas y marcá cuando estén hechas</p>
            </header>

            <AddTarea setTasks={setTasks}></AddTarea>
            {tasks.length > 0 ? (<ul className="todo-list">
                {
                    tasks.map((task, idx) => {
                        return (
                            <li key={idx} className="todo-item">
                                <label className="todo-label">
                                    <input type="checkbox" className="todo-checkbox" />
                                    <span className="todo-text">{task}</span>
                                </label>
                                <button className="todo-remove" aria-label="Eliminar tarea">✕</button>
                            </li>
                        )
                    })
                }

            </ul>) : (<p className="empty">No hay tareas — ¡agregá la primera!</p>)


            }



        </div>
    )
}
