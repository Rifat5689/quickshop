# Local development (admin-ui + shop-ui + backend)

Run all three from the repo root in separate terminals.

## 1. Backend (port 4000)

```bash
cd backend
cp .env.example .env
# Fill MONGODB_URI, Cloudinary, JWT secrets in .env
npm install
npm run dev
```

API: `http://localhost:4000/api/v1`

## 2. Admin UI (port 5173)

Uses `admin-ui/.env.development` → API `http://localhost:4000/api/v1`, shop links `http://localhost:5174/{slug}`.

```bash
cd admin-ui
npm install
npm run dev
```

Open `http://localhost:5173`, create a landing page, set status **Live**, copy the shop URL.

## 3. Shop UI (port 5174)

Uses `shop-ui/.env.development` → API `http://localhost:4000`.

```bash
cd shop-ui
npm install
npm run dev
```

Open the copied URL, e.g. `http://localhost:5174/your-product-slug`.

## Production URLs

| App | URL |
|-----|-----|
| Shop | `https://originsofbeauty.web.app/{slug}` |
| Admin | `https://originsofbeautyadmin.web.app` |
| API | `https://quickshop-3ovc.onrender.com/api/v1` |

### Will admin show localhost or production shop links?

| Command | Shop URL in admin |
|---------|-------------------|
| `npm run dev` | `http://localhost:5174/{slug}` (from `.env.development`) |
| `npm run build` + deploy | `https://originsofbeauty.web.app/{slug}` (from `.env.production`) |

Vite bakes `VITE_*` variables at **build time**. Production deploys never use localhost unless you build with the wrong env file.

Per-page **language** (Bangla / English fixed labels) is set when creating or editing a landing page in admin.
