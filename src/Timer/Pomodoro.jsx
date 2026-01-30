import { useState,useEffect } from "react"
import CurrentTask from "../Components/CurrentTask"

function Pomodoro({startNextTask,task,completeCurrentTask}) {
    const [timerMode,setTimerMode]=useState("idle")

    const handleStart=()=>{
        setTimerMode("running")
       const hasCurrent = task.some(task=>task.status==="current")
       if(!hasCurrent){
        startNextTask()
       }
    }
    const handlePause=()=>{
        setTimerMode("paused")
    }
    const handleContinue=()=>{
        setTimerMode("running")
    }
    const handleStop=()=>{
        setTimerMode("idle")
        setRemainingTime(POMODORO_DURATION)
    }
    const POMODORO_DURATION=25*60
    const[remainingTime,setRemainingTime]=useState(POMODORO_DURATION)
    const formatTime=(seconds)=>{
        const minutes = Math.floor(seconds/60)
        const remainingSeconds=seconds%60
        const paddedSeconds=remainingSeconds<10?`0${remainingSeconds}`:remainingSeconds
        return `${minutes}:${paddedSeconds}`
    }
    useEffect(()=>{
       let interValId=null
       if(timerMode==="running"){
        interValId=setInterval(()=>{
            setRemainingTime((prev)=>{
                if(prev<=1){
                    setTimerMode("idle")
                    return 0
                }
                return prev-1
            })
        },1000)
       }
       return()=>{
        if(interValId){
            clearInterval(interValId)
        }
       }
    },[timerMode])
    const hasNextTask=task.some(task=>task.status==="next")
    return (
        <div className="d-flex flex-column">
            { /* This div will become the visual throne of the app */}
            <div className="d-flex flex-column justify-content-center p-4  rounded-4 center-card">
                <div className="d-flex justify-content-center align-items-center my-1">
                    <svg width="360" height="360">
                        <circle cx="180" cy="180" r="150" stroke="#2A2B34"
                            strokeWidth="8"
                            fill="none" />
                        <circle cx="180" cy="180" r="150" stroke="#FB7185"
                            strokeWidth="10"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray="200 1000"
                            transform="rotate( -90 180 180)"
                        />
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#E5E7EB"
                            fontSize="52"
                            fontWeight="700"
                            style={{ letterSpacing: "5px" }}
                        >
                            {formatTime(remainingTime)}
                        </text>



                    </svg>
                </div>
               {timerMode==="idle"&&hasNextTask&&(
                 <div className="d-flex justify-content-center">
                    <div className="btn  px-5 py-3 rounded-pill coral-btn" onClick={handleStart}>START</div>
                </div>
               )}
               {timerMode==="running"&&(
                <div className="d-flex justify-content-center">
                    <div className="btn  px-5 py-3 rounded-pill coral-btn" onClick={handlePause}>Pause</div>
                </div>
               )}
               {timerMode==="paused"&&(
                <div className="d-flex justify-content-center">
                    <div className="btn   py-3 rounded-pill coral-btn" onClick={handleContinue} style={{width:"105px"}}>Continue</div>
                    <div className="btn mx-2  py-3 rounded-pill coral-btn" onClick={handleStop} style={{width:"105px"}}>Stop</div>
                </div>
               )}
                    

            </div>
            <div className="container mt-3 ">
                <div className="row">

                    <div className="col-12">
                        <CurrentTask task={task} completeCurrentTask={completeCurrentTask}/>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default Pomodoro