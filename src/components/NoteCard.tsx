import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Note } from "../context/context";

interface Props {
  note: Note;
  // handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NoteCard(props: Props) {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const { title, description } = props.note;
  // const { handleChange } = props;

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
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    margin: "20px",
  },
});
