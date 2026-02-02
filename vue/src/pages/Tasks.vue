<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Tasks</h1>

    <TaskForm @add="addTask" />

    <div class="space-y-3">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete="deleteTask"
        @update="updateTask"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskForm from "../components/TaskForm.vue";
import TaskItem from "../components/TaskItem.vue";
import { useTasks } from "../composables/useTasks";

const { tasks, addTask, updateTask, deleteTask } = useTasks();
</script>
