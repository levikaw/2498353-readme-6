# Getting started

For start any service run follow command from _./project_ dir

```sh
npm run service:service_name
```

where **service_name** is name one of the names of folders in the _./project/apps_ directory

> NOTE: Make sure that all **required** database started before start any service. Database services need Docker installed.
>
> - service _file_ depends on database (service) _mongo_
> - service _notification_ and _user_ depends on service _postgres_, _fakesmtp_ and _rabbitmq_
> - other services depends on database (service) _postgres_

# Before start

Every service folder in _./project/apps_ has _.env-example_ file, copy this file to _.env_ in same directory and fill all example fields.

For seed database for testing run:

```sh
npm run prisma:seed
```

For generate new version of PrismaClient run:

```sh
npm run prisma:generate
```

For create and apply NEW migration after changes in schema run:

```sh
npm run prisma:migration:create
```

For apply current schema to clean database run:

```sh
npm run prisma:migration:apply
```

# Before commit

Before commit changes run lint and format command:

```sh
npm run lint:all
```
