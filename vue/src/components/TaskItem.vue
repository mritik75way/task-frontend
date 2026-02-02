<template>
  <div
    class="bg-white rounded-xl shadow p-4 flex items-center justify-between"
  >
    <div class="flex items-center gap-3">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="toggle"
      />

      <div>
        <p
          :class="[
            'font-medium',
            task.completed && 'line-through text-slate-400'
          ]"
        >
          {{ task.title }}
        </p>

        <p class="text-sm text-slate-500">
          {{ task.priority }} · {{ task.dueDate || "No due date" }}
        </p>
      </div>
    </div>

    <button
      @click="remove"
      class="text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "../composables/useTasks";

const props = defineProps<{ task: Task }>();
const emit = defineEmits(["delete", "update"]);

const toggle = () => {
  emit("update", { ...props.task, completed: !props.task.completed });
};

const remove = () => {
  emit("delete", props.task.id);
};
</script>
