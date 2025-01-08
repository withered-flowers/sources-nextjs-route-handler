# Sources NextJS Route Handler

ini hanyalah file yang digunakan dalam tutorial NextJS v15 - Route Handler

# Tambahan untuk SQLite (Drizzle)

1. install package `@next/env` (untuk membaca environment variable dari luar aplikasi nextjs)
1. Install package `drizzle-orm` dan `@libsql/client`
1. Install package dev `drizzle-kit tsx`
1. bikin file .env untuk mengisi DB_FILE_NAME
1. bikin file `src/db/config/drizzle.ts` untuk bikin file configurasi / instance drizzle
1. bikin file `src/db/schemas/index.ts` untuk membuat informasi table yang akan dibuat
1. bikin file `src/db/schemas/type.ts` untuk membuat tipe data Select dan Insert
1. bikin file `drizzle.config.ts` pada root folder
1. jalankan `npx drizzle-kit generate`
1. jalankan `npx drizzle-kit migrate`
1. bikin file `src/utils/hash.ts` untuk membuat fungsi hash password dan compare hash
1. bikin file `src/db/seed.ts` untuk membuat seeding awal data yang dibutuhkan
1. jalankan dengan `npx tsx src/db/seed.ts`

# Bikin models

1. bikin file `src/db/models/user.ts`

# Bikin api

1. bikin `src/app/api/route.ts`
