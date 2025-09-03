import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/hello");
      const data = await response.json();
      setMessage(data.message);
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <h1 className="font-bold">Message from the API:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
