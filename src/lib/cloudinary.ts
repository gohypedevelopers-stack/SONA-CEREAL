
import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_URL) {
  console.warn('CLOUDINARY_URL is not set. Cloudinary uploads will fail.');
}

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export default cloudinary;

/**
 * Uploads a base64 or file buffer to Cloudinary
 * @param file The image as a base64 string or buffer
 * @param folder The folder to store the image in Cloudinary
 */
export async function uploadToCloudinary(file: string, folder: string = 'sonacereal') {
  try {
    const response = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: 'auto',
    });
    return {
      success: true,
      url: response.secure_url,
      publicId: response.public_id,
    };
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return {
      success: false,
      error: 'Failed to upload to Cloudinary',
    };
  }
}
