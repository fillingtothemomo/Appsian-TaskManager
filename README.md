# Task Manager assignment for Appsian tech 

Deployed here :https://appsian-task-manager-sdvk.vercel.app/



Video:https://github.com/user-attachments/assets/57972398-b648-4968-b44b-8e7cb3e016c7

<img width="1076" height="810" alt="image" src="https://github.com/user-attachments/assets/d3b002da-8ccb-454d-b846-64d4ee85b098" />
<img width="1021" height="716" alt="image" src="https://github.com/user-attachments/assets/15e6eb76-309d-48fd-9c57-b695ceb2ff8f" />
<img width="987" height="660" alt="image" src="https://github.com/user-attachments/assets/a1355477-225e-4fb0-9391-c30b49e2aa52" />


You can make a to-do list and mark tasks as completed and delete them and also filter by completed/active/all.

## Run backend
1. Ensure .NET 8 SDK is installed.
2. Open a terminal in `backend/` and run:
   ```bash
   dotnet restore
   dotnet run
   ```
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

Made by Angel Sharma
Enrollment:22323005
