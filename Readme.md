# Task Manager Full-Stack Application

## Overview

This project is a full-stack task management application implemented with a C\# (.NET 8) backend and a React + TypeScript frontend. Users can add, mark completed, delete, and filter tasks with a clean and responsive UI styled using Bootstrap.

## Features

- Display a list of tasks retrieved from the backend API.
- Add new tasks with a description.
- Toggle tasks as completed or active.
- Delete existing tasks.
- Filter tasks based on status (All, Active, Completed).
- Persist task state using localStorage for offline resilience.
- Responsive and modern user interface with Bootstrap styling.


## Tech Stack

- Backend: C\# .NET 8 Web API with in-memory data storage.
- Frontend: React 18, TypeScript, Vite, Axios for HTTP requests.
- Styling: Bootstrap CSS and React-Bootstrap components.


## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) installed for backend.
- [Node.js](https://nodejs.org/en/download/) (v18+) and npm installed for frontend.


### Backend Setup

1. Navigate to `Backend` directory:

```sh
cd Backend
```

2. Restore packages:

```sh
dotnet restore
```

3. Run the backend API server:

```sh
dotnet run
```

The API will be running at `http://localhost:5000`.

### Frontend Setup

1. Navigate to `Frontend` directory:

```sh
cd Frontend
```

2. Install dependencies:

```sh
npm install
```

3. Start the frontend development server:

```sh
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

- Open `http://localhost:3000` in your browser.
- Add new tasks in the input field.
- Toggle the checkbox next to a task to mark it completed/uncompleted.
- Use the filter buttons to view all, active, or completed tasks.
- Click "Delete" to remove tasks.
- Task list and state are saved in localStorage to persist on page reload.


## Folder Structure

```
TaskManager/
├─ Backend/
│  ├─ Program.cs
│  ├─ TaskAPI.csproj
│  └─ appsettings.json
├─ Frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ TaskInput.tsx
│  │  │  ├─ TaskList.tsx
│  │  │  └─ FilterButtons.tsx
│  │  ├─ App.tsx
│  │  ├─ main.tsx
│  │  ├─ types.ts
│  │  ├─ taskService.ts
│  │  └─ index.css
│  ├─ package.json
│  ├─ vite.config.ts
│  └─ postcss.config.js
```


## API Endpoints

- `GET /api/tasks` - Get all tasks.
- `POST /api/tasks` - Create a new task.
- `PUT /api/tasks/{id}` - Update a task.
- `DELETE /api/tasks/{id}` - Delete a task.


## Notes

- The project uses in-memory storage at the backend (no external database).
- LocalStorage is used on the frontend to provide offline support and persistence.
- Bootstrap CSS (instead of Tailwind) is used for styling in the frontend.
- Axios handles all API calls for CRUD operations.
- The app demonstrates key full-stack development fundamentals suitable for evaluations.

