import { useState } from "react";
import { PencilSimple, Trash } from "@phosphor-icons/react";

export const NoteItem = ({ note, deleteNote, editNote }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(note.text);

    const handleSave = () => {
        editNote(note.id, newText);
        setIsEditing(false);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition relative">
            {isEditing ? (
                <input
                    className="border p-2 rounded-lg w-full"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                />
            ) : (
                <p className="text-gray-700">{note.text}</p>
            )}
            <div className="absolute top-2 right-2 flex space-x-2">
                {isEditing ? (
                    <button className="text-green-500 hover:text-green-700" onClick={handleSave}>
                        ✅
                    </button>
                ) : (
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsEditing(true)}>
                        <PencilSimple size={20} />
                    </button>
                )}
                <button className="text-red-500 hover:text-red-700" onClick={() => deleteNote(note.id)}>
                    <Trash size={20} />
                </button>
            </div>
        </div>
    );
};
