"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BannerUpload from "@/components/banners/BannerUpload";
import BannerGrid from "@/components/banners/BannerGrid";
import DeleteBannerDialog from "@/components/banners/DeleteBannerDialog";
import { Monitor, Image as ImageIcon, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Banner {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  size: number;
  width: number;
  height: number;
}

// Mock banners data
// const initialBanners: Banner[] = [
//   {
//     id: '1',
//     name: 'Summer Sale Banner 2024',
//     url: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
//     uploadDate: '2024-01-15T10:30:00Z',
//     size: 2048576, // 2MB
//     dimensions: { width: 1920, height: 600 },
//   },
//   {
//     id: '2',
//     name: 'New Product Launch',
//     url: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
//     uploadDate: '2024-01-14T15:45:00Z',
//     size: 1536000, // 1.5MB
//     dimensions: { width: 1920, height: 500 },
//   },
//   {
//     id: '3',
//     name: 'Holiday Special Offer',
//     url: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=800',
//     uploadDate: '2024-01-13T09:15:00Z',
//     size: 3145728, // 3MB
//     dimensions: { width: 1920, height: 700 },
//   },
//   {
//     id: '4',
//     name: 'Flash Sale Weekend',
//     url: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800',
//     uploadDate: '2024-01-12T14:20:00Z',
//     size: 1843200, // 1.8MB
//     dimensions: { width: 1920, height: 550 },
//   },
//   {
//     id: '5',
//     name: 'Black Friday Deals',
//     url: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=800',
//     uploadDate: '2024-01-11T11:30:00Z',
//     size: 2621440, // 2.5MB
//     dimensions: { width: 1920, height: 650 },
//   },
//   {
//     id: '6',
//     name: 'Spring Collection 2024',
//     url: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=800',
//     uploadDate: '2024-01-10T16:45:00Z',
//     size: 2097152, // 2MB
//     dimensions: { width: 1920, height: 600 },
//   },
// ];

export default function WebBannersPage() {
  const [banners, setBanners] = useState<Banner[]>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    banner: Banner | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    banner: null,
    isLoading: false,
  });
  useEffect(() => {
    const fetchBanners = async () => {
      const res = await fetch("/api/banners");
      const data = await res.json();

      setBanners(data);
    };

    fetchBanners();
  }, [refreshFlag]);

  
  const handleUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;

    await toast.promise(
      (async () => {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/banners/upload", {
            method: "POST",
            body: formData,
          });

          for (let i = 0; i <= 100; i += 20) {
            setUploadProgress(i);
            await new Promise((resolve) => setTimeout(resolve, 150));
          }
          setRefreshFlag((prev) => !prev);
          if (!res.ok) {
            throw new Error("Upload failed");
          }
        }
      })(),
      {
        loading: "Uploading banners...",
        success: `${files.length} banner(s) uploaded successfully.`,
        error: "There was an error uploading your banners.",
      }
    );

    setUploadProgress(0);
  };

  const handleDeleteClick = (banner: Banner) => {
    setDeleteDialog({
      isOpen: true,
      banner,
      isLoading: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.banner) return;

    setDeleteDialog((prev) => ({ ...prev, isLoading: true }));

    try {
      const res = await fetch(`/api/banners/${deleteDialog.banner.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete banner");
      }

      // Remove deleted banner from local state
      setBanners((prev) =>
        prev?.filter((b) => b.id !== deleteDialog.banner!.id)
      );

      toast.success(
        `${deleteDialog.banner.name} has been deleted successfully.`
      );

      setDeleteDialog({ isOpen: false, banner: null, isLoading: false });
    } catch (error) {
      console.error("Delete error:", error);

      toast.error("There was an error deleting the banner. Please try again.");

      setDeleteDialog((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleDeleteCancel = () => {
    if (!deleteDialog.isLoading) {
      setDeleteDialog({ isOpen: false, banner: null, isLoading: false });
    }
  };

  const totalSize = banners?.reduce((sum, banner) => sum + banner.size, 0);
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Website Banner Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage promotional banners for your website homepage and landing
            pages.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Banners
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {banners?.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <ImageIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Size</p>
                <p className="text-3xl font-bold text-green-600">
                  {formatFileSize(totalSize!)}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Monitor className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Recent Uploads
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {
                    banners?.filter((b) => {
                      const uploadDate = new Date(b.uploadDate);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return uploadDate > weekAgo;
                    }).length
                  }
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Upload className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Storage Used
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  {((totalSize! / (100 * 1024 * 1024)) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Trash2 className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload New Banners</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BannerUpload
            onUpload={handleUpload}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
          />
        </CardContent>
      </Card>

      {/* Banner Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5" />
            <span>All Website Banners</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BannerGrid
            banners={banners || []}
            onDelete={handleDeleteClick}
            isLoading={false}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteBannerDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        banner={deleteDialog.banner}
        isLoading={deleteDialog.isLoading}
      />
    </div>
  );
}
