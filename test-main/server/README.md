# Local Backend for Revival Tabernacle Ministries Church Website

## How to Run

1. Make sure you have Node.js v20+ installed (see `.nvmrc`).
2. In your project root, run:

   ```sh
   cd server
   npm install express cors body-parser
   node index.js
   ```

3. The backend will run at http://localhost:4000

## Endpoints
- `POST   /api/contact`        — Contact form
- `POST   /api/donate`         — Donations (mock)
- `POST   /api/register`       — Program registration
- `GET/POST/DELETE /api/gallery` — Gallery CRUD
- `GET/POST/DELETE /api/files`   — Files CRUD
- `POST   /api/chat`           — Live chat (mock)
- `POST   /api/apply-edit`     — Visual editor (mock)

All data is stored in `server/data/*.json` files for local development.
