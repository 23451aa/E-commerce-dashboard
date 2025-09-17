import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadImage(file: string, folder?: string) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder || 'uploads', // optional folder
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error: any) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Image upload failed');
  }
}
