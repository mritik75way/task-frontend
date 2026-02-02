<template>
  <div class="min-h-screen bg-slate-100">
    <nav class="bg-white shadow">
      <div class="max-w-5xl mx-auto px-6 py-4 flex gap-6">
        <RouterLink class="font-semibold text-slate-700 hover:text-black" to="/">
          Dashboard
        </RouterLink>
        <RouterLink class="font-semibold text-slate-700 hover:text-black" to="/tasks">
          Tasks
        </RouterLink>
      </div>
    </nav>

    <main class="max-w-5xl mx-auto p-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
</script>
