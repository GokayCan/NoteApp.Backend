import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NotePage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  //let noteId = match.params.id;
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
    if (noteId === "new") return;

    await axios.get(process.env.REACT_APP_API_URL + `/api/note/${noteId}/`).then((res) => {
      setNote(res.data);
    });
  };

  let createNote = async () => {
    await axios.post(process.env.REACT_APP_API_URL + `/api/note/create/`, note);
  };

  let updateNote = async () => {
    await axios.put(process.env.REACT_APP_API_URL + `/api/note/${noteId}/update/`, note);
  };

  let deleteNote = async () => {
    await axios.delete(process.env.REACT_APP_API_URL + `/api/note/${noteId}/delete/`);
    navigate("/");
  };

  let handleSubmit = async () => {
    if (note === null) {
      navigate("/");
    } else {
      if (noteId !== "new" && note.body == "") {
        await deleteNote();
      } else if (noteId !== "new") {
        await updateNote();
      } else if (noteId === "new" && note.body !== null) {
        await createNote();
      }
      navigate("/");
    }
  };

  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
