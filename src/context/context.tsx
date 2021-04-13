import { createContext, useContext } from "react";

export const formValueTemplate = {
  id: "",
  title: "",
  description: "",
  pointIt: false,
};

export enum Theme {
  Dark = "Dark",
  Light = "Light",
}

export enum ToogleFormValue {
  Open,
  Close,
}

export type Note = {
  id: string;
  title: string;
  description: string;
  pointIt: boolean;
};

export type MyContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => void;
  notes: Note[];
  updateNotes: (note: Note) => void;
  toogleForm: (toogleFormValue?: ToogleFormValue) => void;
  isOpenForm: boolean;
  deleteNote: (id: string) => void;
  editNote: (id: string) => void;
  formValue: Note;
  handleFormChange: (key: string, value: string) => void;
};

export const MyContext = createContext<MyContextType>({
  theme: Theme.Dark,
  setTheme: (theme) => console.warn("no theme provider"),
  notes: [formValueTemplate],
  updateNotes: (note) => console.log("Implement updateNotes method"),
  toogleForm: () => console.log("Implement toogleForm method"),
  isOpenForm: false,
  deleteNote: () => console.log("Implement deleteNote method"),
  editNote: () => console.log("Implement deleteNote method"),
  formValue: formValueTemplate,
  handleFormChange: () => console.log("Implement handleFormChange method"),
});
export const useTheme = () => useContext(MyContext);
