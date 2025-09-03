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
    <div className="App">
      <h1>Message from the API:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
