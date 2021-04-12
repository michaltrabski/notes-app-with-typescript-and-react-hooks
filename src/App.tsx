import React from "react";
import "./App.css";
import BottomAppBar from "./components/BottomAppBar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Notes from "./components/Notes";
import Form from "./components/Form";
import { ThemeContext, Note, Theme as MyTheme } from "./context/context";

function App() {
  const classes = useStyles();
  const [theme, setTheme] = React.useState(MyTheme.Light);

  const notes = [
    { id: "id1", title: "Title", description: "Description" },
    { id: "id2", title: "Title", description: "" },
    { id: "id3", title: "", description: "Description" },
    { id: "id4", title: "", description: "Description" },
  ];

  const updateNotes = (note: Note) => {
    console.log("updateNotes działa ");
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme, notes, updateNotes }}>
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
      </ThemeContext.Provider>
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
