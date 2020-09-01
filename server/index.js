import express from 'express'
import multer from 'multer'
import Clarifai from 'clarifai'
import dotenv from 'dotenv';

dotenv.config()
const upload = multer()
const clarifaiApp = new Clarifai.App({apiKey: process.env.API_KEY});

const app = express()

// Endpoint for sending an image to the Calrifai API
app.post('/upload', upload.single('image'), (req, res) => {
    const encoded = req.file.buffer.toString('base64')
    const image_byte_data = {base64: encoded}
    clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, image_byte_data).then(resp => {
        res.send(resp.rawData.outputs[0].data.concepts[0].name)
    })
})

// Start the server on port 8000
app.listen(8000, () => {
    console.log("Serving on port 8000!")
})