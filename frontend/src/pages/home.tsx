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

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1`);
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
