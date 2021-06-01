import { createContext, useContext } from "react";

export enum NoteStatus {
  Published = "PUBLISHED",
  Deleted = "DELETED",
}
export const formValueTemplate = {
  id: "",
  title: "",
  description: "",
  pointIt: false,
  status: NoteStatus.Published,
};

export enum Theme {
  Dark = "Dark",
  Light = "Light",
}

export enum ToogleFormValue {
  Open = "OPEN",
  Close = "CLOSE",
}

export type Category = {
  listName: string;
  slug: string;
};

export type Note = {
  id: string;
  title: string;
  description: string;
  pointIt: boolean; // this is to mark a note that is currently used
  status: NoteStatus;
};

export type MyContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => void;
  notes: Note[];
  updateNotes: (note: Note) => void;
  toogleForm: (toogleFormValue?: ToogleFormValue) => void;
  isOpenForm: boolean;
  deleteNote: (id: string) => void;
  moveNoteToTrash: (id: string) => void;
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
  moveNoteToTrash: () => console.log("Implement moveNoteToTrash method"),
  editNote: () => console.log("Implement deleteNote method"),
  formValue: formValueTemplate,
  handleFormChange: () => console.log("Implement handleFormChange method"),
});
export const useTheme = () => useContext(MyContext);
