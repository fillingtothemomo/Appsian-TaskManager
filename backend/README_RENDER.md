# Deploying the backend to Render (free plan)

This file shows a minimal set of steps to deploy the ASP.NET Core backend in `backend/` to Render using the included Dockerfile and `render.yaml` manifest.

1) Push your repository to GitHub (or connect your Git provider) and ensure the `render.yaml` file is at the repository root.

2) In the Render dashboard click "New" → "Web Service" and select the repository and branch (e.g. `master`).

3) Render will detect `render.yaml` and use the `backend/Dockerfile` to build the service. If it does not auto-detect, set the following in the service settings:
   - Environment: Docker
   - Dockerfile Path: `backend/Dockerfile`
   - Branch: `master`
   - Plan: Free

4) Environment variables:
   - For production, set any secrets through the Render UI under Environment → Environment Variables.
   - The frontend should point to the backend using the value of `VITE_API_URL` (for example `https://task-manager-backend.onrender.com/api`). Set that on Vercel (or wherever you host the frontend).

5) CORS: Ensure your backend allows requests from your frontend origin. If needed, add CORS in `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://your-frontend-domain.com"));
});

app.UseCors();
```

6) Health and logs: Check the Render service dashboard for build logs and runtime logs. Render sets the `$PORT` environment variable; the provided `Dockerfile` configures Kestrel to bind to that port at runtime.

7) After deployment, set the frontend `VITE_API_URL` to the service URL plus `/api` (e.g. `https://your-service.onrender.com/api`).

If you want, I can also:
- Add a small GitHub Actions workflow to automatically push to Render via the Render API (requires a Render service token), or
- Add CORS setup directly to `backend/Program.cs` and commit it for you.
