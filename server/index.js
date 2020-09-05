import express from 'express'
import multer from 'multer'
import Clarifai from 'clarifai'
import dotenv from 'dotenv'
import request from 'request'
import cors from 'cors';

dotenv.config()
const upload = multer()
const clarifaiApp = new Clarifai.App({apiKey: process.env.CLARIFAI_API_KEY});
const EDAMAM_RECIPE_API_BASE = "https://api.edamam.com/search"

// initialize the app with cors to allow for frontend app to send
const app = express()
app.use(cors())

// Endpoint for sending an image to the Calrifai API
app.post('/upload', upload.single('food_image'), (req, res) => {
    const encoded = req.file.buffer.toString('base64');
    const image_byte_data = {base64: encoded};
    clarifaiApp.models.predict(Clarifai.FOOD_MODEL, image_byte_data).then(resp => {
        res.send(resp.rawData.outputs[0].data.concepts[0].name);
    });
});

// Endpoint for getting all of the recipes with the given ingredients
// from the Edamam Recipe Search API
app.get('/get_recipes', (req, res) => {
    let ingrediants = req.query.ingrediants;
    if (ingrediants) {
        const options = {
            url: EDAMAM_RECIPE_API_BASE,
            qs: {
                app_id: process.env.RECIPE_APP_ID,
                app_key: process.env.RECIPE_APP_KEY,
                q: ingrediants
            }
        }
        request.get(options, (err, response, body) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(response.body)
            }
        });
    }
    else {
        res.statusCode(400);
    }
});

// Start the server on port 8000
app.listen(8000, () => {
    console.log("Serving on port 8000!")
});