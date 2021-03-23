import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Note } from "./BottomAppBar";

interface Props {
  note: Note;
}

export default function NoteCard(props: Props) {
  const classes = useStyles();
  const { title, description } = props.note;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
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
