import React from "react";
import { updateBook } from "../action/Bookaction";
import { Book } from "../../types/books";

interface Props {
  book: Book;
  onClose: () => void;
  onBookUpdated: () => void;
}

export default function EditForm({ book, onClose, onBookUpdated }: Props) {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    await updateBook(formData);
    onBookUpdated();
    onClose();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="id" defaultValue={book.id} />
        {/* Input fields pre-filled with book data */}
        
          <div>
            <label className="block text-sm font-medium text-gray-700">Updated Name</label>
            <input type="text" name="name" placeholder="Updated Name" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Updated Author</label>
            <input type="text" name="author" placeholder="Updated Author" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Updated Image URL</label>
            <input type="text" name="imageUrl" placeholder="Updated Image URL" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Updated Price</label>
            <input type="number" name="price" placeholder="Updated Price" step="0.01" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Updated Stock</label>
            <input type="number" name="stock" placeholder="Updated Stock" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Updated Published Date</label>
            <input type="date" name="publishedAt" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md">
          Update Book
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
