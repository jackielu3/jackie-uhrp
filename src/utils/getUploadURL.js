const { Storage } = require('@google-cloud/storage')
const path = require('path')

const serviceKey = path.join(__dirname, '../../storage-creds.json')
const bucketName = process.env.GCP_BUCKET_NAME
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.GCP_PROJECT_ID
})
const bucket = storage.bucket(bucketName)

module.exports = ({
  size,
  objectIdentifier
}) => {
  return new Promise((resolve, reject) => {
    try {
      const bucketFile = bucket.file(objectIdentifier)
      bucketFile.createResumableUpload(({
        metadata: {
          'Content-Length': size
        }
      }, err, uri) => {
        if (err) {
          reject(err)
        } else {
          resolve(uri)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}
