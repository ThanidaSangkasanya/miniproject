"use client"
import { Book } from "@/types/books";

export const fetchBooksFromAPI = async (query: string): Promise<Book[]> => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
  
      // Map API data to the Book interface
      return data.items.map((item: any) => ({
        id: item.id,
        name: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown Author",
        description: item.volumeInfo.description || "No description available.",
        price: Math.random() * 20 + 5, // Random price (Google Books API doesn't provide pricing)
        stock: 10, // Arbitrary stock value
        publishedAt: item.volumeInfo.publishedDate || "Unknown Date",
        imageUrl: item.volumeInfo.imageLinks?.thumbnail || "/default-book-cover.jpg",
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  