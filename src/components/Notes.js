import { useState, useEffect } from "react";
import { addNote, getNotes, deleteNote, updateNote } from "../NotesService";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [text, setText] = useState("");
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        const fetchNotes = async () => {
            setNotes(await getNotes());
        };
        fetchNotes();
    }, []);

    const handleAdd = async () => {
        if (text.trim()) {
            await addNote(text);
            setNotes(await getNotes());
            setText("");
        }
    };

    const handleDelete = async (id) => {
        await deleteNote(id);
        setNotes(await getNotes());
    };

    const handleEdit = async (id, newText) => {
        await updateNote(id, newText);
        setNotes(await getNotes());
        setEditId(null);
    };

    return (
        <div>
            <h2>My Notes</h2>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleAdd}>Add Note</button>

            {notes.map((note) => (
                <div key={note.id}>
                    {editId === note.id ? (
                        <>
                            <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                            <button onClick={() => handleEdit(note.id, editText)}>Save</button>
                        </>
                    ) : (
                        <>
                            <p>{note.text}</p>
                            <button onClick={() => { setEditId(note.id); setEditText(note.text); }}>Edit</button>
                            <button onClick={() => handleDelete(note.id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Notes;
