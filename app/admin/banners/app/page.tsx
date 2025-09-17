"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Trash2, Smartphone, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import BannerUpload from "@/components/banners/BannerUpload"; // reuse same component
import BannerGrid from "@/components/banners/BannerGrid"; // reuse same component
import DeleteBannerDialog from "@/components/banners/DeleteBannerDialog";

interface Banner {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  size: number;
  width: number;
  height: number;
}

export default function MobileBannersPage() {
  const [banners, setBanners] = useState<Banner[]>();
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
      const res = await fetch("/api/mobile-banners");
      const data = await res.json();
      setBanners(data);
    };
    fetchBanners();
  }, [refreshFlag]);

  const handleUpload = async (files: File[]) => {
    if (!files?.length) return;

    await toast.promise(
      (async () => {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/mobile-banners/upload", {
            method: "POST",
            body: formData,
          });

          for (let i = 0; i <= 100; i += 20) {
            setUploadProgress(i);
            await new Promise((resolve) => setTimeout(resolve, 150));
          }
          if (!res.ok) throw new Error("Upload failed");
        }
        setRefreshFlag((prev) => !prev);
      })(),
      {
        loading: "Uploading mobile banners...",
        success: `${files.length} mobile banner(s) uploaded successfully.`,
        error: "There was an error uploading your mobile banners.",
      }
    );

    setUploadProgress(0);
  };

  const handleDeleteClick = (banner: Banner) => {
    setDeleteDialog({ isOpen: true, banner, isLoading: false });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.banner) return;
    setDeleteDialog((prev) => ({ ...prev, isLoading: true }));

    try {
      const res = await fetch(`/api/mobile-banners/${deleteDialog.banner.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete mobile banner");

      setBanners((prev) =>
        prev?.filter((b) => b.id !== deleteDialog.banner!.id)
      );
      toast.success(`${deleteDialog.banner.name} has been deleted.`);
      setDeleteDialog({ isOpen: false, banner: null, isLoading: false });
    } catch {
      toast.error("Error deleting the mobile banner.");
      setDeleteDialog((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleDeleteCancel = () => {
    if (!deleteDialog.isLoading) {
      setDeleteDialog({ isOpen: false, banner: null, isLoading: false });
    }
  };

  const totalSize = banners?.reduce((sum, b) => sum + b.size, 0) || 0;
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Mobile Banner Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage promotional banners for the mobile version of your site or app.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Mobile Banners</p>
                <p className="text-3xl font-bold">{banners?.length || 0}</p>
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
                <p className="text-sm text-gray-600">Total Size</p>
                <p className="text-3xl font-bold text-green-600">
                  {formatFileSize(totalSize)}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Smartphone className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recent Uploads</p>
                <p className="text-3xl font-bold text-purple-600">
                  {
                    banners?.filter((b) => {
                      const uploadDate = new Date(b.uploadDate);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return uploadDate > weekAgo;
                    }).length || 0
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
                <p className="text-sm text-gray-600">Storage Used</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {((totalSize / (100 * 1024 * 1024)) * 100).toFixed(1)}%
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
            <span>Upload New Mobile Banners</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BannerUpload
            onUpload={handleUpload}
            isUploading={false}
            uploadProgress={uploadProgress}
          />
        </CardContent>
      </Card>

      {/* Banner Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5" />
            <span>All Mobile Banners</span>
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

      {/* Delete Dialog */}
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
