insert into lessons (module_id, title, slug, published, "order")
select
  id as module_id,
  'Aula Demo — Componente React' as title,
  'demo' as slug,
  true as published,
  1 as "order"
from modules
where title = 'Autoconhecimento'
limit 1
on conflict (slug) do nothing;
