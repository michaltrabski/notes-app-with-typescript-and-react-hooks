import React, { useContext } from "react";
import NoteCard from "./NoteCard";
import { MyContext, NoteStatus } from "../context/context";
import { Typography } from "@material-ui/core";

export default function Notes() {
  const { notes } = useContext(MyContext);

  console.log("cccccccccccccccc", notes);
  const publishedNotes = notes.filter(
    (note) => note.status === NoteStatus.Published
  );
  return (
    <>
      {publishedNotes.length > 0 ? (
        publishedNotes.map((note) => <NoteCard key={note.id} note={note} />)
      ) : (
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          align="center"
        >
          You have 0 items in this category!
        </Typography>
      )}
    </>
  );
}
