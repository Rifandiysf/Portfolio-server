# Portfolio Server

Backend API untuk portfolio website, dibangun dengan **NestJS**, **Prisma**, dan **PostgreSQL**.

## Tech Stack

- **NestJS** — Framework backend
- **Prisma** — ORM untuk PostgreSQL
- **PostgreSQL** — Database
- **JWT + Google OAuth** — Autentikasi
- **Swagger** — Dokumentasi API otomatis
- **Resend** — Kirim email notifikasi (contact form)
- **class-validator** — Validasi input

---

## Struktur Proyek

```
src/
├── auth/               → JWT + Google OAuth, guards, strategies, decorators
├── users/              → Manajemen user & profile
├── projects/           → CRUD projects + teknologi
├── technologies/       → Master data teknologi
├── blog/               → CRUD blog posts + tags
├── tags/               → Master data tags
├── contact/            → Terima & kelola pesan kontak
└── prisma/             → Prisma service (global)

prisma/
├── schema.prisma       → Database schema
└── seed.ts             → Data awal (admin user, sample data)
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Konfigurasi environment

```bash
cp .env.example .env
```

Edit `.env` dan isi semua variabel:

| Variable | Keterangan |
|---|---|
| `DATABASE_URL` | Connection string PostgreSQL |
| `JWT_SECRET` | Secret key untuk JWT (buat yang panjang & random) |
| `JWT_EXPIRES_IN` | Masa berlaku token, contoh `7d` |
| `GOOGLE_CLIENT_ID` | Dari Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Dari Google Cloud Console |
| `GOOGLE_CALLBACK_URL` | URL callback OAuth |
| `RESEND_API_KEY` | API key dari resend.com |
| `RESEND_FROM_EMAIL` | Email pengirim notifikasi |
| `RESEND_TO_EMAIL` | Email penerima notifikasi (email Anda) |
| `FRONTEND_URL` | URL frontend untuk CORS & redirect OAuth |

### 3. Setup Google OAuth

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru → APIs & Services → Credentials
3. Buat **OAuth 2.0 Client ID** (tipe: Web application)
4. Tambahkan Authorized redirect URI: `http://localhost:3001/api/auth/google/callback`
5. Copy Client ID & Secret ke `.env`

### 4. Generate Prisma client & jalankan migrasi

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Seed data awal

```bash
npm run seed
```

Ini akan membuat:
- Admin user: `admin@portfolio.com` / `admin123`
- 5 teknologi sample
- 1 project sample
- 3 tags
- 1 blog post sample

### 6. Jalankan server

```bash
# Development (hot reload)
npm run start:dev

# Production
npm run build
npm run start:prod
```

---

## API Documentation

Setelah server berjalan, buka Swagger UI:

```
http://localhost:3001/api/docs
```

---

## Autentikasi

### Email/Password
```http
POST /api/auth/register
POST /api/auth/login
```

### Google OAuth
```
GET /api/auth/google          → Redirect ke Google login
GET /api/auth/google/callback → Callback, redirect ke frontend dengan token
```

### Gunakan token
Tambahkan header di setiap request yang memerlukan auth:
```
Authorization: Bearer <accessToken>
```

---

## Endpoints

### Public (tanpa auth)
| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/projects` | Semua projects |
| GET | `/api/projects/:slug` | Detail project |
| GET | `/api/blog` | Semua blog posts |
| GET | `/api/blog/:slug` | Detail blog post |
| GET | `/api/technologies` | Semua teknologi |
| GET | `/api/tags` | Semua tags |
| POST | `/api/contact` | Kirim pesan kontak |
| POST | `/api/auth/register` | Registrasi |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/google` | Google login |

### Admin only (butuh JWT + role ADMIN)
| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/api/projects` | Buat project |
| PATCH | `/api/projects/:slug` | Update project |
| DELETE | `/api/projects/:slug` | Hapus project |
| POST | `/api/blog` | Buat blog post |
| PATCH | `/api/blog/:slug` | Update blog post |
| DELETE | `/api/blog/:slug` | Hapus blog post |
| POST | `/api/technologies` | Tambah teknologi |
| PATCH | `/api/technologies/:id` | Update teknologi |
| DELETE | `/api/technologies/:id` | Hapus teknologi |
| POST | `/api/tags` | Buat tag |
| PATCH | `/api/tags/:slug` | Update tag |
| DELETE | `/api/tags/:slug` | Hapus tag |
| GET | `/api/contact` | Lihat semua pesan |
| PATCH | `/api/contact/:id/status` | Update status pesan |
| DELETE | `/api/contact/:id` | Hapus pesan |
| GET | `/api/users` | Semua users |
| PATCH | `/api/users/:id/role` | Ubah role user |
| DELETE | `/api/users/:id` | Hapus user |

### Authenticated (butuh JWT, semua role)
| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/auth/me` | Profile sendiri |
| GET | `/api/users/me` | Profile sendiri |
| PATCH | `/api/users/me` | Update profile |

---

## Database Schema

```
users          → Admin & viewer accounts
projects       → Portfolio projects
technologies   → Tech stack (language, framework, tool, database)
project_technologies → Many-to-many: project ↔ technology
blog_posts     → Blog articles
tags           → Blog tags
post_tags      → Many-to-many: post ↔ tag
contact_messages → Pesan dari pengunjung
```

---

## Scripts

```bash
npm run start:dev        # Dev mode dengan hot reload
npm run build            # Build production
npm run start:prod       # Jalankan production build
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Buat & jalankan migrasi baru
npm run prisma:studio    # Buka Prisma Studio (GUI database)
npm run seed             # Seed data awal
npm run lint             # Lint & auto-fix
npm run test             # Unit tests
```
