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
  {
    title: "Some other post",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
    comments: {
      create: [
        {
          author: "Mike",
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
          author: "Lara",
          text: "Fake info",
        },
      ],
    },
  },
  {
    title: "Another Post ",
    description: "The standard chunk of Lorem Ipsum used since the 1500s",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
  },
  {
    title: "Post",
    description:
      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
  },
  {
    title: "Post",
    description:
      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
  },
  {
    title: "Post",
    description:
      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
  },
  {
    title: "Post",
    description:
      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
  },
  {
    title: "Post",
    description:
      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
  },
  {
    title: "Post",
    description:
      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
  },
  {
    title: "Post",
    description:
      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
  },
  {
    title: "Post",
    description:
      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
  },
  {
    title: "Post",
    description:
      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
  },
  {
    title: "Post",
    description:
      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
  },
  {
    title: "Post",
    description:
      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos hic, illum ipsa non quae reiciendis sequi tenetur. Accusamus culpa dolores earum fuga fugit impedit iste, molestiae numquam perspiciatis ullam voluptate.",
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
