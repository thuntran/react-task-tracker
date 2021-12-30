import { FaTimes } from 'react-icons/fa' // font awesome

// If task.reminder is true, the div will also have class name of reminder (else, just task)
const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text}{' '}
                <FaTimes 
                    style={{ color: 'red', cursor: 'pointer'}}
                    onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
