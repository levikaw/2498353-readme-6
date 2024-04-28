import { PostType, PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

const USER_ID = {
  A: '7cc9fceb-f0f1-4228-9177-cb17855ff2e0',
  B: 'f1775cdb-b978-4525-86a3-a960f7291216',
  C: 'd1420699-691c-49c2-bdaa-a5e1c2d80ea8',
  D: '000d8fa1-6779-43fd-92de-b91f8d18e663',
} as const;

const POST_ID = {
  A: '6d308040-96a2-4162-bea6-2338e9976540',
  B: 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd',
  C: '1a4a1309-20aa-482a-a216-77b2d6395795',
  D: '7626697e-cbb8-4ba1-bc7e-861a92e016a9',
} as const;

function getPosts() {
  return [
    {
      id: POST_ID.A,
      type: PostType.text,
      name: 'name',
      userId: USER_ID.A,
      tags: ['init', 'text'],
    },
    {
      id: POST_ID.B,
      type: PostType.photo,
      fileId: '662dca41341e553455094faa',
      userId: USER_ID.B,
      tags: ['init', 'photo'],
    },
    {
      id: POST_ID.C,
      type: PostType.video,
      link: 'https://www.youtube.com/live/HCNyNGbI0FY?si=UOR60rLOWCzjeYLt',
      name: 'name3',
      userId: USER_ID.C,
      tags: ['init', 'video'],
    },
    {
      id: POST_ID.D,
      type: PostType.quote,
      author: 'authorauthorauthor',
      text: 'texttexttexttexttexttexttexttext',
      userId: USER_ID.A,
      tags: ['init', 'quote'],
    },
  ];
}

const createPassword = async (password: string) => genSalt(10).then((salt) => hash(password, salt));

async function getUsers() {
  return [
    {
      id: USER_ID.A,
      email: 'example@mail.com',
      login: 'login',
      passwordHash: await createPassword('login123456'),
    },
    {
      id: USER_ID.B,
      email: 'example1@mail.com',
      login: 'login1',
      passwordHash: await createPassword('login1123456'),
    },
    {
      id: USER_ID.C,
      email: 'example2@mail.com',
      login: 'login2',
      passwordHash: await createPassword('login2123456'),
    },
    {
      id: USER_ID.D,
      email: 'example3@mail.com',
      login: 'login3',
      passwordHash: await createPassword('login3123456'),
    },
  ];
}

function getNotifications() {
  return Object.values(USER_ID).map((userId) => ({ userId }));
}

function getLikes() {
  return [
    {
      userId: USER_ID.A,
      postId: POST_ID.B,
    },
    {
      userId: USER_ID.A,
      postId: POST_ID.C,
    },
    {
      userId: USER_ID.B,
      postId: POST_ID.A,
    },
    {
      userId: USER_ID.B,
      postId: POST_ID.C,
    },
    {
      userId: USER_ID.B,
      postId: POST_ID.D,
    },
    {
      userId: USER_ID.C,
      postId: POST_ID.A,
    },
    {
      userId: USER_ID.C,
      postId: POST_ID.B,
    },
    {
      userId: USER_ID.C,
      postId: POST_ID.D,
    },
    {
      userId: USER_ID.D,
      postId: POST_ID.A,
    },
    {
      userId: USER_ID.D,
      postId: POST_ID.B,
    },
    {
      userId: USER_ID.D,
      postId: POST_ID.C,
    },
    {
      userId: USER_ID.D,
      postId: POST_ID.D,
    },
  ];
}

function getSubscriptions() {
  return [
    {
      userId: USER_ID.A,
      followedUserId: USER_ID.B,
    },
    {
      userId: USER_ID.A,
      followedUserId: USER_ID.C,
    },
    {
      userId: USER_ID.A,
      followedUserId: USER_ID.D,
    },
    {
      userId: USER_ID.B,
      followedUserId: USER_ID.A,
    },
    {
      userId: USER_ID.B,
      followedUserId: USER_ID.C,
    },
    {
      userId: USER_ID.B,
      followedUserId: USER_ID.D,
    },
    {
      userId: USER_ID.C,
      followedUserId: USER_ID.A,
    },
    {
      userId: USER_ID.C,
      followedUserId: USER_ID.B,
    },
    {
      userId: USER_ID.C,
      followedUserId: USER_ID.D,
    },
    {
      userId: USER_ID.D,
      followedUserId: USER_ID.A,
    },
    {
      userId: USER_ID.D,
      followedUserId: USER_ID.B,
    },
    {
      userId: USER_ID.D,
      followedUserId: USER_ID.C,
    },
  ];
}

function getComments() {
  return [
    {
      userId: USER_ID.A,
      text: 'comment',
      postId: POST_ID.B,
    },
    {
      userId: USER_ID.A,
      text: 'comment1',
      postId: POST_ID.C,
    },
    {
      userId: USER_ID.B,
      text: 'comment2',
      postId: POST_ID.A,
    },
    {
      userId: USER_ID.B,
      text: 'comment3',
      postId: POST_ID.C,
    },
    {
      userId: USER_ID.B,
      text: 'comment4',
      postId: POST_ID.D,
    },
    {
      userId: USER_ID.C,
      text: 'comment5',
      postId: POST_ID.A,
    },
    {
      userId: USER_ID.C,
      text: 'comment6',
      postId: POST_ID.B,
    },
    {
      userId: USER_ID.C,
      text: 'comment7',
      postId: POST_ID.D,
    },
    {
      userId: USER_ID.D,
      text: 'comment8',
      postId: POST_ID.A,
    },
    {
      userId: USER_ID.D,
      text: 'comment9',
      postId: POST_ID.B,
    },
    {
      userId: USER_ID.D,
      text: 'comment10',
      postId: POST_ID.C,
    },
    {
      userId: USER_ID.D,
      text: 'comment11',
      postId: POST_ID.D,
    },
  ];
}

async function seedDb(dataSource: PrismaClient) {
  await dataSource.user.createMany({
    data: await getUsers(),
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
  await dataSource.notification.createMany({
    data: getNotifications(),
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
