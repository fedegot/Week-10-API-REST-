import "./App.css";
import { useState } from "react";

import Register from "./components/register";
import Login from "./components/login";
import Profile from "./components/profile";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Register />
      <Login user={user} setUser={setUser} />
      <Profile user={user} setUser={setUser} />
    </div>
  );
}

export default App;
