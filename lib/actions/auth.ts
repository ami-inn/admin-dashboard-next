"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

const signUp = async (params: AuthCredentials) => {
  const { email, password, fullName, universityId, universityCard } = params;

  // if check user already exists

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      success: false,
      error: "User already exists",
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      email,
      password: hashedPassword,
      fullName,
      universityId,
      universityCard,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Something went wrong= signup error",
    };
  }
};
