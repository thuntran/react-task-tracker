// import { useState } from 'react' // useState hook
import Task from './Task'

// // Create an array of tasks (as objects), however eventually we want to make
// // tasks part of our state
// const tasks = [
//     {
//         id: 1,
//         text: "Doctors Appointment",
//         day: "Feb 5th at 2:30pm",
//         reminder: true

//     },
//     {
//         id: 2,
//         text: "Meeting at School",
//         day: "Feb 6th at 1:30pm",
//         reminder: true
//     },
//     {
//         id: 3,
//         text: "Food Shopping",
//         day: "Feb 5th at 2:30pm",
//         reminder: false
//     }
// ]

// Tasks now are part of our component state
// State is immutable: it's not something that can be directly changed -
// we besically recreate it and send it down - it's a one-way data

// Each task is now passed in as a prop
const Tasks = ({ tasks, onDelete, onToggle }) => {
    // const [tasks, setTasks] = useState([
    //     {
    //         id: 1,
    //         text: "Doctors Appointment",
    //         day: "Feb 5th at 2:30pm",
    //         reminder: true
    
    //     },
    //     {
    //         id: 2,
    //         text: "Meeting at School",
    //         day: "Feb 6th at 1:30pm",
    //         reminder: true
    //     },
    //     {
    //         id: 3,
    //         text: "Food Shopping",
    //         day: "Feb 5th at 2:30pm",
    //         reminder: false
    //     }
    // ])
    return (
        <>
            {tasks.map((task, index) => (
                <Task key={index} task={task} 
                onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>
    )
}



export default Tasks

/*
{tasks.map((task) => (<h3 key={task.id}>{task.text}</h3>))}
The output here is a LIST
Each child in a list should have a unique key prop
*/