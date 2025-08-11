import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Home</h1>
      <Link to="/login" className="text-blue-500">
        Login
      </Link>
      <Link to="/signup" className="text-blue-500">
        Signup
      </Link>
    </div>
  );
};
