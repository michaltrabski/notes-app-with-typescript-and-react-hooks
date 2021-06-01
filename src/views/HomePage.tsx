import { Typography } from "@material-ui/core";
import React from "react";
import CategoryCard from "../components/CategoryCard";
import { Category } from "../context/context";

export interface Props {
  categories: Category[];
}

const HomePage = (props: Props) => {
  return (
    <>
      <Typography variant="h4" component="h1" align="center">
        Your notes categories:
      </Typography>
      {props.categories.map((category) => (
        <CategoryCard category={category} />
      ))}
    </>
  );
};

export default HomePage;
