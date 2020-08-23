import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  useLoginWithMagicLink,
  useMagic,
} from "../../../contexts/MagicContext";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LoginModal: React.FC<Props> = ({ open, setOpen }) => {
  const magic = useMagic();
  const login = useLoginWithMagicLink();
  const [email, setEmail] = useState<string>("");
  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(event: any) => setEmail(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={async () => {
            await login(email);
            handleClose();
            console.log(await magic?.user.getMetadata());
          }}
          color="primary"
        >
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
