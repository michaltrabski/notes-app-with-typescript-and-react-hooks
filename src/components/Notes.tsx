import React, { useState, useContext } from "react";
import Form from "./Form";
import MyDrawer from "./MyDrawer";
import NoteCard from "./NoteCard";
import { ReactComponent as YourSvg } from "../media/undraw_access_denied_re_awnf.svg";
import { ThemeContext, Theme as MyTheme } from "../context/context";

export default function Notes() {
  const { notes } = useContext(ThemeContext);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value, name } = e.target;
  //   // console.log(id, value);

  //   const newNote = notes.find((note) => note.id === id);

  //   if (newNote) {
  //     newNote[name] = value;
  //     console.log(newNote);

  //     const newNotes = notes.map((note) => {
  //       return note.id === newNote.id ? newNote : note;
  //     });

  //     setNotes(newNotes);
  //   }
  // };

  return (
    <>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </>
  );
}
