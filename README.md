# Smart Bookmark App

Smart Bookmark is a full-stack web application built using **Next.js (App Router)**, **Supabase (Authentication, PostgreSQL, Realtime)**, **TypeScript**, and **Tailwind CSS**.

The application allows users to securely log in using **Google OAuth** and manage personal bookmarks with real-time synchronization across multiple browser tabs.

---

## 🔗 Live Demo

- Production Link - https://smart-bookmark-akashtripathiiiii-projects.vercel.app

---

## 🚀 Features

- Google OAuth authentication only  
- Add bookmark (Title + URL)  
- Delete bookmark  
- Bookmarks are private per user  
- Real-time updates without page refresh  
- Row Level Security (RLS) enforced at database level  
- Automatic cascade deletion when user is removed  
- Production deployment on Vercel  

---

## 🧱 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend
- Supabase Authentication (Google OAuth)
- Supabase PostgreSQL
- Supabase Realtime

### Deployment
- Vercel

---

## 🗄 Database Schema

```sql
create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  url text not null,
  created_at timestamp default now(),
  constraint bookmarks_user_id_fkey
    foreign key (user_id)
    references auth.users(id)
    on delete cascade
);
```

### Schema Details

- **id** → Unique identifier for each bookmark  
- **user_id** → References the authenticated user  
- **title** → Bookmark title  
- **url** → Bookmark link  
- **created_at** → Timestamp of creation  
- **ON DELETE CASCADE** → Automatically deletes bookmarks if the user is removed  

---

## 🔐 Row Level Security (RLS)

Enable RLS:

```sql
alter table bookmarks enable row level security;
```

Create policy:

```sql
create policy "Users manage own bookmarks"
on bookmarks
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

### Security Guarantees

- Users can only read their own bookmarks  
- Users cannot modify or delete other users’ data  
- Security is enforced at the database level  

---

## ⚡ Real-Time Implementation

The `bookmarks` table is added to:

Database → Publications → supabase_realtime

Realtime subscription is scoped per user:

```ts
filter: `user_id=eq.${currentUserId}`
```

### Result

- Instant UI updates across multiple tabs  
- No page refresh required  
- No cross-user data leakage  
- Efficient and secure event handling  

---

## 🛠 Problems Faced & Solutions

### 1. Realtime not updating  
**Cause:** Table not added to the `supabase_realtime` publication  
**Solution:** Enabled the table inside Database → Publications  

### 2. Realtime working for one user only  
**Cause:** Subscription not scoped by `user_id`  
**Solution:** Added user-specific filter in realtime subscription  

### 3. User deletion error  
**Cause:** Foreign key constraint missing `ON DELETE CASCADE`  
**Solution:** Recreated the foreign key with cascade rule  

### 4. Invalid Supabase URL error  
**Cause:** Typo in environment variable configuration  
**Solution:** Corrected the URL and restarted the development server  

---

## ▶️ Running Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Create `.env.local` in the root directory

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 3. Start Development Server

```bash
npm run dev
```

---

## 🚀 Deployment (Vercel)

### Steps

1. Push project to GitHub  
2. Import repository into Vercel  
3. Add environment variables in the Vercel dashboard  
4. Deploy  

---

## 📌 What This Project Demonstrates

- Secure OAuth authentication  
- Database-level access control using Row Level Security  
- Proper relational database design  
- Foreign key constraints with cascade deletion  
- Real-time data synchronization using PostgreSQL publications  
- Full-stack production deployment workflow  
- Debugging and resolving real-world integration issues  

---
