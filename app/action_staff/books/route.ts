// app/api/books/route.ts
import prisma from "@/utils/db";

export async function GET(req: Request) {
  try {
    const books = await prisma.book.findMany();
    return new Response(JSON.stringify(books), { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return new Response("Failed to fetch books", { status: 500 });
  }
}