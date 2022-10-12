import {useState} from 'react';

export default function Register({register}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const send = () => {
        register(username, password);
    }

    return (
        <section className="preview">
            <h2>Register</h2>
            <div className="grid-container">
                <div className="grid-item">User name</div>
                <div className="grid-item"><input placeholder='username' value={username} onChange={({target}) =>{setUsername(target.value)}} /></div>
                <div className="grid-item">Password</div>
                <div className="grid-item"><input placeholder='password' type="password" value={password} onChange={({target}) =>{setPassword(target.value)}} /></div>
            </div>
            <button onClick={send}>Register</button>
        </section>
    )
}