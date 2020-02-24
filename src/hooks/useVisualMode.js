import { useState } from "react";

export default function useVisualMode(inMode) {
  const [mode, setMode] = useState(inMode);
  const [history, setHistory] = useState([inMode]);
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    replace
      ? setHistory([...history.slice(0, -1), newMode])
      : setHistory(prev => [...prev, newMode]);
  };
  const back = () => {
    if (!(mode === inMode)) {
      setHistory([...history.slice(0, -1)]);
      setMode(history[history.slice(0, -1).length - 1]);
    }
  };
  return {
    mode,
    transition,
    back
  };
}
