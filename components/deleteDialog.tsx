import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export interface IDeleteDialogProps {
  open: boolean;
  onSubmit: (confirm: boolean) => void;
}

export function DeleteDialog({ open, onSubmit }: IDeleteDialogProps) {
  return (
    <Dialog open={open}>
      <DialogTitle>Are you sure you want to delete this link?</DialogTitle>
      <DialogContent>
        This action can not be undone, all statistics will be lost too
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onSubmit(false)}>no, cancel</Button>
        <Button onClick={() => onSubmit(true)} variant="contained">
          yes, delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
