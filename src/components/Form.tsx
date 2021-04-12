import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper } from "@material-ui/core";
import { MyContext } from "../context/context";
import { v1 as uuidv1 } from "uuid";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [val, setVal] = useState({ title: "", description: "" });
  const { updateNotes, toogleForm } = useContext(MyContext);

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const id = uuidv1();
    const { title, description } = val;
    if (title === "" && description === "") return toogleForm();

    updateNotes({ id, title, description });
    toogleForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setVal((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  return (
    <Paper>
      <Grid container>
        <Grid item>
          <Box p={2}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="title"
                label="Title (optional...)"
                name="title"
                type="text"
                value={val.title}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="description"
                label="Description"
                type="textarea"
                id="password"
                autoFocus
                value={val.description}
                onChange={handleChange}
              />

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={toogleForm}
                  >
                    Anuluj
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Dodaj
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
