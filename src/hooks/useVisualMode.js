import { useState } from "react";

export default function useVisualMode(initial) {

  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([ initial ]);

  function transition(newMode, replace = false) {
    setMode(newMode);

    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length -1), newMode])
    } else {
      setHistory((prev) => [...prev, newMode])
    }


    // if (newMode !== mode) {
    //   setMode(newMode);

    //   (replace
    //     ? history[history.length - 1] = newMode
    //     : history.push(newMode)
    //   );
    //   setHistory([ ...history ]);
    // }
  }

  function back() {
    if (history.length > 1) {

      setMode(history[history.length - 2]);
      setHistory((prev) => [...prev.slice(0, prev.length -1)])
      
      // history.pop();
      // setMode(history[history.length - 1]);
      // setHistory([ ...history ]);
    }
  }

  return { mode, transition, back };
  
}