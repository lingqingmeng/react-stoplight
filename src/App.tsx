import { useEffect, useState } from "react";
import Stoplight from "./Stoplight";

const App = () => {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Stoplight Component</h1>
      <Stoplight />
    </main>
  );
};

export default App;