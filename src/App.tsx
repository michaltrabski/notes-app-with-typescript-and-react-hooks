import React, { useState } from "react";
import BottomAppBar from "./components/BottomAppBar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Notes from "./components/Notes";
import {
  formValueTemplate,
  MyContext,
  Note,
  Theme as MyTheme,
  ToogleFormValue,
} from "./context/context";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { v1 as uuidv1 } from "uuid";

function App() {
  const classes = useStyles();
  const [theme, setTheme] = React.useState(MyTheme.Light);
  const [formValue, setFormValue] = useState(formValueTemplate);

  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);

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
          editNote,
          formValue,
          handleFormChange,
        }}
      >
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
          <Notes />
        </Paper>
        <BottomAppBar />
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
  })
);
