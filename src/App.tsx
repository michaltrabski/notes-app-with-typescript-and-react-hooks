import React, { useState } from "react";
import BottomAppBar from "./components/BottomAppBar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Notes from "./components/Notes";
import { MyContext, Note, Theme as MyTheme } from "./context/context";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const classes = useStyles();
  const [theme, setTheme] = React.useState(MyTheme.Light);
  // const [notes, setNotes] = useState<Note[]>([
  //   { id: "id", title: "", description: "Pierwsza notatka!" },
  // ]);

  const [notes, setNotes] = useLocalStorage<Note[]>("ssssssssss", [
    { id: "id", title: "", description: "Pierwsza notatka!" },
  ]);

  const [isOpenForm, setIsOpenForm] = useState(false);

  const updateNotes = (note: Note) => {
    setNotes((prevNotes) => [note, ...prevNotes]);
  };

  const deleteNote = (id: string) => {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  };

  const toogleForm = () => setIsOpenForm((isOpenForm) => !isOpenForm);

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
