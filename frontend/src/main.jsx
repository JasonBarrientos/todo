import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Todo} from './Todo.jsx'
import './styles.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Todo />
    
  </StrictMode>,
)
