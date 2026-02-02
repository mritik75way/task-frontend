<template>
  <div>
    <p>Total Tasks: {{ tasks.length }}</p>
    <p>Completed Tasks: {{ completedCount }}</p>
  </div>
</template>

<script setup>
import { useTasks } from "../composables/useTasks";

const { tasks, completedCount } = useTasks();
</script>
