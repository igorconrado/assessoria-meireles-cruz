-- Adiciona campo de tipo e URL de conteúdo HTML
alter table lessons
  add column content_type text not null default 'rich_text'
    check (content_type in ('html', 'video', 'rich_text')),
  add column content_url text;

-- Índice para busca por tipo
create index lessons_content_type_idx on lessons(content_type);
