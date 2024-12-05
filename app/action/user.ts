import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@/utils/loginUser"; // Assuming this is the path to your login functions

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const session = await getSession(); // Check for a valid session
      if (!session) {
        return res.status(401).json({ message: "User not authenticated" });
      }
  
      // Optionally, fetch additional user data from the database
      const { id, email, name } = session;
  
      return res.status(200).json({
        id,
        email,
        name,
      });
    } catch (error) {
      // Narrow down the type of error to Error
      if (error instanceof Error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
      }
      // Handle cases where error is not an instance of Error
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
  