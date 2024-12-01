"use server"
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/db';
import hashPassword from '@/utils/hashPassword';
import { z } from 'zod';

const addSchema = z.object({
  email: z.string().email().max(20),
  name: z.string().min(3).max(8, { message: "Not more than 8 characters" }),
  password: z.string().min(3),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const result = addSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.formErrors.fieldErrors });
  }

  const { email, name, password } = result.data;
  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    res.status(201).json({ message: 'User added successfully', user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: String(error) });
    }
  }
}