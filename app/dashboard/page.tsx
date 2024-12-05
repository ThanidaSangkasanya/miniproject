import prisma from "@/utils/db";
import { Book } from "@/types/books"; // Import the Book interface
import BookCard from "../component/BookCard"; // Import the BookCard component
import { revalidatePath } from "next/cache";

export default async function Dashboard() {
    // Fetch the books from Prisma
    const data = await prisma.book.findMany();
  
    // Manually convert the publishedAt field to a string (ISO format)
    const books: Book[] = data.map((book) => ({
      ...book,
      publishedAt: book.publishedAt.toISOString(), // Convert Date to string (ISO format)
    }));
  
    // Create Book function
    async function createBook(formData: FormData) {
      "use server";
      const name = formData.get("name") as string;
      const author = formData.get("author") as string;
      const description = formData.get("description") as string;
      const price = parseFloat(formData.get("price") as string);
      const stock = parseInt(formData.get("stock") as string);
      const publishedAt = formData.get("publishedAt") as string;
      const imageUrl = formData.get("imageUrl") as string;
  
      await prisma.book.create({
        data: { name, author, description, price, stock, publishedAt, imageUrl },
      });
      revalidatePath("/dashboard");
    }
  
    // Update Book function
    async function updateBook(formData: FormData) {
      "use server";
      const id = parseInt(formData.get("id") as string);
      const name = formData.get("name") as string;
      const author = formData.get("author") as string;
      const description = formData.get("description") as string;
      const price = parseFloat(formData.get("price") as string);
      const stock = parseInt(formData.get("stock") as string);
      const publishedAt = formData.get("publishedAt") as string;
      const imageUrl = formData.get("imageUrl") as string;
  
      await prisma.book.update({
        where: { id },
        data: { name, author, description, price, stock, publishedAt, imageUrl },
      });
      revalidatePath("/dashboard");
    }
  
    // Delete Book function
    async function deleteBook(id: number) {
      "use server";
      await prisma.book.delete({ where: { id } });
      revalidatePath("/dashboard");
    }
  
    return (
      <div className="flex flex-col bg-gradient-to-b from-[#05445e] to-[#75e6da] min-h-screen items-center justify-start">
        <h1 className="text-4xl font-bold text-white m-5">Book Management</h1>
  
        <div className="bg-[#189ab4] border-1 border-black m-12 p-3">
          <form action={createBook}>
            <label>Name:</label>
            <input type="text" name="name" className="border-2 border-black m-2 text-black" required />
            <label>Author:</label>
            <input type="text" name="author" className="border-2 border-black m-2 text-black" required />
            <label>Description:</label>
            <textarea name="description" className="border-2 border-black m-2 text-black" required />
            <label>Price:</label>
            <input type="number" name="price" className="border-2 border-black m-2 text-black" required />
            <label>Stock:</label>
            <input type="number" name="stock" className="border-2 border-black m-2 text-black" required />
            <label>Published At:</label>
            <input type="date" name="publishedAt" className="border-2 border-black m-2 text-black" required />
            <label>Image URL:</label>
            <input type="text" name="imageUrl" className="border-2 border-black m-2 text-black" required />
            <button type="submit" className="border-2 border-black m-2">
              Add Book
            </button>
          </form>
        </div>
  
        <div className="flex gap-4 flex-wrap justify-center">
          {books && books.length > 0 ? (
            books.map((book: Book) => (
              <BookCard
                key={book.id}
                book={book}
                deleteBook={deleteBook}
                updateBook={updateBook}
              />
            ))
          ) : (
            <p>No books available</p>
          )}
        </div>
      </div>
    );
  }