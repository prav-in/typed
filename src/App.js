import "./App.css";
import Keyboard from "./components/Keyboard";
import { useEffect, useState } from "react";

function App() {
  // hooks

  const [keyCode, setKeyCode] = useState();
  const [code, setCode] = useState();
  const [text, setText] = useState(null);
  const [value, setValue] = useState();
  const [time, setTime] = useState();
  const [typeWrong, setTypeWrong] = useState(false);

  useEffect(() => {
    if (value === text) {
      console.log("Rond");
      setTime((prevTime) => {
        const endTime = performance.now();
        return (endTime - prevTime) / 1000;
      });
    }
  }, [value, text]);

  // functions

  const handleChange = (e) => {
    if (value.length === 1) {
      setTime(performance.now());
    }

    if (text.startsWith(e.target.value)) {
      setTypeWrong(false);
      setValue(e.target.value);
    } else {
      setTypeWrong(true);
    }
  };

  const handleStart = () => {
    setTypeWrong(false);
    setValue("");
    setText(generateRandomText());
  };

  const generateRandomText = () => {
    const arr = [];

    for (let i = 0; i < 10; i++) {
      const rand = Math.round(Math.random() * 34) + 97;
      rand > 122 ? arr.push(32) : arr.push(rand);
    }

    console.log(String.fromCharCode(...arr));
    return String.fromCharCode(...arr);
  };

  const handleKeyDown = (e) => {
    setKeyCode((prevPress) => e.keyCode);
    setCode((prevCode) => e.code);
  };

  return (
    <div className="App">
      <div>
        {typeWrong && <h1>Wrong</h1>}
        <h1>{text}</h1>
      </div>
      <input
        disabled={value === text && keyCode === null}
        value={value}
        type="text"
        onKeyDown={handleKeyDown}
        onKeyUp={() => {
          setKeyCode(null);
          setCode(null);
        }}
        onChange={handleChange}
      />
      {value === text && <h1>Completed in {time} sec</h1>}
      <Keyboard code={code} keyCode={keyCode} />
      <button onClick={handleStart}> Start</button>
    </div>
  );
}

export default App;
