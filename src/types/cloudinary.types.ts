export interface UploadWidgetOptions {
  cloudName: string;
  uploadPreset: string;
  sources: string[];
  cropping?: boolean;
}

export interface UploadWidgetError {
  message: string;
}

export interface UploadWidgetResult {
  event: string;
  info: {
    public_id: string;
    url: string;
  };
}

export interface Cloudinary {
  createUploadWidget: (
    options: UploadWidgetOptions,
    callback: (
      error: UploadWidgetError | null,
      result: UploadWidgetResult | null
    ) => void
  ) => CloudinaryUploadWidget;
}

export interface CloudinaryUploadWidget {
  open: () => void;
  close: () => void;
}

declare global {
  interface Window {
    cloudinary: Cloudinary;
  }
}
