import { ref, watch, computed, type Ref } from "vue";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "Low" | "Medium" | "High";
  dueDate?: string;
}

const storedTasks = localStorage.getItem("tasks");

const tasks: Ref<Task[]> = ref(
  storedTasks ? JSON.parse(storedTasks) : []
);

watch(
  tasks,
  () => {
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  },
  { deep: true }
);

export function useTasks() {
  const addTask = (task: Omit<Task, "id" | "completed">) => {
    tasks.value.push({
      id: Date.now(),
      completed: false,
      ...task
    });
  };

  const updateTask = (updatedTask: Task) => {
    const index = tasks.value.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
  };

  const deleteTask = (id: number) => {
    tasks.value = tasks.value.filter(t => t.id !== id);
  };

  const completedCount = computed<number>(() =>
    tasks.value.filter(t => t.completed).length
  );

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    completedCount
  };
}
