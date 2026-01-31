"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/ModalProvider";

type CheckModalProps = {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export const CheckModal = ({
  title,
  description,
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",
}: CheckModalProps) => {
  const { isOpen, closeModal } = useModal();

  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-6 pt-2 flex flex-row justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            {cancelText}
          </Button>

          <Button
            variant="default"
            onClick={() => {
              onConfirm();
              handleClose();
            }}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
