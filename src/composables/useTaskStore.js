import { ref, computed, watch, onMounted } from 'vue'

// 任务状态枚举
export const STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done'
}

// 优先级枚举
export const PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
}

// 优先级颜色映射
export const PRIORITY_COLORS = {
  [PRIORITY.HIGH]: 'red',
  [PRIORITY.MEDIUM]: 'yellow',
  [PRIORITY.LOW]: 'green'
}

// 状态标签映射
export const STATUS_LABELS = {
  [STATUS.TODO]: '待办',
  [STATUS.IN_PROGRESS]: '进行中',
  [STATUS.DONE]: '完成'
}

// 单例状态 - 在模块级别创建，确保所有组件共享同一实例
const tasks = ref([])
const darkMode = ref(false)
let initialized = false

// 从localStorage加载数据
const loadFromStorage = () => {
  try {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      tasks.value = JSON.parse(savedTasks)
    }
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode) {
      darkMode.value = JSON.parse(savedDarkMode)
    }
  } catch (e) {
    console.error('Failed to load from localStorage:', e)
  }
}

// 保存到localStorage
const saveToStorage = () => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
    localStorage.setItem('darkMode', JSON.stringify(darkMode.value))
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
}

// 应用深色模式
const applyDarkMode = () => {
  if (darkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// 监听变化并保存
watch(tasks, saveToStorage, { deep: true })
watch(darkMode, (newVal) => {
  saveToStorage()
  applyDarkMode()
})

// 初始化（只执行一次）
const initialize = () => {
  if (!initialized) {
    loadFromStorage()
    applyDarkMode()
    initialized = true
  }
}

export function useTaskStore() {
  // 确保初始化
  initialize()

  // 添加任务
  const addTask = (title, description = '', priority = PRIORITY.MEDIUM) => {
    if (!title.trim()) return false
    
    const task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status: STATUS.TODO,
      priority,
      createdAt: new Date().toISOString()
    }
    
    tasks.value.push(task)
    return true
  }

  // 删除任务
  const deleteTask = (id) => {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
      return true
    }
    return false
  }

  // 更新任务
  const updateTask = (id, updates) => {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      // 使用splice触发响应式更新
      const updatedTask = { ...tasks.value[index], ...updates }
      tasks.value.splice(index, 1, updatedTask)
      return true
    }
    return false
  }

  // 更新任务状态
  const updateTaskStatus = (id, status) => {
    return updateTask(id, { status })
  }

  // 切换深色模式
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
  }

  // 按状态分组的任务
  const tasksByStatus = computed(() => ({
    [STATUS.TODO]: tasks.value.filter(t => t.status === STATUS.TODO),
    [STATUS.IN_PROGRESS]: tasks.value.filter(t => t.status === STATUS.IN_PROGRESS),
    [STATUS.DONE]: tasks.value.filter(t => t.status === STATUS.DONE)
  }))

  return {
    tasks,
    darkMode,
    tasksByStatus,
    addTask,
    deleteTask,
    updateTask,
    updateTaskStatus,
    toggleDarkMode
  }
}
