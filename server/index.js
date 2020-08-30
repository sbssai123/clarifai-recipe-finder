import express from 'express'

const app = express()

app.get('/hi', (req, res) => {
    res.send("Hello World")
})

app.listen(8000, () => {
    console.log("Serving on port 5000!")
})