import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from "@/utils/loginUser"; // Import your session function

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session = await getSession(); // Check for a valid session
      if (!session) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const { bookId, quantity } = req.body;
      console.log('Received bookId:', bookId, 'quantity:', quantity); // Log received data

      const userId = session.id; // Use the user ID from the session

      const book = await prisma.book.findUnique({ where: { id: bookId } });
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      const order = await prisma.order.create({
        data: {
          userId,
          bookId,
          quantity,
          total: quantity * book.price,
        },
      });

      console.log('Order created:', order); // Log the created order
      res.status(200).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}