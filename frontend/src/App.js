import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";

function App() {
  const [page, setPage] = useState("login");

  const [student, setStudent] = useState(null);

  return (
    <div className="App">

      {page === "login" && <Login setPage={setPage} setStudent={setStudent} />}

      {page === "register" && <Register setPage={setPage} />}

      {page === "profile" && <Profile student={student} setStudent={setStudent} setPage={setPage} />}

    </div>
  );
}

export default App;
