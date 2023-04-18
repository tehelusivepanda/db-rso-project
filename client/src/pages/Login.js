import React, { useState, useContext } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Auth } from "../helpers/Auth";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [level] = useState("");
    const { setAuthState } = useContext(Auth);

    const history = useNavigate();

    const login = () => {
        const data ={ username: username, password: password, level: level };
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error)
            {
                alert(response.data.error);
            }
            else
            {
                localStorage.setItem("access", response.data.token);
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    university: response.data.university,
                    level: response.data.level,
                    status: true
                });
                history("/");
            }
        });
    };

    return (
        <div className="loginContainer">
            <label>Username: </label>
            <input type="text" onChange={(event) => { setUsername(event.target.value); }}/>
            <label>Password: </label>
            <input type="password" onChange={(event) => { setPassword(event.target.value); }}/>

            <button onClick={ login }>Login</button>
        </div>
    )
}

export default Login