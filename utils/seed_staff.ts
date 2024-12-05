// utils/seed_staff.ts
import prisma from "@/utils/db";
import hashPassword from "@/utils/hashPassword";

export async function seed(): Promise<void> {
  const hashedPassword = await hashPassword("thanida3032");

  await prisma.user.create({
    data: {
      name: "Thanida",
      email: "thanida@gmail.com",
      password: hashedPassword,
      role: "STAFF",
    },
  });

  console.log("Staff account created!");
}
