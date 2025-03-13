import { create } from "zustand"
import { Task } from "./types/types";


interface Store {
    tasks: Task[];
    addTask: (task: Task) => void;
    deleteTask: (id: number) => void;
    deletCompletedTask: () => void;
    toogleStatus: (id: number) => void;
    filter: 'All' | 'Completed' | 'Active'
    setFilter: (status: "All" | "Active" | "Completed") => void
}



export const tasksStore = create<Store>((set) => ({


    tasks: localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")!) : [],
    filter: 'All',
    addTask: (task: Task) =>
        set((state) => ({
            tasks: [task, ...state.tasks]
        })),

    deleteTask: (id: number) =>
        set((state) => ({
            tasks: state.tasks.filter(task => task.id !== id)
        })),


    deletCompletedTask: () =>
        set((state) => ({
            tasks: state.tasks.filter(task => task.status !== "Completed")
        })),

    toogleStatus: (id: number) =>
        set((state) => ({
            tasks: state.tasks.map((task) => {
                if (task.id === id) {
                    return { ...task, status: task.status === "Active" ? "Completed" : "Active" }
                }
                return task;
            })
            })),

    setFilter: (status: "All" | "Active" | "Completed") => set(() => ({
        filter: status
    }))

}))




tasksStore.subscribe((state) => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks))
})