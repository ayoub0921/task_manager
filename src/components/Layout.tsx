import TasksList from './TasksList'
import { IoIosSunny } from "react-icons/io";
import { useTheme } from "@/components/theme-provider"
import { FaRegMoon } from "react-icons/fa";
import AddTasks from './AddTasks';
import { useEffect, useRef, useState } from 'react';


export interface Task {

    id: number;
    title: string;
    status: 'ALL' | 'Completed' | 'Active'
}




const Layout = () => {
    const { setTheme, theme } = useTheme()



    // Reference to task list to preserve scroll position
    const taskListRef = useRef<HTMLDivElement>(null);

    const [filter, setFilter] = useState<'All' | 'Completed' | 'Active'>("All")


    const [tasks, setTasks] = useState(() => {

        const savedTasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")!) : [];

        return savedTasks
    })


    const handleAddTask = (task: Task) => {
        setTasks([task, ...tasks])

        alert("✅ Task is added succesfully ")
        setTimeout(() => {
            taskListRef.current?.scrollTo({ top: taskListRef.current.scrollHeight, behavior: "smooth" });
        }, 100);
    }


    const handleDeleteTask = (id: number) => {

        const confirmDeleteTask = window.confirm("Are you shure to delete this task❗️");


        if (confirmDeleteTask) {

            const deletedTask = tasks.filter((task: Task) => task.id !== id);

            setTasks(deletedTask)
        }

    }


    const toogleTaskStatus = (id: number) => {

        const toogledTasks = tasks.map((task: Task) => {
            return (
                task.id === id ? { ...task, status: task.status === "Active" ? "Completed" : "Active" } : task

            )
        })


        setTasks(toogledTasks)

        console.log(tasks)
    }



    const filteredTasks = tasks.filter((task: Task) =>
        filter === "All" ? true : task.status === filter
    );


    const clearCompletedTasks = () => {

        const confirmDeleteCompletedTask = window.confirm("Are you shure to delete completed tasks❗️");

        if (confirmDeleteCompletedTask) {
            setTasks((prevTasks: any) => prevTasks.filter((task: Task) => task.status !== "Completed"));
        }
    };


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])



    return (
        <div className='absolute left-[50%] top-[50%] lg:w-[500px] py-6  transform translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex items-center justify-between pb-8'>
                <h1 className='text-2xl font-bold text-white tracking-widest'>NAKATASKS</h1>
                {theme === "light" ? <FaRegMoon onClick={() => setTheme("dark")} size={30} className='text-white cursor-pointer' />
                    : <IoIosSunny onClick={() => setTheme("light")} size={30} className='text-white cursor-pointer' />}
            </div>
            <AddTasks handleAddTask={handleAddTask} />
            <div
                ref={taskListRef}
                className="max-h-96 overflow-auto"
            >

                <TasksList clearCompletedTasks={clearCompletedTasks} filter={filter} setFilter={setFilter} toogleTaskStatus={toogleTaskStatus} handleDeleteTask={handleDeleteTask} tasks={filteredTasks} />
            </div>
        </div>
    )
}

export default Layout