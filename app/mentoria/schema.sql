-- Módulos
create table modules (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  "order" integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Aulas
create table lessons (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references modules(id) on delete cascade not null,
  title text not null,
  content_json jsonb,
  video_url text,
  published boolean default false,
  "order" integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Progresso do cliente
create table lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id uuid references lessons(id) on delete cascade not null,
  completed_at timestamptz default now(),
  unique(user_id, lesson_id)
);

-- RLS
alter table modules enable row level security;
alter table lessons enable row level security;
alter table lesson_progress enable row level security;

-- Módulos: todos autenticados podem ler
create policy "modules_read" on modules
  for select to authenticated using (true);

-- Módulos: apenas admin pode escrever
create policy "modules_write" on modules
  for all to authenticated
  using (auth.jwt() ->> 'email' = current_setting('app.admin_email', true))
  with check (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Aulas publicadas: todos autenticados leem
create policy "lessons_read_published" on lessons
  for select to authenticated using (published = true);

-- Aulas: admin lê todas (incluindo rascunhos)
create policy "lessons_read_all_admin" on lessons
  for select to authenticated
  using (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Aulas: apenas admin escreve
create policy "lessons_write" on lessons
  for all to authenticated
  using (auth.jwt() ->> 'email' = current_setting('app.admin_email', true))
  with check (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Progresso: usuário lê e escreve apenas o seu
create policy "progress_own" on lesson_progress
  for all to authenticated
  using (auth.jwt() ->> 'sub' = user_id::text)
  with check (auth.jwt() ->> 'sub' = user_id::text);
