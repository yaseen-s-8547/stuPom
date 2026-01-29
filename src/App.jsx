import NextTasks from './Components/NextTasks'
import AddTask from './Components/AddTask'
import RsideBar from './SideBars/RsideBar'
import LsideBar from './SideBars/LsideBar'
import Pomodoro from './Timer/Pomodoro'
import { useState } from 'react'




function App() {
const [task,setTask]=useState([])
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
const completeCurrentTask=()=>{
  setTask((prevTask)=>{
   let  hasCompleted=false
   return prevTask.map((task)=>{
    if(!hasCompleted&&task.status==="current"){
      hasCompleted=true;
      return{...task,status:"completed"}
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
            < AddTask addTask={addTask} />
          </div>
        </div>
        <div className="container mb-5">
          <div className="row">
            <NextTasks task={task}/>
          </div>
        </div>
        <div className="container-fluid ">
          <div className="row align-items-start">
            <div className="col-3  py-4 mt-5  rounded-3 side-card ">
              <h3 className=' text-center fw-bolder card-title'>Upcomming Task </h3>
              <LsideBar task={task}/>
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center mb-5">
              <Pomodoro startNextTask={startNextTask} task={task} completeCurrentTask={completeCurrentTask}/>
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
