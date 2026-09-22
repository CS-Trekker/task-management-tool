<script setup>
import { useTaskStore, STATUS, STATUS_LABELS } from './composables/useTaskStore'
import AddTaskForm from './components/AddTaskForm.vue'
import KanbanColumn from './components/KanbanColumn.vue'

const { tasksByStatus, darkMode, addTask, deleteTask, updateTaskStatus } = useTaskStore()

const handleAddTask = (taskData) => {
  addTask(taskData.title, taskData.description, taskData.priority)
}

const handleDeleteTask = (taskId) => {
  if (confirm('确定要删除这个任务吗？')) {
    deleteTask(taskId)
  }
}

const handleUpdateStatus = (taskId, status) => {
  updateTaskStatus(taskId, status)
}

const handleDropTask = (taskId, newStatus) => {
  updateTaskStatus(taskId, newStatus)
}

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
    <header class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">任务管理看板</h1>
          <button @click="toggleDarkMode" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" :title="darkMode ? '切换到亮色模式' : '切换到深色模式'">
            <svg v-if="!darkMode" class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            <svg v-else class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </button>
        </div>
      </div>
    </header>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AddTaskForm @add-task="handleAddTask" />
      <div class="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
        <KanbanColumn :title="STATUS_LABELS[STATUS.TODO]" :status="STATUS.TODO" :tasks="tasksByStatus[STATUS.TODO]" @delete-task="handleDeleteTask" @update-status="handleUpdateStatus" @drop-task="handleDropTask" />
        <KanbanColumn :title="STATUS_LABELS[STATUS.IN_PROGRESS]" :status="STATUS.IN_PROGRESS" :tasks="tasksByStatus[STATUS.IN_PROGRESS]" @delete-task="handleDeleteTask" @update-status="handleUpdateStatus" @drop-task="handleDropTask" />
        <KanbanColumn :title="STATUS_LABELS[STATUS.DONE]" :status="STATUS.DONE" :tasks="tasksByStatus[STATUS.DONE]" @delete-task="handleDeleteTask" @update-status="handleUpdateStatus" @drop-task="handleDropTask" />
      </div>
    </main>
  </div>
</template>
