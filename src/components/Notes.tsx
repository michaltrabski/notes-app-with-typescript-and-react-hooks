import React, { useState, useContext } from "react";
import Form from "./Form";
import MyDrawer from "./MyDrawer";
import NoteCard from "./NoteCard";
import { ReactComponent as YourSvg } from "../media/undraw_access_denied_re_awnf.svg";
import { MyContext, Theme as MyTheme } from "../context/context";
import { Typography } from "@material-ui/core";

export default function Notes() {
  const { notes } = useContext(MyContext);

  return (
    <>
      {notes.length > 0 ? (
        notes.map((note) => <NoteCard key={note.id} note={note} />)
      ) : (
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          align="center"
        >
          You have 0 notes!
        </Typography>
      )}
    </>
  );
}
