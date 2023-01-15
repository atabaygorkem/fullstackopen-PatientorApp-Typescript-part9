/* eslint-disable @typescript-eslint/no-unused-vars */
import AddDiagnoseEntryForm from "./AddDiagnoseEntryForm";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { EntryWithoutId } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddDiagnoseEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new diagnose entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        <AddDiagnoseEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddDiagnoseEntryModal;
