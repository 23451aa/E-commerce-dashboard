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

interface DeleteSubcategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subcategoryName: string;
  isLoading?: boolean;
}

export default function DeleteSubcategoryDialog({
  isOpen,
  onClose,
  onConfirm,
  subcategoryName,
  isLoading = false,
}: DeleteSubcategoryDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Delete Subcategory</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the subcategory <strong>{subcategoryName}</strong>? 
            This action cannot be undone and will permanently remove the subcategory 
            from your system. All associated products will also be affected.
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
              'Delete Subcategory'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}