export type Task = {
  id: string;
  title: string;
  description: string;
  status: "open" | "done";
  createdAt: string;
};

const TASKS_KEY = "ath.tasks";
const SESSION_KEY = "ath.session";

export function hasSession() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SESSION_KEY) === "true";
}

export function setSession(on: boolean) {
  window.localStorage.setItem(SESSION_KEY, on ? "true" : "false");
}

export function loadTasks(): Task[] {
  try {
    const raw = window.localStorage.getItem(TASKS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Task[];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]) {
  window.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function createTask(input: Pick<Task, "title" | "description">): Task {
  const t: Task = {
    id: `t_${Math.random().toString(16).slice(2)}`,
    title: input.title,
    description: input.description,
    status: "open",
    createdAt: new Date().toISOString()
  };

  const tasks = loadTasks();
  saveTasks([t, ...tasks]);
  return t;
}

export function getTask(id: string): Task | null {
  const tasks = loadTasks();
  return tasks.find((t) => t.id === id) ?? null;
}

export function updateTaskStatus(id: string, status: Task["status"]): Task | null {
  const tasks = loadTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx < 0) return null;

  const updated: Task = { ...tasks[idx], status };
  const next = [...tasks];
  next[idx] = updated;
  saveTasks(next);
  return updated;
}

export function deleteTask(id: string) {
  const tasks = loadTasks();
  saveTasks(tasks.filter((t) => t.id !== id));
}
