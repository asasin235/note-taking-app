import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Auth({ user, setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = async () => {
        try {
            if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                setUser(userCredential.user);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                setUser(userCredential.user);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
            {user ? (
                <>
                    <h2 className="text-xl font-bold">Welcome, {user.email}</h2>
                    <button
                        className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full mb-2 p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full mb-4 p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                        onClick={handleAuth}
                    >
                        {isLogin ? "Login" : "Sign Up to this awesome App"}
                    </button>
                    <p className="mt-3 text-sm text-center cursor-pointer text-blue-500" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Create an account" : "Already have an account? Login"}
                    </p>
                </>
            )}
        </div>
    );
}
