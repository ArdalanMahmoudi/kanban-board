# Kanban Board

A Trello-inspired Kanban board built to practice deep React + TypeScript patterns — including state management, drag-and-drop, animations, and accessibility — without a backend.

## Why no backend?

This is intentionally a frontend-focused project. State is managed with Zustand and persisted to localStorage.

## Features

- Full CRUD for cards and lists
- Drag-and-drop between lists using the native HTML5 Drag and Drop API
- Keyboard-accessible card movement using Arrow keys
- Smooth reordering animations with Framer Motion (`layout`, `AnimatePresence`)
- Keyboard navigation with visible focus states
- Empty states for lists and the board
- Persistent state with Zustand and localStorage

## Stack

Next.js, TypeScript, Zustand, Tailwind CSS, shadcn/ui, Framer Motion