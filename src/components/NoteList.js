import { NoteItem } from "./NoteItem";

export const NoteList = ({ notes, deleteNote, editNote }) => {
    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {notes.map((note) => (
                <NoteItem key={note.id} note={note} deleteNote={deleteNote} editNote={editNote} />
            ))}
        </div>
    );
};
