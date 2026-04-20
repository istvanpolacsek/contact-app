import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'us-east-1',
  endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || 'minioadmin',
    secretAccessKey: process.env.S3_SECRET_KEY || 'minioadmin',
  },
  forcePathStyle: true,
});

export async function uploadPhotoToS3(buffer: Buffer): Promise<string> {
  const bucket = process.env.S3_BUCKET || 'contact-app-media';
  const fileName = `photo-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      Body: buffer,
      ContentType: 'image/jpeg',
    });

    await s3Client.send(command);

    return fileName;
  } catch (error) {
    console.error('Failed to upload photo to S3:', error);
    throw new Error('Failed to upload photo');
  }
}
