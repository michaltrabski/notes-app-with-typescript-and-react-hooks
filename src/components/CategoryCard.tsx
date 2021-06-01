import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Category, MyContext, Note } from "../context/context";
import { Box, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { yellow } from "@material-ui/core/colors";
import classNames from "classnames";
import { useHistory } from "react-router";

interface Props {
  category: Category;
}

export default function CategoryCard(props: Props) {
  const classes = useStyles();
  let history = useHistory();
  const [editMode, setEditMode] = useState(false);

  const { editNote, moveNoteToTrash } = useContext(MyContext);

  const toogleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  const { listName, slug } = props.category;
  return (
    <Card className={classes.root}>
      <CardActionArea
        disableTouchRipple={editMode}
        onClick={() => history.push(`/${slug}`)}
        className={classes.overflow}
      >
        <CardContent>
          {/* <Box className={classes.date}>24.08.2021 (2 dni temu)</Box> */}

          <Typography gutterBottom variant="h5" component="h2">
            {listName}
          </Typography>

          {/* {JSON.stringify(props.note)} */}
        </CardContent>
      </CardActionArea>
      <Box className={classes.box}>
        <IconButton
          aria-label="edit"
          color="secondary"
          // onClick={() => editNote(id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="secondary"
          // onClick={() => moveNoteToTrash(id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    margin: "20px",
    display: "flex",
    alignItems: "center",
  },
  box: {
    flexShrink: 0,
  },
  pointIt: {
    backgroundColor: yellow[300],
  },
  overflow: {
    overflow: "auto",
  },
  date: {
    position: "absolute",
    top: "1px",
    left: "1px",
    fontSize: ".6em",
  },
});
