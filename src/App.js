import "./App.css";
import Keyboard from "./components/Keyboard";
import { useEffect, useState } from "react";

function App() {
  // hooks
  const [keyCode, setKeyCode] = useState();
  const [code, setCode] = useState();
  const [text, setText] = useState("");
  const [value, setValue] = useState();
  const [time, setTime] = useState();
  const [typeWrong, setTypeWrong] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  const completed = value === text;

  useEffect(() => {
    setTypeWrong(false);
    if (completed) {
      setTime((prevTime) => {
        const endTime = performance.now();
        return (endTime - prevTime) / 60000;
      });
    }
  }, [completed, text]);

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
      setWrongCount((prevCount) => prevCount + 1);
    }
  };

  const handleStart = () => {
    setWrongCount(0);
    setValue("");
    setText(generateRandomText());
  };

  const generateRandomText = () => {
    const arr = [];

    for (let i = 0; i < 135; i++) {
      const rand = Math.round(Math.random() * 40) + 97;
      rand > 122 ? arr.push(32) : arr.push(rand);
    }
    const randText = String.fromCharCode(...arr).trim();
    return randText.replace(/  +/g, " ");
  };

  const handleKeyDown = (e) => {
    setKeyCode((prevPress) => e.keyCode);
    setCode((prevCode) => e.code);
  };

  const getTypingSpeed = () => {
    return Math.round(text.length / (5 * time));
  };

  const getAccuracy = () => {
    return Math.round(((text.length - wrongCount) / text.length) * 100);
  };

  return (
    <div className="App">
      <h1 className="heading">Check Your Typing Speed</h1>
      <button className="btn" onClick={handleStart}>
        <span className="btn-text">{text ? "START OVER" : "START"}</span>
      </button>
      <div className="container">
        <div className="text-container">{text}</div>
        <div
          className={typeWrong ? "input-container wrong" : "input-container"}
        >
          {text && <p>Type The Above Paragraph Here</p>}
          <input
            spellcheck="false"
            disabled={completed && keyCode === null}
            value={value}
            type="text"
            onKeyDown={handleKeyDown}
            onKeyUp={() => {
              setKeyCode(null);
              setCode(null);
            }}
            onChange={handleChange}
          />
        </div>
        <div className="result-container">
          {completed && (
            <p>
              Speed : {getTypingSpeed()} WPM
              <span className="seperator">|</span> Accuracy : {getAccuracy()} %
            </p>
          )}
        </div>
        <Keyboard code={code} keyCode={keyCode} />
      </div>
    </div>
  );
}

export default App;
