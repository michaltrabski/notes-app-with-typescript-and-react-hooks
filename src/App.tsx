import React, { useState } from "react";
import BottomAppBar from "./components/BottomAppBar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Notes from "./components/Notes";
import {
  formValueTemplate,
  ListsOfNotes,
  MyContext,
  Note,
  NoteStatus,
  Theme as MyTheme,
  ToogleFormValue,
} from "./context/context";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { v1 as uuidv1 } from "uuid";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Badge, Box, IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Link as RouterLink } from "react-router-dom";

function App() {
  const classes = useStyles();
  const [theme, setTheme] = useState(MyTheme.Light);
  const [formValue, setFormValue] = useState(formValueTemplate);

  const [listsOfNotes, setListsOfNotes] = useLocalStorage<ListsOfNotes[]>(
    "listsOfNotes",
    [
      { listName: "Notatki", slug: "notatki" },
      { listName: "Lidl", slug: "lidl" },
      { listName: "Allegro", slug: "allegro" },
    ]
  );

  const [currentList, setCurrentList] = useState(0);

  const [notes, setNotes] = useLocalStorage<Note[]>(
    listsOfNotes[currentList].slug,
    []
  );

  const notesInTrash = notes.filter(
    (note) => note.status === NoteStatus.Deleted
  );

  const [isOpenForm, setIsOpenForm] = useState(false);

  const updateNotes = (_note: Note) => {
    if (_note.id) {
      setNotes(notes.map((note) => (note.id === _note.id ? _note : note)));
      setFormValue(formValueTemplate);
      return;
    }

    const newNote = { ..._note };
    newNote.id = uuidv1();
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setFormValue(formValueTemplate);
  };

  const moveNoteToTrash = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, status: NoteStatus.Deleted } : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  };

  const editNote = (id: string) => {
    toogleForm(ToogleFormValue.Open);
    const currentNote = notes.find((note) => note.id === id);
    if (currentNote) setFormValue(currentNote);
  };

  const handleFormChange = (key: string, value: string) => {
    setFormValue((p) => ({ ...p, [key]: value }));
  };

  const toogleForm = (toogleFormValue?: ToogleFormValue) => {
    if (toogleFormValue === ToogleFormValue.Open) return setIsOpenForm(true);
    if (toogleFormValue === ToogleFormValue.Close) return setIsOpenForm(false);
    setIsOpenForm((isOpenForm) => !isOpenForm);
  };

  return (
    <>
      <MyContext.Provider
        value={{
          theme,
          setTheme,
          notes,
          updateNotes,
          toogleForm,
          isOpenForm,
          deleteNote,
          moveNoteToTrash,
          editNote,
          formValue,
          handleFormChange,
        }}
      >
        <CssBaseline />

        <Router>
          <Switch>
            <Route exact path="/">
              <Paper square className={classes.paper}>
                <Box className={classes.headline}>
                  <Typography
                    className={classes.text}
                    variant="h5"
                    gutterBottom
                    align="center"
                  >
                    {listsOfNotes[currentList].listName} :{" "}
                    {notes.length - notesInTrash.length}
                  </Typography>

                  {notesInTrash.length > 0 && (
                    <IconButton
                      aria-label="deleted items"
                      color="primary"
                      component={RouterLink}
                      to="/kosz"
                    >
                      <Badge
                        badgeContent={notesInTrash.length}
                        color="secondary"
                      >
                        <DeleteOutlineIcon />
                      </Badge>
                    </IconButton>
                  )}
                </Box>

                <Notes />
              </Paper>
            </Route>
            <Route path="/kosz">kosz</Route>
          </Switch>
          <BottomAppBar />
        </Router>
      </MyContext.Provider>
    </>
  );
}

export default App;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    headline: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
    },
  })
);
