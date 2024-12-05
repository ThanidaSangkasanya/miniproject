// app/actions/bookActions.ts
"use server";

import prisma from "@/utils/db";

export async function createBook(formData: FormData) {
  const name = formData.get("name") as string;
  const author = formData.get("author") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const publishedAt = new Date(formData.get("publishedAt") as string); // Assuming you're passing a date string.

  try {
    const book = await prisma.book.create({
      data: {
        name,
        author,
        description,
        price,
        stock,
        publishedAt,
        imageUrl,
      },
    });
    console.log("Book created:", book);
  } catch (error) {
    console.error("Error creating book:", error);
  }
}

export async function updateBook(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const name = formData.get("name") as string;
  const author = formData.get("author") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const publishedAt = new Date(formData.get("publishedAt") as string);

  // Log the form data to check if it's being correctly parsed
  console.log("Form Data:", { id, name, author, imageUrl, price, stock, publishedAt });

  // Ensure that all required fields are valid
  if (!id || !name || !author || !imageUrl || !price || !stock || !publishedAt) {
    console.error("Invalid form data:", { id, name, author, imageUrl, price, stock, publishedAt });
    return; // Exit if data is invalid
  }

  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        name,
        author,
        imageUrl,
        price,
        stock,
        publishedAt,
      },
    });
    console.log("Book updated:", updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
  }
}