import { useEffect, useState } from "react";
import { useAuthContext } from "../context/auth-context";

type Data = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const Home = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuthContext();
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiURL =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_BACKEND_DEV_URL
      : import.meta.env.VITE_BACKEND_PROD_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}/api/v1`);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Test fetched data:</h1>
      <h1 className="text-xl ">{data?.title}</h1>

      <div className="mt-8 p-4 border rounded">
        <h2 className="text-2xl font-bold mb-2">Auth Status:</h2>
        {authLoading ? (
          <p>Loading auth...</p>
        ) : isAuthenticated ? (
          <p className="text-green-600">✅ Authenticated as: {user?.email}</p>
        ) : (
          <p className="text-red-600">❌ Not authenticated</p>
        )}
      </div>
    </div>
  );
};

export default Home;
