# clarifai-recipe-finder

This app was used in the "Introduction to APIs" workshop at AIHacks.
[Here](https://docs.google.com/presentation/d/1Pmj_cuXOItooeZ39ln7pyXBJqvQAZuRzD5kQpYe7C7M/edit#slide=id.p) is the link to the slides

Prerequisites:
1. Make sure you have the latest version of node and npm installed
2. Go to the [Clarifai API](https://www.clarifai.com/) and make a free account and get an api key.
3. Go to the [Edamam API](https://developer.edamam.com/edamam-docs-recipe-api) and make a free account and get an `app_id` and `app_key`


How to run the app locally:
1. `git clone git@github.com:sbssai123/clarifai-recipe-finder.git`
2. `cd clarifai-recipe-finder`
3. Make a .env file in the root directory and set the CLARIFAI_API_KEY to your api key and the RECIPE_APP_ID and RECIPE_APP_KEY to your app id and key from the Edamam API.
4. `npm install`
5. `npm run dev`