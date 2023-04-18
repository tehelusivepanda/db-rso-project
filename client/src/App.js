import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import ViewEvent from "./pages/ViewEvent";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddUni from "./pages/AddUni";
import AddRso from "./pages/AddRso";
import ViewRso from "./pages/ViewRso";
import { Auth } from "./helpers/Auth";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./ucf.png";
import vu from "./vu.png";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    university: "",
    level: "",
    status: false
  });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", {
      headers: {
        access: localStorage.getItem("access"),
      }})
      .then((response) => {
        if (response.data.error)
          setAuthState({ ...authState, status: false });
        else
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            university: response.data.university,
            level: response.data.level,
            status: true
          });
      });
  }, [authState]);

  const logout = () => {
    localStorage.removeItem("access");
    setAuthState({
      username: "",
      id: 0,
      university: "",
      level: "",
      status: false
    });
  }

  return (
    <div className="App">
      <Auth.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link className="link" to="/">Home</Link>

            {!authState.status ? (
              <>
                <Link className="link" to="/login">Login</Link>
                <Link className="link" to="/register">New User?</Link>
              </>
            ) : (
              <>
                <Link className="link" to="/addevent">Add Event</Link>
                <button className="logout" onClick={logout}>Logout</button>
              </>
            )}
            {authState.status && (authState.level !== "admin" || authState.level !== "superadmin") ? (
              <>
                <Link className="link" to="/viewrso">View RSOs</Link>
              </>
            ) : (
              <>
              </>
            )}
            {authState.level === "admin" ? (
              <>
                <Link className="link" to="/addrso">Add RSO</Link>
              </>
            ) : (
              <>
              </>
            )}
            {authState.level === "superadmin" ? (
              <>
                <Link className="link" to="/addrso">Register RSO</Link>
                <Link className="link" to="/adduni">Register University</Link>
              </>
            ) : (
              <>
              </>
            )}

            <div className="loginName">{ authState.status ? (
               <>You are logged in as: { authState.level }</>
               ) : (
                <></>
               )}
            </div>
            {authState.level === "superadmin" ? (
              <>
                              <img src={vu} alt="vu" />
                              </>
            ) : (
              <>
              <img src={logo} alt="logo" />
              </>
            )}


          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addevent" element={<AddEvent />} />
            <Route path="/viewevent/:id" element={<ViewEvent />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adduni" element={<AddUni />} />
            <Route path="/addrso" element={<AddRso />} />
            <Route path="/viewrso" element={<ViewRso />} />
          </Routes>
        </Router>
      </Auth.Provider>
    </div>
  );
}

export default App;
