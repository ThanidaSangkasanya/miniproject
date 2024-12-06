"use client";

import { useState, useEffect } from "react";
import { fetchBooksFromAPI } from "../action/Books";
import { addOrder, getOrder } from "../action/Order";
import { getSession } from "@/utils/loginUser";
import { Book } from "@/types/books";

const BooksPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<any>(null); // Store user session
  const [orders, setOrders] = useState<any[]>([]); // Store user orders

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
        fetchOrders(session.id); // Fetch orders if user is logged in
      }
    };

    initBooks();
    checkUserSession();
  }, []);

  // Fetch user's orders
  const fetchOrders = async (userId: number) => {
    try {
      const response = await fetch(`/api/getOrder?userId=${userId}`);
      if (!response.ok) {
        alert("Cannot fetch get order book")
      }
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  

  // Handle adding a book to the cart
  const addToCart = async (book: Book) => {
    if (!user) {
      alert("Please Login or Register first.");
      return;
    }

    try {
      const response = await addOrder({
        userId: user.id,
        bookId: book.id,
        quantity: 1,
        total: book.price,
      });

      if (response.success) {
        alert("Added to cart successfully!");
        fetchOrders(user.id); // Refresh orders
      } else {
        alert("Failed to add to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

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
          <a
            href="#"
            key={book.id}
            className="group relative block overflow-hidden border border-gray-100 bg-white p-6"
          >
            <button
              onClick={() => addToCart(book)}
              className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
            >
              <span className="sr-only">Wishlist</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            <img
              src={book.imageUrl}
              alt={book.name}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative">
              <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                New
              </span>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{book.name}</h3>
              <p className="text-gray-700">{book.author}</p>
              <p className="text-gray-700">{book.description}</p>
              <p className="mt-1.5 text-sm text-green-500 font-bold">${book.price.toFixed(2)}</p>
              <button className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105 mt-4">
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