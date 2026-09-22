<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-3 cursor-move border-l-4 transition-all hover:shadow-lg"
    :class="borderColorClass"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="flex justify-between items-start mb-2">
      <h3 class="font-semibold text-gray-900 dark:text-white text-lg">{{ task.title }}</h3>
      <button
        @click="$emit('delete', task.id)"
        class="text-gray-400 hover:text-red-500 transition-colors"
        title="删除任务"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    
    <p v-if="task.description" class="text-gray-600 dark:text-gray-300 text-sm mb-3">
      {{ task.description }}
    </p>
    
    <div class="flex items-center justify-between">
      <span
        class="px-2 py-1 rounded text-xs font-medium"
        :class="priorityBadgeClass"
      >
        {{ priorityLabel }}
      </span>
      
      <select
        :value="task.status"
        @change="$emit('update-status', task.id, $event.target.value)"
        class="text-xs border rounded px-2 py-1 bg-transparent dark:text-white dark:border-gray-600"
      >
        <option value="todo">待办</option>
        <option value="in-progress">进行中</option>
        <option value="done">完成</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { PRIORITY, PRIORITY_COLORS } from '../composables/useTaskStore'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['delete', 'update-status', 'drag-start'])

const borderColorClass = computed(() => {
  const color = PRIORITY_COLORS[props.task.priority]
  return {
    'border-red-500': color === 'red',
    'border-yellow-500': color === 'yellow',
    'border-green-500': color === 'green'
  }
})

const priorityBadgeClass = computed(() => {
  const color = PRIORITY_COLORS[props.task.priority]
  return {
    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': color === 'red',
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': color === 'yellow',
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': color === 'green'
  }
})

const priorityLabel = computed(() => {
  const labels = {
    [PRIORITY.HIGH]: '高优先级',
    [PRIORITY.MEDIUM]: '中优先级',
    [PRIORITY.LOW]: '低优先级'
  }
  return labels[props.task.priority]
})

const handleDragStart = (e) => {
  e.dataTransfer.setData('taskId', props.task.id)
  e.dataTransfer.effectAllowed = 'move'
}

const handleDragEnd = () => {
  // 拖拽结束时的清理工作
}
</script>
