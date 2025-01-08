import React from "react";
import { styled, keyframes } from "@/stitches.config";
import { blackA } from "@radix-ui/colors";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { context } from "./context";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 }
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: " scale(.96)" },
  "100%": { opacity: 1, transform: " scale(1)" }
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`
  }
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "white",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: 0,
  left: 0,
  // transform: "translate(-50%, -50%)",
  bottom: 0,
  right: 0,
  width: "100vw",
  maxWidth: "100vw",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`
  },
  "&:focus": { outline: "none" }
});

function Content({ children, ...props }: any) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  fontSize: 17,
  marginBottom: ".5rem"
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: "10px 0 20px",
  fontSize: 15,
  lineHeight: 1.5
});

// Exports
export const DialogRoot = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 10,
  right: 10
});

export const useDialog = () => {
  const { open: isOpen, setOpen } = React.useContext(context);

  const open = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const trigger = () => {
    setOpen(!isOpen);
  };

  return {
    isOpen,
    open,
    close,
    trigger
  };
};

interface DialogProps {
  button: React.ReactNode;
  dialogTitle: string;
  dialogContent: React.ReactNode;
}

const Dialog = ({ button, dialogTitle, dialogContent }: DialogProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <context.Provider value={{ open, setOpen }}>
      <DialogRoot open={open}>
        <DialogTrigger asChild onClick={() => setOpen(true)}>
          {button}
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogContent}
          <DialogClose asChild onClick={() => setOpen(false)}>
            <IconButton aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </DialogClose>
        </DialogContent>
      </DialogRoot>
    </context.Provider>
  );
};

export default Dialog;
