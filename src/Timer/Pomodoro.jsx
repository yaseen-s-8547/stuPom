
import CurrentTask from "../Components/CurrentTask"

function Pomodoro({startNextTask,task,completeCurrentTask}) {
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
                            25:00
                        </text>



                    </svg>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="btn  px-5 py-3 rounded-pill coral-btn" onClick={startNextTask}>START</div>
                </div>

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