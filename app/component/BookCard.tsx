// BookCard.tsx
import { useState } from "react";
import { Book } from "@/types/books"; // Import the Book interface

export default function BookCard({
  book,
  deleteBook,
  updateBook,
}: {
  book: Book; // Type the `book` prop using the Book interface
  deleteBook: (id: number) => void;
  updateBook: (formData: FormData) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({ ...book });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", formState.id.toString());
    formData.append("name", formState.name);
    formData.append("author", formState.author);
    formData.append("description", formState.description);
    formData.append("price", formState.price.toString());
    formData.append("stock", formState.stock.toString());
    formData.append("publishedAt", formState.publishedAt);
    formData.append("imageUrl", formState.imageUrl);

    await updateBook(formData);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="hidden" name="id" value={formState.id} />
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            className="border-2 border-black m-2 text-black"
            required
          />
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formState.author}
            onChange={(e) => setFormState({ ...formState, author: e.target.value })}
            className="border-2 border-black m-2 text-black"
            required
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={formState.description}
            onChange={(e) => setFormState({ ...formState, description: e.target.value })}
            className="border-2 border-black m-2 text-black"
            required
          />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formState.price}
            onChange={(e) => setFormState({ ...formState, price: parseFloat(e.target.value) })}
            className="border-2 border-black m-2 text-black"
            required
          />
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formState.stock}
            onChange={(e) => setFormState({ ...formState, stock: parseInt(e.target.value) })}
            className="border-2 border-black m-2 text-black"
            required
          />
          <label>Published At:</label>
          <input
            type="date"
            name="publishedAt"
            value={formState.publishedAt}
            onChange={(e) => setFormState({ ...formState, publishedAt: e.target.value })}
            className="border-2 border-black m-2 text-black"
            required
          />
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={formState.imageUrl}
            onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
            className="border-2 border-black m-2 text-black"
            required
          />
          <button type="submit" className="border-2 border-black m-2">
            Update Book
          </button>
          <button type="button" onClick={handleCancel} className="border-2 border-black m-2">
            Cancel
          </button>
        </form>
      ) : (
        <article className="group">
          <img
            alt="Book cover"
            src={book.imageUrl}
            className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
          />
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">{book.name}</h3>
            <p className="font-bold mt-2 text-sm text-gray-500">Author: {book.author}</p>
            <p className="mt-2 text-sm text-gray-500">Description: {book.description}</p>
            <p className="mt-2 text-sm text-gray-500">Price: ${book.price}</p>
            <p className="mt-2 text-sm text-gray-500">Stock: {book.stock}</p>
            <p className="mt-2 text-sm text-gray-500">Published: {book.publishedAt}</p>
            <div className="flex gap-2 mt-4">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded"
                onClick={() => deleteBook(book.id)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded"
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
