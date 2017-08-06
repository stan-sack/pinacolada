import AWS from 'aws-sdk'
import { IMAGE_BUCKET_NAME } from 'config/aws'

const s3 = new AWS.S3()

// Bucket names must be unique across all S3 users

export const getImageList = () => {
    let imageList = s3.listObjectsV2({ Bucket: IMAGE_BUCKET_NAME }, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            return data.Contents.map((entry) => (entry.Key))
        }
    })
    return imageList
}
