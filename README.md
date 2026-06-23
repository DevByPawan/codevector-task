# CodeVector Backend Task

Backend service for browsing 200,000+ products with fast cursor-based pagination, category filtering, and stable ordering.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (Neon)
- Prisma ORM
- Faker.js (data generation)

---

## Features

### Product Browsing
- Browse 200,000 products
- Newest products first
- Category filtering
- Fast cursor-based pagination

### Stable Pagination
Uses cursor pagination instead of offset pagination.

Products are ordered by:

```text
updated_at DESC,
id DESC
```

This ensures consistent ordering and prevents duplicate or missing records while browsing large datasets.

### Category Filter

Example:

```bash
/products?category=Books
```

### Pagination

First page:

```bash
/products
```

Custom limit:

```bash
/products?limit=10
```

Next page:

```bash
/products?cursorUpdatedAt=2026-06-23T03:33:18.277Z&cursorId=abc123
```

---

## API Response

```json
{
  "count": 20,
  "hasNextPage": true,
  "nextCursor": {
    "cursorUpdatedAt": "2026-06-23T03:33:18.277Z",
    "cursorId": "abc123"
  },
  "data": []
}
```

---

## Database Schema

Product fields:

- id
- name
- category
- price
- created_at
- updated_at

---

## Data Generation

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

Install dependencies:

```bash
npm install
```

Create `.env`

```env
DATABASE_URL=your_database_url
```

Run migrations:

```bash
npx prisma migrate deploy
```

Run server:

```bash
npm run dev
```

---

## Deployment

Backend deployed on Render.

Database hosted on Neon PostgreSQL.

---

## Why Cursor Pagination?

Offset pagination becomes slower as datasets grow because the database must skip more and more rows.

Cursor pagination:

- Faster on large datasets
- More scalable
- Better for continuously changing data
- Avoids duplicate records across pages

---

## Future Improvements

- Composite database indexes
- Cursor encoding (Base64 cursor)
- API documentation with Swagger
- Redis caching
- Rate limiting
- Automated tests