<template>
  <div
    class="flex-1 min-w-[300px] bg-gray-100 dark:bg-gray-900 rounded-lg p-4"
    @dragover.prevent
    @drop="handleDrop"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">
        {{ title }}
      </h2>
      <span class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
        {{ tasks.length }}
      </span>
    </div>
    
    <div class="min-h-[200px]">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete="$emit('delete-task', $event)"
        @update-status="$emit('update-status', ...arguments)"
      />
      
      <div v-if="tasks.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
        暂无任务
      </div>
    </div>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  tasks: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['delete-task', 'update-status', 'drop-task'])

const handleDrop = (e) => {
  const taskId = e.dataTransfer.getData('taskId')
  if (taskId) {
    emit('drop-task', taskId, props.status)
  }
}
</script>
