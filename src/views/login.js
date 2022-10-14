import {useState} from 'react';
import { Link } from "react-router-dom";


export default function Login({login}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const send = () => {
        login(username, password);
    }

    const to = "/register";

    return (
        <section className="preview">
            <h2>Login</h2>
            <div className="grid-container">
                <div className="grid-item">User name</div>
                <div className="grid-item"><input placeholder='username' value={username} onChange={({target}) =>{setUsername(target.value)}} /></div>
                <div className="grid-item">Password</div>
                <div className="grid-item"><input placeholder='password' type="password" value={password} onChange={({target}) =>{setPassword(target.value)}} /></div>
            </div>            
            <button onClick={send}>Login</button>
            <div className="grid-container">
                <div className="grid-item">Not registered?</div>
                <div className="grid-item"><Link className="link" to={to}>Register</Link></div>
            </div>
        </section>
    )
}