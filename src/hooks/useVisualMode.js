import React, { useState } from "react";

export default function useVisualMode(inMode) {
  const [mode, setMode] = useState(inMode);
  const [history, setHistory] = useState([inMode]);
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    replace ? setHistory([...history.slice(0, -1), newMode]) : setHistory(prev => [...prev, newMode]);
  };
  const back = () => {
    if (!(mode === inMode)) {
      const lastIndex = history.slice(0, -1).length - 1;
      setHistory([...history.slice(0, -1)]);
      setMode(history[lastIndex]);
    }
  };
  return {
    mode,
    transition,
    back
  };
}
