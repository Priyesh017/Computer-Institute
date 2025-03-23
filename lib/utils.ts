import { S3Client } from "@aws-sdk/client-s3";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const bucketRegion = process.env.NEXT_PUBLIC_YOUR_BUCKET_REGION!;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_YOUR_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_YOUR_SECRET_KEY!,
  },
});
