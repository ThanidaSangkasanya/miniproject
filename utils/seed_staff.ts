import  prisma  from "@/utils/db";



async function STAFF() {
  try {
    const user = await prisma.user.create({
      data: {
        name: "Thanida",
        email: "3032@gmail.com",
        password: "Thani", 
        role: "STAFF",
      },
    });

    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

STAFF();
