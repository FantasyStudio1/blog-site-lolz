import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const posts: Prisma.PostCreateInput[] = [
  {
    title: "Post Without Comments",
    description: "Here is a post without comments",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
  },
  {
    title: "Post With Comments",
    description: "Here is a post with comments",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
    comments: {
      create: [
        {
          author: "Kevin",
          text: "I really like this work!",
        },
        {
          author: "Emily",
          text: "Could be better",
        },
      ],
    },
  },
];

const users: Prisma.UserCreateInput[] = [
  {
    email: "user@test.com",
    password: "123456",
  },
  {
    email: "blog@admin.com",
    password: "admin",
    isAdmin: true,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const p of posts) {
    const post = await prisma.post.create({
      data: p,
    });
    console.log(`Created post with id: ${post.id}`);
  }

  for (const u of users) {
    const user = await prisma.user.create({
      data: {
        email: u.email,
        password: await bcrypt.hash(u.password, 10),
        ...(u.isAdmin && { isAdmin: u.isAdmin }),
      },
    });
    console.log(`Created user with email: ${user.email}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
