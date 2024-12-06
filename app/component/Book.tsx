"use client"
import { useState, useEffect } from "react";
import { fetchBooksFromAPI } from "../action/Books";
import { getSession } from "@/utils/loginUser";
import { Book } from "@/types/books";
import CartButton from "./cartButton";

const BooksPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<any>(null);

  // Fetch books based on the query
  const searchBooks = async () => {
    const fetchedBooks = await fetchBooksFromAPI(query);
    setBooks(fetchedBooks);
  };

  // Fetch initial books on component mount
  useEffect(() => {
    const initBooks = async () => {
      const fetchedBooks = await fetchBooksFromAPI("Marvel");
      setBooks(fetchedBooks);
    };

    const checkUserSession = async () => {
      const session = await getSession();
      if (session) {
        setUser(session);
      }
    };

    initBooks();
    checkUserSession();
  }, []);

  return (
    <div className="container mx-auto py-4 px-4 md:px-0">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
        Search Books
      </h1>
      <div className="flex flex-col md:flex-row md:items-center mb-4 gap-2">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchBooks}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books?.map((book) => (
          <a
            href="#"
            key={book.id}
            className="group relative block overflow-hidden border border-gray-100 bg-white p-4 sm:p-6"
          >
            <img
              src={book.imageUrl}
              alt={book.name}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />
            <div className="relative">
              <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                New
              </span>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center md:text-left">
                {book.name}
              </h3>
              <p className="text-gray-700 text-center md:text-left">
                {book.author}
              </p>
              <p className="text-gray-700 text-center md:text-left">
                {book.description}
              </p>
              <p className="mt-1.5 text-sm text-green-500 font-bold text-center md:text-left">
                ${book.price.toFixed(2)}
              </p>
              <button className="block w-full rounded bg-yellow-400 p-2 sm:p-4 text-sm font-medium transition hover:scale-105 mt-4">
                Add to Cart
              </button>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
