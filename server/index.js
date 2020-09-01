import express from 'express'
import multer from 'multer'
import Clarifai from 'clarifai'

const upload = multer()
const clarifaiApp = new Clarifai.App({apiKey: "57a415e27f4c4b49879602b5409ed22e"});

const app = express()

// Endpoint for sending an image to the Calrifai API
app.post('/upload', upload.single('image'), (req, res) => {
    const encoded = req.file.buffer.toString('base64')
    const image_byte_data = {base64: encoded}
    clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, image_byte_data).then(resp => {
        console.log(resp.rawData.outputs[0].data.concepts[0].name)
    })
})

// Start the server on port 8000
app.listen(8000, () => {
    console.log("Serving on port 8000!")
})