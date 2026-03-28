-- Bucket para conteúdo de aulas (HTML)
insert into storage.buckets (id, name, public)
values ('lesson-content', 'lesson-content', true);

-- Policy: autenticados podem ler
create policy "lesson_content_read" on storage.objects
  for select to authenticated
  using (bucket_id = 'lesson-content');

-- Policy: apenas admin pode fazer upload
create policy "lesson_content_write" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'lesson-content' AND
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
  );
