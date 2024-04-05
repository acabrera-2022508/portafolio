import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            if (count - 8 <= -200) {
              setCount(-200)
              return;
            }

            setCount((count) => count - 8);
          }}
        >
          Restar - 8
        </button>
        <button
          onClick={() => {
            if (count <= -200) {
              return;
            }
            setCount((count) => count - 1);
          }}
        >
          Restar
        </button>

        <p>Count is {count}</p>

        <button
          onClick={() => {
            if (count >= 200) {
              return;
            }
            setCount((count) => count + 1);
          }}
        >
          Sumar
        </button>
        <button
          onClick={() => {
            if (count + 8 > 200) {
              setCount(200)
              return;
            }
            
            setCount((count) => count + 8);
          }}
        >
          Sumar + 8
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
