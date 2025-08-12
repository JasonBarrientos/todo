import { useState } from "react"
import { AddTask } from "./components/AddTask"
import { Task } from "./components/Task"

export const TodoApp = () => {
    const [tasks, setTasks] = useState([])
    const handleDeleteTask =(id)=>{
        let newTasks = tasks.filter(task=> task.id !==id);
        setTasks(newTasks)
    }
    return (
        <div className="todo-app">
            <header className="todo-header">
                <h1>Tareas {(tasks.length>0)? <span>({tasks.length}) </span>: ''}</h1>
                <p className="subtitle">Agregá nueva tarea</p>
            </header>

            <AddTask setTasks={setTasks}></AddTask>
            {tasks.length > 0 ? (<ul className="todo-list">
                {
                    tasks.map((task) => {
                        return (
                           <Task key={task.id} task={task} handleDeleteTask ={handleDeleteTask } ></Task>
                        )
                    })
                }

            </ul>) : (<p className="empty">No hay tareas — ¡agregá la primera!</p>)


            }



        </div>
    )
}
