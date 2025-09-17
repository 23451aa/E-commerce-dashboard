'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, X, Image as ImageIcon, FileImage } from 'lucide-react';

interface BannerUploadProps {
  onUpload: (files: File[]) => void;
  isUploading?: boolean;
  uploadProgress?: number;
}

export default function BannerUpload({ 
  onUpload, 
  isUploading = false, 
  uploadProgress = 0 
}: BannerUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
    );
    
    if (imageFiles.length > 0) {
      setSelectedFiles(imageFiles);
    }
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
    );
    
    if (imageFiles.length > 0) {
      setSelectedFiles(imageFiles);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card 
        className={`border-2 border-dashed transition-all duration-200 ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div 
          className="p-8 text-center cursor-pointer"
          onClick={triggerFileInput}
        >
          <Upload className={`h-16 w-16 mx-auto mb-4 ${
            dragActive ? 'text-blue-500' : 'text-gray-400'
          }`} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {dragActive ? 'Drop banners here' : 'Upload Website Banners'}
          </h3>
          <p className="text-gray-500 mb-4">
            Drag and drop banner images here, or click to browse
          </p>
          <p className="text-sm text-gray-400">
            Supports JPG, PNG, WebP • Max 10MB per file
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </Card>

      {/* Upload Progress */}
      {isUploading && (
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Uploading banners...
              </span>
              <span className="text-sm text-gray-500">
                {uploadProgress}%
              </span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        </Card>
      )}

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && !isUploading && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">
                Selected Files ({selectedFiles.length})
              </h4>
              <Button onClick={handleUpload} className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Banners</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <Card className="overflow-hidden">
                    <div className="aspect-video relative bg-gray-100">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}