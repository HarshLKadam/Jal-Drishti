import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create village
  const village = await prisma.village.create({
    data: {
      village_name: "Demo Village",
      taluka: "Demo Taluka",
      district: "Demo District",
      state: "Maharashtra",
      pincode: "411001",
    },
  });

  // Create admin
  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: {
      name: "Main Admin",
      username: "admin",
      password_hash: passwordHash,
      village_id: village.village_id,
    },
  });

  console.log("✅ Seed completed: Admin + Village created");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
