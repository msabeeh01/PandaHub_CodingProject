export interface Task {
    id: string,
    title: string,
    description?: string,
    createdAt: Date,
    priority?: number,
    image?: string,
}

export interface Column { 
    id: string,
    title: string,
    tasks: Task[]
}

export interface KanbanData {
    columns: Column[]
}