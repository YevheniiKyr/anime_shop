const uuid = require("uuid");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const ApiError = require('../exceptions/apiError');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

class ImagesService {

    async uploadToCloudinary(file) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    public_id: uuid.v4(),
                    folder: 'products'
                },
                (error, result) => {
                    if (error) {
                        console.error('Помилка Cloudinary:', error)
                        return reject(error)
                    }
                    resolve(result.public_id)
                }
            )
            streamifier.createReadStream(file.data).pipe(uploadStream)
        })
    }

    async deleteImage(fileName) {
        if (!fileName) return
        cloudinary.uploader.destroy(fileName)
            .then(result => {
                if (result.result !== 'ok') throw ApiError.CloudinaryDeleteException(`Can't delete file: ${fileName}`);
            })
            .catch(err => {
                throw ApiError.CloudinaryDeleteException(`Error deleting ${fileName}: ${err.message}`);
            })
    }
}

module.exports = new ImagesService();