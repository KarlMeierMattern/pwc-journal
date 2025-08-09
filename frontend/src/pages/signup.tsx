import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/use-auth";
import { signUpSchema, type SignUpSchema } from "../types/signup";
import { zodResolver } from "@hookform/resolvers/zod";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<SignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const signupMutation = useSignup();

  const onSubmit = (data: SignUpSchema) => {
    signupMutation.mutate({
      email: data.email,
      password: data.password,
    });
    if (signupMutation.error) {
      setError("root", {
        message: signupMutation.error.message,
      });
    }
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 bg-white bg-opacity-10 p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <input
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
          placeholder="Password"
          {...register("password")}
          className="text-gray-700 px-6 py-4 rounded-lg bg-white bg-opacity-80 text-lg placeholder-gray-400 focus:outline-none border-1 border-gray-300"
        />
        {errors.password && (
          <p className="text-red-500 bg-red-200 rounded-md px-4 py-2">
            {errors.password.message as string}
          </p>
        )}
        <input
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          className="text-gray-700 px-6 py-4 rounded-lg bg-white bg-opacity-80 text-lg placeholder-gray-400 focus:outline-none border-1 border-gray-300"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 bg-red-200 rounded-md px-4 py-2">
            {errors.confirmPassword.message as string}
          </p>
        )}
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white text-lg font-semibold py-3 rounded-lg transition-colors cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};
