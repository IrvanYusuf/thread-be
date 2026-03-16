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

const AVATAR_PROFILES = [
  "https://res.cloudinary.com/dfsozazph/image/upload/v1770360204/iibzj8togx6jwprvumoq.png",
  "https://res.cloudinary.com/dfsozazph/image/upload/v1770360202/ucr7kccqxjeu4ue5fjqw.png",
  "https://res.cloudinary.com/dfsozazph/image/upload/v1770360202/xcirghesfin7ahv1zhj7.png",
  "https://res.cloudinary.com/dfsozazph/image/upload/v1770360201/v5wmqqgz0pwdbr8iljzf.png",
  "https://res.cloudinary.com/dfsozazph/image/upload/v1770360200/s3sooyorbbljiq5m9trw.png",
  "https://res.cloudinary.com/dfsozazph/image/upload/v1770360199/bbrbzaau7yw7oonujehq.png",
  "https://res.cloudinary.com/dfsozazph/image/upload/v1770360196/zasbhgx1vfhmv3jvc3rj.png",
  "https://res.cloudinary.com/dfsozazph/image/upload/v1770360193/ozszvuqe2eyxdk6dngvl.png",
  "https://res.cloudinary.com/dfsozazph/image/upload/v1770360076/z5mji4td6iztrvgfmdlu.png",
];

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
  const rand = Math.floor(Math.random() * AVATAR_PROFILES.length);

  // seed admin user
  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      image: AVATAR_PROFILES[rand],
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
