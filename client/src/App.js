import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    foodItems: []
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
        this.setState({foodItems: allFoodItems})
      });
  }

  // When button clicked, send GET request to back
  // '/get_recipes' endpoint
  onFindRecipe = () => {
    const foodQueryString = this.state.foodItems.join(',');
    const params = {params: {ingrediants: foodQueryString}};
    axios.get('/get_recipes', params).then(response => {
      console.log(response)
    });
  }

  render() {
  const listOfFood = this.state.foodItems.map((item) => <div>{item}</div>);
    return (
      <div className="container-flex">
        <div className="app-header">
          <h2 className="header-words">What's in my Fridge? 🍔</h2>
        </div>
        <div className="row">
          <div className="col">
              <label for="myfile">Select a file:</label>
              <input type="file" id="food_image" name="food_image" onChange={this.onFileChange}/>
          </div>
          <div className="col">
            <button onClick={this.onFindRecipe}>Find Recipe!</button>
            {listOfFood}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
