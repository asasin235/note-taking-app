import { db, auth } from "./firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs, query, where } from "firebase/firestore";

// Add note
export const addNote = async (text) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        await addDoc(collection(db, "notes"), {
            text,
            userId: user.uid,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error adding note:", error.message);
    }
};

// Fetch notes
export const getNotes = async () => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const q = query(collection(db, "notes"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching notes:", error.message);
        return [];
    }
};

// Update note
export const updateNote = async (noteId, newText) => {
    try {
        await updateDoc(doc(db, "notes", noteId), { text: newText });
    } catch (error) {
        console.error("Error updating note:", error.message);
    }
};

// Delete note
export const deleteNote = async (noteId) => {
    try {
        await deleteDoc(doc(db, "notes", noteId));
    } catch (error) {
        console.error("Error deleting note:", error.message);
    }
};
