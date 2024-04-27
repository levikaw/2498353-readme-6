import { PostType, PrismaClient } from '@prisma/client';

const USER_ID = {
  FIRST: '7cc9fceb-f0f1-4228-9177-cb17855ff2e0',
  SECOND: 'f1775cdb-b978-4525-86a3-a960f7291216',
} as const;

const POST_ID = {
  FIRST: '6d308040-96a2-4162-bea6-2338e9976540',
  SECOND: 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd',
} as const;

function getPosts() {
  return [
    {
      id: POST_ID.FIRST,
      type: PostType.text,
      name: 'name',
      userId: USER_ID.FIRST,
    },
    {
      id: POST_ID.SECOND,
      type: PostType.text,
      name: 'name1',
      userId: USER_ID.SECOND,
    },
  ];
}

function getUsers() {
  return [
    {
      id: USER_ID.FIRST,
      email: 'example@mail.com',
      login: 'login',
      passwordHash: '6581762309c030b503e30512',
    },
    {
      id: USER_ID.SECOND,
      email: 'example1@mail.com',
      login: 'login1',
      passwordHash: '658gtgfr51762309c030b503e30512',
    },
  ];
}

function getLikes() {
  return [
    {
      userId: USER_ID.FIRST,
      postId: POST_ID.SECOND,
    },
    {
      userId: USER_ID.SECOND,
      postId: POST_ID.FIRST,
    },
  ];
}

function getSubscriptions() {
  return [
    {
      userId: USER_ID.FIRST,
      followedUserId: USER_ID.SECOND,
    },
    {
      userId: USER_ID.SECOND,
      followedUserId: USER_ID.FIRST,
    },
  ];
}

function getComments() {
  return [
    {
      userId: USER_ID.FIRST,
      text: 'comment',
      postId: POST_ID.SECOND,
    },
    {
      userId: USER_ID.SECOND,
      text: 'comment1',
      postId: POST_ID.FIRST,
    },
  ];
}

async function seedDb(dataSource: PrismaClient) {
  await dataSource.user.createMany({
    data: getUsers(),
  });
  await dataSource.post.createMany({
    data: getPosts(),
  });
  await dataSource.like.createMany({
    data: getLikes(),
  });
  await dataSource.comment.createMany({
    data: getComments(),
  });
  await dataSource.subscription.createMany({
    data: getSubscriptions(),
  });

  console.info('Database was filled');
}

async function bootstrap() {
  const dataSource = new PrismaClient();

  try {
    await seedDb(dataSource);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await dataSource.$disconnect();
  }
}

bootstrap();
