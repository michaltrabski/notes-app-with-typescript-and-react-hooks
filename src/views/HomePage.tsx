import { Typography } from "@material-ui/core";
import React from "react";
import { ListsOfNotes } from "../context/context";

export interface Props {
  listsOfNotes: ListsOfNotes[];
}

const HomePage = (props: Props) => {
  return (
    <>
      <Typography variant="h4" component="h1" align="center">
        Your notes categories:
      </Typography>
      {props.listsOfNotes.map((item) => (
        <p>{item.listName}</p>
      ))}
    </>
  );
};

export default HomePage;
