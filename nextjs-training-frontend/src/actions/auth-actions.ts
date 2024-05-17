"use server";

import { hashUserPassword } from "@/lib/hash";
import { redirect } from "next/navigation";

const checkUserExists = async (email: string) => {
  const res = await fetch(`http://localhost:8000/users?email=${email}`, {
    method: "GET",
  });

  const data = await res.json();
  if (data.length !== 0) {
    return true;
  }
  return false;
};

export const signup = async (prevState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors: { email: string; password: string } = { email: "", password: "" };

  if (!email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  const isUserExist = await checkUserExists(email);
  if (isUserExist) {
    errors.email = "It's seem like an account already exist";
  }

  if (errors.email != "" || errors.password != "") {
    return {
      errors,
    };
  }

  // store it in the database (create a new user)
  const hashedPassword = hashUserPassword(password);
  await fetch("http://localhost:8000/users", {
    method: "POST",
    body: JSON.stringify({ email, hashedPassword }),
    headers: { "Content-Type": "application/json" },
  });
  redirect("/training");
};
