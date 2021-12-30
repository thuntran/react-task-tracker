// Recall: Components can be functions or classes (here, we use a function with hooks)
// Inside return, use JSX (JavaScript Syntax Extension) (e.g. className instead of class)
// Whatever we want to return, it must be in a SINGLE element (might be a div, or something else)
// import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

// function component (use rafce)
// Make the tasks global so it can be accessed through any component (and not just Tasks) 
// -> now part of the App component state
const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  // useEffect is used to create side effects (something that happens after the page loads)
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // Fetch Task (fetch a single task)
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // Add Task
  const addTask = async (task) => {
    // Make a POST request to add a task to the server
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task) // convert JS object to JSON string
    })

    const data = await res.json()

    // Add the new tasks on top of the existing tasks
    setTasks([...tasks, data]) // ...tasks represents the existing tasks

    // const id = Math.floor(Math.random() * 10000 + 1)
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    // Make a request to delete the task from the server
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    }) // no need to save in a variable because we are not getting the data back
    // Filter tasks from the UI
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder (change value of reminder upon double click)
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    // Create a new task with changed value of reminder upon double click
    const updTask = { ...taskToToggle, reminder : !taskToToggle.reminder }
    // Update the task in the server
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask) // convert object into JSON string
    })

    const data = await res.json()

    setTasks(tasks.map(
      (task) => task.id === id ? { ...task, reminder: data.reminder } : task)
    )
  }
  // Wrap everything in router
  return (
    <Router>
      <div className="container">
        <Header 
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

// // function component
// function App() {
//   return (
//     <div className="container">
//       <Header />
//     </div>
//   );
// }

// // class component (must import React from 'react')
// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class</h1>
//   }
// }

/* Use {} to wrap around names of variables/mathematical expressions so that
they will be printed in the html
E.g:
const name = "Thu"
const x = true
...
<h2>Hello {name}</h2>
<h2>Hello {x ? "Yes" : "No"}</h2>
<h2>Hello {1 + 1}</h2>
*/

/* 
For <Header />, if we want to use something not string for title=, we need to wrap around {}
E.g.
<Header title={1} />
<Header title={true} />
*/

// States get passed down, actins get passed up

/** 
// Delete Task
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
}
filter method takes in a function to create a new array with all elements
that PASS the test implemented by the provided function.
So if we want to delete the task, we keep all the tasks with id different from
the task to be deleted (keep everything, except the one to be deleted)
*/