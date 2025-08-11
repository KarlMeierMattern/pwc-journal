// // Production Gaps:
// ✅ Password type attributes - both password fields should have type="password"
// ✅ Loading state handling - form should be disabled during submission
// ❌ Success feedback - no indication when signup succeeds
// ❌ Navigation - no redirect after successful signup
// ❌ Form validation feedback - missing visual indicators for required fields
// ❌ Password visibility toggle
// ❌ Form accessibility (labels, ARIA)
// ❌ Rate limiting protection
// ❌ CSRF protection
// ❌ Password strength indicator

import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/use-auth";
import { loginSchema, type LoginSchema } from "../types/login.types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/button";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          reset();
          navigate("/dashboard");
        },
        onError: (error: Error) => {
          setError("root", {
            message: error.message || "Login failed",
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 bg-white bg-opacity-10 p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <input
          disabled={loginMutation.isPending}
          placeholder="Email"
          {...register("email")}
          className="text-gray-700 px-6 py-4 rounded-lg bg-white bg-opacity-80 text-lg placeholder-gray-400 focus:outline-none border-1 border-gray-300"
        />
        {errors.email && (
          <p className="text-red-500 bg-red-200 rounded-md px-4 py-2">
            {errors.email.message as string}
          </p>
        )}
        <input
          disabled={loginMutation.isPending}
          placeholder="Password"
          {...register("password")}
          type="password"
          className="text-gray-700 px-6 py-4 rounded-lg bg-white bg-opacity-80 text-lg placeholder-gray-400 focus:outline-none border-1 border-gray-300"
        />
        {errors.password && (
          <p className="text-red-500 bg-red-200 rounded-md px-4 py-2">
            {errors.password.message as string}
          </p>
        )}
        {errors.root && (
          <p className="text-red-500 bg-red-100 rounded-md px-4 py-2 mt-2">
            {errors.root.message}
          </p>
        )}

        <Button
          disabled={loginMutation.isPending}
          isPending={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};
