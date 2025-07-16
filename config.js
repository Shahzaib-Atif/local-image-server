import 'dotenv/config'

export const config = {
    PORT: process.env.PORT || 3011,
    JWT_SECRET: process.env.JWT_SECRET,
    IMAGES_FOLDER_PATH: process.env.IMAGES_FOLDER_PATH,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    SERVER: process.env.SERVER,
    IMAGE_FEATURES_DB: process.env.ImageFeaturesDB,
}