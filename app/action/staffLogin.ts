// app/action/staffLogin.ts
import prisma from "@/utils/db";
import isValidPassword from "@/utils/isValidPassword";
import { z } from "zod";
import { seed } from "@/utils/seed_staff";

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
    let staff = await prisma.user.findUnique({
      where: { email },
    });

    if (!staff || staff.role !== "STAFF") {
      await seed();
      staff = await prisma.user.findUnique({
        where: { email },
      });
    }

    if (staff && await isValidPassword(password, staff.password)) {
      return { message: "Login Success" };
    }

    return { error: { message: "Invalid email or password" } };
  } catch (error) {
    console.log(error);
    return { error: { message: "An error occurred during login" } };
  }
}
