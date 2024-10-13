import React, { useEffect, useState } from 'react'
import axios from 'axios'
import WeatherIcon from './WeatherIcon'

const DefaultWeather = ({ apiKey, unit, city, onCityUpdate }) => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const geoResponse = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}&lang=es`
        )
        if (geoResponse.data.length === 0) {
          console.error('No se encontraron coordenadas para la ciudad seleccionada.')
          return
        }
        const { lat, lon, name, country } = geoResponse.data[0]
        onCityUpdate(`${name}, ${country}`)

        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}&lang=es`
        )
        const currentWeather = weatherResponse.data.list[0]
        setWeather(currentWeather)
        setForecast(weatherResponse.data)
      } catch (error) {
        console.error('Error recuperando los datos del clima', error)
      }
    }
    fetchWeatherData();
  }, [unit, apiKey, city, onCityUpdate])

  const getDailyForecasts = () => {
    if (!forecast) return []
    const dailyForecasts = []
    const seenDates = new Set()
    forecast.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      if (!seenDates.has(date)) {
        seenDates.add(date)
        dailyForecasts.push({
          date,
          temp_min: entry.main.temp_min,
          temp_max: entry.main.temp_max,
          weather: entry.weather
        })
      }
    })
    return dailyForecasts.slice(0, 5)
  }

  const dailyForecasts = getDailyForecasts()

  return (
    <div id="main-content">
      <div id="weather-info">
        {weather ? (
          <>
            <div className="weather-header">
              <p><strong>{new Date().toLocaleDateString()}</strong></p>
              <h2>{city}</h2>
              <WeatherIcon icon={weather.weather[0].icon} />
              <p>{weather.weather[0].description.toUpperCase()}</p>
              <p></p>
              <p>Temperatura: {weather.main.temp.toFixed(1)} °{unit === 'metric' ? 'C' : 'F'}</p>
              <p>Sensación térmica: {weather.main.feels_like.toFixed(1)} °{unit === 'metric' ? 'C' : 'F'}</p>
              <p>Viento: {weather.wind.speed.toFixed(1)} m/s, {weather.wind.deg}°</p>
              <p>Humedad: {weather.main.humidity}%</p>
            </div>
          </>
        ) : (
          <p>Cargando datos del clima...</p>
        )}
      </div>
      <div id="forecast">
        {dailyForecasts.length > 0 ? (
          dailyForecasts.map((entry, index) => (
            <div key={index} className="forecast-day">
              <h3>{entry.date}</h3>
              <WeatherIcon icon={entry.weather[0].icon} className="weather-icon" />
              <div className="temperatures">
                <span className="temp-min">Min: {entry.temp_min.toFixed(1)} °{unit === 'metric' ? 'C' : 'F'}</span>
                <span className="temp-max">Max: {entry.temp_max.toFixed(1)} °{unit === 'metric' ? 'C' : 'F'}</span>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando clima de dias próximos...</p>
        )}
      </div>
    </div>
  )
};
export default DefaultWeather
