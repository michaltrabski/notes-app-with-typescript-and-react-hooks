import React, { useEffect, useState } from "react";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Notes from "../components/Notes";
import { Category, Theme as MyTheme } from "../context/context";

import { Link as RouterLink, useLocation } from "react-router-dom";

import { Badge, Box, IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons";

interface Props {
  categories: Category[];
  currentList: number;
  changeCurrentNoteListNumber: (noteListSlug: string) => void;
}
function ItemPage(props: Props) {
  const classes = useStyles();
  let { pathname } = useLocation();

  const { categories, currentList } = props;
  console.log(currentList);
  const category = categories.find((c) => `/${c.slug}` === pathname);

  useEffect(() => {
    props.changeCurrentNoteListNumber(pathname);
  }, [pathname]);

  if (!category) return null;

  // console.log(category, pathname, categories);
  return (
    <Paper square className={classes.paper}>
      <Box className={classes.headline}>
        <Typography
          className={classes.text}
          variant="h5"
          gutterBottom
          align="center"
        >
          {category.listName} : {/* {notes.length - notesInTrash.length} */}
          {category.slug}
        </Typography>

        {/* {notesInTrash.length > 0 && (
          <IconButton
            aria-label="deleted items"
            color="primary"
            component={RouterLink}
            to="/kosz"
          >
            <Badge badgeContent={notesInTrash.length} color="secondary">
              <DeleteOutlineIcon />
            </Badge>
          </IconButton>
        )} */}
      </Box>

      <Notes />
    </Paper>
  );
}

export default ItemPage;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      paddingBottom: 50,
    },
    headline: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
    },
    text: {
      padding: theme.spacing(2, 2, 0),
    },
  })
);
