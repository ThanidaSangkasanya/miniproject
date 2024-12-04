"use client"

import { useState, useEffect } from "react";
import { fetchBooksFromAPI } from "../action/Books";
import { Book } from "@/types/books"; 

const BooksPage: React.FC = () => {
  const [query, setQuery] = useState<string>(""); // State for the search query
  const [books, setBooks] = useState<Book[]>([]); // Explicitly type as an array of `Book`

  const searchBooks = async () => {
    const fetchedBooks = await fetchBooksFromAPI(query);
    setBooks(fetchedBooks);
  };

  useEffect(() => {
    const initBook = async () => {
      const fetchedBooks = await fetchBooksFromAPI("Marvel");
      setBooks(fetchedBooks);
    }
    initBook()
    console.log("Call use effect")
  },[])

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Search Books</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchBooks} className="bg-blue-500 text-white px-4">
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books?.map((book) => (
          <div key={book.id} className="border p-4 rounded shadow">
            <img src={book.imageUrl} alt={book.name} className="mb-2" />
            <h2 className="font-bold text-lg">{book.name}</h2>
            <p className="text-gray-700">{book.author}</p>
            <p>{book.description}</p>
            <p className="text-green-500 font-bold">${book.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;