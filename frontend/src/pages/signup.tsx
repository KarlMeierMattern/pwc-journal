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
import { useSignup } from "../hooks/use-auth";
import { signUpSchema, type SignUpSchema } from "../types/signup.types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<SignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const signupMutation = useSignup();

  const onSubmit = (data: SignUpSchema) => {
    signupMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          reset();
          navigate("/dashboard", { replace: true });
        },
        onError: (error: Error) => {
          setError("root", {
            message: error.message || "Signup failed",
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 font-geist">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create an account to start your journaling journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            <input
              disabled={signupMutation.isPending}
              placeholder="Email"
              {...register("email")}
              className="text-gray-700 px-6 py-2 text-sm rounded-lg bg-white bg-opacity-80 placeholder-gray-400 focus:outline-none border-1 border-gray-300"
            />
            {errors.email && (
              <p className="text-red-500 bg-red-200 rounded-md px-4 py-2">
                {errors.email.message as string}
              </p>
            )}
            <input
              disabled={signupMutation.isPending}
              placeholder="Password"
              {...register("password")}
              type="password"
              className="text-gray-700 px-6 py-2 text-sm rounded-lg bg-white bg-opacity-80 placeholder-gray-400 focus:outline-none border-1 border-gray-300"
            />
            {errors.password && (
              <p className="text-red-500 bg-red-200 rounded-md px-4 py-2">
                {errors.password.message as string}
              </p>
            )}
            <input
              disabled={signupMutation.isPending}
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword")}
              className="text-gray-700 px-6 py-2 text-sm rounded-lg bg-white bg-opacity-80 placeholder-gray-400 focus:outline-none border-1 border-gray-300"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 bg-red-200 rounded-md px-4 py-2">
                {errors.confirmPassword.message as string}
              </p>
            )}

            {errors.root && (
              <p className="text-red-500 bg-red-100 rounded-md px-4 py-2 mt-2">
                {errors.root.message}
              </p>
            )}

            <Button disabled={signupMutation.isPending}>
              {signupMutation.isPending ? "Signing up..." : "Sign Up"}
            </Button>
            <p className="text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
