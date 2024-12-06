"use client";
import React, { useState, useEffect } from "react";
import { Book } from "../../types/books";
import CreateForm from "../component_staff/CreateForm";
import EditForm from "../component_staff/EditForm";
import prisma from "@/utils/db";

export default function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // For editing
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch books from the API
  const fetchBooks = async () => {
    try {
      const response = await fetch("/action_staff/books");
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEditClick = (book: Book) => {
    setSelectedBook(book); // Set the book to edit
  };

  // Function to delete a book
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) alert ("Failed to delete book");
      fetchBooks(); // Refresh the book list after deletion
    } catch (error) {
      console.log("Error deleting book:", error);
    }
  };
  
  

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fot Staff Only</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Create Book
        </button>
      </div>

      {/* Create Book Form */}
      {showCreateForm && (
        <CreateForm
          onClose={() => setShowCreateForm(false)}
          onBookCreated={fetchBooks}
        />
      )}

      {/* Edit Book Form */}
      {selectedBook && (
        <EditForm
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onBookUpdated={fetchBooks}
        />
      )}

      {/* Display Books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          books.map((book) => (
            <div
              key={book.id}
              className="bg-gray-100 p-4 rounded shadow flex flex-col items-center"
            >
              <img
                src={book.imageUrl}
                alt="Book cover"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold mb-2 text-center">{book.name}</h3>
              <p className="text-sm text-gray-700">Author: {book.author}</p>
              <p className="text-sm text-gray-700 line-clamp-2">{book.description}</p>
              <p className="text-sm text-gray-700">Price: ${book.price.toFixed(2)}</p>
              <p className="text-sm text-gray-700">Stock: {book.stock}</p>
              <p className="text-sm text-gray-700">
                Published At: {new Date(book.publishedAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleEditClick(book)}
                className="mt-4 bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                className="px-4 py-2 text-white bg-red-500 rounded mt-2"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
