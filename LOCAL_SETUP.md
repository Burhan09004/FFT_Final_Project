# GoCart local setup (Windows)

## Requirements
- Node.js LTS and npm
- MongoDB Community Server running locally on `127.0.0.1:27017`

## 1. Start MongoDB
Open Windows Services (`Win + R` → `services.msc`) and start **MongoDB Server**. Verify in PowerShell:

```powershell
Test-NetConnection 127.0.0.1 -Port 27017
```

`TcpTestSucceeded` should be `True`.

## 2. Start backend
Open PowerShell in the project folder:

```powershell
cd server
npm install
npm start
```

The API listens on `http://localhost:8080`. Check `http://localhost:8080/health`; `database` should say `connected`.

## 3. Seed demo products
In a separate terminal:

```powershell
cd server
npm run seed
```

The seed command inserts/updates the sample catalogue by product name and does not delete existing inventory.

## 4. Start frontend
In a second terminal:

```powershell
cd client
npm install --legacy-peer-deps
npm start
```

Open `http://localhost:3000`.

The frontend API base URL defaults to `http://localhost:8080`. To override it, set `REACT_APP_API_BASE_URL` before starting React.

## Notes
- Keep MongoDB and both terminal processes running while using the app.
- Product preview cards shown when the API is unavailable are sample previews only and cannot be added to a real cart.
- This is a development project. Configure a strong `JWT_SECRET` and proper payment provider before production deployment.

## Deploy with Vercel, Render, and MongoDB Atlas

1. Push this project to a GitHub repository. The root `.gitignore` excludes `server/.env`; never commit local environment files or paste their values into chat.
2. Create a MongoDB Atlas cluster and database user. Add the Render service's outbound IP access as appropriate for your Atlas plan, then copy the Atlas connection string for use as `MONGO_URL`.
3. In Render, create a Blueprint from the repository and use the root `render.yaml`. Set `MONGO_URL` to the Atlas connection string. Render generates `JWT_SECRET`; keep it private.
4. Deploy the frontend on Vercel with the project root set to `client`. Set the build command to `npm run build`, the output directory to `build`, and add `REACT_APP_API_BASE_URL` with the Render API URL (for example, `https://gocart-api.onrender.com`, without a trailing slash). Redeploy after setting the variable.
5. Set the Render `CLIENT_URL` environment variable to the deployed Vercel origin (for example, `https://your-store.vercel.app`, without a trailing slash), then redeploy the API. For a custom domain, use its origin here instead.
6. If you want to enable UPI QR generation, set `UPI_ID` in Render to the intended recipient's UPI ID. UPI QR generation does not confirm or verify payment; integrate a payment provider before accepting real orders. Cash on Delivery does not require this variable.
7. Check `https://<your-render-service>.onrender.com/health` and confirm the response reports `"database":"connected"`. Then test the deployed frontend, registration, login, catalogue, and cart.

`render.yaml` leaves the database URL, frontend origin, and UPI recipient for you to enter in Render. Do not put production credentials in this file or in the frontend; `REACT_APP_*` values are included in the public browser bundle.
