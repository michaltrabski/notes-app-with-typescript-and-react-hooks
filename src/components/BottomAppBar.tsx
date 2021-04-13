import React, { useContext } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Form from "./Form";
import { MyContext } from "../context/context";
import { Typography } from "@material-ui/core";

export default function BottomAppBar() {
  const classes = useStyles();
  const { isOpenForm, toogleForm } = useContext(MyContext);

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        {isOpenForm ? (
          <Typography variant="overline">You are adding note:</Typography>
        ) : (
          <Fab
            color="secondary"
            aria-label="add"
            className={classes.fabButton}
            onClick={() => toogleForm()}
          >
            <AddIcon />
          </Fab>
        )}
      </Toolbar>
      {isOpenForm && <Form />}
    </AppBar>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: "auto",
      bottom: 0,
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
