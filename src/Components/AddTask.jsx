import { useState } from "react"
import CompletedPom from "./CompletedPom"

function AddTask({addTask}) {
    const [taskName,setTaskName]=useState("")
    const handleAdd=()=>{
        if(!taskName.trim())return
        addTask(taskName)
        setTaskName("")
    }
    return (
        <>
            <div className="col-3"></div>
            <div className="col-6 mt-4">
                <div className="input-group px-5 ">
                 <input type="text" className=" bg-light   py-2 form form-control" placeholder="type task" value={taskName} onChange={(e)=>setTaskName(e.target.value)} />
                <button className="btn btn-warning " onClick={handleAdd}>Add</button>
                 </div>
            </div>
            <div className="col-xxl-3  col-sm-12 col-md-12">
                <CompletedPom/>
            </div>
        </>
    )
}
export default AddTask