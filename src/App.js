import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./Auth";

export default function App() {
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [editNote, setEditNote] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscribeAuth;
    }, []);

    useEffect(() => {
        if (user) {
            const q = query(collection(db, "notes"), where("userId", "==", user.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            });
            return unsubscribe;
        }
    }, [user]);

    const handleAddNote = async () => {
        if (newNote.trim() && user) {
            if (editNote) {
                await updateDoc(doc(db, "notes", editNote.id), { text: newNote });
                setEditNote(null);
            } else {
                await addDoc(collection(db, "notes"), { text: newNote, userId: user.uid });
            }
            setNewNote("");
        }
    };

    const handleDeleteNote = async (id) => {
        await deleteDoc(doc(db, "notes", id));
    };

    const handleEditNote = (note) => {
        setNewNote(note.text);
        setEditNote(note);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center p-6">
            <Auth user={user} setUser={setUser} />

            {user && (
                <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-6 mt-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">📒 My Notes</h1>

                    {/* Note Input */}
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Write a note..."
                            className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                        />
                        <button
                            onClick={handleAddNote}
                            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            {editNote ? "Update" : "Add"}
                        </button>
                    </div>

                    {/* Notes List */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {notes.map((note) => (
                            <div key={note.id} className="relative bg-gray-100 p-4 rounded-lg shadow-md border">
                                <p className="text-gray-800">{note.text}</p>
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <button onClick={() => handleEditNote(note)} className="text-gray-500 hover:text-blue-600">
                                        ✏️
                                    </button>
                                    <button onClick={() => handleDeleteNote(note.id)} className="text-red-500 hover:text-red-700">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
