import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmModal = ({ isOpen, onClose, onConfirm }: ConfirmModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Confirm</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3">
          <Button variant={"outline"} onClick={onClose}>
            Cancle
          </Button>
          <Button onClick={onConfirm}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
