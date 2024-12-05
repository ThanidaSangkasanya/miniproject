// app/actions/bookActions.ts
"use server";

export async function createBook(formData: FormData) {
  const name = formData.get("name") as string;
  const author = formData.get("author") as string;
  const description = formData.get("description") as string;
  const imageURL = formData.get("imageUrl") as string;
  const price = formData.get("price") as string;

  // Server-side logic for creating a book
  console.log("Book created:", name, author, description, imageURL,price);
}

export async function updateBook(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const name = formData.get("name") as string;
  const author = formData.get("author") as string;
  const imageURL = formData.get("imageURL") as string;
  const price = formData.get("price") as string;

  // Server-side logic for updating a book
  console.log("Book updated:", id, name, author, imageURL,price);
}
