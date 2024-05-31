"use server";

import { hashUserPassword } from "@/lib/hash";
import { redirect } from "next/navigation";

interface FormState {
  errors: string[];
}

interface AuthFormData {
  email: string;
  hashedPassword: string;
}

const checkUserExists = async (email: string): Promise<boolean> => {
  const res = await fetch(`http://localhost:8000/users?email=${email}`, {
    method: "GET",
  });

  const data = await res.json();
  return data.length !== 0;
};

export const signup = async (prevState: FormState, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errors: string[] = [];

  if (!email.includes("@")) {
    errors.push("Please enter a valid email address.");
  }

  if (password.trim().length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  const isUserExist = await checkUserExists(email);
  if (isUserExist) {
    errors.push("It's seem like an account already exist.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  // store it in the database (create a new user)
  const hashedPassword = hashUserPassword(password);

  const authData: AuthFormData = { email, hashedPassword };

  await fetch("http://localhost:8000/users", {
    method: "POST",
    body: JSON.stringify(authData),
    headers: { "Content-Type": "application/json" },
  });
  redirect("/training");
};
