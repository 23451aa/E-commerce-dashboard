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

interface DeleteOfferDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  offerTitle: string;
  isLoading?: boolean;
}

export default function DeleteOfferDialog({
  isOpen,
  onClose,
  onConfirm,
  offerTitle,
  isLoading = false,
}: DeleteOfferDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Delete Offer</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the offer <strong>"{offerTitle}"</strong>? 
            This action cannot be undone and will permanently remove the offer 
            from your home screen and all associated data.
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
              'Delete Offer'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}