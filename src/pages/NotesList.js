import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://notes-backend-46986360068.us-central1.run.app"; // Ganti dengan URL backend dari Cloud Run

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/notes`)
      .then((response) => setNotes(response.data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="container">
      <h1>Daftar Note</h1>
      <Link to="/add">
        <button className="btn-add">+ Add Note</button>
      </Link>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className="note-card">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <Link to={`/edit/${note.id}`}>
              <button className="btn-edit">Edit</button>
            </Link>
            <button className="btn-delete" onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default NotesList;
