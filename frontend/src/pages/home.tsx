import { useEffect, useState } from "react";

type Data = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const Home = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Fetched data:</h1>
      <h1 className="text-xl ">{data?.title}</h1>
    </div>
  );
};

export default Home;
