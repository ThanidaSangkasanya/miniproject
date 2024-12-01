import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../utils/db"
import hashPassword from "../../utils/hashPassword" // Assuming this file exists in your utils

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Verify password
    const hashedPassword = await hashPassword(password)
    if (hashedPassword !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // If authentication is successful, return the user details or a token
    return res.status(200).json({ message: "Login successful", user })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" })
  }
}
