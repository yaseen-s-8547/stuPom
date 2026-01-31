import { useState, useEffect } from "react"
import CurrentTask from "../Components/CurrentTask"

function Pomodoro({ startNextTask, task, completeCurrentTask }) {
    const [timerMode, setTimerMode] = useState("idle")
    // idle | work_running | work_paused | break_running | break_paused
    const handleStart = () => {
        setTimerMode("work_running")
        const hasCurrent = task.some(task => task.status === "current")
        if (!hasCurrent) {
            startNextTask()
        }
    }
    const handlePause = () => {
        setTimerMode("work_paused")
    }
    const handleContinue = () => {
        setTimerMode("work_running")
    }
    const handleStop = () => {
        setTimerMode("idle")
        setRemainingTime(POMODORO_DURATION)
    }
    const POMODORO_DURATION = 25 * 60
    const BREAK_DURATION = 5 * 60

    const [remainingTime, setRemainingTime] = useState(POMODORO_DURATION)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
        return `${minutes}:${paddedSeconds}`
    }
    useEffect(() => {
        let interValId = null
        if (timerMode.endsWith("_running")) {
            interValId = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1) {
                        if (timerMode === "work_running") {
                            setTimerMode("break_ready")
                        }
                        else if (timerMode === "break_running")
                            setTimerMode("idle")
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }
        return () => {
            if (interValId) {
                clearInterval(interValId)
            }
        }
    }, [timerMode])
    useEffect(() => {
        if (timerMode === "work_running") {
            setRemainingTime(POMODORO_DURATION)
        }
        if (timerMode === "break_running") {
            setRemainingTime(BREAK_DURATION)
        }
    }, [timerMode, POMODORO_DURATION, BREAK_DURATION])
    const hasNextTask = task.some(task => task.status === "next")
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
                {timerMode === "idle" && hasNextTask && (
                    <div className="d-flex justify-content-center">
                        <div className="btn  px-5 py-3 rounded-pill coral-btn" onClick={handleStart}>START</div>
                    </div>
                )}
                {timerMode === "work_running" && (
                    <div className="d-flex justify-content-center">
                        <div className="btn  px-5 py-3 rounded-pill coral-btn" onClick={handlePause}>Pause</div>
                    </div>
                )}
                {timerMode === "work_paused" && (
                    <div className="d-flex justify-content-center">
                        <div className="btn   py-3 rounded-pill coral-btn" onClick={handleContinue} style={{ width: "105px" }}>Continue</div>
                        <div className="btn mx-2  py-3 rounded-pill coral-btn" onClick={handleStop} style={{ width: "105px" }}>Stop</div>
                    </div>
                )}
                {timerMode === "break_running" && (
                    <div className="d-flex justify-content-center">
                        <div className="btn  px-5 py-3 rounded-pill coral-btn" onClick={handleStop}>STOP BREAK</div>
                    </div>
                )}
                {timerMode === "break_ready" && (

                    <div className="d-flex justify-content-center gap-2">
                        <div
                            className="btn px-4 py-3 rounded-pill coral-btn"
                            onClick={() => setTimerMode("break_running")}
                        >
                            START BREAK
                        </div>

                        <div
                            className="btn px-4 py-3 rounded-pill coral-btn"
                            onClick={handleStop}
                        >
                            SKIP BREAK
                        </div>
                    </div>





                )}


            </div>
            <div className="container mt-3  ">
                <div className="row">

                    <div className="col-12 curr-card">
                        <CurrentTask task={task} completeCurrentTask={completeCurrentTask} />
                    </div>

                </div>
            </div>

        </div>
    )
}
export default Pomodoro