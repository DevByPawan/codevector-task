# CodeVector Backend Task

Backend API for browsing and filtering a large product catalog (200,000+ products) with efficient cursor-based pagination.

## Live Demo

### API Base URL

https://codevector-task-r3x5.onrender.com/products

### Swagger Documentation

https://codevector-task-r3x5.onrender.com/api-docs

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (Neon)
- Prisma ORM
- Swagger (API Documentation)
- Faker.js (Dataset Generation)

---

## Features

### Product Browsing

- Browse 200,000+ products
- Stable ordering
- Category filtering
- Cursor-based pagination
- Optimized database queries

### Category Filtering

Example:

```http
GET /products?category=Books
```

### Custom Page Size

Example:

```http
GET /products?limit=10
```

### Cursor-Based Pagination

Products are sorted using:

```sql
ORDER BY updated_at DESC, id DESC
```

This guarantees stable pagination and prevents duplicate or missing records when navigating large datasets.

---

## API Endpoint

### Get Products

```http
GET /products
```

### Query Parameters

| Parameter | Type | Required | Description |
|------------|--------|----------|-------------|
| category | string | No | Filter products by category |
| limit | integer | No | Number of products per page (default: 20) |
| cursorUpdatedAt | string | No | Cursor timestamp from previous response |
| cursorId | string | No | Cursor id from previous response |

---

## Example Requests

### First Page

```http
GET /products
```

### First Page With Custom Limit

```http
GET /products?limit=2
```

### Category Filter

```http
GET /products?category=Books
```

### Next Page

Use the values returned in `nextCursor`.

Example:

```http
GET /products?limit=2&cursorUpdatedAt=2026-06-23T03:33:18.277Z&cursorId=fff56964-0aa5-4ad8-9cd1-5d94a38c2305
```

---

## Sample Response

```json
{
  "count": 20,
  "hasNextPage": true,
  "nextCursor": {
    "cursorUpdatedAt": "2026-06-23T03:33:18.277Z",
    "cursorId": "fff1878bd-149f-447c-a83c-2e636497725c"
  },
  "data": [
    {
      "id": "fff...",
      "name": "Sample Product",
      "category": "Books",
      "price": 199.99,
      "created_at": "2026-06-23T03:33:18.277Z",
      "updated_at": "2026-06-23T03:33:18.277Z"
    }
  ]
}
```

---

## Database Schema

### Product

| Field | Type |
|---------|---------|
| id | String (UUID) |
| name | String |
| category | String |
| price | Float |
| created_at | DateTime |
| updated_at | DateTime |

---

## Database Indexes

To improve query performance:

```prisma
@@index([updated_at, id])
@@index([category, updated_at, id])
```

These indexes support:

- Fast cursor pagination
- Fast category filtering
- Stable sorting on large datasets

---

## Dataset Generation

A seed script generates 200,000 products using Faker.js.

Location:

```bash
src/prisma/seed.js
```

Run:

```bash
npm run seed
```

---

## Local Setup

Clone repository:

```bash
git clone https://github.com/DevByPawan/codevector-task.git
```

Install dependencies:

```bash
npm install
```

Create `.env`

```env
DATABASE_URL=your_database_url
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate deploy
```

Start server:

```bash
npm run dev
```

Server runs on:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/api-docs
```

---

## Deployment

### Backend

Render

### Database

Neon PostgreSQL

---

## API Documentation

Swagger UI is available at:

https://codevector-task-r3x5.onrender.com/api-docs

---

## Why Cursor Pagination?

Offset pagination becomes increasingly expensive as datasets grow because the database must skip previously scanned rows.

Cursor pagination provides:

- Better scalability
- Faster queries
- Consistent ordering
- No duplicate records
- No missing records during pagination

This makes it suitable for large datasets such as the 200,000 product catalog used in this project.

---

## Future Improvements

- Base64 encoded cursors
- Redis caching
- Rate limiting
- Automated tests
- API versioning
- Search functionality
- Sorting options

---

## Author

Pawan Agrahari

GitHub:
https://github.com/DevByPawan/codevector-task