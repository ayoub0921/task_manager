import TasksList from './TasksList'
import { IoIosSunny } from "react-icons/io";
import { useTheme } from "@/components/theme-provider"
import { FaRegMoon } from "react-icons/fa";
import AddTasks from './AddTasks';
import { useRef } from 'react';



const Layout = () => {
    const { setTheme, theme } = useTheme()



    // Reference to task list to preserve scroll position
    const taskListRef = useRef<HTMLDivElement>(null);




    return (
        <div className='absolute left-[50%] top-[50%] lg:w-[500px] py-6  transform translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex items-center justify-between pb-8'>
                <h1 className='text-2xl font-bold text-white tracking-widest'>NAKATASKS</h1>
                {theme === "light" ? <FaRegMoon onClick={() => setTheme("dark")} size={30} className='text-white cursor-pointer' />
                    : <IoIosSunny onClick={() => setTheme("light")} size={30} className='text-white cursor-pointer' />}
            </div>
            <AddTasks  />
            <div
                ref={taskListRef}
                className="max-h-96 overflow-auto"
            >

                <TasksList  />
            </div>
        </div>
    )
}

export default Layout