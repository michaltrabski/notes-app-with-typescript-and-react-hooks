import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper } from "@material-ui/core";
import { MyContext, ToogleFormValue } from "../context/context";
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

export default function Form() {
  const classes = useStyles();
  const {
    notes,
    updateNotes,
    toogleForm,
    formValue,
    handleFormChange,
  } = useContext(MyContext);

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (formValue.title === "" && formValue.description === "") {
      return toogleForm();
    }

    updateNotes(formValue);
    toogleForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleFormChange(e.target.name, e.target.value);
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
                name="description"
                label="Note"
                type="textarea"
                id="password"
                autoFocus
                value={formValue.description}
                onChange={handleChange}
              />
              {/* <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="title"
                label="Title (optional...)"
                name="title"
                type="text"
                value={formValue.title}
                onChange={handleChange}
              /> */}
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={() => toogleForm(ToogleFormValue.Close)}
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
                    disabled={
                      formValue.title === "" && formValue.description === ""
                        ? true
                        : false
                    }
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
