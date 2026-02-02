# Task Management System (Vue 3)

A modern Task Management System built using **Vue 3**, **TypeScript**, and **Tailwind CSS v4**.
The application allows users to create, manage, and track tasks with priority and due dates, using a clean UI and scalable architecture.

---

## Objective

The objective of this project is to demonstrate core and advanced concepts of Vue.js such as:

* Composition API
* Component-based architecture
* Vue Router for navigation
* State management using composables
* TypeScript integration
* Modern UI using Tailwind CSS v4

---

## Features

* Create, update, and delete tasks
* Mark tasks as completed
* Assign priority (Low, Medium, High)
* Set optional due dates
* Dashboard with task statistics
* Multi-page navigation using Vue Router
* Persistent data storage using LocalStorage
* Fully typed using TypeScript
* Responsive and modern UI

---

## Technologies Used

* Vue 3
* TypeScript
* Vue Router v4
* Tailwind CSS v4
* Vite
* LocalStorage API

---

## Project Structure

```
src/
 ├─ components/
 │   ├─ TaskForm.vue
 │   ├─ TaskItem.vue
 │   └─ TaskStats.vue
 ├─ pages/
 │   ├─ Dashboard.vue
 │   └─ Tasks.vue
 ├─ composables/
 │   └─ useTasks.ts
 ├─ router/
 │   └─ index.ts
 ├─ App.vue
 ├─ main.ts
 ├─ style.css
 └─ env.d.ts
```

---

## Setup Instructions

### Prerequisites

* Node.js (v18 or higher recommended)
* npm

### Installation

```bash
npm create vite@latest vue-task-manager
cd vue-task-manager
npm install
```

### Run Development Server

```bash
npm run dev
```

Open the application at:

```
http://localhost:5173/
```

---

## Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` folder.

---

## Application Routes

* `/` → Dashboard (Task statistics overview)
* `/tasks` → Task management page

---

## Concepts Demonstrated

* Vue 3 Composition API (`ref`, `computed`, `watch`)
* Custom composables for shared state
* Strong typing with TypeScript interfaces
* Component communication using props and emits
* Vue Router for page navigation
* Persistent client-side storage using LocalStorage
* Utility-first styling using Tailwind CSS v4

---

## Conclusion

This project demonstrates how Vue 3 can be used to build a scalable, maintainable, and modern front-end application using best practices.
It effectively combines state management, routing, and UI design without relying on a backend, making it suitable for academic and learning purposes.

---
