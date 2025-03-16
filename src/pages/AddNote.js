import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const saveNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/notes", { title, content });
      navigate("/"); // Kembali ke halaman utama setelah menambahkan catatan
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div className="container form-container">
      <h1>Add New Note</h1>
      <form onSubmit={saveNote}>
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="btn-add">Save Note</button>
      </form>
    </div>
  );
};

export default AddNote;
