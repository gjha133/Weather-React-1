import React, { useEffect, useState } from "react";
import hotBg from './assets/hot.jpg'
import coldBg from './assets/cold.jpg'
import Descriptions from "./components/Descriptions";
import { getWeather } from "./weatherService";
import { MdSearch } from "react-icons/md"

const App = () => {

  const [bg, setBg] = useState(coldBg)
  const [city, setCity] = useState("Delhi")
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState("metric")

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeather(city, units)
      setWeather(data)

      const threshold = units === 'metric' ? 20 : 60
      if (data.temp >= threshold) setBg(hotBg)
      else setBg(coldBg)
    }
    fetchWeatherData()
    // useEffect should change when units are changing, if C -> F, we will make another API Call
  }, [units, city])

  // For F->C and C->F conversion
  const handleUnitsClick = (e) => {
    const button = e.currentTarget
    const currentUnit = button.innerText.slice(1)

    button.innerText = currentUnit === 'C' ? '°F' : '°C'
    setUnits(currentUnit === 'C' ? 'metric' : 'imperial')
  }

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

  // const handleClick = (e) => {
  //   console.log(e)
  //   e.preventDefault()
  // }

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {
          weather && (
            <div className="container">
              <div className="section section__inputs">
                <div className="search-bar">
                  <input type="text" name="city" placeholder="Enter City..." onKeyDown={enterKeyPressed} />
                  <button>
                    < MdSearch
                      size='1.2rem'
                    />
                  </button>
                </div>
                <button onClick={(e) => handleUnitsClick(e)}>°F</button>
              </div>
              <div className="section section__temperature">
                <div className="details">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconURL} alt="weather icon" />
                  <h3>{weather.description}</h3>
                </div>
                <div className="temperture">
                  <h1>
                    {`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}
                  </h1>
                </div>
              </div>
              <Descriptions weather={weather} units={units} />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
