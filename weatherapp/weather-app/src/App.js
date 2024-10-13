import React, { useState } from 'react'
import './App.css'
import DefaultWeather from './components/DefaultWeather'

const apiKey = '5c094174161c4f02b35acea372cef3a2'

function App() {
  const [city, setCity] = useState('Mykonos')
  const [unit, setUnit] = useState('metric')



  function handleSearch() {
    const input = document.getElementById('city')
    const newCity = input.value.trim()
    if (newCity) {
      setCity(newCity)
      input.value = ''
    }
  }

  function toggleTemperature() {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'))
  }

  function useMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}&lang=es`)
            .then(response => response.json())
            .then(data => setCity(`${data.name}, ${data.sys.country}`))
            .catch(error => console.error('Error obteniendo informacion del clima:', error))
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error)
        }
      )
    } else {
      alert('Geolocation no es soportada por este navegador.')
    }
  }

  function updateCityName(cityName) {
    setCity(cityName)
  }

  return (
    <div className="App">
      <div className="fixed-header">
        <div className="search-controls">
          <input type="text" id="city" placeholder="Ingresa una ciudad" />
          <button onClick={handleSearch}>Buscar</button>
          <button onClick={useMyLocation}>Ubicación actual</button>
          <button onClick={toggleTemperature}>°C/°F</button>
        </div>
      </div>
      <div id="main-content">
        <DefaultWeather apiKey={apiKey} unit={unit} city={city} onCityUpdate={updateCityName} />
      </div>
    </div>
  )
}

export default App
