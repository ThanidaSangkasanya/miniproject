/*import prisma from "@/utils/db";

export async function handler(req, res) {
  switch (req.method) {
    case "GET":
      // Get all books
      const books = await prisma.book.findMany();
      res.json(books);
      break;

    case "POST":
      // Create a new book
      const { name, author, description, price, stock, imageUrl } = req.body;
      const newBook = await prisma.book.create({
        data: { name, author, description, price, stock, imageUrl },
      });
      res.json(newBook);
      break;

    case "PUT":
      // Update book
      const { id, name, author, description, price, stock, imageUrl } = req.body;
      const updatedBook = await prisma.book.update({
        where: { id: id },
        data: { name, author, description, price, stock, imageUrl },
      });
      res.json(updatedBook);
      break;

    case "DELETE":
      // Delete a book
      const { id: deleteId } = req.body;
      await prisma.book.delete({ where: { id: deleteId } });
      res.status(200).json({ message: "Book deleted successfully" });
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
*/