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

interface Banner {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  size: number;
  width: number;
  height: number;
}


interface DeleteBannerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  banner: Banner | null;
  isLoading?: boolean;
}

export default function DeleteBannerDialog({
  isOpen,
  onClose,
  onConfirm,
  banner,
  isLoading = false,
}: DeleteBannerDialogProps) {
  if (!banner) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Delete Banner</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <p>
                Are you sure you want to delete <strong>{banner.name}</strong>? 
                This action cannot be undone and will permanently remove the banner 
                from your website.
              </p>
              
              {/* Banner Preview */}
              <div className="border rounded-lg overflow-hidden bg-gray-50">
                <div className="aspect-video relative">
                  <img
                    src={banner.url}
                    alt={banner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {banner.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {banner.width} × {banner.height} • {(banner.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
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
              'Delete Banner'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}