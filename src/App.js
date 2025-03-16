import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotesList from "./pages/NotesList";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/add" element={<AddNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
      </Routes>
    </Router>
  );
}

export default App;
