import { createContext, useContext } from "react";

export enum Theme {
  Dark = "Dark",
  Light = "Light",
}

export type Note = {
  id: string;
  title: string;
  description: string;
};

export type MyContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => void;
  notes: Note[];
  updateNotes: (note: Note) => void;
  toogleForm: () => void;
  isOpenForm: boolean;
  deleteNote: (id: string) => void;
};

export const MyContext = createContext<MyContextType>({
  theme: Theme.Dark,
  setTheme: (theme) => console.warn("no theme provider"),
  notes: [{ id: "", title: "", description: "" }],
  updateNotes: (note) => console.log("Implement updateNotes method"),
  toogleForm: () => console.log("Implement toogleForm method"),
  isOpenForm: false,
  deleteNote: () => console.log("Implement deleteNote method"),
});
export const useTheme = () => useContext(MyContext);
