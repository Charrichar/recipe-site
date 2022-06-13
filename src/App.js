import { useState, useEffect } from 'react'
import MealList from './components/MealList'
import axios from 'axios'
import './App.css';

function App() {
  const [display, setDisplay] = useState([])
  const [newDish, setNewDish] = useState('')
  const [calories, setCalories] = useState(2000)

  const handleNewDishChange = (event) => {
    setNewDish(`${event.target.value}`)
  }
  const handleNewSearchSubmit = (event) => {
    event.preventDefault()





    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
      params: {
        query: `${newDish}`,
        addRecipeInformation: 'true'

      },
      headers: {
        'X-RapidAPI-Key': 'cfb65902ecmsh006836ec570b325p1b7a02jsn6bc29e79dde5',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      setDisplay([...response.data.results])
      console.log(response.data);
    }).catch(function (error) {
    	console.error(error);
    });
  }


  return (
    <div className="App">
    <h1>Welcome to Grecipe</h1>
    <form onSubmit={handleNewSearchSubmit}>
    <label for="dishname" className="bar title">Find a dish</label>
    <input onChange={handleNewDishChange} type="text" id="dishname" className="bar barr" name="dishname" />
    <input type="submit" value="Find dish" />
    </form>
    <div className="container">

    <div className="display">
    {display.map((display) => {
      return <div className='displaybox'>
      <div className='imgcrop'>
      <img className='dishimg' src={`${display.image}`} />
      </div>
      <h5>{display.title}</h5>
      </div>
    })}
    </div>

    </div>
    </div>
  );
}

export default App;
