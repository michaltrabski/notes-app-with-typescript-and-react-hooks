import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { MyContext, Note } from "../context/context";
import { Box, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface Props {
  note: Note;
  // handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NoteCard(props: Props) {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const { id, title, description } = props.note;
  const { editNote, deleteNote } = useContext(MyContext);

  const toogleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };
  return (
    <Card className={classes.root}>
      <CardActionArea disableTouchRipple={editMode} onClick={toogleEditMode}>
        <CardContent>
          {title && (
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <Box className={classes.box}>
        <IconButton
          aria-label="edit"
          color="secondary"
          onClick={() => editNote(id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => deleteNote(id)}
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
});
