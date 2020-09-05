import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    foodItems: [],
    foodImagesUploaded: [],
    recipe: {}
  }

  // When food image file is selected, send
  // image data via POST request to backend '/upload' endpoint
  onFileChange = event => {
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
      });
  }

  // When button clicked, send GET request to back
  // '/get_recipes' endpoint
  onFindRecipe = () => {
    const foodQueryString = this.state.foodItems.join(',');
    const params = {params: {ingrediants: foodQueryString}};
    axios.get('/get_recipes', params).then(response => {
      this.setState({recipe: response.data})
    });
  }

  render() {
  const listOfFood = this.state.foodItems.join(", ");
  const foodImages = this.state.foodImagesUploaded.map((image) => <div><img className="food-image" src={image}/></div>)
    return (
      <div className="container-flex">
        <div className="app-header">
          <h2 className="header-words">What's in my Fridge? 🍔</h2>
        </div>
        <div className="row">
          <div className="col">
            <FoodImageUploader onFileChange={this.onFileChange} />
          </div>
          <div className="col">
            <button className="btn btn-primary float-right" onClick={this.onFindRecipe}>Find Recipe!</button>
            <div>
              <b>Ingrediants: </b>{listOfFood}
            </div>
            {foodImages}
          </div>
        </div>
      </div>
    );
  }
}

// Represents Food Images to Upload
const FoodImageUploader = ({onFileChange}) => {
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
      <input className="file-upload" type="file" id="food_image" accept="image/*" ref={hiddenFileInput} onChange={onFileChange}/>
    </>
  );
}

export default App;
