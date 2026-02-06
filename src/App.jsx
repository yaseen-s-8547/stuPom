import NextTasks from './Components/NextTasks'
import AddTask from './Components/AddTask'
import RsideBar from './SideBars/RsideBar'
import LsideBar from './SideBars/LsideBar'
import Pomodoro from './Timer/Pomodoro'
import { useState,useEffect } from 'react'




function App() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"))
const [task,setTask]=useState(savedTasks||[])
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(task))
}, [task])
const savedPomodoroCount = JSON.parse(
  localStorage.getItem("pomodoroCount")
)
const[totalPomodorosCompleted,setTotalPomodorosCompleted]=useState(savedPomodoroCount || 0)
useEffect(() => {
  localStorage.setItem(
    "pomodoroCount",
    JSON.stringify(totalPomodorosCompleted)
  )
}, [totalPomodorosCompleted])
const addTask=(taskName)=>{
  setTask((prevTask)=>{
    return[
      ...prevTask,
      {
        id:Date.now(),
        name:taskName,
        status:"next"

      }
    ]
  })
}
const deleteTask = (taskId) => {
  setTask((prevTask) => {
    return prevTask.filter((task) => task.id !== taskId)
  })
}

const incrementPomodoroCount=()=>{
  setTotalPomodorosCompleted(prev=>prev+1)
}
const startNextTask=()=>{
  setTask((prevTask)=>{
    let hasStarted=false
    return prevTask.map((task)=>{
      if(!hasStarted && task.status==="next"){
        hasStarted=true
        return {...task,status:"current"}
      }
      return task
    })
  })
}
const completeCurrentTask = () => {
  setTask((prevTasks) => {
    let completed = false
    let started = false

    return prevTasks.map((task) => {

      if (!completed && task.status === "current") {
        completed = true
        return { ...task, status: "completed" }
      }

      if (completed && !started && task.status === "next") {
        started = true
        return { ...task, status: "current" }
      }

      return task
    })
  })
}

  return (
    <>
      <div className="bg-dark text-light min-vh-100">
        <div className="container">
          <div className="row">
            < AddTask addTask={addTask} totalPomodorosCompleted={totalPomodorosCompleted}/>
          </div>
        </div>
        <div className="container mb-5">
          <div className="row">
            <NextTasks task={task} deleteTask={deleteTask}/>
          </div>
        </div>
        <div className="container-fluid ">
          <div className="row align-items-start">
            <div className="col-3  py-4 mt-5  rounded-3 side-card ">
              <h3 className=' text-center fw-bolder card-title'>Upcomming Task </h3>
              <LsideBar task={task}  deleteTask={deleteTask}/>
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center mb-5">
              <Pomodoro startNextTask={startNextTask} task={task} completeCurrentTask={completeCurrentTask} incrementPomodoroCount={incrementPomodoroCount}/>
            </div>
            <div className="col-3  py-4 mt-5  rounded-3 side-card">
              <h3 className=' text-center fw-bolder card-title '>Completed Task</h3>
              <RsideBar task={task} />
            </div>
          </div>
        </div>
        
      </div>

    </>
  )
}

export default App
