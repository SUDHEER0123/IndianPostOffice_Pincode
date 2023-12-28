
import {  createContext, useState } from "react";
import Clock from "./components/Clock/Clock";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";



export const myContext = createContext();

function App() {
  const [state, setState] = useState("light");

  // function updateTheme(key, value) {
  //   setState({
  //     ...state,
  //     [key]: value
  //   });
  // }

  return (
    <div className={state}>
      <myContext.Provider value={{ state, setState}}>
      <Navbar />
      </myContext.Provider>
    </div>
  );
}

export default App;
