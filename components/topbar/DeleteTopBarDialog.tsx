'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteTopBarDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  topBarText: string;
  isLoading?: boolean;
}

export default function DeleteTopBarDialog({
  isOpen,
  onClose,
  onConfirm,
  topBarText,
  isLoading = false,
}: DeleteTopBarDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Delete Top Bar</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the top bar <strong>"{topBarText}"</strong>? 
            This action cannot be undone and will permanently remove the top bar 
            from your website.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Deleting...
              </>
            ) : (
              'Delete Top Bar'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}