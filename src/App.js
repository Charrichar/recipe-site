import { useState, useEffect } from 'react'
import MealList from './components/MealList'
import axios from 'axios'
import './App.css';

function App() {
  const [dishLink, setDishLink] = useState('')
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
        'X-RapidAPI-Key': process.env.REACT_APP_API,
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

    let windowsFeature = "popup"

  return (

    <div className="App">
    <div className="controls">
    <div className="logodiv">
    <img className="logoimg" src="spoonaclogo.png" />
    </div>
    <form onSubmit={handleNewSearchSubmit}>
    <input onChange={handleNewDishChange} type="text" id="dishname" className="bar barr" name="dishname" />
    <input type="submit" value="Find dish" className="dishsub" />
    </form>
    </div>

    <div className="container">

    <div className="display">
    {display.map((display) => {
      return <div className='displaybox' onClick={
      (event) => window.open(display.sourceUrl, "chromeWindow", windowsFeature)
      }>
      <div className='imgcrop'>
      <img className='dishimg' src={`${display.image}`} />
      </div>
      <h5 className="cardtitle">{display.title}</h5>
      </div>
    })}
    </div>

    </div>
    </div>
  );
}

export default App;
