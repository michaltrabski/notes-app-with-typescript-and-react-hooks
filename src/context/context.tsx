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

export type ThemeContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => void;
  notes: Note[];
  updateNotes: (note: Note) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Dark,
  setTheme: (theme) => console.warn("no theme provider"),
  notes: [{ id: "", title: "", description: "" }],
  updateNotes: (note) => console.log("zmieniam note"),
});
export const useTheme = () => useContext(ThemeContext);
