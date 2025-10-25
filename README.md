# Basic Task Manager (Ready-to-run)

This archive contains:
- `backend/` — .NET 8 Web API (in-memory storage)
- `frontend/` — Vite + React + TypeScript app (uses localStorage)

## Defaults chosen
- Backend base URL: http://localhost:5000
- Frontend dev server: http://localhost:5173
- Frontend package manager: npm

## Run backend
1. Ensure .NET 8 SDK is installed.
2. Open a terminal in `backend/` and run:
   ```bash
   dotnet restore
   dotnet run
   ```
   The API will listen on the port shown in the console (default Kestrel port is often 5000/5001).

API endpoints:
- GET /api/tasks
- POST /api/tasks  (body: { "description": string, "isCompleted": bool })
- PUT /api/tasks/{id}
- DELETE /api/tasks/{id}

## Run frontend
1. Open a terminal in `frontend/`
2. Install deps: `npm install`
3. Start dev server: `npm run dev`
4. Open the URL shown by Vite (default http://localhost:5173)

The frontend will attempt to call `http://localhost:5000/api`. If your backend runs on a different port, edit `frontend/src/api.ts` and change the baseURL.

## Notes
- The backend is in-memory; restarting it clears server-side tasks. The frontend persists a copy in localStorage under key `taskmanager.tasks.v1`.
- The app is intentionally minimal to keep it easy to run and inspect. Feel free to request enhancements (filtering, Tailwind styling, Dockerfile, CI config, etc.).
