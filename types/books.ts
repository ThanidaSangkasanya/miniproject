export interface Book {
    id: number;
    name: string;
    author: string;
    description: string;
    price: number;
    stock: number;
    publishedAt: string; // Assuming Prisma stores DateTime as strings
    imageUrl: string;
  }
  