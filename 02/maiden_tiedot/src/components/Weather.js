import React, {useState, useEffect} from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_weatherAPI
console.log(api_key)

const Weather = ({city}) => {
    const [weather, setWeather] = useState();

    useEffect(() => {
        console.log(`effect`)
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
          .then(response => {
            console.log('promise fulfilled')
            setWeather(response.data)
          })
      }, [city])
      console.log(weather)
      if (weather) {
        return(
            <div>
              <h2>Weather in {city}</h2>
              <p><b>temperature:</b> {weather.current.temperature} Celcius </p>
              <img width="100px" src={weather.current.weather_icons[0]} alt="flag" />
              <p><b>wind:</b>  {weather.current.wind_speed} SSW</p>
          </div>
        )
      } else {
          return(
              <p>Weather data on the way</p>
          )
      }
      
      
}
export default Weather

