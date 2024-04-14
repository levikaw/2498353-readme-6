To run this app follow steps:

from _project_ dir run commands

- For the firt time:

```sh
docker compose -f libs/configuration/src/database/postgres/docker-compose.yml
cd infra/prisma
npx nx run prisma:db:migrate
npx nx run prisma:db:seed
npx nx run prisma:db:generate
npx nx run auth:serve
```

- Else:

```sh
cd infra/prisma
npx nx run auth:serve
```
