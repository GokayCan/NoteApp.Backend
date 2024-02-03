import React, { useState, useEffect } from "react";
import axios from "axios";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";


const NotesListPage = () => {
  const [notes = [], setNotes] = useState<any>([]);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_API_URL + "/api/notes/").then((res) => {
        setNotes(res.data);
      });
    } catch (error) {
      console.error("Notları alma sırasında bir hata oluştu:", error);
    }
  }, []);

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
