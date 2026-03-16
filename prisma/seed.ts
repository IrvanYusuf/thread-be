import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // seed categories
  await prisma.category.createMany({
    data: [
      { name: "Programming" },
      { name: "Technology" },
      { name: "AI" },
      { name: "Database" },
      { name: "Web Development" },
      { name: "Mobile Development" },
    ],
    skipDuplicates: true,
  });

  console.log("Seed category berhasil");

  // hash password
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // seed admin user
  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
    },
  });

  console.log("Seed admin berhasil");
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
