export default function CurrentTask({task}) {
    const currentTask=task.find(task=>task.status==="current")
    return (
        <>
            <div class="card  mb-5 current-task-bar ">
               {currentTask?
               ( <div class="card-body d-flex flex-row  justify-content-center align-items-center px-1 py-0 ps-3">
                    <p class=" fw-bolder fs-5 mt-3 text-center">{currentTask.name}</p>
                    <div className="d-flex   align-items-center ms-auto">
                        <button class=" text-warning  btn fs-5">Finish Task</button>
                    </div>
                </div>):
               ( <div class="card-body d-flex flex-row  justify-content-center align-items-center px-1 py-0 ps-3">
                    <p class=" fw-bolder fs-5 mt-3 text-center">no current task </p>
                    <div className="d-flex   align-items-center ms-auto">
                       
                    </div>
                </div>)}
            </div>
        </>
    )
}