import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq, inArray } from "drizzle-orm";

import React from "react";

const page = async () => {
  const session = await auth();

  const borrowedBooksRecords = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, session?.user?.id as string));

  const bookIds = borrowedBooksRecords.map((record) => record.bookId);

  const borrowedBooks = await db
    .select()
    .from(books)
    .where(inArray(books.id, bookIds));

  console.log(borrowedBooks, "borrowedBooks");

  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrwed Books" books={borrowedBooks!} />
    </>
  );
};

export default page;
