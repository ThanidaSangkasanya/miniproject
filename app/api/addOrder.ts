import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, bookId, quantity, total } = req.body;

  if (!userId || !bookId || !quantity || !total) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        bookId,
        quantity,
        total,
      },
    });
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
}
