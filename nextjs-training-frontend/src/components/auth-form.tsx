"use client";

import { signup } from "@/actions/auth-actions";
import { useCustomActionState } from "@/lib/custom";
import Link from "next/link";

interface FormState {
  errors: {
    email: string;
    password: string;
  };
}

const AuthForm: React.FC = () => {
  const initialState: FormState = { errors: { email: "", password: "" } };
  const [formState, formAction] = useCustomActionState<FormState>(
    signup,
    initialState
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
  };
  return (
    <form id="auth-form" onSubmit={handleSubmit}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {Object.entries(formState.errors).map(([key, value]) => {
            if (typeof value === "string" && value) {
              return <li key={key}>{value}</li>;
            }
            return null;
          })}
        </ul>
      )}
      <p>
        <button type="submit">Create Account</button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
};
export default AuthForm;
