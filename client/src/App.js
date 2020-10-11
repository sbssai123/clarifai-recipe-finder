import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    foodItems: [],
    foodImagesUploaded: [],
    recipe: null
  }

  // When food image file is selected, send
  // image data via POST request to backend '/upload' endpoint
  onImageSelection = event => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('food_image', file)
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      axios.post('/upload', formData, config).then(response => {
        const allFoodItems = [...this.state.foodItems, response.data]
        const allFoodImages = [...this.state.foodImagesUploaded, URL.createObjectURL(file)]
        this.setState({foodImagesUploaded: allFoodImages})
        this.setState({foodItems: allFoodItems})
      })
  }

  // When button clicked, send GET request to back
  // '/get_recipes' endpoint
  onFindRecipe = () => {
    const foodQueryString = this.state.foodItems.join(",")
    const params = {params: {ingrediants: foodQueryString}}
    axios.get('/get_recipes', params).then(response => {
        this.setState({recipe: response.data})
    });
  }

  // Reset the state when you want to find a new recipe with new
  // ingrediants
  onFindNewRecipe = () => {
    this.setState({recipe: null, foodItems: [], foodImagesUploaded: []})
  }

  render() {
  const listOfFood = this.state.foodItems.join(", ");
  const foodImages = this.state.foodImagesUploaded.map((image) => <div><img className="food-image" src={image}/></div>);
  let componentToDisplay;
  if (this.state.recipe) {
    componentToDisplay = <Recipe recipe={this.state.recipe} onFindNewRecipe={this.onFindNewRecipe}/>
  }
  else {
    componentToDisplay = <RecipeFinder onImageSelection={this.onImageSelection} onFindRecipe={this.onFindRecipe}
    listOfFood={listOfFood} foodImages={foodImages}/>
  }
    return (
      <div className="container-flex">
        {componentToDisplay}
      </div>
    );
  }
}

const RecipeFinder = ({onImageSelection, onFindRecipe, listOfFood, foodImages}) => {
  return (
    <>
      <div className="app-header">
        <h2 className="header-words">What's in my Fridge? 🍔</h2>
      </div>
      <div className="row">
        <div className="col">
          <FoodImageUploader onImageSelection={onImageSelection} />
        </div>
        <div className="col">
          <button className="btn btn-primary float-right" onClick={onFindRecipe}>Find Recipe!</button>
          <div>
            <b>Ingrediants: </b>{listOfFood}
          </div>
          {foodImages}
        </div>
      </div>
    </>
  );
}

// Represents image uploader on the left
const FoodImageUploader = ({onImageSelection}) => {
  // For remove the default styling of "File Upload Input"
  const hiddenFileInput = React.useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  return (
    <>
      <button className="image-upload-button" onClick={handleClick}> 
        Click here to upload images of the ingrediants you have at home to discover new recipes!! 😋
      </button>
      <input className="file-upload" type="file" id="food_image" accept="image/*" 
        ref={hiddenFileInput} onChange={onImageSelection}/>
    </>
  );
}

const Recipe = ({recipe, onFindNewRecipe}) => {
  return (
    <>
      <h2 className="recipe-header">{recipe.title}</h2>
      <div className="row">
        <div className="col">
          <img className="recipe-image" src={recipe.image}/>
        </div>
      </div>
      <div className="row">
      <div className="col-4"></div>
        <div className="col-4">
          <button className="btn btn-secondary recipe-btn" onClick={onFindNewRecipe} target="_blank">Let's find new recipe!</button>
          <a className="btn btn-primary recipe-btn" href={recipe.recipeLink} target="_blank">Full Recipe</a>
        </div>
        <div className="col-4"></div>
      </div>
    </>
  );
}

export default App;
