# Kanban Board

A Trello-inspired kanban board built to practice deep React + TypeScript patterns -- state management, drag-and-drop, animation, and accessbility -- independent of a backend.

## Why no backend?
This is intentionally a frontend-focused project. State is managed with Zustand and persisted to localStorage.


## Features
- Full CRUD: add/edit/delete cards and lists.
- Drag-and-drop between lists (native HTML5 drag API) with keyboard-accessible alternative (Arrow keys to move focused  card between lists).
- Smooth reordering animations with Framer Motion ('layout', 'AnimatePresence')
- Keyboard navigation (Tab + focus-visible states)
- Empty states for lists and board
- State persistence via Zustand + localStorage


## Stack
Next.js, TypeScript, Zustand, Tailwind CSS, shadcn/ui, Framer Motion
