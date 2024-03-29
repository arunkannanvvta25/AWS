import dotenv from 'dotenv'
import aws from 'aws-sdk'

dotenv.config()

const region = "us-east-2"
const bucketName = "fovus-file-upload"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL(fileName) {
  const params = ({
    Bucket: bucketName,
    Key: fileName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}