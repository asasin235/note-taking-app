import { useState } from "react";

export const NoteInput = ({ addNote }) => {
    const [noteText, setNoteText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (noteText.trim()) {
            addNote(noteText);
            setNoteText("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                className="border p-2 rounded-lg w-full"
                placeholder="Write a note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                + Add Note
            </button>
        </form>
    );
};
