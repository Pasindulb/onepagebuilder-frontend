import React, { useState, useContext } from "react";
import { signin } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

const Signin: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authContext = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await signin(email, password);
            authContext?.login(data.token);
            alert("Login successful!");
        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signin</h2>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Signin</button>
        </form>
    );
};

export default Signin;
