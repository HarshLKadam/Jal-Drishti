<<<<<<< HEAD
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
=======
// server/prisma/seed.ts
//Dummy DATA for initial testing and development
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // 1. Create a Village
  const village = await prisma.village.create({
    data: {
      village_name: 'Adarsh Gaon',
      district: 'Thane',
      taluka: 'Kalyan',
      state: 'Maharashtra',
      pincode: '421301',
      population: 2500
    }
  })
  console.log(`✅ Village Created: ${village.village_name}`)

  // 2. Create Admin (Login: admin / admin123)
  await prisma.admin.create({
    data: {
      name: 'Ramesh Sarpanch',
      username: 'admin',
      password_hash: 'admin123', // In real app, hash this!
      contact_number: '9876543210',
      village_id: village.village_id
    }
  })
  console.log('✅ Admin Created: admin / admin123')

  // 3. Create Operator (Login: operator / op123)
  await prisma.operator.create({
    data: {
      name: 'Suresh Worker',
      phone: '9988776655',
      username: 'operator',
      password_hash: 'op123',
      village_id: village.village_id
    }
  })
  console.log('✅ Operator Created: operator / op123')

  // 4. Create a Smart Pump
  await prisma.pump.create({
    data: {
      pump_name: 'North Well Pump',
      qr_code: 'PUMP_001',
      latitude: 19.2183,
      longitude: 72.9781,
      flow_rate_lph: 2000,
      is_smart_pump: true, // This one uses Sensors!
      village_id: village.village_id
    }
  })
  console.log('✅ Pump Created')

  // 5. Create a Water Tank
  await prisma.tank.create({
    data: {
      tank_name: 'Main Overhead Tank',
      capacity_liters: 10000,
      material_type: 'Concrete',
      is_smart_tank: true,
      village_id: village.village_id
    }
  })
  console.log('✅ Tank Created')

  console.log('🏁 Seeding finished.')
>>>>>>> a4f14ae3ef3f512f89ffbbb08ec456ae719bc6b1
}

main()
  .catch((e) => {
<<<<<<< HEAD
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
=======
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
>>>>>>> a4f14ae3ef3f512f89ffbbb08ec456ae719bc6b1
