import React, { useState } from "react";
import BottomAppBar from "./components/BottomAppBar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Notes from "./components/Notes";
import {
  formValueTemplate,
  Category,
  MyContext,
  Note,
  NoteStatus,
  Theme as MyTheme,
  ToogleFormValue,
} from "./context/context";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { v1 as uuidv1 } from "uuid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Badge, Box, IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Link as RouterLink } from "react-router-dom";
import HomePage from "./views/HomePage";
import ItemPage from "./views/ItemPage";

function App() {
  const classes = useStyles();
  const [theme, setTheme] = useState(MyTheme.Light);
  const [formValue, setFormValue] = useState(formValueTemplate);

  const [categories, setCategories] = useLocalStorage<Category[]>(
    "categories",
    [
      { listName: "Notatki", slug: "notatki" },
      { listName: "Lidl", slug: "lidl" },
      { listName: "Allegro", slug: "allegro" },
      { listName: "Bushcraft", slug: "bushcraft" },
    ]
  );

  const [currentList, setCurrentList] = useLocalStorage<number>(
    "currentNoteListNumber",
    0
  );

  const [notes, setNotes] = useLocalStorage<Note[]>(
    categories[currentList].slug,
    []
  );

  const changeCurrentNoteListNumber = (noteListSlug: string) => {
    const nr = categories.findIndex((c) => `/${c.slug}` === noteListSlug);
    if (nr !== -1) {
      setCurrentList(nr);

      const notesStr = localStorage.getItem(categories[nr].slug);
      console.log(categories[nr], notesStr);
      let notes: Note[] = [];
      try {
        if (notesStr) {
          notes = JSON.parse(notesStr);
          setNotes(() => notes);
        }
      } catch (err) {}
    }
  };
  console.log("xxxxxxxxxxxxxxxxxxxx", notes);
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
              <HomePage categories={categories} />
            </Route>

            <Route path="/:id">
              <ItemPage
                categories={categories}
                currentList={currentList}
                changeCurrentNoteListNumber={changeCurrentNoteListNumber}
              />
            </Route>
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
