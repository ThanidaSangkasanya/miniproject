import React from "react";
import { createBook } from "../action/Bookaction";

interface Props {
  onClose: () => void;
  onBookCreated: () => void;
}

export default function CreateForm({ onClose, onBookCreated }: Props) {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    await createBook(formData);
    onBookCreated();
    onClose();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Create Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
              {/* Create Book Form */}
      
        <div>
            <label className="block text-sm font-medium text-gray-700">Book Name</label>
            <input type="text" name="name" placeholder="Book Name" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input type="text" name="author" placeholder="Author" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" placeholder="Description" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" name="imageUrl" placeholder="Image URL" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" name="price" placeholder="Price" step="0.01" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" name="stock" placeholder="Stock" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Published Date</label>
            <input type="date" name="publishedAt" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
         
        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md">
          Create Book
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
