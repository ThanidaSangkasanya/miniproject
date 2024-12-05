"use server";

import prisma from "@/utils/db";
import isValidPassword from "@/utils/isValidPassword";
import { loginUser } from "@/utils/loginUser";
import { z } from "zod";

const staffSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

type FieldErrors = {
  email?: string[];
  password?: string[];
  message?: string;
};

export default async function staffLogin(
  _: unknown,
  formData: FormData
): Promise<{ message?: string; error?: FieldErrors }> {
  const result = staffSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { error: result.error.formErrors.fieldErrors };
  }

  const { email, password } = result.data;

  try {
    const staff = await prisma.user.findUnique({
      where: { email },
    });

    if (!staff || staff.role !== "STAFF") {
      return { error: { message: "Staff account not found" } };
    }

    if (await isValidPassword(password, staff.password)) {
      return loginUser(staff, false);
    }

    return { error: { message: "Invalid email or password" } };
  } catch (error) {
    console.error(error);
    return { error: { message: "An error occurred during login" } };
  }
}
