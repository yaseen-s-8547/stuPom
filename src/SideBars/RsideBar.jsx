function RsideBar({ task }) {
    const completedTasks = task.filter((task => task.status === "completed"))
    return (
        <>
            {completedTasks>0 ? (
                completedTasks.map((task) => {
                    return (
                        <>
                            <div className="d-flex flex-column gap-0 mt-1  overflow-y-auto ">
                    <div className="card   task-item " style={{ Width: "18rem;" }}>
                        <div className="card-body">
                            <h5 className="card-title">{task.name}</h5>
                        </div>
                    </div>
                    
                </div>
                        </>
                    )
                })

            ) : (

                <div className="d-flex flex-column gap-0 mt-1  overflow-y-auto ">
                    <div className="card   task-item " style={{ Width: "18rem;" }}>
                        <div className="card-body">
                            <h5 className="card-title">no completed task</h5>
                        </div>
                    </div>
                    
                </div>
            )}
        </>
    )
}
export default RsideBar

