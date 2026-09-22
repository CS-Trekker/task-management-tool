<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">添加新任务</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          标题 *
        </label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          placeholder="输入任务标题"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>
      
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          描述
        </label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          placeholder="输入任务描述（可选）"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
        ></textarea>
      </div>
      
      <div>
        <label for="priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          优先级
        </label>
        <select
          id="priority"
          v-model="form.priority"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="high">高优先级</option>
          <option value="medium">中优先级</option>
          <option value="low">低优先级</option>
        </select>
      </div>
      
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        添加任务
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { PRIORITY } from '../composables/useTaskStore'

const emit = defineEmits(['add-task'])

const form = reactive({
  title: '',
  description: '',
  priority: PRIORITY.MEDIUM
})

const handleSubmit = () => {
  if (!form.title.trim()) return
  
  emit('add-task', {
    title: form.title,
    description: form.description,
    priority: form.priority
  })
  
  // 重置表单
  form.title = ''
  form.description = ''
  form.priority = PRIORITY.MEDIUM
}
</script>
