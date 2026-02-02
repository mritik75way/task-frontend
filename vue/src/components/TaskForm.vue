<template>
  <form
    @submit.prevent="submit"
    class="bg-white rounded-xl shadow p-4 flex flex-col gap-4"
  >
    <input
      v-model="title"
      placeholder="Task title"
      class="border rounded-lg px-3 py-2"
      required
    />

    <div class="flex gap-3">
      <select v-model="priority" class="border rounded-lg px-3 py-2 flex-1">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="date"
        v-model="dueDate"
        class="border rounded-lg px-3 py-2 flex-1"
      />
    </div>

    <button
      class="bg-black text-white rounded-lg py-2 hover:bg-slate-800"
    >
      Add Task
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "add", task: {
    title: string;
    priority: "Low" | "Medium" | "High";
    dueDate?: string;
  }): void;
}>();

const title = ref("");
const priority = ref<"Low" | "Medium" | "High">("Medium");
const dueDate = ref("");

const submit = () => {
  emit("add", {
    title: title.value,
    priority: priority.value,
    dueDate: dueDate.value || undefined
  });
  title.value = "";
};
</script>
