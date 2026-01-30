export default function CurrentTask({task,completeCurrentTask}) {
    const currentTask=task.find(task=>task.status==="current")
    return (
        <>
            <div className="card   mb-5 current-task-bar ">
               {currentTask?
               ( <div className="card-body d-flex flex-row  justify-content-center align-items-center px-1 py-0 ps-3">
                    <p className=" fw-bolder fs-5 mt-3 text-center">{currentTask.name}</p>
                    <div className="d-flex   align-items-center ms-auto">
                        <button className=" text-warning  btn fs-5" onClick={completeCurrentTask}>Finish Task</button>
                    </div>
                </div>):
               ( <div className="card-body d-flex flex-row  justify-content-center align-items-center px-1 py-0 ps-3">
                    <p className=" fw-bolder fs-5 mt-3 text-center">no current task </p>
                    <div className="d-flex   align-items-center ms-auto">
                       
                    </div>
                </div>)}
            </div>
        </>
    )
}