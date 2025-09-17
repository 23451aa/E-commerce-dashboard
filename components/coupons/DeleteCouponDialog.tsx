// 'use client';

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';

// interface DeleteCouponDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;

//   couponName: string;
// }

// export default function DeleteCouponDialog({
//   isOpen,
//   onClose,
//   onConfirm,
//   couponName,
// }: DeleteCouponDialogProps) {
//   return (
//     <AlertDialog open={isOpen} onOpenChange={onClose}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle className="text-red-600">Delete Coupon</AlertDialogTitle>
//           <AlertDialogDescription>
//             Are you sure you want to delete the coupon <strong>{couponName}</strong>? 
//             This action cannot be undone and will permanently remove the coupon 
//             from your system. Customers will no longer be able to use this coupon.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             onClick={onConfirm}
//             className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
//           >
//             Delete Coupon
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

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
import { useState } from 'react';

interface DeleteCouponDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  couponName: string;
}

export default function DeleteCouponDialog({
  isOpen,
  onClose,
  onConfirm,
  couponName,
}: DeleteCouponDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsLoading(true);
    setErrorMessage(null); // Reset any previous error

    try {
      await onConfirm(); // Call the confirmation handler (coupon deletion)
      onClose(); // Close dialog after confirmation
    } catch (error) {
      setErrorMessage('Failed to delete the coupon. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Delete Coupon</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the coupon <strong>{couponName}</strong>? 
            This action cannot be undone and will permanently remove the coupon 
            from your system. Customers will no longer be able to use this coupon.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {errorMessage && (
          <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={`bg-red-600 hover:bg-red-700 focus:ring-red-600 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Coupon'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
