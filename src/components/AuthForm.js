import { useState } from "react";
import { signUp, login, logout } from "../Auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.email}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={() => signUp(email, password)}>Sign Up</button>
                    <button onClick={() => login(email, password)}>Login</button>
                </div>
            )}
        </div>
    );
};

export default AuthForm;
