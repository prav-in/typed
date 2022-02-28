import React from "react";
import Key from "./Key";
import "./css/Keyboard.css";
import { AiFillGithub } from "react-icons/ai";
import { useState } from "react";

const gitElement = (
  <a
    href="https://github.com/prav-in/typed"
    target="_blank"
    rel="noopener noreferrer"
  >
    <AiFillGithub />
  </a>
);

const row1 = [
  ["`", 192, "~"],
  ["1", 49, "!"],
  ["2", 50, "@"],
  ["3", 51, "#"],
  ["4", 52, "$"],
  ["5", 53, "%"],
  ["6", 54, "^"],
  ["7", 55, "&"],
  ["8", 56, "*"],
  ["9", 57, "("],
  ["0", 48, ")"],
  ["-", 189, "_"],
  ["=", 187, "+"],
  ["BACK", 8, "", "109px"],
];

const row2 = [
  ["TAB", 9, "", "80px"],
  ["Q", 81],
  ["W", 87],
  ["E", 69],
  ["R", 82],
  ["T", 84],
  ["Y", 89],
  ["U", 85],
  ["I", 73],
  ["O", 79],
  ["P", 80],
  ["[", 219, "{"],
  ["]", 221, "}"],
  ["\\", 220, "|", "80px"],
];
const row3 = [
  ["CAPS", 20, "", "103px"],
  ["A", 65],
  ["S", 83],
  ["D", 68],
  ["F", 70],
  ["G", 71, "", "", gitElement],
  ["H", 72],
  ["J", 74],
  ["K", 75],
  ["L", 76],
  [";", 186, ":", ""],
  ["'", 222, '"', ""],
  ["Enter", 13, "", "114px"],
];
const row4 = [
  ["Shift", 16, "", "137px", "ShiftLeft"],
  ["Z", 90],
  ["X", 88],
  ["C", 67],
  ["V", 86],
  ["B", 66],
  ["N", 78],
  ["M", 77],
  [",", 188, "<"],
  [".", 190, ">"],
  ["/", 191, "?"],
  ["Shift", 16, "", "137px", "ShiftRight"],
];

const row5 = [
  ["CRTL", 17, "72px", "ControlLeft"],
  ["Win", 91, "62px", "MetaLeft"],
  ["ALT", 18, "62px", "AltLeft"],
  ["", 32, "356px"],
  ["ALT", 18, "62px", "AltRight"],
  ["Win", 91, "62px", "MetaRight"],
  ["Mnu", 93, "62px", "ContextMenu"],
  ["CTRL", 17, "72px", "ControlRight"],
];

export default function Keyboard({ keyCode, code }) {
  // hooks
  const [showGithub, setShowGithub] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowGithub(true)}
      onMouseLeave={() => setShowGithub(false)}
      className="keyboard"
    >
      <div className="keyboard-row">
        {row1.map((key) => (
          <Key
            key={key[1]}
            cl={keyCode === key[1]}
            shiftKey={key[2]}
            keyName={key[0]}
            width={key[3] || "52px"}
          />
        ))}
      </div>
      <div className="keyboard-row">
        {row2.map((key) => (
          <Key
            key={key[1]}
            cl={keyCode === key[1]}
            shiftKey={key[2]}
            keyName={key[0]}
            width={key[3] || "52px"}
          />
        ))}
      </div>
      <div className="keyboard-row">
        {row3.map((key) => (
          <Key
            key={key[1]}
            cl={keyCode === key[1]}
            shiftKey={key[2]}
            keyName={showGithub && key[4] ? key[4] : key[0]}
            width={key[3] || "52px"}
          />
        ))}
      </div>
      <div className="keyboard-row">
        {row4.map((key) => (
          <Key
            key={key[4] ? key[4] : key[1]}
            cl={key[4] ? code === key[4] : keyCode === key[1]}
            shiftKey={key[2]}
            keyName={key[0]}
            width={key[3] || "52px"}
          />
        ))}
      </div>
      <div className="keyboard-row">
        {row5.map((key) => (
          <Key
            key={key[3] ? key[3] : key[1]}
            cl={key[3] ? code === key[3] : keyCode === key[1]}
            keyName={key[0]}
            width={key[2]}
          />
        ))}
      </div>
    </div>
  );
}
