import React from "react";

export interface DialogContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const context = React.createContext({} as DialogContext);
