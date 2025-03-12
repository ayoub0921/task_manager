import TasksList from './TasksList'
import { IoIosSunny } from "react-icons/io";
import { useTheme } from "@/components/theme-provider"
import { FaRegMoon } from "react-icons/fa";
import AddTasks from './AddTasks';
import { useEffect, useState } from 'react';


export interface Task {

    id: number;
    title: string;
    status: 'Completed' | 'Active'
}




const Layout = () => {
    const { setTheme, theme } = useTheme()



    const [filter,setFilter] = useState<'All' | 'Completed' | 'Active'>("All")


    const [tasks, setTasks] = useState(() => {

        const savedTasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")!) : [];

        return savedTasks
    })


    const handleAddTask = (task: Task) => {
        setTasks([...tasks, task])
    }


    const handleDeleteTask = (id: number) => {

        const deletedTask = tasks.filter((task: Task) => task.id !== id);

        setTasks(deletedTask)
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

   

    const filteredTasks = tasks.filter((task:Task) =>
        filter === "All" ? true : task.status === filter
    );


    const clearCompletedTasks = () => {
        setTasks([])
    }


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])



    return (
        <div className='absolute left-[50%] top-[50%] lg:w-[500px]   transform translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex items-center justify-between pb-8'>
                <h1 className='text-4xl font-bold text-white tracking-widest'>FOR NAKAMA</h1>
                {theme === "light" ? <FaRegMoon onClick={() => setTheme("dark")} size={30} className='text-white cursor-pointer' />
                    : <IoIosSunny onClick={() => setTheme("light")} size={30} className='text-white cursor-pointer' />}
            </div>
            <AddTasks handleAddTask={handleAddTask} />
            <TasksList clearCompletedTasks={clearCompletedTasks} filter={filter} setFilter={setFilter} toogleTaskStatus={toogleTaskStatus} handleDeleteTask={handleDeleteTask}  tasks={filteredTasks} />
        </div>
    )
}

export default Layout