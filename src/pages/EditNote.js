import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "https://notes-backend-46986360068.us-central1.run.app"; // Ganti dengan URL backend dari Cloud Run

const EditNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/notes/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => console.error("Error fetching note:", error));
  }, [id]);

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/notes/${id}`, { title, content });
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="container form-container">
      <h1>Edit Note</h1>
      <form onSubmit={updateNote}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="btn-add">Update Note</button>
      </form>
    </div>
  );
};

export default EditNote;
