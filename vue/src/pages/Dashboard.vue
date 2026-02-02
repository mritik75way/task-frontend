<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="bg-white rounded-xl shadow p-6">
      <p class="text-slate-500">Total Tasks</p>
      <p class="text-3xl font-bold">{{ tasks.length }}</p>
    </div>

    <div class="bg-white rounded-xl shadow p-6">
      <p class="text-slate-500">Completed</p>
      <p class="text-3xl font-bold">{{ completedCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTasks } from "../composables/useTasks";

const { tasks, completedCount } = useTasks();
</script>
