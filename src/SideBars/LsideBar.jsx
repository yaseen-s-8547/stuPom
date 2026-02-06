function LsideBar({ task,deleteTask }) {
    const upcommingTasks = task.filter((task => task.status == "next"))
    return (
        <>

            <>
                <div className="d-flex flex-column gap-0 mt-1  overflow-y-auto ">
                    {upcommingTasks.length > 0 ? (
                        upcommingTasks.map((task) => {
                            return (
                                <div className="card  task-item" style={{ Width: "18rem;" }}>
                                    <div className="card-body d-flex flex-row">
                                        <h5 className="card-title">{task.name}</h5>
                                        <div className="   ms-auto">
                                            
                                            <i className="bi bi-x text-warning  btn fs-3" onClick={() => deleteTask(task.id)}></i>
                                        </div>
                                    </div>
                                    

                                </div>
                            )

                        })
                    ) : (


                        <div className="card  task-item" style={{ Width: "18rem;" }}>
                            <div className="card-body">
                                <h5 className="card-title">No Upcomming Tasks</h5>
                            </div>
                        </div>



                    )}
                </div>
            </>


        </>
    )
}
export default LsideBar