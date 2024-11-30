import prisma from "./db"
 //const prisma = require("./utils/db")
import hashPassword from "./hashPassword"
//const hashPassword = require("./hashPassword")

export default async function seed() {

      try {
        // Hash the password
        const password = await hashPassword("thani");

        // Create a user in the database
        await prisma.user.create({
          data: {
            name: "Thanida",
            email: "s6630613032@phuket.psu.ac.th",
            password, // Use the hashed password
            role: "STAFF",
          },
        });
    
        
      } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
      } finally {
        // Disconnect from the database
        await prisma.$disconnect();
      }
    }
    
    

