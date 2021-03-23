import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import NoteCard from "./NoteCard";

export interface Note {
  id: string;
  title: string;
  description: string;
}
const notes: Note[] = [
  {
    id: "asdasd",
    title: "Brunch this week?",
    description:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
  },
  {
    id: "asdasasdd",
    title: "Brunch this week?",
    description:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
  },
  {
    id: "ewwerwer",
    title: "Brunch this week?",
    description:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
  },
  {
    id: "asdasawertewrsdd",
    title: "Brunch this week?",
    description:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
  },
];

export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography
          className={classes.text}
          variant="h5"
          gutterBottom
          align="center"
        >
          Notes App
        </Typography>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon />
          </Fab>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: "auto",
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: "0 auto",
    },
  })
);
