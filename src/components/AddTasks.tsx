import { useState } from "react";
import { Task } from "./Layout";
import { tasksStore } from "@/store";


// interface AddTasksProps {

//     handleAddTask: (task: Task) => void
// }

const AddTasks = () => {
    const [taskTitle, setTaskTitle] = useState("");

    const {addTask} = tasksStore()



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskTitle.trim() === "") return;


        const newTask = {
            id: Date.now(),
            title: taskTitle,
            status: "Active" as "Completed" | "Active",
        };

        addTask(newTask);
        alert("✅ Task is added succesfully ")
        setTaskTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex bg-white dark:bg-very-dark-desaturated-blue rounded-sm p-4 mt-4 items-center shadow-sm">
            <span className="border border-dark-grayish-blue rounded-full w-6 h-6 block"></span>
            <input
                type="text"
                className="focus:outline-none ml-2 text-[16px] w-full "
                placeholder="Create new task"
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.target.value)
                    console.log(e.target.value)
                }}
            />
        </form>
    );
};

export default AddTasks;
