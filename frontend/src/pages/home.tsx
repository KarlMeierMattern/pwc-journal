import { useEffect, useState } from "react";

type Data = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const Home = () => {
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
      <h1 className="text-3xl font-bold underline">Fetched data:</h1>
      <h1 className="text-xl ">{data?.title}</h1>
    </div>
  );
};

export default Home;
