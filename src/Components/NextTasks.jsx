function NextTasks({ task }) {
    const nextTasks=task.filter(task=>task.status==="next")
    const nextTask=nextTasks[0]
    return (
        <>
            
                

                    <>
                        <div className="col-3"></div>
                        <div className="col-6 mx-auto mt-5">

                           {nextTask?(
                             <div className="card text-light next-task-bar" key={task.id}>
                                <div className="card-body d-flex flex-row  justify-content-center align-items-center px-1 py-0 ps-3">
                                    <p className=" fw-bolder fs-5 mt-3 text-center">{nextTask.name}</p>
                                    <div className="d-flex   align-items-center ms-auto">
                                        <i className="bi bi-clock text-warning  btn fs-5"></i>
                                        <i className="bi bi-x text-warning  btn fs-3"></i>
                                    </div>
                                </div>
                            </div>
                           ):( <div className="card text-light next-task-bar" key={task.id}>
                                <div className="card-body d-flex flex-row  justify-content-center align-items-center px-1 py-0 ps-3">
                                    <p className=" fw-bolder fs-5 mt-3 text-center">no task available</p>
                                    <div className="d-flex   align-items-center ms-auto">
                                        
                                        <i className="bi bi-x text-warning  btn fs-3"></i>
                                    </div>
                                </div>
                            </div>)}

                        </div>
                        <div className="col-3"></div></>
                
           
        </>
    )
}
export default NextTasks