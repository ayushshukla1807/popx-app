# PopX - React Frontend Assignment

This repository contains the "PopX" React application, a pixel-perfect, mobile-first web app built as part of the frontend internship assignment. 

## 🚀 Tech Stack & Architectural Highlights

This project was built to stand out with production-grade architecture and tools:

- **React (Vite)**: Fast, modern build tool and development server.
- **Tailwind CSS**: Used for precise, pixel-perfect spacing and custom brand colors. The app features a custom "Mobile Simulator" layout on desktop screens, locking the app into a beautifully centered `max-w-md` container.
- **React Router DOM**: Declarative routing system.
- **Framer Motion**: Integrated with `<AnimatePresence mode="wait">` tied to `location.pathname` to ensure seamless page transitions (sliding/fading) where the old page unmounts before the new one animates in.
- **React Hook Form + Zod**: Eliminated manual form state management and boilerplate. Zod provides strictly typed validation schemas (`schemas/authSchema.js`), ensuring emails are valid and passwords are strong before any network requests are made.
- **Supabase (Auth & Database)**: Instead of relying on `localStorage`, this app integrates real authentication using Supabase. A custom hook (`hooks/useAuth.js`) abstracts the Auth context to keep UI components declarative.

---

## 💾 Supabase Backend Setup (SQL)

To support the extra fields collected during registration (Full Name, Phone, Company, Agency), we use a PostgreSQL trigger.

Run the following SQL in your Supabase SQL Editor:

```sql
-- 1. Create a table for public profiles
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name text,
  phone text,
  company text,
  is_agency boolean DEFAULT false,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 2. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- 4. Create a trigger to automatically create a profile entry when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, company, is_agency)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'company',
    CAST(new.raw_user_meta_data->>'is_agency' AS boolean)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## 💻 Local Development Setup

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repo-url>
   cd popx-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root of the project:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 🚢 Deployment Commands (Vercel)

Ensure you have the Vercel CLI installed (`npm i -g vercel`).

```bash
# 1. Initialize git
git init
git add .
git commit -m "Initial commit: Production-ready PopX App"

# 2. Deploy to Vercel
vercel
```
