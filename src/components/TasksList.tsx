import { IoMdCheckmark } from "react-icons/io";
import { Task } from "./Layout";





interface TasksProps {

    tasks: Task[]
    handleDeleteTask: (id: number) => void
    toogleTaskStatus: (id: number) => void
    filter:any
    setFilter: (status: "All" | "Active" | "Completed") => void
    clearCompletedTasks: () => void
}

// interface Task {

//     id: number;
//     title: string;
//     status: 'completed' | 'active'
// }

// const tasks = [

//     {
//         id:1,
//         title:"task 1",
//         status:"completed"
//     },
//     {
//         id:2,
//         title:"task 2",
//         status:"completed"
//     },
// ]

const TasksList = ({ tasks, handleDeleteTask, toogleTaskStatus, clearCompletedTasks,filter , setFilter }: TasksProps) => {


    return (
        <div className='bg-white dark:bg-very-dark-desaturated-blue  shadow-sm rounded-sm mt-4'>
            {tasks.length === 0 && <div className="p-4 text-center">No task found</div>}
            {tasks.map((task) => (
                <div key={task.id} className='flex items-center  justify-between p-4 border-b border-gray-200'>
                    <div className='flex items-center'>
                        <span onClick={() => toogleTaskStatus(task.id)} className={`border dark:border-dark-grayish-blue rounded-full w-6 h-6 flex items-center justify-center 
                            ${task?.status === 'Completed' ? 'border-dark-grayish-blue bg-bright-blue' : 'border-gray'}`}>
                            {task?.status === "Completed" && <IoMdCheckmark className="w-[80%] h-[80%] text-white" />}
                        </span>
                        <p className={`text-[15px] ml-4 ${task.status === "Completed" ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                        </p>
                    </div>
                    <button
                        className="text-[15px] font-mono"
                        onClick={() => {
                            handleDeleteTask(task.id)
                        }}
                    >
                        X
                    </button>
                </div>
            ))}
            <div className="flex justify-between items-center text-sm p-4">
                <span>{tasks.length} items left</span>
                <ul className="flex items-center gap-3">
                    {["All", "Active", "Completed"].map((status, index) => (
                        <li
                            key={index}
                            onClick={() => setFilter(status as "All" | "Active" | "Completed")}
                            style={{ cursor: "pointer" ,}}
                            className={`${filter === status ? "text-bright-blue":""}`}
                        >
                            {status}
                        </li>
                    ))}
                </ul>
                <button onClick={clearCompletedTasks} style={{ cursor: "pointer" }}>Clear completed</button>
            </div>
        </div>
    );
};

export default TasksList;
