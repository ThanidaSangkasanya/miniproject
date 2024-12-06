import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Convert id to a number since Prisma expects an Int
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    // Delete the book from the database
    await prisma.book.delete({
      where: { id: numericId },
    });

    return NextResponse.json({ message: "Book deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log("Failed to delete book:", error);
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 });
  }
}
