import { IoMdCheckmark } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { tasksStore } from "@/store";
import { Task } from "@/types/types";





const TasksList = () => {


    const { tasks, deleteTask , deletCompletedTask , toogleStatus , filter , setFilter} = tasksStore();

    const filteredTasks = tasks.filter((task: Task) =>
        filter === "All" ? true : task.status === filter
    );

    console.log(filteredTasks)

    const handleDeleteTask = (id: number) => {

        const confirmDeleteTask = window.confirm("Are you shure to delete this task❗️");


        if (confirmDeleteTask) {


            deleteTask(id)
        }

    }

    const handeClearCompletedTask = () => {
        const confirmDeleteCompletedTask = window.confirm("Are you shure to delete completed tasks❗️");

        if (confirmDeleteCompletedTask) {
            deletCompletedTask()
        }
    }





    return (
        <div className='bg-white dark:bg-very-dark-desaturated-blue  shadow-sm rounded-sm mt-4'>
            {filteredTasks.length === 0 && <div className="p-4 text-center">No task found</div>}
            {filteredTasks.map((task) => (
                <div key={task.id} className='flex items-center  justify-between p-4 border-b border-gray-200'>
                    <div className='flex items-center'>
                        <span style={{ cursor: "pointer" }} onClick={() => toogleStatus(task.id)} className={`border dark:border-dark-grayish-blue rounded-full w-6 h-6 flex items-center justify-center 
                            ${task?.status === 'Completed' ? 'border-dark-grayish-blue bg-gradient-to-r  to-[#B333FF] from-[#33C5FF]'  : 'border-gray'}`}>
                            {task?.status === "Completed" && <IoMdCheckmark className="w-[80%] h-[80%] text-white" />}
                        </span>
                        <p className={`text-[15px] ml-4 ${task.status === "Completed" ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            handleDeleteTask(task.id)
                        }}
                    >
                        <IoCloseOutline style={{ cursor: 'pointer' }} size={20} />
                    </button>
                </div>
            ))}
            <div className="flex justify-between items-center text-[12px] p-4 bg-white dark:bg-very-dark-desaturated-blue rounded-b-lg shadow-md">
                {/* Task count */}
                <span className="text-dark-grayish-blue dark:text-light-grayish-blue">{tasks.length} items left</span>

                {/* Filter options */}
                <ul className="flex items-center gap-3">
                    {["All", "Active", "Completed"].map((status) => (
                        <li
                            key={status}
                            onClick={() => setFilter(status as "All" | "Active" | "Completed")}
                            className={`cursor-pointer transition-colors ${filter === status ? "text-bright-blue font-bold" : "text-dark-grayish-blue hover:text-bright-blue dark:hover:text-white"
                                }`}
                            aria-label={`Filter by ${status}`}
                        >
                            {status}
                        </li>
                    ))}
                </ul>

                {/* Clear Completed Button */}
                <button
                    onClick={handeClearCompletedTask}
                    className="cursor-pointer text-dark-grayish-blue hover:text-red-500 transition-colors"
                    aria-label="Clear completed tasks"
                >
                    Clear Completed
                </button>
            </div>

        </div>
    );
};

export default TasksList;
