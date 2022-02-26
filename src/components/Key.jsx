import React from "react";
import "./css/Key.css";

export default function Key({ width, shiftKey, keyName, cl }) {
  // hooks

  // functions

  return (
    <button className={cl ? "colored key" : "key"} style={{ width: width }}>
      {shiftKey && <div className="key-shift">{shiftKey}</div>}
      {keyName}
    </button>
  );
}
