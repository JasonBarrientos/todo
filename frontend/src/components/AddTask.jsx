import{ useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export const AddTask = ({setTasks}) => {

    const [inputValue, setInputValue] = useState('')

const onInputChanged=({target})=>{
    setInputValue(target.value)  
}
const onSubmitValue=(event)=>{
    event.preventDefault();
    setTasks(tasks=>[...tasks,{
        id: uuidv4(),
        value:inputValue,
        completed:false
    }]);
    setInputValue('')
}

  return (
    <form onSubmit={onSubmitValue} className="todo-form">
        <input value={inputValue} onChange={onInputChanged} className="todo-input" type="text" placeholder="Agregar nueva tarea..." />
    </form>  )
}
