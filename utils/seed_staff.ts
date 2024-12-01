import prisma from "./db";
import hashPassword from "./hashPassword";

export default async function seed() {
  try {
    // Hash the password
    const password = await hashPassword("thani");

    console.log("Creating staff user...");

    // Create a user in the database
    const user = await prisma.user.create({
      data: {
        name: "Thanida",
        email: "s6630613032@phuket.psu.ac.th",
        password, // Use the hashed password
        role: "STAFF",
      },
    });

    console.log("Staff user created:", user);

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}
