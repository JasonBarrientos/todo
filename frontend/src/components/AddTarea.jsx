import React, { useState } from 'react'

export const AddTarea = ({setTasks}) => {

    const [inputValue, setInputValue] = useState('')

const onInputChanged=({target})=>{
    setInputValue(target.value)  
}
const onSubmitValue=(event)=>{
    event.preventDefault();
    setTasks(tasks=>[...tasks,inputValue]);
    setInputValue('')
}

  return (
    <form onSubmit={onSubmitValue} className="todo-form">
        <input value={inputValue} onChange={onInputChanged} className="todo-input" type="text" placeholder="Agregar nueva tarea..." />
    </form>  )
}
