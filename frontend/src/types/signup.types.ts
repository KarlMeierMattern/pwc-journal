import { z } from "zod";

const validGrades = [
  "Associate",
  "Senior Associate",
  "Manager Level 1",
  "Manager Level 2",
  "Manager Level 3",
  "Manager Level 4",
  "Senior Manager",
] as const;

export const signUpSchema = z
  .object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    grade: z.enum(validGrades).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
