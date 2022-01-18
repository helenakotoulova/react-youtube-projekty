import React, { useState, useEffect, useCallback } from "react";
import ToursList from "./components/ToursList";

export type TourType = {
  id: string;
  name: string;
  price: string;
  info: string;
  image: string;
};

function App() {
  const [tours, setTours] = useState<TourType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://course-api.com/react-tours-project");
      const data = await response.json();
      setTours(data);
    } catch (err: unknown) {
      if (typeof err === "string") {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
        setIsLoading(false);
        throw new Error("Something went wrong!");
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const removeItem = (id: string) => {
    setTours((prevTours) => {
      return prevTours.filter((tour) => tour.id !== id);
    });
  };

  if (!isLoading && tours.length === 0 && !error) {
    return <p className="annoucement">No tours found.</p>;
  }

  return (
    <div>
      <ToursList tours={tours} removeItem={removeItem} />
      {isLoading && <p className="annoucement">Loading...</p>}
      {(error && tours.length===0 && !isLoading) && <p className="annoucement">{error}</p>}
    </div>
  );
}

export default App;
